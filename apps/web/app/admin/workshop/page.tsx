'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

type Item = { id: string; type: string; status: string; title: string; description: string; thumbnailUrl: string | null; likeCount: number; author: { username: string; displayName: string }; resolutionNote: string | null };
const typeNames: Record<string, string> = { GIFT: 'Подарок', REACTION: 'Реакция', BADGE: 'Значок', PROFILE_THEME: 'Оформление профиля', COMMUNITY_THEME: 'Оформление сообщества' };
const statusNames: Record<string, string> = { DRAFT: 'Черновик', REVIEW: 'На проверке', PUBLISHED: 'Опубликовано', REJECTED: 'Отклонено' };

export default function AdminWorkshop() {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [openId, setOpenId] = useState<string | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const load = () => api<Item[]>('/admin/workshop').then(setItems).catch((cause) => setError(cause.message));
  useEffect(() => { void load(); }, []);

  async function review(id: string, status: 'PUBLISHED' | 'REJECTED') {
    const note = notes[id]?.trim();
    if (!note) { setError('Добавьте комментарий к проверке'); return; }
    try {
      setError('');
      await api(`/admin/workshop/${id}/review`, { method: 'POST', body: JSON.stringify({ status, note }) });
      setMessage(status === 'PUBLISHED' ? 'Работа опубликована' : 'Работа отклонена'); setOpenId(null); await load();
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Не удалось обработать работу'); }
  }

  return <div className="admin-review-page">
    <div className="section-title"><div><h1>Модерация Мастерской</h1><p className="muted">Оценка пользователей помогает найти сильные работы, но не заменяет проверку качества и авторских прав.</p></div><Link className="button ghost" href="/admin">Control Center</Link></div>
    {message && <div className="success-box">{message}</div>}{error && <div className="error-box">{error}</div>}
    <div className="workshop-review-grid">{items.map((item) => <article className="workshop-review-card" key={item.id}>
      <div className="workshop-review-preview">{item.thumbnailUrl ? <img src={item.thumbnailUrl} alt={`Превью работы «${item.title}»`}/> : <span>Нет превью</span>}</div>
      <div className="publication-topline"><span className="type-label">{typeNames[item.type] ?? item.type}</span><span className="type-label">{statusNames[item.status] ?? item.status}</span></div>
      <h2>{item.title}</h2><p>{item.description}</p><p className="muted">Автор: @{item.author.username} · {item.likeCount} отметок</p>
      {item.resolutionNote && <div className="notice">{item.resolutionNote}</div>}
      {item.status === 'REVIEW' && <div className="review-decision-block"><button type="button" className="button secondary small" onClick={() => setOpenId(openId === item.id ? null : item.id)}>Проверить работу</button>{openId === item.id && <div className="review-decision-form"><label>Комментарий автору<textarea value={notes[item.id] ?? ''} onChange={(event) => setNotes((current) => ({ ...current, [item.id]: event.target.value }))} minLength={3} maxLength={1000} placeholder="Что проверено или что нужно исправить"/></label><div className="inline-actions"><button type="button" className="button" onClick={() => review(item.id, 'PUBLISHED')}>Опубликовать</button><button type="button" className="button ghost danger-text" onClick={() => review(item.id, 'REJECTED')}>Отклонить</button></div></div>}</div>}
    </article>)}{!items.length && <div className="empty-state"><strong>Работ на проверке нет</strong><span>Новые предложения Мастерской появятся здесь.</span></div>}</div>
  </div>;
}
