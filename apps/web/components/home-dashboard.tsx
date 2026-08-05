'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  useEffect,
  useMemo,
  useState,
} from 'react';
import { api } from '@/lib/api';
import type { PublicationCardData } from '@/lib/types';

type Community = {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription?: string | null;
  subscriberCount: number;
  publicationCount: number;
  recentPublicationCount?: number;
  lastActivityAt?: string | null;
  isSubscribed?: boolean;
  parent: {
    slug: string;
    name: string;
  } | null;
};

type EventItem = {
  id: string;
  title: string;
  startsAt: string;
  status: string;
  createdAt: string;
  community: {
    slug: string;
    name: string;
  };
};

type PollItem = {
  id: string;
  title: string;
  closesAt: string;
  status: string;
  createdAt: string;
  community: {
    slug: string;
    name: string;
  };
};

type WorkshopItem = {
  id: string;
  title: string;
  description: string;
  status: string;
  type: string;
  createdAt: string;
  author: {
    username: string;
    displayName: string;
  };
};

type FeedMode =
  | 'subscriptions'
  | 'new'
  | 'popular'
  | 'unanswered';

export type HomeInitialData = {
  communities?: Community[];
  events?: EventItem[];
  polls?: PollItem[];
  announcements?: PublicationCardData[];
  workshop?: WorkshopItem[];
  feed?: PublicationCardData[];
};

const feedTabs: Array<{
  key: FeedMode;
  label: string;
}> = [
  { key: 'subscriptions', label: 'По подпискам' },
  { key: 'new', label: 'Новое' },
  { key: 'popular', label: 'Популярное' },
  { key: 'unanswered', label: 'Без ответа' },
];

const formatNumber = (value: number) =>
  new Intl.NumberFormat('ru-RU').format(value);

function relativeDate(value: string) {
  const time = new Date(value).getTime();

  if (!Number.isFinite(time)) return '';

  const difference = Date.now() - time;

  if (difference < 60_000) return 'только что';

  const minutes = Math.floor(difference / 60_000);
  if (minutes < 60) return `${minutes} мин. назад`;

  const hours = Math.floor(difference / 3_600_000);
  if (hours < 24) return `${hours} ч. назад`;

  const days = Math.floor(difference / 86_400_000);
  if (days < 14) return `${days} дн. назад`;

  return new Date(value).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
  });
}

