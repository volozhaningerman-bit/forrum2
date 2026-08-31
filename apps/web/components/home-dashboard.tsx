'use client';

import Link from 'next/link';
import type { CSSProperties, MouseEvent, ReactNode } from 'react';
import { useMemo, useState } from 'react';
import { Avatar } from '@/components/avatar';
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
  parent: { slug: string; name: string } | null;
};

type PollOption = {
  id: string;
  label: string;
  position?: number;
  bindingVotes: number;
  advisoryVotes: number;
};

type PollItem = {
  id: string;
  title: string;
  description?: string;
  kind?: string;
  closesAt: string;
  status: string;
  createdAt?: string;
  options?: PollOption[];
  community: {
    slug: string;
    name: string;
    accentColor?: string;
    avatarUrl?: string | null;
  };
};

type WeeklyUser = {
  username: string;
  displayName: string;
  avatarUrl?: string | null;
  score: number;
  reactionCount: number;
  topicCount: number;
  commentCount: number;
  presenceCount?: number;
};

type HomeDiscussedTopic = {
  id: string;
  slug: string;
  type: string;
  title: string | null;
  excerpt: string;
  viewCount: number;
  createdAt: string;
  lastActivityAt?: string;
  commentCount: number;
  reactionCount: number;
  author: {
    username: string;
    displayName: string;
    avatarUrl?: string | null;
  };
  community: {
    slug: string;
    name: string;
    accentColor?: string;
    avatarUrl?: string | null;
  };
  lastComment?: {
    createdAt: string;
    author: { username: string; displayName: string };
  } | null;
};

type HomeProposal = {
  id: string;
  name: string;
  description: string;
  supportCount: number;
  author: { username: string; displayName: string };
};

type HomeOverview = {
  discussed?: HomeDiscussedTopic[];
  activePolls?: PollItem[];
  proposal?: HomeProposal | null;
  stats: {
    communities: number;
    topics: number;
    messages: number;
    usersOnline: number;
    recordOnline: number;
    recordOnlineAt?: string | null;
  };
  weekly: {
    likes: WeeklyUser[];
    activity: WeeklyUser[];
  };
};

export type HomeInitialData = {
  communities?: Community[];
  polls?: PollItem[];
  announcements?: PublicationCardData[];
  feed?: PublicationCardData[];
  newFeed?: PublicationCardData[];
  overview?: HomeOverview;
};

type TreeNode = Community & { children: TreeNode[] };

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

function communityVisual(
  slug: string,
  avatarUrl?: string | null,
) {
  return topicVisuals[slug] ?? avatarUrl ?? topicVisual(slug);
}

// FORRUM_HOME_CONTENT_VISUALS_V43
// Content rows must not collapse into identical community pictures.
// The mapping is deterministic and semantic: real publication type first,
// community visual only as a fallback for an unknown future type.
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

function topicContentVisual(item: {
  type: string;
  community: { slug: string; avatarUrl?: string | null };
}) {
  return (
    publicationTypeVisuals[item.type.toUpperCase()] ??
    communityVisual(item.community.slug, item.community.avatarUrl)
  );
}

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

function formatMetric(value: number | undefined) {
  return Number.isFinite(value) ? formatCount(value) : '—';
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
  return new Date(value).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
}

function pollTimeLeft(value: string) {
  const time = new Date(value).getTime();
  if (!Number.isFinite(time)) return '';
  const diff = time - Date.now();
  if (diff <= 0) return 'завершено';
  const hours = Math.ceil(diff / 3_600_000);
  if (hours < 24) return `${hours} ч.`;
  return `${Math.ceil(diff / 86_400_000)} дн.`;
}

function formatRecordDate(value?: string | null) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function buildTree(items: Community[]): TreeNode[] {
  const nodes = new Map<string, TreeNode>();
  items.forEach((item) => nodes.set(item.slug, { ...item, children: [] }));
  const roots: TreeNode[] = [];
  nodes.forEach((node) => {
    const parent = node.parent?.slug ? nodes.get(node.parent.slug) : undefined;
    if (parent && parent.slug !== node.slug) parent.children.push(node);
    else roots.push(node);
  });
  const sortNodes = (rows: TreeNode[]) => {
    rows.sort((a, b) =>
      (b.subscriberCount ?? 0) - (a.subscriberCount ?? 0) ||
      a.name.localeCompare(b.name, 'ru'),
    );
    rows.forEach((row) => sortNodes(row.children));
  };
  sortNodes(roots);
  return roots;
}

