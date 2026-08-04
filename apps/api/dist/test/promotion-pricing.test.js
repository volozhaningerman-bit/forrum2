import test from 'node:test';
import assert from 'node:assert/strict';
import { calculatePromotionPrice } from '../src/wallet/pricing.js';
test('price grows by the configured percentage for each occupied place', () => {
    assert.equal(calculatePromotionPrice(500, 1, 0, 35), 500);
    assert.equal(calculatePromotionPrice(500, 1, 1, 35), 680);
    assert.equal(calculatePromotionPrice(500, 1, 2, 35), 850);
});
test('duration is applied before rounding to tens', () => {
    assert.equal(calculatePromotionPrice(150, 7, 2, 12), 1310);
});
//# sourceMappingURL=promotion-pricing.test.js.map