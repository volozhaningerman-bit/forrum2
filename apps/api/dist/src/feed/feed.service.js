var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { excerpt } from '../common/text.js';
import { expandCommunityIds } from '../common/community-tree.js';
import { calculateFeedScore } from './ranking.js';
import { includeInForYou } from './policy.js';
const emptyViewerId = '00000000-0000-0000-0000-000000000000';
let FeedService = class FeedService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async preferences(userId) {
        const [preference, hiddenCommunities, hiddenPublicationCount] = await Promise.all([
            this.prisma.feedPreference.findUnique({ where: { userId } }),
            this.prisma.hiddenCommunity.findMany({
                where: { userId }, orderBy: { createdAt: 'desc' },
                include: { community: { select: { slug: true, name: true, accentColor: true } } },
            }),
            this.prisma.hiddenPublication.count({ where: { userId } }),
        ]);
        return {
            recommendationsEnabled: preference?.recommendationsEnabled ?? true,
            showReasons: preference?.showReasons ?? true,
            hiddenPublicationCount,
            hiddenCommunities: hiddenCommunities.map((item) => item.community),
        };
    }
    async updatePreferences(userId, dto) {
        await this.prisma.feedPreference.upsert({
            where: { userId },
            create: {
                userId,
                recommendationsEnabled: dto.recommendationsEnabled ?? true,
                showReasons: dto.showReasons ?? true,
            },
            update: {
                recommendationsEnabled: dto.recommendationsEnabled,
                showReasons: dto.showReasons,
            },
        });
        return this.preferences(userId);
    }
    async hidePublication(userId, publicationId) {
        const publication = await this.prisma.publication.findFirst({ where: { id: publicationId, status: 'PUBLISHED' }, select: { id: true } });
        if (!publication)
            throw new NotFoundException('Публикация не найдена');
        await this.prisma.hiddenPublication.upsert({
            where: { userId_publicationId: { userId, publicationId } },
            create: { userId, publicationId }, update: {},
        });
        return { ok: true };
    }
    async unhidePublication(userId, publicationId) {
        await this.prisma.hiddenPublication.deleteMany({ where: { userId, publicationId } });
        return { ok: true };
    }
    async clearHiddenPublications(userId) {
        const result = await this.prisma.hiddenPublication.deleteMany({ where: { userId } });
        return { ok: true, restored: result.count };
    }
    async hideCommunity(userId, slugInput) {
        const community = await this.prisma.community.findUnique({ where: { slug: slugInput.toLowerCase() }, select: { id: true } });
        if (!community)
            throw new NotFoundException('Сообщество не найдено');
        await this.prisma.hiddenCommunity.upsert({
            where: { userId_communityId: { userId, communityId: community.id } },
            create: { userId, communityId: community.id }, update: {},
        });
        return { ok: true };
    }
    async unhideCommunity(userId, slugInput) {
        const community = await this.prisma.community.findUnique({ where: { slug: slugInput.toLowerCase() }, select: { id: true } });
        if (!community)
            throw new NotFoundException('Сообщество не найдено');
        await this.prisma.hiddenCommunity.deleteMany({ where: { userId, communityId: community.id } });
        return { ok: true };
    }
    async get(mode, userId) {
        if ((mode === 'subscriptions' || mode === 'saved') && !userId)
            return [];
        const now = Date.now();
        const recentCommentSince = new Date(now - 24 * 60 * 60 * 1000);
        const viewer = userId ? await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                subscriptions: { select: { communityId: true } },
                following: { select: { followingId: true } },
                tagSubscriptions: { select: { tagId: true } },
                feedPreference: true,
                hiddenCommunities: { select: { communityId: true } },
                hiddenPublications: { select: { publicationId: true } },
            },
        }) : null;
        const directCommunityIds = new Set(viewer?.subscriptions.map((item) => item.communityId) ?? []);
        const directHiddenCommunityIds = new Set(viewer?.hiddenCommunities.map((item) => item.communityId) ?? []);
        const nodes = directCommunityIds.size || directHiddenCommunityIds.size
            ? await this.prisma.community.findMany({ where: { status: 'ACTIVE' }, select: { id: true, parentId: true } })
            : [];
        const communityIds = expandCommunityIds(nodes, directCommunityIds);
        const hiddenCommunityIds = expandCommunityIds(nodes, directHiddenCommunityIds);
        const followingIds = new Set(viewer?.following.map((item) => item.followingId) ?? []);
        const tagIds = new Set(viewer?.tagSubscriptions.map((item) => item.tagId) ?? []);
        const hiddenPublicationIds = new Set(viewer?.hiddenPublications.map((item) => item.publicationId) ?? []);
        const recommendationsEnabled = viewer?.feedPreference?.recommendationsEnabled ?? true;
        const showReasons = viewer?.feedPreference?.showReasons ?? true;
        const exclusions = {
            id: hiddenPublicationIds.size ? { notIn: [...hiddenPublicationIds] } : undefined,
            communityId: hiddenCommunityIds.size && !['subscriptions', 'saved'].includes(mode) ? { notIn: [...hiddenCommunityIds] } : undefined,
        };
        let where = { status: 'PUBLISHED', ...exclusions };
        if (mode === 'subscriptions' && userId) {
            const sources = [];
            if (communityIds.size)
                sources.push({ communityId: { in: [...communityIds] } });
            if (followingIds.size)
                sources.push({ authorId: { in: [...followingIds] } });
            if (tagIds.size)
                sources.push({ tags: { some: { tagId: { in: [...tagIds] } } } });
            if (!sources.length)
                return [];
            where = { ...where, OR: sources };
        }
        if (mode === 'saved' && userId)
            where = { ...where, bookmarks: { some: { userId } } };
        const candidates = await this.prisma.publication.findMany({
            where,
            orderBy: mode === 'new' ? { createdAt: 'desc' } : [{ pinnedUntil: 'desc' }, { lastActivityAt: 'desc' }],
            take: mode === 'new' ? 80 : 240,
            include: {
                author: true,
                community: true,
                tags: { include: { tag: true } },
                comments: {
                    where: {
                        hiddenAt: null,
                        createdAt: { gte: recentCommentSince },
                    },
                    select: { id: true },
                },
                _count: { select: { comments: { where: { hiddenAt: null } }, reactions: true, bookmarks: true } },
                reactions: { where: { userId: userId ?? emptyViewerId }, take: 1 },
                bookmarks: { where: { userId: userId ?? emptyViewerId }, take: 1 },
            },
        });
        const scored = candidates.map((publication) => {
            const ranking = calculateFeedScore({
                mode,
                format: publication.format,
                createdAtMs: publication.createdAt.getTime(),
                lastActivityAtMs: publication.lastActivityAt.getTime(),
                nowMs: now,
                commentCount: publication._count.comments,
                recentCommentCount: publication.comments.length,
                reactionCount: publication._count.reactions,
                bookmarkCount: publication._count.bookmarks,
                viewCount: publication.viewCount,
                isCommunitySubscribed: communityIds.has(publication.communityId),
                isAuthorFollowed: followingIds.has(publication.authorId),
                matchingTagCount: publication.tags.filter((item) => tagIds.has(item.tagId)).length,
                isPinned: Boolean(publication.pinnedUntil && publication.pinnedUntil.getTime() > now),
            });
            return { publication, ...ranking };
        }).sort((a, b) => b.score - a.score);
        const selected = [];
        const communityCount = new Map();
        const authorCount = new Map();
        for (const item of scored) {
            if (selected.length >= 50)
                break;
            if (mode === 'for-you' && !includeInForYou({ authenticated: Boolean(userId), recommendationsEnabled, personallyRelevant: item.personallyRelevant, discussed: item.discussed }))
                continue;
            const c = communityCount.get(item.publication.communityId) ?? 0;
            const a = authorCount.get(item.publication.authorId) ?? 0;
            if (!['subscriptions', 'saved', 'new'].includes(mode) && (c >= 4 || a >= 3))
                continue;
            selected.push(item);
            communityCount.set(item.publication.communityId, c + 1);
            authorCount.set(item.publication.authorId, a + 1);
        }
        return selected.map(({ publication, reason }) => ({
            id: publication.id,
            slug: publication.slug,
            format: publication.format,
            type: publication.type,
            title: publication.title,
            excerpt: excerpt(publication.body),
            viewCount: publication.viewCount,
            createdAt: publication.createdAt,
            lastActivityAt: publication.lastActivityAt,
            pinnedUntil: publication.pinnedUntil,
            reason: showReasons ? reason : null,
            feedbackEnabled: Boolean(userId && ['for-you', 'all', 'popular', 'new'].includes(mode)),
            author: { username: publication.author.username, displayName: publication.author.displayName, avatarUrl: publication.author.avatarUrl },
            community: {
                slug: publication.community.slug,
                name: publication.community.name,
                accentColor: publication.community.accentColor,
                avatarUrl: publication.community.avatarUrl,
                coverUrl: publication.community.coverUrl,
            },
            commentCount: publication._count.comments,
            recentCommentCount: publication.comments.length,
            reactionCount: publication._count.reactions,
            bookmarkCount: publication._count.bookmarks,
            viewerReaction: publication.reactions[0]?.type ?? null,
            isBookmarked: publication.bookmarks.length > 0,
            tags: publication.tags.map((item) => item.tag),
        }));
    }
};
FeedService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], FeedService);
export { FeedService };
//# sourceMappingURL=feed.service.js.map