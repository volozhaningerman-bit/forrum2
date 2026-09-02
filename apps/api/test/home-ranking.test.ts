import test from 'node:test';
import assert from 'node:assert/strict';
import { rankWeekly } from '../src/home/ranking.js';

function user(
  username: string,
  values: Partial<{
    reactionCount: number;
    topicCount: number;
    commentCount: number;
    presenceCount: number;
  }> = {},
) {
  return {
    username,
    displayName: username,
    avatarUrl: null,
    reactionCount: values.reactionCount ?? 0,
    topicCount: values.topicCount ?? 0,
    commentCount: values.commentCount ?? 0,
    presenceCount: values.presenceCount ?? 0,
  };
}

test('weekly activity is exactly topics plus comments', () => {
  const ranking = rankWeekly([
    user('reader', { presenceCount: 100 }),
    user('author', { topicCount: 2, commentCount: 3 }),
  ], 'activity');

  assert.equal(ranking.length, 1);
  assert.equal(ranking[0]?.username, 'author');
  assert.equal(ranking[0]?.score, 5);
});

test('weekly likes use only received reactions', () => {
  const ranking = rankWeekly([
    user('writer', { topicCount: 20, reactionCount: 1 }),
    user('liked', { reactionCount: 4 }),
  ], 'likes');

  assert.equal(ranking[0]?.username, 'liked');
  assert.equal(ranking[0]?.score, 4);
});

test('weekly ranking uses username as deterministic tie-breaker', () => {
  const ranking = rankWeekly([
    user('zeta', { commentCount: 2 }),
    user('alpha', { topicCount: 2 }),
  ], 'activity');

  assert.deepEqual(ranking.map((entry) => entry.username), ['alpha', 'zeta']);
});
