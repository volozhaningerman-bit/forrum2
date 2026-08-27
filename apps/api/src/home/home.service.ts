import { Injectable } from '@nestjs/common';
import {
  PollStatus,
  PublicationFormat,
  PublicationStatus,
  ReactionType,
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
      weeklyTopics,
      weeklyComments,
      publicationReactions,
      commentReactions,
      poll,
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
      this.prisma.communityPoll.findFirst({
        where: {
          status: PollStatus.OPEN,
          closesAt: { gt: now },
        },
        orderBy: { createdAt: 'desc' },
        include: {
          community: {
            select: {
              slug: true,
              name: true,
              accentColor: true,
            },
          },
          options: {
            orderBy: { position: 'asc' },
            include: {
              _count: { select: { votes: true } },
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

    const activity = new Map<string, WeeklyAccumulator>();
    const likes = new Map<string, WeeklyAccumulator>();

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
          (item) => item.topicCount + item.commentCount,
        ),
      },
      poll: poll
        ? {
            id: poll.id,
            title: poll.title,
            closesAt: poll.closesAt,
            community: poll.community,
            totalVotes: poll.options.reduce(
              (sum, option) =>
                sum + option._count.votes,
              0,
            ),
            viewerVoted: poll.votes.length > 0,
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
