'use client';

import Link from 'next/link';
import {useQueue,QueueFrame} from '@/components/admin/queue';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Avatar } from '@/components/avatar';
import { formatRelativeTime } from '@/lib/format';

type Review = { id: string; moderationStatus:string; moderationNote:string|null; verdict: string; body: string; createdAt: string; author: { username: string; displayName: string; avatarUrl: string | null }; target: { username: string; displayName: string; avatarUrl: string | null }; evidenceMedia: { id: string } | null; interaction: { id: string; type: string; title: string } };

export default function AdminReviewsPage() {
  const queue=useQueue<Review>('reviews'); const {items,error,setError,load}=queue;

  const [message, setMessage] = useState('');
  const [notes, setNotes] = useState<Record<string, string>>({});

  async function moderate(id: string, status: 'PUBLISHED' | 'REJECTED') {
    try {
      await api(`/admin/reviews/${id}/moderate`, { method: 'POST', body: JSON.stringify({ status, note: notes[id] || undefined }) });
      setMessage(status === 'PUBLISHED' ? 'Отзыв опубликован' : 'Отзыв отклонён');
      await load();
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Не удалось обработать отзыв'); }
  }

  return <div className="admin-reviews-page">
    <div className="section-title"><div><span className="eyebrow">Модерация</span><h1>Отзывы с подтверждениями</h1><p className="muted">Проверьте, что на изображении нет лишних имён, телефонов, адресов, реквизитов и чужой переписки.</p></div><Link className="button ghost" href="/admin">Обзор форума</Link></div>
    {message && <div className="success-box">{message}</div>}
    <QueueFrame queue={queue}><div className="publication-list">{items.map((item) => <article className="card admin-review-evidence" key={item.id}><header><Avatar name={item.author.displayName} size={42} url={item.author.avatarUrl}/><div><strong>{item.author.displayName} → {item.target.displayName}</strong><span>{formatRelativeTime(item.createdAt)} · {item.interaction.title}</span></div></header><p className="adm-badge">{item.moderationStatus==='REVIEW'?'На проверке':item.moderationStatus==='PUBLISHED'?'Опубликован':'Отклонён'}</p><p>{item.body}</p>{item.evidenceMedia && <a className="review-evidence-preview" href={`/api/media/${item.evidenceMedia.id}/content`} target="_blank" rel="noreferrer"><img src={`/api/media/${item.evidenceMedia.id}/content?variant=thumbnail`} alt="Подтверждение к отзыву"/><span>Открыть фото полностью</span></a>}{item.moderationStatus==='REVIEW'&&<><label>Комментарий модерации<textarea value={notes[item.id] ?? ''} onChange={(event) => setNotes((current) => ({ ...current, [item.id]: event.target.value }))} maxLength={1000}/></label><div className="inline-actions"><button type="button" className="button" onClick={() => void queue.act(() => moderate(item.id, 'PUBLISHED'))}>Опубликовать</button><button type="button" className="button danger" onClick={() => void queue.act(() => moderate(item.id, 'REJECTED'))}>Отклонить</button></div></>}{item.moderationNote&&<p>{item.moderationNote}</p>}</article>)}</div>
  </QueueFrame></div>;
}
