'use client';

import Link from 'next/link';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { api } from '@/lib/api';
import { PublicationCard } from '@/components/publication-card';
import { Avatar } from '@/components/avatar';
import type { PublicationCardData, Tag } from '@/lib/types';

type Results = {
  query: string;
  publications: PublicationCardData[];
  communities: Array<{ slug: string; name: string; description: string; subscriberCount: number; accentColor?: string }>;
  users: Array<{ username: string; displayName: string; avatarUrl?: string | null; bio: string | null; forrumId: number; followerCount: number; publicationCount: number }>;
  tags: Array<Tag & { publicationCount: number; subscriberCount: number }>;
};

type Group = 'ALL' | 'PUBLICATIONS' | 'COMMUNITIES' | 'USERS' | 'TAGS';
type Sort = 'RELEVANCE' | 'NEWEST' | 'DISCUSSED';
const typeNames: Record<string, string> = { DISCUSSION: 'Обсуждения', QUESTION: 'Вопросы', NEWS: 'Новости', GUIDE: 'Гайды', PROJECT: 'Проекты', SERVICE: 'Услуги', CASE: 'Кейсы', ANNOUNCEMENT: 'Объявления' };
function resultWord(count: number) { const mod100 = count % 100; const mod10 = count % 10; if (mod100 >= 11 && mod100 <= 14) return 'результатов'; if (mod10 === 1) return 'результат'; if (mod10 >= 2 && mod10 <= 4) return 'результата'; return 'результатов'; }

