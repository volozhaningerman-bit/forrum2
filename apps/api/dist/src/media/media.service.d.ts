import { ConfigService } from '@nestjs/config';
import type { User } from '../generated/prisma/client.js';
import { MediaKind } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import type { UploadMediaDto } from './dto.js';
export declare class MediaService {
    private readonly prisma;
    private readonly config;
    constructor(prisma: PrismaService, config: ConfigService);
    private uploadDir;
    private publicApiUrl;
    private optimize;
    upload(user: User, dto: UploadMediaDto): Promise<{
        id: string;
        url: string;
        thumbnailUrl: string;
        kind: MediaKind;
        mimeType: string;
        sizeBytes: number;
        width: number | null;
        height: number | null;
        originalName: string;
    }>;
    get(id: string, variant?: string): Promise<{
        asset: {
            id: string;
            createdAt: Date;
            ownerId: string;
            kind: MediaKind;
            mimeType: string;
            originalName: string;
            storageKey: string;
            thumbnailStorageKey: string | null;
            sizeBytes: number;
            width: number | null;
            height: number | null;
        };
        data: NonSharedBuffer;
    }>;
    list(userId: string): Promise<{
        url: string;
        thumbnailUrl: string;
        id: string;
        createdAt: Date;
        ownerId: string;
        kind: MediaKind;
        mimeType: string;
        originalName: string;
        storageKey: string;
        thumbnailStorageKey: string | null;
        sizeBytes: number;
        width: number | null;
        height: number | null;
    }[]>;
    remove(id: string, user: User): Promise<void>;
}
