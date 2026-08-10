'use client';

import Link from 'next/link';
// FORRUM_TREE_INTERACTION_V8
import type { MouseEvent } from 'react';
import {
  useEffect,
  useMemo,
  useState,
} from 'react';
import { api } from '@/lib/api';
import { formatRelativeTime } from '@/lib/format';

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
  recentPublicationCount: number;
  lastActivityAt: string | null;
  childCount: number;
  isSubscribed: boolean;
  curator: {
    username: string;
    displayName: string;
    avatarUrl?: string | null;
  } | null;
  parent: {
    slug: string;
    name: string;
  } | null;
};

type Sort = 'default' | 'subscribers' | 'name';

const formatNumber = (value: number) =>
  new Intl.NumberFormat('ru-RU').format(value);


const workshopRoutes: Record<string, string> = {
  workshop: '/workshop',
  'workshop-projects': '/workshop?section=projects',
  'workshop-solutions': '/workshop?section=solutions',
  'workshop-teams': '/workshop?section=teams',
};

function communityHref(slug: string) {
  return workshopRoutes[slug] ?? `/communities/${slug}`;
}

function communityTone(slug: string) {
  if (slug.startsWith('workshop')) return 'workshop';
  if (slug.includes('internet') || slug.includes('launch')) return 'internet';
  if (slug.includes('promotion') || slug.includes('seo')) return 'promotion';
  if (slug.includes('forrum')) return 'forrum';
  if (slug.includes('gta') || slug.includes('majestic')) return 'gta';
  if (slug.includes('telegram')) return 'telegram';
  return 'neutral';
}

function CommunityGlyph({
  slug,
  compact = false,
}: {
  slug: string;
  compact?: boolean;
}) {
  const tone = communityTone(slug);
  let icon = (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="7" />
      <path d="M12 5v14M5 12h14" />
    </svg>
  );

  if (slug === 'workshop' || slug.startsWith('workshop-')) {
    icon = (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m14 6 4-4 4 4-4 4M10 18l-4 4-4-4 4-4" />
        <path d="m8 8 8 8M5 5l14 14" />
      </svg>
    );
  } else if (slug.includes('internet') || slug.includes('launch')) {
    icon = (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="8" />
        <path d="M4 12h16M12 4c2.2 2.3 3.3 5 3.3 8S14.2 17.7 12 20M12 4c-2.2 2.3-3.3 5-3.3 8S9.8 17.7 12 20" />
      </svg>
    );
  } else if (slug.includes('promotion') || slug.includes('seo')) {
    icon = (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 13h3l8 4V7l-8 4H4v2Z" />
        <path d="M7 13l1.5 5M18 9.5c1 .8 1.5 1.6 1.5 2.5S19 13.7 18 14.5" />
      </svg>
    );
  } else if (slug.includes('forrum')) {
    icon = (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 19 12 4l7 15-7-3-7 3Z" />
        <path d="M12 8v8" />
      </svg>
    );
  } else if (slug.includes('gta') || slug.includes('majestic')) {
    icon = (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 9h10a4 4 0 0 1 3.7 5.5l-1 2.5a2 2 0 0 1-3.2.8L14.5 16h-5l-2 1.8a2 2 0 0 1-3.2-.8l-1-2.5A4 4 0 0 1 7 9Z" />
        <path d="M8 12v3M6.5 13.5h3M16.5 12.5h.01M18 14h.01" />
      </svg>
    );
  } else if (slug.includes('telegram')) {
    icon = (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m3 11 17-7-5 16-4-6-8-3Z" />
        <path d="m11 14 4-4" />
      </svg>
    );
  }

  return (
    <span
      className={`communities-v12-glyph ${compact ? 'compact' : ''}`}
      data-tone={tone}
      aria-hidden="true"
    >
      {icon}
    </span>
  );
}

function pluralRu(
  value: number,
  one: string,
  few: string,
  many: string,
) {
  const mod100 = Math.abs(value) % 100;
  const mod10 = mod100 % 10;
  const form =
    mod100 >= 11 && mod100 <= 19
      ? many
      : mod10 === 1
        ? one
        : mod10 >= 2 && mod10 <= 4
          ? few
          : many;

  return `${formatNumber(value)} ${form}`;
}

