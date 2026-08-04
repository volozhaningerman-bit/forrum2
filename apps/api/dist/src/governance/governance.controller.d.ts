import type { User } from '../generated/prisma/client.js';
import { CastVoteDto, ClosePollDto, CreatePollDto, CreateProposalDto, ResolveProposalDto } from './dto.js';
import { GovernanceService } from './governance.service.js';
export declare class GovernanceController {
    private readonly service;
    constructor(service: GovernanceService);
    proposals(user?: User): Promise<{
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
        status: import("../generated/prisma/enums.js").ProposalStatus;
        authorId: string;
        resolutionNote: string | null;
        suggestedParentId: string | null;
        initialTopics: string;
    }[]>;
    createProposal(user: User, dto: CreateProposalDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        status: import("../generated/prisma/enums.js").ProposalStatus;
        authorId: string;
        resolutionNote: string | null;
        suggestedParentId: string | null;
        initialTopics: string;
    }>;
    support(user: User, id: string): Promise<{
        supported: boolean;
    }>;
    polls(user?: User): Promise<{
        id: string;
        title: string;
        description: string;
        kind: import("../generated/prisma/enums.js").PollKind;
        status: import("../generated/prisma/enums.js").PollStatus;
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
            voteClass: import("../generated/prisma/enums.js").VoteClass;
        };
        options: {
            id: string;
            label: string;
            position: number;
            bindingVotes: number;
            advisoryVotes: number;
        }[];
    }[]>;
    createPoll(user: User, slug: string, dto: CreatePollDto): Promise<{
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
        status: import("../generated/prisma/enums.js").PollStatus;
        createdById: string;
        title: string;
        kind: import("../generated/prisma/enums.js").PollKind;
        quorum: number | null;
        minAccountAgeDays: number;
        requireSubscription: boolean;
        allowAdvisory: boolean;
        resultNote: string | null;
        resultPublishedAt: Date | null;
        closesAt: Date;
    }>;
    vote(user: User, id: string, dto: CastVoteDto): Promise<{
        ok: boolean;
        voteClass: import("../generated/prisma/enums.js").VoteClass;
    }>;
    close(user: User, id: string, dto: ClosePollDto): Promise<{
        ok: boolean;
        quorumReached: boolean;
        bindingVotes: number;
        quorum: number | null;
    }>;
}
export declare class GovernanceAdminController {
    private readonly service;
    constructor(service: GovernanceService);
    resolve(user: User, id: string, dto: ResolveProposalDto): Promise<{
        ok: boolean;
        community: {
            slug: string;
        } | null;
    }>;
}
