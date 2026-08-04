import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service.js';
import type { SharePublicationToTelegramDto } from './dto.js';
export declare class TelegramService implements OnModuleInit, OnModuleDestroy {
    private readonly prisma;
    private readonly config;
    private active;
    private offset;
    private botUserId;
    private readonly token;
    private readonly polling;
    constructor(prisma: PrismaService, config: ConfigService);
    onModuleInit(): void;
    onModuleDestroy(): void;
    private api;
    private botId;
    private send;
    private pollLoop;
    private handleUpdate;
    private handleChannelMembership;
    private connectChannelUrl;
    status(userId: string): Promise<{
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
    createLinkCode(userId: string): Promise<{
        code: string;
        command: string;
        expiresInMinutes: number;
        botUsername: any;
    }>;
    unlink(userId: string): Promise<{
        ok: boolean;
    }>;
    channels(userId: string): Promise<{
        id: string;
        username: string | null;
        title: string;
        enabled: boolean;
        linkedAt: Date;
        canPost: boolean;
        lastCheckedAt: Date | null;
    }[]>;
    removeChannel(userId: string, channelId: string): Promise<{
        ok: boolean;
    }>;
    publicationPreview(slug: string): Promise<{
        title: string;
        excerpt: string;
        hasImage: boolean;
    }>;
    private verifyChannel;
    sharePublication(userId: string, slug: string, dto: SharePublicationToTelegramDto): Promise<{
        ok: boolean;
        channelTitle: string;
        usedImage: boolean;
    }>;
    deliverNotification(notificationId: string): Promise<void>;
    sendTest(userId: string): Promise<{
        ok: boolean;
    }>;
}
