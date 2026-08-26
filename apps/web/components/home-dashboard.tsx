'use client';

import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import { useMemo, useState } from 'react';
import { CommunityMark } from '@/components/community-mark';
import type { PublicationCardData } from '@/lib/types';

type Community = {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription?: string | null;
  avatarUrl?: string | null;
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

type PollItem = {
  id: string;
  title: string;
  closesAt: string;
  status: string;
  createdAt?: string;
  community: {
    slug: string;
    name: string;
  };
};

export type HomeInitialData = {
  communities?: Community[];
  polls?: PollItem[];
  announcements?: PublicationCardData[];
  feed?: PublicationCardData[];
  newFeed?: PublicationCardData[];
};

type TreeNode = Community & {
  children: TreeNode[];
};

const publicationTypeName: Record<string, string> = {
  DISCUSSION: 'Обсуждение',
  QUESTION: 'Вопрос',
  NEWS: 'Новости',
  GUIDE: 'Гайд',
  PROJECT: 'Проект',
  SERVICE: 'Услуга',
  CASE: 'Кейс',
  ANNOUNCEMENT: 'Объявление',
};

function formatCount(value: number | undefined) {
  const safe = Number.isFinite(value) ? Number(value) : 0;
  return new Intl.NumberFormat('ru-RU', {
    notation: safe >= 10_000 ? 'compact' : 'standard',
    maximumFractionDigits: 1,
  }).format(safe);
}

function relativeTime(value?: string | null) {
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

function formatDate(value?: string | null) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';

  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
  });
}

function buildTree(items: Community[]): TreeNode[] {
  const nodes = new Map<string, TreeNode>();

  items.forEach((item) => {
    nodes.set(item.slug, { ...item, children: [] });
  });

  const roots: TreeNode[] = [];

  nodes.forEach((node) => {
    const parentSlug = node.parent?.slug;
    const parent = parentSlug ? nodes.get(parentSlug) : undefined;

    if (parent && parent.slug !== node.slug) {
      parent.children.push(node);
    } else {
      roots.push(node);
    }
  });

  const sortNodes = (rows: TreeNode[]) => {
    rows.sort((a, b) => {
      const activityDelta =
        (b.recentPublicationCount ?? 0) -
        (a.recentPublicationCount ?? 0);

      if (activityDelta !== 0) return activityDelta;

      const subscriberDelta =
        (b.subscriberCount ?? 0) -
        (a.subscriberCount ?? 0);

      if (subscriberDelta !== 0) return subscriberDelta;

      return a.name.localeCompare(b.name, 'ru');
    });

    rows.forEach((row) => sortNodes(row.children));
  };

  sortNodes(roots);

  return roots;
}

function topicRows(items: PublicationCardData[] | undefined) {
  return (items ?? [])
    .filter((item) => item.format === 'TOPIC')
    .slice(0, 5);
}

function TopicRow({
  item,
  compact = false,
}: {
  item: PublicationCardData;
  compact?: boolean;
}) {
  const title = item.title?.trim() || 'Тема без заголовка';
  const date = item.lastActivityAt || item.createdAt;

  return (
    <Link
      className={`forrum-home-v16__topic ${compact ? 'is-compact' : ''}`}
      href={`/p/${item.slug}`}
    >
      <CommunityMark
        className="forrum-home-v16__topic-mark"
        name={item.community.name}
        url={item.community.avatarUrl}
        size={compact ? 28 : 38}
      />

      <span className="forrum-home-v16__topic-copy">
        <span className="forrum-home-v16__topic-title">
          <span
            className={`forrum-home-v16__type type-${item.type.toLowerCase()}`}
          >
            {publicationTypeName[item.type] ?? 'Тема'}
          </span>
          <strong>{title}</strong>
        </span>

        {!compact && (
          <span className="forrum-home-v16__topic-excerpt">
            {item.excerpt}
          </span>
        )}

        <span className="forrum-home-v16__topic-meta">
          <span>@{item.author.username}</span>
          <span aria-hidden="true">›</span>
          <span>{item.community.name}</span>
        </span>
      </span>

      <span
        className="forrum-home-v16__topic-stats"
        aria-label="Статистика темы"
      >
        <span title="Ответы">
          <span aria-hidden="true">◫</span>
          {formatCount(item.commentCount)}
        </span>
        <span title="Просмотры">
          <span aria-hidden="true">◉</span>
          {formatCount(item.viewCount)}
        </span>
        <span className="forrum-home-v16__topic-time">
          {relativeTime(date)}
        </span>
      </span>
    </Link>
  );
}

