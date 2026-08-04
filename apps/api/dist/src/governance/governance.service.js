var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CommunityRoleType, GlobalRole, PollKind, PollStatus, ProposalStatus, VoteClass } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { CommunitiesService } from '../communities/communities.service.js';
import { determineVoteClass } from './rules.js';
import { NotificationsService } from '../notifications/notifications.service.js';
let GovernanceService = class GovernanceService {
    prisma;
    communities;
    notifications;
    constructor(prisma, communities, notifications) {
        this.prisma = prisma;
        this.communities = communities;
        this.notifications = notifications;
    }
    async proposals(userId) {
        const items = await this.prisma.communityProposal.findMany({
            orderBy: [{ status: 'asc' }, { createdAt: 'desc' }], take: 200,
            include: {
                author: { select: { username: true, displayName: true, avatarUrl: true } },
                suggestedParent: { select: { slug: true, name: true } },
                _count: { select: { supports: true } },
                supports: { where: { userId: userId ?? '00000000-0000-0000-0000-000000000000' }, take: 1 },
            },
        });
        return items.map((item) => ({ ...item, supportCount: item._count.supports, supportedByViewer: item.supports.length > 0, supports: undefined, _count: undefined }));
    }
    async createProposal(userId, dto) {
        const parent = dto.parentSlug ? await this.prisma.community.findUnique({ where: { slug: dto.parentSlug } }) : null;
        if (dto.parentSlug && !parent)
            throw new NotFoundException('Родительское сообщество не найдено');
        return this.prisma.communityProposal.create({ data: {
                authorId: userId, suggestedParentId: parent?.id, name: dto.name.trim(), description: dto.description.trim(), initialTopics: dto.initialTopics.trim(),
                supports: { create: { userId } },
            } });
    }
    async toggleSupport(userId, proposalId) {
        const proposal = await this.prisma.communityProposal.findUnique({ where: { id: proposalId } });
        if (!proposal || proposal.status !== ProposalStatus.OPEN)
            throw new NotFoundException('Открытое предложение не найдено');
        const existing = await this.prisma.proposalSupport.findUnique({ where: { proposalId_userId: { proposalId, userId } } });
        if (existing) {
            await this.prisma.proposalSupport.delete({ where: { proposalId_userId: { proposalId, userId } } });
            return { supported: false };
        }
        await this.prisma.proposalSupport.create({ data: { proposalId, userId } });
        return { supported: true };
    }
    async resolveProposal(actorId, proposalId, status, note) {
        if (status !== ProposalStatus.APPROVED && status !== ProposalStatus.REJECTED)
            throw new BadRequestException('Недопустимый результат');
        const proposal = await this.prisma.communityProposal.findUnique({ where: { id: proposalId }, include: { suggestedParent: true } });
        if (!proposal || proposal.status !== ProposalStatus.OPEN)
            throw new NotFoundException('Открытое предложение не найдено');
        let community = null;
        if (status === ProposalStatus.APPROVED) {
            community = await this.communities.create({ name: proposal.name, description: proposal.description, shortDescription: proposal.description.slice(0, 180), parentSlug: proposal.suggestedParent?.slug }, actorId);
        }
        await this.prisma.$transaction([
            this.prisma.communityProposal.update({ where: { id: proposalId }, data: { status, resolutionNote: note.trim() } }),
            this.prisma.auditLog.create({ data: { actorId, action: 'community.proposal.resolve', entityType: 'CommunityProposal', entityId: proposalId, metadata: { status, note, communitySlug: community?.slug } } }),
        ]);
        return { ok: true, community };
    }
    async canCreatePoll(user, communityId) {
        if (user.role === GlobalRole.ADMIN || user.role === GlobalRole.OWNER)
            return true;
        return Boolean(await this.prisma.communityRole.findFirst({ where: { userId: user.id, communityId, endedAt: null, role: { in: [CommunityRoleType.CURATOR, CommunityRoleType.ASSISTANT] } } }));
    }
    async createPoll(communitySlug, user, dto) {
        const community = await this.prisma.community.findUnique({ where: { slug: communitySlug } });
        if (!community)
            throw new NotFoundException('Сообщество не найдено');
        if (!(await this.canCreatePoll(user, community.id)))
            throw new ForbiddenException('Опросы создаёт куратор или администрация');
        const closesAt = new Date(dto.closesAt);
        if (closesAt.getTime() < Date.now() + 60 * 60 * 1000 || closesAt.getTime() > Date.now() + 90 * 86400000)
            throw new BadRequestException('Срок опроса должен быть от 1 часа до 90 дней');
        const options = dto.options.map((option) => option.trim()).filter(Boolean);
        if (new Set(options.map((x) => x.toLowerCase())).size !== options.length)
            throw new BadRequestException('Варианты не должны повторяться');
        const poll = await this.prisma.communityPoll.create({ data: {
                communityId: community.id, createdById: user.id, title: dto.title.trim(), description: dto.description.trim(), closesAt,
                kind: dto.kind ?? PollKind.GENERAL, quorum: dto.quorum ?? null, minAccountAgeDays: dto.minAccountAgeDays ?? 14,
                requireSubscription: dto.requireSubscription ?? true, allowAdvisory: dto.allowAdvisory ?? true,
                options: { create: options.map((label, position) => ({ label, position })) },
            }, include: { options: { orderBy: { position: 'asc' } } } });
        void this.notifications.deliverToCommunitySubscribers({
            communityId: community.id,
            importance: 'IMPORTANT',
            title: `Новое голосование в ${community.name}`,
            body: poll.title,
            href: '/events',
            actorId: user.id,
        }).catch(() => undefined);
        return poll;
    }
    async polls(userId) {
        const now = new Date();
        await this.prisma.communityPoll.updateMany({ where: { status: PollStatus.OPEN, closesAt: { lte: now } }, data: { status: PollStatus.CLOSED } });
        const polls = await this.prisma.communityPoll.findMany({
            orderBy: [{ status: 'asc' }, { createdAt: 'desc' }], take: 100,
            include: {
                community: { select: { slug: true, name: true, accentColor: true } },
                createdBy: { select: { username: true, displayName: true } },
                options: { orderBy: { position: 'asc' }, include: { votes: { select: { voteClass: true } } } },
                votes: { where: { userId: userId ?? '00000000-0000-0000-0000-000000000000' }, take: 1 },
            },
        });
        return polls.map((poll) => ({
            id: poll.id, title: poll.title, description: poll.description, kind: poll.kind, status: poll.status, closesAt: poll.closesAt, createdAt: poll.createdAt,
            quorum: poll.quorum, minAccountAgeDays: poll.minAccountAgeDays, requireSubscription: poll.requireSubscription, allowAdvisory: poll.allowAdvisory, resultNote: poll.resultNote, resultPublishedAt: poll.resultPublishedAt,
            community: poll.community, createdBy: poll.createdBy, viewerVote: poll.votes[0] ?? null,
            options: poll.options.map((option) => ({ id: option.id, label: option.label, position: option.position, bindingVotes: option.votes.filter((vote) => vote.voteClass === VoteClass.BINDING).length, advisoryVotes: option.votes.filter((vote) => vote.voteClass === VoteClass.ADVISORY).length })),
        }));
    }
    async castVote(user, pollId, optionId) {
        const poll = await this.prisma.communityPoll.findUnique({ where: { id: pollId }, include: { options: true } });
        if (!poll || poll.status !== PollStatus.OPEN || poll.closesAt <= new Date())
            throw new BadRequestException('Опрос закрыт');
        if (!poll.options.some((option) => option.id === optionId))
            throw new BadRequestException('Вариант не относится к этому опросу');
        const subscribed = await this.prisma.communitySubscription.findUnique({ where: { userId_communityId: { userId: user.id, communityId: poll.communityId } } });
        const voteClass = determineVoteClass({
            privileged: user.role === GlobalRole.ADMIN || user.role === GlobalRole.OWNER,
            directlySubscribed: poll.requireSubscription ? Boolean(subscribed) : true,
            accountCreatedAt: user.createdAt,
            minimumAgeDays: poll.minAccountAgeDays,
        });
        if (voteClass === VoteClass.ADVISORY && !poll.allowAdvisory)
            throw new ForbiddenException('Для этого голосования аккаунт пока не соответствует условиям решающего голоса');
        await this.prisma.pollVote.upsert({ where: { pollId_userId: { pollId, userId: user.id } }, update: { optionId, voteClass }, create: { pollId, optionId, userId: user.id, voteClass } });
        return { ok: true, voteClass };
    }
    async closePoll(user, pollId, resultNote) {
        const poll = await this.prisma.communityPoll.findUnique({ where: { id: pollId }, include: { community: true } });
        if (!poll)
            throw new NotFoundException('Голосование не найдено');
        if (poll.status !== PollStatus.OPEN)
            throw new BadRequestException('Голосование уже закрыто');
        if (poll.createdById !== user.id && !(await this.canCreatePoll(user, poll.communityId)))
            throw new ForbiddenException('Закрыть голосование может автор или команда сообщества');
        const votes = await this.prisma.pollVote.count({ where: { pollId, voteClass: VoteClass.BINDING } });
        const quorumReached = poll.quorum === null || votes >= poll.quorum;
        await this.prisma.$transaction([
            this.prisma.communityPoll.update({ where: { id: pollId }, data: { status: PollStatus.CLOSED, closesAt: new Date(), resultNote: resultNote.trim(), resultPublishedAt: new Date() } }),
            this.prisma.auditLog.create({ data: { actorId: user.id, action: 'community.poll.close', entityType: 'CommunityPoll', entityId: pollId, metadata: { resultNote: resultNote.trim(), quorum: poll.quorum, bindingVotes: votes, quorumReached } } }),
        ]);
        return { ok: true, quorumReached, bindingVotes: votes, quorum: poll.quorum };
    }
};
GovernanceService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService, CommunitiesService, NotificationsService])
], GovernanceService);
export { GovernanceService };
//# sourceMappingURL=governance.service.js.map