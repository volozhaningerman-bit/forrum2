import assert from 'node:assert/strict';
import test from 'node:test';
import { includeInForYou } from '../src/feed/policy.js';
test('guests receive a useful public feed without stored interests', () => {
    assert.equal(includeInForYou({ authenticated: false, recommendationsEnabled: true, personallyRelevant: false, discussed: false }), true);
});
test('disabled recommendations leave only explicit interests', () => {
    assert.equal(includeInForYou({ authenticated: true, recommendationsEnabled: false, personallyRelevant: false, discussed: true }), false);
    assert.equal(includeInForYou({ authenticated: true, recommendationsEnabled: false, personallyRelevant: true, discussed: false }), true);
});
test('enabled recommendations admit discussed content but not quiet noise', () => {
    assert.equal(includeInForYou({ authenticated: true, recommendationsEnabled: true, personallyRelevant: false, discussed: true }), true);
    assert.equal(includeInForYou({ authenticated: true, recommendationsEnabled: true, personallyRelevant: false, discussed: false }), false);
});
//# sourceMappingURL=feed-policy.test.js.map