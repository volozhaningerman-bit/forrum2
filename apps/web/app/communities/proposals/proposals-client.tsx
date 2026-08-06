'use client';

import Link from 'next/link';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { api } from '@/lib/api';
import type { Me } from '@/lib/types';

export type Proposal = {
  id: string;
  name: string;
  description: string;
  initialTopics: string;
  status: string;
  supportCount: number;
  supportedByViewer: boolean;
  author: {
    username: string;
    displayName: string;
  };
  suggestedParent: {
    slug: string;
    name: string;
  } | null;
  resolutionNote: string | null;
};

export function ProposalsClient({
  initialItems,
  initialMe,
}: {
  initialItems: Proposal[];
  initialMe: Me | null;
}) {
  const [items, setItems] =
    useState<Proposal[]>(initialItems);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  async function load() {
    try {
      setItems(
        await api<Proposal[]>(
          '/governance/proposals',
        ),
      );
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : 'Не удалось загрузить предложения',
      );
    }
  }

  async function support(id: string) {
    try {
      setError('');
      await api(
        `/governance/proposals/${id}/support`,
        { method: 'POST' },
      );
      await load();
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : 'Не удалось изменить поддержку',
      );
    }
  }

  async function create(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!initialMe) {
      setError(
        'Войдите в аккаунт, чтобы предложить сообщество.',
      );
      return;
    }

    try {
      setError('');
      setMessage('');

      const payload = Object.fromEntries(
        new FormData(event.currentTarget),
      ) as Record<string, string>;

      if (!payload.parentSlug?.trim()) {
        delete payload.parentSlug;
      }

      await api('/governance/proposals', {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      setMessage('Предложение опубликовано');
      event.currentTarget.reset();
      await load();
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : 'Не удалось опубликовать предложение',
      );
    }
  }

  return (
    <>
      <header className="compact-page-heading">
        <div>
          <h1>Предложения сообществ</h1>
          <p>
            Новые разделы появляются при реальном
            спросе и понятном первом наборе тем.
          </p>
        </div>
        <Link
          className="button ghost"
          href="/communities"
        >
          Каталог
        </Link>
      </header>

      {message && (
        <div className="success-box">{message}</div>
      )}
      {error && (
        <div className="error-box" role="alert">
          {error}
        </div>
      )}

      <div className="two-column">
        <main className="publication-list">
          {items.map((proposal) => (
            <article
              className="card"
              key={proposal.id}
            >
              <div className="publication-topline">
                <span className="type-label">
                  {proposal.status}
                </span>
                {proposal.suggestedParent && (
                  <Link
                    href={`/communities/${proposal.suggestedParent.slug}`}
                  >
                    Внутри{' '}
                    {proposal.suggestedParent.name}
                  </Link>
                )}
              </div>

              <h2>{proposal.name}</h2>
              <p>{proposal.description}</p>

              <div className="notice">
                <strong>Первые темы</strong>
                <p>{proposal.initialTopics}</p>
              </div>

              <p className="muted small-text">
                Предложил @{proposal.author.username}
              </p>

              {proposal.resolutionNote && (
                <p className="muted">
                  Решение: {proposal.resolutionNote}
                </p>
              )}

              {proposal.status === 'OPEN' &&
                (initialMe ? (
                  <button
                    type="button"
                    className={`button small ${
                      proposal.supportedByViewer
                        ? 'secondary'
                        : ''
                    }`}
                    onClick={() =>
                      void support(proposal.id)
                    }
                  >
                    {proposal.supportedByViewer
                      ? 'Убрать поддержку'
                      : 'Поддержать'}{' '}
                    · {proposal.supportCount}
                  </button>
                ) : (
                  <Link
                    className="button ghost small"
                    href="/login?next=%2Fcommunities%2Fproposals"
                  >
                    Войти, чтобы поддержать ·{' '}
                    {proposal.supportCount}
                  </Link>
                ))}
            </article>
          ))}

          {!items.length && (
            <div className="compact-empty-state">
              <strong>Предложений пока нет</strong>
              <span>
                Первое содержательное предложение
                появится здесь.
              </span>
            </div>
          )}
        </main>

        <aside className="card">
          <h2>Предложить сообщество</h2>

          {initialMe ? (
            <form onSubmit={create}>
              <label>
                Название
                <input
                  name="name"
                  minLength={2}
                  maxLength={80}
                  required
                />
              </label>

              <label>
                Зачем оно нужно
                <textarea
                  name="description"
                  minLength={30}
                  maxLength={3000}
                  required
                />
              </label>

              <label>
                Примеры первых тем
                <textarea
                  name="initialTopics"
                  minLength={10}
                  maxLength={2000}
                  required
                />
              </label>

              <label>
                Родительский адрес, необязательно
                <input
                  name="parentSlug"
                  placeholder="gta-rp"
                />
              </label>

              <button className="button">
                Опубликовать
              </button>
            </form>
          ) : (
            <div className="auth-required-panel">
              <p>
                Предложения и поддержка доступны
                после входа. Просматривать идеи
                можно без регистрации.
              </p>
              <Link
                className="button"
                href="/login?next=%2Fcommunities%2Fproposals"
              >
                Войти
              </Link>
            </div>
          )}
        </aside>
      </div>
    </>
  );
}
