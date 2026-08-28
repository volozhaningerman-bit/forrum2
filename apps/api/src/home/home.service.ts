import { Injectable } from '@nestjs/common';
import {
  PollStatus,
  PublicationFormat,
  PublicationStatus,
  ReactionType,
  VoteClass,
} from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';

type WeeklyUser = {
  username: string;
  displayName: string;
  avatarUrl: string | null;
  score: number;
  reactionCount: number;
  topicCount: number;
  commentCount: number;
  presenceCount: number;
};

type WeeklyAccumulator = WeeklyUser & {
  id: string;
};

type UserIdentity = {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string | null;
};

const onlineRecordKey = 'home.recordOnline';

function homeExcerpt(value: string) {
  const normalized = value.replace(/\s+/g, ' ').trim();
  if (!normalized) return 'Без описания.';
  return normalized.length > 180
    ? `${normalized.slice(0, 177).trimEnd()}...`
    : normalized;
}

function getWeeklyUser(
  map: Map<string, WeeklyAccumulator>,
  user: UserIdentity,
) {
  const existing = map.get(user.id);

  if (existing) return existing;

  const created: WeeklyAccumulator = {
    id: user.id,
    username: user.username,
    displayName: user.displayName,
    avatarUrl: user.avatarUrl,
    score: 0,
    reactionCount: 0,
    topicCount: 0,
    commentCount: 0,
    presenceCount: 0,
  };

  map.set(user.id, created);
  return created;
}

function topWeekly(
  map: Map<string, WeeklyAccumulator>,
  score: (item: WeeklyAccumulator) => number,
) {
  return [...map.values()]
    .map((item) => ({
      username: item.username,
      displayName: item.displayName,
      avatarUrl: item.avatarUrl,
      score: score(item),
      reactionCount: item.reactionCount,
      topicCount: item.topicCount,
      commentCount: item.commentCount,
      presenceCount: item.presenceCount,
    }))
    .filter((item) => item.score > 0)
    .sort(
      (left, right) =>
        right.score - left.score ||
        left.username.localeCompare(right.username),
    )
    .slice(0, 5);
}

function readOnlineRecord(value: unknown) {
  if (
    typeof value !== 'object' ||
    value === null ||
    Array.isArray(value)
  ) {
    return { count: 0, at: null as string | null };
  }

  const record = value as Record<string, unknown>;
  const count =
    typeof record.count === 'number' &&
    Number.isFinite(record.count)
      ? Math.max(0, Math.floor(record.count))
      : 0;
  const at =
    typeof record.at === 'string'
      ? record.at
      : null;

  return { count, at };
}

@Injectable()
export class HomeService {
  constructor(private readonly prisma: PrismaService) {}

