'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type {
  CSSProperties,
  KeyboardEvent,
  ReactNode,
} from 'react';
import { useEffect, useMemo, useState } from 'react';
import { api } from '@/lib/api';
import type { PublicationCardData } from '@/lib/types';
import { Avatar } from '@/components/avatar';

type Community = {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription?: string | null;
  avatarUrl?: string | null;
  coverUrl?: string | null;
  subscriberCount: number;
  publicationCount: number;
  recentPublicationCount?: number;
  lastActivityAt?: string | null;
  isSubscribed?: boolean;
  parent: { slug: string; name: string } | null;
};

type EventItem = {
  id: string;
  title: string;
  startsAt: string;
  status: string;
  community: { slug: string; name: string };
};

type PollItem = {
  id: string;
  title: string;
  closesAt: string;
  status: string;
  community: { slug: string; name: string };
};

type WorkshopItem = {
  id: string;
  title: string;
  description: string;
  status: string;
  type: string;
  createdAt: string;
  author: { username: string; displayName: string };
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

const feedTabs: Array<{ key: FeedMode; label: string }> = [
  { key: 'subscriptions', label: 'По подпискам' },
  { key: 'new', label: 'Новое' },
  { key: 'popular', label: 'Популярное' },
  { key: 'unanswered', label: 'Без ответа' },
];

// FORRUM_HOME_TREE_REFERENCE_V9_2_4
const workshopNavigation = [
  { label: 'Проекты и заказы', href: '/workshop?section=projects' },
  { label: 'Готовые решения', href: '/workshop?section=solutions' },
  { label: 'Команды и специалисты', href: '/workshop?section=teams' },
] as const;

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

function topicVisual(slug: string) {
  return topicVisuals[slug] ?? '/forrum-assets/topic-default.svg';
}


const topicTypeLabels: Record<string, string> = {
  DISCUSSION: 'Обсуждение',
  QUESTION: 'Вопрос',
  NEWS: 'Новость',
  GUIDE: 'Гайд',
  PROJECT: 'Проект',
  SERVICE: 'Услуга',
  CASE: 'Кейс',
  ANNOUNCEMENT: 'Объявление',
};

const topicTypeSymbols: Record<string, string> = {
  DISCUSSION: '↔',
  QUESTION: '?',
  NEWS: 'N',
  GUIDE: 'G',
  PROJECT: 'P',
  SERVICE: 'S',
  CASE: 'C',
  ANNOUNCEMENT: '!',
};

const workshopTypeSymbols: Record<string, string> = {
  GIFT: 'G',
  REACTION: 'R',
  BADGE: 'B',
  PROFILE_DECOR: 'P',
  COMMUNITY_DECOR: 'C',
};

function nameTone(username: string) {
  let value = 0;
  for (const character of username) {
    value = (value * 31 + character.charCodeAt(0)) % 10;
  }
  return value;
}

function isCurrentDay(value: string) {
  const date = new Date(value);
  const now = new Date();
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
}

function deadlineState(value: string, kind: 'event' | 'poll') {
  const time = new Date(value).getTime();
  const difference = time - Date.now();
  if (!Number.isFinite(time)) return '';
  if (kind === 'event' && isCurrentDay(value)) return 'сегодня';
  if (kind === 'poll' && difference > 0 && difference <= 86_400_000) {
    return 'заканчивается';
  }
  return '';
}

function CategoryTreeIcon({
  slug,
  depth,
  expandable,
}: {
  slug: string;
  depth: number;
  expandable: boolean;
}) {
  if (depth > 0) {
    return (
      <span
        className={expandable ? 'home-tree-branch-mark' : 'home-tree-leaf-mark'}
        aria-hidden="true"
      >
        {expandable ? '▾' : '−'}
      </span>
    );
  }

  if (slug.includes('promotion') || slug.includes('seo')) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 13h3l8 4V7l-8 4H4v2Z" />
        <path d="M7 13l1.5 5M18 9.5c1 .8 1.5 1.6 1.5 2.5S19 13.7 18 14.5" />
      </svg>
    );
  }

  if (slug.includes('telegram')) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m3 11 17-7-5 16-4-6-8-3Z" />
        <path d="m11 14 4-4" />
      </svg>
    );
  }

  if (slug.includes('gta') || slug.includes('game')) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 9h10a4 4 0 0 1 3.7 5.5l-1 2.5a2 2 0 0 1-3.2.8L14.5 16h-5l-2 1.8a2 2 0 0 1-3.2-.8l-1-2.5A4 4 0 0 1 7 9Z" />
        <path d="M8 12v3M6.5 13.5h3M16.5 12.5h.01M18 14h.01" />
      </svg>
    );
  }

  if (slug.includes('forrum')) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 5h14v10H9l-4 4V5Z" />
        <path d="M8 9h8M8 12h5" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m8 5-5 7 5 7M16 5l5 7-5 7M14 3l-4 18" />
    </svg>
  );
}

