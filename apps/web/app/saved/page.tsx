'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { api } from '@/lib/api';
import { PublicationCard } from '@/components/publication-card';
import { StatePanel } from '@/components/state-panel';
import { PersonalLinks } from '@/components/personal-links';
import type { PublicationCardData } from '@/lib/types';

type Format = 'ALL' | 'POST' | 'TOPIC';
type Sort = 'SAVED' | 'NEW' | 'ACTIVE';

export default function SavedPage() {
  const [items, setItems] = useState<PublicationCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [query, setQuery] = useState('');
  const [format, setFormat] = useState<Format>('ALL');
  const [sort, setSort] = useState<Sort>('SAVED');
  const [busy, setBusy] = useState('');

  async function load() {
    setLoading(true); setError('');
    try { setItems(await api<PublicationCardData[]>('/publications/saved')); }
    catch (cause) { setError(cause instanceof Error ? cause.message : 'Не удалось загрузить сохранённое'); }
    finally { setLoading(false); }
  }
  useEffect(() => { void load(); }, []);

  const communities = useMemo(() => [...new Set(items.map((item) => item.community.slug))], [items]);
  const [community, setCommunity] = useState('ALL');
  const visible = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const filtered = items.filter((item) => (format === 'ALL' || item.format === format) && (community === 'ALL' || item.community.slug === community) && (!normalized || `${item.title ?? ''} ${item.excerpt} ${item.author.displayName} ${item.community.name}`.toLowerCase().includes(normalized)));
    return [...filtered].sort((left, right) => {
      if (sort === 'NEW') return new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime();
      if (sort === 'ACTIVE') return new Date(right.lastActivityAt ?? right.createdAt).getTime() - new Date(left.lastActivityAt ?? left.createdAt).getTime();
      return new Date(right.savedAt ?? 0).getTime() - new Date(left.savedAt ?? 0).getTime();
    });
  }, [items, query, format, community, sort]);

  async function remove(item: PublicationCardData) {
    setBusy(item.id); setError('');
    try { await api(`/publications/${item.slug}/bookmark`, { method: 'POST' }); setItems((current) => current.filter((value) => value.id !== item.id)); setMessage('Материал удалён из сохранённых'); }
    catch (cause) { setError(cause instanceof Error ? cause.message : 'Не удалось удалить сохранение'); }
    finally { setBusy(''); }
  }

  if (!loading && error && !items.length) return <div className="personal-library-layout"><main><StatePanel kind="error" title="Не удалось открыть сохранённое" action={<div className="inline-actions"><button className="button ghost small" type="button" onClick={() => window.location.reload()}>Повторить</button><Link className="button small" href="/login?next=/saved">Войти</Link></div>}>Личная библиотека доступна после входа в аккаунт.</StatePanel></main><aside className="personal-library-sidebar"><PersonalLinks/></aside></div>;

  return <div className="personal-library-layout"><main>
    <header className="settings-page-header"><div><span className="auth-eyebrow">Личная библиотека</span><h1>Сохранённые материалы</h1><p className="muted">Темы и посты, к которым вы хотите вернуться. Порядок сохранения не зависит от алгоритма ленты.</p></div><Link className="button ghost small" href="/search">Найти материалы</Link></header>
    {message && <div className="success-box">{message}</div>}{error && <div className="error-box">{error}</div>}
    <section className="card saved-controls"><label className="saved-search">Поиск<input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Название, автор или сообщество"/></label><label>Формат<select value={format} onChange={(event) => setFormat(event.target.value as Format)}><option value="ALL">Все</option><option value="POST">Посты</option><option value="TOPIC">Постоянные темы</option></select></label><label>Сообщество<select value={community} onChange={(event) => setCommunity(event.target.value)}><option value="ALL">Все</option>{communities.map((slug) => { const item = items.find((value) => value.community.slug === slug)!; return <option value={slug} key={slug}>{item.community.name}</option>; })}</select></label><label>Порядок<select value={sort} onChange={(event) => setSort(event.target.value as Sort)}><option value="SAVED">Недавно сохранённые</option><option value="NEW">Новые публикации</option><option value="ACTIVE">Недавно обсуждались</option></select></label></section>
    {loading ? <StatePanel kind="loading" title="Открываем библиотеку">Загружаем ваши закладки.</StatePanel> : visible.length ? <div className="saved-publication-list">{visible.map((item) => <div className="saved-publication" key={item.id}><div className="saved-publication-meta">Сохранено {item.savedAt ? new Date(item.savedAt).toLocaleString('ru-RU') : 'ранее'}<button type="button" className="text-button danger-text" disabled={busy === item.id} onClick={() => remove(item)}>{busy === item.id ? 'Удаляем…' : 'Убрать'}</button></div><PublicationCard item={item}/></div>)}</div> : <StatePanel title={items.length ? 'Материалы не найдены' : 'Сохранённых материалов пока нет'} action={items.length ? <button type="button" className="button ghost small" onClick={() => { setQuery(''); setFormat('ALL'); setCommunity('ALL'); }}>Сбросить фильтры</button> : <Link className="button ghost small" href="/search">Найти материалы</Link>}>{items.length ? 'Измените поиск или фильтры.' : 'Нажмите «Сохранить» в публикации, чтобы добавить её в личную библиотеку.'}</StatePanel>}
  </main><aside className="personal-library-sidebar"><PersonalLinks/></aside></div>;
}
