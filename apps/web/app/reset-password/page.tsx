'use client';
import Link from 'next/link';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { AuthShell } from '@/components/auth-shell';
import { PasswordField, passwordChecks } from '@/components/password-field';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState('');
  const [repeat, setRepeat] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const checks = useMemo(() => passwordChecks(password), [password]);
  useEffect(() => { setToken(new URLSearchParams(window.location.search).get('token') ?? ''); setReady(true); }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError('');
    if (password !== repeat) { setError('Пароли не совпадают'); return; }
    if (!checks.longEnough || !checks.hasLetter || !checks.hasNumber) { setError('Пароль не соответствует требованиям'); return; }
    setLoading(true);
    try {
      await api('/auth/password-reset/confirm', { method: 'POST', body: JSON.stringify({ token, password }) });
      router.push('/login?reset=1');
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Не удалось изменить пароль'); }
    finally { setLoading(false); }
  }

  return <AuthShell
    eyebrow="Новый пароль"
    title="Защитите аккаунт новым паролем"
    description="После изменения пароля все прежние входы будут завершены. На каждом устройстве потребуется войти заново."
    footer={<p><Link href="/login">← Вернуться ко входу</Link></p>}
  >
    <h2>Придумайте новый пароль</h2>
    {error && <div className="error-box">{error}</div>}
    {!ready ? <div className="auth-complete-state"><span className="auth-spinner"/><p>Проверяем ссылку восстановления…</p></div> : !token ? <div className="error-box">В ссылке отсутствует токен восстановления. Запросите новое письмо.</div> : <form onSubmit={submit}>
      <PasswordField label="Новый пароль" name="password" value={password} onChange={setPassword} autoComplete="new-password" showRules/>
      <PasswordField label="Повторите пароль" name="repeat" value={repeat} onChange={setRepeat} autoComplete="new-password"/>
      {repeat && password !== repeat && <span className="field-status error">Пароли пока не совпадают</span>}
      <button className="button auth-submit" disabled={loading}>{loading ? 'Сохраняем…' : 'Сохранить новый пароль'}</button>
    </form>}
  </AuthShell>;
}
