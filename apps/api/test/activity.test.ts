import assert from 'node:assert/strict';
import test from 'node:test';
import { describeActivity } from '../src/users/activity.js';

test('saved activity keeps a useful publication link', () => {
  assert.deepEqual(describeActivity('publication.bookmark', { slug: 'guide-123', title: 'Полезный гайд' }), {
    category: 'saved', title: 'Добавлено в сохранённое', detail: 'Полезный гайд', href: '/p/guide-123',
  });
});

test('subscription activity uses human names instead of technical ids', () => {
  assert.deepEqual(describeActivity('community.subscribe', { communitySlug: 'gta-rp', communityName: 'GTA RP' }), {
    category: 'subscriptions', title: 'Подписка на сообщество', detail: 'GTA RP', href: '/communities/gta-rp',
  });
});

test('private or unknown audit actions are not exposed', () => {
  assert.equal(describeActivity('wallet.adjust', { amount: 500 }), null);
});
