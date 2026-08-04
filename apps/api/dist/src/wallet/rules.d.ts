export declare const PROMOTION_REFUND_GRACE_MINUTES = 10;
export declare function promotionMultiplier(activePlaces: number, demandPercentPerOccupied: number): number;
export declare function promotionQuoteBreakdown(basePerDay: number, durationDays: number, activePlaces: number, demandPercentPerOccupied: number): {
    basePerDay: number;
    durationDays: number;
    activePlaces: number;
    demandPercentPerOccupied: number;
    multiplier: number;
    rawPrice: number;
    price: number;
};
export declare function isWithinPromotionRefundGrace(startsAt: Date, now?: Date, graceMinutes?: number): boolean;
export declare function blocksDuplicatePromotion(status: string, endsAt: Date, now?: Date): boolean;
