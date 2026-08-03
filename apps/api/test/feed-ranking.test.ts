import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateFeedScore } from '../src/feed/ranking.js';

const now = Date.now();
const base = {
  mode: 'for-you',
  format: 'TOPIC' as const,
  createdAtMs: now - 2 * 3_600_000,
  lastActivityAtMs: now - 30 * 60_000,
  nowMs: now,
  commentCount: 3,
  reactionCount: 5,
  bookmarkCount: 1,
  viewCount: 180,
  isCommunitySubscribed: false,
  isAuthorFollowed: false,
  matchingTagCount: 0,
  isPinned: false,
};

test('a subscribed community ranks above an unrelated item', () => {
  const unrelated = calculateFeedScore(base);
  const subscribed = calculateFeedScore({ ...base, isCommunitySubscribed: true });
  assert.ok(subscribed.score > unrelated.score);
  assert.equal(subscribed.reason, 'Вы подписаны на сообщество');
  assert.equal(subscribed.personallyRelevant, true);
});

test('promotion is bounded and does not beat strong personal relevance by itself', () => {
  const promoted = calculateFeedScore({ ...base, isPinned: true, commentCount: 0, reactionCount: 0, bookmarkCount: 0, viewCount: 0 });
  const relevant = calculateFeedScore({ ...base, isCommunitySubscribed: true, matchingTagCount: 1 });
  assert.ok(relevant.score > promoted.score);
});

test('quiet unrelated content is not marked as discussed', () => {
  const result = calculateFeedScore({ ...base, commentCount: 0, reactionCount: 0, bookmarkCount: 0, viewCount: 3 });
  assert.equal(result.personallyRelevant, false);
  assert.equal(result.discussed, false);
});
