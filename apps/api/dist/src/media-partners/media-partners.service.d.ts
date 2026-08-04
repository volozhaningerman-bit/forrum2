import { MediaPartnerStatus } from '../generated/prisma/client.js';
import { NotificationsService } from '../notifications/notifications.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import type { ApplyMediaPartnerDto } from './dto.js';
export declare class MediaPartnersService {
    private readonly prisma;
    private readonly notifications;
    constructor(prisma: PrismaService, notifications: NotificationsService);
    publicList(): Promise<{
        id: string;
        displayName: string;
        updatedAt: Date;
        description: string;
        type: import("../generated/prisma/enums.js").MediaPartnerType;
        platform: string;
        channelUrl: string;
        audienceText: string | null;
        user: {
            username: string;
            displayName: string;
            avatarUrl: string | null;
        };
    }[]>;
    apply(userId: string, dto: ApplyMediaPartnerDto): Promise<{
        id: string;
        status: MediaPartnerStatus;
    }>;
    adminList(): Promise<({
        user: {
            username: string;
            displayName: string;
            avatarUrl: string | null;
        };
    } & {
        id: string;
        displayName: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        description: string;
        status: MediaPartnerStatus;
        type: import("../generated/prisma/enums.js").MediaPartnerType;
        resolutionNote: string | null;
        platform: string;
        channelUrl: string;
        audienceText: string | null;
    })[]>;
    review(id: string, actorId: string, status: MediaPartnerStatus, note?: string): Promise<{
        ok: boolean;
    }>;
}
