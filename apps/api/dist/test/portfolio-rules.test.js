import assert from 'node:assert/strict';
import test from 'node:test';
import { canLinkPortfolioInteraction, isPortfolioPublic, normalizePortfolioLinks } from '../src/portfolio/rules.js';
test('only active and completed portfolio items are public', () => {
    assert.equal(isPortfolioPublic('ACTIVE'), true);
    assert.equal(isPortfolioPublic('COMPLETED'), true);
    assert.equal(isPortfolioPublic('DRAFT'), false);
    assert.equal(isPortfolioPublic('ARCHIVED'), false);
});
test('an interaction can reference only a public item owned by the target', () => {
    assert.equal(canLinkPortfolioInteraction({ itemStatus: 'ACTIVE', itemOwnerId: 'owner', targetUserId: 'owner' }), true);
    assert.equal(canLinkPortfolioInteraction({ itemStatus: 'PAUSED', itemOwnerId: 'owner', targetUserId: 'owner' }), false);
    assert.equal(canLinkPortfolioInteraction({ itemStatus: 'ACTIVE', itemOwnerId: 'other', targetUserId: 'owner' }), false);
});
test('portfolio links are https-only, deduplicated and limited', () => {
    assert.deepEqual(normalizePortfolioLinks([' https://a.test ', 'http://bad.test', 'https://a.test', 'https://b.test']), ['https://a.test', 'https://b.test']);
});
//# sourceMappingURL=portfolio-rules.test.js.map