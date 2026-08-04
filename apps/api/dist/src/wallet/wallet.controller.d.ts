import type { User } from '../generated/prisma/client.js';
import { CancelPromotionDto, PromotionQuoteDto, PurchasePromotionDto } from './dto.js';
import { WalletService } from './wallet.service.js';
export declare class PromotionPublicController {
    private readonly service;
    constructor(service: WalletService);
    terms(): Promise<{
        durations: number[];
        refundGraceMinutes: number;
        pinLimit: number;
        pinBasePricePerDay: number;
        pinDemandPercentPerOccupied: number;
        boostLimit: number;
        boostBasePricePerDay: number;
        boostDemandPercentPerOccupied: number;
    }>;
}
export declare class WalletController {
    private readonly service;
    constructor(service: WalletService);
    get(user: User): Promise<{
        balance: number;
        transactions: {
            id: string;
            createdAt: Date;
            description: string;
            status: import("../generated/prisma/enums.js").WalletTransactionStatus;
            type: import("../generated/prisma/enums.js").WalletTransactionType;
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
            status: import("../generated/prisma/enums.js").PromotionOrderStatus;
            type: import("../generated/prisma/enums.js").PromotionType;
            price: number;
            startsAt: Date;
            endsAt: Date;
            cancelledAt: Date | null;
            cancellationReason: string | null;
        })[];
        refundGraceMinutes: number;
    }>;
    quote(slug: string, dto: PromotionQuoteDto): Promise<{
        type: import("../generated/prisma/enums.js").PromotionType;
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
    purchase(slug: string, user: User, dto: PurchasePromotionDto): Promise<{
        id: string;
        price: number;
        endsAt: Date;
        refundGraceMinutes: number;
    }>;
    cancel(id: string, user: User, dto: CancelPromotionDto): Promise<{
        status: "EXPIRED";
        refunded: number;
    } | {
        status: "CANCELLED" | "REFUNDED";
        refunded: number;
    }>;
}
