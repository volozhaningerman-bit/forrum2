'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Avatar } from '@/components/avatar';
import type { WeeklyUser } from './types';

type WeeklyMode = 'likes' | 'activity';

export function WeeklyMembersPanel({
  weekly,
}: {
  weekly: {
    likes: WeeklyUser[];
    activity: WeeklyUser[];
  };
}) {
  const [mode, setMode] = useState<WeeklyMode>('activity');
  const participants = useMemo(
    () =>
      weekly[mode]
        .map((participant) => ({
          ...participant,
          score:
            mode === 'likes'
              ? participant.reactionCount
              : participant.topicCount + participant.commentCount,
        }))
        .filter((participant) => participant.score > 0)
        .sort(
          (left, right) =>
            right.score - left.score ||
            left.username.localeCompare(right.username, 'ru'),
        )
        .slice(0, 5),
    [mode, weekly],
  );

  return (
    <section className="forrum-home-v16__panel forrum-home-v19__weekly-panel">
      <header className="forrum-home-v16__panel-head">
        <h2>Участники недели</h2>
      </header>
      <div
        className="forrum-home-v16__tabs"
        role="tablist"
        aria-label="Рейтинг недели"
      >
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'likes'}
          aria-controls="weekly-ranking-panel"
          className={mode === 'likes' ? 'is-active' : ''}
          onClick={() => setMode('likes')}
        >
          По симпатиям
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'activity'}
          aria-controls="weekly-ranking-panel"
          className={mode === 'activity' ? 'is-active' : ''}
          onClick={() => setMode('activity')}
        >
          По активности
        </button>
      </div>
      <div
        className="forrum-home-v16__weekly-list"
        id="weekly-ranking-panel"
        role="tabpanel"
      >
        {participants.length ? (
          participants.map((participant, index) => (
            <Link
              className="forrum-home-v16__weekly-row"
              href={`/u/${participant.username}`}
              key={participant.username}
            >
              <span className="forrum-home-v16__weekly-rank">
                {index + 1}
              </span>
              <Avatar
                name={participant.displayName || participant.username}
                url={participant.avatarUrl}
                size={28}
              />
              <strong className="forrum-home-v16__weekly-user">
                @{participant.username}
              </strong>
              <span
                className="forrum-home-v16__weekly-score"
                aria-label={
                  mode === 'likes'
                    ? `Симпатии: ${participant.score}`
                    : `Темы и сообщения: ${participant.score}`
                }
              >
                {participant.score}
              </span>
            </Link>
          ))
        ) : (
          <p className="forrum-home-v16__weekly-empty">
            За эту неделю активности пока нет.
          </p>
        )}
      </div>
      <Link
        className="forrum-home-v16__weekly-more"
        href="/users"
      >
        Смотреть рейтинг <span aria-hidden="true">→</span>
      </Link>
    </section>
  );
}
