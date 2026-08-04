import { InteractionStatus, type InteractionType, type ReviewVerdict } from '../generated/prisma/client.js';
import { NotificationsService } from '../notifications/notifications.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import type { CreateInteractionDto } from './dto.js';
export declare class InteractionsService {
    private readonly prisma;
    private readonly notifications;
    constructor(prisma: PrismaService, notifications: NotificationsService);
    private participantWhere;
    list(userId: string): Promise<{
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
            verdict: ReviewVerdict;
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
            verdict: ReviewVerdict;
        }[];
        id: string;
        createdAt: Date;
        updatedAt: Date;
        communityId: string | null;
        publicationId: string | null;
        description: string;
        status: InteractionStatus;
        createdById: string;
        type: InteractionType;
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
    create(actorId: string, dto: CreateInteractionDto): Promise<{
        id: string;
    }>;
    confirm(id: string, actorId: string): Promise<{
        id: string;
        status: InteractionStatus;
    }>;
    complete(id: string, actorId: string): Promise<{
        id: string;
        status: InteractionStatus;
    }>;
    cancel(id: string, actorId: string, reason?: string): Promise<{
        ok: boolean;
    }>;
    review(id: string, actorId: string, verdict: ReviewVerdict, bodyInput: string, evidenceMediaId?: string): Promise<{
        id: string;
    }>;
}
