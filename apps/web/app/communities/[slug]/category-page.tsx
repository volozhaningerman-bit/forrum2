'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { api } from '@/lib/api';
import type { PublicationCardData, Tag } from '@/lib/types';
import { Avatar } from '@/components/avatar';
import { CommunityMark } from '@/components/community-mark';

export type Community = {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription?: string | null;
  avatarUrl?: string | null;
  coverUrl?: string | null;
  accentColor: string;
  subscriberCount: number;
  publicationCount: number;
  isSubscribed: boolean;
  canManage: boolean;
  notifyLevel: 'NONE' | 'IMPORTANT' | 'ALL' | null;
  ancestors: Array<{ slug: string; name: string }>;
  parent: { slug: string; name: string } | null;
  children: Array<{
    slug: string;
    name: string;
    shortDescription?: string | null;
    avatarUrl?: string | null;
    coverUrl?: string | null;
    subscriberCount: number;
  }>;
  team: Array<{
    role: string;
    user: {
      username: string;
      displayName: string;
      avatarUrl?: string | null;
    };
  }>;
  popularTags: Array<Tag & { publicationCount: number }>;
  activePoll: null | {
    id: string;
    title: string;
    closesAt: string;
    totalVotes: number;
  };
  publications: PublicationCardData[];
};

type TreeCommunity = {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription?: string | null;
  avatarUrl?: string | null;
  subscriberCount: number;
  publicationCount: number;
  parent: { slug: string; name: string } | null;
};

type TopicTab = 'all' | 'new' | 'discussed' | 'unanswered';
type TopicSort = 'activity' | 'new' | 'popular';

const topicTabs: Array<{ key: TopicTab; label: string }> = [
  { key: 'all', label: 'Все' },
  { key: 'new', label: 'Новые' },
  { key: 'discussed', label: 'Обсуждаемые' },
  { key: 'unanswered', label: 'Без ответа' },
];

const workshopNavigation = [
  { label: 'Проекты и заказы', href: '/workshop?section=projects' },
  { label: 'Готовые решения', href: '/workshop?section=solutions' },
  { label: 'Команды и специалисты', href: '/workshop?section=teams' },
] as const;

const preferredRootOrder = [
  'internet-projects',
  'promotion',
  'forrum-start',
  'gta-rp',
  'telegram',
];

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

function formatNumber(value: number) {
  return new Intl.NumberFormat('ru-RU').format(value);
}

function topicVisual(slug: string) {
  return topicVisuals[slug] ?? '/forrum-assets/topic-default.svg';
}

function rootRank(slug: string) {
  const rank = preferredRootOrder.indexOf(slug);
  return rank === -1 ? preferredRootOrder.length + 1 : rank;
}

function sortRootCommunities(left: TreeCommunity, right: TreeCommunity) {
  return (
    rootRank(left.slug) - rootRank(right.slug) ||
    left.name.localeCompare(right.name, 'ru')
  );
}

