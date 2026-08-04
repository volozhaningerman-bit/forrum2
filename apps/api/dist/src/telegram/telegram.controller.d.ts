import type { User } from '../generated/prisma/client.js';
import { SharePublicationToTelegramDto } from './dto.js';
import { TelegramService } from './telegram.service.js';
export declare class TelegramController {
    private readonly service;
    constructor(service: TelegramService);
    status(user: User): Promise<{
        configured: boolean;
        polling: boolean;
        linked: boolean;
        connectChannelUrl: string | null;
        link: {
            telegramUsername: string | null;
            linkedAt: Date;
            enabled: boolean;
        } | null;
    }>;
    linkCode(user: User): Promise<{
        code: string;
        command: string;
        expiresInMinutes: number;
        botUsername: any;
    }>;
    unlink(user: User): Promise<{
        ok: boolean;
    }>;
    test(user: User): Promise<{
        ok: boolean;
    }>;
    channels(user: User): Promise<{
        id: string;
        username: string | null;
        title: string;
        enabled: boolean;
        linkedAt: Date;
        canPost: boolean;
        lastCheckedAt: Date | null;
    }[]>;
    removeChannel(id: string, user: User): Promise<{
        ok: boolean;
    }>;
    previewPublication(slug: string): Promise<{
        title: string;
        excerpt: string;
        hasImage: boolean;
    }>;
    sharePublication(slug: string, user: User, dto: SharePublicationToTelegramDto): Promise<{
        ok: boolean;
        channelTitle: string;
        usedImage: boolean;
    }>;
}
