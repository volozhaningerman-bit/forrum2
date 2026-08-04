import { PrismaService } from '../prisma/prisma.service.js';
export declare class SearchService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    search(rawQuery: string): Promise<{
        query: string;
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
        communities: {
            slug: string;
            name: string;
            description: string;
            accentColor: string;
            subscriberCount: number;
        }[];
        users: {
            username: string;
            displayName: string;
            avatarUrl: string | null;
            bio: string | null;
            forrumId: number;
            followerCount: number;
            publicationCount: number;
        }[];
        tags: {
            publicationCount: number;
            subscriberCount: number;
            _count: {
                publications: number;
                subscribers: number;
            };
            id: string;
            createdAt: Date;
            slug: string;
            label: string;
            backgroundColor: string;
            textColor: string;
            borderColor: string;
            styleEnabled: boolean;
        }[];
    }>;
}
