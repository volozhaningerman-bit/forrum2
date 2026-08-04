import { AchievementCategory, WallPrivacy } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { NotificationsService } from '../notifications/notifications.service.js';
import { type LocalTrustLevel } from './trust.js';
export declare class UsersService {
    private readonly prisma;
    private readonly notifications;
    constructor(prisma: PrismaService, notifications: NotificationsService);
    following(userId: string): Promise<{
        username: string;
        displayName: string;
        avatarUrl: string | null;
        bio: string | null;
        forrumId: number;
        followerCount: number;
        publicationCount: number;
        followedAt: Date;
    }[]>;
    activity(userId: string): Promise<{
        category: import("./activity.js").PublicActivityCategory;
        title: string;
        detail: string;
        href: string | null;
        id: string;
        action: string;
        createdAt: Date;
    }[]>;
    private syncAutomaticAchievements;
    private localTrust;
    getProfile(usernameInput: string, viewerId?: string): Promise<{
        id: string;
        forrumId: number;
        username: string;
        displayName: string;
        bio: string | null;
        avatarUrl: string | null;
        coverUrl: string | null;
        website: string | null;
        location: string | null;
        role: import("../generated/prisma/enums.js").GlobalRole;
        emailVerified: boolean;
        createdAt: Date;
        isFollowing: boolean;
        isSelf: boolean;
        wallPrivacy: WallPrivacy;
        showFavorites: boolean;
        showSubscriptions: boolean;
        wallRestricted: boolean;
        canWriteWall: boolean;
        canStartInteraction: boolean;
        counts: {
            followers: number;
            following: number;
            publications: number;
            comments: number;
            completedInteractions: number;
        };
        trustSummary: {
            level: LocalTrustLevel;
            label: string;
            detail: string;
            community: {
                id: string;
                slug: string;
                name: string;
            };
        } | {
            level: string;
            label: string;
            detail: string;
            community: null;
        };
        localTrust: {
            level: LocalTrustLevel;
            label: string;
            detail: string;
            evidence: string[];
            community: {
                id: string;
                slug: string;
                name: string;
            };
            metrics: {
                publicationCount: number;
                commentCount: number;
                helpfulReactionCount: number;
                bookmarkCount: number;
                activeRole: boolean;
            };
        }[];
        roles: {
            id: string;
            role: import("../generated/prisma/enums.js").CommunityRoleType;
            note: string | null;
            startedAt: Date;
            community: {
                slug: string;
                name: string;
            };
        }[];
        roleHistory: {
            id: string;
            type: import("../generated/prisma/enums.js").RoleEventType;
            role: import("../generated/prisma/enums.js").CommunityRoleType;
            note: string | null;
            createdAt: Date;
            community: {
                slug: string;
                name: string;
            };
            actor: {
                username: string;
                displayName: string;
            } | null;
        }[];
        communities: {
            slug: string;
            name: string;
        }[];
        publications: {
            id: string;
            slug: string;
            format: import("../generated/prisma/enums.js").PublicationFormat;
            type: import("../generated/prisma/enums.js").PublicationType;
            title: string | null;
            excerpt: string;
            createdAt: Date;
            lastActivityAt: Date;
            viewCount: number;
            author: {
                username: string;
                displayName: string;
                avatarUrl: string | null;
                forrumId: number;
            };
            community: {
                slug: string;
                name: string;
                accentColor: string;
            };
            commentCount: number;
            reactionCount: number;
            bookmarkCount: number;
            helpfulReactionCount: number;
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
        usefulPublications: {
            id: string;
            slug: string;
            format: import("../generated/prisma/enums.js").PublicationFormat;
            type: import("../generated/prisma/enums.js").PublicationType;
            title: string | null;
            excerpt: string;
            createdAt: Date;
            lastActivityAt: Date;
            viewCount: number;
            author: {
                forrumId: number;
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
            helpfulReactionCount: number;
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
        achievements: {
            id: string;
            code: string;
            title: string;
            description: string;
            icon: string;
            category: AchievementCategory;
            earnedAt: Date;
            community: {
                slug: string;
                name: string;
            } | null;
        }[];
        reviews: {
            id: string;
            verdict: import("../generated/prisma/enums.js").ReviewVerdict;
            body: string;
            createdAt: Date;
            evidenceAttached: boolean;
            author: {
                username: string;
                displayName: string;
                avatarUrl: string | null;
            };
            interaction: {
                id: string;
                type: import("../generated/prisma/enums.js").InteractionType;
                title: string;
                completedAt: Date | null;
                community: {
                    slug: string;
                    name: string;
                } | null;
                publication: {
                    slug: string;
                    title: string | null;
                } | null;
                portfolioItem: {
                    id: string;
                    title: string;
                    kind: import("../generated/prisma/enums.js").PortfolioItemKind;
                } | null;
            };
        }[];
        reviewSummary: {
            positive: number;
            neutral: number;
            negative: number;
        };
        workshopPortfolio: {
            id: string;
            createdAt: Date;
            description: string;
            type: import("../generated/prisma/enums.js").WorkshopItemType;
            title: string;
            previewMediaId: string | null;
        }[];
        gifts: {
            id: string;
            message: string | null;
            createdAt: Date;
            sender: {
                username: string;
                displayName: string;
                avatarUrl: string | null;
            };
            gift: {
                id: string;
                description: string;
                title: string;
                previewMediaId: string | null;
            };
        }[];
        portfolio: {
            id: string;
            kind: import("../generated/prisma/enums.js").PortfolioItemKind;
            status: import("../generated/prisma/enums.js").PortfolioItemStatus;
            title: string;
            summary: string;
            coverUrl: string | null;
            lookingForTeam: boolean;
            priceText: string | null;
            updatedAt: Date;
            community: {
                slug: string;
                name: string;
                accentColor: string;
            } | null;
            publication: {
                slug: string;
                title: string | null;
            } | null;
            completedInteractionCount: number;
        }[];
        wall: {
            id: string;
            body: string;
            createdAt: Date;
            author: {
                username: string;
                displayName: string;
                avatarUrl: string | null;
            };
            canDelete: boolean;
        }[];
    }>;
    follow(usernameInput: string, followerId: string): Promise<{
        ok: boolean;
    }>;
    unfollow(usernameInput: string, followerId: string): Promise<{
        ok: boolean;
    }>;
    createWallPost(usernameInput: string, authorId: string, bodyInput: string): Promise<{
        id: string;
    }>;
    sendGift(usernameInput: string, senderId: string, workshopItemId: string, messageInput?: string): Promise<{
        id: string;
    }>;
    deleteWallPost(usernameInput: string, postId: string, actorId: string): Promise<{
        ok: boolean;
    }>;
}
