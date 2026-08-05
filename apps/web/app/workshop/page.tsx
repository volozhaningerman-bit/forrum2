'use client';

import type {
  ChangeEvent,
  FormEvent,
} from 'react';
import {
  useEffect,
  useMemo,
  useState,
} from 'react';
import { api } from '@/lib/api';

type Item = {
  id: string;
  type: string;
  status: string;
  title: string;
  description: string;
  previewUrl: string | null;
  thumbnailUrl: string | null;
  likeCount: number;
  likedByViewer: boolean;
  author: {
    username: string;
    displayName: string;
    forrumId: number;
  };
};

type UploadedMedia = {
  id: string;
  url: string;
  thumbnailUrl: string;
};

const typeNames: Record<string, string> = {
  GIFT: 'Подарок',
  REACTION: 'Реакция',
  BADGE: 'Значок',
  PROFILE_DECOR: 'Оформление профиля',
  COMMUNITY_DECOR: 'Оформление сообщества',
};

const typeOptions = [
  ['ALL', 'Все типы'],
  ['GIFT', 'Подарки'],
  ['REACTION', 'Реакции'],
  ['BADGE', 'Значки'],
  ['PROFILE_DECOR', 'Профили'],
  ['COMMUNITY_DECOR', 'Сообщества'],
] as const;

