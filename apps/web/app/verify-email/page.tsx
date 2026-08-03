'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { AuthShell } from '@/components/auth-shell';
import type { Me } from '@/lib/types';

type PageState = 'waiting' | 'verifying' | 'success' | 'error';

export default function VerifyEmailPage() {
  const [state, setState] = useState<PageState>('waiting');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [cooldown, setCooldown] = useState(0);
  const [sending, setSending] = useState(false);
  const [sessionActive, setSessionActive] = useState(false);
  const [emailEntryVisible, setEmailEntryVisible] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const address = sessionStorage.getItem('forrum_pending_email') ?? '';
    setEmail(address);
    if (!address) {
      setEmailEntryVisible(true);
      void api<Me>('/auth/me').then((current) => { setEmail(current.user.email); setEmailEntryVisible(false); }).catch(() => undefined);
    }
    if (params.get('sent') === '1') { setMessage('Письмо отправлено. Ссылка действует 24 часа.'); setCooldown(60); }
    if (!token) return;
    setState('verifying');
    api(`/auth/verify-email?token=${encodeURIComponent(token)}`)
      .then(async () => {
        setState('success');
        setMessage('Почта подтверждена. Теперь доступны публикации, ответы, подписки и голосования.');
        const current = await api<Me>('/auth/me').catch(() => null);
        setSessionActive(Boolean(current?.user.emailVerified));
        sessionStorage.removeItem('forrum_pending_email');
        if (current?.user.emailVerified) window.dispatchEvent(new Event('forrum-auth-changed'));
      })
      .catch((cause) => { setState('error'); setMessage(cause instanceof Error ? cause.message : 'Не удалось подтвердить почту'); });
  }, []);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = window.setInterval(() => setCooldown((current) => Math.max(0, current - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [cooldown]);

  async function resend() {
    if (!email || cooldown > 0) return;
    setSending(true); setMessage('');
    try {
      await api('/auth/resend-verification', { method: 'POST', body: JSON.stringify({ email }) });
      setMessage('Если адрес зарегистрирован и ещё не подтверждён, новое письмо уже отправлено.');
      setCooldown(60);
    } catch (cause) { setMessage(cause instanceof Error ? cause.message : 'Не удалось отправить письмо'); }
    finally { setSending(false); }
  }

  const title = state === 'verifying' ? 'Проверяем ссылку' : state === 'success' ? 'Почта подтверждена' : state === 'error' ? 'Ссылка не сработала' : 'Подтвердите почту';
  return <AuthShell
    eyebrow="Защита аккаунта"
    title={title}
    description="Подтверждение отделяет реальных пользователей от массовых пустых аккаунтов и защищает сообщества."
    footer={<p>Уже подтвердили? <Link href="/login"><strong>Перейти ко входу</strong></Link></p>}
  >
    <div className="auth-panel-head"><span>Подтверждение</span><strong>2 из 2</strong></div>
    {state === 'verifying' && <div className="auth-complete-state"><span className="auth-spinner"/><p>Проверяем подлинность и срок действия ссылки…</p></div>}
    {state === 'success' && <div className="auth-complete-state"><span className="auth-complete-icon">✓</span><p>{message}</p><Link className="button auth-submit" href={sessionActive ? '/welcome' : '/login?verified=1'}>{sessionActive ? 'Настроить профиль' : 'Войти и настроить профиль'}</Link></div>}
    {state === 'error' && <div className="auth-complete-state"><span className="auth-complete-icon error">!</span><div className="error-box">{message}</div><p className="muted">Ссылка могла истечь или уже использоваться. Запросите новую по адресу регистрации.</p></div>}
    {state === 'waiting' && <div className="auth-complete-state">
      <span className="mail-symbol" aria-hidden="true">✉</span>
      <p>{email ? <>Мы отправили ссылку на <strong>{email}</strong>.</> : 'Откройте письмо от FORRUM и нажмите кнопку подтверждения.'}</p>
      <small>Письмо может прийти в течение нескольких минут. Проверьте папку «Спам». В локальной версии откройте Mailpit: localhost:8025.</small>
      {emailEntryVisible && <label className="verification-email-field">Почта регистрации<input type="email" autoComplete="email" value={email} placeholder="name@example.com" onChange={(event) => setEmail(event.target.value)}/></label>}
      {message && <div className="success-box">{message}</div>}
      <button className="button secondary" type="button" disabled={sending || cooldown > 0 || !email} onClick={resend}>{sending ? 'Отправляем…' : cooldown > 0 ? `Повторить через ${cooldown} с` : 'Отправить письмо ещё раз'}</button>
      <Link className="text-link" href="/register">Указали неправильную почту? Создать аккаунт заново</Link>
    </div>}
  </AuthShell>;
}
