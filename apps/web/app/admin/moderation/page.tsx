'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

type Appeal = { id: string; body: string; status: string; resolutionNote: string | null; createdAt: string; user: { username: string; displayName: string }; action: { id: string; targetType: string; actionType: string; reason: string; publicationId: string | null; commentId: string | null } };
const statusNames: Record<string, string> = { OPEN: 'На рассмотрении', ACCEPTED: 'Принята', REJECTED: 'Отклонена' };
const targetNames: Record<string, string> = { PUBLICATION: 'Публикация', COMMENT: 'Комментарий', USER: 'Аккаунт' };
const actionNames: Record<string, string> = { HIDE: 'Скрытие', WARNING: 'Предупреждение', RESTRICT: 'Ограничение', BAN: 'Блокировка' };

export default function AdminModeration() {
  const [items, setItems] = useState<Appeal[]>([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [notes, setNotes] = useState<Record<string, string>>({});
  const load = () => api<Appeal[]>('/admin/moderation/appeals').then(setItems).catch((cause) => setError(cause.message));
  useEffect(() => { void load(); }, []);

  async function resolve(id: string, status: 'ACCEPTED' | 'REJECTED') {
    const note = notes[id]?.trim();
    if (!note) { setError('Добавьте объяснение решения'); return; }
    try {
      setError('');
      await api(`/admin/moderation/appeals/${id}/resolve`, { method: 'POST', body: JSON.stringify({ status, note }) });
      setMessage(status === 'ACCEPTED' ? 'Апелляция принята, материал восстановлен' : 'Апелляция отклонена'); await load();
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Не удалось обработать апелляцию'); }
  }

  return <div className="admin-review-page">
    <div className="section-title"><div><h1>Апелляции</h1><p className="muted">Решение должно опираться на правила и контекст. Принятая апелляция автоматически восстанавливает скрытый материал.</p></div><Link className="button ghost" href="/admin">Control Center</Link></div>
    {message && <div className="success-box">{message}</div>}{error && <div className="error-box">{error}</div>}
    <div className="admin-review-list">{items.map((appeal) => <article className="admin-review-card" key={appeal.id}>
      <header><div><span className="type-label">{statusNames[appeal.status] ?? appeal.status}</span><span className="type-label">{targetNames[appeal.action.targetType] ?? appeal.action.targetType}</span></div><span className="muted">@{appeal.user.username}</span></header>
      <h2>{actionNames[appeal.action.actionType] ?? appeal.action.actionType}</h2><p><strong>Причина действия:</strong> {appeal.action.reason}</p>
      <blockquote className="appeal-quote"><strong>Позиция пользователя</strong><p>{appeal.body}</p></blockquote>
      {appeal.resolutionNote && <div className="notice"><strong>Итоговое объяснение</strong><p>{appeal.resolutionNote}</p></div>}
      {appeal.status === 'OPEN' && <div className="review-decision-form"><label>Объяснение решения<textarea value={notes[appeal.id] ?? ''} onChange={(event) => setNotes((current) => ({ ...current, [appeal.id]: event.target.value }))} minLength={3} maxLength={1000} placeholder="Что проверено и почему принято такое решение" required/></label><div className="inline-actions"><button type="button" className="button" onClick={() => resolve(appeal.id, 'ACCEPTED')}>Принять и восстановить</button><button type="button" className="button ghost danger-text" onClick={() => resolve(appeal.id, 'REJECTED')}>Оставить решение в силе</button></div></div>}
    </article>)}{!items.length && <div className="empty-state"><strong>Апелляций нет</strong><span>Новых обращений на пересмотр решений пока нет.</span></div>}</div>
  </div>;
}
