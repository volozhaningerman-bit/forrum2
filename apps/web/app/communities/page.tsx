'use client';

import Link from 'next/link';
import type { CSSProperties } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { api } from '@/lib/api';
import { StatePanel } from '@/components/state-panel';
import { formatRelativeTime } from '@/lib/format';

type Community = {
  id: string; slug: string; name: string; description: string; shortDescription?: string | null;
  accentColor: string; subscriberCount: number; publicationCount: number; recentPublicationCount: number;
  lastActivityAt: string | null; childCount: number; isSubscribed: boolean;
  curator: { username: string; displayName: string } | null;
  parent: { slug: string; name: string } | null;
};
type Scope = 'all' | 'subscribed';
type Sort = 'active' | 'subscribers' | 'name';

function formatNumber(value: number) { return new Intl.NumberFormat('ru-RU').format(value); }

export default function CommunitiesPage() {
  const [items, setItems] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState('');
  const [query, setQuery] = useState('');
  const [scope, setScope] = useState<Scope>('all');
  const [sort, setSort] = useState<Sort>('active');

  async function load() {
    setLoading(true); setError('');
    try { setItems(await api<Community[]>('/communities')); }
    catch (cause) { setError(cause instanceof Error ? cause.message : 'Не удалось загрузить сообщества'); }
    finally { setLoading(false); }
  }
  useEffect(() => { void load(); }, []);

  const childrenByParent = useMemo(() => {
    const map = new Map<string, Community[]>();
    for (const item of items) if (item.parent) map.set(item.parent.slug, [...(map.get(item.parent.slug) ?? []), item]);
    return map;
  }, [items]);

  const families = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const itemBySlug = new Map(items.map((item) => [item.slug, item]));
    const matches = (item: Community) => !normalized || `${item.name} ${item.description} ${item.shortDescription ?? ''}`.toLowerCase().includes(normalized);
    const collectDescendants = (rootSlug: string) => {
      const result: Array<{ item: Community; depth: number }> = [];
      const visited = new Set<string>();
      const visit = (parentSlug: string, depth: number) => {
        for (const child of [...(childrenByParent.get(parentSlug) ?? [])].sort((left, right) => left.name.localeCompare(right.name, 'ru'))) {
          if (visited.has(child.slug)) continue;
          visited.add(child.slug);
          result.push({ item: child, depth });
          visit(child.slug, depth + 1);
        }
      };
      visit(rootSlug, 1);
      return result;
    };
    const roots = items.filter((item) => !item.parent).flatMap((root) => {
      const allDescendants = collectDescendants(root.slug);
      let allowedDescendants = allDescendants;
      if (scope === 'subscribed' && !root.isSubscribed) {
        const visibleBranch = new Set<string>();
        for (const entry of allDescendants.filter(({ item }) => item.isSubscribed)) {
          visibleBranch.add(entry.item.slug);
          let parentSlug = entry.item.parent?.slug;
          while (parentSlug && parentSlug !== root.slug) {
            visibleBranch.add(parentSlug);
            parentSlug = itemBySlug.get(parentSlug)?.parent?.slug;
          }
        }
        allowedDescendants = allDescendants.filter(({ item }) => visibleBranch.has(item.slug));
      }
      const rootAllowed = scope === 'all' || root.isSubscribed;
      const rootMatches = rootAllowed && matches(root);
      const matchingDescendants = allowedDescendants.filter(({ item }) => matches(item));
      if (!rootMatches && !matchingDescendants.length) return [];
      let descendants = allowedDescendants;
      if (!rootMatches && normalized) {
        const visibleBranch = new Set<string>();
        for (const entry of matchingDescendants) {
          visibleBranch.add(entry.item.slug);
          let parentSlug = entry.item.parent?.slug;
          while (parentSlug && parentSlug !== root.slug) {
            visibleBranch.add(parentSlug);
            parentSlug = itemBySlug.get(parentSlug)?.parent?.slug;
          }
        }
        descendants = allowedDescendants.filter(({ item }) => visibleBranch.has(item.slug));
      }
      const familyActivityAt = [root, ...allDescendants.map(({ item }) => item)].reduce<string | null>((latest, item) => {
        if (!item.lastActivityAt) return latest;
        return !latest || new Date(item.lastActivityAt).getTime() > new Date(latest).getTime() ? item.lastActivityAt : latest;
      }, null);
      return [{ root, descendants, familyActivityAt }];
    });
    return roots.sort((left, right) => {
      if (sort === 'name') return left.root.name.localeCompare(right.root.name, 'ru');
      if (sort === 'subscribers') return right.root.subscriberCount - left.root.subscriberCount;
      return new Date(right.familyActivityAt ?? 0).getTime() - new Date(left.familyActivityAt ?? 0).getTime();
    });
  }, [items, childrenByParent, query, scope, sort]);

  const subscribedCount = items.filter((item) => item.isSubscribed).length;
  const recentCount = items.reduce((sum, item) => sum + item.recentPublicationCount, 0);

  async function toggle(item: Community) {
    setBusy(item.slug); setError('');
    try { await api(`/communities/${item.slug}/subscribe`, { method: item.isSubscribed ? 'DELETE' : 'POST' }); await load(); }
    catch (cause) { setError(cause instanceof Error ? cause.message : 'Не удалось изменить подписку'); }
    finally { setBusy(''); }
  }

  function card(item: Community, child = false, depth = 0) {
    return <article className={`card community-card ${child ? 'community-card-child' : ''}`} style={{ '--community-accent': item.accentColor, '--community-depth': Math.min(depth, 4) } as CSSProperties} key={item.id}>
      <div className="community-card-heading"><div>{child && item.parent && <p className="small-text muted">Подраздел «{item.parent.name}»</p>}<h2><Link href={`/communities/${item.slug}`}>{item.name}</Link></h2></div>{item.isSubscribed && <span className="subscription-badge">В вашей ленте</span>}</div>
      <p>{item.shortDescription || item.description}</p>
      <div className="community-meta"><span>{formatNumber(item.subscriberCount)} подписчиков</span><span>{formatNumber(item.publicationCount)} публикаций</span>{item.recentPublicationCount > 0 && <span>{item.recentPublicationCount} за 7 дней</span>}</div>
      <p className="community-activity">{item.lastActivityAt ? `Последняя активность ${formatRelativeTime(item.lastActivityAt)}` : 'Публикаций пока нет'}</p>
      {item.curator && <p className="muted small-text">Куратор: <Link href={`/u/${item.curator.username}`}>{item.curator.displayName}</Link></p>}
      <div className="community-card-footer"><Link className="button ghost small" href={`/communities/${item.slug}`}>Открыть</Link><button type="button" disabled={busy === item.slug} className={`button small ${item.isSubscribed ? 'secondary' : ''}`} onClick={() => toggle(item)}>{busy === item.slug ? 'Сохраняем…' : item.isSubscribed ? 'Отписаться' : 'Подписаться'}</button></div>
    </article>;
  }

  return <>
    <div className="section-title"><div><h1>Сообщества</h1><p className="muted">Живые направления FORRUM и их подразделы. Каталог показывает реальную активность, а не пустые категории.</p></div><Link className="button secondary" href="/communities/proposals">Предложить сообщество</Link></div>
    <div className="community-directory-summary"><div><strong>{items.filter((item) => !item.parent).length}</strong><span>основных направлений</span></div><div><strong>{items.filter((item) => item.parent).length}</strong><span>подразделов</span></div><div><strong>{recentCount}</strong><span>публикаций за 7 дней</span></div><div><strong>{subscribedCount}</strong><span>ваших подписок</span></div></div>
    <section className="card community-directory-controls" aria-label="Настройка каталога">
      <label className="community-search">Поиск<input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Название или тема сообщества"/></label>
      <label>Показывать<select value={scope} onChange={(event) => setScope(event.target.value as Scope)}><option value="all">Все сообщества</option><option value="subscribed">Только мои подписки</option></select></label>
      <label>Порядок<select value={sort} onChange={(event) => setSort(event.target.value as Sort)}><option value="active">По активности</option><option value="subscribers">По подписчикам</option><option value="name">По названию</option></select></label>
    </section>
    {error && <div className="error-box">{error}</div>}
    {loading ? <StatePanel kind="loading" title="Загружаем каталог">Собираем структуру и активность сообществ.</StatePanel> : families.length ? <div className="community-directory">{families.map(({ root, descendants }) => <section className="community-family" key={root.id}>{card(root)}{descendants.length > 0 && <div className="community-children"><div className="community-children-heading"><span>Подразделы</span><small>{descendants.length}</small></div><div className="community-descendants">{descendants.map(({ item, depth }) => card(item, true, depth))}</div></div>}</section>)}</div> : <StatePanel title={scope === 'subscribed' ? 'Подписок пока нет' : 'Ничего не найдено'} action={<button className="button ghost small" type="button" onClick={() => { setQuery(''); setScope('all'); }}>Сбросить фильтры</button>}>{scope === 'subscribed' ? 'Выберите сообщества, чтобы собрать свою структуру интересов.' : 'Попробуйте более короткий запрос.'}</StatePanel>}
  </>;
}
