'use client';

import Link from 'next/link';
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

type Community = {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription?: string | null;
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

export default function CommunitiesPage() {
  const [items, setItems] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);
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
    void load();
  }, []);

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
    slug: string,
    expandable: boolean,
  ) {
    if (!expandable) return;

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleOpen(slug);
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

    return (
      <section
        className="community-browser-node"
        key={item.id}
      >
        <article
          id={`community-${item.slug}`}
          className={`community-browser-row ${
            expandable ? 'expandable' : ''
          } ${open ? 'opened' : ''}`}
          style={
            {
              '--tree-depth': Math.min(depth, 4),
            } as CSSProperties
          }
          role={expandable ? 'button' : undefined}
          tabIndex={expandable ? 0 : undefined}
          aria-expanded={
            expandable ? open : undefined
          }
          onClick={
            expandable
              ? () => toggleOpen(item.slug)
              : undefined
          }
          onKeyDown={(event) =>
            keyboard(event, item.slug, expandable)
          }
        >
          <span
            className="community-browser-symbol"
            aria-hidden="true"
          >
            {item.name.slice(0, 1)}
          </span>

          <div className="community-browser-copy">
            <div className="community-browser-title">
              {expandable && (
                <button
                  type="button"
                  className="community-browser-chevron"
                  aria-label={
                    open
                      ? 'Свернуть подразделы'
                      : 'Показать подразделы'
                  }
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleOpen(item.slug);
                  }}
                >
                  {open ? '⌄' : '›'}
                </button>
              )}

              <Link
                href={`/communities/${item.slug}`}
                onClick={stop}
              >
                {item.name}
              </Link>

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
                  Куратор:{' '}
                  <Link
                    href={`/u/${item.curator.username}`}
                    onClick={stop}
                  >
                    {item.curator.displayName}
                  </Link>
                </span>
              )}
            </div>
          </div>

          <div className="community-browser-actions">
            <Link
              className="button ghost small"
              href={`/communities/${item.slug}`}
              onClick={stop}
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
