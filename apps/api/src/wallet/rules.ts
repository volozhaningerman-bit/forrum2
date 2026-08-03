export const PROMOTION_REFUND_GRACE_MINUTES = 10;

export function promotionMultiplier(activePlaces: number, demandPercentPerOccupied: number) {
  return 1 + (Math.max(0, activePlaces) * Math.max(0, demandPercentPerOccupied)) / 100;
}

export function promotionQuoteBreakdown(basePerDay: number, durationDays: number, activePlaces: number, demandPercentPerOccupied: number) {
  const multiplier = promotionMultiplier(activePlaces, demandPercentPerOccupied);
  const rawPrice = basePerDay * durationDays * multiplier;
  const price = Math.ceil(rawPrice / 10) * 10;
  return {
    basePerDay,
    durationDays,
    activePlaces,
    demandPercentPerOccupied,
    multiplier,
    rawPrice,
    price,
  };
}

export function isWithinPromotionRefundGrace(startsAt: Date, now = new Date(), graceMinutes = PROMOTION_REFUND_GRACE_MINUTES) {
  const elapsedMs = Math.max(0, now.getTime() - startsAt.getTime());
  return elapsedMs <= graceMinutes * 60_000;
}

export function blocksDuplicatePromotion(status: string, endsAt: Date, now = new Date()) {
  return status === 'ACTIVE' && endsAt.getTime() > now.getTime();
}
