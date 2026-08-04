'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { api } from '@/lib/api';
import { formatDateTime } from '@/lib/format';
import { StatePanel } from '@/components/state-panel';
import { PublicationCard } from '@/components/publication-card';
import type { PublicationCardData } from '@/lib/types';

type EventItem = {
  id: string;
  title: string;
  description: string;
  format: string;
  status: string;
  startsAt: string;
  endsAt: string | null;
  location: string | null;
  capacity: number | null;
  createdAt: string;
  community: { slug: string; name: string; accentColor: string };
  createdBy: { username: string; displayName: string };
  counts: { going: number; interested: number };
  viewerAttendance: string | null;
};

type Poll = {
  id: string;
  title: string;
  description: string;
  kind: string;
  status: string;
  closesAt: string;
  createdAt: string;
  quorum: number | null;
  minAccountAgeDays: number;
  requireSubscription: boolean;
  allowAdvisory: boolean;
  resultNote: string | null;
  community: { slug: string; name: string; accentColor: string };
  viewerVote: { optionId: string; voteClass: string } | null;
  options: Array<{ id: string; label: string; bindingVotes: number; advisoryVotes: number }>;
};

type Tab = 'events' | 'polls' | 'announcements';

const eventFormat: Record<string, string> = {
  ONLINE: 'Онлайн',
  OFFLINE: 'Офлайн',
  HYBRID: 'Гибрид',
};

