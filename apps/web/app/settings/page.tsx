'use client';
import Link from 'next/link';
import type { ChangeEvent, FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Avatar } from '@/components/avatar';
import type { Me } from '@/lib/types';

type FullMe = Me & { user: Me['user'] & { bio: string | null; website: string | null; location: string | null; avatarUrl: string | null; coverUrl: string | null; wallPrivacy: 'EVERYONE' | 'FOLLOWERS' | 'ONLY_ME'; showFavorites: boolean; showSubscriptions: boolean } };
type Preferences = { publicationReplies: boolean; commentReplies: boolean; reactions: boolean; follows: boolean; wallPosts: boolean; messages: boolean; system: boolean; emailDigest: boolean; telegramEnabled: boolean };
type Session = { id: string; userAgent: string | null; ipAddress: string | null; createdAt: string; lastSeenAt: string; expiresAt: string; current: boolean };

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('Не удалось прочитать файл'));
    reader.readAsDataURL(file);
  });
}

function deviceLabel(userAgent: string | null) {
  if (!userAgent) return 'Неизвестное устройство';
  const browser = userAgent.includes('Firefox') ? 'Firefox' : userAgent.includes('Edg/') ? 'Microsoft Edge' : userAgent.includes('Chrome') ? 'Chrome' : userAgent.includes('Safari') ? 'Safari' : 'Браузер';
  const os = userAgent.includes('Windows') ? 'Windows' : userAgent.includes('Android') ? 'Android' : userAgent.includes('iPhone') || userAgent.includes('iPad') ? 'iOS/iPadOS' : userAgent.includes('Mac OS') ? 'macOS' : userAgent.includes('Linux') ? 'Linux' : 'неизвестная система';
  return `${browser} · ${os}`;
}

