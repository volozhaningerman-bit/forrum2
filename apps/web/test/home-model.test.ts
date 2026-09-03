import test from 'node:test';
import assert from 'node:assert/strict';
import * as homeModel from '../components/home/model.js';
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

test('live activity uses the latest real reply and keeps newest events first', () => {
  assert.equal(
    typeof (homeModel as Record<string, unknown>).buildLiveActivity,
    'function',
  );

  const buildLiveActivity = homeModel.buildLiveActivity;
  const activity = buildLiveActivity([
    {
      id: 'older-topic',
      slug: 'older-topic',
      format: 'TOPIC',
      title: 'Старая тема',
      createdAt: '2026-09-02T08:00:00.000Z',
      author: { username: 'author' },
      community: { slug: 'forum', name: 'FORRUM' },
    },
    {
      id: 'answered-topic',
      slug: 'answered-topic',
      format: 'TOPIC',
      title: 'Как запустить проект?',
      createdAt: '2026-09-02T09:00:00.000Z',
      lastComment: {
        createdAt: '2026-09-02T10:30:00.000Z',
        author: { username: 'helper' },
      },
      author: { username: 'starter' },
      community: { slug: 'projects', name: 'Проекты' },
    },
  ]);

  assert.deepEqual(
    activity.map((item) => ({
      kind: item.kind,
      username: item.username,
      title: item.title,
      occurredAt: item.occurredAt,
    })),
    [
      {
        kind: 'reply',
        username: 'helper',
        title: 'Как запустить проект?',
        occurredAt: '2026-09-02T10:30:00.000Z',
      },
      {
        kind: 'topic',
        username: 'author',
        title: 'Старая тема',
        occurredAt: '2026-09-02T08:00:00.000Z',
      },
    ],
  );
});

test('live activity distinguishes posts and respects the visible limit', () => {
  assert.equal(
    typeof (homeModel as Record<string, unknown>).buildLiveActivity,
    'function',
  );

  const activity = homeModel.buildLiveActivity(
    [
      {
        id: 'post',
        slug: 'post',
        format: 'POST',
        title: null,
        excerpt: 'Короткая запись автора',
        createdAt: '2026-09-02T12:00:00.000Z',
        author: { username: 'writer' },
        community: { slug: 'notes', name: 'Заметки' },
      },
      {
        id: 'topic',
        slug: 'topic',
        format: 'TOPIC',
        title: 'Тема',
        excerpt: '',
        createdAt: '2026-09-02T11:00:00.000Z',
        author: { username: 'starter' },
        community: { slug: 'forum', name: 'FORRUM' },
      },
    ],
    1,
  );

  assert.deepEqual(activity, [
    {
      id: 'post:post:2026-09-02T12:00:00.000Z',
      kind: 'post',
      username: 'writer',
      title: 'Короткая запись автора',
      slug: 'post',
      communityName: 'Заметки',
      occurredAt: '2026-09-02T12:00:00.000Z',
    },
  ]);
});

test('topic pulse marks a recently active discussion as hot', () => {
  const now = Date.parse('2026-09-02T12:00:00.000Z');

  assert.equal(
    homeModel.topicPulse(
      {
        type: 'DISCUSSION',
        createdAt: '2026-08-30T12:00:00.000Z',
        lastActivityAt: '2026-09-02T10:00:00.000Z',
        commentCount: 8,
        viewCount: 700,
      },
      now,
    ),
    'hot',
  );
});

test('topic pulse marks a new topic with meaningful attention as rising', () => {
  const now = Date.parse('2026-09-02T12:00:00.000Z');

  assert.equal(
    homeModel.topicPulse(
      {
        type: 'QUESTION',
        createdAt: '2026-09-01T12:00:00.000Z',
        lastActivityAt: '2026-09-01T20:00:00.000Z',
        commentCount: 3,
        viewCount: 180,
      },
      now,
    ),
    'rising',
  );
});

test('topic pulse stays absent for stale or insufficient activity', () => {
  const now = Date.parse('2026-09-02T12:00:00.000Z');
  const pulse = homeModel.topicPulse;

  assert.equal(
    pulse(
      {
        type: 'QUESTION',
        createdAt: '2026-08-01T12:00:00.000Z',
        lastActivityAt: '2026-08-02T12:00:00.000Z',
        commentCount: 30,
        viewCount: 5_000,
      },
      now,
    ),
    null,
  );
  assert.equal(
    pulse(
      {
        type: 'DISCUSSION',
        createdAt: '2026-09-02T08:00:00.000Z',
        lastActivityAt: '2026-09-02T10:00:00.000Z',
        commentCount: 0,
        viewCount: 12,
      },
      now,
    ),
    null,
  );
});

test('topic signal appears only when it adds useful context', () => {
  const now = Date.parse('2026-09-02T12:00:00.000Z');

  assert.deepEqual(
    [
      homeModel.topicSignal(
        {
          type: 'QUESTION',
          createdAt: '2026-08-30T12:00:00.000Z',
          lastActivityAt: '2026-08-30T12:00:00.000Z',
          commentCount: 0,
          viewCount: 24,
        },
        now,
      ),
      homeModel.topicSignal(
        {
          type: 'QUESTION',
          createdAt: '2026-08-20T12:00:00.000Z',
          lastActivityAt: '2026-08-24T12:00:00.000Z',
          commentCount: 2,
          viewCount: 80,
        },
        now,
      ),
      homeModel.topicSignal(
        {
          type: 'DISCUSSION',
          createdAt: '2026-08-20T12:00:00.000Z',
          lastActivityAt: '2026-08-24T12:00:00.000Z',
          commentCount: 0,
          viewCount: 20,
        },
        now,
      ),
    ],
    [
      { status: 'waiting', label: 'Ждёт ответа' },
      { status: 'answered', label: 'Есть ответы' },
      null,
    ],
  );
});

test('activity title suppresses repeated-character test content without changing real titles', () => {
  assert.equal(
    homeModel.safeActivityTitle('11111111111111', '', 'TOPIC'),
    'Новая тема без описания',
  );
  assert.equal(
    homeModel.safeActivityTitle(
      '  Чек-лист   органического продвижения  ',
      '',
      'TOPIC',
    ),
    'Чек-лист органического продвижения',
  );
  assert.equal(
    homeModel.safeActivityTitle(
      '11111111111111',
      'Полезное описание темы',
      'TOPIC',
    ),
    'Полезное описание темы',
  );
});

test('live activity removes test garbage before applying the visible limit', () => {
  const activity = homeModel.buildLiveActivity(
    [
      {
        id: 'digits',
        slug: 'digits',
        format: 'TOPIC',
        title: '11111111111111',
        excerpt: '',
        createdAt: '2026-09-02T14:00:00.000Z',
        author: { username: 'tester' },
        community: { slug: 'rp', name: 'GTA RP' },
      },
      {
        id: 'test',
        slug: 'test',
        format: 'TOPIC',
        title: 'тест тест',
        excerpt: '',
        createdAt: '2026-09-02T13:00:00.000Z',
        author: { username: 'tester' },
        community: { slug: 'rp', name: 'GTA RP' },
      },
      {
        id: 'real',
        slug: 'real',
        format: 'TOPIC',
        title: 'Разбор каналов привлечения',
        excerpt: '',
        createdAt: '2026-09-02T12:00:00.000Z',
        author: { username: 'creator' },
        community: { slug: 'growth', name: 'Продвижение' },
      },
    ],
    1,
  );

  assert.deepEqual(activity.map((item) => item.slug), ['real']);
});
