import { CommunityRoleType, type NotifyLevel } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import type { CreateCommunityDto } from './dto.js';
export declare class CommunitiesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    list(userId?: string): Promise<{
        id: string;
        slug: string;
        name: string;
        description: string;
        shortDescription: string | null;
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
        notifyLevel: NotifyLevel;
        curator: {
            username: string;
            displayName: string;
        } | null;
    }[]>;
    get(slug: string, userId?: string): Promise<{
        id: string;
        slug: string;
        name: string;
        description: string;
        shortDescription: string | null;
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
        notifyLevel: NotifyLevel;
        children: {
            slug: string;
            name: string;
            subscriberCount: number;
        }[];
        team: {
            role: CommunityRoleType;
            user: {
                username: string;
                displayName: string;
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
    subscribe(slug: string, userId: string): Promise<{
        ok: boolean;
    }>;
    unsubscribe(slug: string, userId: string): Promise<{
        ok: boolean;
    }>;
    updateSubscription(slug: string, userId: string, notifyLevel: NotifyLevel): Promise<{
        notifyLevel: NotifyLevel;
    }>;
    create(dto: CreateCommunityDto, creatorId: string): Promise<{
        id: string;
        slug: string;
    }>;
}
