
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { api } from '@/lib/api';

type TelegramChannel = {
  id: string;
  title: string;
  username: string | null;
  enabled: boolean;
  canPost: boolean;
};

type TelegramPreview = {
  title: string;
  excerpt: string;
  hasImage: boolean;
};

export function TelegramShareButton({
  slug,
  compact = false,
  label = 'В Telegram',
  variant = 'default',
}: {
  slug: string;
  compact?: boolean;
  label?: string;
  variant?: 'default' | 'endcap';
}) {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [channels, setChannels] = useState<TelegramChannel[]>([]);
  const [preview, setPreview] = useState<TelegramPreview | null>(null);
  const [channelId, setChannelId] = useState('');
  const [includeImage, setIncludeImage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  async function showDialog() {
    setOpen(true);
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const [channelRows, publicationPreview] = await Promise.all([
        api<TelegramChannel[]>('/telegram/channels'),
        api<TelegramPreview>(`/telegram/share/publication/${slug}/preview`),
      ]);

      const available = channelRows.filter(
        (channel) => channel.enabled && channel.canPost,
      );

      setChannels(available);
      setChannelId((current) =>
        available.some((channel) => channel.id === current)
          ? current
          : available[0]?.id || '',
      );
      setPreview(publicationPreview);
      setIncludeImage(publicationPreview.hasImage);
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : 'Не удалось открыть публикацию в Telegram',
      );
    } finally {
      setLoading(false);
    }
  }

  async function publish() {
    if (!channelId || sending) return;

    setSending(true);
    setError('');
    setSuccess('');

    try {
      const result = await api<{ channelTitle: string }>(
        `/telegram/share/publication/${slug}`,
        {
          method: 'POST',
          body: JSON.stringify({ channelId, includeImage }),
        },
      );

      setSuccess(`Опубликовано в «${result.channelTitle}»`);
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : 'Не удалось опубликовать в Telegram',
      );
    } finally {
      setSending(false);
    }
  }

  return <>
    <button
      type="button"
      className={`${compact ? 'telegram-share-trigger compact' : 'plain-action telegram-share-trigger'} ${variant === 'endcap' ? 'endcap' : ''}`.trim()}
      aria-label={variant === 'endcap' ? label : undefined}
      title={variant === 'endcap' ? label : undefined}
      onClick={(event) => { event.preventDefault(); event.stopPropagation(); void showDialog(); }}
    >
      {variant === 'endcap' ? (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M4 12 19 5l-4 14-3.6-5.1L4 12Zm7.4 1.9L19 5" />
        </svg>
      ) : label}
    </button>

    {mounted && open ? createPortal(<div
      className="telegram-share-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) setOpen(false);
      }}
    >
      <section
        className="telegram-share-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`telegram-share-title-${slug}`}
      >
        <header>
          <div>
                        <h2 id={`telegram-share-title-${slug}`}>Опубликовать в Telegram</h2>
          </div>
          <button
            type="button"
            className="telegram-share-close"
            aria-label="Закрыть"
            onClick={() => setOpen(false)}
          >
            ×
          </button>
        </header>

        {loading && <div className="telegram-share-loading">Проверяем ваши каналы…</div>}

        {!loading && preview && <div className="telegram-share-preview">
          <strong>{preview.title}</strong>
          {preview.excerpt && <p>{preview.excerpt}</p>}
          <span>Создано на 4RRUM · Обсудить →</span>
        </div>}

        {!loading && channels.length > 0 && <div className="telegram-share-controls">
          <label>
            Канал
            <select
              value={channelId}
              onChange={(event) => setChannelId(event.target.value)}
            >
              {channels.map((channel) => <option key={channel.id} value={channel.id}>
                {channel.title}{channel.username ? ` · @${channel.username}` : ''}
              </option>)}
            </select>
          </label>

          <label className={`telegram-image-toggle ${preview?.hasImage ? '' : 'disabled'}`}>
            <input
              type="checkbox"
              checked={includeImage}
              disabled={!preview?.hasImage}
              onChange={(event) => setIncludeImage(event.target.checked)}
            />
            <span>Добавить изображение</span>
          </label>

          <button
            type="button"
            className="button"
            disabled={!channelId || sending}
            onClick={publish}
          >
            {sending ? 'Публикуем…' : 'Опубликовать'}
          </button>
        </div>}

        {!loading && !error && channels.length === 0 && <div className="telegram-share-empty">
          <strong>Нет подключённых каналов</strong>
          <p>Привяжите Telegram и добавьте FORRUM-бота администратором канала.</p>
          <Link className="button secondary" href="/settings/telegram">
            Подключить канал
          </Link>
        </div>}

        {error && <div className="error-box" role="alert">{error}</div>}
        {success && <div className="success-box" role="status">{success}</div>}
      </section>
    </div>, document.body) : null}
  </>;
}
