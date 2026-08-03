import { promotionQuoteBreakdown } from './rules.js';

export type PromotionPricing = {
  pinLimit: number; pinBasePricePerDay: number; pinDemandPercentPerOccupied: number;
  boostLimit: number; boostBasePricePerDay: number; boostDemandPercentPerOccupied: number;
};

export function calculatePromotionPrice(basePerDay: number, durationDays: number, activePlaces: number, demandPercentPerOccupied: number) {
  return promotionQuoteBreakdown(basePerDay, durationDays, activePlaces, demandPercentPerOccupied).price;
}