export function CommunitiesClient({
  initialItems,
}: {
  initialItems: Community[];
}) {
  const [items, setItems] =
    useState<Community[]>(initialItems);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState('');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<Sort>('default');
  const [selectedSlug, setSelectedSlug] = useState<string | null>('internet-projects');

  async function load() {
    setLoading(true);
    setError('');

    try {
      setItems(await api<Community[]>('/communities'));
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : 'Не удалось загрузить сообщества',
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setItems(initialItems);
    setLoading(false);
  }, [initialItems]);

  const childrenByParent = useMemo(() => {
    const map = new Map<string, Community[]>();

    for (const item of items) {
      if (!item.parent) continue;

      map.set(item.parent.slug, [
        ...(map.get(item.parent.slug) ?? []),
        item,
      ]);
    }

    return map;
  }, [items]);

  const normalized = query.trim().toLowerCase();

  function collectDescendants(
    rootSlug: string,
  ): Community[] {
    const result: Community[] = [];
    const visited = new Set<string>();

    function visit(parentSlug: string) {
      for (
        const child of
        childrenByParent.get(parentSlug) ?? []
      ) {
        if (visited.has(child.slug)) continue;

        visited.add(child.slug);
        result.push(child);
        visit(child.slug);
      }
    }

    visit(rootSlug);

    return result;
  }

  function branchMatches(item: Community): boolean {
    const ownMatch =
      !normalized ||
      `${item.name} ${item.description} ${
        item.shortDescription ?? ''
      }`
        .toLowerCase()
        .includes(normalized);
    const children =
      childrenByParent.get(item.slug) ?? [];

    return ownMatch || children.some(branchMatches);
  }


  const canonicalRootOrder = [
    'workshop',
    'internet-projects',
    'promotion',
    'forrum-start',
    'gta-rp',
    'telegram',
  ];

  function sorted(list: Community[]) {
    return [...list].sort((left, right) => {
      if (sort === 'name') {
        return left.name.localeCompare(
          right.name,
          'ru',
        );
      }

      if (sort === 'subscribers') {
        return (
          right.subscriberCount -
          left.subscriberCount
        );
      }

      if (!left.parent && !right.parent) {
        const leftIndex =
          canonicalRootOrder.indexOf(left.slug);
        const rightIndex =
          canonicalRootOrder.indexOf(right.slug);

        if (leftIndex !== rightIndex) {
          if (leftIndex < 0) return 1;
          if (rightIndex < 0) return -1;
          return leftIndex - rightIndex;
        }
      }

      return left.name.localeCompare(
        right.name,
        'ru',
      );
    });
  }

  const roots = useMemo(
    () =>
      sorted(
        items.filter(
          (item) =>
            !item.parent && branchMatches(item),
        ),
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      items,
      childrenByParent,
      normalized,
      sort,
    ],
  );

  const itemBySlug = useMemo(
    () => new Map(items.map((item) => [item.slug, item])),
    [items],
  );

  const selectedItem = selectedSlug
    ? itemBySlug.get(selectedSlug) ?? null
    : null;

  const selectedRootSlug = useMemo(() => {
    let current = selectedItem;
    let guard = 0;

    while (current?.parent && guard < 20) {
      const parent = itemBySlug.get(current.parent.slug);
      if (!parent) break;
      current = parent;
      guard += 1;
    }

    return current?.slug ?? null;
  }, [itemBySlug, selectedItem]);

  const selectedChildren = selectedItem
    ? childrenByParent.get(selectedItem.slug) ?? []
    : [];

  function hierarchyTrail(item: Community) {
    const trail: Community[] = [];
    let current: Community | null = item;
    let guard = 0;

    while (current && guard < 20) {
      trail.unshift(current);
      current = current.parent
        ? itemBySlug.get(current.parent.slug) ?? null
        : null;
      guard += 1;
    }

    return trail;
  }

  async function changeSubscription(
    item: Community,
    event: MouseEvent<HTMLButtonElement>,
  ) {
    event.stopPropagation();
    setBusy(item.slug);
    setError('');

    try {
      await api(`/communities/${item.slug}/subscribe`, {
        method: item.isSubscribed ? 'DELETE' : 'POST',
      });
      await load();
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : 'Не удалось изменить подписку',
      );
    } finally {
      setBusy('');
    }
  }

  function curatorInitial(item: Community) {
    const source =
      item.curator?.displayName ||
      item.curator?.username ||
      'F';

    return source.trim().slice(0, 1).toUpperCase();
  }

  function renderCatalogueRow(item: Community) {
    const selected = selectedRootSlug === item.slug;

    return (
      <article
        id={`community-${item.slug}`}
        className={`communities-v12-catalogue-row ${
          selected ? 'selected' : ''
        }`}
        key={item.id}
      >
        <div className="communities-v12-catalogue-community">
          <Link
            className="communities-v12-catalogue-icon-link"
            href={communityHref(item.slug)}
            aria-label={`Открыть ${item.name}`}
          >
            <CommunityGlyph slug={item.slug} />
          </Link>

          <div className="communities-v12-catalogue-copy">
            <Link
              className="communities-v12-catalogue-name"
              href={communityHref(item.slug)}
            >
              {item.name}
            </Link>
            <p>
              {item.shortDescription || item.description}
            </p>
          </div>
        </div>

        <div className="communities-v12-catalogue-curator">
          {item.curator ? (
            <>
              <span
                className="communities-v12-curator-avatar"
                aria-hidden="true"
              >
                {item.curator.avatarUrl ? (
                  <img
                    src={item.curator.avatarUrl}
                    alt=""
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  curatorInitial(item)
                )}
              </span>
              <span className="communities-v12-curator-name">
                @{item.curator.username}
              </span>
            </>
          ) : (
            <span className="communities-v12-curator-empty">
              —
            </span>
          )}
        </div>

        <div className="communities-v12-catalogue-subscribers">
          {formatNumber(item.subscriberCount)}
        </div>

        <button
          type="button"
          className={`communities-v12-subscribe ${
            item.isSubscribed ? 'subscribed' : ''
          }`}
          disabled={busy === item.slug}
          onClick={(event) =>
            void changeSubscription(item, event)
          }
        >
          {busy === item.slug
            ? 'Сохраняем…'
            : item.isSubscribed
              ? '✓  Вы подписаны'
              : 'Подписаться'}
        </button>

        <button
          type="button"
          className="communities-v12-open-hierarchy"
          aria-label={`Показать подразделы ${item.name}`}
          aria-pressed={selected}
          onClick={() => setSelectedSlug(item.slug)}
        >
          <span aria-hidden="true">›</span>
        </button>
      </article>
    );
  }

  return (
    <div className="community-browser-page communities-v12-stage-a">
      <div className="communities-v12-desktop-grid">
        <div className="communities-v12-primary-column">
          <header
            className="communities-v12-hero"
            aria-labelledby="communities-title"
          >
            <div className="communities-v12-hero-main">
              <span
                className="communities-v12-hero-icon"
                aria-hidden="true"
              >
                <svg viewBox="0 0 32 32" focusable="false">
                  <circle cx="16" cy="11" r="4" />
                  <circle cx="7.5" cy="13" r="3" />
                  <circle cx="24.5" cy="13" r="3" />
                  <path d="M9.5 25v-2.2c0-4 2.9-7.1 6.5-7.1s6.5 3.1 6.5 7.1V25" />
                  <path d="M2.8 24.2v-1.7c0-3.1 2-5.5 4.7-5.5 1 0 1.9.3 2.6.8" />
                  <path d="M29.2 24.2v-1.7c0-3.1-2-5.5-4.7-5.5-1 0-1.9.3-2.6.8" />
                </svg>
              </span>

              <div className="communities-v12-hero-copy">
                <h1 id="communities-title">Сообщества</h1>
                <p>
                  Сообщества — основные направления FORRUM. Подписывайтесь,
                  участвуйте в обсуждениях и помогайте им развиваться.
                  За порядком и развитием следят кураторы, выбранные участниками.
                </p>
              </div>
            </div>

            <div
              className="communities-v12-hero-actions"
              aria-label="Действия сообщества"
            >
              <Link
                className="communities-v12-hero-primary"
                href="/communities/proposals"
              >
                Предложить сообщество
                <span aria-hidden="true">＋</span>
              </Link>
              <Link
                className="communities-v12-hero-secondary"
                href="/#become-curator"
              >
                Стать куратором
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </header>

          <section
            className="communities-v12-tools"
            aria-label="Поиск и сортировка сообществ"
          >
            <label className="communities-v12-search">
              <span className="visually-hidden">
                Найти сообщество или раздел
              </span>
              <span
                className="communities-v12-search-icon"
                aria-hidden="true"
              >
                <svg viewBox="0 0 24 24" focusable="false">
                  <circle cx="11" cy="11" r="6.5" />
                  <path d="m16 16 4 4" />
                </svg>
              </span>
              <input
                value={query}
                onChange={(event) =>
                  setQuery(event.target.value)
                }
                placeholder="Найти сообщество или раздел..."
                autoComplete="off"
              />
            </label>

            <label className="communities-v12-sort">
              <span className="visually-hidden">
                Сортировка сообществ
              </span>
              <select
                value={sort}
                onChange={(event) =>
                  setSort(event.target.value as Sort)
                }
              >
                <option value="default">
                  По умолчанию
                </option>
                <option value="subscribers">
                  По подписчикам
                </option>
                <option value="name">
                  По названию
                </option>
              </select>
            </label>
          </section>

          {error && (
            <div className="error-box">
              {error}
              <button
                type="button"
                className="button ghost small"
                onClick={() => void load()}
              >
                Повторить
              </button>
            </div>
          )}

          <div className="community-browser-layout">
            <main
              className="community-browser-list communities-v12-catalogue"
              aria-label="Каталог сообществ"
            >
              <div
                className="communities-v12-catalogue-head"
                aria-hidden="true"
              >
                <span>Сообщество</span>
                <span>Куратор</span>
                <span>Подписчики</span>
                <span />
                <span />
              </div>

              {loading ? (
                <div
                  className="compact-row-skeletons"
                  aria-label="Загружаем сообщества"
                >
                  {Array.from({ length: 6 }).map(
                    (_, index) => (
                      <span key={index} />
                    ),
                  )}
                </div>
              ) : roots.length ? (
                roots.map((root) =>
                  renderCatalogueRow(root),
                )
              ) : (
                <div className="compact-empty-state">
                  <strong>Ничего не найдено</strong>
                  <span>
                    Измените запрос или очистите поиск.
                  </span>
                  <button
                    type="button"
                    className="button ghost small"
                    onClick={() => {
                      setQuery('');
                      setSort('default');
                    }}
                  >
                    Очистить поиск
                  </button>
                </div>
              )}
            </main>
          </div>
        </div>

        <aside
          className="communities-v12-hierarchy-panel"
          aria-label="Иерархия выбранного сообщества"
        >
          {selectedItem ? (
            <>
              <div className="communities-v12-hierarchy-topbar">
                <nav
                  className="communities-v12-breadcrumbs"
                  aria-label="Путь сообщества"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedSlug(selectedRootSlug)
                    }
                  >
                    Сообщества
                  </button>
                  {hierarchyTrail(selectedItem).map(
                    (item, index, trail) => (
                      <span key={item.id}>
                        <i aria-hidden="true">/</i>
                        {index === trail.length - 1 ? (
                          <b>{item.name}</b>
                        ) : (
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedSlug(item.slug)
                            }
                          >
                            {item.name}
                          </button>
                        )}
                      </span>
                    ),
                  )}
                </nav>

                <button
                  type="button"
                  className="communities-v12-hierarchy-close"
                  aria-label="Сбросить выбранное сообщество"
                  onClick={() => setSelectedSlug(null)}
                >
                  ×
                </button>
              </div>

              <div className="communities-v12-hierarchy-identity">
                <CommunityGlyph slug={selectedItem.slug} />

                <div>
                  <Link
                    href={communityHref(selectedItem.slug)}
                    className="communities-v12-hierarchy-title"
                  >
                    {selectedItem.name}
                  </Link>
                  <p>
                    {selectedItem.shortDescription ||
                      selectedItem.description}
                  </p>

                  <div className="communities-v12-hierarchy-meta">
                    {selectedItem.curator ? (
                      <span>
                        Куратор:{' '}
                        <strong>
                          @{selectedItem.curator.username}
                        </strong>
                      </span>
                    ) : (
                      <span>Куратор не назначен</span>
                    )}
                    <i aria-hidden="true">•</i>
                    <span>
                      {pluralRu(
                        selectedItem.subscriberCount,
                        'подписчик',
                        'подписчика',
                        'подписчиков',
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <section className="communities-v12-hierarchy-section">
                <h2>Подразделы</h2>

                {selectedChildren.length ? (
                  <div className="communities-v12-hierarchy-children">
                    {selectedChildren.map((child) => (
                      <article
                        className="communities-v12-hierarchy-child"
                        key={child.id}
                      >
                        <Link
                          className="communities-v12-hierarchy-child-main"
                          href={communityHref(child.slug)}
                        >
                          <CommunityGlyph
                            slug={child.slug}
                            compact
                          />
                          <div>
                            <strong>{child.name}</strong>
                            <p>
                              {child.shortDescription ||
                                child.description}
                            </p>
                            <span>
                              {pluralRu(
                                child.publicationCount,
                                'тема',
                                'темы',
                                'тем',
                              )}
                              {'  •  '}
                              {pluralRu(
                                child.subscriberCount,
                                'подписчик',
                                'подписчика',
                                'подписчиков',
                              )}
                            </span>
                          </div>
                        </Link>

                        <button
                          type="button"
                          className="communities-v12-hierarchy-child-arrow"
                          aria-label={`Показать подразделы ${child.name}`}
                          onClick={() =>
                            setSelectedSlug(child.slug)
                          }
                        >
                          ›
                        </button>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="communities-v12-hierarchy-empty">
                    В этом сообществе пока нет подразделов.
                  </div>
                )}
              </section>
            </>
          ) : (
            <div className="communities-v12-hierarchy-placeholder">
              <span aria-hidden="true">→</span>
              <strong>Выберите сообщество</strong>
              <p>
                Стрелка в каталоге открывает его структуру
                здесь, не уводя со страницы.
              </p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
