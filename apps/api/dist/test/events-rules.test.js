import assert from 'node:assert/strict';
import test from 'node:test';
import { canAttendEvent } from '../src/events/rules.js';
const now = new Date('2026-07-30T10:00:00.000Z');
test('a published future event accepts attendance while capacity remains', () => {
    assert.deepEqual(canAttendEvent({ published: true, startsAt: new Date('2026-07-31T10:00:00.000Z'), now, goingCount: 9, capacity: 10, alreadyGoing: false }), { allowed: true, reason: null });
});
test('capacity blocks only a new participant, not an existing one', () => {
    assert.equal(canAttendEvent({ published: true, startsAt: new Date('2026-07-31T10:00:00.000Z'), now, goingCount: 10, capacity: 10, alreadyGoing: false }).reason, 'full');
    assert.equal(canAttendEvent({ published: true, startsAt: new Date('2026-07-31T10:00:00.000Z'), now, goingCount: 10, capacity: 10, alreadyGoing: true }).allowed, true);
});
test('draft and already started events reject new attendance', () => {
    assert.equal(canAttendEvent({ published: false, startsAt: new Date('2026-07-31T10:00:00.000Z'), now, goingCount: 0, capacity: null, alreadyGoing: false }).reason, 'closed');
    assert.equal(canAttendEvent({ published: true, startsAt: new Date('2026-07-30T09:00:00.000Z'), now, goingCount: 0, capacity: null, alreadyGoing: false }).reason, 'closed');
});
//# sourceMappingURL=events-rules.test.js.map