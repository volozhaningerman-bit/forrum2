import { PrismaService } from '../prisma/prisma.service.js';
export declare class TagsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    subscriptions(userId: string): Promise<{
        id: string;
        slug: string;
        label: string;
        styleEnabled: boolean;
        backgroundColor: string;
        textColor: string;
        borderColor: string;
        publicationCount: number;
        subscriberCount: number;
        subscribedAt: Date;
    }[]>;
    get(slugInput: string, userId?: string): Promise<{
        id: string;
        slug: string;
        label: string;
        styleEnabled: boolean;
        backgroundColor: string;
        textColor: string;
        borderColor: string;
        publicationCount: number;
        subscriberCount: number;
        isSubscribed: boolean;
        publications: {
            id: string;
            slug: string;
            format: import("../generated/prisma/enums.js").PublicationFormat;
            type: import("../generated/prisma/enums.js").PublicationType;
            title: string | null;
            excerpt: string;
            viewCount: number;
            createdAt: Date;
            lastActivityAt: Date;
            pinnedUntil: Date | null;
            author: {
                username: string;
                displayName: string;
                avatarUrl: string | null;
            };
            community: {
                slug: string;
                name: string;
                accentColor: string;
            };
            commentCount: number;
            reactionCount: number;
            bookmarkCount: number;
            tags: {
                id: string;
                createdAt: Date;
                slug: string;
                label: string;
                backgroundColor: string;
                textColor: string;
                borderColor: string;
                styleEnabled: boolean;
            }[];
        }[];
    }>;
    subscribe(slugInput: string, userId: string): Promise<{
        ok: boolean;
    }>;
    unsubscribe(slugInput: string, userId: string): Promise<{
        ok: boolean;
    }>;
}
