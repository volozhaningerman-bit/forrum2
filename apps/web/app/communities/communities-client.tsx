'use client';

import Link from 'next/link';
import { CommunityMark } from '@/components/community-mark';
// FORRUM_TREE_INTERACTION_V8
import type {
  CSSProperties,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
} from 'react';
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
  } | null;
  parent: {
    slug: string;
    name: string;
  } | null;
};

type Scope = 'all' | 'subscribed';
type Sort = 'active' | 'subscribers' | 'name';

const formatNumber = (value: number) =>
  new Intl.NumberFormat('ru-RU').format(value);


const navigationIcons: Record<string, string> = {
  'forrum-start': '/forrum-assets/nav-forrum.svg',
  'forrum-feedback': '/forrum-assets/nav-feedback.svg',
  'internet-projects': '/forrum-assets/nav-projects.svg',
  'launches-and-teams': '/forrum-assets/nav-launches.svg',
  promotion: '/forrum-assets/nav-promotion.svg',
  'seo-and-traffic': '/forrum-assets/nav-seo.svg',
  'gta-rp': '/forrum-assets/nav-gaming.svg',
  'majestic-rp': '/forrum-assets/nav-majestic.svg',
  telegram: '/forrum-assets/nav-telegram.svg',
  'telegram-bots': '/forrum-assets/nav-bots.svg',
};