function TopicTypeMark({ type }: { type: string }) {
  return (
    <span
      className="home-topic-type-mark"
      title={topicTypeLabels[type] ?? type}
      aria-label={topicTypeLabels[type] ?? type}
    >
      {topicTypeSymbols[type] ?? '•'}
    </span>
  );
}

function CurrentTypeIcon({ kind }: { kind: 'event' | 'poll' | 'notice' }) {
  if (kind === 'event') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 3v3M18 3v3M4 8h16M5 5h14a1 1 0 0 1 1 1v13H4V6a1 1 0 0 1 1-1Z" />
      </svg>
    );
  }
  if (kind === 'poll') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 19V9M12 19V5M19 19v-7" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 18h14M7 18V9l5-4 5 4v9M10 12h4" />
    </svg>
  );
}

function treeKeyboard(
  event: KeyboardEvent<HTMLButtonElement>,
  open: boolean,
  toggleOpen: () => void,
) {
  if (
    event.key === 'Enter' ||
    event.key === ' ' ||
    (event.key === 'ArrowRight' && !open) ||
    (event.key === 'ArrowLeft' && open)
  ) {
    event.preventDefault();
    toggleOpen();
  }
}

function TopicSkeleton() {
  return (
    <div className="home-topic-row home-topic-skeleton" aria-hidden="true">
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
  const pathname = usePathname();
  const [communities, setCommunities] = useState<Community[]>(
    initialData.communities ?? [],
  );
  const [events, setEvents] = useState<EventItem[]>(
    initialData.events ?? [],
  );
  const [polls, setPolls] = useState<PollItem[]>(
    initialData.polls ?? [],
  );
  const [announcements, setAnnouncements] = useState<
    PublicationCardData[]
  >(initialData.announcements ?? []);
  const [workshop, setWorkshop] = useState<WorkshopItem[]>(
    initialData.workshop ?? [],
  );
  const [feed, setFeed] = useState<PublicationCardData[]>(
    initialData.feed ?? [],
  );
  const [mode, setMode] = useState<FeedMode>('new');
  const [expanded, setExpanded] = useState<Set<string>>(
    () => new Set(['internet-projects']),
  );
  const [workshopOpen, setWorkshopOpen] = useState(true);
  const [feedRequestVersion, setFeedRequestVersion] = useState(0);
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

      const [communityResult, eventResult, pollResult, announcementResult, workshopResult] =
        results;

      if (communityResult.status === 'fulfilled') {
        setCommunities(communityResult.value);
      } else {
        setPageError(
          communityResult.reason instanceof Error
            ? communityResult.reason.message
            : 'Не удалось загрузить структуру FORRUM',
        );
      }
      if (eventResult.status === 'fulfilled') setEvents(eventResult.value);
      if (pollResult.status === 'fulfilled') setPolls(pollResult.value);
      if (announcementResult.status === 'fulfilled') {
        setAnnouncements(announcementResult.value);
      }
      if (workshopResult.status === 'fulfilled') setWorkshop(workshopResult.value);
      setPageLoading(false);
    }

    void loadPage();
    return () => {
      cancelled = true;
    };
  }, [pageSeeded]);

  useEffect(() => {
    if (mode === 'new' && feedSeeded && feedRequestVersion === 0) {
      setFeedLoading(false);
      return;
    }
    let cancelled = false;

    async function loadFeed() {
      setFeedLoading(true);
      setFeedError('');
      try {
        const apiMode = mode === 'unanswered' ? 'new' : mode;
        const items = await api<PublicationCardData[]>(
          `/feed?mode=${encodeURIComponent(apiMode)}`,
        );
        if (cancelled) return;
        setFeed(
          mode === 'unanswered'
            ? items.filter((item) => item.commentCount === 0)
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
        .sort((left, right) => left.name.localeCompare(right.name, 'ru')),
    [communities],
  );

  const newCommunities = useMemo(
    () =>
      [...rootCommunities]
        .sort(
          (left, right) =>
            (right.recentPublicationCount ?? 0) -
              (left.recentPublicationCount ?? 0) ||
            right.subscriberCount - left.subscriberCount,
        )
        .slice(0, 4),
    [rootCommunities],
  );

  const workshopItems = useMemo(
    () => workshop.filter((item) => item.status === 'PUBLISHED').slice(0, 4),
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
        kindKey: 'event' as const,
        title: item.title,
        meta: `${item.community.name} · ${shortDate(item.startsAt)}`,
        state: deadlineState(item.startsAt, 'event'),
        href: `/events/${item.id}`,
      }));
    const openPolls = polls
      .filter((item) => item.status === 'OPEN')
      .slice(0, 2)
      .map((item) => ({
        id: `poll-${item.id}`,
        kind: 'Голосование',
        kindKey: 'poll' as const,
        title: item.title,
        meta: `${item.community.name} · до ${shortDate(item.closesAt)}`,
        state: deadlineState(item.closesAt, 'poll'),
        href: '/events?tab=polls',
      }));
    const latestAnnouncements = announcements.slice(0, 2).map((item) => ({
      id: `announcement-${item.id}`,
      kind: 'Объявление',
      kindKey: 'notice' as const,
      title: item.title || item.excerpt.slice(0, 90) || 'Объявление FORRUM',
      meta: `${item.community.name} · ${shortDate(
        item.lastActivityAt ?? item.createdAt,
      )}`,
      state:
        item.pinnedUntil && new Date(item.pinnedUntil).getTime() > now
          ? 'важно'
          : '',
      href: `/p/${item.slug}`,
    }));
    return [...upcoming, ...openPolls, ...latestAnnouncements].slice(0, 5);
  }, [announcements, events, polls]);

  function toggle(slug: string) {
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  }

  function renderTree(community: Community, depth = 0): ReactNode {
    const children = (childrenByParent.get(community.slug) ?? [])
      .slice()
      .sort((left, right) => left.name.localeCompare(right.name, 'ru'));
    const expandable = children.length > 0;
    const open = expanded.has(community.slug);
    const active = pathname === `/communities/${community.slug}`;
    const toggleCurrent = () => toggle(community.slug);

    return (
      <div
        className="home-tree-node"
        key={community.id}
        style={{ '--tree-depth': Math.min(depth, 3) } as CSSProperties}
      >
        <div
          className={`home-tree-row ${expandable ? 'expandable' : 'leaf' } ${
            open ? 'opened' : 'closed'
          } ${active ? 'active' : ''}`}
        >
          {expandable && (
            <button
              type="button"
              className="home-tree-expand-surface"
              aria-label={
                open
                  ? `Свернуть подразделы ${community.name}`
                  : `Показать подразделы ${community.name}`
              }
              aria-expanded={open}
              onClick={toggleCurrent}
              onKeyDown={(event) =>
                treeKeyboard(event, open, toggleCurrent)
              }
            >
              <span className="visually-hidden">
                {open ? 'Свернуть' : 'Развернуть'}
              </span>
            </button>
          )}

          <span className="home-tree-reference-icon" aria-hidden="true">
            <CategoryTreeIcon
              slug={community.slug}
              depth={depth}
              expandable={expandable}
            />
          </span>

          <Link
            className="home-tree-name-link"
            href={`/communities/${community.slug}`}
            aria-current={active ? 'page' : undefined}
          >
            {community.name}
          </Link>

          {expandable && (
            <span className="home-tree-reference-chevron" aria-hidden="true">
              <svg viewBox="0 0 16 16">
                <path d="m4 6 4 4 4-4" />
              </svg>
            </span>
          )}
        </div>
        {expandable && open && (
          <div className="home-tree-children">
            {children.map((child) => renderTree(child, depth + 1))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="home-board home-stage-one">
      <h1 className="visually-hidden">Главная</h1>

      {pageError && <div className="error-box">{pageError}</div>}

      <div className="home-layout">
        <aside className="home-community-tree" aria-label="Категории и подразделы">
          <div className="home-tree-section home-tree-workshop-section">
            <div className={`home-workshop-node ${workshopOpen ? 'opened' : 'closed'}`}>
              <div className="home-workshop-row">
                <button
                  type="button"
                  className="home-workshop-expand-surface"
                  aria-label={workshopOpen ? 'Свернуть Мастерскую' : 'Развернуть Мастерскую'}
                  aria-expanded={workshopOpen}
                  onClick={() => setWorkshopOpen((current) => !current)}
                  onKeyDown={(event) =>
                    treeKeyboard(event, workshopOpen, () =>
                      setWorkshopOpen((current) => !current),
                    )
                  }
                >
                  <span className="visually-hidden">
                    {workshopOpen ? 'Свернуть' : 'Развернуть'}
                  </span>
                </button>
                <span className="home-workshop-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="m14 6 4-4 4 4-4 4M10 18l-4 4-4-4 4-4" />
                    <path d="m8 8 8 8M5 5l14 14" />
                  </svg>
                </span>
                <Link className="home-workshop-name-link" href="/workshop">
                  Мастерская
                </Link>
                <span className="home-workshop-chevron" aria-hidden="true">
                  <svg viewBox="0 0 16 16"><path d="m4 6 4 4 4-4" /></svg>
                </span>
              </div>
              {workshopOpen && (
                <div className="home-workshop-children">
                  {workshopNavigation.map((item) => (
                    <Link href={item.href} key={item.label}>
                      <span aria-hidden="true">−</span>
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="home-tree-separator" aria-hidden="true" />

          <div className="home-tree-section home-tree-categories-section">
            {pageLoading ? (
              <div className="home-tree-skeleton" aria-label="Загружаем структуру">
                {Array.from({ length: 7 }).map((_, index) => (
                  <span key={index} />
                ))}
              </div>
            ) : (
              <>
                {rootCommunities.map((community) => renderTree(community))}
                {!rootCommunities.length && (
                  <p className="muted small-text">
                    Категории появятся после создания первых сообществ.
                  </p>
                )}
              </>
            )}
          </div>

          <Link className="home-tree-all-link" href="/communities">
            Все категории <span aria-hidden="true">→</span>
          </Link>
        </aside>

        <main className="home-discussion-panel">
          <header className="home-feed-toolbar">
            <div className="home-feed-title">
              <h2>Лента обсуждений</h2>
              {!feedLoading && mode === 'new' && feed.length > 0 && (
                <span className="home-new-feed-count">
                  {feed.length > 99 ? '99+' : feed.length} новых
                </span>
              )}
            </div>
            <div className="home-feed-actions">
              <Link className="home-filter-button" href="/search" aria-label="Открыть фильтры обсуждений">
                <span aria-hidden="true">≡</span>
                Фильтры
              </Link>
              <Link className="button home-create-topic" href="/create">
                <span aria-hidden="true">＋</span>
                <span className="home-create-topic-label">Создать тему</span>
              </Link>
            </div>
          </header>

          <div className="home-feed-tabs" role="tablist" aria-label="Режим ленты">
            {feedTabs.map((tab) => (
              <button
                type="button"
                role="tab"
                aria-selected={mode === tab.key}
                className={mode === tab.key ? 'active' : ''}
                key={tab.key}
                onClick={() => setMode(tab.key)}
              >
                {tab.label}
                {tab.key === 'new' && mode === 'new' && !feedLoading && feed.length > 0 && (
                  <span className="home-tab-count" aria-label={`${feed.length} новых тем`}>
                    {feed.length > 99 ? '99+' : feed.length}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="home-feed-table">
            <div className="home-feed-head" aria-hidden="true">
              <span>Тема</span>
              <span>Автор</span>
              <span>Ответы</span>
              <span>Просмотры</span>
              <span />
            </div>
            {feedLoading ? (
              Array.from({ length: 8 }).map((_, index) => (
                <TopicSkeleton key={index} />
              ))
            ) : feedError ? (
              <div className="home-feed-status error">
                <strong>Не удалось загрузить ленту</strong>
                <span>{feedError}</span>
                <button
                  type="button"
                  className="button ghost small"
                  onClick={() => setFeedRequestVersion((current) => current + 1)}
                >
                  Повторить
                </button>
              </div>
            ) : feed.length ? (
              feed.slice(0, 12).map((item, index) => {
                const pinned = Boolean(
                  item.pinnedUntil &&
                    new Date(item.pinnedUntil).getTime() > Date.now(),
                );
                const unread = (item.recentCommentCount ?? 0) > 0;
                const hot = (item.recentCommentCount ?? 0) >= 3 || item.commentCount >= 25;
                const answered = item.type === 'QUESTION' && item.commentCount > 0;
                const showCover =
                  item.type === 'NEWS' ||
                  item.type === 'GUIDE' ||
                  item.type === 'PROJECT' ||
                  index < 2;

                return (
                  <article
                    className={`home-topic-row ${
                      item.format === 'TOPIC' ? 'home-topic-permanent' : ''
                    } ${unread ? 'home-topic-unread' : ''}`}
                    data-community={item.community.slug}
                    key={item.id}
                  >
                    <Link
                      className={`home-topic-visual ${showCover ? 'with-cover' : 'with-type-mark'}`}
                      href={`/p/${item.slug}`}
                      aria-label={`Открыть «${item.title || item.excerpt}»`}
                    >
                      {showCover ? (
                        <img src={topicVisual(item.community.slug)} alt="" aria-hidden="true" />
                      ) : (
                        <TopicTypeMark type={item.type} />
                      )}
                    </Link>

                    <div className="home-topic-copy">
                      <div className="home-topic-topline">
                        <div className="home-topic-path">
                          {unread && <span className="home-topic-unread-dot" title="Есть новые ответы" />}
                          <Link href={`/communities/${item.community.slug}`}>
                            {item.community.name}
                          </Link>
                        </div>
                        <div className="home-topic-statuses" aria-label="Статусы темы">
                          {pinned && <span className="home-topic-status pinned">Закреплено</span>}
                          {hot && <span className="home-topic-status hot">Горячая</span>}
                          {answered && <span className="home-topic-status answered">Есть ответ</span>}
                        </div>
                      </div>

                      <Link className="home-topic-title" href={`/p/${item.slug}`}>
                        {item.title || item.excerpt.slice(0, 100)}
                      </Link>
                      <p>{item.excerpt}</p>

                      <div className="home-topic-hashtags">
                        {item.tags.slice(0, 4).map((tag) => (
                          <Link
                            className="home-topic-hashtag"
                            href={`/tags/${tag.slug}`}
                            key={tag.id}
                          >
                            #{tag.label}
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div className="home-topic-author">
                      <Avatar
                        name={item.author.displayName}
                        size={28}
                        url={item.author.avatarUrl}
                      />
                      <span className="home-topic-author-copy">
                        <Link
                          className="home-topic-author-link"
                          data-username={item.author.username}
                          data-user-tone={nameTone(item.author.username)}
                          data-role={item.author.username === 'owner' ? 'owner' : undefined}
                          href={`/u/${item.author.username}`}
                        >
                          {item.author.displayName}
                        </Link>
                        <span>{relativeDate(item.lastActivityAt || item.createdAt)}</span>
                      </span>
                    </div>

                    <strong className="home-topic-count" title="Ответы">
                      {formatNumber(item.commentCount)}
                    </strong>
                    <strong className="home-topic-count" title="Просмотры">
                      {formatNumber(item.viewCount ?? 0)}
                    </strong>

                    <div className="home-topic-actions">
                      {item.isBookmarked ? (
                        <Link className="home-topic-action saved" href="/saved" title="Открыть сохранённое">
                          <span aria-hidden="true">◆</span>
                          <span className="visually-hidden">Сохранено</span>
                        </Link>
                      ) : (
                        <Link className="home-topic-action" href={`/p/${item.slug}`} title="Сохранить на странице темы">
                          <span aria-hidden="true">◇</span>
                          <span className="visually-hidden">Сохранить тему</span>
                        </Link>
                      )}
                      <details className="home-topic-more">
                        <summary aria-label="Дополнительные действия">•••</summary>
                        <div className="home-topic-more-menu">
                          <Link href={`/p/${item.slug}`}>Открыть тему</Link>
                          <Link href={`/communities/${item.community.slug}`}>Перейти в раздел</Link>
                          <Link href={`/u/${item.author.username}`}>Профиль автора</Link>
                        </div>
                      </details>
                    </div>
                  </article>
                );
              })
            ) : (
              <div className="home-feed-status">
                <strong>В этой вкладке пока пусто</strong>
                <span>Выберите другой режим или создайте первую тему.</span>
              </div>
            )}
          </div>
          <Link className="home-panel-footer" href="/search">
            Перейти ко всем обсуждениям <span aria-hidden="true">→</span>
          </Link>
        </main>

        <aside className="home-current-panel">
          <header className="home-panel-heading">
            <h2>Актуальное</h2>
          </header>
          <div className="home-current-list">
            {pageLoading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <div className="home-current-skeleton" key={index}>
                    <span />
                    <div><i /><i /><i /></div>
                  </div>
                ))
              : currentItems.map((item) => (
                  <Link
                    href={item.href}
                    className={`home-current-item is-${item.kindKey}`}
                    key={item.id}
                  >
                    <span className="home-current-icon">
                      <CurrentTypeIcon kind={item.kindKey} />
                    </span>
                    <span className="home-current-copy">
                      <span className="home-current-kicker">
                        <small>{item.kind}</small>
                        {item.state && <b>{item.state}</b>}
                      </span>
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
          <Link className="home-panel-footer" href="/events">
            Всё актуальное <span aria-hidden="true">→</span>
          </Link>

          <section className="home-rail-panel">
            <header className="home-panel-heading compact">
              <h2>Новое в Мастерской</h2>
              <Link href="/workshop">Открыть</Link>
            </header>
            <div className="home-simple-list home-rail-list">
              {workshopItems.map((item) => (
                <Link href="/workshop" key={item.id}>
                  <span className="home-list-icon" aria-hidden="true">
                    {workshopTypeSymbols[item.type] ?? 'W'}
                  </span>
                  <span className="home-list-copy">
                    <small>{typeLabel(item.type)}</small>
                    <strong>{item.title}</strong>
                    <em>@{item.author.username} · {relativeDate(item.createdAt)}</em>
                  </span>
                </Link>
              ))}
              {!pageLoading && !workshopItems.length && (
                <div className="home-list-empty">Новых опубликованных работ пока нет.</div>
              )}
            </div>
          </section>

          <section className="home-rail-panel">
            <header className="home-panel-heading compact">
              <h2>Новые сообщества</h2>
              <Link href="/communities">Открыть</Link>
            </header>
            <div className="home-simple-list home-community-short-list home-rail-list">
              {newCommunities.map((community) => (
                <Link href={`/communities/${community.slug}`} key={community.id}>
                  <span className="home-list-icon" aria-hidden="true">
                    {community.name.charAt(0).toUpperCase()}
                  </span>
                  <span className="home-list-copy">
                    <strong>{community.name}</strong>
                    <small>{community.shortDescription || community.description}</small>
                    <em>
                      <i className="home-activity-dot" aria-hidden="true" />
                      {formatNumber(community.subscriberCount)} подписчиков
                    </em>
                  </span>
                </Link>
              ))}
              {!pageLoading && !newCommunities.length && (
                <div className="home-list-empty">Новых сообществ пока нет.</div>
              )}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
