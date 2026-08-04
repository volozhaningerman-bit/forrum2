import { PrismaService } from '../prisma/prisma.service.js';
import { NotificationsService } from '../notifications/notifications.service.js';
export declare class MessagesService {
    private readonly prisma;
    private readonly notifications;
    constructor(prisma: PrismaService, notifications: NotificationsService);
    list(userId: string): Promise<{
        id: string;
        updatedAt: Date;
        other: {
            username: string;
            displayName: string;
            avatarUrl: string | null;
        } | null;
        latest: {
            body: string;
            createdAt: Date;
            authorId: string;
        } | null;
        unread: boolean;
    }[]>;
    unreadCount(userId: string): Promise<{
        count: number;
    }>;
    start(userId: string, usernameInput: string, bodyInput: string): Promise<{
        id: string;
    }>;
    get(conversationId: string, userId: string): Promise<{
        id: string;
        other: {
            username: string;
            displayName: string;
            avatarUrl: string | null;
        } | null;
        members: {
            username: string;
            displayName: string;
            avatarUrl: string | null;
        }[];
        messages: {
            id: string;
            body: string;
            createdAt: Date;
            author: {
                username: string;
                displayName: string;
                avatarUrl: string | null;
            };
            isMine: boolean;
        }[];
    }>;
    send(conversationId: string, userId: string, bodyInput: string): Promise<{
        id: string;
    }>;
}
