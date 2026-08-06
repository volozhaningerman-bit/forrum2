'use client';

import Link from 'next/link';
import type { FormEvent } from 'react';
import {
  useEffect,
  useMemo,
  useState,
} from 'react';
import { api } from '@/lib/api';
import type { PublicationCardData } from '@/lib/types';
import { Avatar } from '@/components/avatar';

export type Partner = {
  id: string;
  type: string;
  displayName: string;
  platform: string;
  channelUrl: string;
  audienceText: string | null;
  description: string;
  updatedAt: string;
  user: {
    username: string;
    displayName: string;
    avatarUrl: string | null;
  };
};

type Tab = 'partners' | 'materials';

const partnerTypes: Record<string, string> = {
  STREAMER: 'Стример',
  VIDEO_CREATOR: 'Автор видео',
  BLOGGER: 'Блогер',
  CHANNEL: 'Канал',
};

const applicationTypes = [
  ['STREAMER', 'Стример'],
  ['VIDEO_CREATOR', 'Автор видео'],
  ['BLOGGER', 'Блогер'],
  ['CHANNEL', 'Канал'],
] as const;

export function MediaClient({
  initialPartners,
  initialMaterials,
}: {
  initialPartners: Partner[];
  initialMaterials: PublicationCardData[];
}) {
  const [partners, setPartners] =
    useState<Partner[]>(initialPartners);
  const [materials, setMaterials] =
    useState<PublicationCardData[]>(
      initialMaterials,
    );
  const [tab, setTab] = useState<Tab>('partners');
  const [query, setQuery] = useState('');
  const [type, setType] = useState('ALL');
  const [applicationOpen, setApplicationOpen] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  async function load() {
    setLoading(true);
    setError('');

    const results = await Promise.allSettled([
      api<Partner[]>('/media/partners'),
      api<PublicationCardData[]>('/news'),
    ]);

    const [partnerResult, materialResult] = results;

    if (partnerResult.status === 'fulfilled') {
      setPartners(partnerResult.value);
    } else {
      setError(
        partnerResult.reason instanceof Error
          ? partnerResult.reason.message
          : 'Не удалось загрузить медиапартнёров',
      );
    }

    if (materialResult.status === 'fulfilled') {
      setMaterials(materialResult.value);
    }

    setLoading(false);
  }

  useEffect(() => {
    setPartners(initialPartners);
    setMaterials(initialMaterials);
    setLoading(false);
  }, [initialPartners, initialMaterials]);

  const filteredPartners = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return partners.filter((partner) => {
      const typeMatches =
        type === 'ALL' || partner.type === type;

      const queryMatches =
        !normalized ||
        `${partner.displayName} ${partner.platform} ${
          partner.description
        } ${partner.audienceText ?? ''}`
          .toLowerCase()
          .includes(normalized);

      return typeMatches && queryMatches;
    });
  }, [partners, query, type]);

  async function apply(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    setMessage('');

    const form = new FormData(event.currentTarget);

    try {
      await api('/media/partners/apply', {
        method: 'POST',
        body: JSON.stringify({
          type: form.get('type'),
          displayName: form.get('displayName'),
          platform: form.get('platform'),
          channelUrl: form.get('channelUrl'),
          audienceText:
            String(form.get('audienceText') || '').trim() ||
            undefined,
          description: form.get('description'),
        }),
      });

      event.currentTarget.reset();
      setApplicationOpen(false);
      setMessage(
        'Заявка отправлена. После проверки канал появится в каталоге.',
      );
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : 'Не удалось отправить заявку',
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="media-directory-page">
      <header className="compact-page-heading">
        <div>
          <h1>Медиа</h1>
          <p>
            Стримеры, авторы видео, блогеры и каналы,
            которые работают с аудиторией FORRUM.
          </p>
        </div>

        <button
          type="button"
          className="button"
          onClick={() => setApplicationOpen(true)}
        >
          Стать медиапартнёром
        </button>
      </header>

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

      <nav
        className="compact-section-tabs"
        aria-label="Разделы Медиа"
      >
        <button
          type="button"
          className={tab === 'partners' ? 'active' : ''}
          onClick={() => setTab('partners')}
        >
          Медиапартнёры
          <span>{partners.length}</span>
        </button>
        <button
          type="button"
          className={tab === 'materials' ? 'active' : ''}
          onClick={() => setTab('materials')}
        >
          Материалы
          <span>{materials.length}</span>
        </button>
      </nav>

      {tab === 'partners' && (
        <>
          <section className="compact-filterbar">
            <label className="compact-search-field">
              <span className="visually-hidden">
                Поиск медиапартнёров
              </span>
              <input
                value={query}
                onChange={(event) =>
                  setQuery(event.target.value)
                }
                placeholder="Имя, платформа или тематика"
              />
            </label>

            <label>
              <span>Формат</span>
              <select
                value={type}
                onChange={(event) =>
                  setType(event.target.value)
                }
              >
                <option value="ALL">Все</option>
                {applicationTypes.map(
                  ([value, label]) => (
                    <option value={value} key={value}>
                      {label}
                    </option>
                  ),
                )}
              </select>
            </label>
          </section>

          <section className="media-partner-list">
            <div
              className="media-partner-head"
              aria-hidden="true"
            >
              <span>Партнёр</span>
              <span>Платформа</span>
              <span>Аудитория</span>
              <span />
            </div>

            {loading ? (
              <div className="compact-row-skeletons">
                {Array.from({ length: 6 }).map(
                  (_, index) => (
                    <span key={index} />
                  ),
                )}
              </div>
            ) : filteredPartners.length ? (
              filteredPartners.map((partner) => (
                <article
                  className="media-partner-row"
                  key={partner.id}
                >
                  <span className="media-partner-avatar">
                    <Avatar
                      name={partner.displayName}
                      size={38}
                      url={partner.user.avatarUrl}
                    />
                  </span>

                  <div className="media-partner-copy">
                    <strong>{partner.displayName}</strong>
                    <p>{partner.description}</p>
                    <Link
                      href={`/u/${partner.user.username}`}
                    >
                      @{partner.user.username}
                    </Link>
                  </div>

                  <span className="media-partner-platform">
                    <strong>{partner.platform}</strong>
                    <small>
                      {partnerTypes[partner.type] ??
                        partner.type}
                    </small>
                  </span>

                  <span className="media-partner-audience">
                    {partner.audienceText ||
                      'Не указано'}
                  </span>

                  <a
                    className="button ghost small"
                    href={partner.channelUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Открыть канал ↗
                  </a>
                </article>
              ))
            ) : (
              <div className="compact-empty-state">
                <strong>
                  {query || type !== 'ALL'
                    ? 'Ничего не найдено'
                    : 'Каталог пока пуст'}
                </strong>
                <span>
                  Первый одобренный партнёр появится
                  здесь после проверки заявки.
                </span>
              </div>
            )}
          </section>
        </>
      )}

      {tab === 'materials' && (
        <section className="media-material-list">
          {loading ? (
            <div className="compact-row-skeletons">
              {Array.from({ length: 6 }).map(
                (_, index) => (
                  <span key={index} />
                ),
              )}
            </div>
          ) : materials.length ? (
            materials.map((item) => (
              <article
                className="media-material-row"
                key={item.id}
              >
                <span
                  className="media-material-symbol"
                  aria-hidden="true"
                >
                  {item.type === 'NEWS' ? 'N' : 'M'}
                </span>

                <div>
                  <span>
                    {item.community.name} ·{' '}
                    {new Date(
                      item.createdAt,
                    ).toLocaleDateString('ru-RU')}
                  </span>
                  <Link href={`/p/${item.slug}`}>
                    {item.title || item.excerpt}
                  </Link>
                  <p>{item.excerpt}</p>
                </div>

                <strong>
                  {item.commentCount} ответов
                </strong>
              </article>
            ))
          ) : (
            <div className="compact-empty-state">
              <strong>Материалов пока нет</strong>
              <span>
                Новости и публикации медиапартнёров
                появятся здесь.
              </span>
            </div>
          )}
        </section>
      )}

      {applicationOpen && (
        <div
          className="modal-backdrop"
          onMouseDown={(event) => {
            if (
              event.currentTarget === event.target
            ) {
              setApplicationOpen(false);
            }
          }}
        >
          <section
            className="compact-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="media-application-title"
          >
            <header>
              <div>
                <h2 id="media-application-title">
                  Заявка в Медиа FORRUM
                </h2>
                <p>
                  Укажите реальный канал и кратко
                  опишите формат сотрудничества.
                </p>
              </div>
              <button
                type="button"
                className="dialog-close"
                aria-label="Закрыть"
                onClick={() =>
                  setApplicationOpen(false)
                }
              >
                ×
              </button>
            </header>

            <form onSubmit={apply}>
              <div className="form-grid-two">
                <label>
                  Формат
                  <select name="type" required>
                    {applicationTypes.map(
                      ([value, label]) => (
                        <option
                          value={value}
                          key={value}
                        >
                          {label}
                        </option>
                      ),
                    )}
                  </select>
                </label>

                <label>
                  Платформа
                  <input
                    name="platform"
                    minLength={2}
                    maxLength={40}
                    placeholder="YouTube, Twitch, Telegram"
                    required
                  />
                </label>
              </div>

              <label>
                Название канала
                <input
                  name="displayName"
                  minLength={2}
                  maxLength={80}
                  required
                />
              </label>

              <label>
                Ссылка
                <input
                  name="channelUrl"
                  type="url"
                  placeholder="https://..."
                  required
                />
              </label>

              <label>
                Аудитория
                <input
                  name="audienceText"
                  maxLength={80}
                  placeholder="например, 45 000 подписчиков"
                />
              </label>

              <label>
                Формат сотрудничества
                <textarea
                  name="description"
                  minLength={20}
                  maxLength={1500}
                  required
                />
              </label>

              <div className="dialog-actions">
                <button
                  type="button"
                  className="button ghost"
                  onClick={() =>
                    setApplicationOpen(false)
                  }
                >
                  Отмена
                </button>
                <button
                  className="button"
                  disabled={submitting}
                >
                  {submitting
                    ? 'Отправляем…'
                    : 'Отправить заявку'}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}
