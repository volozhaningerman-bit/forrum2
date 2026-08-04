import { type User } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import type { CreatePortfolioItemDto, UpdatePortfolioItemDto } from './dto.js';
export declare class PortfolioService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private map;
    list(kindInput?: string, ownerUsername?: string): Promise<{
        id: any;
        kind: any;
        status: any;
        title: any;
        summary: any;
        description: any;
        coverUrl: any;
        lookingForTeam: any;
        priceText: any;
        contactNote: any;
        links: any;
        createdAt: any;
        updatedAt: any;
        owner: any;
        community: any;
        publication: any;
        interactionCount: any;
    }[]>;
    mine(userId: string): Promise<{
        id: any;
        kind: any;
        status: any;
        title: any;
        summary: any;
        description: any;
        coverUrl: any;
        lookingForTeam: any;
        priceText: any;
        contactNote: any;
        links: any;
        createdAt: any;
        updatedAt: any;
        owner: any;
        community: any;
        publication: any;
        interactionCount: any;
    }[]>;
    get(id: string, viewerId?: string): Promise<{
        isOwner: boolean;
        id: any;
        kind: any;
        status: any;
        title: any;
        summary: any;
        description: any;
        coverUrl: any;
        lookingForTeam: any;
        priceText: any;
        contactNote: any;
        links: any;
        createdAt: any;
        updatedAt: any;
        owner: any;
        community: any;
        publication: any;
        interactionCount: any;
    }>;
    private relations;
    create(ownerId: string, dto: CreatePortfolioItemDto): Promise<{
        id: string;
    }>;
    update(user: User, id: string, dto: UpdatePortfolioItemDto): Promise<{
        ok: boolean;
    }>;
    archive(user: User, id: string): Promise<{
        ok: boolean;
    }>;
}