export default function SettingsPage() {
  const [me, setMe] = useState<FullMe | null>(null);
  const [preferences, setPreferences] = useState<Preferences | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState<'AVATAR' | 'COVER' | null>(null);
  const [savingSection, setSavingSection] = useState<'profile' | 'notifications' | null>(null);
  const [pendingSession, setPendingSession] = useState<Session | null>(null);
  const [confirmOthers, setConfirmOthers] = useState(false);
  const load = async () => {
    try {
      const [meData, preferenceData, sessionData] = await Promise.all([
        api<FullMe>('/auth/me'),
        api<Preferences>('/notifications/preferences'),
        api<Session[]>('/auth/sessions'),
      ]);
      setMe(meData); setPreferences(preferenceData); setSessions(sessionData);
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Не удалось загрузить настройки'); }
  };
  useEffect(() => { void load(); }, []);

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(''); setMessage('');
    const form = new FormData(event.currentTarget);
    setSavingSection('profile');
    try {
      const payload: Record<string, unknown> = Object.fromEntries(form);
      payload.showFavorites = form.get('showFavorites') === 'on';
      payload.showSubscriptions = form.get('showSubscriptions') === 'on';
      await api('/auth/me', { method: 'PATCH', body: JSON.stringify(payload) });
      setMessage('Профиль сохранён'); await load(); window.dispatchEvent(new Event('forrum-auth-changed'));
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Ошибка'); }
    finally { setSavingSection(null); }
  }

  async function saveNotifications(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(''); setMessage('');
    const form = new FormData(event.currentTarget);
    const keys: (keyof Preferences)[] = ['publicationReplies','commentReplies','reactions','follows','wallPosts','messages','system'];
    const payload = Object.fromEntries(keys.map((key) => [key, form.get(key) === 'on']));
    setSavingSection('notifications');
    try {
      setPreferences(await api<Preferences>('/notifications/preferences', { method: 'PATCH', body: JSON.stringify(payload) }));
      setMessage('Настройки уведомлений сохранены');
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Не удалось сохранить уведомления'); }
    finally { setSavingSection(null); }
  }

  async function revokeSession(session: Session) {
    try {
      await api(`/auth/sessions/${session.id}`, { method: 'DELETE' });
      setPendingSession(null);
      if (session.current) window.location.href = '/login'; else await load();
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Не удалось завершить вход'); }
  }

  async function revokeOthers() {
    try {
      const result = await api<{ revoked: number }>('/auth/sessions/revoke-others', { method: 'POST' });
      setConfirmOthers(false); setMessage(`Завершено входов: ${result.revoked}`); await load();
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Не удалось завершить другие входы'); }
  }

  async function upload(event: ChangeEvent<HTMLInputElement>, kind: 'AVATAR' | 'COVER') {
    const file = event.target.files?.[0]; event.target.value = '';
    if (!file) return;
    setError(''); setMessage('');
    const max = kind === 'AVATAR' ? 3 : 6;
    if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) { setError('Разрешены PNG, JPEG и WebP'); return; }
    if (file.size > max * 1024 * 1024) { setError(`Файл должен быть не больше ${max} МБ`); return; }
    setUploading(kind);
    try {
      const dataUrl = await fileToDataUrl(file);
      await api('/media', { method: 'POST', body: JSON.stringify({ kind, originalName: file.name, dataUrl }) });
      setMessage(kind === 'AVATAR' ? 'Аватар обновлён' : 'Обложка обновлена'); await load(); window.dispatchEvent(new Event('forrum-auth-changed'));
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Не удалось загрузить изображение'); }
    finally { setUploading(null); }
  }

  if (!me || !preferences) return <div className={error ? 'error-box' : 'card'}>{error || 'Загрузка настроек…'}</div>;
  return <div className="settings-layout">
    <main>
      {message && <div className="success-box">{message}</div>}{error && <div className="error-box">{error}</div>}
      <section className="card account-overview-settings">
        <div><span className="auth-eyebrow">Аккаунт</span><h1>{me.user.displayName}</h1><p className="muted">@{me.user.username} · FORRUM ID {me.user.forrumId}</p></div>
        <dl className="account-detail-grid"><div><dt>Почта</dt><dd>{me.user.email}</dd></div><div><dt>Статус</dt><dd>{me.user.emailVerified ? 'Почта подтверждена' : 'Только чтение'}</dd></div><div><dt>Первичная настройка</dt><dd>{me.user.onboardingCompleted ? 'Завершена' : 'Не завершена'}</dd></div></dl>
        {!me.user.emailVerified && <div className="warning-box"><span>Подтвердите почту, чтобы редактировать профиль, публиковать и голосовать.</span><Link className="button secondary small" href="/verify-email">Подтвердить</Link></div>}
        {me.user.emailVerified && !me.user.onboardingCompleted && <div className="notice"><span>Завершите первый выбор интересов и настройте стартовую ленту.</span><Link className="button secondary small" href="/welcome">Продолжить настройку</Link></div>}
      </section>
      <section className="card profile-media-settings settings-section-card">
        <h1>Оформление профиля</h1>
        <div className="settings-cover-preview" style={me.user.coverUrl ? { backgroundImage: `url(${me.user.coverUrl})` } : undefined}>
          <Avatar name={me.user.displayName} size={92} url={me.user.avatarUrl}/>
        </div>
        <div className="profile-media-buttons">
          <label className="button secondary">{uploading === 'AVATAR' ? 'Загрузка…' : 'Загрузить аватар'}<input className="visually-hidden" type="file" accept="image/png,image/jpeg,image/webp" disabled={Boolean(uploading)} onChange={(event) => upload(event, 'AVATAR')}/></label>
          <label className="button secondary">{uploading === 'COVER' ? 'Загрузка…' : 'Загрузить обложку'}<input className="visually-hidden" type="file" accept="image/png,image/jpeg,image/webp" disabled={Boolean(uploading)} onChange={(event) => upload(event, 'COVER')}/></label>
        </div>
        <p className="muted small-text">PNG, JPEG или WebP. Аватар — до 3 МБ, обложка — до 6 МБ.</p>
      </section>

      <section className="card settings-section-card">
        <h2>Настройки профиля</h2>
        <form onSubmit={save}>
          <label>Отображаемое имя<input name="displayName" defaultValue={me.user.displayName} minLength={2} maxLength={60}/></label>
          <label>О себе<textarea name="bio" defaultValue={me.user.bio ?? ''} maxLength={500}/></label>
          <label>Сайт <span className="optional-label">необязательно</span><input name="website" type="url" placeholder="https://example.com" defaultValue={me.user.website ?? ''} maxLength={200}/></label>
          <label>Город / страна<input name="location" defaultValue={me.user.location ?? ''} maxLength={100}/></label>
          <label>Кто может видеть и писать на стене<select name="wallPrivacy" defaultValue={me.user.wallPrivacy}><option value="EVERYONE">Все подтверждённые пользователи</option><option value="FOLLOWERS">Только мои подписчики</option><option value="ONLY_ME">Только я</option></select></label>
          <label className="settings-toggle"><input type="checkbox" name="showFavorites" defaultChecked={me.user.showFavorites}/><span>Показывать Избранное в моём профиле</span></label>
          <label className="settings-toggle"><input type="checkbox" name="showSubscriptions" defaultChecked={me.user.showSubscriptions}/><span>Показывать мои подписки в профиле</span></label>
          <button className="button" disabled={savingSection === 'profile' || !me.user.emailVerified}>{savingSection === 'profile' ? 'Сохраняем…' : 'Сохранить профиль'}</button>
        </form>
      </section>

      <section className="card settings-section-card" id="notifications">
        <h2>Уведомления</h2><p className="muted">Отключение типа уведомления не скрывает сам ответ или сообщение — оно лишь не появляется в центре уведомлений.</p>
        <form onSubmit={saveNotifications} className="settings-checklist">
          {[
            ['publicationReplies','Ответы в моих публикациях'], ['commentReplies','Ответы на мои комментарии'], ['reactions','Реакции'], ['follows','Новые подписчики'], ['wallPosts','Записи на моей стене'], ['messages','Личные сообщения'], ['system','Важные системные уведомления'],
          ].map(([key,label]) => <label className="settings-toggle" key={key}><input type="checkbox" name={key} defaultChecked={Boolean(preferences[key as keyof Preferences])}/><span>{label}</span></label>)}
          <button className="button" disabled={savingSection === 'notifications'}>{savingSection === 'notifications' ? 'Сохраняем…' : 'Сохранить уведомления'}</button>
        </form>
        <p className="muted small-text">Уведомления Telegram настраиваются отдельно после привязки бота к FORRUM ID.</p><Link className="text-link" href="/settings/telegram">Настроить Telegram-бота</Link>
      </section>

      <section className="card settings-section-card">
        <div className="section-title"><div><h2>Активные входы</h2><p className="muted">Завершайте незнакомые или старые сессии.</p></div><button type="button" className="button ghost small" onClick={() => setConfirmOthers(true)}>Выйти на других устройствах</button></div>{confirmOthers && <div className="inline-confirmation"><p>Завершить все входы, кроме текущего?</p><div><button type="button" className="button small danger" onClick={revokeOthers}>Да, завершить</button><button type="button" className="button ghost small" onClick={() => setConfirmOthers(false)}>Отмена</button></div></div>}
        <div className="publication-list">
          {sessions.map((session) => <div className={`session-row ${session.current ? 'current-session' : ''}`} key={session.id}>
            <div><strong>{deviceLabel(session.userAgent)}</strong>{session.current && <span className="type-label">Текущий вход</span>}<p className="muted small-text">IP: {session.ipAddress || 'не определён'} · активность {new Date(session.lastSeenAt).toLocaleString('ru-RU')} · истекает {new Date(session.expiresAt).toLocaleDateString('ru-RU')}</p></div>
            {pendingSession?.id === session.id ? <div className="session-confirm"><span>{session.current ? 'После этого потребуется войти снова.' : 'Завершить этот вход?'}</span><div><button type="button" className="button small danger" onClick={() => revokeSession(session)}>Подтвердить</button><button type="button" className="button ghost small" onClick={() => setPendingSession(null)}>Отмена</button></div></div> : <button type="button" className="button ghost small danger-text" onClick={() => setPendingSession(session)}>Завершить</button>}
          </div>)}
        </div>
      </section>
    </main>
    <aside className="settings-sidebar"><div className="card settings-links"><h3>Мой FORRUM</h3><Link href="/subscriptions">Авторы и хэштеги</Link><Link href="/saved">Сохранённые материалы</Link><Link href="/activity">История действий</Link><Link href="/interactions">Подтверждённые взаимодействия</Link><Link href="/settings/interests">Подписки и интересы</Link><Link href="/settings/security">Изменить пароль</Link><Link href="/settings/telegram">Telegram-бот</Link><Link href="/settings/moderation">Решения модерации</Link></div><div className="card settings-sidebar-card"><h3>FORRUM ID</h3><p className="admin-stat">{me.user.forrumId}</p><p className="muted">Постоянный внутренний идентификатор аккаунта.</p></div><div className="card settings-sidebar-card"><h3>Статус почты</h3><p>{me.user.emailVerified ? 'Подтверждена' : 'Не подтверждена — доступно только чтение'}</p><p className="muted small-text">{me.user.email}</p></div></aside>
  </div>;
}
