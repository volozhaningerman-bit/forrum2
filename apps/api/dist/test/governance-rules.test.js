import assert from 'node:assert/strict';
import test from 'node:test';
import { determineVoteClass } from '../src/governance/rules.js';
const now = new Date('2026-07-30T00:00:00.000Z');
test('verified community participation becomes a binding vote after the minimum age', () => {
    assert.equal(determineVoteClass({ privileged: false, directlySubscribed: true, accountCreatedAt: new Date('2026-07-01T00:00:00.000Z'), now }), 'BINDING');
});
test('a new or non-subscribed account remains advisory', () => {
    assert.equal(determineVoteClass({ privileged: false, directlySubscribed: true, accountCreatedAt: new Date('2026-07-25T00:00:00.000Z'), now }), 'ADVISORY');
    assert.equal(determineVoteClass({ privileged: false, directlySubscribed: false, accountCreatedAt: new Date('2025-01-01T00:00:00.000Z'), now }), 'ADVISORY');
});
test('administration uses a binding vote', () => {
    assert.equal(determineVoteClass({ privileged: true, directlySubscribed: false, accountCreatedAt: now, now }), 'BINDING');
});
test('a poll can require a longer account age without changing the global default', () => {
    assert.equal(determineVoteClass({ privileged: false, directlySubscribed: true, accountCreatedAt: new Date('2026-07-01T00:00:00.000Z'), now, minimumAgeDays: 45 }), 'ADVISORY');
    assert.equal(determineVoteClass({ privileged: false, directlySubscribed: true, accountCreatedAt: new Date('2026-05-01T00:00:00.000Z'), now, minimumAgeDays: 45 }), 'BINDING');
});
//# sourceMappingURL=governance-rules.test.js.map