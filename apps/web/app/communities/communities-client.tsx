'use client';

import Link from 'next/link';
import { CommunityMark } from '@/components/community-mark';
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
  const [sort, setSort] = useState<Sort>('default');
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

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
    const selected = selectedSlug === item.slug;

    return (
      <article
        id={`community-${item.slug}`}
        className={`communities-v12-catalogue-row ${
          selected ? 'selected' : ''
        }`}
        key={item.id}
      >
        <div className="communities-v12-catalogue-community">
          <span
            className="communities-v12-catalogue-mark-shell"
            style={{ color: item.accentColor }}
          >
            <CommunityMark
              name={item.name}
              url={item.avatarUrl || navigationIcon(item.slug)}
              size={48}
              className="communities-v12-catalogue-mark"
            />
          </span>

          <div className="communities-v12-catalogue-copy">
            <Link
              className="communities-v12-catalogue-name"
              href={`/communities/${item.slug}`}
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
          aria-label={`Открыть структуру ${item.name}`}
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
            <header className="communities-v12-hero" aria-labelledby="communities-title">
        <div className="communities-v12-hero-main">
          <span className="communities-v12-hero-icon" aria-hidden="true">
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

        <div className="communities-v12-hero-actions" aria-label="Действия сообщества">
          <Link className="communities-v12-hero-primary" href="/communities/proposals">
            Предложить сообщество
            <span aria-hidden="true">＋</span>
          </Link>
          <Link className="communities-v12-hero-secondary" href="/#become-curator">
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

        <main className="community-browser-list communities-v12-catalogue">
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
              {Array.from({ length: 8 }).map(
                (_, index) => (
                  <span key={index} />
                ),
              )}
            </div>
          ) : roots.length ? (
            roots.map((root) => renderCatalogueRow(root))
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
  );
}
