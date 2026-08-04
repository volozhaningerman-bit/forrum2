import type { User } from '../generated/prisma/client.js';
import { CreatePortfolioItemDto, UpdatePortfolioItemDto } from './dto.js';
import { PortfolioService } from './portfolio.service.js';
export declare class PortfolioController {
    private readonly service;
    constructor(service: PortfolioService);
    list(kind?: string, owner?: string): Promise<{
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
    mine(user: User): Promise<{
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
    get(id: string, user: User | null): Promise<{
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
    create(user: User, dto: CreatePortfolioItemDto): Promise<{
        id: string;
    }>;
    update(user: User, id: string, dto: UpdatePortfolioItemDto): Promise<{
        ok: boolean;
    }>;
    archive(user: User, id: string): Promise<{
        ok: boolean;
    }>;
}