// FORRUM_CATEGORY_PAGE_STAGE_1_V14
// FORRUM_SECTION_PAGE_LAYOUT_V14_7
export function CategoryPage({
  slug,
  initialData,
}: {
  slug: string;
  initialData: Community;
}) {
  const [data, setData] = useState<Community | null>(initialData);
  const [error, setError] = useState('');
  const [treeCommunities, setTreeCommunities] = useState<TreeCommunity[]>([]);
  const [treeLoading, setTreeLoading] = useState(true);
  const [treeError, setTreeError] = useState('');
  const [expanded, setExpanded] = useState<Set<string>>(
    () =>
      new Set([
        ...initialData.ancestors.map((ancestor) => ancestor.slug),
        initialData.slug,
      ]),
  );
  const [workshopOpen, setWorkshopOpen] = useState(true);
  const [topicTab, setTopicTab] = useState<TopicTab>('all');
  const [topicSort, setTopicSort] = useState<TopicSort>('activity');

  const load = () =>
    api<Community>(`/communities/${slug}`)
      .then((value) => {
        setData(value);
        setError('');
      })
      .catch((cause) =>
        setError(
          cause instanceof Error
            ? cause.message
            : 'Не удалось обновить раздел',
        ),
      );

  useEffect(() => {
    setData(initialData);
    setError('');
    setExpanded(
      new Set([
        ...initialData.ancestors.map((ancestor) => ancestor.slug),
        initialData.slug,
      ]),
    );
  }, [initialData]);

  useEffect(() => {
    let cancelled = false;

    setTreeLoading(true);
    api<TreeCommunity[]>('/communities')
      .then((items) => {
        if (cancelled) return;
        setTreeCommunities(items);
        setTreeError('');
      })
      .catch((cause) => {
        if (cancelled) return;
        setTreeCommunities([]);
        setTreeError(
          cause instanceof Error
            ? cause.message
            : 'Не удалось загрузить дерево разделов',
        );
      })
      .finally(() => {
        if (!cancelled) setTreeLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  async function toggle() {
    if (!data) return;

    try {
      await api(`/communities/${slug}/subscribe`, {
        method: data.isSubscribed ? 'DELETE' : 'POST',
      });
      await load();
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : 'Не удалось изменить подписку',
      );
    }
  }

  const childrenByParent = useMemo(() => {
    const map = new Map<string, TreeCommunity[]>();

    for (const community of treeCommunities) {
      if (!community.parent) continue;
      map.set(community.parent.slug, [
        ...(map.get(community.parent.slug) ?? []),
        community,
      ]);
    }

    for (const [parentSlug, items] of map.entries()) {
      map.set(
        parentSlug,
        items
          .slice()
          .sort((left, right) =>
            left.name.localeCompare(right.name, 'ru'),
          ),
      );
    }

    return map;
  }, [treeCommunities]);

  const rootCommunities = useMemo(
    () =>
      treeCommunities
        .filter(
          (community) =>
            !community.parent && community.slug !== 'workshop',
        )
        .slice()
        .sort(sortRootCommunities),
    [treeCommunities],
  );

  const visibleTopics = useMemo(() => {
    if (!data) return [];

    let items = data.publications.filter(
      (publication) => publication.format === 'TOPIC',
    );

    if (topicTab === 'new') {
      const twoWeeksAgo = Date.now() - 14 * 24 * 60 * 60 * 1000;
      items = items.filter(
        (publication) =>
          new Date(publication.createdAt).getTime() >= twoWeeksAgo,
      );
    } else if (topicTab === 'discussed') {
      items = items.filter(
        (publication) =>
          publication.commentCount > 0 ||
          (publication.recentCommentCount ?? 0) > 0,
      );
    } else if (topicTab === 'unanswered') {
      items = items.filter(
        (publication) => publication.commentCount === 0,
      );
    }

    return items.slice().sort((left, right) => {
      const leftPinned =
        left.pinnedUntil &&
        new Date(left.pinnedUntil).getTime() > Date.now()
          ? 1
          : 0;
      const rightPinned =
        right.pinnedUntil &&
        new Date(right.pinnedUntil).getTime() > Date.now()
          ? 1
          : 0;

      if (leftPinned !== rightPinned) {
        return rightPinned - leftPinned;
      }

      if (topicTab === 'discussed') {
        return (
          (right.recentCommentCount ?? 0) -
            (left.recentCommentCount ?? 0) ||
          right.commentCount - left.commentCount ||
          right.reactionCount - left.reactionCount
        );
      }

      if (topicTab === 'new' || topicSort === 'new') {
        return (
          new Date(right.createdAt).getTime() -
          new Date(left.createdAt).getTime()
        );
      }

      if (topicSort === 'popular') {
        return (
          right.commentCount +
          right.reactionCount -
          (left.commentCount + left.reactionCount)
        );
      }

      return (
        new Date(
          right.lastActivityAt ?? right.createdAt,
        ).getTime() -
        new Date(
          left.lastActivityAt ?? left.createdAt,
        ).getTime()
      );
    });
  }, [data, topicSort, topicTab]);

  function toggleTree(slugToToggle: string) {
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(slugToToggle)) next.delete(slugToToggle);
      else next.add(slugToToggle);
      return next;
    });
  }

  function renderTreeNode(
    community: TreeCommunity,
    depth = 0,
  ): React.ReactNode {
    const children = childrenByParent.get(community.slug) ?? [];
    const expandable = children.length > 0;
    const open = expanded.has(community.slug);
    const active = community.slug === data?.slug;

    return (
      <div
        className="section-tree-node"
        data-depth={Math.min(depth, 3)}
        key={community.id}
      >
        <div
          className={`section-tree-row ${
            expandable ? 'expandable' : 'leaf'
          } ${open ? 'opened' : ''} ${active ? 'active' : ''}`}
          onClick={(event) => {
            if (!expandable) return;
            const target = event.target as HTMLElement;
            if (target.closest('a, button')) return;
            toggleTree(community.slug);
          }}
        >
          <Link
            className="section-tree-icon-link"
            href={`/communities/${community.slug}`}
            aria-label={`Открыть ${community.name}`}
            aria-current={active ? 'page' : undefined}
          >
            <span className="section-tree-icon">
              <CommunityMark
                name={community.name}
                url={community.avatarUrl}
                size={22}
              />
            </span>
          </Link>

          <Link
            className="section-tree-name-link"
            href={`/communities/${community.slug}`}
            aria-current={active ? 'page' : undefined}
          >
            {community.name}
          </Link>

          {expandable ? (
            <button
              type="button"
              className="section-tree-chevron"
              aria-label={
                open
                  ? `Свернуть ${community.name}`
                  : `Развернуть ${community.name}`
              }
              aria-expanded={open}
              onClick={() => toggleTree(community.slug)}
            >
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="m4 6 4 4 4-4" />
              </svg>
            </button>
          ) : (
            <span
              className="section-tree-leaf-line"
              aria-hidden="true"
            />
          )}
        </div>

        {expandable && open && (
          <div className="section-tree-children">
            {children.map((child) =>
              renderTreeNode(child, depth + 1),
            )}
          </div>
        )}
      </div>
    );
  }

  if (!data) {
    return (
      <div className={error ? 'error-box' : 'card'}>
        {error || 'Загрузка раздела…'}
      </div>
    );
  }

  const curator =
    data.team.find((item) => item.role === 'CURATOR') ??
    data.team[0];

  return (
    <div className="section-page-v14-4">
      <div className="section-page-layout">
        <aside
          className="section-category-tree"
          aria-label="Категории и подразделы"
        >
          <div className="section-tree-heading">
            <strong>Категории</strong>
          </div>

          <div className="section-tree-workshop">
            <div
              className={`section-tree-row section-workshop-row ${
                workshopOpen ? 'opened' : ''
              }`}
              onClick={(event) => {
                const target = event.target as HTMLElement;
                if (target.closest('a, button')) return;
                setWorkshopOpen((current) => !current);
              }}
            >
              <Link
                className="section-tree-icon-link"
                href="/workshop"
                aria-label="Открыть Мастерскую"
              >
                <span
                  className="section-tree-icon workshop"
                  aria-hidden="true"
                >
                  ⛏
                </span>
              </Link>

              <Link
                className="section-tree-name-link"
                href="/workshop"
              >
                Мастерская
              </Link>

              <button
                type="button"
                className="section-tree-chevron"
                aria-label={
                  workshopOpen
                    ? 'Свернуть Мастерскую'
                    : 'Развернуть Мастерскую'
                }
                aria-expanded={workshopOpen}
                onClick={() =>
                  setWorkshopOpen((current) => !current)
                }
              >
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="m4 6 4 4 4-4" />
                </svg>
              </button>
            </div>

            {workshopOpen && (
              <div className="section-tree-static-children">
                {workshopNavigation.map((item) => (
                  <Link href={item.href} key={item.label}>
                    <span aria-hidden="true">−</span>
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div
            className="section-tree-separator"
            aria-hidden="true"
          />

          {treeLoading ? (
            <div
              className="section-tree-loading"
              aria-label="Загружаем категории"
            >
              {Array.from({ length: 6 }).map((_, index) => (
                <span key={index} />
              ))}
            </div>
          ) : treeError ? (
            <p className="section-tree-error">{treeError}</p>
          ) : (
            <nav className="section-tree-list">
              {rootCommunities.map((community) =>
                renderTreeNode(community),
              )}
            </nav>
          )}
        </aside>

        <div className="section-page-content">
          {/* FORRUM_SECTION_PAGE_HEADER_V14_3 */}
          <nav
            className="section-breadcrumbs"
            aria-label="Хлебные крошки"
          >
            <Link href="/">Главная</Link>
            <span
              className="section-breadcrumbs-separator"
              aria-hidden="true"
            >
              ›
            </span>
            <Link href="/communities">Сообщества</Link>
            {data.ancestors.map((ancestor) => (
              <span
                key={ancestor.slug}
                className="section-breadcrumbs-segment"
              >
                <span
                  className="section-breadcrumbs-separator"
                  aria-hidden="true"
                >
                  ›
                </span>
                <Link href={`/communities/${ancestor.slug}`}>
                  {ancestor.name}
                </Link>
              </span>
            ))}
            <span
              className="section-breadcrumbs-separator"
              aria-hidden="true"
            >
              ›
            </span>
            <span
              className="section-breadcrumbs-current"
              aria-current="page"
            >
              {data.name}
            </span>
          </nav>

          <section
            className="section-identity"
            style={
              {
                '--community-accent': data.accentColor,
              } as React.CSSProperties
            }
          >
            <div
              className="section-identity-mark"
              aria-hidden="true"
            >
              <CommunityMark
                name={data.name}
                url={data.avatarUrl}
                size={52}
              />
            </div>

            <div className="section-identity-copy">
              <h1>{data.name}</h1>
              <p>{data.shortDescription || data.description}</p>

              <div className="section-identity-meta">
                {curator ? (
                  <span className="section-identity-curator">
                    <Avatar
                      name={curator.user.displayName}
                      size={24}
                      url={curator.user.avatarUrl}
                    />
                    <span>
                      Куратор:{' '}
                      <Link
                        href={`/u/${curator.user.username}`}
                      >
                        @{curator.user.username}
                      </Link>
                    </span>
                  </span>
                ) : (
                  <span>Куратор не назначен</span>
                )}

                <span
                  className="section-identity-dot"
                  aria-hidden="true"
                >
                  ·
                </span>
                <span>
                  {formatNumber(data.subscriberCount)} подписчиков
                </span>
              </div>
            </div>

            <div className="section-identity-actions">
              <button
                type="button"
                className="section-subscribe"
                onClick={toggle}
                aria-pressed={data.isSubscribed}
              >
                <span aria-hidden="true">
                  {data.isSubscribed ? '✓' : '＋'}
                </span>
                {data.isSubscribed
                  ? 'Вы подписаны'
                  : 'Подписаться'}
              </button>

              <Link
                className="section-create-topic"
                href={`/create?community=${encodeURIComponent(data.slug)}&format=TOPIC`}
              >
                <span aria-hidden="true">＋</span>
                Создать тему
              </Link>
            </div>
          </section>

          {error && (
            <div className="section-page-error">{error}</div>
          )}

          <section
            className="section-topic-table"
            aria-labelledby="section-topic-heading"
          >
            <div className="section-topic-toolbar">
              <div className="section-topic-toolbar-main">
                <h2 id="section-topic-heading">Темы</h2>
                <nav aria-label="Фильтр тем">
                  {topicTabs.map((tab) => (
                    <button
                      type="button"
                      className={
                        topicTab === tab.key ? 'active' : ''
                      }
                      onClick={() => setTopicTab(tab.key)}
                      key={tab.key}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              <label className="section-topic-sort">
                <span>Сортировка:</span>
                <select
                  value={topicSort}
                  onChange={(event) =>
                    setTopicSort(
                      event.target.value as TopicSort,
                    )
                  }
                >
                  <option value="activity">
                    Последняя активность
                  </option>
                  <option value="new">Сначала новые</option>
                  <option value="popular">
                    Самые обсуждаемые
                  </option>
                </select>
              </label>
            </div>

            <div
              className="section-topic-table-head"
              aria-hidden="true"
            >
              <span>Тема</span>
              <span>Автор</span>
              <span>Ответы</span>
              <span>Просмотры</span>
            </div>

            <div className="section-topic-list">
              {visibleTopics.length > 0 ? (
                visibleTopics.map((item) => {
                  const pinned =
                    Boolean(item.pinnedUntil) &&
                    new Date(
                      item.pinnedUntil as string,
                    ).getTime() > Date.now();
                  const active =
                    (item.recentCommentCount ?? 0) > 0;

                  return (
                    <article
                      className={`section-topic-row ${
                        active ? 'recent' : ''
                      }`}
                      key={item.id}
                    >
                      <div className="section-topic-main">
                        <span
                          className={`section-topic-state ${
                            pinned
                              ? 'pinned'
                              : active
                                ? 'active'
                                : 'quiet'
                          }`}
                          title={
                            pinned
                              ? 'Закреплённая тема'
                              : active
                                ? 'Есть новые ответы'
                                : 'Тема'
                          }
                          aria-label={
                            pinned
                              ? 'Закреплённая тема'
                              : active
                                ? 'Есть новые ответы'
                                : 'Тема'
                          }
                        >
                          {pinned ? '◆' : active ? '●' : '·'}
                        </span>

                        <Link
                          className="section-topic-visual"
                          href={`/p/${item.slug}`}
                          aria-label={`Открыть ${
                            item.title ||
                            item.excerpt.slice(0, 80)
                          }`}
                        >
                          <img
                            src={topicVisual(
                              item.community.slug,
                            )}
                            alt=""
                            aria-hidden="true"
                          />
                        </Link>

                        <div className="section-topic-copy">
                          <Link
                            className="section-topic-title"
                            href={`/p/${item.slug}`}
                          >
                            {item.title ||
                              item.excerpt.slice(0, 100)}
                          </Link>

                          <p>
                            {item.excerpt ||
                              'Обсуждение сообщества FORRUM.'}
                          </p>

                          {item.inheritedFromChild && (
                            <Link
                              className="section-topic-source"
                              href={`/communities/${item.community.slug}`}
                            >
                              {item.community.name}
                            </Link>
                          )}
                        </div>
                      </div>

                      <div className="section-topic-author">
                        <Avatar
                          name={item.author.displayName}
                          size={28}
                          url={item.author.avatarUrl}
                        />
                        <Link
                          href={`/u/${item.author.username}`}
                        >
                          @{item.author.username}
                        </Link>
                      </div>

                      <span className="section-topic-count">
                        {formatNumber(item.commentCount)}
                      </span>

                      <span className="section-topic-count">
                        {formatNumber(item.viewCount ?? 0)}
                      </span>
                    </article>
                  );
                })
              ) : (
                <div className="section-topic-empty">
                  <strong>Тем по этому фильтру пока нет</strong>
                  <span>
                    Выберите другую вкладку или создайте первую
                    тему.
                  </span>
                  <Link
                    href={`/create?community=${encodeURIComponent(data.slug)}&format=TOPIC`}
                  >
                    Создать тему
                  </Link>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
