import type { User } from '../generated/prisma/client.js';
import { CreateCommunityDto, UpdateCommunitySubscriptionDto } from './dto.js';
import { CommunitiesService } from './communities.service.js';
export declare class CommunitiesController {
    private readonly service;
    constructor(service: CommunitiesService);
    list(user: User | null): Promise<{
        id: string;
        slug: string;
        name: string;
        description: string;
        shortDescription: string | null;
        avatarUrl: string | null;
        coverUrl: string | null;
        accentColor: string;
        parent: {
            slug: string;
            name: string;
        } | null;
        subscriberCount: number;
        publicationCount: number;
        recentPublicationCount: number;
        lastActivityAt: Date | null;
        childCount: number;
        isSubscribed: boolean;
        canManage: boolean;
        notifyLevel: import("../generated/prisma/enums.js").NotifyLevel;
        curator: {
            username: string;
            displayName: string;
            avatarUrl: string | null;
        } | null;
    }[]>;
    get(slug: string, user: User | null): Promise<{
        id: string;
        slug: string;
        name: string;
        description: string;
        shortDescription: string | null;
        avatarUrl: string | null;
        coverUrl: string | null;
        accentColor: string;
        parent: {
            slug: string;
            name: string;
        } | null;
        subscriberCount: number;
        ownPublicationCount: number;
        publicationCount: number;
        isSubscribed: boolean;
        canManage: boolean;
        notifyLevel: import("../generated/prisma/enums.js").NotifyLevel;
        children: {
            slug: string;
            name: string;
            shortDescription: string | null;
            avatarUrl: string | null;
            coverUrl: string | null;
            subscriberCount: number;
        }[];
        team: {
            role: import("../generated/prisma/enums.js").CommunityRoleType;
            user: {
                username: string;
                displayName: string;
                avatarUrl: string | null;
            };
        }[];
        popularTags: {
            id: string;
            slug: string;
            label: string;
            publicationCount: number;
            styleEnabled: boolean;
            backgroundColor: string;
            textColor: string;
            borderColor: string;
        }[];
        activePoll: {
            id: string;
            title: string;
            closesAt: Date;
            totalVotes: number;
        } | null;
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
            inheritedFromChild: boolean;
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
    updateSubscription(slug: string, user: User, dto: UpdateCommunitySubscriptionDto): Promise<{
        notifyLevel: import("../generated/prisma/enums.js").NotifyLevel;
    }>;
    create(dto: CreateCommunityDto, user: User): Promise<{
        id: string;
        slug: string;
    }>;
}
