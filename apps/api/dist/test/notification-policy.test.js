import assert from 'node:assert/strict';
import test from 'node:test';
import { notificationEnabled } from '../src/notifications/policy.js';
const enabled = {
    publicationReplies: true,
    commentReplies: true,
    reactions: true,
    follows: true,
    wallPosts: true,
    messages: true,
    system: true,
};
test('a user can disable reactions without losing reply notifications', () => {
    const preferences = { ...enabled, reactions: false };
    assert.equal(notificationEnabled(preferences, 'REACTION'), false);
    assert.equal(notificationEnabled(preferences, 'PUBLICATION_REPLY'), true);
});
test('personal message notifications follow their own preference', () => {
    assert.equal(notificationEnabled({ ...enabled, messages: false }, 'MESSAGE'), false);
});
//# sourceMappingURL=notification-policy.test.js.map