function TreeBranch({
  node,
  depth,
  expanded,
  onToggle,
}: {
  node: TreeNode;
  depth: number;
  expanded: Set<string>;
  onToggle: (slug: string) => void;
}) {
  const hasChildren = node.children.length > 0;
  const isOpen = expanded.has(node.slug);

  return (
    <li
      className="forrum-home-v16__tree-node"
      style={{ '--tree-depth': depth } as CSSProperties}
    >
      <div className="forrum-home-v16__tree-row">
        {hasChildren ? (
          <button
            className="forrum-home-v16__tree-toggle"
            type="button"
            aria-expanded={isOpen}
            aria-label={
              isOpen
                ? `Свернуть ${node.name}`
                : `Развернуть ${node.name}`
            }
            onClick={() => onToggle(node.slug)}
          >
            <span aria-hidden="true">{isOpen ? '⌄' : '›'}</span>
          </button>
        ) : (
          <span
            className="forrum-home-v16__tree-spacer"
            aria-hidden="true"
          />
        )}

        <Link
          className="forrum-home-v16__tree-link"
          href={`/communities/${node.slug}`}
        >
          <span
            className="forrum-home-v16__tree-folder"
            aria-hidden="true"
          >
            □
          </span>
          <span className="forrum-home-v16__tree-name">
            {node.name}
          </span>
          <span className="forrum-home-v16__tree-count">
            {formatCount(node.subscriberCount)}
          </span>
        </Link>
      </div>

      {hasChildren && isOpen && (
        <ul className="forrum-home-v16__tree-children">
          {node.children.map((child) => (
            <TreeBranch
              key={child.id}
              node={child}
              depth={depth + 1}
              expanded={expanded}
              onToggle={onToggle}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

function HomePanel({
  title,
  href,
  children,
}: {
  title: string;
  href?: string;
  children: ReactNode;
}) {
  return (
    <section className="forrum-home-v16__panel">
      <header className="forrum-home-v16__panel-head">
        <h2>{title}</h2>
        {href && (
          <Link href={href}>
            Смотреть все <span aria-hidden="true">→</span>
          </Link>
        )}
      </header>
      {children}
    </section>
  );
}

export function HomeDashboard({
  initialData,
}: {
  initialData: HomeInitialData;
}) {
  const communities = initialData.communities ?? [];
  const tree = useMemo(
    () => buildTree(communities),
    [communities],
  );

  const parentSlugs = useMemo(
    () =>
      communities
        .filter((item) =>
          communities.some(
            (candidate) =>
              candidate.parent?.slug === item.slug,
          ),
        )
        .map((item) => item.slug),
    [communities],
  );

  const [expanded, setExpanded] = useState<Set<string>>(
    () => new Set(parentSlugs),
  );

  const [weeklyMode, setWeeklyMode] = useState<
    'likes' | 'activity'
  >('likes');

  const discussed = topicRows(initialData.feed);
  const newest = topicRows(initialData.newFeed);

  const activePolls = useMemo(() => {
    const now = Date.now();

    return (initialData.polls ?? [])
      .filter((poll) => {
        const status = poll.status.toUpperCase();
        const closeTime = new Date(poll.closesAt).getTime();

        if (
          status === 'CLOSED' ||
          status === 'ENDED' ||
          status === 'ARCHIVED'
        ) {
          return false;
        }

        if (
          status === 'OPEN' ||
          status === 'ACTIVE'
        ) {
          return true;
        }

        return (
          Number.isFinite(closeTime) &&
          closeTime > now
        );
      })
      .sort(
        (a, b) =>
          new Date(a.closesAt).getTime() -
          new Date(b.closesAt).getTime(),
      )
      .slice(0, 3);
  }, [initialData.polls]);

  const announcements =
    (initialData.announcements ?? []).slice(0, 3);

  const totalPublications = communities.reduce(
    (sum, item) =>
      sum + (item.publicationCount ?? 0),
    0,
  );

  const recentPublications = communities.reduce(
    (sum, item) =>
      sum + (item.recentPublicationCount ?? 0),
    0,
  );

  const totalSubscriptions = communities.reduce(
    (sum, item) =>
      sum + (item.subscriberCount ?? 0),
    0,
  );

  const toggleTree = (slug: string) => {
    setExpanded((current) => {
      const next = new Set(current);

      if (next.has(slug)) next.delete(slug);
      else next.add(slug);

      return next;
    });
  };

  return (
    <div className="forrum-home-v16">
      <aside className="forrum-home-v16__tree">
        <div className="forrum-home-v16__side-head">
          <h2>Сообщества</h2>
        </div>

        {tree.length ? (
          <ul className="forrum-home-v16__tree-root">
            {tree.map((node) => (
              <TreeBranch
                key={node.id}
                node={node}
                depth={0}
                expanded={expanded}
                onToggle={toggleTree}
              />
            ))}
          </ul>
        ) : (
          <p className="forrum-home-v16__empty">
            Сообщества появятся после загрузки данных.
          </p>
        )}

        <Link
          className="forrum-home-v16__proposal"
          href="/communities/proposals"
        >
          <span aria-hidden="true">⊞</span>
          Предложить сообщество
        </Link>
      </aside>

      <main className="forrum-home-v16__center">
        <HomePanel
          title="Обсуждаемые темы"
          href="/feed?mode=popular"
        >
          <div className="forrum-home-v16__topic-list">
            {discussed.length ? (
              discussed.map((item) => (
                <TopicRow
                  key={item.id}
                  item={item}
                />
              ))
            ) : (
              <p className="forrum-home-v16__empty">
                Обсуждаемых тем пока нет.
              </p>
            )}
          </div>
        </HomePanel>

        <HomePanel
          title="Новые темы"
          href="/feed?mode=new"
        >
          <div className="forrum-home-v16__topic-list is-compact">
            {newest.length ? (
              newest.map((item) => (
                <TopicRow
                  key={item.id}
                  item={item}
                  compact
                />
              ))
            ) : (
              <p className="forrum-home-v16__empty">
                Новых тем пока нет.
              </p>
            )}
          </div>
        </HomePanel>

        <HomePanel
          title="Активные голосования"
          href="/events"
        >
          <div className="forrum-home-v16__poll-list">
            {activePolls.length ? (
              activePolls.map((poll) => (
                <Link
                  className="forrum-home-v16__poll"
                  key={poll.id}
                  href="/events"
                >
                  <span
                    className="forrum-home-v16__poll-icon"
                    aria-hidden="true"
                  >
                    ▥
                  </span>

                  <span>
                    <strong>{poll.title}</strong>
                    <small>
                      {poll.community.name}
                      {formatDate(poll.closesAt)
                        ? ` · до ${formatDate(
                            poll.closesAt,
                          )}`
                        : ''}
                    </small>
                  </span>

                  <span aria-hidden="true">→</span>
                </Link>
              ))
            ) : (
              <p className="forrum-home-v16__empty">
                Активных голосований сейчас нет.
              </p>
            )}
          </div>
        </HomePanel>
      </main>

      <aside className="forrum-home-v16__rail">
        <HomePanel
          title="Актуальное"
          href="/news"
        >
          <div className="forrum-home-v16__actual-list">
            {announcements.map((item) => (
              <Link
                className="forrum-home-v16__actual"
                href={`/p/${item.slug}`}
                key={item.id}
              >
                <CommunityMark
                  name={item.community.name}
                  url={item.community.avatarUrl}
                  size={30}
                />
                <span>
                  <strong>
                    {item.title || 'Объявление'}
                  </strong>
                  <small>
                    {relativeTime(item.createdAt)}
                  </small>
                </span>
              </Link>
            ))}

            {activePolls[0] && (
              <Link
                className="forrum-home-v16__actual"
                href="/events"
              >
                <span
                  className="forrum-home-v16__actual-symbol"
                  aria-hidden="true"
                >
                  ▥
                </span>
                <span>
                  <strong>
                    Активное голосование
                  </strong>
                  <small>
                    {activePolls[0].title}
                  </small>
                </span>
              </Link>
            )}

            {!announcements.length &&
              !activePolls.length && (
                <p className="forrum-home-v16__empty">
                  Важных обновлений сейчас нет.
                </p>
              )}
          </div>
        </HomePanel>

        <section className="forrum-home-v16__panel">
          <header className="forrum-home-v16__panel-head">
            <h2>Участники недели</h2>
          </header>

          <div
            className="forrum-home-v16__tabs"
            role="tablist"
            aria-label="Рейтинг недели"
          >
            <button
              type="button"
              role="tab"
              aria-selected={weeklyMode === 'likes'}
              className={
                weeklyMode === 'likes'
                  ? 'is-active'
                  : ''
              }
              onClick={() =>
                setWeeklyMode('likes')
              }
            >
              По симпатиям
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={
                weeklyMode === 'activity'
              }
              className={
                weeklyMode === 'activity'
                  ? 'is-active'
                  : ''
              }
              onClick={() =>
                setWeeklyMode('activity')
              }
            >
              По активности
            </button>
          </div>

          <div className="forrum-home-v16__weekly-empty">
            <span aria-hidden="true">◎</span>
            <strong>
              Пока нет данных за эту неделю
            </strong>
            <p>
              Рейтинг появится после серверного
              подсчёта
              {weeklyMode === 'likes'
                ? ' симпатий.'
                : ' комментариев.'}
            </p>
          </div>
        </section>

        <section className="forrum-home-v16__panel">
          <header className="forrum-home-v16__panel-head">
            <h2>FORRUM сегодня</h2>
          </header>

          <dl className="forrum-home-v16__stats">
            <div>
              <dt>Сообществ</dt>
              <dd>
                {formatCount(communities.length)}
              </dd>
            </div>
            <div>
              <dt>Публикаций</dt>
              <dd>
                {formatCount(totalPublications)}
              </dd>
            </div>
            <div>
              <dt>Новых за 24 часа</dt>
              <dd>
                {formatCount(recentPublications)}
              </dd>
            </div>
            <div>
              <dt>Подписок</dt>
              <dd>
                {formatCount(totalSubscriptions)}
              </dd>
            </div>
          </dl>
        </section>
      </aside>
    </div>
  );
}
