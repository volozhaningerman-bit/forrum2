'use client';

import { useState } from 'react';
import { api } from '@/lib/api';
import {
  applyTopicReaction,
  type TopicReactionType,
} from './model';
import { formatCount } from './utils';

const reactionOptions: Array<{
  type: TopicReactionType;
  symbol: string;
  label: string;
}> = [
  { type: 'LIKE', symbol: '❤️', label: 'Нравится' },
  { type: 'FIRE', symbol: '🔥', label: 'Огонь' },
  { type: 'USEFUL', symbol: '💡', label: 'Полезно' },
];

export function TopicReactions({
  slug,
  initialCount,
  initialViewerReaction = null,
}: {
  slug: string;
  initialCount: number;
  initialViewerReaction?: string | null;
}) {
  const [state, setState] = useState({
    count: initialCount,
    viewerReaction: initialViewerReaction,
  });
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const selected = reactionOptions.find(
    (option) => option.type === state.viewerReaction,
  );

  async function react(type: TopicReactionType) {
    if (pending) return;

    setPending(true);
    setError('');

    try {
      const result = await api<{
        active: boolean;
        type: string | null;
      }>(`/publications/${slug}/reaction`, {
        method: 'POST',
        body: JSON.stringify({ type }),
      });

      setState((current) =>
        applyTopicReaction(current, type, result),
      );
      setOpen(false);
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : 'Не удалось сохранить реакцию',
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <span
      className="forrum-home-v23__reactions"
      onClick={(event) => event.stopPropagation()}
    >
      <button
        className="forrum-home-v23__reaction-trigger"
        type="button"
        aria-expanded={open}
        aria-label={`Реакции: ${state.count}. Выбрать реакцию`}
        title="Выбрать реакцию"
        onClick={(event) => {
          event.preventDefault();
          setOpen((current) => !current);
          setError('');
        }}
      >
        <span aria-hidden="true">{selected?.symbol ?? '♡'}</span>
        <b>{formatCount(state.count)}</b>
      </button>
      {open && (
        <span
          className="forrum-home-v23__reaction-menu"
          role="group"
          aria-label="Выбор реакции"
        >
          {reactionOptions.map((option) => (
            <button
              type="button"
              key={option.type}
              disabled={pending}
              aria-pressed={state.viewerReaction === option.type}
              aria-label={option.label}
              title={option.label}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                void react(option.type);
              }}
            >
              <span aria-hidden="true">{option.symbol}</span>
            </button>
          ))}
          {error && (
            <small role="alert">{error}</small>
          )}
        </span>
      )}
    </span>
  );
}
