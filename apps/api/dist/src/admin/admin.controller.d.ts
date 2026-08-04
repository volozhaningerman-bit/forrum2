import type { User } from '../generated/prisma/client.js';
import { GrantBalanceDto } from '../wallet/dto.js';
import { AdminService } from './admin.service.js';
import { EndCommunityRoleDto, GrantCommunityRoleDto, HidePublicationDto, PromotionSettingsDto, RefundPromotionDto, ResolveReportDto } from './dto.js';
export declare class AdminController {
    private readonly service;
    constructor(service: AdminService);
    dashboard(): Promise<{
        users: number;
        verifiedUsers: number;
        communities: number;
        publications: number;
        comments: number;
        openReports: number;
        messages: number;
    }>;
    reports(): Promise<({
        publication: {
            slug: string;
            status: import("../generated/prisma/enums.js").PublicationStatus;
            title: string | null;
            body: string;
            author: {
                username: string;
                displayName: string;
            };
        } | null;
        comment: {
            id: string;
            body: string;
            hiddenAt: Date | null;
            author: {
                username: string;
                displayName: string;
            };
        } | null;
        author: {
            username: string;
            displayName: string;
        };
    } & {
        id: string;
        createdAt: Date;
        publicationId: string | null;
        status: import("../generated/prisma/enums.js").ReportStatus;
        authorId: string;
        commentId: string | null;
        reason: string;
        details: string | null;
        resolutionNote: string | null;
        resolvedAt: Date | null;
    })[]>;
    resolve(id: string, dto: ResolveReportDto, user: User): Promise<{
        ok: boolean;
    }>;
    hide(slug: string, dto: HidePublicationDto, user: User): Promise<{
        ok: boolean;
    }>;
    hideComment(id: string, dto: HidePublicationDto, user: User): Promise<{
        ok: boolean;
    }>;
    backupStatus(): Promise<any>;
    communityRoles(): Promise<({
        user: {
            username: string;
            displayName: string;
            avatarUrl: string | null;
        };
        community: {
            slug: string;
            name: string;
        };
        events: ({
            actor: {
                username: string;
                displayName: string;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            userId: string;
            note: string | null;
            type: import("../generated/prisma/enums.js").RoleEventType;
            actorId: string | null;
            roleId: string;
        })[];
        grantedBy: {
            username: string;
            displayName: string;
        } | null;
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
    })[]>;
    grantCommunityRole(dto: GrantCommunityRoleDto, user: User): Promise<{
        id: string;
    }>;
    endCommunityRole(id: string, dto: EndCommunityRoleDto, user: User): Promise<{
        ok: boolean;
    }>;
    promotionSettings(): Promise<string | number | boolean | import("@prisma/client/runtime/client").JsonObject | import("@prisma/client/runtime/client").JsonArray>;
    updatePromotionSettings(dto: PromotionSettingsDto, user: User): Promise<PromotionSettingsDto>;
    promotions(): Promise<({
        user: {
            username: string;
            displayName: string;
        };
        community: {
            slug: string;
            name: string;
        };
        publication: {
            slug: string;
            title: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        communityId: string;
        publicationId: string;
        status: import("../generated/prisma/enums.js").PromotionOrderStatus;
        type: import("../generated/prisma/enums.js").PromotionType;
        price: number;
        startsAt: Date;
        endsAt: Date;
        cancelledAt: Date | null;
        cancellationReason: string | null;
    })[]>;
    refundPromotion(id: string, dto: RefundPromotionDto, user: User): Promise<{
        refunded: number;
    }>;
    grant(dto: GrantBalanceDto, user: User): Promise<{
        id: string;
    }>;
}
