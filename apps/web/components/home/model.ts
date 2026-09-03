import { isStreamStart } from './utils';
import type { TopicPulse, TopicSignal } from './types';

type Identified = { id: string };

type MediaItemLike = Identified & {
  title: string | null;
  excerpt: string;
  createdAt: string;
  author: { username: string };
};

type MediaPartnerLike = Identified & {
  user: { username: string };
};

type ActivityPublicationLike = Identified & {
  slug: string;
  format: 'POST' | 'TOPIC';
  title: string | null;
  excerpt?: string;
  createdAt: string;
  lastComment?: {
    createdAt: string;
    author: { username: string };
  } | null;
  author: { username: string };
  community: { name: string; slug?: string };
};

type TopicPulseSource = {
  type: string;
  createdAt: string;
  lastActivityAt?: string;
  commentCount: number;
  viewCount?: number;
};

export type LiveActivityItem = {
  id: string;
  kind: 'reply' | 'topic' | 'post';
  username: string;
  title: string;
  slug: string;
  communityName: string;
  occurredAt: string;
};

export function mergePopularTopics<
  TFeed extends Identified,
  TRich extends Identified,
>(
  feed: readonly TFeed[],
  richer: readonly TRich[],
): Array<TFeed | TRich> {
  const richById = new Map(
    richer.map((item) => [item.id, item]),
  );
  const merged: Array<TFeed | TRich> = feed.map(
    (item) => richById.get(item.id) ?? item,
  );
  const feedIds = new Set(feed.map((item) => item.id));

  for (const item of richer) {
    if (!feedIds.has(item.id)) merged.push(item);
  }

  return merged;
}

export function buildServiceLoop<T>(services: readonly T[]) {
  const animated = services.length > 5;

  return {
    animated,
    items: animated
      ? [...services, ...services]
      : [...services],
  };
}

export function selectMediaItems<
  TItem extends MediaItemLike,
  TPartner extends MediaPartnerLike,
>(
  materials: readonly TItem[],
  partners: readonly TPartner[],
  limit = 4,
): Array<{ item: TItem; partner: TPartner }> {
  const partnersByUsername = new Map(
    partners.map((partner) => [
      partner.user.username,
      partner,
    ]),
  );

  const uniqueMaterials = [
    ...new Map(
      materials.map((item) => [item.id, item]),
    ).values(),
  ];

  return uniqueMaterials
    .flatMap((item) => {
      const partner = partnersByUsername.get(
        item.author.username,
      );
      return partner ? [{ item, partner }] : [];
    })
    .sort((left, right) => {
      const liveOrder =
        Number(isStreamStart(right.item)) -
        Number(isStreamStart(left.item));
      if (liveOrder) return liveOrder;
      return (
        new Date(right.item.createdAt).getTime() -
        new Date(left.item.createdAt).getTime()
      );
    })
    .slice(0, Math.max(0, limit));
}

export function buildLiveActivity(
  publications: readonly ActivityPublicationLike[],
  limit = 5,
): LiveActivityItem[] {
  return publications
    .flatMap((publication): LiveActivityItem[] => {
      const createdAt = new Date(publication.createdAt).getTime();
      const repliedAt = publication.lastComment
        ? new Date(publication.lastComment.createdAt).getTime()
        : Number.NaN;
      const hasNewerReply =
        Boolean(publication.lastComment) &&
        Number.isFinite(repliedAt) &&
        repliedAt > createdAt;
      const kind = hasNewerReply
        ? 'reply'
        : publication.format === 'POST'
          ? 'post'
          : 'topic';
      const occurredAt = hasNewerReply
        ? publication.lastComment!.createdAt
        : publication.createdAt;
      const fallback = publication.excerpt?.trim();

      const title = activityTitle(
        publication.title,
        fallback,
      );

      if (!title) return [];

      return [{
        id: `${kind}:${publication.id}:${occurredAt}`,
        kind,
        username: hasNewerReply
          ? publication.lastComment!.author.username
          : publication.author.username,
        title,
        slug: publication.slug,
        communityName: publication.community.name,
        occurredAt,
      }];
    })
    .sort(
      (left, right) =>
        new Date(right.occurredAt).getTime() -
        new Date(left.occurredAt).getTime(),
    )
    .slice(0, Math.max(0, limit));
}

function normalizeActivityCopy(value?: string | null) {
  return value?.replace(/\s+/gu, ' ').trim() ?? '';
}

function activityTitle(
  title: string | null | undefined,
  excerpt: string | null | undefined,
) {
  for (const source of [title, excerpt]) {
    const candidate = normalizeActivityCopy(source);
    const compact = candidate.replace(/[\s\p{P}\p{S}]/gu, '');
    const wordsOnly = candidate
      .replace(/[\p{P}\p{S}]+/gu, ' ')
      .replace(/\s+/gu, ' ')
      .trim();
    const repeatedCharacter = /^(.)\1{4,}$/u.test(compact);
    const genericTestCopy = /^(?:(?:тест|test)\s*)+$/iu.test(wordsOnly);
    const hasLetters = /[\p{L}]/u.test(candidate);

    if (candidate && !repeatedCharacter && !genericTestCopy && hasLetters) {
      return candidate;
    }
  }

  return null;
}

export function safeActivityTitle(
  title: string | null | undefined,
  excerpt: string | null | undefined,
  format: 'POST' | 'TOPIC',
) {
  const candidate = activityTitle(title, excerpt);

  if (!candidate) {
    return format === 'POST'
      ? 'Новая запись без описания'
      : 'Новая тема без описания';
  }

  return candidate;
}

export function topicPulse(
  item: TopicPulseSource,
  now = Date.now(),
): TopicPulse | null {
  const createdAt = Date.parse(item.createdAt);
  const lastActivityAt = Date.parse(
    item.lastActivityAt ?? item.createdAt,
  );

  if (
    !Number.isFinite(createdAt) ||
    !Number.isFinite(lastActivityAt) ||
    now < createdAt
  ) {
    return null;
  }

  const activeAge = now - lastActivityAt;
  const createdAge = now - createdAt;

  if (
    activeAge >= 0 &&
    activeAge <= 6 * 60 * 60 * 1_000 &&
    item.commentCount >= 5
  ) {
    return 'hot';
  }

  if (
    createdAge <= 48 * 60 * 60 * 1_000 &&
    (item.commentCount >= 3 || (item.viewCount ?? 0) >= 100)
  ) {
    return 'rising';
  }

  return null;
}

export function topicSignal(
  item: TopicPulseSource,
  now = Date.now(),
): TopicSignal | null {
  const pulse = topicPulse(item, now);
  if (pulse) {
    return {
      status: pulse,
      label: pulse === 'hot' ? 'Горячо' : 'Набирает',
    };
  }

  if (item.type.toUpperCase() === 'QUESTION') {
    return item.commentCount > 0
      ? { status: 'answered', label: 'Есть ответы' }
      : { status: 'waiting', label: 'Ждёт ответа' };
  }

  return null;
}
