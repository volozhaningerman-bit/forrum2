import assert from 'node:assert/strict';
import test from 'node:test';
import { completionState, reviewAllowed } from '../src/interactions/rules.js';
test('one completion confirmation is not enough', () => {
    assert.equal(completionState({ creatorCompleted: true, counterpartCompleted: false }), 'CONFIRMED');
});
test('both completion confirmations close the interaction', () => {
    assert.equal(completionState({ creatorCompleted: true, counterpartCompleted: true }), 'COMPLETED');
});
test('a review requires a completed interaction and a participant', () => {
    assert.equal(reviewAllowed({ status: 'CONFIRMED', participant: true, alreadyReviewed: false }), false);
    assert.equal(reviewAllowed({ status: 'COMPLETED', participant: false, alreadyReviewed: false }), false);
    assert.equal(reviewAllowed({ status: 'COMPLETED', participant: true, alreadyReviewed: false }), true);
});
//# sourceMappingURL=interaction-rules.test.js.map