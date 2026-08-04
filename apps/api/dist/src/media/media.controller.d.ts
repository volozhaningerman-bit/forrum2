import type { Response } from 'express';
import type { User } from '../generated/prisma/client.js';
import { UploadMediaDto } from './dto.js';
import { MediaService } from './media.service.js';
export declare class MediaController {
    private readonly service;
    constructor(service: MediaService);
    upload(user: User, dto: UploadMediaDto): Promise<{
        id: string;
        url: string;
        thumbnailUrl: string;
        kind: import("../generated/prisma/enums.js").MediaKind;
        mimeType: string;
        sizeBytes: number;
        width: number | null;
        height: number | null;
        originalName: string;
    }>;
    list(user: User): Promise<{
        url: string;
        thumbnailUrl: string;
        id: string;
        createdAt: Date;
        ownerId: string;
        kind: import("../generated/prisma/enums.js").MediaKind;
        mimeType: string;
        originalName: string;
        storageKey: string;
        thumbnailStorageKey: string | null;
        sizeBytes: number;
        width: number | null;
        height: number | null;
    }[]>;
    content(id: string, variant: string | undefined, response: Response): Promise<void>;
}