function navigationIcon(slug: string) {
  return (
    navigationIcons[slug] ||
    '/forrum-assets/nav-default.svg'
  );
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
  const [scope, setScope] = useState<Scope>('all');
  const [sort, setSort] = useState<Sort>('active');
  const [expanded, setExpanded] = useState<
    Set<string>
  >(() => new Set());

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

  function containsSubscription(
    item: Community,
  ): boolean {
    return (
      item.isSubscribed ||
      collectDescendants(item.slug).some(
        (child) => child.isSubscribed,
      )
    );
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

    const queryMatch =
      ownMatch || children.some(branchMatches);

    const scopeMatch =
      scope === 'all' || containsSubscription(item);

    return queryMatch && scopeMatch;
  }

  function activity(item: Community): number {
    const own = item.lastActivityAt
      ? new Date(item.lastActivityAt).getTime()
      : 0;

    return Math.max(
      own,
      ...(childrenByParent.get(item.slug) ?? []).map(
        activity,
      ),
      0,
    );
  }

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

      return activity(right) - activity(left);
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
      scope,
      sort,
    ],
  );

  function toggleOpen(slug: string) {
    setExpanded((current) => {
      const next = new Set(current);

      if (next.has(slug)) next.delete(slug);
      else next.add(slug);

      return next;
    });
  }

  function stop(event: MouseEvent<HTMLElement>) {
    event.stopPropagation();
  }

  function keyboard(
    event: KeyboardEvent<HTMLElement>,
    open: boolean,
    expandable: boolean,
    toggleCurrent: () => void,
  ) {
    if (!expandable) return;

    if (
      event.key === 'Enter' ||
      event.key === ' '
    ) {
      event.preventDefault();
      toggleCurrent();
      return;
    }

    if (event.key === 'ArrowRight' && !open) {
      event.preventDefault();
      toggleCurrent();
      return;
    }

    if (event.key === 'ArrowLeft' && open) {
      event.preventDefault();
      toggleCurrent();
    }
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

  function renderBranch(
    item: Community,
    depth = 0,
  ): ReactNode {
    const children = sorted(
      (
        childrenByParent.get(item.slug) ?? []
      ).filter(branchMatches),
    );

    const expandable = children.length > 0;
    const open =
      Boolean(normalized) || expanded.has(item.slug);
    const toggleCurrent = () => toggleOpen(item.slug);

    return (
      <section
        className="community-browser-node"
        key={item.id}
      >
        <article
          id={`community-${item.slug}`}
          className={`community-browser-row ${
            expandable ? 'expandable' : ''
          } ${open ? 'opened' : 'closed'}`}
          style={
            {
              '--tree-depth': Math.min(depth, 4),
            } as CSSProperties
          }
        >
          <Link
            className="community-browser-main-link"
            href={`/communities/${item.slug}`}
          >
            <CommunityMark
              name={item.name}
              url={navigationIcon(item.slug)}
              size={34}
            />
            <div className="community-browser-copy">
              <div className="community-browser-title">
                <strong>{item.name}</strong>
                {item.isSubscribed && (
                  <span className="community-followed">
                    Вы подписаны
                  </span>
                )}
              </div>

              <p>
                {item.shortDescription ||
                  item.description}
              </p>

              <div className="community-browser-meta">
                <span>
                  {formatNumber(item.subscriberCount)}{' '}
                  подписчиков
                </span>
                <span>
                  {formatNumber(item.publicationCount)}{' '}
                  публикаций
                </span>
                {item.lastActivityAt && (
                  <span>
                    Активность{' '}
                    {formatRelativeTime(
                      item.lastActivityAt,
                    )}
                  </span>
                )}
                {item.curator && (
                  <span>
                    Куратор: {item.curator.displayName}
                  </span>
                )}
              </div>
            </div>
          </Link>

          {expandable ? (
            <>
              <button
                type="button"
                className="community-browser-hitarea"
                aria-label={
                  open
                    ? `Свернуть подразделы ${item.name}`
                    : `Показать подразделы ${item.name}`
                }
                aria-expanded={open}
                onClick={toggleCurrent}
                onKeyDown={(event) =>
                  keyboard(
                    event,
                    open,
                    expandable,
                    toggleCurrent,
                  )
                }
              >
                <span className="visually-hidden">
                  {open ? 'Свернуть' : 'Развернуть'}
                </span>
              </button>

              <button
                type="button"
                className="community-browser-chevron"
                aria-label={
                  open
                    ? `Свернуть подразделы ${item.name}`
                    : `Показать подразделы ${item.name}`
                }
                aria-expanded={open}
                onClick={toggleCurrent}
                onKeyDown={(event) =>
                  keyboard(
                    event,
                    open,
                    expandable,
                    toggleCurrent,
                  )
                }
              >
                <span aria-hidden="true">
                  {open ? '−' : '+'}
                </span>
              </button>
            </>
          ) : (
            <span
              className="community-browser-spacer"
              aria-hidden="true"
            />
          )}

          <div className="community-browser-actions">
            <Link
              className="button ghost small"
              href={`/communities/${item.slug}`}
            >
              Открыть
            </Link>
            <button
              type="button"
              className={`button small ${
                item.isSubscribed ? 'secondary' : ''
              }`}
              disabled={busy === item.slug}
              onClick={(event) =>
                void changeSubscription(item, event)
              }
            >
              {busy === item.slug
                ? 'Сохраняем…'
                : item.isSubscribed
                  ? 'Отписаться'
                  : 'Подписаться'}
            </button>
          </div>
        </article>

        {expandable && open && (
          <div className="community-browser-children">
            {children.map((child) =>
              renderBranch(child, depth + 1),
            )}
          </div>
        )}
      </section>
    );
  }
  return (
    <div className="community-browser-page">
      <header className="compact-page-heading">
        <div>
          <h1>Сообщества</h1>
          <p>
            Направления, подразделы и активность
            FORRUM.
          </p>
        </div>

        <Link
          className="button"
          href="/communities/proposals"
        >
          Предложить сообщество
        </Link>
      </header>

      <section
        className="compact-filterbar"
        aria-label="Настройка каталога"
      >
        <label className="compact-search-field">
          <span className="visually-hidden">
            Поиск
          </span>
          <input
            value={query}
            onChange={(event) =>
              setQuery(event.target.value)
            }
            placeholder="Название или тема сообщества"
          />
        </label>

        <label>
          <span>Показывать</span>
          <select
            value={scope}
            onChange={(event) =>
              setScope(event.target.value as Scope)
            }
          >
            <option value="all">
              Все сообщества
            </option>
            <option value="subscribed">
              Только мои подписки
            </option>
          </select>
        </label>

        <label>
          <span>Порядок</span>
          <select
            value={sort}
            onChange={(event) =>
              setSort(event.target.value as Sort)
            }
          >
            <option value="active">
              По активности
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
        <aside className="community-browser-index">
          <strong>Направления</strong>

          <nav>
            {roots.map((root) => (
              <a
                key={root.id}
                href={`#community-${root.slug}`}
                onClick={() =>
                  setExpanded((current) => {
                    const next = new Set(current);
                    next.add(root.slug);
                    return next;
                  })
                }
              >
                <span>{root.name}</span>
                <small>
                  {formatNumber(
                    root.subscriberCount,
                  )}
                </small>
              </a>
            ))}
          </nav>

          <Link
            className="home-panel-footer"
            href="/communities/proposals"
          >
            Предложения
            <span aria-hidden="true">→</span>
          </Link>
        </aside>

        <main className="community-browser-list">
          {loading ? (
            <div
              className="compact-row-skeletons"
              aria-label="Загружаем сообщества"
            >
              {Array.from({ length: 8 }).map(
                (_, index) => (
                  <span key={index} />
                ),
              )}
            </div>
          ) : roots.length ? (
            roots.map((root) => renderBranch(root))
          ) : (
            <div className="compact-empty-state">
              <strong>
                {scope === 'subscribed'
                  ? 'Подписок пока нет'
                  : 'Ничего не найдено'}
              </strong>
              <span>
                {scope === 'subscribed'
                  ? 'Подпишитесь на сообщества, чтобы собрать собственную структуру.'
                  : 'Сократите запрос или сбросьте фильтры.'}
              </span>
              <button
                type="button"
                className="button ghost small"
                onClick={() => {
                  setQuery('');
                  setScope('all');
                }}
              >
                Сбросить фильтры
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
