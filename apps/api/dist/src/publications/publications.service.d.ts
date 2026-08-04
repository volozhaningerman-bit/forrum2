import { PublicationFormat, PublicationType, type ReactionType, type User } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { NotificationsService } from '../notifications/notifications.service.js';
import type { CreateCommentDto, CreatePublicationDto, ReportDto, UpdatePublicationDto } from './dto.js';
export declare class PublicationsService {
    private readonly prisma;
    private readonly notifications;
    constructor(prisma: PrismaService, notifications: NotificationsService);
    private card;
    listNews(): Promise<{
        id: string;
        slug: string;
        format: PublicationFormat;
        type: PublicationType;
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
        viewerReaction: ReactionType | null;
        isBookmarked: boolean;
    }[]>;
    listAnnouncements(): Promise<{
        id: string;
        slug: string;
        format: PublicationFormat;
        type: PublicationType;
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
        viewerReaction: ReactionType | null;
        isBookmarked: boolean;
    }[]>;
    create(communitySlug: string, userId: string, dto: CreatePublicationDto): Promise<{
        id: string;
        slug: string;
    }>;
    saved(userId: string): Promise<{
        savedAt: Date;
        id: string;
        slug: string;
        format: PublicationFormat;
        type: PublicationType;
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
        viewerReaction: ReactionType | null;
        isBookmarked: boolean;
    }[]>;
    get(slug: string, viewer?: User | null, trackView?: boolean): Promise<{
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
            viewerReaction: ReactionType;
        }[];
        id: string;
        slug: string;
        format: PublicationFormat;
        type: PublicationType;
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
        viewerReaction: ReactionType | null;
        isBookmarked: boolean;
    }>;
    private canManage;
    update(slug: string, user: User, dto: UpdatePublicationDto): Promise<{
        ok: boolean;
        slug: string;
    }>;
    remove(slug: string, user: User): Promise<{
        ok: boolean;
        communitySlug: string | undefined;
    }>;
    comment(slug: string, userId: string, dto: CreateCommentDto): Promise<{
        id: string;
    }>;
    react(slug: string, userId: string, type: ReactionType): Promise<{
        active: boolean;
        type: null;
    } | {
        active: boolean;
        type: ReactionType;
    }>;
    reactComment(commentId: string, userId: string, type: ReactionType): Promise<{
        active: boolean;
        type: null;
    } | {
        active: boolean;
        type: ReactionType;
    }>;
    toggleBookmark(slug: string, userId: string): Promise<{
        bookmarked: boolean;
    }>;
    reportComment(commentId: string, userId: string, dto: ReportDto): Promise<{
        id: string;
    }>;
    report(slug: string, userId: string, dto: ReportDto): Promise<{
        id: string;
    }>;
}
