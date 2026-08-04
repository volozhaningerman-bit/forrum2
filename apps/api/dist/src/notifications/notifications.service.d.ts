import { NotificationType, type Prisma } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import type { UpdateNotificationPreferencesDto } from './dto.js';
import { TelegramService } from '../telegram/telegram.service.js';
export declare class NotificationsService {
    private readonly prisma;
    private readonly telegram;
    constructor(prisma: PrismaService, telegram: TelegramService);
    list(userId: string): Prisma.PrismaPromise<({
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
        type: NotificationType;
        title: string;
        body: string;
        commentId: string | null;
        actorId: string | null;
        conversationId: string | null;
        href: string;
        readAt: Date | null;
    })[]>;
    unreadCount(userId: string): Promise<{
        count: number;
    }>;
    read(userId: string, id: string): Promise<{
        ok: boolean;
    }>;
    readAll(userId: string): Promise<{
        ok: boolean;
    }>;
    preferences(userId: string): Promise<{
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
    updatePreferences(userId: string, dto: UpdateNotificationPreferencesDto): Promise<{
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
    deliverToCommunitySubscribers(input: {
        communityId: string;
        importance: 'IMPORTANT' | 'ALL';
        title: string;
        body: string;
        href: string;
        actorId?: string;
        publicationId?: string;
    }): Promise<{
        delivered: number;
    }>;
    deliver(data: Prisma.NotificationUncheckedCreateInput, transaction?: Prisma.TransactionClient): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        publicationId: string | null;
        type: NotificationType;
        title: string;
        body: string;
        commentId: string | null;
        actorId: string | null;
        conversationId: string | null;
        href: string;
        readAt: Date | null;
    } | null>;
}
