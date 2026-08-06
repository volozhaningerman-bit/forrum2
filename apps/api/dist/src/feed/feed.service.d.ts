import { PrismaService } from '../prisma/prisma.service.js';
import type { UpdateFeedPreferencesDto } from './dto.js';
export declare class FeedService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    preferences(userId: string): Promise<{
        recommendationsEnabled: boolean;
        showReasons: boolean;
        hiddenPublicationCount: number;
        hiddenCommunities: {
            slug: string;
            name: string;
            accentColor: string;
        }[];
    }>;
    updatePreferences(userId: string, dto: UpdateFeedPreferencesDto): Promise<{
        recommendationsEnabled: boolean;
        showReasons: boolean;
        hiddenPublicationCount: number;
        hiddenCommunities: {
            slug: string;
            name: string;
            accentColor: string;
        }[];
    }>;
    hidePublication(userId: string, publicationId: string): Promise<{
        ok: boolean;
    }>;
    unhidePublication(userId: string, publicationId: string): Promise<{
        ok: boolean;
    }>;
    clearHiddenPublications(userId: string): Promise<{
        ok: boolean;
        restored: number;
    }>;
    hideCommunity(userId: string, slugInput: string): Promise<{
        ok: boolean;
    }>;
    unhideCommunity(userId: string, slugInput: string): Promise<{
        ok: boolean;
    }>;
    get(mode: string, userId?: string): Promise<{
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
            avatarUrl: string | null;
            coverUrl: string | null;
        };
        commentCount: number;
        recentCommentCount: number;
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
