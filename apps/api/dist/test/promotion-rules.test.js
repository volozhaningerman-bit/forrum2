import assert from 'node:assert/strict';
import test from 'node:test';
import { blocksDuplicatePromotion, isWithinPromotionRefundGrace, promotionQuoteBreakdown } from '../src/wallet/rules.js';
test('promotion quote exposes the configured demand multiplier and rounded price', () => {
    const quote = promotionQuoteBreakdown(500, 1, 1, 35);
    assert.equal(quote.multiplier, 1.35);
    assert.equal(quote.rawPrice, 675);
    assert.equal(quote.price, 680);
});
test('promotion refund is only automatic during the short grace period', () => {
    const start = new Date('2026-07-30T10:00:00Z');
    assert.equal(isWithinPromotionRefundGrace(start, new Date('2026-07-30T10:09:59Z')), true);
    assert.equal(isWithinPromotionRefundGrace(start, new Date('2026-07-30T10:10:01Z')), false);
});
test('only a live active order blocks another promotion of the same type', () => {
    const now = new Date('2026-07-30T10:00:00Z');
    assert.equal(blocksDuplicatePromotion('ACTIVE', new Date('2026-07-31T10:00:00Z'), now), true);
    assert.equal(blocksDuplicatePromotion('CANCELLED', new Date('2026-07-31T10:00:00Z'), now), false);
    assert.equal(blocksDuplicatePromotion('ACTIVE', new Date('2026-07-29T10:00:00Z'), now), false);
});
//# sourceMappingURL=promotion-rules.test.js.map