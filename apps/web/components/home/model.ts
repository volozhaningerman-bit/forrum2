import { isStreamStart } from './utils';
import type { TopicPulse, TopicStatus } from './types';

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
    .map((publication): LiveActivityItem => {
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

      return {
        id: `${kind}:${publication.id}:${occurredAt}`,
        kind,
        username: hasNewerReply
          ? publication.lastComment!.author.username
          : publication.author.username,
        title: safeActivityTitle(
          publication.title,
          fallback,
          publication.format,
        ),
        slug: publication.slug,
        communityName: publication.community.name,
        occurredAt,
      };
    })
    .sort(
      (left, right) =>
        new Date(right.occurredAt).getTime() -
        new Date(left.occurredAt).getTime(),
    )
    .slice(0, Math.max(0, limit));
}

export function safeActivityTitle(
  title: string | null | undefined,
  excerpt: string | null | undefined,
  format: 'POST' | 'TOPIC',
) {
  const normalize = (value?: string | null) =>
    value?.replace(/\s+/gu, ' ').trim() ?? '';
  const candidate = normalize(title) || normalize(excerpt);
  const compact = candidate.replace(/\s/gu, '');
  const repeatedCharacter = /^(.)\1{4,}$/u.test(compact);
  const hasLetters = /[\p{L}]/u.test(candidate);

  if (!candidate || repeatedCharacter || !hasLetters) {
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

export function topicStatus(
  item: TopicPulseSource,
  now = Date.now(),
): TopicStatus {
  const pulse = topicPulse(item, now);
  if (pulse) return pulse;

  if (item.type.toUpperCase() === 'QUESTION') {
    return item.commentCount > 0 ? 'answered' : 'waiting';
  }

  return item.commentCount > 0 ? 'active' : 'open';
}
