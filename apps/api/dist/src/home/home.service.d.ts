import { PrismaService } from '../prisma/prisma.service.js';
export declare class HomeService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    overview(userId?: string): Promise<{
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
