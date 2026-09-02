import type { Community, TreeNode } from './types';

const topicVisuals: Record<string, string> = {
  'forrum-start': '/forrum-assets/topic-forrum.svg',
  'forrum-feedback': '/forrum-assets/topic-forrum.svg',
  'internet-projects': '/forrum-assets/topic-projects.svg',
  'launches-and-teams': '/forrum-assets/topic-projects.svg',
  promotion: '/forrum-assets/topic-promotion.svg',
  'seo-and-traffic': '/forrum-assets/topic-seo.svg',
  'gta-rp': '/forrum-assets/topic-gta.svg',
  'majestic-rp': '/forrum-assets/topic-gta.svg',
  telegram: '/forrum-assets/topic-telegram.svg',
  'telegram-bots': '/forrum-assets/topic-telegram.svg',
};

const publicationTypeVisuals: Record<string, string> = {
  NEWS: '/forrum-assets/topic-news.svg',
  QUESTION: '/forrum-assets/topic-question.svg',
  CASE: '/forrum-assets/topic-case.svg',
  DISCUSSION: '/forrum-assets/topic-discussion.svg',
  GUIDE: '/forrum-assets/topic-guide.svg',
  PROJECT: '/forrum-assets/topic-project.svg',
  SERVICE: '/forrum-assets/topic-service.svg',
  ANNOUNCEMENT: '/forrum-assets/topic-announcement.svg',
};

export const publicationTypeName: Record<string, string> = {
  DISCUSSION: 'Обсуждение',
  QUESTION: 'Вопрос',
  NEWS: 'Новости',
  GUIDE: 'Гайд',
  PROJECT: 'Проект',
  SERVICE: 'Услуга',
  CASE: 'Кейс',
  ANNOUNCEMENT: 'Объявление',
};

function topicVisual(slug: string) {
  return topicVisuals[slug] ?? '/forrum-assets/topic-default.svg';
}

export function communityVisual(
  slug: string,
  avatarUrl?: string | null,
) {
  return topicVisuals[slug] ?? avatarUrl ?? topicVisual(slug);
}

export function topicContentVisual(item: {
  type: string;
  community: { slug: string; avatarUrl?: string | null };
}) {
  return (
    publicationTypeVisuals[item.type.toUpperCase()] ??
    communityVisual(item.community.slug, item.community.avatarUrl)
  );
}

export function formatCount(value: number | undefined) {
  const safe = Number.isFinite(value) ? Number(value) : 0;
  return new Intl.NumberFormat('ru-RU', {
    notation: safe >= 10_000 ? 'compact' : 'standard',
    maximumFractionDigits: 1,
  }).format(safe);
}

export function relativeTime(value?: string | null) {
  if (!value) return '';
  const time = new Date(value).getTime();
  if (!Number.isFinite(time)) return '';
  const diff = Math.max(0, Date.now() - time);
  if (diff < 60_000) return 'только что';
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 60) return `${minutes} мин. назад`;
  const hours = Math.floor(diff / 3_600_000);
  if (hours < 24) return `${hours} ч. назад`;
  const days = Math.floor(diff / 86_400_000);
  if (days < 14) return `${days} дн. назад`;
  return new Date(value).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
  });
}

export function pollTimeLeft(value: string) {
  const time = new Date(value).getTime();
  if (!Number.isFinite(time)) return '';
  const diff = time - Date.now();
  if (diff <= 0) return 'завершено';
  const hours = Math.ceil(diff / 3_600_000);
  if (hours < 24) return `${hours} ч.`;
  return `${Math.ceil(diff / 86_400_000)} дн.`;
}

export function lastReply(item: {
  lastComment?: {
    createdAt: string;
    author: { username: string };
  } | null;
  author: { username: string };
  lastActivityAt?: string;
  createdAt: string;
}) {
  return {
    username:
      item.lastComment?.author.username ?? item.author.username,
    createdAt:
      item.lastComment?.createdAt ??
      item.lastActivityAt ??
      item.createdAt,
  };
}

export function isStreamStart(item: {
  title: string | null;
  excerpt: string;
}) {
  return /(?:начал(?:ся|а)?|запустил(?:ся|а)?)\s+(?:стрим|эфир|трансляц\w*)|(?:стрим|эфир|трансляц\w*)\s+(?:начал(?:ся|ась)?|стартовал(?:а)?)|(?:вышел(?:а)?|уже|сейчас)\s+в\s+эфир|live\s+now|stream\s+is\s+live/i.test(
    `${item.title ?? ''} ${item.excerpt}`,
  );
}

export function communityDisplayName(name: string) {
  return name === 'FORRUM Start' ? 'О FORRUM' : name;
}

export function buildTree(items: Community[]): TreeNode[] {
  const nodes = new Map<string, TreeNode>();
  items.forEach((item) =>
    nodes.set(item.slug, { ...item, children: [] }),
  );
  const roots: TreeNode[] = [];

  nodes.forEach((node) => {
    const parent = node.parent?.slug
      ? nodes.get(node.parent.slug)
      : undefined;
    if (parent && parent.slug !== node.slug) {
      parent.children.push(node);
    } else {
      roots.push(node);
    }
  });

  const sortNodes = (rows: TreeNode[]) => {
    rows.sort(
      (left, right) =>
        (right.subscriberCount ?? 0) -
          (left.subscriberCount ?? 0) ||
        left.name.localeCompare(right.name, 'ru'),
    );
    rows.forEach((row) => sortNodes(row.children));
  };

  sortNodes(roots);
  return roots;
}
