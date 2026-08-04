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
        };
        poll: {
            id: string;
            title: string;
            closesAt: Date;
            community: {
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