const pollKind: Record<string, string> = {
  GENERAL: 'Общий вопрос',
  TEAM_REVIEW: 'Оценка команды',
  ELECTION: 'Выборы',
  STRUCTURE: 'Структура',
  BUDGET: 'Средства сообщества',
};

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [polls, setPolls] = useState<Poll[]>([]);
  const [announcements, setAnnouncements] = useState<PublicationCardData[]>([]);
  const [tab, setTab] = useState<Tab>('events');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const [eventRows, pollRows, announcementRows] = await Promise.all([
        api<EventItem[]>('/events'),
        api<Poll[]>('/governance/polls'),
        api<PublicationCardData[]>('/announcements'),
      ]);
      setEvents(eventRows);
      setPolls(pollRows);
      setAnnouncements(announcementRows);
      setError('');
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Не удалось загрузить события');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const upcoming = useMemo(
    () => events.filter((item) => item.status === 'PUBLISHED' && new Date(item.startsAt) > new Date()),
    [events],
  );

  const past = useMemo(
    () => events.filter((item) => item.status !== 'PUBLISHED' || new Date(item.startsAt) <= new Date()),
    [events],
  );

  async function attend(id: string, status: 'GOING' | 'INTERESTED') {
    try {
      await api(`/events/${id}/attendance`, { method: 'POST', body: JSON.stringify({ status }) });
      setMessage(status === 'GOING' ? 'Вы добавлены в список участников.' : 'Событие отмечено как интересное.');
      await load();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Не удалось изменить участие');
    }
  }

  async function vote(pollId: string, optionId: string) {
    try {
      const result = await api<{ voteClass: string }>(`/governance/polls/${pollId}/vote`, {
        method: 'POST',
        body: JSON.stringify({ optionId }),
      });
      setMessage(result.voteClass === 'BINDING' ? 'Решающий голос учтён.' : 'Мнение учтено как консультативное.');
      await load();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Не удалось проголосовать');
    }
  }

  return <div className="events-hub">
    <section className="section-hero compact-hero">
      <div>
        <span className="eyebrow">Важное на FORRUM</span>
        <h1>События</h1>
        <p>Встречи, голосования и объявления собраны в одном месте. Новая активность отмечается точкой в главном меню.</p>
      </div>
      <Link className="button" href="/events/create">Создать</Link>
    </section>

    <nav className="workspace-tabs" aria-label="События, голосования и объявления">
      <button type="button" className={tab === 'events' ? 'active' : ''} onClick={() => setTab('events')}>События <span>{upcoming.length}</span></button>
      <button type="button" className={tab === 'polls' ? 'active' : ''} onClick={() => setTab('polls')}>Голосования <span>{polls.filter((item) => item.status === 'OPEN').length}</span></button>
      <button type="button" className={tab === 'announcements' ? 'active' : ''} onClick={() => setTab('announcements')}>Объявления <span>{announcements.length}</span></button>
    </nav>

    <div aria-live="polite">
      {message && <div className="success-box">{message}</div>}
      {error && <div className="error-box">{error}</div>}
    </div>

    {loading && <StatePanel kind="loading" title="Загрузка событий"><p>Проверяем календарь, решения и новые объявления.</p></StatePanel>}

    {!loading && tab === 'events' && <>
      <section className="event-grid">
        {upcoming.map((item) => <article className="card event-card" key={item.id} style={{ '--community-accent': item.community.accentColor } as React.CSSProperties}>
          <div className="publication-topline">
            <Link href={`/communities/${item.community.slug}`}>{item.community.name}</Link>
            <span className="type-label">{eventFormat[item.format] ?? item.format}</span>
          </div>
          <p className="event-date">{formatDateTime(item.startsAt)}</p>
          <h2><Link href={`/events/${item.id}`}>{item.title}</Link></h2>
          <p>{item.description.slice(0, 220)}</p>
          {item.location && <p className="muted">Место: {item.location}</p>}
          <div className="event-counts">
            <span>{item.counts.going} идут</span>
            <span>{item.counts.interested} интересуются</span>
            {item.capacity && <span>лимит {item.capacity}</span>}
          </div>
          <div className="inline-actions">
            <button type="button" className={item.viewerAttendance === 'GOING' ? 'button small' : 'button secondary small'} onClick={() => attend(item.id, 'GOING')}>{item.viewerAttendance === 'GOING' ? 'Вы идёте' : 'Пойду'}</button>
            <button type="button" className={item.viewerAttendance === 'INTERESTED' ? 'button small' : 'button ghost small'} onClick={() => attend(item.id, 'INTERESTED')}>Интересно</button>
          </div>
        </article>)}

        {!upcoming.length && <StatePanel title="Ближайших событий нет" action={<Link className="button small" href="/events/create">Предложить событие</Link>}><p>Здесь появятся только реальные встречи с указанной датой.</p></StatePanel>}
      </section>

      {past.length > 0 && <section className="past-events">
        <h2>Прошедшие и отменённые</h2>
        <div className="compact-event-list">
          {past.slice(0, 20).map((item) => <Link href={`/events/${item.id}`} key={item.id}>
            <strong>{item.title}</strong>
            <span>{item.community.name} · {formatDateTime(item.startsAt)} · {item.status === 'CANCELLED' ? 'отменено' : 'завершено'}</span>
          </Link>)}
        </div>
      </section>}
    </>}

    {!loading && tab === 'polls' && <section className="publication-list">
      {polls.map((poll) => {
        const totalBinding = poll.options.reduce((sum, option) => sum + option.bindingVotes, 0);
        const totalAdvisory = poll.options.reduce((sum, option) => sum + option.advisoryVotes, 0);
        const open = poll.status === 'OPEN';
        const quorumReached = poll.quorum === null || totalBinding >= poll.quorum;

        return <article className="card poll-card full-poll-card" key={poll.id} style={{ '--community-accent': poll.community.accentColor } as React.CSSProperties}>
          <div className="publication-topline">
            <Link className="community-link" href={`/communities/${poll.community.slug}`}>{poll.community.name}</Link>
            <span className="type-label">{pollKind[poll.kind] ?? poll.kind}</span>
          </div>
          <h2>{poll.title}</h2>
          <p>{poll.description}</p>
          <div className="poll-rules">
            <span>{open ? `До ${formatDateTime(poll.closesAt)}` : 'Завершено'}</span>
            <span>{poll.requireSubscription ? 'Решающий голос после подписки' : 'Подписка не обязательна'}</span>
            <span>Возраст аккаунта: {poll.minAccountAgeDays} дн.</span>
            {poll.quorum && <span className={quorumReached ? 'success-text' : ''}>Кворум: {totalBinding}/{poll.quorum}</span>}
          </div>
          {poll.viewerVote && <div className="vote-class-note">Ваш {poll.viewerVote.voteClass === 'BINDING' ? 'решающий' : 'консультативный'} голос учтён. Выбор можно изменить до закрытия.</div>}
          <div className="poll-options">
            {poll.options.map((option) => <button type="button" key={option.id} className={`poll-option ${poll.viewerVote?.optionId === option.id ? 'selected' : ''}`} disabled={!open} onClick={() => vote(poll.id, option.id)}>
              <span>{option.label}</span>
              <small>{option.bindingVotes} решающих{poll.allowAdvisory ? ` · ${option.advisoryVotes} консультативных` : ''}</small>
            </button>)}
          </div>
          {!open && poll.resultNote && <div className="poll-result"><strong>Итог команды</strong><p>{poll.resultNote}</p></div>}
        </article>;
      })}

      {!polls.length && <StatePanel title="Голосований пока нет"><p>Команда сообщества сможет вынести вопрос, когда действительно потребуется решение.</p></StatePanel>}
    </section>}

    {!loading && tab === 'announcements' && <section className="publication-list spacious-list">
      {announcements.map((item) => <PublicationCard key={item.id} item={item}/>)}
      {!announcements.length && <StatePanel title="Новых объявлений нет"><p>Здесь будут появляться важные объявления сообществ и команды FORRUM.</p></StatePanel>}
    </section>}
  </div>;
}
