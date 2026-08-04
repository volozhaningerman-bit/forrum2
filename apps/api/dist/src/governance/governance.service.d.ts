import { PollKind, PollStatus, ProposalStatus, VoteClass, type User } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { CommunitiesService } from '../communities/communities.service.js';
import type { CreatePollDto, CreateProposalDto } from './dto.js';
import { NotificationsService } from '../notifications/notifications.service.js';
export declare class GovernanceService {
    private readonly prisma;
    private readonly communities;
    private readonly notifications;
    constructor(prisma: PrismaService, communities: CommunitiesService, notifications: NotificationsService);
    proposals(userId?: string): Promise<{
        supportCount: number;
        supportedByViewer: boolean;
        supports: undefined;
        _count: undefined;
        author: {
            username: string;
            displayName: string;
            avatarUrl: string | null;
        };
        suggestedParent: {
            slug: string;
            name: string;
        } | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        status: ProposalStatus;
        authorId: string;
        resolutionNote: string | null;
        suggestedParentId: string | null;
        initialTopics: string;
    }[]>;
    createProposal(userId: string, dto: CreateProposalDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        status: ProposalStatus;
        authorId: string;
        resolutionNote: string | null;
        suggestedParentId: string | null;
        initialTopics: string;
    }>;
    toggleSupport(userId: string, proposalId: string): Promise<{
        supported: boolean;
    }>;
    resolveProposal(actorId: string, proposalId: string, status: ProposalStatus, note: string): Promise<{
        ok: boolean;
        community: {
            slug: string;
        } | null;
    }>;
    private canCreatePoll;
    createPoll(communitySlug: string, user: User, dto: CreatePollDto): Promise<{
        options: {
            id: string;
            label: string;
            pollId: string;
            position: number;
        }[];
    } & {
        id: string;
        createdAt: Date;
        communityId: string;
        description: string;
        status: PollStatus;
        createdById: string;
        title: string;
        kind: PollKind;
        quorum: number | null;
        minAccountAgeDays: number;
        requireSubscription: boolean;
        allowAdvisory: boolean;
        resultNote: string | null;
        resultPublishedAt: Date | null;
        closesAt: Date;
    }>;
    polls(userId?: string): Promise<{
        id: string;
        title: string;
        description: string;
        kind: PollKind;
        status: PollStatus;
        closesAt: Date;
        createdAt: Date;
        quorum: number | null;
        minAccountAgeDays: number;
        requireSubscription: boolean;
        allowAdvisory: boolean;
        resultNote: string | null;
        resultPublishedAt: Date | null;
        community: {
            slug: string;
            name: string;
            accentColor: string;
        };
        createdBy: {
            username: string;
            displayName: string;
        };
        viewerVote: {
            id: string;
            createdAt: Date;
            userId: string;
            pollId: string;
            optionId: string;
            voteClass: VoteClass;
        };
        options: {
            id: string;
            label: string;
            position: number;
            bindingVotes: number;
            advisoryVotes: number;
        }[];
    }[]>;
    castVote(user: User, pollId: string, optionId: string): Promise<{
        ok: boolean;
        voteClass: VoteClass;
    }>;
    closePoll(user: User, pollId: string, resultNote: string): Promise<{
        ok: boolean;
        quorumReached: boolean;
        bindingVotes: number;
        quorum: number | null;
    }>;
}
