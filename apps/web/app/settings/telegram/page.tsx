
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

type Status = {
  configured: boolean;
  polling: boolean;
  linked: boolean;
  connectChannelUrl: string | null;
  link: {
    telegramUsername: string | null;
    linkedAt: string;
    enabled: boolean;
  } | null;
};

type LinkCode = {
  code: string;
  command: string;
  expiresInMinutes: number;
  botUsername: string | null;
};

type Channel = {
  id: string;
  title: string;
  username: string | null;
  enabled: boolean;
  canPost: boolean;
  linkedAt: string;
  lastCheckedAt: string | null;
};

export default function TelegramSettings() {
  const [status, setStatus] = useState<Status | null>(null);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [code, setCode] = useState<LinkCode | null>(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);

    try {
      const currentStatus = await api<Status>('/telegram/status');
      setStatus(currentStatus);

      if (currentStatus.linked) {
        setChannels(await api<Channel[]>('/telegram/channels'));
      } else {
        setChannels([]);
      }

      setError('');
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Не удалось загрузить Telegram');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function makeCode() {
    try {
      setError('');
      setCode(await api<LinkCode>('/telegram/link-code', { method: 'POST' }));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Не удалось создать код');
    }
  }

  async function unlink() {
    try {
      await api('/telegram/link', { method: 'DELETE' });
      setCode(null);
      setMessage('Telegram отключён');
      await load();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Не удалось отключить Telegram');
    }
  }

  async function test() {
    try {
      await api('/telegram/test', { method: 'POST' });
      setMessage('Тестовое уведомление отправлено');
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Не удалось отправить тест');
    }
  }

  async function removeChannel(id: string) {
    try {
      await api(`/telegram/channels/${id}`, { method: 'DELETE' });
      setMessage('Канал отключён от FORRUM');
      await load();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Не удалось отключить канал');
    }
  }

  return <div className="settings-narrow telegram-settings-page">
    <div className="section-title">
      <div>
        <h1>Telegram</h1>
        <p className="muted">Уведомления и публикация материалов FORRUM в ваши каналы.</p>
      </div>
      <Link className="button ghost" href="/settings">Назад</Link>
    </div>

    {message && <div className="success-box">{message}</div>}
    {error && <div className="error-box">{error}</div>}

    <section className="card">
      {loading && <p>Проверяем настройки…</p>}

      {!loading && status && !status.configured && <div className="warning-box">
        Telegram-бот ещё не настроен владельцем FORRUM.
      </div>}

      {!loading && status?.configured && !status.linked && <>
        <h2>Привязать Telegram</h2>
        <p>Создайте код, откройте бота и отправьте ему показанную команду. Код действует 10 минут.</p>
        <button type="button" className="button" onClick={makeCode}>Создать код</button>

        {code && <div className="telegram-code">
          <strong>{code.command}</strong>
          {code.botUsername && <a
            className="button secondary small"
            href={`https://t.me/${code.botUsername.replace(/^@/, '')}`}
            target="_blank"
            rel="noreferrer"
          >
            Открыть бота
          </a>}
        </div>}
      </>}

      {!loading && status?.linked && <>
        <h2>Telegram подключён</h2>
        <p>
          @{status.link?.telegramUsername || 'без username'}
          {' · '}
          с {new Date(status.link?.linkedAt || '').toLocaleString('ru-RU')}
        </p>
        <div className="inline-actions">
          <button type="button" className="button secondary" onClick={test}>
            Отправить тест
          </button>
          <button type="button" className="button ghost danger-text" onClick={unlink}>
            Отвязать
          </button>
        </div>
      </>}
    </section>

    {!loading && status?.linked && <section className="card telegram-channel-settings">
      <div className="telegram-channel-heading">
        <div>
          <h2>Ваши каналы</h2>
          <p className="muted">Они появятся здесь после добавления FORRUM-бота администратором.</p>
        </div>
        <div className="inline-actions">
          {status.connectChannelUrl && <a
            className="button"
            href={status.connectChannelUrl}
            target="_blank"
            rel="noreferrer"
          >
            Добавить канал
          </a>}
          <button type="button" className="button ghost" onClick={load}>
            Обновить
          </button>
        </div>
      </div>

      {!status.polling && <div className="warning-box">
        Получение каналов выключено. В Railway нужно установить TELEGRAM_POLLING_ENABLED=true.
      </div>}

      <div className="telegram-channel-list">
        {channels.map((channel) => <article
          className={`telegram-channel-row ${channel.enabled && channel.canPost ? '' : 'disabled'}`}
          key={channel.id}
        >
          <div>
            <strong>{channel.title}</strong>
            <span>
              {channel.username ? `@${channel.username}` : 'Приватный канал'}
              {' · '}
              {channel.enabled && channel.canPost ? 'готов к публикации' : 'нужно вернуть права боту'}
            </span>
          </div>
          <button
            type="button"
            className="button ghost small danger-text"
            onClick={() => removeChannel(channel.id)}
          >
            Отключить
          </button>
        </article>)}

        {!channels.length && <div className="empty-state">
          Добавьте бота в канал, вернитесь на эту страницу и нажмите «Обновить».
        </div>}
      </div>
    </section>}
  </div>;
}