function topicRows(items: PublicationCardData[] | undefined) {
  return (items ?? []).filter((item) => item.format === 'TOPIC').slice(0, 5);
}

function lastReply(item: {
  lastComment?: { createdAt: string; author: { username: string } } | null;
  author: { username: string };
  lastActivityAt?: string;
  createdAt: string;
}) {
  return {
    username: item.lastComment?.author.username ?? item.author.username,
    createdAt: item.lastComment?.createdAt ?? item.lastActivityAt ?? item.createdAt,
  };
}

function communityDisplayName(name: string) {
  return name === 'FORRUM Start' ? '4RRUM Start' : name;
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

  const onRowClick = (
    event: MouseEvent<HTMLDivElement>,
  ) => {
    if (
      !hasChildren ||
      event.target !== event.currentTarget
    ) {
      return;
    }

    onToggle(node.slug);
  };

  return (
    <li
      className="forrum-home-v16__tree-node"
      style={{ '--tree-depth': depth } as CSSProperties}
    >
      <div
        className="forrum-home-v16__tree-row"
        data-expandable={hasChildren ? 'true' : undefined}
        onClick={onRowClick}
      >
        {hasChildren ? (
          <button
            className="forrum-home-v16__tree-toggle"
            type="button"
            aria-expanded={isOpen}
            aria-label={
              isOpen
                ? `Свернуть ${communityDisplayName(node.name)}`
                : `Развернуть ${communityDisplayName(node.name)}`
            }
            onClick={() => onToggle(node.slug)}
          >
            <span aria-hidden="true">
              {isOpen ? '⌄' : '›'}
            </span>
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
          aria-label={`Открыть сообщество ${communityDisplayName(node.name)}`}
        >
          <span
            className="forrum-home-v16__tree-folder"
            aria-hidden="true"
          />
          <span className="forrum-home-v16__tree-name">
            {communityDisplayName(node.name)}
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

function HomePanel({ title, href, children }: { title: string; href?: string; children: ReactNode }) {
  return (
    <section className="forrum-home-v16__panel">
      <header className="forrum-home-v16__panel-head">
        <h2>{title}</h2>
        {href && <Link href={href}>Смотреть все <span aria-hidden="true">→</span></Link>}
      </header>
      {children}
    </section>
  );
}

function DiscussedTopic({ item }: { item: PublicationCardData | HomeDiscussedTopic }) {
  const reply = lastReply(item);
  return (
    <Link className="forrum-home-v16__discussed" href={`/p/${item.slug}`}>
      <CommunityMark
        className="forrum-home-v16__topic-mark"
        name={item.community.name}
        url={topicContentVisual(item)}
        size={46}
      />
      <span className="forrum-home-v16__discussed-copy">
        <span className="forrum-home-v16__topic-title">
          <span className={`forrum-home-v16__type type-${item.type.toLowerCase()}`}>
            {publicationTypeName[item.type] ?? 'Тема'}
          </span>
          <strong>{item.title?.trim() || 'Тема без заголовка'}</strong>
        </span>
        <span className="forrum-home-v16__topic-excerpt">{item.excerpt}</span>
        <span className="forrum-home-v16__topic-meta">
          <span>@{item.author.username}</span>
          <span aria-hidden="true">→</span>
          <span>{relativeTime(item.createdAt)}</span>
        </span>
      </span>
      <span className="forrum-home-v16__discussion-stat forrum-home-v16__topic-stat" title="Ответы">▣ {formatCount(item.commentCount)}</span>
      <span className="forrum-home-v16__discussion-stat forrum-home-v16__topic-stat" title="Просмотры">◉ {formatCount(item.viewCount)}</span>
      <span className="forrum-home-v16__last-message">
        <strong>{relativeTime(reply.createdAt)}</strong>
        <small>@{reply.username}</small>
      </span>
    </Link>
  );
}

function NewTopic({ item }: { item: PublicationCardData }) {
  const reply = lastReply(item);
  return (
    <Link className="forrum-home-v16__new-topic" href={`/p/${item.slug}`}>
      <span className="forrum-home-v16__new-topic-title">{item.title?.trim() || 'Тема без заголовка'}</span>
      <span className="forrum-home-v16__new-topic-section">{item.community.name}</span>
      <span className="forrum-home-v16__new-topic-author">@{item.author.username}</span>
      <span className="forrum-home-v16__new-topic-number">{formatCount(item.commentCount)}</span>
      <span className="forrum-home-v16__new-topic-number">{formatCount(item.viewCount)}</span>
      <span className="forrum-home-v16__new-topic-last">
        {relativeTime(reply.createdAt)} <b>@{reply.username}</b>
      </span>
    </Link>
  );
}

function PollRow({ poll }: { poll: PollItem }) {
  const options = poll.options ?? [];
  const totalBinding = options.reduce(
    (sum, option) => sum + Math.max(0, option.bindingVotes),
    0,
  );
  const totalAdvisory = options.reduce(
    (sum, option) => sum + Math.max(0, option.advisoryVotes),
    0,
  );
  const outcomeTotal = totalBinding > 0 ? totalBinding : totalAdvisory;
  const totalVotes = totalBinding + totalAdvisory;

  return (
    <Link className="forrum-home-v16__poll" href="/events?tab=polls">
      <CommunityMark
        className="forrum-home-v16__poll-mark"
        name={poll.community.name}
        url={communityVisual(poll.community.slug, poll.community.avatarUrl)}
        size={40}
      />
      <span className="forrum-home-v16__poll-copy">
        <strong>{poll.title}</strong>
        <small>
          Голосов: {formatCount(totalVotes)}
          {totalBinding > 0 && totalAdvisory > 0
            ? ` · решающих ${formatCount(totalBinding)}`
            : ''}
        </small>
      </span>
      <span className="forrum-home-v16__poll-options">
        {options.map((option) => {
          const votes = totalBinding > 0
            ? option.bindingVotes
            : option.advisoryVotes;
          const percent = outcomeTotal > 0
            ? Math.round((votes / outcomeTotal) * 100)
            : 0;

          return (
            <span className="forrum-home-v16__poll-option" key={option.id}>
              <span>{option.label}</span>
              <i aria-hidden="true">
                <b style={{ width: `${percent}%` }} />
              </i>
              <em>{formatCount(votes)}</em>
              <strong>{percent}%</strong>
            </span>
          );
        })}
      </span>
      <span className="forrum-home-v16__poll-time">
        Осталось: {pollTimeLeft(poll.closesAt)}
      </span>
    </Link>
  );
}

// FORRUM_HOME_V45_RIGHT_RAIL_NEWS
// FORRUM_HOME_PRODUCTION_POLISH_V46
// 4RRUM_HOME_TREE_COUNTS_REMOVED
// 4RRUM_HOME_V4
export function HomeDashboard({ initialData }: { initialData: HomeInitialData }) {
  const communities = initialData.communities ?? [];

  const tree = useMemo(() => buildTree(communities), [communities]);
  const parentSlugs = useMemo(
    () => communities.filter((item) => communities.some((candidate) => candidate.parent?.slug === item.slug)).map((item) => item.slug),
    [communities],
  );
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set(parentSlugs));
  const initialWeeklyLikes = initialData.overview?.weekly.likes ?? [];
  const initialWeeklyActivity = initialData.overview?.weekly.activity ?? [];
  const initialWeeklyMode: 'likes' | 'activity' = 'activity';
  const [weeklyMode, setWeeklyMode] = useState<'likes' | 'activity'>(
    initialWeeklyMode,
  );
  const discussed = initialData.overview?.discussed?.length
    ? initialData.overview.discussed
    : topicRows(initialData.feed);
  const newest = topicRows(initialData.newFeed);
  const activePolls = useMemo(() => {
    const now = Date.now();
    const merged = [
      ...(initialData.overview?.activePolls ?? []),
      ...(initialData.polls ?? []),
    ];
    const unique = new Map<string, PollItem>();

    for (const poll of merged) {
      if (
        poll.status.toUpperCase() !== 'OPEN' ||
        new Date(poll.closesAt).getTime() <= now
      ) {
        continue;
      }
      if (!unique.has(poll.id)) unique.set(poll.id, poll);
    }

    return [...unique.values()]
      .sort(
        (a, b) =>
          new Date(a.closesAt).getTime() -
          new Date(b.closesAt).getTime(),
      )
      .slice(0, 3);
  }, [initialData.overview?.activePolls, initialData.polls]);

  const announcements = initialData.announcements ?? [];

  // FORRUM_HOME_CONTEXTUAL_ACTUAL
  const actualAnnouncements = useMemo(() => {
    const now = Date.now();
    return announcements
      .filter((item) => {
        if (!item.pinnedUntil) return false;
        return new Date(item.pinnedUntil).getTime() > now;
      })
      .slice(0, 2);
  }, [announcements]);
  const actualPoll = activePolls[0];
  const actualProposal = initialData.overview?.proposal ?? null;
  const actualReserved = Number(Boolean(actualPoll)) + Number(Boolean(actualProposal));
  const actualTopicSlots = Math.max(
    0,
    3 - actualReserved - actualAnnouncements.length,
  );
  const actualTopics = newest.slice(0, actualTopicSlots);
  const actualCount =
    actualAnnouncements.length +
    actualTopics.length +
    Number(Boolean(actualPoll)) +
    Number(Boolean(actualProposal));

  const weekly = initialData.overview?.weekly[weeklyMode] ?? [];
  const stats = initialData.overview?.stats;

  const toggleTree = (slug: string) => {
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  return (
    <div className="forrum-home-v16" data-home-reference="v36" data-home-polish="v42">
      <aside className="forrum-home-v16__tree">
        <div className="forrum-home-v16__side-head"><h2>Сообщества</h2></div>
        {tree.length ? (
          <ul className="forrum-home-v16__tree-root">
            {tree.map((node) => (
              <TreeBranch key={node.id} node={node} depth={0} expanded={expanded} onToggle={toggleTree} />
            ))}
          </ul>
        ) : (
          <p className="forrum-home-v16__empty">Сообщества появятся после загрузки данных.</p>
        )}
        <Link className="forrum-home-v16__proposal" href="/communities/proposals">
          <span aria-hidden="true">⊞</span> Предложить сообщество
        </Link>
      </aside>

      <main className="forrum-home-v16__center">
        <HomePanel title="Обсуждаемые темы" href="/feed?mode=popular">
          <div className="forrum-home-v16__discussed-head" aria-hidden="true">
            <span>Ответы</span>
            <span>Просмотры</span>
            <span>Активность</span>
          </div>
          <div className="forrum-home-v16__discussed-list">
            {discussed.length ? discussed.map((item) => <DiscussedTopic key={item.id} item={item} />) : (
              <p className="forrum-home-v16__empty">Обсуждаемых тем пока нет.</p>
            )}
          </div>
        </HomePanel>

        <HomePanel title="Новые темы" href="/feed?mode=new">
          <div className="forrum-home-v16__new-topic-table">
            <div className="forrum-home-v16__new-topic-head" aria-hidden="true">
              <span>Тема</span><span>Раздел</span><span>Автор</span><span>Ответы</span><span>Просмотры</span><span>Последнее сообщение</span>
            </div>
            {newest.length ? newest.map((item) => <NewTopic key={item.id} item={item} />) : (
              <p className="forrum-home-v16__empty">Новых тем пока нет.</p>
            )}
          </div>
        </HomePanel>

        {/* FORRUM_HOME_HIDE_EMPTY_POLLS */}
        {activePolls.length > 0 && (
<HomePanel title="Активные голосования" href="/events?tab=polls">
          <div className="forrum-home-v16__poll-list">
            {activePolls.length ? activePolls.map((poll) => <PollRow key={poll.id} poll={poll} />) : (
              <p className="forrum-home-v16__empty">Активных голосований сейчас нет.</p>
            )}
          </div>
        </HomePanel>
        )}
      </main>

      <aside className="forrum-home-v16__rail">
        {(activePolls.length > 0 || actualAnnouncements.length > 0) && (
        <HomePanel
          title="Актуальное"
          href="/events"
        >
          <div className="forrum-home-v16__actual-list">
            {actualAnnouncements.map((item) => (
              <Link
                className="forrum-home-v16__actual"
                href={`/p/${item.slug}`}
                key={`actual-${item.id}`}
              >
                <CommunityMark
                  name={item.community.name}
                  url={topicContentVisual(item)}
                  size={30}
                />
                <span>
                  <strong>{item.title || "Важное объявление"}</strong>
                  <small>Важно сейчас</small>
                </span>
              </Link>
            ))}
            {activePolls.slice(0, 2).map((poll) => (
              <Link
                className="forrum-home-v16__actual"
                href="/events"
                key={`actual-poll-${poll.id}`}
              >
                <span
                  className="forrum-home-v16__actual-symbol"
                  aria-hidden="true"
                >
                  ▥
                </span>
                <span>
                  <strong>{poll.title}</strong>
                  <small>Идёт голосование</small>
                </span>
              </Link>
            ))}
          </div>
        </HomePanel>
      )}

        <section className="forrum-home-v16__panel">
          <header className="forrum-home-v16__panel-head"><h2>Участники недели</h2></header>
          <div className="forrum-home-v16__tabs" role="tablist" aria-label="Рейтинг недели">
            <button type="button" role="tab" aria-selected={weeklyMode === 'likes'} className={weeklyMode === 'likes' ? 'is-active' : ''} onClick={() => setWeeklyMode('likes')}>По симпатиям</button>
            <button type="button" role="tab" aria-selected={weeklyMode === 'activity'} className={weeklyMode === 'activity' ? 'is-active' : ''} onClick={() => setWeeklyMode('activity')}>По активности</button>
          </div>
          <ol className="forrum-home-v16__weekly">
            {weekly.slice(0, 5).map((user, index) => (
              <li key={user.username}>
                <span className="forrum-home-v16__weekly-rank">{index + 1}</span>
                <Avatar name={user.displayName} url={user.avatarUrl} size={30} />
                <Link href={`/u/${user.username}`}>@{user.username}</Link>
                <strong
                  title={
                    weeklyMode === 'likes'
                      ? `Симпатий за 7 дней: ${formatCount(user.reactionCount)}`
                      : `Тем ${formatCount(user.topicCount)} · комментариев ${formatCount(user.commentCount)} · активность ${formatCount(user.presenceCount)}`
                  }
                >
                  {weeklyMode === 'likes' ? '♡' : '↻'} {formatCount(user.score)}
                </strong>
              </li>
            ))}
          </ol>
          {!weekly.length && (
            <p className="forrum-home-v16__weekly-empty">
              {weeklyMode === 'likes'
                ? 'За последние 7 дней симпатий ещё нет.'
                : 'За последние 7 дней активности ещё нет.'}
            </p>
          )}
          <Link className="forrum-home-v16__rail-footer" href="/users">Смотреть рейтинг <span aria-hidden="true">→</span></Link>
        </section>

        <HomePanel
          title="Новости 4RRUM"
          href="/news"
        >
          <div className="forrum-home-v16__actual-list">
            {announcements.length ? (
              announcements.slice(0, 3).map((item) => (
                <Link
                  className="forrum-home-v16__actual"
                  href={`/p/${item.slug}`}
                  key={item.id}
                >
                  <CommunityMark
                    name={item.community.name}
                    url={topicContentVisual(item)}
                    size={30}
                  />
                  <span>
                    <strong>{item.title || 'Новость 4RRUM'}</strong>
                    <small>{relativeTime(item.createdAt)}</small>
                  </span>
                </Link>
              ))
            ) : (
              <p className="forrum-home-v16__empty">
                Новости 4RRUM пока не опубликованы.
              </p>
            )}
          </div>
        </HomePanel>
        {/* 4RRUM_HOME_START_RAIL */}
        <HomePanel title="Старт 4RRUM" href="/rules">
          <div className="forrum-home-v16__start-list">
            <Link className="forrum-home-v16__start-link" href="/#propose-section">
              <strong>Предложить раздел</strong>
              <small>Запустить новое направление сообщества</small>
            </Link>
            <Link className="forrum-home-v16__start-link" href="/#become-curator">
              <strong>Стать куратором</strong>
              <small>Взять ответственность за развитие раздела</small>
            </Link>
            <Link className="forrum-home-v16__start-link" href="/support">
              <strong>Обратная связь</strong>
              <small>Сообщить об ошибке или предложить улучшение</small>
            </Link>
          </div>
        </HomePanel>
      </aside>
    </div>
  );
}

/* 4RRUM_HOME_FINAL_UX_POLISH_V2 */
