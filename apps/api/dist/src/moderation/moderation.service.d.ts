import { AppealStatus, ModerationActionType, ModerationTargetType } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { NotificationsService } from '../notifications/notifications.service.js';
export declare class ModerationService {
    private readonly prisma;
    private readonly notifications;
    constructor(prisma: PrismaService, notifications: NotificationsService);
    recordPublicationHide(actorId: string, publicationId: string, reason: string): Promise<{
        id: string;
        createdAt: Date;
        expiresAt: Date | null;
        publicationId: string | null;
        commentId: string | null;
        actorId: string | null;
        reason: string;
        subjectUserId: string;
        targetType: ModerationTargetType;
        actionType: ModerationActionType;
        reversedAt: Date | null;
    }>;
    recordCommentHide(actorId: string, commentId: string, reason: string): Promise<{
        id: string;
        createdAt: Date;
        expiresAt: Date | null;
        publicationId: string | null;
        commentId: string | null;
        actorId: string | null;
        reason: string;
        subjectUserId: string;
        targetType: ModerationTargetType;
        actionType: ModerationActionType;
        reversedAt: Date | null;
    }>;
    listMine(userId: string): import("../generated/prisma/internal/prismaNamespace.js").PrismaPromise<({
        actor: {
            username: string;
            displayName: string;
        } | null;
        appeals: {
            id: string;
            createdAt: Date;
            userId: string;
            status: AppealStatus;
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
        targetType: ModerationTargetType;
        actionType: ModerationActionType;
        reversedAt: Date | null;
    })[]>;
    appeal(userId: string, actionId: string, body: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        status: AppealStatus;
        body: string;
        resolutionNote: string | null;
        resolvedAt: Date | null;
        actionId: string;
        resolvedById: string | null;
    }>;
    listAppeals(): import("../generated/prisma/internal/prismaNamespace.js").PrismaPromise<({
        action: {
            id: string;
            createdAt: Date;
            expiresAt: Date | null;
            publicationId: string | null;
            commentId: string | null;
            actorId: string | null;
            reason: string;
            subjectUserId: string;
            targetType: ModerationTargetType;
            actionType: ModerationActionType;
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
        status: AppealStatus;
        body: string;
        resolutionNote: string | null;
        resolvedAt: Date | null;
        actionId: string;
        resolvedById: string | null;
    })[]>;
    resolveAppeal(actorId: string, appealId: string, status: AppealStatus, note: string): Promise<{
        ok: boolean;
    }>;
}
