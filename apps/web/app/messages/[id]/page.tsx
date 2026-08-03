'use client';

import Link from 'next/link';
import type { FormEvent, KeyboardEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { api } from '@/lib/api';
import { Avatar } from '@/components/avatar';
import { formatDateTime } from '@/lib/format';

type Member = { username: string; displayName: string; avatarUrl?: string | null };
type Message = { id: string; body: string; createdAt: string; author: Member; isMine: boolean };
type Conversation = { id: string; other: Member | null; members: Member[]; messages: Message[] };

function dayKey(value: string) {
  return new Date(value).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function ConversationPage() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<Conversation | null>(null);
  const [error, setError] = useState('');
  const [body, setBody] = useState('');
  const [sending, setSending] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const load = async (scroll = false) => {
    try {
      setError('');
      const result = await api<Conversation>(`/messages/${id}`);
      setData(result);
      if (scroll) window.setTimeout(() => endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }), 20);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Не удалось загрузить переписку');
    }
  };
  useEffect(() => { void load(true); }, [id]);

  async function send(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    if (!body.trim() || sending) return;
    setSending(true);
    try {
      await api(`/messages/${id}`, { method: 'POST', body: JSON.stringify({ body: body.trim() }) });
      setBody('');
      await load(true);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Не удалось отправить сообщение');
    } finally {
      setSending(false);
    }
  }

  function keyboard(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      void send();
    }
  }

  if (!data) return <div className={error ? 'error-box' : 'conversation-loading'}>{error || <><div className="skeleton medium"/><div className="skeleton tall"/></>}</div>;

  let previousDay = '';
  return <div className="conversation-page-modern">
    <header className="conversation-header-modern">
      <Link className="back-link" href="/messages">← Сообщения</Link>
      <div className="conversation-person">
        <Avatar name={data.other?.displayName ?? 'Диалог'} size={44} url={data.other?.avatarUrl}/>
        <div><h1>{data.other?.displayName ?? 'Диалог'}</h1>{data.other && <Link href={`/u/${data.other.username}`}>@{data.other.username}</Link>}</div>
      </div>
    </header>

    {error && <div className="error-box" role="alert">{error}<button type="button" className="button ghost small" onClick={() => load()}>Повторить</button></div>}

    <div className="message-list-modern" aria-live="polite">
      {!data.messages.length && <div className="empty-state"><strong>Диалог пуст</strong><span>Отправьте первое сообщение.</span></div>}
      {data.messages.map((message) => {
        const currentDay = dayKey(message.createdAt);
        const showDay = currentDay !== previousDay;
        previousDay = currentDay;
        return <div key={message.id} className="message-entry">
          {showDay && <div className="message-day"><span>{currentDay}</span></div>}
          <div className={`message-line ${message.isMine ? 'mine' : ''}`}>
            {!message.isMine && <Avatar name={message.author.displayName} size={32} url={message.author.avatarUrl}/>} 
            <div className={`message-bubble-modern ${message.isMine ? 'mine' : ''}`}>
              {!message.isMine && <strong>{message.author.displayName}</strong>}
              <div>{message.body}</div>
              <time>{formatDateTime(message.createdAt)}</time>
            </div>
          </div>
        </div>;
      })}
      <div ref={endRef}/>
    </div>

    <div className="message-composer-modern">
      <form onSubmit={send}>
        <label className="visually-hidden" htmlFor="message-body">Сообщение</label>
        <textarea id="message-body" value={body} onChange={(event) => setBody(event.target.value)} onKeyDown={keyboard} maxLength={5000} placeholder="Напишите сообщение…" required/>
        <button className="button" disabled={sending || !body.trim()}>{sending ? 'Отправляем…' : 'Отправить'}</button>
      </form>
      <div className="message-composer-help"><span>Enter — отправить</span><span>Shift + Enter — новая строка</span><span>{body.length}/5000</span></div>
    </div>
  </div>;
}
