import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { AchievementCategory, NotificationType, ReactionType, WallPrivacy } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { excerpt } from '../common/text.js';
import { NotificationsService } from '../notifications/notifications.service.js';
import { achievementDefinitions, automaticAchievementCandidates } from './achievements.js';
import { describeActivity, publicActivityActions } from './activity.js';
import { determineLocalTrust, type LocalTrustLevel } from './trust.js';

const helpfulReactionTypes = [ReactionType.USEFUL, ReactionType.THANKS];
const trustRank: Record<LocalTrustLevel, number> = { NEW: 0, BASIC: 1, STABLE: 2, HIGH: 3, EXCEPTIONAL: 4 };

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService, private readonly notifications: NotificationsService) {}

  async following(userId: string) {
    const rows = await this.prisma.userFollow.findMany({
      where: { followerId: userId }, orderBy: { createdAt: 'desc' },
      include: { following: { include: { _count: { select: { followers: true, publications: { where: { status: 'PUBLISHED' } } } } } } },
    });
    return rows.map((row) => ({
      username: row.following.username, displayName: row.following.displayName,
      avatarUrl: row.following.avatarUrl, bio: row.following.bio, forrumId: row.following.forrumId,
      followerCount: row.following._count.followers, publicationCount: row.following._count.publications,
      followedAt: row.createdAt,
    }));
  }

  async activity(userId: string) {
    const rows = await this.prisma.auditLog.findMany({
      where: { actorId: userId, action: { in: [...publicActivityActions] } },
      orderBy: { createdAt: 'desc' }, take: 120,
    });
    return rows.flatMap((row) => {
      const descriptor = describeActivity(row.action, row.metadata as Record<string, unknown> | null);
      return descriptor ? [{ id: row.id, action: row.action, createdAt: row.createdAt, ...descriptor }] : [];
    });
  }

  private async syncAutomaticAchievements(userId: string) {
    const [user, publicationCount, commentCount, publicationHelpful, commentHelpful, activeRoles] = await Promise.all([
      this.prisma.user.findUniqueOrThrow({ where: { id: userId }, select: { emailVerifiedAt: true } }),
      this.prisma.publication.count({ where: { authorId: userId, status: 'PUBLISHED' } }),
      this.prisma.comment.count({ where: { authorId: userId, hiddenAt: null, publication: { status: 'PUBLISHED' } } }),
      this.prisma.publicationReaction.count({ where: { userId: { not: userId }, type: { in: helpfulReactionTypes }, publication: { authorId: userId, status: 'PUBLISHED' } } }),
      this.prisma.commentReaction.count({ where: { userId: { not: userId }, type: { in: helpfulReactionTypes }, comment: { authorId: userId, hiddenAt: null, publication: { status: 'PUBLISHED' } } } }),
      this.prisma.communityRole.findMany({ where: { userId, endedAt: null }, include: { community: { select: { id: true, name: true } } } }),
    ]);

    await Promise.all(achievementDefinitions.map((definition) => this.prisma.achievementDefinition.upsert({
      where: { code: definition.code },
      update: {
        title: definition.title, description: definition.description, icon: definition.icon,
        category: definition.category as AchievementCategory, automatic: definition.automatic, sortOrder: definition.sortOrder, active: true,
      },
      create: {
        code: definition.code, title: definition.title, description: definition.description, icon: definition.icon,
        category: definition.category as AchievementCategory, automatic: definition.automatic, sortOrder: definition.sortOrder,
      },
    })));

    const candidates = automaticAchievementCandidates({
      emailVerified: Boolean(user.emailVerifiedAt), publicationCount, commentCount,
      helpfulReactionCount: publicationHelpful + commentHelpful,
      activeRoles: activeRoles.map((role) => ({ communityId: role.communityId, communityName: role.community.name, role: role.role })),
    });
    if (!candidates.length) return;
    const definitions = await this.prisma.achievementDefinition.findMany({ where: { code: { in: candidates.map((item) => item.code) }, active: true } });
    const byCode = new Map(definitions.map((item) => [item.code, item]));
    await Promise.all(candidates.flatMap((candidate) => {
      const definition = byCode.get(candidate.code);
      if (!definition) return [];
      return [this.prisma.userAchievement.upsert({
        where: { userId_achievementId_scopeKey: { userId, achievementId: definition.id, scopeKey: candidate.scopeKey } },
        update: { metadata: candidate.metadata, communityId: candidate.communityId, sourceType: candidate.sourceType, sourceId: candidate.sourceId },
        create: {
          userId, achievementId: definition.id, scopeKey: candidate.scopeKey, communityId: candidate.communityId,
          sourceType: candidate.sourceType, sourceId: candidate.sourceId, metadata: candidate.metadata,
        },
      })];
    }));
  }

  private async localTrust(userId: string, emailVerified: boolean) {
    const [publications, comments, publicationHelpful, commentHelpful, bookmarks, roles] = await Promise.all([
      this.prisma.publication.findMany({ where: { authorId: userId, status: 'PUBLISHED' }, select: { communityId: true, community: { select: { slug: true, name: true } } } }),
      this.prisma.comment.findMany({ where: { authorId: userId, hiddenAt: null, publication: { status: 'PUBLISHED' } }, select: { publication: { select: { communityId: true, community: { select: { slug: true, name: true } } } } } }),
      this.prisma.publicationReaction.findMany({ where: { userId: { not: userId }, type: { in: helpfulReactionTypes }, publication: { authorId: userId, status: 'PUBLISHED' } }, select: { publication: { select: { communityId: true, community: { select: { slug: true, name: true } } } } } }),
      this.prisma.commentReaction.findMany({ where: { userId: { not: userId }, type: { in: helpfulReactionTypes }, comment: { authorId: userId, hiddenAt: null, publication: { status: 'PUBLISHED' } } }, select: { comment: { select: { publication: { select: { communityId: true, community: { select: { slug: true, name: true } } } } } } } }),
      this.prisma.bookmark.findMany({ where: { userId: { not: userId }, publication: { authorId: userId, status: 'PUBLISHED' } }, select: { publication: { select: { communityId: true, community: { select: { slug: true, name: true } } } } } }),
      this.prisma.communityRole.findMany({ where: { userId, endedAt: null }, select: { communityId: true, community: { select: { slug: true, name: true } } } }),
    ]);

    type Metrics = { communityId: string; slug: string; name: string; publicationCount: number; commentCount: number; helpfulReactionCount: number; bookmarkCount: number; activeRole: boolean };
    const metrics = new Map<string, Metrics>();
    const ensure = (communityId: string, slug: string, name: string) => {
      const current = metrics.get(communityId) ?? { communityId, slug, name, publicationCount: 0, commentCount: 0, helpfulReactionCount: 0, bookmarkCount: 0, activeRole: false };
      metrics.set(communityId, current);
      return current;
    };
    for (const row of publications) ensure(row.communityId, row.community.slug, row.community.name).publicationCount += 1;
    for (const row of comments) ensure(row.publication.communityId, row.publication.community.slug, row.publication.community.name).commentCount += 1;
    for (const row of publicationHelpful) ensure(row.publication.communityId, row.publication.community.slug, row.publication.community.name).helpfulReactionCount += 1;
    for (const row of commentHelpful) ensure(row.comment.publication.communityId, row.comment.publication.community.slug, row.comment.publication.community.name).helpfulReactionCount += 1;
    for (const row of bookmarks) ensure(row.publication.communityId, row.publication.community.slug, row.publication.community.name).bookmarkCount += 1;
    for (const row of roles) ensure(row.communityId, row.community.slug, row.community.name).activeRole = true;

    return [...metrics.values()].map((item) => ({
      community: { id: item.communityId, slug: item.slug, name: item.name },
      metrics: { publicationCount: item.publicationCount, commentCount: item.commentCount, helpfulReactionCount: item.helpfulReactionCount, bookmarkCount: item.bookmarkCount, activeRole: item.activeRole },
      ...determineLocalTrust({ emailVerified, ...item }),
    })).sort((a, b) => trustRank[b.level] - trustRank[a.level] || (b.metrics.helpfulReactionCount + b.metrics.bookmarkCount) - (a.metrics.helpfulReactionCount + a.metrics.bookmarkCount)).slice(0, 8);
  }

  async getProfile(usernameInput: string, viewerId?: string) {
    const username = usernameInput.toLowerCase();
    const user = await this.prisma.user.findUnique({
      where: { username },
      include: {
        followers: { where: { followerId: viewerId ?? '00000000-0000-0000-0000-000000000000' }, take: 1 },
        communityRoles: {
          include: { community: true, events: { include: { actor: { select: { username: true, displayName: true } } }, orderBy: { createdAt: 'desc' }, take: 10 } },
          orderBy: { createdAt: 'asc' },
        },
        subscriptions: { include: { community: true }, orderBy: { createdAt: 'desc' }, take: 12 },
        wallReceived: { where: { hiddenAt: null }, orderBy: { createdAt: 'desc' }, take: 30, include: { author: true } },
      },
    });
    if (!user) throw new NotFoundException('Пользователь не найден');

    await this.syncAutomaticAchievements(user.id);
    const [publicationCount, commentCount, publications, achievements, localTrust, reviews, reviewCounts, completedInteractions, portfolioItems, favoriteRows, workshopPortfolio, gifts] = await Promise.all([
      this.prisma.publication.count({ where: { authorId: user.id, status: 'PUBLISHED' } }),
      this.prisma.comment.count({ where: { authorId: user.id, hiddenAt: null, publication: { status: 'PUBLISHED' } } }),
      this.prisma.publication.findMany({
        where: { authorId: user.id, status: 'PUBLISHED' }, orderBy: { createdAt: 'desc' }, take: 60,
        include: {
          community: true, tags: { include: { tag: true } },
          reactions: { where: { userId: { not: user.id }, type: { in: helpfulReactionTypes } }, select: { id: true, type: true } },
          _count: { select: { comments: { where: { hiddenAt: null } }, reactions: true, bookmarks: { where: { userId: { not: user.id } } } } },
        },
      }),
      this.prisma.userAchievement.findMany({
        where: { userId: user.id, achievement: { active: true } }, orderBy: { earnedAt: 'desc' },
        include: { achievement: true, community: { select: { slug: true, name: true } } },
      }),
      this.localTrust(user.id, Boolean(user.emailVerifiedAt)),
      this.prisma.profileReview.findMany({
        where: { targetId: user.id, moderationStatus: 'PUBLISHED' }, orderBy: { createdAt: 'desc' }, take: 30,
        include: {
          evidenceMedia: { select: { id: true } },
          author: { select: { username: true, displayName: true, avatarUrl: true } },
          interaction: { include: { community: { select: { slug: true, name: true } }, publication: { select: { slug: true, title: true } }, portfolioItem: { select: { id: true, kind: true, title: true } } } },
        },
      }),
      this.prisma.profileReview.groupBy({ by: ['verdict'], where: { targetId: user.id, moderationStatus: 'PUBLISHED' }, _count: { _all: true } }),
      this.prisma.confirmedInteraction.count({ where: { OR: [{ createdById: user.id }, { counterpartId: user.id }], status: 'COMPLETED' } }),
      this.prisma.portfolioItem.findMany({
        where: { ownerId: user.id, status: { in: ['ACTIVE', 'COMPLETED'] } }, orderBy: [{ lookingForTeam: 'desc' }, { updatedAt: 'desc' }], take: 12,
        include: { community: { select: { slug: true, name: true, accentColor: true } }, publication: { select: { slug: true, title: true } }, _count: { select: { interactions: { where: { status: 'COMPLETED' } } } } },
      }),
      this.prisma.publication.findMany({
        where: {
          status: 'PUBLISHED',
          OR: [
            { reactions: { some: { userId: user.id } } },
            { bookmarks: { some: { userId: user.id } } },
          ],
        },
        orderBy: { lastActivityAt: 'desc' },
        take: 60,
        include: {
          author: { select: { username: true, displayName: true, avatarUrl: true, forrumId: true } },
          community: true,
          tags: { include: { tag: true } },
          _count: { select: { comments: { where: { hiddenAt: null } }, reactions: true, bookmarks: true } },
        },
      }),
      this.prisma.workshopItem.findMany({
        where: { authorId: user.id, status: 'PUBLISHED' },
        orderBy: { createdAt: 'desc' },
        take: 24,
        select: { id: true, type: true, title: true, description: true, previewMediaId: true, createdAt: true },
      }),
      this.prisma.userGift.findMany({
        where: { recipientId: user.id },
        orderBy: { createdAt: 'desc' },
        take: 50,
        include: {
          sender: { select: { username: true, displayName: true, avatarUrl: true } },
          gift: { select: { id: true, title: true, description: true, previewMediaId: true } },
        },
      }),
    ]);

    const mappedPublications = publications.map((publication) => ({
      id: publication.id, slug: publication.slug, format: publication.format, type: publication.type, title: publication.title,
      excerpt: excerpt(publication.body), createdAt: publication.createdAt, lastActivityAt: publication.lastActivityAt, viewCount: publication.viewCount,
      author: { username: user.username, displayName: user.displayName, avatarUrl: user.avatarUrl, forrumId: user.forrumId },
      community: { slug: publication.community.slug, name: publication.community.name, accentColor: publication.community.accentColor },
      commentCount: publication._count.comments, reactionCount: publication._count.reactions, bookmarkCount: publication._count.bookmarks,
      helpfulReactionCount: publication.reactions.length,
      tags: publication.tags.map((item) => item.tag),
    }));
    const usefulPublications = favoriteRows.map((publication) => ({
      id: publication.id, slug: publication.slug, format: publication.format, type: publication.type, title: publication.title,
      excerpt: excerpt(publication.body), createdAt: publication.createdAt, lastActivityAt: publication.lastActivityAt, viewCount: publication.viewCount,
      author: publication.author,
      community: { slug: publication.community.slug, name: publication.community.name, accentColor: publication.community.accentColor },
      commentCount: publication._count.comments, reactionCount: publication._count.reactions, bookmarkCount: publication._count.bookmarks,
      helpfulReactionCount: 0,
      tags: publication.tags.map((item) => item.tag),
    }));

    const isSelf = viewerId === user.id;
    const canSeeFavorites = isSelf || user.showFavorites;
    const canSeeSubscriptions = isSelf || user.showSubscriptions;
    const viewerFollows = user.followers.length > 0;
    const canViewWall = isSelf || user.wallPrivacy === WallPrivacy.EVERYONE || (user.wallPrivacy === WallPrivacy.FOLLOWERS && viewerFollows);
    const canWriteWall = Boolean(viewerId) && (isSelf || user.wallPrivacy === WallPrivacy.EVERYONE || (user.wallPrivacy === WallPrivacy.FOLLOWERS && viewerFollows));
    const reviewSummary = { positive: 0, neutral: 0, negative: 0 };
    for (const group of reviewCounts) reviewSummary[group.verdict.toLowerCase() as keyof typeof reviewSummary] = group._count._all;
    const strongestTrust = localTrust[0] ?? null;

    return {
      id: user.id, forrumId: user.forrumId, username: user.username, displayName: user.displayName, bio: user.bio,
      avatarUrl: user.avatarUrl, coverUrl: user.coverUrl, website: user.website, location: user.location, role: user.role,
      emailVerified: Boolean(user.emailVerifiedAt), createdAt: user.createdAt, isFollowing: viewerFollows, isSelf,
      wallPrivacy: user.wallPrivacy, showFavorites: user.showFavorites, showSubscriptions: user.showSubscriptions, wallRestricted: !canViewWall, canWriteWall, canStartInteraction: Boolean(viewerId && !isSelf),
      counts: { followers: await this.prisma.userFollow.count({ where: { followingId: user.id } }), following: await this.prisma.userFollow.count({ where: { followerId: user.id } }), publications: publicationCount, comments: commentCount, completedInteractions },
      trustSummary: strongestTrust ? { level: strongestTrust.level, label: strongestTrust.label, detail: strongestTrust.detail, community: strongestTrust.community } : { level: 'NEW', label: user.emailVerifiedAt ? 'Базовое на FORRUM' : 'Новое', detail: user.emailVerifiedAt ? 'Аккаунт подтверждён, но локальная история ещё формируется.' : 'Пока недостаточно подтверждённой истории.', community: null },
      localTrust,
      roles: user.communityRoles.filter((role) => !role.endedAt).map((role) => ({ id: role.id, role: role.role, note: role.note, startedAt: role.createdAt, community: { slug: role.community.slug, name: role.community.name } })),
      roleHistory: user.communityRoles.flatMap((role) => role.events.map((event) => ({ id: event.id, type: event.type, role: role.role, note: event.note, createdAt: event.createdAt, community: { slug: role.community.slug, name: role.community.name }, actor: event.actor }))).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 30),
      communities: canSeeSubscriptions ? user.subscriptions.map((subscription) => ({ slug: subscription.community.slug, name: subscription.community.name })) : [],
      publications: mappedPublications, usefulPublications: canSeeFavorites ? usefulPublications : [],
      achievements: achievements.map((award) => ({
        id: award.id, code: award.achievement.code, title: award.achievement.title, description: award.achievement.description,
        icon: award.achievement.icon, category: award.achievement.category, earnedAt: award.earnedAt, community: award.community,
      })),
      reviews: reviews.map((review) => ({
        id: review.id, verdict: review.verdict, body: review.body, createdAt: review.createdAt,
          evidenceAttached: Boolean(review.evidenceMedia),
          author: review.author,
        interaction: { id: review.interaction.id, type: review.interaction.type, title: review.interaction.title, completedAt: review.interaction.completedAt, community: review.interaction.community, publication: review.interaction.publication, portfolioItem: review.interaction.portfolioItem },
      })),
      reviewSummary,
      workshopPortfolio,
      gifts: gifts.map((item) => ({ id: item.id, message: item.message, createdAt: item.createdAt, sender: item.sender, gift: item.gift })),
      portfolio: portfolioItems.map((item) => ({
        id: item.id, kind: item.kind, status: item.status, title: item.title, summary: item.summary, coverUrl: item.coverUrl, lookingForTeam: item.lookingForTeam, priceText: item.priceText, updatedAt: item.updatedAt,
        community: item.community, publication: item.publication, completedInteractionCount: item._count.interactions,
      })),
      wall: (canViewWall ? user.wallReceived : []).map((post) => ({
        id: post.id, body: post.body, createdAt: post.createdAt,
        author: { username: post.author.username, displayName: post.author.displayName, avatarUrl: post.author.avatarUrl },
        canDelete: Boolean(viewerId && (viewerId === post.authorId || viewerId === user.id)),
      })),
    };
  }

  async follow(usernameInput: string, followerId: string) {
    const user = await this.prisma.user.findUnique({ where: { username: usernameInput.toLowerCase() } });
    if (!user) throw new NotFoundException('Пользователь не найден');
    if (user.id === followerId) throw new BadRequestException('Нельзя подписаться на себя');
    const existed = await this.prisma.userFollow.findUnique({ where: { followerId_followingId: { followerId, followingId: user.id } } });
    if (!existed) {
      await this.prisma.$transaction(async (tx) => {
        await tx.userFollow.create({ data: { followerId, followingId: user.id } });
        await tx.auditLog.create({ data: { actorId: followerId, action: 'user.follow', entityType: 'User', entityId: user.id, metadata: { username: user.username, displayName: user.displayName } } });
        await this.notifications.deliver({ userId: user.id, actorId: followerId, type: NotificationType.FOLLOW, title: 'Новый подписчик', body: 'На вас подписался пользователь', href: `/u/${usernameInput.toLowerCase()}` }, tx);
      });
    }
    return { ok: true };
  }

  async unfollow(usernameInput: string, followerId: string) {
    const user = await this.prisma.user.findUnique({ where: { username: usernameInput.toLowerCase() } });
    if (!user) throw new NotFoundException('Пользователь не найден');
    const existing = await this.prisma.userFollow.findUnique({ where: { followerId_followingId: { followerId, followingId: user.id } } });
    if (existing) await this.prisma.$transaction([
      this.prisma.userFollow.delete({ where: { followerId_followingId: { followerId, followingId: user.id } } }),
      this.prisma.auditLog.create({ data: { actorId: followerId, action: 'user.unfollow', entityType: 'User', entityId: user.id, metadata: { username: user.username, displayName: user.displayName } } }),
    ]);
    return { ok: true };
  }

  async createWallPost(usernameInput: string, authorId: string, bodyInput: string) {
    const profile = await this.prisma.user.findUnique({ where: { username: usernameInput.toLowerCase() } });
    if (!profile) throw new NotFoundException('Пользователь не найден');
    const body = bodyInput.trim();
    if (profile.id !== authorId) {
      if (profile.wallPrivacy === WallPrivacy.ONLY_ME) throw new BadRequestException('Пользователь закрыл стену');
      if (profile.wallPrivacy === WallPrivacy.FOLLOWERS) {
        const follows = await this.prisma.userFollow.findUnique({ where: { followerId_followingId: { followerId: authorId, followingId: profile.id } } });
        if (!follows) throw new BadRequestException('Писать на стене могут только подписчики');
      }
    }
    const post = await this.prisma.$transaction(async (tx) => {
      const created = await tx.wallPost.create({ data: { profileUserId: profile.id, authorId, body } });
      if (profile.id !== authorId) await this.notifications.deliver({ userId: profile.id, actorId: authorId, type: NotificationType.WALL_POST, title: 'Новая запись на стене', body: excerpt(body, 120), href: `/u/${profile.username}` }, tx);
      return created;
    });
    return { id: post.id };
  }

  async sendGift(usernameInput: string, senderId: string, workshopItemId: string, messageInput?: string) {
    const recipient = await this.prisma.user.findUnique({
      where: { username: usernameInput.toLowerCase() },
      select: { id: true, username: true },
    });
    if (!recipient) throw new NotFoundException('Пользователь не найден');
    if (recipient.id === senderId) throw new BadRequestException('Нельзя отправить подарок самому себе');

    const gift = await this.prisma.workshopItem.findFirst({
      where: { id: workshopItemId, type: 'GIFT', status: 'PUBLISHED' },
      select: { id: true, title: true },
    });
    if (!gift) throw new NotFoundException('Подарок не найден или ещё не опубликован');

    const created = await this.prisma.$transaction(async (tx) => {
      const row = await tx.userGift.create({
        data: { recipientId: recipient.id, senderId, giftId: gift.id, message: messageInput?.trim() || null },
      });
      await this.notifications.deliver({
        userId: recipient.id, actorId: senderId, type: NotificationType.SYSTEM,
        title: 'Новый подарок', body: gift.title, href: `/u/${recipient.username}`,
      }, tx);
      await tx.auditLog.create({
        data: { actorId: senderId, action: 'user.gift.send', entityType: 'UserGift', entityId: row.id, metadata: { recipientUsername: recipient.username, giftId: gift.id } },
      });
      return row;
    });
    return { id: created.id };
  }

  async deleteWallPost(usernameInput: string, postId: string, actorId: string) {
    const profile = await this.prisma.user.findUnique({ where: { username: usernameInput.toLowerCase() }, select: { id: true } });
    if (!profile) throw new NotFoundException('Пользователь не найден');
    const post = await this.prisma.wallPost.findFirst({ where: { id: postId, profileUserId: profile.id, hiddenAt: null } });
    if (!post) throw new NotFoundException('Запись на стене не найдена');
    if (post.authorId !== actorId && profile.id !== actorId) throw new ForbiddenException('Нет права удалить эту запись');
    await this.prisma.wallPost.update({ where: { id: post.id }, data: { hiddenAt: new Date() } });
    return { ok: true };
  }
}
