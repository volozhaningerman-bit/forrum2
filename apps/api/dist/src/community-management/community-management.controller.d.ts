import type { User } from '../generated/prisma/client.js';
import { CommunityManagementService } from './community-management.service.js';
import { CommunityContentActionDto, CreateCommunityReportDto, CreateStructureProposalDto, InviteCommunityRoleDto, RespondRoleInviteDto, ResolveStructureProposalDto } from './dto.js';
export declare class CommunityManagementController {
    private readonly service;
    constructor(service: CommunityManagementService);
    invites(user: User): Promise<({
        community: {
            slug: string;
            name: string;
            accentColor: string;
        };
        invitedBy: {
            username: string;
            displayName: string;
        };
    } & {
        id: string;
        role: import("../generated/prisma/enums.js").CommunityRoleType;
        createdAt: Date;
        expiresAt: Date;
        communityId: string;
        status: import("../generated/prisma/enums.js").TeamInviteStatus;
        note: string;
        invitedUserId: string;
        invitedById: string;
        respondedAt: Date | null;
    })[]>;
    respondInvite(user: User, id: string, dto: RespondRoleInviteDto): Promise<{
        ok: boolean;
    }>;
    dashboard(user: User, slug: string): Promise<{
        access: "ADMIN" | "CURATOR" | "ASSISTANT" | "MODERATOR";
        community: {
            id: string;
            slug: string;
            name: string;
            accentColor: string;
        };
        health: {
            publications7: number;
            publications30: number;
            comments7: number;
            comments30: number;
            openReports: number;
            unansweredCount: number;
            averageFirstResponseHours: number | null;
            subscriberChange30: number;
        };
        unanswered: {
            excerpt: string;
            body: undefined;
            createdAt: Date;
            slug: string;
            title: string | null;
            author: {
                username: string;
                displayName: string;
            };
        }[];
        publications: {
            slug: string;
            title: string;
            createdAt: Date;
            lastActivityAt: Date;
            pinnedUntil: Date | null;
            isOfficial: boolean;
            isSolved: boolean;
            closedAt: Date | null;
            author: {
                username: string;
                displayName: string;
            };
            commentCount: number;
            reactionCount: number;
            bookmarkCount: number;
        }[];
        team: ({
            user: {
                username: string;
                displayName: string;
                avatarUrl: string | null;
            };
        } & {
            id: string;
            role: import("../generated/prisma/enums.js").CommunityRoleType;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            communityId: string;
            grantedById: string | null;
            note: string | null;
            endedAt: Date | null;
        })[];
        reports: ({
            publication: {
                slug: string;
            } | null;
            author: {
                username: string;
                displayName: string;
            };
        } & {
            id: string;
            createdAt: Date;
            communityId: string;
            publicationId: string | null;
            authorId: string;
            periodStart: Date;
            periodEnd: Date;
            summary: string;
            achievements: string;
            problems: string;
            plans: string;
            treasuryNote: string | null;
        })[];
        proposals: ({
            createdBy: {
                username: string;
                displayName: string;
            };
            targetCommunity: {
                slug: string;
                name: string;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            communityId: string;
            description: string;
            status: import("../generated/prisma/enums.js").CommunityStructureStatus;
            createdById: string;
            type: import("../generated/prisma/enums.js").CommunityStructureChangeType;
            title: string;
            resolutionNote: string | null;
            resolvedAt: Date | null;
            resolvedById: string | null;
            targetCommunityId: string | null;
            proposedName: string | null;
        })[];
        invites: ({
            invitedUser: {
                username: string;
                displayName: string;
            };
            invitedBy: {
                username: string;
                displayName: string;
            };
        } & {
            id: string;
            role: import("../generated/prisma/enums.js").CommunityRoleType;
            createdAt: Date;
            expiresAt: Date;
            communityId: string;
            status: import("../generated/prisma/enums.js").TeamInviteStatus;
            note: string;
            invitedUserId: string;
            invitedById: string;
            respondedAt: Date | null;
        })[];
        actions: ({
            publication: {
                slug: string;
                title: string | null;
            };
            actor: {
                username: string;
                displayName: string;
            };
        } & {
            id: string;
            createdAt: Date;
            communityId: string;
            publicationId: string;
            note: string;
            actorId: string;
            action: import("../generated/prisma/enums.js").CommunityContentActionType;
            metadata: import("@prisma/client/runtime/client").JsonValue | null;
        })[];
    }>;
    createReport(user: User, slug: string, dto: CreateCommunityReportDto): Promise<{
        id: string;
        publicationSlug: string;
    }>;
    createStructureProposal(user: User, slug: string, dto: CreateStructureProposalDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        communityId: string;
        description: string;
        status: import("../generated/prisma/enums.js").CommunityStructureStatus;
        createdById: string;
        type: import("../generated/prisma/enums.js").CommunityStructureChangeType;
        title: string;
        resolutionNote: string | null;
        resolvedAt: Date | null;
        resolvedById: string | null;
        targetCommunityId: string | null;
        proposedName: string | null;
    }>;
    resolveStructureProposal(user: User, slug: string, id: string, dto: ResolveStructureProposalDto): Promise<{
        ok: boolean;
    }>;
    invite(user: User, slug: string, dto: InviteCommunityRoleDto): Promise<{
        id: string;
        role: import("../generated/prisma/enums.js").CommunityRoleType;
        createdAt: Date;
        expiresAt: Date;
        communityId: string;
        status: import("../generated/prisma/enums.js").TeamInviteStatus;
        note: string;
        invitedUserId: string;
        invitedById: string;
        respondedAt: Date | null;
    }>;
    contentAction(user: User, slug: string, publicationSlug: string, dto: CommunityContentActionDto): Promise<{
        ok: boolean;
    }>;
}
