'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { api } from '@/lib/api';
import { Avatar } from '@/components/avatar';
import { StatePanel } from '@/components/state-panel';
import { PersonalLinks } from '@/components/personal-links';
import { formatRelativeTime } from '@/lib/format';

type Author = { username: string; displayName: string; avatarUrl?: string | null; bio?: string | null; forrumId: number; followerCount: number; publicationCount: number; followedAt: string };
type Tag = { id: string; slug: string; label: string; publicationCount: number; subscriberCount: number; subscribedAt: string; styleEnabled: boolean; backgroundColor: string; textColor: string; borderColor: string };
type Tab = 'authors' | 'tags';

export default function SubscriptionsPage() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [tab, setTab] = useState<Tab>('authors');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState('');

  async function load() {
    setLoading(true); setError('');
    try {
      const [authorData, tagData] = await Promise.all([api<Author[]>('/users/me/following'), api<Tag[]>('/tags/subscriptions')]);
      setAuthors(authorData); setTags(tagData);
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Не удалось загрузить подписки'); }
    finally { setLoading(false); }
  }
  useEffect(() => { void load(); }, []);

  const normalized = query.trim().toLowerCase();
  const filteredAuthors = useMemo(() => authors.filter((item) => !normalized || `${item.displayName} ${item.username} ${item.bio ?? ''}`.toLowerCase().includes(normalized)), [authors, normalized]);
  const filteredTags = useMemo(() => tags.filter((item) => !normalized || `${item.label} ${item.slug}`.toLowerCase().includes(normalized)), [tags, normalized]);

  async function unfollow(author: Author) {
    setBusy(`author:${author.username}`); setError('');
    try { await api(`/users/${author.username}/follow`, { method: 'DELETE' }); setAuthors((items) => items.filter((item) => item.username !== author.username)); setMessage(`Вы отписались от ${author.displayName}`); }
    catch (cause) { setError(cause instanceof Error ? cause.message : 'Не удалось изменить подписку'); }
    finally { setBusy(''); }
  }

  async function unsubscribeTag(tag: Tag) {
    setBusy(`tag:${tag.slug}`); setError('');
    try { await api(`/tags/${tag.slug}/subscribe`, { method: 'DELETE' }); setTags((items) => items.filter((item) => item.slug !== tag.slug)); setMessage(`Вы отписались от #${tag.label}`); }
    catch (cause) { setError(cause instanceof Error ? cause.message : 'Не удалось изменить подписку'); }
    finally { setBusy(''); }
  }

  if (!loading && error && !authors.length && !tags.length) return <div className="personal-library-layout"><main><StatePanel kind="error" title="Не удалось открыть подписки" action={<div className="inline-actions"><button className="button ghost small" type="button" onClick={() => window.location.reload()}>Повторить</button><Link className="button small" href="/login?next=/subscriptions">Войти</Link></div>}>Войдите в аккаунт или повторите загрузку.</StatePanel></main><aside className="personal-library-sidebar"><PersonalLinks/></aside></div>;

  return <div className="personal-library-layout"><main>
    <header className="settings-page-header"><div><span className="auth-eyebrow">Ваш круг интересов</span><h1>Авторы и хэштеги</h1><p className="muted">Подписки влияют на вкладку «Подписки» и персональную ленту, но не включают лишние уведомления.</p></div><Link className="button ghost small" href="/settings/interests">Сообщества</Link></header>
    {message && <div className="success-box">{message}</div>}{error && <div className="error-box">{error}</div>}
    <div className="library-tabs" role="tablist"><button type="button" className={tab === 'authors' ? 'active' : ''} onClick={() => setTab('authors')}>Авторы <span>{authors.length}</span></button><button type="button" className={tab === 'tags' ? 'active' : ''} onClick={() => setTab('tags')}>Хэштеги <span>{tags.length}</span></button></div>
    <label className="library-search">Поиск по подпискам<input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={tab === 'authors' ? 'Имя или @username' : 'Название хэштега'}/></label>
    {loading ? <StatePanel kind="loading" title="Загружаем подписки">Собираем выбранных авторов и хэштеги.</StatePanel> : tab === 'authors' ? filteredAuthors.length ? <div className="subscription-author-list">{filteredAuthors.map((author) => <article className="card subscription-author" key={author.username}><Avatar name={author.displayName} url={author.avatarUrl} size={56}/><div><Link href={`/u/${author.username}`}><strong>{author.displayName}</strong></Link><p className="muted small-text">@{author.username} · FORRUM ID {author.forrumId}</p>{author.bio && <p>{author.bio}</p>}<span className="muted small-text">{author.followerCount} подписчиков · {author.publicationCount} публикаций · подписка {formatRelativeTime(author.followedAt)}</span></div><button type="button" className="button ghost small" disabled={busy === `author:${author.username}`} onClick={() => unfollow(author)}>{busy === `author:${author.username}` ? 'Сохраняем…' : 'Отписаться'}</button></article>)}</div> : <StatePanel title={query ? 'Авторы не найдены' : 'Вы пока не подписаны на авторов'} action={<Link className="button ghost small" href="/search">Найти людей</Link>}>{query ? 'Измените запрос или покажите все подписки.' : 'Подписка на автора добавляет его новые публикации во вкладку «Подписки».'}</StatePanel> : filteredTags.length ? <div className="subscription-tag-grid">{filteredTags.map((tag) => <article className="card subscription-tag" key={tag.id}><Link className="tag tag-large" href={`/tags/${tag.slug}`} style={tag.styleEnabled ? { background: tag.backgroundColor, color: tag.textColor, borderColor: tag.borderColor } : undefined}>#{tag.label}</Link><p>{tag.publicationCount} публикаций · {tag.subscriberCount} подписчиков</p><span className="muted small-text">Подписка {formatRelativeTime(tag.subscribedAt)}</span><button type="button" className="button ghost small" disabled={busy === `tag:${tag.slug}`} onClick={() => unsubscribeTag(tag)}>{busy === `tag:${tag.slug}` ? 'Сохраняем…' : 'Отписаться'}</button></article>)}</div> : <StatePanel title={query ? 'Хэштеги не найдены' : 'Вы пока не подписаны на хэштеги'} action={<Link className="button ghost small" href="/search">Найти хэштеги</Link>}>{query ? 'Измените запрос или покажите все подписки.' : 'Откройте хэштег из публикации и подпишитесь, чтобы следить за темой во всех сообществах.'}</StatePanel>}
  </main><aside className="personal-library-sidebar"><PersonalLinks/></aside></div>;
}
