import { PromotionOrderStatus, PromotionType, WalletTransactionType } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
export declare class WalletService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private pricing;
    private parameters;
    private expireOrders;
    private refreshPinnedUntil;
    get(userId: string): Promise<{
        balance: number;
        transactions: {
            id: string;
            createdAt: Date;
            description: string;
            status: import("../generated/prisma/enums.js").WalletTransactionStatus;
            type: WalletTransactionType;
            walletId: string;
            amount: number;
            externalRef: string | null;
        }[];
        promotions: ({
            community: {
                slug: string;
                name: string;
            };
            publication: {
                slug: string;
                title: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            userId: string;
            communityId: string;
            publicationId: string;
            status: PromotionOrderStatus;
            type: PromotionType;
            price: number;
            startsAt: Date;
            endsAt: Date;
            cancelledAt: Date | null;
            cancellationReason: string | null;
        })[];
        refundGraceMinutes: number;
    }>;
    quote(communitySlug: string, type: PromotionType, durationDays: number): Promise<{
        type: PromotionType;
        durationDays: number;
        active: number;
        occupied: number;
        limit: number;
        remaining: number;
        available: boolean;
        price: number;
        currency: string;
        basePerDay: number;
        demandPercentPerOccupied: number;
        multiplier: number;
        baseDurationPrice: number;
        demandSurcharge: number;
    }>;
    purchase(userId: string, communitySlug: string, publicationSlug: string, type: PromotionType, durationDays: number): Promise<{
        id: string;
        price: number;
        endsAt: Date;
        refundGraceMinutes: number;
    }>;
    cancel(userId: string, orderId: string, reason: string): Promise<{
        status: "EXPIRED";
        refunded: number;
    } | {
        status: "CANCELLED" | "REFUNDED";
        refunded: number;
    }>;
    adminList(): Promise<({
        user: {
            username: string;
            displayName: string;
        };
        community: {
            slug: string;
            name: string;
        };
        publication: {
            slug: string;
            title: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        communityId: string;
        publicationId: string;
        status: PromotionOrderStatus;
        type: PromotionType;
        price: number;
        startsAt: Date;
        endsAt: Date;
        cancelledAt: Date | null;
        cancellationReason: string | null;
    })[]>;
    adminRefund(actorId: string, orderId: string, reason: string): Promise<{
        refunded: number;
    }>;
    grant(actorId: string, usernameInput: string, amount: number, description: string): Promise<{
        id: string;
    }>;
}
