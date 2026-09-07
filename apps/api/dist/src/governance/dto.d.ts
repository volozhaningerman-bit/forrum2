import { PollKind, ProposalStatus } from '../generated/prisma/client.js';
export declare class CreateProposalDto {
    name: string;
    description: string;
    initialTopics: string;
    parentSlug?: string;
    curatorInterest?: string;
}
export declare class ResolveProposalDto {
    status: ProposalStatus;
    note: string;
}
export declare class CreatePollDto {
    title: string;
    description: string;
    kind: PollKind;
    options: string[];
    closesAt: string;
    quorum?: number;
    minAccountAgeDays?: number;
    requireSubscription?: boolean;
    allowAdvisory?: boolean;
}
export declare class ClosePollDto {
    resultNote: string;
}
export declare class CastVoteDto {
    optionId: string;
}
export declare class CreateCuratorApplicationDto {
    communitySlug: string;
    motivation: string;
    plan: string;
}
