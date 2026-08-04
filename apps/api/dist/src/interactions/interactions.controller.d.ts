import type { User } from '../generated/prisma/client.js';
import { CancelInteractionDto, CreateInteractionDto, CreateProfileReviewDto } from './dto.js';
import { InteractionsService } from './interactions.service.js';
export declare class InteractionsController {
    private readonly service;
    constructor(service: InteractionsService);
    list(user: User): Promise<{
        viewerRole: string;
        otherUser: {
            username: string;
            displayName: string;
            avatarUrl: string | null;
        };
        viewerConfirmed: boolean;
        otherConfirmed: boolean;
        viewerCompleted: boolean;
        otherCompleted: boolean;
        review: {
            id: string;
            createdAt: Date;
            body: string;
            evidenceMediaId: string | null;
            verdict: import("../generated/prisma/enums.js").ReviewVerdict;
        };
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
        createdBy: {
            username: string;
            displayName: string;
            avatarUrl: string | null;
        };
        counterpart: {
            username: string;
            displayName: string;
            avatarUrl: string | null;
        };
        reviews: {
            id: string;
            createdAt: Date;
            body: string;
            evidenceMediaId: string | null;
            verdict: import("../generated/prisma/enums.js").ReviewVerdict;
        }[];
        id: string;
        createdAt: Date;
        updatedAt: Date;
        communityId: string | null;
        publicationId: string | null;
        description: string;
        status: import("../generated/prisma/enums.js").InteractionStatus;
        createdById: string;
        type: import("../generated/prisma/enums.js").InteractionType;
        title: string;
        cancelledAt: Date | null;
        counterpartId: string;
        portfolioItemId: string | null;
        creatorConfirmedAt: Date | null;
        counterpartConfirmedAt: Date | null;
        creatorCompletedAt: Date | null;
        counterpartCompletedAt: Date | null;
        completedAt: Date | null;
    }[]>;
    create(user: User, dto: CreateInteractionDto): Promise<{
        id: string;
    }>;
    confirm(id: string, user: User): Promise<{
        id: string;
        status: import("../generated/prisma/enums.js").InteractionStatus;
    }>;
    complete(id: string, user: User): Promise<{
        id: string;
        status: import("../generated/prisma/enums.js").InteractionStatus;
    }>;
    cancel(id: string, user: User, dto: CancelInteractionDto): Promise<{
        ok: boolean;
    }>;
    review(id: string, user: User, dto: CreateProfileReviewDto): Promise<{
        id: string;
    }>;
}
