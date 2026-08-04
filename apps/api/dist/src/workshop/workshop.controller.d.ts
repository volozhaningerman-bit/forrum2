import type { User } from '../generated/prisma/client.js';
import { CreateWorkshopItemDto, ReviewWorkshopItemDto } from './dto.js';
import { WorkshopService } from './workshop.service.js';
export declare class WorkshopController {
    private readonly service;
    constructor(service: WorkshopService);
    list(user?: User): Promise<{
        id: string;
        type: import("../generated/prisma/enums.js").WorkshopItemType;
        status: import("../generated/prisma/enums.js").WorkshopItemStatus;
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
    create(user: User, dto: CreateWorkshopItemDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        status: import("../generated/prisma/enums.js").WorkshopItemStatus;
        type: import("../generated/prisma/enums.js").WorkshopItemType;
        title: string;
        authorId: string;
        resolutionNote: string | null;
        reviewedById: string | null;
        previewMediaId: string | null;
    }>;
    like(user: User, id: string): Promise<{
        liked: boolean;
    }>;
}
export declare class WorkshopAdminController {
    private readonly service;
    constructor(service: WorkshopService);
    list(user: User): Promise<{
        id: string;
        type: import("../generated/prisma/enums.js").WorkshopItemType;
        status: import("../generated/prisma/enums.js").WorkshopItemStatus;
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
    review(user: User, id: string, dto: ReviewWorkshopItemDto): Promise<{
        ok: boolean;
    }>;
}
