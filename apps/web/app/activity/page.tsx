'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { api } from '@/lib/api';
import { StatePanel } from '@/components/state-panel';
import { PersonalLinks } from '@/components/personal-links';
import { formatDateTime, formatRelativeTime } from '@/lib/format';

type Category = 'all' | 'content' | 'saved' | 'subscriptions';
type Activity = { id: string; action: string; category: Exclude<Category, 'all'>; title: string; detail: string; href: string | null; createdAt: string };

const labels: Record<Category, string> = { all: 'Всё', content: 'Публикации и ответы', saved: 'Сохранённое', subscriptions: 'Подписки' };

export default function ActivityPage() {
  const [items, setItems] = useState<Activity[]>([]);
  const [category, setCategory] = useState<Category>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => { api<Activity[]>('/users/me/activity').then(setItems).catch((cause) => setError(cause instanceof Error ? cause.message : 'Не удалось загрузить историю')).finally(() => setLoading(false)); }, []);
  const visible = useMemo(() => category === 'all' ? items : items.filter((item) => item.category === category), [items, category]);
  const groups = useMemo(() => {
    const map = new Map<string, Activity[]>();
    for (const item of visible) {
      const key = new Date(item.createdAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
      map.set(key, [...(map.get(key) ?? []), item]);
    }
    return [...map.entries()];
  }, [visible]);

  if (!loading && error && !items.length) return <div className="personal-library-layout"><main><StatePanel kind="error" title="Не удалось открыть историю" action={<div className="inline-actions"><button className="button ghost small" type="button" onClick={() => window.location.reload()}>Повторить</button><Link className="button small" href="/login?next=/activity">Войти</Link></div>}>История действий доступна только владельцу аккаунта.</StatePanel></main><aside className="personal-library-sidebar"><PersonalLinks/></aside></div>;

  return <div className="personal-library-layout"><main>
    <header className="settings-page-header"><div><span className="auth-eyebrow">Приватный журнал</span><h1>История действий</h1><p className="muted">Только вы видите эту страницу. Здесь сохраняются изменения подписок, закладок и ваших материалов.</p></div></header>
    {error && <div className="error-box">{error}</div>}
    <nav className="activity-filters" aria-label="Фильтр истории">{(Object.keys(labels) as Category[]).map((value) => <button type="button" className={category === value ? 'active' : ''} onClick={() => setCategory(value)} key={value}>{labels[value]}<span>{value === 'all' ? items.length : items.filter((item) => item.category === value).length}</span></button>)}</nav>
    {loading ? <StatePanel kind="loading" title="Загружаем историю">Собираем последние действия вашего аккаунта.</StatePanel> : groups.length ? <div className="activity-timeline">{groups.map(([date, rows]) => <section key={date}><h2>{date}</h2><div className="card activity-day">{rows.map((item) => <article className={`activity-row activity-${item.category}`} key={item.id}><span className="activity-marker"/><div><strong>{item.title}</strong>{item.href ? <Link href={item.href}>{item.detail}</Link> : <span>{item.detail}</span>}<time title={formatDateTime(item.createdAt)}>{formatRelativeTime(item.createdAt)}</time></div></article>)}</div></section>)}</div> : <StatePanel title={items.length ? 'В этой категории действий нет' : 'История пока пуста'}>{items.length ? 'Выберите другой фильтр.' : 'Новые подписки, сохранения и публикации появятся здесь автоматически.'}</StatePanel>}
  </main><aside className="personal-library-sidebar"><PersonalLinks/><div className="card settings-sidebar-card"><h3>Что не показывается</h3><p className="muted">Пароли, содержимое личных сообщений, IP-адреса и внутренние действия модерации сюда не попадают.</p></div></aside></div>;
}
