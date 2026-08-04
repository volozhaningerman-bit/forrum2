'use client';

import Link from 'next/link';
import type { CSSProperties, KeyboardEvent, MouseEvent } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { api } from '@/lib/api';
import { StatePanel } from '@/components/state-panel';
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
  curator: { username: string; displayName: string } | null;
  parent: { slug: string; name: string } | null;
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
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set());

  async function load() {
    setLoading(true);
    setError('');
    try {
      setItems(await api<Community[]>('/communities'));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Не удалось загрузить сообщества');
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
      map.set(item.parent.slug, [...(map.get(item.parent.slug) ?? []), item]);
    }
    return map;
  }, [items]);

  const normalized = query.trim().toLowerCase();

  function collectDescendants(rootSlug: string): Community[] {
    const result: Community[] = [];
    const visited = new Set<string>();

    function visit(parentSlug: string) {
      for (const child of childrenByParent.get(parentSlug) ?? []) {
        if (visited.has(child.slug)) continue;
        visited.add(child.slug);
        result.push(child);
        visit(child.slug);
      }
    }

    visit(rootSlug);
    return result;
  }

  function containsSubscription(item: Community): boolean {
    return item.isSubscribed || collectDescendants(item.slug).some((child) => child.isSubscribed);
  }

  function branchMatches(item: Community): boolean {
    const ownMatch = !normalized || `${item.name} ${item.description} ${item.shortDescription ?? ''}`
      .toLowerCase()
      .includes(normalized);
    const children = childrenByParent.get(item.slug) ?? [];
    const queryMatch = ownMatch || children.some(branchMatches);
    const scopeMatch = scope === 'all' || containsSubscription(item);
    return queryMatch && scopeMatch;
  }

  function activity(item: Community): number {
    const own = item.lastActivityAt ? new Date(item.lastActivityAt).getTime() : 0;
    return Math.max(own, ...(childrenByParent.get(item.slug) ?? []).map(activity), 0);
  }

  function sorted(list: Community[]) {
    return [...list].sort((left, right) => {
      if (sort === 'name') return left.name.localeCompare(right.name, 'ru');
      if (sort === 'subscribers') return right.subscriberCount - left.subscriberCount;
      return activity(right) - activity(left);
    });
  }

  const roots = useMemo(
    () => sorted(items.filter((item) => !item.parent && branchMatches(item))),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items, childrenByParent, normalized, scope, sort],
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

  function keyboard(event: KeyboardEvent<HTMLElement>, slug: string, expandable: boolean) {
    if (!expandable) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleOpen(slug);
    }
  }

  async function changeSubscription(item: Community, event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    setBusy(item.slug);
    setError('');
    try {
      await api(`/communities/${item.slug}/subscribe`, {
        method: item.isSubscribed ? 'DELETE' : 'POST',
      });
      await load();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Не удалось изменить подписку');
    } finally {
      setBusy('');
    }
  }

  function renderBranch(item: Community, depth = 0): React.ReactNode {
    const children = sorted((childrenByParent.get(item.slug) ?? []).filter(branchMatches));
    const expandable = children.length > 0;
    const open = Boolean(normalized) || expanded.has(item.slug);

    return <section className="community-tree-node" key={item.id}>
      <article
        className={`community-card community-tree-card ${expandable ? 'expandable' : ''} ${open ? 'opened' : ''}`}
        style={{
          '--community-accent': item.accentColor,
          '--community-depth': Math.min(depth, 4),
        } as CSSProperties}
        role={expandable ? 'button' : undefined}
        tabIndex={expandable ? 0 : undefined}
        aria-expanded={expandable ? open : undefined}
        onClick={expandable ? () => toggleOpen(item.slug) : undefined}
        onKeyDown={(event) => keyboard(event, item.slug, expandable)}
      >
        <div className="community-tree-main">
          <div className="community-card-heading">
            <div>
              {item.parent && <p className="community-parent-label">В разделе «{item.parent.name}»</p>}
              <h2><Link href={`/communities/${item.slug}`} onClick={stop}>{item.name}</Link></h2>
            </div>

            <div className="community-tree-badges">
              {item.isSubscribed && <span className="subscription-badge">В вашей ленте</span>}
              {expandable && <button
                type="button"
                className="community-expand-button"
                onClick={(event) => {
                  event.stopPropagation();
                  toggleOpen(item.slug);
                }}
                aria-label={open ? 'Свернуть подразделы' : 'Показать подразделы'}
              >
                <span>{children.length}</span>
                <b aria-hidden="true">{open ? '−' : '+'}</b>
              </button>}
            </div>
          </div>

          <p className="community-description">{item.shortDescription || item.description}</p>

          <div className="community-meta">
            <span>{formatNumber(item.subscriberCount)} подписчиков</span>
            <span>{formatNumber(item.publicationCount)} публикаций</span>
            {item.recentPublicationCount > 0 && <span>{item.recentPublicationCount} за 7 дней</span>}
          </div>

          <div className="community-tree-secondary">
            <span>{item.lastActivityAt ? `Активность ${formatRelativeTime(item.lastActivityAt)}` : 'Публикаций пока нет'}</span>
            {item.curator && <span>Куратор: <Link href={`/u/${item.curator.username}`} onClick={stop}>{item.curator.displayName}</Link></span>}
          </div>
        </div>

        <div className="community-tree-actions">
          <Link className="button ghost small" href={`/communities/${item.slug}`} onClick={stop}>Открыть</Link>
          <button
            type="button"
            disabled={busy === item.slug}
            className={`button small ${item.isSubscribed ? 'secondary' : ''}`}
            onClick={(event) => void changeSubscription(item, event)}
          >
            {busy === item.slug ? 'Сохраняем…' : item.isSubscribed ? 'Отписаться' : 'Подписаться'}
          </button>
        </div>

        {expandable && <div className="community-expand-hint">
          {open ? 'Нажмите по карточке, чтобы свернуть' : `Показать подразделы · ${children.length}`}
        </div>}
      </article>

      {expandable && open && <div className="community-tree-children">
        {children.map((child) => renderBranch(child, depth + 1))}
      </div>}
    </section>;
  }

  const recent = items.reduce((sum, item) => sum + item.recentPublicationCount, 0);
  const subscribed = items.filter((item) => item.isSubscribed).length;

  return <>
    <div className="section-title community-page-title">
      <div>
        <span className="eyebrow">Каталог интересов</span>
        <h1>Сообщества</h1>
        <p className="muted">Разделы свёрнуты по умолчанию. Нажмите по свободному месту карточки, чтобы показать подразделы.</p>
      </div>
      <Link className="button secondary" href="/communities/proposals">Предложить сообщество</Link>
    </div>

    <div className="community-directory-summary">
      <div><strong>{items.filter((item) => !item.parent).length}</strong><span>направлений</span></div>
      <div><strong>{items.filter((item) => item.parent).length}</strong><span>подразделов</span></div>
      <div><strong>{recent}</strong><span>публикаций за 7 дней</span></div>
      <div><strong>{subscribed}</strong><span>ваших подписок</span></div>
    </div>

    <section className="community-directory-controls" aria-label="Настройка каталога">
      <label>Поиск<input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Название или тема"/></label>
      <label>Показывать<select value={scope} onChange={(event) => setScope(event.target.value as Scope)}><option value="all">Все сообщества</option><option value="subscribed">Только мои подписки</option></select></label>
      <label>Порядок<select value={sort} onChange={(event) => setSort(event.target.value as Sort)}><option value="active">По активности</option><option value="subscribers">По подписчикам</option><option value="name">По названию</option></select></label>
    </section>

    {error && <div className="error-box">{error}</div>}

    {loading
      ? <StatePanel kind="loading" title="Загружаем каталог">Собираем структуру и активность.</StatePanel>
      : roots.length
        ? <div className="community-directory community-tree">{roots.map((root) => renderBranch(root))}</div>
        : <StatePanel
            title={scope === 'subscribed' ? 'Подписок пока нет' : 'Ничего не найдено'}
            action={<button type="button" className="button ghost small" onClick={() => { setQuery(''); setScope('all'); }}>Сбросить фильтры</button>}
          >
            {scope === 'subscribed' ? 'Подпишитесь на сообщества, чтобы собрать свою структуру интересов.' : 'Попробуйте более короткий запрос.'}
          </StatePanel>}
  </>;
}
