import { Injectable } from '@nestjs/common';
import { PollStatus, PublicationStatus } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class HomeService {
  constructor(private readonly prisma: PrismaService) {}

  async overview(userId?: string) {
    const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const now = new Date();
    const [verifiedUsers, activeUsers24h, publications, comments24h, communities, poll, proposal] = await Promise.all([
      this.prisma.user.count({ where: { emailVerifiedAt: { not: null } } }),
      this.prisma.user.count({ where: { lastSeenAt: { gte: dayAgo } } }),
      this.prisma.publication.count({ where: { status: PublicationStatus.PUBLISHED } }),
      this.prisma.comment.count({ where: { hiddenAt: null, createdAt: { gte: dayAgo } } }),
      this.prisma.community.count({ where: { status: 'ACTIVE' } }),
      this.prisma.communityPoll.findFirst({
        where: { status: PollStatus.OPEN, closesAt: { gt: now } },
        orderBy: { createdAt: 'desc' },
        include: {
          community: { select: { slug: true, name: true, accentColor: true } },
          options: { orderBy: { position: 'asc' }, include: { _count: { select: { votes: true } } } },
          votes: { where: { userId: userId ?? '00000000-0000-0000-0000-000000000000' }, take: 1 },
        },
      }),
      this.prisma.communityProposal.findFirst({
        where: { status: 'OPEN' }, orderBy: { createdAt: 'desc' },
        include: { author: { select: { username: true, displayName: true } }, _count: { select: { supports: true } } },
      }),
    ]);

    return {
      stats: { verifiedUsers, activeUsers24h, publications, comments24h, communities },
      poll: poll ? {
        id: poll.id,
        title: poll.title,
        closesAt: poll.closesAt,
        community: poll.community,
        totalVotes: poll.options.reduce((sum, option) => sum + option._count.votes, 0),
        viewerVoted: poll.votes.length > 0,
      } : null,
      proposal: proposal ? {
        id: proposal.id,
        name: proposal.name,
        description: proposal.description,
        supportCount: proposal._count.supports,
        author: proposal.author,
      } : null,
    };
  }
}
