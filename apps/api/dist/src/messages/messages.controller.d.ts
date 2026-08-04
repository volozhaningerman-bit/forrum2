import type { User } from '../generated/prisma/client.js';
import { SendMessageDto, StartConversationDto } from './dto.js';
import { MessagesService } from './messages.service.js';
export declare class MessagesController {
    private readonly service;
    constructor(service: MessagesService);
    list(user: User): Promise<{
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
    unreadCount(user: User): Promise<{
        count: number;
    }>;
    start(user: User, dto: StartConversationDto): Promise<{
        id: string;
    }>;
    get(id: string, user: User): Promise<{
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
    send(id: string, user: User, dto: SendMessageDto): Promise<{
        id: string;
    }>;
}
