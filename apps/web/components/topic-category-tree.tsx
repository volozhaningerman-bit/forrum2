'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

import { api } from '@/lib/api';

type TopicTreeCommunity = {
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

function rootRank(slug: string) {
  const rank = preferredRootOrder.indexOf(slug);
  return rank === -1 ? preferredRootOrder.length + 1 : rank;
}

function sortRootCommunities(
  left: TopicTreeCommunity,
  right: TopicTreeCommunity,
) {
  return (
    rootRank(left.slug) - rootRank(right.slug) ||
    left.name.localeCompare(right.name, 'ru')
  );
}

function SectionGlyph({ slug }: { slug: string }) {
  const normalized = slug.toLowerCase();

  if (normalized === 'promotion') {
    return (
      <span className="section-symbol" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M4 11v2l10 4V7L4 11Z" />
          <path d="M14 9.5c2 .8 3 1.6 4.5 3.5" />
          <path d="M14 14.5c2-.8 3-1.6 4.5-3.5" />
          <path d="m7 14 1.6 5h3L10 15.2" />
        </svg>
      </span>
    );
  }

  if (normalized === 'seo-and-traffic') {
    return (
      <span className="section-symbol" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <circle cx="10" cy="10" r="5" />
          <path d="m14 14 5 5" />
          <path d="M5 19h6" />
          <path d="M5 16h3" />
        </svg>
      </span>
    );
  }

  if (
    normalized === 'internet-projects' ||
    normalized === 'launches-and-teams'
  ) {
    return (
      <span className="section-symbol" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="8" />
          <path d="M4 12h16" />
          <path d="M12 4c2.4 2.2 3.6 4.9 3.6 8S14.4 17.8 12 20" />
          <path d="M12 4C9.6 6.2 8.4 8.9 8.4 12S9.6 17.8 12 20" />
        </svg>
      </span>
    );
  }

  if (
    normalized === 'forrum-start' ||
    normalized === 'forrum-feedback'
  ) {
    return (
      <span className="section-symbol" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M14.5 4.5c2.5.2 4.8 2.4 5 5-2.4 5-6.2 8.7-11.3 11l-4.7-4.7c2.4-5.1 6.1-8.9 11-11.3Z" />
          <path d="M8 16 4 20" />
          <circle cx="14.5" cy="9.5" r="1.8" />
        </svg>
      </span>
    );
  }

  if (normalized === 'gta-rp' || normalized === 'majestic-rp') {
    return (
      <span className="section-symbol" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M7.5 8h9c2 0 3.2 1.1 3.7 3.4l.7 3.3c.4 2-.3 3.3-1.7 3.3-1 0-1.8-.6-2.8-2H7.6c-1 1.4-1.8 2-2.8 2-1.4 0-2.1-1.3-1.7-3.3l.7-3.3C4.3 9.1 5.5 8 7.5 8Z" />
          <path d="M7 11v4M5 13h4" />
          <circle cx="16.5" cy="12" r=".7" />
          <circle cx="18.5" cy="14" r=".7" />
        </svg>
      </span>
    );
  }

  if (normalized === 'telegram' || normalized === 'telegram-bots') {
    return (
      <span className="section-symbol" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="m3.5 11 16-6-4.2 15-5.1-5-3.2 2.5.5-4.5 8-5.4" />
        </svg>
      </span>
    );
  }

  return (
    <span className="section-symbol" aria-hidden="true">
      <svg viewBox="0 0 24 24">
        <rect x="5" y="5" width="14" height="14" rx="3" />
        <path d="M9 9h6M9 12h6M9 15h4" />
      </svg>
    </span>
  );
}

// FORRUM_TOPIC_TREE_FRAME_V15_4
export function TopicCategoryTree({
  activeSlug,
}: {
  activeSlug?: string | null;
}) {
  const [communities, setCommunities] =
    useState<TopicTreeCommunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expanded, setExpanded] = useState<Set<string>>(
    () => new Set(activeSlug ? [activeSlug] : []),
  );
  const [workshopOpen, setWorkshopOpen] = useState(true);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);

    api<TopicTreeCommunity[]>('/communities')
      .then((items) => {
        if (cancelled) return;
        setCommunities(items);
        setError('');
      })
      .catch((cause) => {
        if (cancelled) return;
        setCommunities([]);
        setError(
          cause instanceof Error
            ? cause.message
            : 'Не удалось загрузить дерево разделов',
        );
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const bySlug = useMemo(
    () =>
      new Map(
        communities.map((community) => [
          community.slug,
          community,
        ]),
      ),
    [communities],
  );

  const childrenByParent = useMemo(() => {
    const map = new Map<string, TopicTreeCommunity[]>();

    for (const community of communities) {
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
  }, [communities]);

  const rootCommunities = useMemo(
    () =>
      communities
        .filter(
          (community) =>
            !community.parent && community.slug !== 'workshop',
        )
        .slice()
        .sort(sortRootCommunities),
    [communities],
  );

  useEffect(() => {
    if (!activeSlug || !communities.length) return;

    setExpanded((current) => {
      const next = new Set(current);
      let cursor = bySlug.get(activeSlug);

      next.add(activeSlug);

      while (cursor?.parent) {
        next.add(cursor.parent.slug);
        cursor = bySlug.get(cursor.parent.slug);
      }

      return next;
    });
  }, [activeSlug, bySlug, communities.length]);

  function toggleTree(slugToToggle: string) {
    setExpanded((current) => {
      const next = new Set(current);

      if (next.has(slugToToggle)) {
        next.delete(slugToToggle);
      } else {
        next.add(slugToToggle);
      }

      return next;
    });
  }

  function renderTreeNode(
    community: TopicTreeCommunity,
    depth = 0,
  ): ReactNode {
    const children = childrenByParent.get(community.slug) ?? [];
    const expandable = children.length > 0;
    const open = expanded.has(community.slug);
    const active = community.slug === activeSlug;

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
              <SectionGlyph slug={community.slug} />
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

  return (
    <aside
      className="section-category-tree topic-category-tree-v15-4"
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

      {loading ? (
        <div
          className="section-tree-loading"
          aria-label="Загружаем категории"
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <span key={index} />
          ))}
        </div>
      ) : error ? (
        <p className="section-tree-error">{error}</p>
      ) : (
        <nav className="section-tree-list">
          {rootCommunities.map((community) =>
            renderTreeNode(community),
          )}
        </nav>
      )}
    </aside>
  );
}
