import { WorkshopItemStatus, type User } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { ConfigService } from '@nestjs/config';
import type { CreateWorkshopItemDto } from './dto.js';
export declare class WorkshopService {
    private readonly prisma;
    private readonly config;
    constructor(prisma: PrismaService, config: ConfigService);
    list(viewerId?: string, includeReview?: boolean): Promise<{
        id: string;
        type: import("../generated/prisma/enums.js").WorkshopItemType;
        status: WorkshopItemStatus;
        title: string;
        description: string;
        resolutionNote: string | null;
        createdAt: Date;
        updatedAt: Date;
        author: {
            forrumId: number;
            username: string;
            displayName: string;
            avatarUrl: string | null;
        };
        previewUrl: string | null;
        thumbnailUrl: string | null;
        likeCount: number;
        likedByViewer: boolean;
    }[]>;
    create(userId: string, dto: CreateWorkshopItemDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        status: WorkshopItemStatus;
        type: import("../generated/prisma/enums.js").WorkshopItemType;
        title: string;
        authorId: string;
        resolutionNote: string | null;
        reviewedById: string | null;
        previewMediaId: string | null;
    }>;
    toggleLike(userId: string, itemId: string): Promise<{
        liked: boolean;
    }>;
    review(actor: User, itemId: string, status: WorkshopItemStatus, note: string): Promise<{
        ok: boolean;
    }>;
}