export function SearchClient() {
  const params = useSearchParams();
  const router = useRouter();
  const initial = params.get('q') ?? '';
  const [query, setQuery] = useState(initial);
  const [result, setResult] = useState<Results | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [group, setGroup] = useState<Group>('ALL');
  const [format, setFormat] = useState<'ALL' | 'POST' | 'TOPIC'>('ALL');
  const [type, setType] = useState('ALL');
  const [sort, setSort] = useState<Sort>('RELEVANCE');
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    try { setRecent(JSON.parse(window.localStorage.getItem('forrum-recent-searches') ?? '[]').filter((item: unknown) => typeof item === 'string').slice(0, 5)); }
    catch { setRecent([]); }
  }, []);

  async function run(q: string) {
    const normalized = q.trim();
    if (normalized.length < 2) { setResult(null); setError('Введите минимум два символа'); return; }
    setLoading(true); setError('');
    try {
      const next = await api<Results>(`/search?q=${encodeURIComponent(normalized)}`);
      setResult(next);
      setGroup('ALL'); setFormat('ALL'); setType('ALL'); setSort('RELEVANCE');
      setRecent((current) => {
        const nextRecent = [normalized, ...current.filter((item) => item.toLowerCase() !== normalized.toLowerCase())].slice(0, 5);
        window.localStorage.setItem('forrum-recent-searches', JSON.stringify(nextRecent));
        return nextRecent;
      });
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Поиск временно недоступен'); }
    finally { setLoading(false); }
  }

  useEffect(() => { setQuery(initial); if (initial) void run(initial); else setResult(null); }, [initial]);

  function submit(event: FormEvent) {
    event.preventDefault();
    const normalized = query.trim();
    if (normalized.length < 2) { setError('Введите минимум два символа'); return; }
    if (normalized === initial) void run(normalized);
    else router.replace(`/search?q=${encodeURIComponent(normalized)}`);
  }

  function chooseSuggestion(value: string) {
    setQuery(value);
    if (value === initial) void run(value);
    else router.replace(`/search?q=${encodeURIComponent(value)}`);
  }

  const publicationTypes = useMemo(() => [...new Set((result?.publications ?? []).map((item) => item.type))], [result]);
  const publications = useMemo(() => {
    const source = (result?.publications ?? []).filter((item) => (format === 'ALL' || item.format === format) && (type === 'ALL' || item.type === type));
    if (sort === 'NEWEST') return [...source].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    if (sort === 'DISCUSSED') return [...source].sort((a, b) => b.commentCount - a.commentCount || b.reactionCount - a.reactionCount);
    return source;
  }, [result, format, type, sort]);

  const total = result ? result.publications.length + result.communities.length + result.users.length + result.tags.length : 0;
  const groups: Array<[Group, string, number]> = result ? [
    ['ALL', 'Всё', total],
    ['PUBLICATIONS', 'Публикации', result.publications.length],
    ['COMMUNITIES', 'Сообщества', result.communities.length],
    ['USERS', 'Люди', result.users.length],
    ['TAGS', 'Хэштеги', result.tags.length],
  ] : [];

  return <>
    <div className="section-title search-title"><div><h1>Поиск</h1><p className="muted">Публикации, сообщества, люди и хэштеги — в одной понятной выдаче.</p></div></div>
    <form className="search-form search-form-modern" onSubmit={submit}>
      <label className="visually-hidden" htmlFor="global-search-query">Поисковый запрос</label>
      <div className="search-input-wrap"><input id="global-search-query" value={query} onChange={(event) => setQuery(event.target.value)} minLength={2} placeholder="Например: Majestic, продвижение или #проекты" autoFocus required/>{query && <button type="button" aria-label="Очистить поиск" onClick={() => { setQuery(''); setError(''); }}>×</button>}</div>
      <button type="submit" className="button" disabled={loading}>{loading ? 'Ищем…' : 'Найти'}</button>
    </form>

    <div aria-live="polite">{error && <div className="error-box search-feedback">{error}</div>}{loading && <div className="card skeleton search-feedback">Проверяем публикации, сообщества и профили…</div>}</div>

    {!result && !loading && <section className="search-start card">
      <div><h2>Начните с простого запроса</h2><p>Можно искать по названию темы, тексту, имени пользователя или написать хэштег целиком.</p></div>
      <div className="search-suggestions"><button type="button" onClick={() => chooseSuggestion('Majestic RP')}>Majestic RP</button><button type="button" onClick={() => chooseSuggestion('продвижение')}>продвижение</button><button type="button" onClick={() => chooseSuggestion('#проекты')}>#проекты</button></div>
      {recent.length > 0 && <div className="recent-searches"><strong>Недавние запросы</strong><div>{recent.map((item) => <button type="button" key={item} onClick={() => chooseSuggestion(item)}>{item}</button>)}</div></div>}
    </section>}

    {result && !loading && <div className="search-results-shell">
      <div className="search-result-summary"><div><strong>{total}</strong><span>{resultWord(total)} по запросу «{result.query}»</span></div>{recent.length > 0 && <button className="text-button" type="button" onClick={() => { setRecent([]); window.localStorage.removeItem('forrum-recent-searches'); }}>Очистить историю</button>}</div>

      <nav className="search-group-tabs" aria-label="Тип результатов">{groups.map(([value, label, count]) => <button key={value} className={group === value ? 'active' : ''} type="button" onClick={() => setGroup(value)}>{label}<span>{count}</span></button>)}</nav>

      {(group === 'ALL' || group === 'PUBLICATIONS') && result.publications.length > 0 && <div className="search-publication-filters">
        <label>Формат<select value={format} onChange={(event) => setFormat(event.target.value as 'ALL' | 'POST' | 'TOPIC')}><option value="ALL">Все</option><option value="POST">Посты</option><option value="TOPIC">Постоянные темы</option></select></label>
        <label>Назначение<select value={type} onChange={(event) => setType(event.target.value)}><option value="ALL">Любое</option>{publicationTypes.map((value) => <option value={value} key={value}>{typeNames[value] ?? value}</option>)}</select></label>
        <label>Порядок<select value={sort} onChange={(event) => setSort(event.target.value as Sort)}><option value="RELEVANCE">По соответствию</option><option value="NEWEST">Сначала новые</option><option value="DISCUSSED">Самые обсуждаемые</option></select></label>
      </div>}

      <div className="search-groups">
        {(group === 'ALL' || group === 'TAGS') && result.tags.length > 0 && <section><div className="search-group-heading"><h2>Хэштеги</h2><span>{result.tags.length}</span></div><div className="tag-list search-tag-list">{result.tags.map((tag) => <Link key={tag.id} className="tag" href={`/tags/${tag.slug}`} style={tag.styleEnabled ? { background: tag.backgroundColor, color: tag.textColor, borderColor: tag.borderColor } : undefined}>#{tag.label}<span>{tag.publicationCount}</span></Link>)}</div></section>}
        {(group === 'ALL' || group === 'PUBLICATIONS') && result.publications.length > 0 && <section><div className="search-group-heading"><h2>Публикации</h2><span>{publications.length}</span></div>{publications.length ? <div className="publication-list">{publications.map((item) => <PublicationCard key={item.slug} item={item}/>)}</div> : <div className="empty-state compact-empty"><h3>Нет материалов с такими фильтрами</h3><button className="button ghost" type="button" onClick={() => { setFormat('ALL'); setType('ALL'); }}>Сбросить фильтры</button></div>}</section>}
        {(group === 'ALL' || group === 'COMMUNITIES') && result.communities.length > 0 && <section><div className="search-group-heading"><h2>Сообщества</h2><span>{result.communities.length}</span></div><div className="grid search-card-grid">{result.communities.map((community) => <Link className="card search-result-card" href={`/communities/${community.slug}`} key={community.slug} style={{ borderTopColor: community.accentColor ?? 'var(--accent)' }}><h3>{community.name}</h3><p>{community.description}</p><span className="muted">{community.subscriberCount} подписчиков</span></Link>)}</div></section>}
        {(group === 'ALL' || group === 'USERS') && result.users.length > 0 && <section><div className="search-group-heading"><h2>Люди</h2><span>{result.users.length}</span></div><div className="grid search-card-grid">{result.users.map((user) => <Link className="card user-row" href={`/u/${user.username}`} key={user.username}><Avatar name={user.displayName} url={user.avatarUrl}/><div className="user-row-content"><strong>{user.displayName}</strong><div className="muted">@{user.username} · ID {user.forrumId}</div>{user.bio && <p>{user.bio}</p>}<span className="muted small-text">{user.followerCount} подписчиков · {user.publicationCount} публикаций</span></div></Link>)}</div></section>}
        {total === 0 && <div className="empty-state"><h2>Ничего не найдено</h2><p>Проверьте написание, сократите запрос или попробуйте хэштег.</p><div className="search-suggestions"><button type="button" onClick={() => chooseSuggestion('GTA RP')}>GTA RP</button><button type="button" onClick={() => chooseSuggestion('#проекты')}>#проекты</button></div></div>}
        {total > 0 && group !== 'ALL' && groups.find(([value]) => value === group)?.[2] === 0 && <div className="empty-state"><h2>В этом разделе результатов нет</h2><button className="button ghost" type="button" onClick={() => setGroup('ALL')}>Показать всё</button></div>}
      </div>
    </div>}
  </>;
}
