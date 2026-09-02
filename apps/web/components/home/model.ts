import { isStreamStart } from './utils';

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
