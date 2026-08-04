import type { User } from '../generated/prisma/client.js';
import { UpdateFeedPreferencesDto } from './dto.js';
import { FeedService } from './feed.service.js';
export declare class FeedController {
    private readonly service;
    constructor(service: FeedService);
    preferences(user: User): Promise<{
        recommendationsEnabled: boolean;
        showReasons: boolean;
        hiddenPublicationCount: number;
        hiddenCommunities: {
            slug: string;
            name: string;
            accentColor: string;
        }[];
    }>;
    updatePreferences(user: User, dto: UpdateFeedPreferencesDto): Promise<{
        recommendationsEnabled: boolean;
        showReasons: boolean;
        hiddenPublicationCount: number;
        hiddenCommunities: {
            slug: string;
            name: string;
            accentColor: string;
        }[];
    }>;
    hidePublication(id: string, user: User): Promise<{
        ok: boolean;
    }>;
    unhidePublication(id: string, user: User): Promise<{
        ok: boolean;
    }>;
    clearHiddenPublications(user: User): Promise<{
        ok: boolean;
        restored: number;
    }>;
    hideCommunity(slug: string, user: User): Promise<{
        ok: boolean;
    }>;
    unhideCommunity(slug: string, user: User): Promise<{
        ok: boolean;
    }>;
    get(mode: string | undefined, user: User | null): Promise<{
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
        reason: string | null;
        feedbackEnabled: boolean;
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
        viewerReaction: import("../generated/prisma/enums.js").ReactionType;
        isBookmarked: boolean;
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
    }[]>;
}
