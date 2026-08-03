'use client';
import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { AuthShell } from '@/components/auth-shell';
import { PasswordField } from '@/components/password-field';
import type { Me } from '@/lib/types';

function safeNext(value: string | null) {
  return value && value.startsWith('/') && !value.startsWith('//') ? value : '/';
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [next, setNext] = useState('/');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setNext(safeNext(params.get('next')));
    if (params.get('verified') === '1') setNotice('Почта подтверждена. Войдите, чтобы завершить настройку профиля.');
    if (params.get('reset') === '1') setNotice('Пароль изменён. Войдите с новым паролем.');
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setError('');
    try {
      const result = await api<Me>('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
      window.dispatchEvent(new Event('forrum-auth-changed'));
      if (!result.user.emailVerified) { sessionStorage.setItem('forrum_pending_email', result.user.email); router.push('/verify-email'); }
      else if (!result.user.onboardingCompleted) router.push('/welcome');
      else router.push(next);
      router.refresh();
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Не удалось войти'); }
    finally { setLoading(false); }
  }

  return <AuthShell
    eyebrow="Возвращайтесь"
    title="Продолжите там, где остановились"
    description="Войдите в FORRUM ID, чтобы открыть подписки, публикации, сообщения и управление профилем."
    footer={<p>Нет аккаунта? <Link href="/register"><strong>Зарегистрироваться</strong></Link></p>}
  >
    <div className="auth-panel-head"><span>Вход</span><strong>FORRUM ID</strong></div>
    <h2>Войти в аккаунт</h2>
    {notice && <div className="success-box">{notice}</div>}
    {error && <div className="error-box" role="alert">{error}</div>}
    <form onSubmit={submit}>
      <label>Почта<input type="email" autoComplete="email" value={email} placeholder="name@example.com" onChange={(event) => setEmail(event.target.value)} required/></label>
      <PasswordField label="Пароль" name="password" value={password} onChange={setPassword} autoComplete="current-password"/>
      <div className="auth-form-row"><span className="field-help">Неподтверждённый аккаунт войдёт в режим чтения.</span><Link href="/forgot-password">Забыли пароль?</Link></div>
      <button className="button auth-submit" disabled={loading}>{loading ? 'Входим…' : 'Войти'}</button>
    </form>
  </AuthShell>;
}
