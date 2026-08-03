'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import type { PublicationCardData } from '@/lib/types';
import { PublicationCard } from './publication-card';
import { StatePanel } from './state-panel';

const tabs = [
  ['for-you', 'Для вас'], ['subscriptions', 'Подписки'], ['all', 'Всё FORRUM'],
  ['popular', 'Популярное'], ['new', 'Новое'], ['saved', 'Сохранённое'],
] as const;

type FeedPreferences = { recommendationsEnabled: boolean; showReasons: boolean };

export function FeedView({ initialMode = 'for-you' }: { initialMode?: string }) {
  const [mode, setMode] = useState(initialMode);
  const [items, setItems] = useState<PublicationCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [preferences, setPreferences] = useState<FeedPreferences | null>(null);

  function load(selectedMode = mode) {
    setLoading(true); setError('');
    api<PublicationCardData[]>(`/feed?mode=${encodeURIComponent(selectedMode)}`)
      .then(setItems).catch((cause) => setError(cause instanceof Error ? cause.message : 'Не удалось загрузить ленту'))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    api('/auth/me').then(() => {
      setAuthenticated(true);
      return api<FeedPreferences>('/feed/preferences').then(setPreferences);
    }).catch(() => setAuthenticated(false));
  }, []);
  useEffect(() => { load(mode); }, [mode]);

  function handleFeedback(action: 'publication' | 'community', value: string) {
    setItems((current) => current.filter((item) => action === 'publication' ? item.id !== value : item.community.slug !== value));
  }

  const empty = mode === 'subscriptions'
    ? { title: 'Подписки пока не выбраны', text: 'Подпишитесь на сообщества или авторов — здесь будет только выбранный вами контент.', href: '/settings/interests', label: 'Настроить интересы' }
    : mode === 'saved'
      ? { title: 'Сохранённых материалов пока нет', text: 'Добавляйте важные темы в закладки, чтобы быстро вернуться к ним.', href: '/search', label: 'Найти материалы' }
      : mode === 'for-you' && preferences?.recommendationsEnabled === false
        ? { title: 'В персональной ленте пока пусто', text: 'Рекомендации отключены, поэтому здесь показываются только ваши подписки и интересы.', href: '/settings/interests', label: 'Настроить ленту' }
        : { title: 'Публикаций пока нет', text: 'Попробуйте другую вкладку или создайте первый материал.', href: '/create', label: 'Создать публикацию' };

  return <section aria-labelledby="feed-heading" aria-busy={loading}>
    <div className="feed-section-heading"><h2 id="feed-heading">Лента</h2>{authenticated && (mode === 'saved' ? <Link href="/saved">Открыть библиотеку</Link> : mode === 'subscriptions' ? <Link href="/subscriptions">Авторы и хэштеги</Link> : <Link href="/settings/interests">Настроить интересы</Link>)}</div>
    <div className="feed-tabs" role="tablist" aria-label="Режим ленты">{tabs.map(([key, label]) => <button type="button" role="tab" aria-selected={mode === key} key={key} className={mode === key ? 'active' : ''} onClick={() => setMode(key)}>{label}</button>)}</div>
    {(mode === 'subscriptions' || mode === 'saved') && authenticated === false ? <StatePanel title="Войдите, чтобы открыть эту ленту" action={<Link className="button small" href={`/login?next=/${mode === 'saved' ? '?feed=saved' : ''}`}>Войти</Link>}>Подписки и сохранённые материалы связаны с вашим FORRUM ID.</StatePanel>
      : error ? <StatePanel kind="error" title="Не удалось загрузить ленту" action={<button type="button" className="button ghost small" onClick={() => load()}>Повторить</button>}>{error}</StatePanel>
        : loading ? <div className="feed-loading-stack"><div className="card skeleton wide">Загрузка</div><div className="card skeleton wide">Загрузка</div></div>
          : items.length ? <div className="publication-list">{items.map((item) => <PublicationCard key={item.id} item={item} onFeedback={handleFeedback}/>)}</div>
            : <StatePanel title={empty.title} action={<Link className="button ghost small" href={empty.href}>{empty.label}</Link>}>{empty.text}</StatePanel>}
  </section>;
}
