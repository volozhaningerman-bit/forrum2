import type { User } from '../generated/prisma/client.js';
import { HomeService } from './home.service.js';
export declare class HomeController {
    private readonly service;
    constructor(service: HomeService);
    overview(user: User | null): Promise<{
        stats: {
            verifiedUsers: number;
            activeUsers24h: number;
            publications: number;
            comments24h: number;
            communities: number;
            topics: number;
            messages: number;
            usersOnline: number;
            recordOnline: number;
            recordOnlineAt: string | null;
        };
        weekly: {
            likes: import("./ranking.js").WeeklyRankingResult[];
            activity: import("./ranking.js").WeeklyRankingResult[];
        };
        discussed: {
            id: string;
            slug: string;
            type: import("../generated/prisma/enums.js").PublicationType;
            title: string | null;
            excerpt: string;
            viewCount: number;
            createdAt: Date;
            lastActivityAt: Date;
            commentCount: number;
            reactionCount: number;
            author: {
                username: string;
                displayName: string;
                avatarUrl: string | null;
            };
            community: {
                avatarUrl: string | null;
                slug: string;
                name: string;
                accentColor: string;
            };
            lastComment: {
                createdAt: Date;
                author: {
                    username: string;
                    displayName: string;
                };
            };
        }[];
        activePolls: {
            id: string;
            title: string;
            description: string;
            kind: import("../generated/prisma/enums.js").PollKind;
            closesAt: Date;
            status: import("../generated/prisma/enums.js").PollStatus;
            createdAt: Date;
            community: {
                avatarUrl: string | null;
                slug: string;
                name: string;
                accentColor: string;
            };
            options: {
                id: string;
                label: string;
                position: number;
                bindingVotes: number;
                advisoryVotes: number;
            }[];
        }[];
        poll: {
            id: string;
            title: string;
            closesAt: Date;
            community: {
                avatarUrl: string | null;
                slug: string;
                name: string;
                accentColor: string;
            };
            totalVotes: number;
            viewerVoted: boolean;
        } | null;
        proposal: {
            id: string;
            name: string;
            description: string;
            supportCount: number;
            author: {
                username: string;
                displayName: string;
            };
        } | null;
    }>;
}