  async overview(userId?: string) {
    const now = new Date();
    const dayAgo = new Date(
      now.getTime() - 24 * 60 * 60 * 1000,
    );
    const weekAgo = new Date(
      now.getTime() - 7 * 24 * 60 * 60 * 1000,
    );
    const onlineSince = new Date(
      now.getTime() - 5 * 60 * 1000,
    );

    const [
      verifiedUsers,
      activeUsers24h,
      publications,
      comments24h,
      communities,
      topics,
      messages,
      onlineSessions,
      recordSetting,
      weeklyActiveUsers,
      weeklyTopics,
      weeklyComments,
      publicationReactions,
      commentReactions,
      polls,
      proposal,
    ] = await Promise.all([
      this.prisma.user.count({
        where: { emailVerifiedAt: { not: null } },
      }),
      this.prisma.user.count({
        where: { lastSeenAt: { gte: dayAgo } },
      }),
      this.prisma.publication.count({
        where: { status: PublicationStatus.PUBLISHED },
      }),
      this.prisma.comment.count({
        where: {
          hiddenAt: null,
          createdAt: { gte: dayAgo },
        },
      }),
      this.prisma.community.count({
        where: { status: 'ACTIVE' },
      }),
      this.prisma.publication.count({
        where: {
          status: PublicationStatus.PUBLISHED,
          format: PublicationFormat.TOPIC,
        },
      }),
      this.prisma.comment.count({
        where: { hiddenAt: null },
      }),
      this.prisma.session.findMany({
        where: {
          revokedAt: null,
          expiresAt: { gt: now },
          lastSeenAt: { gte: onlineSince },
        },
        distinct: ['userId'],
        select: { userId: true },
      }),
      this.prisma.platformSetting.findUnique({
        where: { key: onlineRecordKey },
      }),
      this.prisma.user.findMany({
        where: {
          lastSeenAt: { gte: weekAgo },
        },
        orderBy: { lastSeenAt: 'desc' },
        take: 100,
        select: {
          id: true,
          username: true,
          displayName: true,
          avatarUrl: true,
        },
      }),
      this.prisma.publication.findMany({
        where: {
          status: PublicationStatus.PUBLISHED,
          format: PublicationFormat.TOPIC,
          createdAt: { gte: weekAgo },
        },
        select: {
          author: {
            select: {
              id: true,
              username: true,
              displayName: true,
              avatarUrl: true,
            },
          },
        },
      }),
      this.prisma.comment.findMany({
        where: {
          hiddenAt: null,
          createdAt: { gte: weekAgo },
          publication: {
            status: PublicationStatus.PUBLISHED,
          },
        },
        select: {
          author: {
            select: {
              id: true,
              username: true,
              displayName: true,
              avatarUrl: true,
            },
          },
        },
      }),
      this.prisma.publicationReaction.findMany({
        where: {
          createdAt: { gte: weekAgo },
          type: ReactionType.LIKE,
          publication: {
            status: PublicationStatus.PUBLISHED,
          },
        },
        select: {
          userId: true,
          publication: {
            select: {
              author: {
                select: {
                  id: true,
                  username: true,
                  displayName: true,
                  avatarUrl: true,
                },
              },
            },
          },
        },
      }),
      this.prisma.commentReaction.findMany({
        where: {
          createdAt: { gte: weekAgo },
          type: ReactionType.LIKE,
          comment: {
            hiddenAt: null,
            publication: {
              status: PublicationStatus.PUBLISHED,
            },
          },
        },
        select: {
          userId: true,
          comment: {
            select: {
              author: {
                select: {
                  id: true,
                  username: true,
                  displayName: true,
                  avatarUrl: true,
                },
              },
            },
          },
        },
      }),
      this.prisma.communityPoll.findMany({
        where: {
          status: PollStatus.OPEN,
          closesAt: { gt: now },
        },
        orderBy: { closesAt: 'asc' },
        take: 3,
        include: {
          community: {
            select: {
              slug: true,
              name: true,
              accentColor: true,
              avatarUrl: true,
            },
          },
          options: {
            orderBy: { position: 'asc' },
            include: {
              votes: {
                select: { voteClass: true },
              },
            },
          },
          votes: {
            where: {
              userId:
                userId ??
                '00000000-0000-0000-0000-000000000000',
            },
            take: 1,
          },
        },
      }),
      this.prisma.communityProposal.findFirst({
        where: { status: 'OPEN' },
        orderBy: { createdAt: 'desc' },
        include: {
          author: {
            select: {
              username: true,
              displayName: true,
            },
          },
          _count: { select: { supports: true } },
        },
      }),
    ]);

    // FORRUM_HOME_COMPLETION_V42_DATA
    const discussedSince = new Date(
      now.getTime() - 30 * 24 * 60 * 60 * 1000,
    );

    const discussedCandidates = await this.prisma.publication.findMany({
      where: {
        status: PublicationStatus.PUBLISHED,
        format: PublicationFormat.TOPIC,
        lastActivityAt: { gte: discussedSince },
      },
      orderBy: { lastActivityAt: 'desc' },
      take: 30,
      select: {
        id: true,
        slug: true,
        type: true,
        title: true,
        body: true,
        viewCount: true,
        createdAt: true,
        lastActivityAt: true,
        author: {
          select: {
            username: true,
            displayName: true,
            avatarUrl: true,
          },
        },
        community: {
          select: {
            slug: true,
            name: true,
            accentColor: true,
            avatarUrl: true,
          },
        },
        comments: {
          where: { hiddenAt: null },
          orderBy: { createdAt: 'desc' },
          take: 1,
          select: {
            createdAt: true,
            author: {
              select: {
                username: true,
                displayName: true,
              },
            },
          },
        },
        _count: {
          select: {
            comments: { where: { hiddenAt: null } },
            reactions: true,
          },
        },
      },
    });

    const discussed = discussedCandidates
      .map((item) => ({
        id: item.id,
        slug: item.slug,
        type: item.type,
        title: item.title,
        excerpt: homeExcerpt(item.body),
        viewCount: item.viewCount,
        createdAt: item.createdAt,
        lastActivityAt: item.lastActivityAt,
        commentCount: item._count.comments,
        reactionCount: item._count.reactions,
        author: item.author,
        community: item.community,
        lastComment: item.comments[0] ?? null,
        score:
          item._count.comments * 12 +
          item._count.reactions * 5 +
          Math.min(item.viewCount, 5000) / 50,
      }))
      .sort(
        (left, right) =>
          right.score - left.score ||
          right.lastActivityAt.getTime() - left.lastActivityAt.getTime(),
      )
      .slice(0, 5)
      .map(({ score: _score, ...item }) => item);

    const activity = new Map<string, WeeklyAccumulator>();
    const likes = new Map<string, WeeklyAccumulator>();

    // A real weekly activity ranking should not disappear just because a user
    // read/browsed without creating a topic. Presence is a low-weight real
    // activity signal; topics/comments keep the meaningful weight.
    for (const user of weeklyActiveUsers) {
      getWeeklyUser(activity, user).presenceCount += 1;
    }

    for (const item of weeklyTopics) {
      getWeeklyUser(activity, item.author).topicCount += 1;
    }

    for (const item of weeklyComments) {
      getWeeklyUser(activity, item.author).commentCount += 1;
    }

    for (const item of publicationReactions) {
      const author = item.publication.author;

      if (item.userId === author.id) continue;

      getWeeklyUser(likes, author).reactionCount += 1;
    }

    for (const item of commentReactions) {
      const author = item.comment.author;

      if (item.userId === author.id) continue;

      getWeeklyUser(likes, author).reactionCount += 1;
    }

    const usersOnline = onlineSessions.length;
    const savedRecord = readOnlineRecord(
      recordSetting?.value,
    );

    let recordOnline = savedRecord.count;
    let recordOnlineAt = savedRecord.at;

    if (usersOnline > recordOnline) {
      recordOnline = usersOnline;
      recordOnlineAt = now.toISOString();

      await this.prisma.platformSetting.upsert({
        where: { key: onlineRecordKey },
        create: {
          key: onlineRecordKey,
          value: {
            count: recordOnline,
            at: recordOnlineAt,
          },
        },
        update: {
          value: {
            count: recordOnline,
            at: recordOnlineAt,
          },
        },
      });
    }

    return {
      stats: {
        // Existing fields stay for backward compatibility.
        verifiedUsers,
        activeUsers24h,
        publications,
        comments24h,
        communities,
        // Canonical FORRUM Today metrics.
        topics,
        messages,
        usersOnline,
        recordOnline,
        recordOnlineAt,
      },
      weekly: {
        likes: topWeekly(
          likes,
          (item) => item.reactionCount,
        ),
        activity: topWeekly(
          activity,
          (item) =>
            item.topicCount * 3 +
            item.commentCount * 2 +
            item.presenceCount,
        ),
      },
      discussed,
      activePolls: polls.map((poll) => ({
        id: poll.id,
        title: poll.title,
        description: poll.description,
        kind: poll.kind,
        closesAt: poll.closesAt,
        status: poll.status,
        createdAt: poll.createdAt,
        community: poll.community,
        options: poll.options.map((option) => ({
          id: option.id,
          label: option.label,
          position: option.position,
          bindingVotes: option.votes.filter(
            (vote) => vote.voteClass === VoteClass.BINDING,
          ).length,
          advisoryVotes: option.votes.filter(
            (vote) => vote.voteClass === VoteClass.ADVISORY,
          ).length,
        })),
      })),
      // Backward-compatible single poll summary for existing consumers.
      poll: polls[0]
        ? {
            id: polls[0].id,
            title: polls[0].title,
            closesAt: polls[0].closesAt,
            community: polls[0].community,
            totalVotes: polls[0].options.reduce(
              (sum, option) => sum + option.votes.length,
              0,
            ),
            viewerVoted: polls[0].votes.length > 0,
          }
        : null,
      proposal: proposal
        ? {
            id: proposal.id,
            name: proposal.name,
            description: proposal.description,
            supportCount: proposal._count.supports,
            author: proposal.author,
          }
        : null,
    };
  }
}
