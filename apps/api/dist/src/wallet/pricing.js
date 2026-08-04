import { promotionQuoteBreakdown } from './rules.js';
export function calculatePromotionPrice(basePerDay, durationDays, activePlaces, demandPercentPerOccupied) {
    return promotionQuoteBreakdown(basePerDay, durationDays, activePlaces, demandPercentPerOccupied).price;
}
//# sourceMappingURL=pricing.js.map