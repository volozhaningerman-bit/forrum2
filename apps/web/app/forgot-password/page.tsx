'use client';
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { api } from '@/lib/api';
import { AuthShell } from '@/components/auth-shell';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(''); setLoading(true);
    try {
      await api('/auth/password-reset/request', { method: 'POST', body: JSON.stringify({ email }) });
      setDone(true);
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Не удалось отправить письмо'); }
    finally { setLoading(false); }
  }

  return <AuthShell
    eyebrow="Восстановление доступа"
    title="Вернём доступ к аккаунту"
    description="Отправим одноразовую ссылку на подтверждённую почту. Она действует один час."
    footer={<p><Link href="/login">← Вернуться ко входу</Link></p>}
  >
    <h2>{done ? 'Проверьте почту' : 'Укажите почту'}</h2>
    {error && <div className="error-box">{error}</div>}
    {done ? <div className="auth-complete-state">
      <span className="auth-complete-icon">✓</span>
      <p>Если аккаунт с адресом <strong>{email}</strong> существует, письмо уже отправлено.</p>
      <small>Одинаковый ответ для всех адресов защищает список пользователей. В локальной версии письмо находится в Mailpit на порту 8025.</small>
      <button className="button secondary" type="button" onClick={() => setDone(false)}>Указать другую почту</button>
    </div> : <form onSubmit={submit}>
      <label>Почта<input value={email} type="email" autoComplete="email" placeholder="name@example.com" onChange={(event) => setEmail(event.target.value)} required/></label>
      <button className="button auth-submit" disabled={loading}>{loading ? 'Отправляем…' : 'Получить ссылку'}</button>
    </form>}
  </AuthShell>;
}
