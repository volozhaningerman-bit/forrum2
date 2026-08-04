var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { PollStatus, PublicationStatus } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
let HomeService = class HomeService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async overview(userId) {
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
};
HomeService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], HomeService);
export { HomeService };
//# sourceMappingURL=home.service.js.map