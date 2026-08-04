import type { User } from '../generated/prisma/client.js';
import { NotificationsService } from './notifications.service.js';
import { UpdateNotificationPreferencesDto } from './dto.js';
export declare class NotificationsController {
    private readonly service;
    constructor(service: NotificationsService);
    list(user: User): import("../generated/prisma/internal/prismaNamespace.js").PrismaPromise<({
        actor: {
            username: string;
            displayName: string;
            avatarUrl: string | null;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        publicationId: string | null;
        type: import("../generated/prisma/enums.js").NotificationType;
        title: string;
        body: string;
        commentId: string | null;
        actorId: string | null;
        conversationId: string | null;
        href: string;
        readAt: Date | null;
    })[]>;
    count(user: User): Promise<{
        count: number;
    }>;
    readAll(user: User): Promise<{
        ok: boolean;
    }>;
    read(id: string, user: User): Promise<{
        ok: boolean;
    }>;
    preferences(user: User): Promise<{
        userId: string;
        publicationReplies: boolean;
        commentReplies: boolean;
        reactions: boolean;
        follows: boolean;
        wallPosts: boolean;
        messages: boolean;
        system: boolean;
        emailDigest: boolean;
        telegramEnabled: boolean;
    }>;
    updatePreferences(user: User, dto: UpdateNotificationPreferencesDto): Promise<{
        userId: string;
        publicationReplies: boolean;
        commentReplies: boolean;
        reactions: boolean;
        follows: boolean;
        wallPosts: boolean;
        messages: boolean;
        system: boolean;
        emailDigest: boolean;
        telegramEnabled: boolean;
    }>;
}
