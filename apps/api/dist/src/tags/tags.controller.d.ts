import type { User } from '../generated/prisma/client.js';
import { TagsService } from './tags.service.js';
export declare class TagsController {
    private readonly service;
    constructor(service: TagsService);
    subscriptions(user: User): Promise<{
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
    get(slug: string, user: User | null): Promise<{
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
    subscribe(slug: string, user: User): Promise<{
        ok: boolean;
    }>;
    unsubscribe(slug: string, user: User): Promise<{
        ok: boolean;
    }>;
}
