import { CommunityContentActionType, CommunityRoleType, CommunityStructureChangeType, TeamInviteStatus } from '../generated/prisma/client.js';
export declare class CreateCommunityReportDto {
    periodStart: string;
    periodEnd: string;
    summary: string;
    achievements: string;
    problems: string;
    plans: string;
    treasuryNote?: string;
}
export declare class CreateStructureProposalDto {
    type: CommunityStructureChangeType;
    title: string;
    description: string;
    proposedName?: string;
    targetCommunitySlug?: string;
}
export declare class ResolveStructureProposalDto {
    status: 'APPROVED' | 'REJECTED';
    note: string;
}
export declare class InviteCommunityRoleDto {
    username: string;
    role: CommunityRoleType;
    note: string;
}
export declare class RespondRoleInviteDto {
    status: TeamInviteStatus;
}
export declare class CommunityContentActionDto {
    action: CommunityContentActionType;
    note: string;
    targetCommunitySlug?: string;
    durationDays?: number;
}
