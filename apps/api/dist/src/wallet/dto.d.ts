import { PromotionType } from '../generated/prisma/client.js';
export declare class PromotionQuoteDto {
    type: PromotionType;
    durationDays: number;
}
export declare class PurchasePromotionDto extends PromotionQuoteDto {
    publicationSlug: string;
}
export declare class CancelPromotionDto {
    reason: string;
}
export declare class GrantBalanceDto {
    username: string;
    amount: number;
    description: string;
}
