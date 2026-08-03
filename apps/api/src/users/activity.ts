export type PublicActivityCategory = 'content' | 'saved' | 'subscriptions';
export type ActivityMetadata = Record<string, unknown> | null | undefined;

function text(metadata: ActivityMetadata, key: string) {
  const value = metadata?.[key];
  return typeof value === 'string' && value.trim() ? value.trim() : null;
}

export const publicActivityActions = [
  'publication.create', 'publication.update', 'publication.delete', 'publication.comment',
  'publication.bookmark', 'publication.unbookmark',
  'community.subscribe', 'community.unsubscribe', 'user.follow', 'user.unfollow',
  'tag.subscribe', 'tag.unsubscribe',
] as const;

export function describeActivity(action: string, metadata: ActivityMetadata) {
  const publicationTitle = text(metadata, 'title') || 'публикацию';
  const publicationSlug = text(metadata, 'slug');
  const communityName = text(metadata, 'communityName') || 'сообщество';
  const communitySlug = text(metadata, 'communitySlug');
  const userName = text(metadata, 'displayName') || (text(metadata, 'username') ? `@${text(metadata, 'username')}` : 'автора');
  const username = text(metadata, 'username');
  const tagLabel = text(metadata, 'label') || text(metadata, 'tag') || 'хэштег';
  const tagSlug = text(metadata, 'tagSlug') || text(metadata, 'slug');
  const map: Record<string, { category: PublicActivityCategory; title: string; detail: string; href: string | null }> = {
    'publication.create': { category: 'content', title: 'Создана публикация', detail: publicationTitle, href: publicationSlug ? `/p/${publicationSlug}` : null },
    'publication.update': { category: 'content', title: 'Обновлена публикация', detail: publicationTitle, href: publicationSlug ? `/p/${publicationSlug}` : null },
    'publication.delete': { category: 'content', title: 'Удалена публикация', detail: publicationTitle, href: null },
    'publication.comment': { category: 'content', title: 'Оставлен ответ', detail: publicationTitle, href: publicationSlug ? `/p/${publicationSlug}` : null },
    'publication.bookmark': { category: 'saved', title: 'Добавлено в сохранённое', detail: publicationTitle, href: publicationSlug ? `/p/${publicationSlug}` : null },
    'publication.unbookmark': { category: 'saved', title: 'Удалено из сохранённого', detail: publicationTitle, href: publicationSlug ? `/p/${publicationSlug}` : null },
    'community.subscribe': { category: 'subscriptions', title: 'Подписка на сообщество', detail: communityName, href: communitySlug ? `/communities/${communitySlug}` : null },
    'community.unsubscribe': { category: 'subscriptions', title: 'Отписка от сообщества', detail: communityName, href: communitySlug ? `/communities/${communitySlug}` : null },
    'user.follow': { category: 'subscriptions', title: 'Подписка на автора', detail: userName, href: username ? `/u/${username}` : null },
    'user.unfollow': { category: 'subscriptions', title: 'Отписка от автора', detail: userName, href: username ? `/u/${username}` : null },
    'tag.subscribe': { category: 'subscriptions', title: 'Подписка на хэштег', detail: `#${tagLabel}`, href: tagSlug ? `/tags/${tagSlug}` : null },
    'tag.unsubscribe': { category: 'subscriptions', title: 'Отписка от хэштега', detail: `#${tagLabel}`, href: tagSlug ? `/tags/${tagSlug}` : null },
  };
  return map[action] ?? null;
}
