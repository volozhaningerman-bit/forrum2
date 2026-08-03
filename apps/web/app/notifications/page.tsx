'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { api } from '@/lib/api';
import { Avatar } from '@/components/avatar';
import { formatRelativeTime } from '@/lib/format';

type NotificationType = 'PUBLICATION_REPLY' | 'COMMENT_REPLY' | 'REACTION' | 'FOLLOW' | 'WALL_POST' | 'MESSAGE' | 'SYSTEM';
type Notification = {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  href: string;
  readAt: string | null;
  createdAt: string;
  actor: { username: string; displayName: string; avatarUrl?: string | null } | null;
};
type Filter = 'all' | 'unread' | 'replies' | 'messages' | 'social' | 'system';

const typeLabels: Record<NotificationType, string> = {
  PUBLICATION_REPLY: 'Ответ', COMMENT_REPLY: 'Ответ', REACTION: 'Реакция', FOLLOW: 'Подписка',
  WALL_POST: 'Стена', MESSAGE: 'Сообщение', SYSTEM: 'Система',
};

export default function NotificationsPage() {
  const [items, setItems] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<Filter>('all');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setError('');
      setItems(await api<Notification[]>('/notifications'));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Не удалось загрузить уведомления');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { void load(); }, []);

  async function readAll() {
    try {
      await api('/notifications/read-all', { method: 'POST' });
      setItems((current) => current.map((item) => ({ ...item, readAt: item.readAt ?? new Date().toISOString() })));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Не удалось отметить уведомления');
    }
  }

  async function read(item: Notification) {
    if (item.readAt) return;
    setItems((current) => current.map((candidate) => candidate.id === item.id ? { ...candidate, readAt: new Date().toISOString() } : candidate));
    await api(`/notifications/${item.id}/read`, { method: 'POST' }).catch(() => undefined);
  }

  const unreadCount = items.filter((item) => !item.readAt).length;
  const filtered = useMemo(() => items.filter((item) => {
    if (filter === 'unread') return !item.readAt;
    if (filter === 'replies') return item.type === 'PUBLICATION_REPLY' || item.type === 'COMMENT_REPLY' || item.type === 'REACTION';
    if (filter === 'messages') return item.type === 'MESSAGE';
    if (filter === 'social') return item.type === 'FOLLOW' || item.type === 'WALL_POST';
    if (filter === 'system') return item.type === 'SYSTEM';
    return true;
  }), [items, filter]);

  const tabs: Array<{ key: Filter; label: string }> = [
    { key: 'all', label: 'Все' }, { key: 'unread', label: `Непрочитанные${unreadCount ? ` · ${unreadCount}` : ''}` },
    { key: 'replies', label: 'Ответы и реакции' }, { key: 'messages', label: 'Сообщения' },
    { key: 'social', label: 'Подписки и стена' }, { key: 'system', label: 'Системные' },
  ];

  return <div className="notifications-page-modern">
    <div className="section-title">
      <div><h1>Уведомления</h1><p className="muted">Ответы, реакции, подписки, записи на стене и системные события.</p></div>
      {unreadCount > 0 && <button type="button" className="button secondary small" onClick={readAll}>Прочитать всё</button>}
    </div>

    <nav className="notification-filters" aria-label="Фильтры уведомлений">
      {tabs.map((tab) => <button type="button" key={tab.key} className={filter === tab.key ? 'active' : ''} onClick={() => setFilter(tab.key)}>{tab.label}</button>)}
    </nav>

    {error && <div className="error-box" role="alert">{error}<button type="button" className="button ghost small" onClick={load}>Повторить</button></div>}

    <div className="notification-list-modern">
      {loading && <><div className="notification-skeleton"/><div className="notification-skeleton"/><div className="notification-skeleton"/></>}
      {!loading && filtered.map((item) => <Link className={`notification-card-modern ${item.readAt ? '' : 'unread'}`} href={item.href} onClick={() => read(item)} key={item.id}>
        <Avatar name={item.actor?.displayName ?? 'FORRUM'} size={44} url={item.actor?.avatarUrl}/>
        <div className="notification-copy">
          <div className="notification-title-line"><strong>{item.title}</strong><span className={`notification-type type-${item.type.toLowerCase()}`}>{typeLabels[item.type]}</span></div>
          <p>{item.body}</p>
          <time>{formatRelativeTime(item.createdAt)}</time>
        </div>
        {!item.readAt && <span className="unread-dot" aria-label="Непрочитанное уведомление"/>}
      </Link>)}
      {!loading && !filtered.length && <div className="empty-state">
        <strong>{filter === 'unread' ? 'Всё прочитано' : 'Здесь пока пусто'}</strong>
        <span>{filter === 'unread' ? 'Новых уведомлений нет.' : 'Уведомления этого типа появятся после активности на форуме.'}</span>
      </div>}
    </div>

    <div className="notification-settings-link"><Link href="/settings#notifications">Настроить типы уведомлений</Link></div>
  </div>;
}
