import type { User } from '../generated/prisma/client.js';
import { CreateAppealDto, ResolveAppealDto } from './dto.js';
import { ModerationService } from './moderation.service.js';
export declare class ModerationController {
    private readonly service;
    constructor(service: ModerationService);
    actions(user: User): import("../generated/prisma/internal/prismaNamespace.js").PrismaPromise<({
        actor: {
            username: string;
            displayName: string;
        } | null;
        appeals: {
            id: string;
            createdAt: Date;
            userId: string;
            status: import("../generated/prisma/enums.js").AppealStatus;
            body: string;
            resolutionNote: string | null;
            resolvedAt: Date | null;
            actionId: string;
            resolvedById: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        expiresAt: Date | null;
        publicationId: string | null;
        commentId: string | null;
        actorId: string | null;
        reason: string;
        subjectUserId: string;
        targetType: import("../generated/prisma/enums.js").ModerationTargetType;
        actionType: import("../generated/prisma/enums.js").ModerationActionType;
        reversedAt: Date | null;
    })[]>;
    appeal(user: User, id: string, dto: CreateAppealDto): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        status: import("../generated/prisma/enums.js").AppealStatus;
        body: string;
        resolutionNote: string | null;
        resolvedAt: Date | null;
        actionId: string;
        resolvedById: string | null;
    }>;
}
export declare class ModerationAdminController {
    private readonly service;
    constructor(service: ModerationService);
    appeals(): import("../generated/prisma/internal/prismaNamespace.js").PrismaPromise<({
        action: {
            id: string;
            createdAt: Date;
            expiresAt: Date | null;
            publicationId: string | null;
            commentId: string | null;
            actorId: string | null;
            reason: string;
            subjectUserId: string;
            targetType: import("../generated/prisma/enums.js").ModerationTargetType;
            actionType: import("../generated/prisma/enums.js").ModerationActionType;
            reversedAt: Date | null;
        };
        user: {
            username: string;
            displayName: string;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        status: import("../generated/prisma/enums.js").AppealStatus;
        body: string;
        resolutionNote: string | null;
        resolvedAt: Date | null;
        actionId: string;
        resolvedById: string | null;
    })[]>;
    resolve(user: User, id: string, dto: ResolveAppealDto): Promise<{
        ok: boolean;
    }>;
}
