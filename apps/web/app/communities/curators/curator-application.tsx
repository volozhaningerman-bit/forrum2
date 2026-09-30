'use client';
import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { api } from '@/lib/api';
import type { Community } from '@/components/home/types';

export function CuratorApplication({ communities, verified }: { communities: Community[]; verified: boolean }) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const body = Object.fromEntries(new FormData(event.currentTarget));
    setPending(true); setError('');
    try { await api('/governance/curator-applications', { method: 'POST', body: JSON.stringify(body) }); setSent(true); }
    catch (cause) { setError(cause instanceof Error ? cause.message : 'Не удалось отправить заявку. Повторите попытку.'); }
    finally { setPending(false); }
  }
  return <section className="alpha-curator-page">
    <Link href="/communities">← Сообщества</Link>
    <h1>Стать куратором</h1>
    <p>Помогайте участникам, поддерживайте порядок и развивайте выбранный раздел. Заявку рассмотрит администрация; отправка не назначает роль автоматически.</p>
    {!verified ? <p role="status">Для заявки нужно <Link href="/verify-email">подтвердить почту →</Link></p> : sent ? <div role="status"><h2>Заявка отправлена</h2><p>Она передана администрации на рассмотрение.</p><Link href="/communities">Вернуться к сообществам →</Link></div> : !communities.length ? <p role="alert">Список сообществ недоступен. Обновите страницу или <Link href="/support">обратитесь в поддержку</Link>.</p> : <form onSubmit={submit} aria-busy={pending}>
      {error && <p className="error-box" role="alert">{error}</p>}
      <label>Сообщество<select name="communitySlug" aria-label="Сообщество" required defaultValue=""><option value="" disabled>Выберите раздел</option>{communities.map(item => <option key={item.slug} value={item.slug}>{item.name.replace(/^FORRUM\b/i, '4rrum')}</option>)}</select></label>
      <label>Почему хотите стать куратором<textarea name="motivation" required minLength={20} maxLength={2000} rows={4}/></label>
      <label>Что планируете сделать для раздела<textarea name="plan" required minLength={20} maxLength={2000} rows={4}/></label>
      <button className="button" type="submit" disabled={pending}>{pending ? 'Отправляем…' : 'Отправить заявку'}</button>
    </form>}
  </section>;
}
