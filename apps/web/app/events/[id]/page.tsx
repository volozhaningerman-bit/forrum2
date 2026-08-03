'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { formatDateTime } from '@/lib/format';
import { Avatar } from '@/components/avatar';
import { StatePanel } from '@/components/state-panel';

type EventDetail = { id: string; title: string; description: string; format: string; status: string; startsAt: string; endsAt: string | null; location: string | null; capacity: number | null; community: { slug: string; name: string; accentColor: string }; createdBy: { username: string; displayName: string }; counts: { going: number; interested: number }; viewerAttendance: string | null; attendees: Array<{ status: string; user: { username: string; displayName: string; avatarUrl: string | null } }> };
export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>(); const [data, setData] = useState<EventDetail | null>(null); const [error, setError] = useState(''); const [message, setMessage] = useState('');
  const load = () => api<EventDetail>(`/events/${id}`).then((value) => { setData(value); setError(''); }).catch((cause) => setError(cause.message));
  useEffect(() => { void load(); }, [id]);
  async function attend(status: 'GOING' | 'INTERESTED' | 'NOT_GOING') { try { await api(`/events/${id}/attendance`, { method: 'POST', body: JSON.stringify({ status }) }); setMessage(status === 'NOT_GOING' ? 'Участие отменено.' : 'Статус участия сохранён.'); await load(); } catch (cause) { setError(cause instanceof Error ? cause.message : 'Не удалось изменить участие'); } }
  if (!data) return <StatePanel kind={error ? 'error' : 'loading'} title={error ? 'Событие недоступно' : 'Загрузка события'}>{error && <p>{error}</p>}</StatePanel>;
  return <div className="event-detail" style={{ '--community-accent': data.community.accentColor } as React.CSSProperties}><p><Link className="muted" href="/events">← Все события</Link></p><article className="card event-detail-main"><div className="publication-topline"><Link href={`/communities/${data.community.slug}`}>{data.community.name}</Link><span className="type-label">{data.status === 'PUBLISHED' ? 'Открыта запись' : data.status === 'CANCELLED' ? 'Отменено' : 'Завершено'}</span></div><h1>{data.title}</h1><p className="event-date">{formatDateTime(data.startsAt)}{data.endsAt ? ` — ${formatDateTime(data.endsAt)}` : ''}</p><div className="bbcode-body"><p>{data.description}</p></div>{data.location && <div className="event-location"><strong>Место</strong><span>{data.location}</span></div>}{message && <div className="success-box">{message}</div>}{error && <div className="error-box">{error}</div>}{data.status === 'PUBLISHED' && <div className="inline-actions"><button type="button" className="button" onClick={() => attend('GOING')}>{data.viewerAttendance === 'GOING' ? 'Вы идёте' : 'Пойду'}</button><button type="button" className="button secondary" onClick={() => attend('INTERESTED')}>Интересно</button>{data.viewerAttendance && <button type="button" className="button ghost" onClick={() => attend('NOT_GOING')}>Отменить участие</button>}</div>}</article><aside className="card"><h2>Участники</h2><p className="muted">{data.counts.going} идут · {data.counts.interested} интересуются{data.capacity ? ` · лимит ${data.capacity}` : ''}</p><div className="attendee-list">{data.attendees.slice(0, 40).map((item) => <Link href={`/u/${item.user.username}`} key={`${item.status}-${item.user.username}`}><Avatar name={item.user.displayName} src={item.user.avatarUrl} size={36}/><span><strong>{item.user.displayName}</strong><small>{item.status === 'GOING' ? 'Идёт' : 'Интересуется'}</small></span></Link>)}</div></aside></div>;
}
