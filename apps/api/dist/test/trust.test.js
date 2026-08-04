import assert from 'node:assert/strict';
import test from 'node:test';
import { determineLocalTrust } from '../src/users/trust.js';
test('local trust remains new without visible community history', () => {
    assert.equal(determineLocalTrust({ emailVerified: true, publicationCount: 0, commentCount: 0, helpfulReactionCount: 0, bookmarkCount: 0, activeRole: false }).level, 'NEW');
});
test('repeated helpful contribution becomes stable without a magic percentage', () => {
    const result = determineLocalTrust({ emailVerified: true, publicationCount: 2, commentCount: 4, helpfulReactionCount: 3, bookmarkCount: 2, activeRole: false });
    assert.equal(result.level, 'STABLE');
    assert.ok(result.evidence.some((item) => item.includes('Полезно')));
});
test('a role alone does not create exceptional trust', () => {
    assert.equal(determineLocalTrust({ emailVerified: true, publicationCount: 0, commentCount: 1, helpfulReactionCount: 0, bookmarkCount: 0, activeRole: true }).level, 'BASIC');
});
//# sourceMappingURL=trust.test.js.map