import { ConfigService } from '@nestjs/config';
import { PublicationStatus, ReportStatus, RoleEventType } from '../generated/prisma/client.js';
import type { GrantCommunityRoleDto, PromotionSettingsDto } from './dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { WalletService } from '../wallet/wallet.service.js';
import { ModerationService } from '../moderation/moderation.service.js';
export declare class AdminService {
    private readonly prisma;
    private readonly wallet;
    private readonly config;
    private readonly moderation;
    constructor(prisma: PrismaService, wallet: WalletService, config: ConfigService, moderation: ModerationService);
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
            status: PublicationStatus;
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
        status: ReportStatus;
        authorId: string;
        commentId: string | null;
        reason: string;
        details: string | null;
        resolutionNote: string | null;
        resolvedAt: Date | null;
    })[]>;
    resolveReport(id: string, status: ReportStatus, actorId: string, note?: string): Promise<{
        ok: boolean;
    }>;
    hidePublication(slug: string, reason: string, actorId: string): Promise<{
        ok: boolean;
    }>;
    hideComment(id: string, reason: string, actorId: string): Promise<{
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
            type: RoleEventType;
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
    grantCommunityRole(actorId: string, dto: GrantCommunityRoleDto): Promise<{
        id: string;
    }>;
    endCommunityRole(actorId: string, id: string, note: string): Promise<{
        ok: boolean;
    }>;
    promotionSettings(): Promise<string | number | boolean | import("@prisma/client/runtime/client").JsonObject | import("@prisma/client/runtime/client").JsonArray>;
    updatePromotionSettings(actorId: string, dto: PromotionSettingsDto): Promise<PromotionSettingsDto>;
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
    refundPromotion(actorId: string, id: string, reason: string): Promise<{
        refunded: number;
    }>;
    grantBalance(actorId: string, username: string, amount: number, description: string): Promise<{
        id: string;
    }>;
}
