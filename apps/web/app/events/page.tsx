'use client';

import Link from 'next/link';
import {
  useEffect,
  useMemo,
  useState,
} from 'react';
import { api } from '@/lib/api';
import { formatDateTime } from '@/lib/format';
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
  community: {
    slug: string;
    name: string;
    accentColor: string;
  };
  createdBy: {
    username: string;
    displayName: string;
  };
  counts: {
    going: number;
    interested: number;
  };
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
  community: {
    slug: string;
    name: string;
    accentColor: string;
  };
  viewerVote: {
    optionId: string;
    voteClass: string;
  } | null;
  options: Array<{
    id: string;
    label: string;
    bindingVotes: number;
    advisoryVotes: number;
  }>;
};

type Tab =
  | 'all'
  | 'events'
  | 'polls'
  | 'announcements';

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
  const [announcements, setAnnouncements] = useState<
    PublicationCardData[]
  >([]);
  const [tab, setTab] = useState<Tab>('all');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);

    try {
      const [
        eventRows,
        pollRows,
        announcementRows,
      ] = await Promise.all([
        api<EventItem[]>('/events'),
        api<Poll[]>('/governance/polls'),
        api<PublicationCardData[]>('/announcements'),
      ]);

      setEvents(eventRows);
      setPolls(pollRows);
      setAnnouncements(announcementRows);
      setError('');
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : 'Не удалось загрузить актуальное',
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  const upcoming = useMemo(
    () =>
      events
        .filter(
          (item) =>
            item.status === 'PUBLISHED' &&
            new Date(item.startsAt) > new Date(),
        )
        .sort(
          (left, right) =>
            new Date(left.startsAt).getTime() -
            new Date(right.startsAt).getTime(),
        ),
    [events],
  );

  const openPolls = useMemo(
    () =>
      polls
        .filter((item) => item.status === 'OPEN')
        .sort(
          (left, right) =>
            new Date(left.closesAt).getTime() -
            new Date(right.closesAt).getTime(),
        ),
    [polls],
  );

  async function attend(
    id: string,
    status: 'GOING' | 'INTERESTED',
  ) {
    try {
      await api(`/events/${id}/attendance`, {
        method: 'POST',
        body: JSON.stringify({ status }),
      });

      setMessage(
        status === 'GOING'
          ? 'Вы добавлены в список участников.'
          : 'Событие отмечено как интересное.',
      );

      await load();
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : 'Не удалось изменить участие',
      );
    }
  }

  async function vote(
    pollId: string,
    optionId: string,
  ) {
    try {
      const result = await api<{
        voteClass: string;
      }>(`/governance/polls/${pollId}/vote`, {
        method: 'POST',
        body: JSON.stringify({ optionId }),
      });

      setMessage(
        result.voteClass === 'BINDING'
          ? 'Решающий голос учтён.'
          : 'Мнение учтено как консультативное.',
      );

      await load();
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : 'Не удалось проголосовать',
      );
    }
  }

  function renderEvent(item: EventItem) {
    return (
      <article
        className="activity-row"
        key={`event-${item.id}`}
      >
        <time className="activity-date">
          <strong>
            {new Date(item.startsAt).toLocaleDateString(
              'ru-RU',
              { day: '2-digit' },
            )}
          </strong>
          <span>
            {new Date(item.startsAt).toLocaleDateString(
              'ru-RU',
              { month: 'short' },
            )}
          </span>
        </time>

        <span
          className="activity-kind"
          aria-hidden="true"
        >
          □
        </span>

        <div className="activity-copy">
          <div>
            <span>Событие</span>
            <Link
              href={`/communities/${item.community.slug}`}
            >
              {item.community.name}
            </Link>
          </div>
          <Link
            className="activity-title"
            href={`/events/${item.id}`}
          >
            {item.title}
          </Link>
          <p>{item.description}</p>
        </div>

        <div className="activity-meta">
          <strong>
            {formatDateTime(item.startsAt)}
          </strong>
          <span>
            {eventFormat[item.format] ?? item.format}
            {item.location
              ? ` · ${item.location}`
              : ''}
          </span>
          <span>
            {item.counts.going} идут ·{' '}
            {item.counts.interested} интересуются
          </span>
        </div>

        <div className="activity-actions">
          <button
            type="button"
            className={
              item.viewerAttendance === 'GOING'
                ? 'button small'
                : 'button ghost small'
            }
            onClick={() =>
              void attend(item.id, 'GOING')
            }
          >
            {item.viewerAttendance === 'GOING'
              ? 'Вы идёте'
              : 'Пойду'}
          </button>

          <button
            type="button"
            className={
              item.viewerAttendance === 'INTERESTED'
                ? 'button small'
                : 'button ghost small'
            }
            onClick={() =>
              void attend(item.id, 'INTERESTED')
            }
          >
            Интересно
          </button>
        </div>
      </article>
    );
  }

  function renderPoll(
    poll: Poll,
    interactive = false,
  ) {
    const totalBinding = poll.options.reduce(
      (sum, option) =>
        sum + option.bindingVotes,
      0,
    );

    return (
      <article
        className="activity-row poll-activity-row"
        key={`poll-${poll.id}`}
      >
        <time className="activity-date">
          <strong>
            {new Date(
              poll.closesAt,
            ).toLocaleDateString('ru-RU', {
              day: '2-digit',
            })}
          </strong>
          <span>до</span>
        </time>

        <span
          className="activity-kind"
          aria-hidden="true"
        >
          ▥
        </span>

        <div className="activity-copy">
          <div>
            <span>Голосование</span>
            <Link
              href={`/communities/${poll.community.slug}`}
            >
              {poll.community.name}
            </Link>
          </div>
          <strong className="activity-title">
            {poll.title}
          </strong>
          <p>{poll.description}</p>

          {interactive && (
            <div className="compact-poll-options">
              {poll.options.map((option) => (
                <button
                  type="button"
                  key={option.id}
                  className={
                    poll.viewerVote?.optionId ===
                    option.id
                      ? 'selected'
                      : ''
                  }
                  disabled={poll.status !== 'OPEN'}
                  onClick={() =>
                    void vote(poll.id, option.id)
                  }
                >
                  <span>{option.label}</span>
                  <small>
                    {option.bindingVotes}
                    {poll.allowAdvisory
                      ? ` · ${option.advisoryVotes}`
                      : ''}
                  </small>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="activity-meta">
          <strong>
            {pollKind[poll.kind] ?? poll.kind}
          </strong>
          <span>
            До {formatDateTime(poll.closesAt)}
          </span>
          <span>
            {totalBinding} решающих голосов
          </span>
        </div>

        <div className="activity-actions">
          <button
            type="button"
            className="button ghost small"
            onClick={() => setTab('polls')}
          >
            {poll.viewerVote
              ? 'Результаты'
              : 'Проголосовать'}
          </button>
        </div>
      </article>
    );
  }

  function renderAnnouncement(
    item: PublicationCardData,
  ) {
    return (
      <article
        className="activity-row"
        key={`announcement-${item.id}`}
      >
        <time className="activity-date">
          <strong>
            {new Date(
              item.createdAt,
            ).toLocaleDateString('ru-RU', {
              day: '2-digit',
            })}
          </strong>
          <span>
            {new Date(
              item.createdAt,
            ).toLocaleDateString('ru-RU', {
              month: 'short',
            })}
          </span>
        </time>

        <span
          className="activity-kind"
          aria-hidden="true"
        >
          ◁
        </span>

        <div className="activity-copy">
          <div>
            <span>Объявление</span>
            <Link
              href={`/communities/${item.community.slug}`}
            >
              {item.community.name}
            </Link>
          </div>
          <Link
            className="activity-title"
            href={`/p/${item.slug}`}
          >
            {item.title || item.excerpt}
          </Link>
          <p>{item.excerpt}</p>
        </div>

        <div className="activity-meta">
          <strong>
            {item.author.displayName}
          </strong>
          <span>
            {item.commentCount} ответов
          </span>
          <span>
            {item.viewCount ?? 0} просмотров
          </span>
        </div>

        <div className="activity-actions">
          <Link
            className="button ghost small"
            href={`/p/${item.slug}`}
          >
            Открыть
          </Link>
        </div>
      </article>
    );
  }

  return (
    <div className="events-directory-page">
      <header className="compact-page-heading">
        <div>
          <h1>Актуальное</h1>
          <p>
            События, голосования и объявления
            сообществ.
          </p>
        </div>

        <Link
          className="button"
          href="/events/create"
        >
          Создать
        </Link>
      </header>

      <nav
        className="compact-section-tabs"
        aria-label="Актуальное FORRUM"
      >
        <button
          type="button"
          className={tab === 'all' ? 'active' : ''}
          onClick={() => setTab('all')}
        >
          Всё
          <span>
            {upcoming.length +
              openPolls.length +
              announcements.length}
          </span>
        </button>

        <button
          type="button"
          className={tab === 'events' ? 'active' : ''}
          onClick={() => setTab('events')}
        >
          События
          <span>{upcoming.length}</span>
        </button>

        <button
          type="button"
          className={tab === 'polls' ? 'active' : ''}
          onClick={() => setTab('polls')}
        >
          Голосования
          <span>{openPolls.length}</span>
        </button>

        <button
          type="button"
          className={
            tab === 'announcements' ? 'active' : ''
          }
          onClick={() => setTab('announcements')}
        >
          Объявления
          <span>{announcements.length}</span>
        </button>
      </nav>

      <div aria-live="polite">
        {message && (
          <div className="success-box">{message}</div>
        )}
        {error && (
          <div className="error-box">
            {error}
            <button
              type="button"
              className="button ghost small"
              onClick={() => void load()}
            >
              Повторить
            </button>
          </div>
        )}
      </div>

      <section className="activity-list">
        {loading ? (
          <div className="compact-row-skeletons">
            {Array.from({ length: 8 }).map(
              (_, index) => (
                <span key={index} />
              ),
            )}
          </div>
        ) : tab === 'all' ? (
          <>
            {upcoming
              .slice(0, 5)
              .map((item) => renderEvent(item))}
            {openPolls
              .slice(0, 5)
              .map((poll) => renderPoll(poll))}
            {announcements
              .slice(0, 5)
              .map((item) =>
                renderAnnouncement(item),
              )}
          </>
        ) : tab === 'events' ? (
          upcoming.map((item) => renderEvent(item))
        ) : tab === 'polls' ? (
          openPolls.map((poll) => (
            <div id={`poll-${poll.id}`} key={poll.id}>
              {renderPoll(poll, true)}
            </div>
          ))
        ) : (
          announcements.map((item) =>
            renderAnnouncement(item),
          )
        )}

        {!loading &&
          ((tab === 'all' &&
            !upcoming.length &&
            !openPolls.length &&
            !announcements.length) ||
            (tab === 'events' && !upcoming.length) ||
            (tab === 'polls' && !openPolls.length) ||
            (tab === 'announcements' &&
              !announcements.length)) && (
            <div className="compact-empty-state">
              <strong>
                В этом разделе пока пусто
              </strong>
              <span>
                Новая активность появится после
                публикации командой сообщества.
              </span>
            </div>
          )}
      </section>
    </div>
  );
}
