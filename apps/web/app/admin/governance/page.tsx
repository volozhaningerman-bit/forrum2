'use client';

import Link from 'next/link';
import {useQueue,QueueFrame} from '@/components/admin/queue';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

type Proposal = { id: string; name: string; description: string; initialTopics: string; status: string; supportCount: number; author: { username: string }; suggestedParent: { slug: string; name: string } | null; resolutionNote: string | null };
const statusNames: Record<string, string> = { OPEN: 'На рассмотрении', APPROVED: 'Одобрено', REJECTED: 'Отклонено' };

export default function AdminGovernance() {
  const queue=useQueue<Proposal>('proposals'); const {items,error,setError,load}=queue;

  const [message, setMessage] = useState('');
  const [openId, setOpenId] = useState<string | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});


  async function resolve(id: string, status: 'APPROVED' | 'REJECTED') {
    const note = notes[id]?.trim();
    if (!note || note.length < 3) { setError('Добавьте комментарий (от 3 символов) к решению'); return; }
    try {
      setError('');
      await api(`/admin/governance/proposals/${id}/resolve`, { method: 'POST', body: JSON.stringify({ status, note }) });
      setMessage(status === 'APPROVED' ? 'Сообщество одобрено и создано' : 'Предложение отклонено');
      setOpenId(null); await load();
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Не удалось обработать предложение'); }
  }

  return <div className="admin-review-page">
    <div className="section-title"><div><h1>Предложения сообществ</h1><p className="muted">Поддержка пользователей — важный сигнал, но финальное решение учитывает контент, команду и пересечение с существующими разделами.</p></div><Link className="button ghost" href="/admin">Обзор форума</Link></div>
    {message && <div className="success-box">{message}</div>}
    <QueueFrame queue={queue}><div className="admin-review-list">{items.map((proposal) => <article className="admin-review-card" key={proposal.id}>
      <header><div><span className="type-label">{statusNames[proposal.status] ?? proposal.status}</span><span className="support-count">{proposal.supportCount} поддержали</span></div><span className="muted">Автор: @{proposal.author.username}</span></header>
      <h2>{proposal.name}</h2><p>{proposal.description}</p>
      {proposal.suggestedParent && <p className="muted">Предлагаемый родительский раздел: <Link href={`/communities/${proposal.suggestedParent.slug}`}>{proposal.suggestedParent.name}</Link></p>}
      <div className="proposal-topics"><strong>Первые предполагаемые темы</strong><p>{proposal.initialTopics}</p></div>
      {proposal.resolutionNote && <div className="notice"><strong>Комментарий администрации</strong><p>{proposal.resolutionNote}</p></div>}
      {proposal.status === 'OPEN' && <div className="review-decision-block">
        <button type="button" className="button secondary small" onClick={() => setOpenId(openId === proposal.id ? null : proposal.id)}>Принять решение</button>
        {openId === proposal.id && <div className="review-decision-form"><label>Комментарий к решению<textarea value={notes[proposal.id] ?? ''} onChange={(event) => setNotes((current) => ({ ...current, [proposal.id]: event.target.value }))} minLength={3} maxLength={1000} placeholder="Почему раздел создаётся или почему пока рано"/></label><div className="inline-actions"><button type="button" className="button" onClick={() => void queue.act(() => resolve(proposal.id, 'APPROVED'))}>Одобрить и создать</button><button type="button" className="button ghost danger-text" onClick={() => void queue.act(() => resolve(proposal.id, 'REJECTED'))}>Отклонить</button></div></div>}
      </div>}
    </article>)}</div>
  </QueueFrame></div>;
}
