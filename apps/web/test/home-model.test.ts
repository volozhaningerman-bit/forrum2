import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildServiceLoop,
  mergePopularTopics,
  selectMediaItems,
} from '../components/home/model.js';

function topic(id: string, excerpt = 'excerpt') {
  return { id, excerpt };
}

function media(id: string, username: string, title = 'Новость автора') {
  return {
    id,
    title,
    excerpt: '',
    createdAt: id === 'live' ? '2026-09-02T12:00:00.000Z' : '2026-09-02T11:00:00.000Z',
    author: { username },
  };
}

function partner(username: string) {
  return { id: username, user: { username } };
}

test('popular topics preserve popular-feed order and use richer matches', () => {
  const feed = [topic('second'), topic('first')];
  const richer = [topic('first', 'rich')];

  assert.deepEqual(
    mergePopularTopics(feed, richer).map((item) => [item.id, item.excerpt]),
    [['second', 'excerpt'], ['first', 'rich']],
  );
});

test('popular topics append overview-only records without duplicating matches', () => {
  assert.deepEqual(
    mergePopularTopics([topic('feed')], [topic('overview')]).map((item) => item.id),
    ['feed', 'overview'],
  );
});

test('service loop animates only when more than five real services exist', () => {
  assert.deepEqual(buildServiceLoop([1, 2, 3, 4, 5]), {
    animated: false,
    items: [1, 2, 3, 4, 5],
  });
  assert.deepEqual(buildServiceLoop([1, 2, 3, 4, 5, 6]), {
    animated: true,
    items: [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6],
  });
});

test('media contains only approved partners and puts a live item first', () => {
  const selected = selectMediaItems(
    [
      media('news', 'partner'),
      media('live', 'partner', 'Стрим начался: разбираем запуск'),
      media('foreign', 'other'),
    ],
    [partner('partner')],
  );

  assert.deepEqual(selected.map(({ item }) => item.id), ['live', 'news']);
});

test('media does not repeat the same material from two source endpoints', () => {
  const repeated = media('same', 'partner');
  const selected = selectMediaItems(
    [repeated, { ...repeated }],
    [partner('partner')],
  );

  assert.deepEqual(selected.map(({ item }) => item.id), ['same']);
});
