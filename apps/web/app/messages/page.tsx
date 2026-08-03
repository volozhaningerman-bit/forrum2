'use client';

import Link from 'next/link';
import type { FormEvent } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { Avatar } from '@/components/avatar';
import { formatRelativeTime } from '@/lib/format';

type Conversation = {
  id: string;
  updatedAt: string;
  other: { username: string; displayName: string; avatarUrl?: string | null } | null;
  latest: { body: string; createdAt: string; authorId: string } | null;
  unread: boolean;
};

type UserSuggestion = {
  username: string;
  displayName: string;
  bio: string | null;
  forrumId: number;
};

type SearchResult = { users: UserSuggestion[] };

export default function MessagesPage() {
  const router = useRouter();
  const [items, setItems] = useState<Conversation[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [username, setUsername] = useState('');
  const [body, setBody] = useState('');
  const [suggestions, setSuggestions] = useState<UserSuggestion[]>([]);
  const [starting, setStarting] = useState(false);

  const load = async () => {
    try {
      setError('');
      setItems(await api<Conversation[]>('/messages'));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Не удалось загрузить сообщения');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
    const initial = new URLSearchParams(window.location.search).get('to');
    if (initial) setUsername(initial);
  }, []);

  useEffect(() => {
    const value = username.trim();
    if (value.length < 2) { setSuggestions([]); return; }
    const timer = window.setTimeout(async () => {
      try {
        const result = await api<SearchResult>(`/search?q=${encodeURIComponent(value)}`);
        setSuggestions(result.users.filter((user) => user.username !== value.toLowerCase()).slice(0, 5));
      } catch {
        setSuggestions([]);
      }
    }, 260);
    return () => window.clearTimeout(timer);
  }, [username]);

  async function start(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!username.trim() || !body.trim()) return;
    setStarting(true);
    try {
      setError('');
      const result = await api<{ id: string }>('/messages', {
        method: 'POST',
        body: JSON.stringify({ username: username.trim(), body: body.trim() }),
      });
      router.push(`/messages/${result.id}`);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Не удалось начать диалог');
    } finally {
      setStarting(false);
    }
  }

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return items;
    return items.filter((item) => `${item.other?.displayName ?? ''} ${item.other?.username ?? ''} ${item.latest?.body ?? ''}`.toLowerCase().includes(normalized));
  }, [items, query]);

  const unreadCount = items.filter((item) => item.unread).length;

  return <div className="messages-page-grid">
    <main className="messages-inbox">
      <div className="section-title messages-title">
        <div><h1>Личные сообщения</h1><p className="muted">{unreadCount ? `${unreadCount} непрочитанных диалогов` : 'Все диалоги прочитаны'}</p></div>
        <Link className="button small mobile-only" href="#new-message">Новое сообщение</Link>
      </div>

      {error && <div className="error-box" role="alert">{error}<button type="button" className="button ghost small" onClick={load}>Повторить</button></div>}

      <div className="inbox-search">
        <label className="visually-hidden" htmlFor="conversation-search">Поиск по перепискам</label>
        <input id="conversation-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Найти переписку"/>
      </div>

      <div className="conversation-list-modern">
        {loading && <><div className="conversation-skeleton"/><div className="conversation-skeleton"/><div className="conversation-skeleton"/></>}
        {!loading && filtered.map((item) => <Link className={`conversation-row-modern ${item.unread ? 'unread' : ''}`} href={`/messages/${item.id}`} key={item.id}>
          <Avatar name={item.other?.displayName ?? 'Диалог'} size={48} url={item.other?.avatarUrl}/>
          <div className="conversation-copy">
            <div className="conversation-name-line"><strong>{item.other?.displayName ?? 'Диалог'}</strong><time>{formatRelativeTime(item.updatedAt)}</time></div>
            <p>{item.latest?.body ?? 'Сообщений пока нет'}</p>
            {item.other && <span>@{item.other.username}</span>}
          </div>
          {item.unread && <span className="unread-dot" aria-label="Непрочитанное сообщение"/>}
        </Link>)}
        {!loading && !filtered.length && <div className="empty-state">
          <strong>{query ? 'Переписка не найдена' : 'Переписок пока нет'}</strong>
          <span>{query ? 'Попробуйте изменить запрос.' : 'Начните диалог с участником FORRUM через форму справа.'}</span>
        </div>}
      </div>
    </main>

    <aside className="new-message-panel" id="new-message">
      <div className="new-message-heading"><span className="eyebrow">Новый диалог</span><h2>Написать пользователю</h2><p>Введите ник или имя. FORRUM подскажет подходящие профили.</p></div>
      <form onSubmit={start}>
        <label>Получатель
          <input value={username} onChange={(event) => setUsername(event.target.value)} name="username" autoComplete="off" placeholder="например, friend" required/>
        </label>
        {suggestions.length > 0 && <div className="recipient-suggestions" aria-label="Подходящие пользователи">
          {suggestions.map((user) => <button type="button" key={user.username} onClick={() => { setUsername(user.username); setSuggestions([]); }}>
            <Avatar name={user.displayName} size={34}/><span><strong>{user.displayName}</strong><small>@{user.username} · ID {user.forrumId}</small></span>
          </button>)}
        </div>}
        <label>Первое сообщение
          <textarea value={body} onChange={(event) => setBody(event.target.value)} name="body" minLength={1} maxLength={5000} placeholder="Напишите сообщение" required/>
        </label>
        <div className="composer-footer"><span>{body.length}/5000</span><button className="button" disabled={starting || !username.trim() || !body.trim()}>{starting ? 'Открываем…' : 'Начать диалог'}</button></div>
      </form>
      <p className="message-safety-note">Не отправляйте пароли, коды подтверждения и платёжные данные. Администрация FORRUM не просит их в личных сообщениях.</p>
    </aside>
  </div>;
}
