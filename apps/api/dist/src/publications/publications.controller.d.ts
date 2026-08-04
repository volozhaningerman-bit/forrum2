import type { User } from '../generated/prisma/client.js';
import { CreateCommentDto, CreatePublicationDto, ReactionDto, ReportDto, UpdatePublicationDto } from './dto.js';
import { PublicationsService } from './publications.service.js';
export declare class PublicationsController {
    private readonly service;
    constructor(service: PublicationsService);
    news(): Promise<{
        id: string;
        slug: string;
        format: import("../generated/prisma/enums.js").PublicationFormat;
        type: import("../generated/prisma/enums.js").PublicationType;
        title: string | null;
        excerpt: string;
        viewCount: number;
        createdAt: Date;
        updatedAt: Date;
        lastActivityAt: Date;
        pinnedUntil: Date | null;
        author: {
            username: string;
            displayName: string;
            avatarUrl: string | null;
            forrumId: number;
            bio: string | null;
            emailVerified: boolean;
            createdAt: Date;
        };
        community: {
            slug: string;
            name: string;
            accentColor: string;
            subscriberCount: number;
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
        viewerReaction: import("../generated/prisma/enums.js").ReactionType | null;
        isBookmarked: boolean;
    }[]>;
    announcements(): Promise<{
        id: string;
        slug: string;
        format: import("../generated/prisma/enums.js").PublicationFormat;
        type: import("../generated/prisma/enums.js").PublicationType;
        title: string | null;
        excerpt: string;
        viewCount: number;
        createdAt: Date;
        updatedAt: Date;
        lastActivityAt: Date;
        pinnedUntil: Date | null;
        author: {
            username: string;
            displayName: string;
            avatarUrl: string | null;
            forrumId: number;
            bio: string | null;
            emailVerified: boolean;
            createdAt: Date;
        };
        community: {
            slug: string;
            name: string;
            accentColor: string;
            subscriberCount: number;
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
        viewerReaction: import("../generated/prisma/enums.js").ReactionType | null;
        isBookmarked: boolean;
    }[]>;
    create(slug: string, user: User, dto: CreatePublicationDto): Promise<{
        id: string;
        slug: string;
    }>;
    saved(user: User): Promise<{
        savedAt: Date;
        id: string;
        slug: string;
        format: import("../generated/prisma/enums.js").PublicationFormat;
        type: import("../generated/prisma/enums.js").PublicationType;
        title: string | null;
        excerpt: string;
        viewCount: number;
        createdAt: Date;
        updatedAt: Date;
        lastActivityAt: Date;
        pinnedUntil: Date | null;
        author: {
            username: string;
            displayName: string;
            avatarUrl: string | null;
            forrumId: number;
            bio: string | null;
            emailVerified: boolean;
            createdAt: Date;
        };
        community: {
            slug: string;
            name: string;
            accentColor: string;
            subscriberCount: number;
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
        viewerReaction: import("../generated/prisma/enums.js").ReactionType | null;
        isBookmarked: boolean;
    }[]>;
    get(slug: string, user: User | null, trackView?: string): Promise<{
        viewCount: number;
        body: string;
        canEdit: boolean;
        canDelete: boolean;
        comments: {
            id: string;
            body: string;
            parentId: string | null;
            createdAt: Date;
            updatedAt: Date;
            author: {
                username: string;
                displayName: string;
                avatarUrl: string | null;
                forrumId: number;
                emailVerified: boolean;
            };
            reactionCount: number;
            replyCount: number;
            viewerReaction: import("../generated/prisma/enums.js").ReactionType;
        }[];
        id: string;
        slug: string;
        format: import("../generated/prisma/enums.js").PublicationFormat;
        type: import("../generated/prisma/enums.js").PublicationType;
        title: string | null;
        excerpt: string;
        createdAt: Date;
        updatedAt: Date;
        lastActivityAt: Date;
        pinnedUntil: Date | null;
        author: {
            username: string;
            displayName: string;
            avatarUrl: string | null;
            forrumId: number;
            bio: string | null;
            emailVerified: boolean;
            createdAt: Date;
        };
        community: {
            slug: string;
            name: string;
            accentColor: string;
            subscriberCount: number;
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
        viewerReaction: import("../generated/prisma/enums.js").ReactionType | null;
        isBookmarked: boolean;
    }>;
    update(slug: string, user: User, dto: UpdatePublicationDto): Promise<{
        ok: boolean;
        slug: string;
    }>;
    remove(slug: string, user: User): Promise<{
        ok: boolean;
        communitySlug: string | undefined;
    }>;
    comment(slug: string, user: User, dto: CreateCommentDto): Promise<{
        id: string;
    }>;
    react(slug: string, user: User, dto: ReactionDto): Promise<{
        active: boolean;
        type: null;
    } | {
        active: boolean;
        type: import("../generated/prisma/enums.js").ReactionType;
    }>;
    reactComment(id: string, user: User, dto: ReactionDto): Promise<{
        active: boolean;
        type: null;
    } | {
        active: boolean;
        type: import("../generated/prisma/enums.js").ReactionType;
    }>;
    bookmark(slug: string, user: User): Promise<{
        bookmarked: boolean;
    }>;
    reportComment(id: string, user: User, dto: ReportDto): Promise<{
        id: string;
    }>;
    report(slug: string, user: User, dto: ReportDto): Promise<{
        id: string;
    }>;
}