export default function WorkshopPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [query, setQuery] = useState('');
  const [type, setType] = useState('ALL');
  const [formOpen, setFormOpen] = useState(false);
  const [preview, setPreview] =
    useState<UploadedMedia | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);

    try {
      setItems(await api<Item[]>('/workshop'));
      setError('');
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : 'Не удалось загрузить Мастерскую',
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return items.filter((item) => {
      const typeMatches =
        type === 'ALL' || item.type === type;

      const queryMatches =
        !normalized ||
        `${item.title} ${item.description} ${
          item.author.displayName
        } ${item.author.username}`
          .toLowerCase()
          .includes(normalized);

      return typeMatches && queryMatches;
    });
  }, [items, query, type]);

  async function like(id: string) {
    try {
      await api(`/workshop/${id}/like`, {
        method: 'POST',
      });
      await load();
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : 'Не удалось поставить отметку',
      );
    }
  }

  async function uploadPreview(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];
    event.target.value = '';

    if (!file) return;

    if (
      ![
        'image/png',
        'image/jpeg',
        'image/webp',
      ].includes(file.type)
    ) {
      setError('Разрешены PNG, JPEG и WebP');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setError(
        'Изображение должно быть не больше 8 МБ',
      );
      return;
    }

    setUploading(true);
    setError('');

    try {
      setPreview(
        await api<UploadedMedia>('/media', {
          method: 'POST',
          body: JSON.stringify({
            kind: 'POST_IMAGE',
            originalName: file.name,
            dataUrl: await fileToDataUrl(file),
          }),
        }),
      );
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : 'Не удалось загрузить изображение',
      );
    } finally {
      setUploading(false);
    }
  }

  async function create(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setError('');
    setMessage('');

    try {
      const payload = Object.fromEntries(
        new FormData(event.currentTarget),
      ) as Record<string, string>;

      if (preview) {
        payload.previewMediaId = preview.id;
      }

      await api('/workshop', {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      setMessage('Работа отправлена на проверку');
      setPreview(null);
      setFormOpen(false);
      event.currentTarget.reset();
      await load();
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : 'Не удалось отправить работу',
      );
    }
  }

  return (
    <div className="workshop-directory-page">
      <header className="compact-page-heading">
        <div>
          <h1>Мастерская</h1>
          <p>
            Подарки, реакции, значки и оформление,
            созданные пользователями FORRUM.
          </p>
        </div>

        <button
          type="button"
          className="button"
          onClick={() => setFormOpen(true)}
        >
          Предложить работу
        </button>
      </header>

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

      <section className="compact-filterbar">
        <label className="compact-search-field">
          <span className="visually-hidden">
            Поиск по Мастерской
          </span>
          <input
            value={query}
            onChange={(event) =>
              setQuery(event.target.value)
            }
            placeholder="Название, автор или назначение"
          />
        </label>

        <label>
          <span>Тип</span>
          <select
            value={type}
            onChange={(event) =>
              setType(event.target.value)
            }
          >
            {typeOptions.map(([value, label]) => (
              <option value={value} key={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </section>

      <section className="workshop-compact-grid">
        {loading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <div
              className="workshop-card-skeleton"
              key={index}
              aria-hidden="true"
            />
          ))
        ) : filtered.length ? (
          filtered.map((item) => (
            <article
              className="workshop-compact-card"
              key={item.id}
            >
              {item.thumbnailUrl ? (
                <img
                  src={item.thumbnailUrl}
                  alt={`Превью работы «${item.title}»`}
                />
              ) : (
                <div
                  className="workshop-compact-placeholder"
                  aria-hidden="true"
                >
                  {(typeNames[item.type] ?? item.type)
                    .slice(0, 1)}
                </div>
              )}

              <div className="workshop-compact-copy">
                <div>
                  <span className="type-label">
                    {typeNames[item.type] ??
                      item.type}
                  </span>
                  {item.status !== 'PUBLISHED' && (
                    <span className="status-label">
                      {item.status === 'REVIEW'
                        ? 'На проверке'
                        : 'Отклонено'}
                    </span>
                  )}
                </div>

                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <small>
                  @{item.author.username} · ID{' '}
                  {item.author.forrumId}
                </small>
              </div>

              {item.status === 'PUBLISHED' && (
                <button
                  type="button"
                  className={`workshop-like-button ${
                    item.likedByViewer ? 'active' : ''
                  }`}
                  aria-pressed={item.likedByViewer}
                  onClick={() => void like(item.id)}
                >
                  ♡ {item.likeCount}
                </button>
              )}
            </article>
          ))
        ) : (
          <div className="compact-empty-state">
            <strong>
              {query || type !== 'ALL'
                ? 'Работы не найдены'
                : 'В Мастерской пока нет работ'}
            </strong>
            <span>
              Измените фильтры или отправьте первую
              работу на проверку.
            </span>
          </div>
        )}
      </section>

      {formOpen && (
        <div
          className="modal-backdrop"
          onMouseDown={(event) => {
            if (
              event.currentTarget === event.target
            ) {
              setFormOpen(false);
            }
          }}
        >
          <section
            className="compact-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="workshop-submit-title"
          >
            <header>
              <div>
                <h2 id="workshop-submit-title">
                  Предложить работу
                </h2>
                <p>
                  Добавьте превью и коротко опишите,
                  где элемент будет использоваться.
                </p>
              </div>
              <button
                type="button"
                className="dialog-close"
                aria-label="Закрыть"
                onClick={() => setFormOpen(false)}
              >
                ×
              </button>
            </header>

            <form onSubmit={create}>
              <label>
                Тип
                <select name="type">
                  {typeOptions
                    .filter(([value]) => value !== 'ALL')
                    .map(([value, label]) => (
                      <option
                        value={value}
                        key={value}
                      >
                        {label}
                      </option>
                    ))}
                </select>
              </label>

              <label>
                Название
                <input
                  name="title"
                  minLength={3}
                  maxLength={120}
                  required
                />
              </label>

              <label>
                Описание
                <textarea
                  name="description"
                  minLength={20}
                  maxLength={3000}
                  required
                />
              </label>

              <label>
                Превью
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={uploadPreview}
                  disabled={uploading}
                />
                <span className="field-help">
                  PNG, JPEG или WebP, до 8 МБ.
                </span>
              </label>

              {preview && (
                <div className="workshop-preview-ready">
                  <img
                    src={preview.thumbnailUrl}
                    alt="Загруженное превью"
                  />
                  <div>
                    <strong>Превью загружено</strong>
                    <button
                      type="button"
                      className="text-button"
                      onClick={() => setPreview(null)}
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              )}

              <div className="dialog-actions">
                <button
                  type="button"
                  className="button ghost"
                  onClick={() => setFormOpen(false)}
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="button"
                  disabled={uploading}
                >
                  {uploading
                    ? 'Загружаем превью…'
                    : 'Отправить на проверку'}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}

function fileToDataUrl(
  file: File,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () =>
      resolve(String(reader.result));

    reader.onerror = () =>
      reject(
        new Error(
          'Не удалось прочитать изображение',
        ),
      );

    reader.readAsDataURL(file);
  });
}
