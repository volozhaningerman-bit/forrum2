import type { WeeklyUser } from './types';

export const homeDemoMedia = [
  {
    id: 'demo-live',
    kind: 'live' as const,
    eyebrow: 'В эфире',
    title: 'Разбираем запуск продукта без рекламного бюджета',
    meta: '@maxstream · 184 зрителя',
  },
  {
    id: 'demo-media-news',
    kind: 'news' as const,
    eyebrow: 'Новости автора',
    title: 'Новый выпуск: как собрать сильное сообщество',
    meta: '@nora · 12 мин. назад',
  },
];

export const homeDemoServices = [
  {
    id: 'demo-service-design',
    title: 'Дизайн Telegram Mini App под запуск',
    meta: 'от 35 000 ₽ · @pixel',
    signal: '4.9 · 18 отзывов',
  },
  {
    id: 'demo-service-traffic',
    title: 'Аудит органического трафика и точек роста',
    meta: 'от 12 000 ₽ · @nora',
    signal: '5.0 · 11 отзывов',
  },
  {
    id: 'demo-service-team',
    title: 'Соберу команду для MVP за две недели',
    meta: 'по договорённости · @volog',
    signal: '4.8 · 9 отзывов',
  },
];

export const homeDemoWeekly: {
  likes: WeeklyUser[];
  activity: WeeklyUser[];
} = {
  likes: [
    {
      username: 'nora',
      displayName: 'Nora',
      score: 24,
      reactionCount: 24,
      topicCount: 3,
      commentCount: 12,
    },
    {
      username: 'maxstream',
      displayName: 'Max Stream',
      score: 18,
      reactionCount: 18,
      topicCount: 2,
      commentCount: 9,
    },
    {
      username: 'pixel',
      displayName: 'Pixel',
      score: 14,
      reactionCount: 14,
      topicCount: 1,
      commentCount: 8,
    },
  ],
  activity: [
    {
      username: 'maxstream',
      displayName: 'Max Stream',
      score: 20,
      reactionCount: 18,
      topicCount: 5,
      commentCount: 15,
    },
    {
      username: 'nora',
      displayName: 'Nora',
      score: 15,
      reactionCount: 24,
      topicCount: 3,
      commentCount: 12,
    },
    {
      username: 'pixel',
      displayName: 'Pixel',
      score: 9,
      reactionCount: 14,
      topicCount: 1,
      commentCount: 8,
    },
  ],
};