function shortDate(value: string) {
  return new Date(value).toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function typeLabel(type: string) {
  const names: Record<string, string> = {
    GIFT: 'Подарок',
    REACTION: 'Реакция',
    BADGE: 'Значок',
    PROFILE_DECOR: 'Профиль',
    COMMUNITY_DECOR: 'Сообщество',
  };

  return names[type] ?? type;
}

function TopicSkeleton() {
  return (
    <div
      className="home-topic-row home-topic-skeleton"
      aria-hidden="true"
    >
      <span className="skeleton-dot" />
      <div>
        <span className="skeleton-line short" />
        <span className="skeleton-line long" />
        <span className="skeleton-line medium" />
      </div>
      <span className="skeleton-line medium" />
      <span className="skeleton-line short" />
      <span className="skeleton-line short" />
    </div>
  );
}

export function HomeDashboard({
  initialData = {},
}: {
  initialData?: HomeInitialData;
}) {
  const [communities, setCommunities] = useState<
    Community[]
  >(initialData.communities ?? []);
  const [events, setEvents] = useState<EventItem[]>(
    initialData.events ?? [],
  );
  const [polls, setPolls] = useState<PollItem[]>(
    initialData.polls ?? [],
  );
  const [announcements, setAnnouncements] = useState<
    PublicationCardData[]
  >(initialData.announcements ?? []);
  const [workshop, setWorkshop] = useState<
    WorkshopItem[]
  >(initialData.workshop ?? []);
  const [feed, setFeed] = useState<
    PublicationCardData[]
  >(initialData.feed ?? []);

  const [mode, setMode] = useState<FeedMode>('new');
  const [feedRequestVersion, setFeedRequestVersion] =
    useState(0);
  const [feedLoading, setFeedLoading] = useState(
    initialData.feed === undefined,
  );
  const [pageLoading, setPageLoading] = useState(
    [
      initialData.communities,
      initialData.events,
      initialData.polls,
      initialData.announcements,
      initialData.workshop,
    ].some((value) => value === undefined),
  );
  const [feedError, setFeedError] = useState('');
  const [pageError, setPageError] = useState('');

  const pageSeeded = [
    initialData.communities,
    initialData.events,
    initialData.polls,
    initialData.announcements,
    initialData.workshop,
  ].every((value) => value !== undefined);

  const feedSeeded = initialData.feed !== undefined;

  useEffect(() => {
    if (pageSeeded) return;

    let cancelled = false;

    async function loadPage() {
      setPageLoading(true);

      const results = await Promise.allSettled([
        api<Community[]>('/communities'),
        api<EventItem[]>('/events'),
        api<PollItem[]>('/governance/polls'),
        api<PublicationCardData[]>('/announcements'),
        api<WorkshopItem[]>('/workshop'),
      ]);

      if (cancelled) return;

      const [
        communityResult,
        eventResult,
        pollResult,
        announcementResult,
        workshopResult,
      ] = results;

      if (communityResult.status === 'fulfilled') {
        setCommunities(communityResult.value);
      } else {
        setPageError(
          communityResult.reason instanceof Error
            ? communityResult.reason.message
            : 'Не удалось загрузить структуру FORRUM',
        );
      }

      if (eventResult.status === 'fulfilled') {
        setEvents(eventResult.value);
      }

      if (pollResult.status === 'fulfilled') {
        setPolls(pollResult.value);
      }

      if (announcementResult.status === 'fulfilled') {
        setAnnouncements(announcementResult.value);
      }

      if (workshopResult.status === 'fulfilled') {
        setWorkshop(workshopResult.value);
      }

      setPageLoading(false);
    }

    void loadPage();

    return () => {
      cancelled = true;
    };
  }, [pageSeeded]);

  useEffect(() => {
    if (
      mode === 'new' &&
      feedSeeded &&
      feedRequestVersion === 0
    ) {
      setFeedLoading(false);
      return;
    }

    let cancelled = false;

    async function loadFeed() {
      setFeedLoading(true);
      setFeedError('');

      const apiMode =
        mode === 'unanswered' ? 'all' : mode;

      try {
        const items = await api<PublicationCardData[]>(
          `/feed?mode=${encodeURIComponent(apiMode)}`,
        );

        if (cancelled) return;

        setFeed(
          mode === 'unanswered'
            ? items.filter(
                (item) => item.commentCount === 0,
              )
            : items,
        );
      } catch (cause) {
        if (cancelled) return;

        setFeed([]);
        setFeedError(
          cause instanceof Error
            ? cause.message
            : 'Не удалось загрузить обсуждения',
        );
      } finally {
        if (!cancelled) setFeedLoading(false);
      }
    }

    void loadFeed();

    return () => {
      cancelled = true;
    };
  }, [feedRequestVersion, feedSeeded, mode]);

  const childrenByParent = useMemo(() => {
    const map = new Map<string, Community[]>();

    for (const community of communities) {
      if (!community.parent) continue;

      map.set(community.parent.slug, [
        ...(map.get(community.parent.slug) ?? []),
        community,
      ]);
    }

    return map;
  }, [communities]);

  const rootCommunities = useMemo(
    () =>
      communities
        .filter((community) => !community.parent)
        .sort(
          (left, right) =>
            (right.recentPublicationCount ?? 0) -
              (left.recentPublicationCount ?? 0) ||
            right.publicationCount -
              left.publicationCount,
        )
        .slice(0, 7),
    [communities],
  );

  const newCommunities = useMemo(
    () =>
      [...communities]
        .filter((community) => !community.parent)
        .sort(
          (left, right) =>
            (right.recentPublicationCount ?? 0) -
              (left.recentPublicationCount ?? 0) ||
            right.subscriberCount -
              left.subscriberCount,
        )
        .slice(0, 3),
    [communities],
  );

  const workshopItems = useMemo(
    () =>
      workshop
        .filter((item) => item.status === 'PUBLISHED')
        .slice(0, 3),
    [workshop],
  );

  const currentItems = useMemo(() => {
    const now = Date.now();

    const upcoming = events
      .filter(
        (item) =>
          item.status === 'PUBLISHED' &&
          new Date(item.startsAt).getTime() > now,
      )
      .slice(0, 2)
      .map((item) => ({
        id: `event-${item.id}`,
        kind: 'Событие',
        title: item.title,
        meta: `${item.community.name} · ${shortDate(
          item.startsAt,
        )}`,
        href: `/events/${item.id}`,
      }));

    const openPolls = polls
      .filter((item) => item.status === 'OPEN')
      .slice(0, 2)
      .map((item) => ({
        id: `poll-${item.id}`,
        kind: 'Голосование',
        title: item.title,
        meta: `${item.community.name} · до ${shortDate(
          item.closesAt,
        )}`,
        href: '/events',
      }));

    const latestAnnouncements = announcements
      .slice(0, 2)
      .map((item) => ({
        id: `announcement-${item.id}`,
        kind: 'Объявление',
        title:
          item.title ||
          item.excerpt.slice(0, 90) ||
          'Объявление FORRUM',
        meta: `${item.community.name} · ${shortDate(
          item.lastActivityAt ?? item.createdAt,
        )}`,
        href: `/p/${item.slug}`,
      }));

    return [
      ...upcoming,
      ...openPolls,
      ...latestAnnouncements,
    ].slice(0, 4);
  }, [announcements, events, polls]);

  function renderChildren(
    parentSlug: string,
    depth = 0,
  ): ReactNode {
    const children = (
      childrenByParent.get(parentSlug) ?? []
    )
      .slice()
      .sort((left, right) =>
        left.name.localeCompare(right.name, 'ru'),
      )
      .slice(0, 6);

    if (!children.length || depth > 1) return null;

    return (
      <ul>
        {children.map((child) => (
          <li key={child.id}>
            <Link
              href={`/communities/${child.slug}`}
            >
              {child.name}
            </Link>
            {renderChildren(child.slug, depth + 1)}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="home-board">
      <section className="home-titlebar">
        <h1>Главная</h1>
        <Link className="button" href="/create">
          <span aria-hidden="true">＋</span>
          Создать тему
        </Link>
      </section>

      {pageError && (
        <div className="error-box">{pageError}</div>
      )}

      <div className="home-layout">
        <aside
          className="home-community-tree"
          aria-label="Категории и сообщества"
        >
          {pageLoading ? (
            <div
              className="home-tree-skeleton"
              aria-label="Загружаем структуру"
            >
              {Array.from({ length: 7 }).map(
                (_, index) => (
                  <span key={index} />
                ),
              )}
            </div>
          ) : (
            <>
              {rootCommunities.map(
                (community, index) => (
                  <details
                    key={community.id}
                    open={index < 3}
                  >
                    <summary>
                      <span className="home-tree-symbol">
                        {community.name.slice(0, 1)}
                      </span>
                      <strong>{community.name}</strong>
                      <span aria-hidden="true">⌄</span>
                    </summary>
                    {renderChildren(community.slug)}
                  </details>
                ),
              )}

              {!rootCommunities.length && (
                <p className="muted small-text">
                  Категории появятся после создания
                  первых сообществ.
                </p>
              )}

              <Link
                className="home-panel-footer"
                href="/communities"
              >
                Все категории
                <span aria-hidden="true">→</span>
              </Link>
            </>
          )}
        </aside>

        <main className="home-discussion-panel">
          <header className="home-panel-heading">
            <h2>Лента обсуждений</h2>
          </header>

          <div
            className="home-feed-tabs"
            role="tablist"
            aria-label="Режим ленты"
          >
            {feedTabs.map((tab) => (
              <button
                type="button"
                role="tab"
                aria-selected={mode === tab.key}
                className={
                  mode === tab.key ? 'active' : ''
                }
                key={tab.key}
                onClick={() => setMode(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="home-feed-table">
            <div
              className="home-feed-head"
              aria-hidden="true"
            >
              <span>Тема</span>
              <span>Автор</span>
              <span>Ответы</span>
              <span>Просмотры</span>
            </div>

            {feedLoading ? (
              Array.from({ length: 8 }).map(
                (_, index) => (
                  <TopicSkeleton key={index} />
                ),
              )
            ) : feedError ? (
              <div className="home-feed-status error">
                <strong>
                  Не удалось загрузить ленту
                </strong>
                <span>{feedError}</span>
                <button
                  type="button"
                  className="button ghost small"
                  onClick={() =>
                    setFeedRequestVersion(
                      (current) => current + 1,
                    )
                  }
                >
                  Повторить
                </button>
              </div>
            ) : feed.length ? (
              feed.slice(0, 10).map((item) => (
                <article
                  className="home-topic-row"
                  key={item.id}
                >
                  <span
                    className="home-topic-icon"
                    aria-hidden="true"
                  >
                    {item.type === 'QUESTION'
                      ? '?'
                      : item.format === 'TOPIC'
                        ? '●'
                        : '○'}
                  </span>

                  <div className="home-topic-copy">
                    <div className="home-topic-path">
                      <Link
                        href={`/communities/${item.community.slug}`}
                      >
                        {item.community.name}
                      </Link>
                      {item.tags.slice(0, 2).map((tag) => (
                        <span key={tag.id}>
                          › {tag.label}
                        </span>
                      ))}
                    </div>

                    <Link
                      className="home-topic-title"
                      href={`/p/${item.slug}`}
                    >
                      {item.title ||
                        item.excerpt.slice(0, 100)}
                    </Link>

                    <p>{item.excerpt}</p>
                  </div>

                  <div className="home-topic-author">
                    <Link
                      href={`/u/${item.author.username}`}
                    >
                      {item.author.displayName}
                    </Link>
                    <span>
                      {relativeDate(
                        item.lastActivityAt ||
                          item.createdAt,
                      )}
                    </span>
                  </div>

                  <strong className="home-topic-count">
                    {formatNumber(item.commentCount)}
                  </strong>

                  <strong className="home-topic-count">
                    {formatNumber(item.viewCount ?? 0)}
                  </strong>
                </article>
              ))
            ) : (
              <div className="home-feed-status">
                <strong>
                  В этой вкладке пока пусто
                </strong>
                <span>
                  Выберите другой режим или создайте
                  первую тему.
                </span>
              </div>
            )}
          </div>

          <Link
            className="home-panel-footer"
            href="/search"
          >
            Перейти ко всем обсуждениям
            <span aria-hidden="true">→</span>
          </Link>
        </main>

        <aside className="home-current-panel">
          <header className="home-panel-heading">
            <h2>Актуальное</h2>
          </header>

          <div className="home-current-list">
            {pageLoading
              ? Array.from({ length: 4 }).map(
                  (_, index) => (
                    <div
                      className="home-current-skeleton"
                      key={index}
                    >
                      <span />
                      <div>
                        <i />
                        <i />
                        <i />
                      </div>
                    </div>
                  ),
                )
              : currentItems.map((item) => (
                  <Link
                    href={item.href}
                    className="home-current-item"
                    key={item.id}
                  >
                    <span className="home-current-icon">
                      {item.kind === 'Событие'
                        ? '□'
                        : item.kind === 'Голосование'
                          ? '▥'
                          : '◁'}
                    </span>

                    <span>
                      <small>{item.kind}</small>
                      <strong>{item.title}</strong>
                      <em>{item.meta}</em>
                    </span>
                  </Link>
                ))}

            {!pageLoading && !currentItems.length && (
              <div className="home-current-empty">
                Новых событий и объявлений пока нет.
              </div>
            )}
          </div>

          <Link
            className="home-panel-footer"
            href="/events"
          >
            Перейти ко всему актуальному
            <span aria-hidden="true">→</span>
          </Link>
        </aside>
      </div>

      <div className="home-lower-grid">
        <section className="home-list-panel">
          <header className="home-panel-heading">
            <h2>Новое в Мастерской</h2>
            <Link href="/workshop">
              Перейти в Мастерскую
            </Link>
          </header>

          <div className="home-simple-list">
            {workshopItems.map((item) => (
              <Link href="/workshop" key={item.id}>
                <span className="home-list-icon">
                  □
                </span>
                <span>
                  <strong>{item.title}</strong>
                  <small>
                    {typeLabel(item.type)} · @
                    {item.author.username}
                  </small>
                </span>
                <em>
                  {relativeDate(item.createdAt)}
                </em>
              </Link>
            ))}

            {!pageLoading && !workshopItems.length && (
              <div className="home-list-empty">
                Новых опубликованных работ пока нет.
              </div>
            )}
          </div>

          <Link
            className="home-panel-footer"
            href="/workshop"
          >
            Смотреть все новинки
            <span aria-hidden="true">→</span>
          </Link>
        </section>

        <section className="home-list-panel">
          <header className="home-panel-heading">
            <h2>Новые сообщества</h2>
            <Link href="/communities">
              Все сообщества
            </Link>
          </header>

          <div className="home-simple-list">
            {newCommunities.map((community) => (
              <Link
                href={`/communities/${community.slug}`}
                key={community.id}
              >
                <span className="home-list-icon">
                  ○
                </span>
                <span>
                  <strong>{community.name}</strong>
                  <small>
                    {community.shortDescription ||
                      community.description}
                  </small>
                </span>
                <em>
                  {formatNumber(
                    community.subscriberCount,
                  )}{' '}
                  участников
                </em>
              </Link>
            ))}

            {!pageLoading && !newCommunities.length && (
              <div className="home-list-empty">
                Новых сообществ пока нет.
              </div>
            )}
          </div>

          <Link
            className="home-panel-footer"
            href="/communities"
          >
            Перейти ко всем сообществам
            <span aria-hidden="true">→</span>
          </Link>
        </section>
      </div>
    </div>
  );
}
