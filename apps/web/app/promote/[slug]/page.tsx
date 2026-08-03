'use client';

import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { api } from '@/lib/api';

type Publication = { slug: string; title: string | null; format: string; community: { slug: string; name: string } };
type Quote = {
  type: 'PIN' | 'BOOST'; durationDays: number; active: number; occupied: number; limit: number; remaining: number;
  available: boolean; price: number; currency: string; basePerDay: number; baseDurationPrice: number;
  demandPercentPerOccupied: number; multiplier: number; demandSurcharge: number;
};

export default function PromotePage() {
  const { slug } = useParams<{ slug: string }>();
  const [publication, setPublication] = useState<Publication | null>(null);
  const [quote, setQuote] = useState<Quote | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => { api<Publication>(`/publications/${slug}`).then(setPublication).catch((cause) => setError(cause.message)); }, [slug]);

  async function getQuote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!publication) return;
    setError(''); setMessage(''); setConfirmed(false); setBusy(true);
    const form = new FormData(event.currentTarget);
    const body = { type: form.get('type'), durationDays: Number(form.get('durationDays')) };
    try {
      setQuote(await api<Quote>(`/communities/${publication.community.slug}/promotions/quote`, { method: 'POST', body: JSON.stringify(body) }));
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Не удалось рассчитать цену'); }
    finally { setBusy(false); }
  }

  async function purchase() {
    if (!publication || !quote || !confirmed) return;
    setBusy(true); setError('');
    try {
      const result = await api<{ price: number; endsAt: string; refundGraceMinutes: number }>(`/communities/${publication.community.slug}/promotions`, {
        method: 'POST', body: JSON.stringify({ publicationSlug: publication.slug, type: quote.type, durationDays: quote.durationDays }),
      });
      setMessage(`Продвижение включено до ${new Date(result.endsAt).toLocaleString('ru-RU')}. Списано ${result.price.toLocaleString('ru-RU')} баллов. Полный автоматический возврат доступен первые ${result.refundGraceMinutes} минут.`);
      setQuote(null); setConfirmed(false);
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Не удалось включить продвижение'); }
    finally { setBusy(false); }
  }

  if (!publication) return <div className={error ? 'error-box' : 'card'}>{error || 'Загрузка публикации…'}</div>;

  return <div className="two-column promotion-page">
    <section className="card">
      <p><Link className="muted" href={`/p/${publication.slug}`}>← Вернуться к публикации</Link></p>
      <span className="eyebrow">Внутренние баллы</span><h1>Продвижение публикации</h1><h2>{publication.title || 'Публикация без заголовка'}</h2>
      <p className="muted">Продвижение всегда отмечается и не влияет на правила модерации. Реальные деньги, вывод средств и автоматические выплаты не используются.</p>
      {message && <div className="success-box" role="status">{message} <Link href="/wallet">Открыть историю</Link></div>}
      {error && <div className="error-box" role="alert">{error}</div>}
      <form onSubmit={getQuote} className="promotion-quote-form">
        <label>Формат<select name="type" defaultValue="PIN"><option value="PIN">Закрепление в сообществе</option><option value="BOOST">Boost активности</option></select></label>
        <label>Срок<select name="durationDays" defaultValue="3"><option value="1">1 день</option><option value="3">3 дня</option><option value="7">7 дней</option><option value="30">30 дней</option></select></label>
        <button className="button" disabled={busy}>{busy ? 'Расчёт…' : 'Рассчитать цену'}</button>
      </form>

      {quote && <section className="promotion-quote-card" aria-live="polite">
        <div className="compact-heading"><div><span className="type-label">{quote.type === 'PIN' ? 'Закрепление' : 'Boost'}</span><h3>{quote.durationDays} {quote.durationDays === 1 ? 'день' : 'дней'}</h3></div><strong className="promotion-total">{quote.price.toLocaleString('ru-RU')} баллов</strong></div>
        <dl className="promotion-price-breakdown">
          <div><dt>Базовая цена</dt><dd>{quote.basePerDay.toLocaleString('ru-RU')} × {quote.durationDays} = {quote.baseDurationPrice.toLocaleString('ru-RU')}</dd></div>
          <div><dt>Занято мест</dt><dd>{quote.occupied} из {quote.limit}</dd></div>
          <div><dt>Надбавка спроса</dt><dd>{quote.demandPercentPerOccupied}% за место · +{quote.demandSurcharge.toLocaleString('ru-RU')}</dd></div>
          <div><dt>Свободно после покупки</dt><dd>{Math.max(0, quote.remaining - (quote.available ? 1 : 0))}</dd></div>
        </dl>
        {!quote.available ? <div className="warning-box">Все места заняты. Оплата сверх лимита недоступна.</div> : <>
          <label className="form-check promotion-confirm"><input className="form-check-input" type="checkbox" checked={confirmed} onChange={(event) => setConfirmed(event.target.checked)}/><span className="form-check-label">Я вижу итоговую цену и понимаю, что после 10 минут досрочная остановка выполняется без автоматического возврата.</span></label>
          <button type="button" className="button" disabled={!confirmed || busy} onClick={purchase}>{busy ? 'Включение…' : `Списать ${quote.price.toLocaleString('ru-RU')} баллов`}</button>
        </>}
      </section>}
    </section>
    <aside className="card promotion-guidance">
      <h3>Как это работает</h3>
      <ol><li>Администратор задаёт лимит и базовую цену.</li><li>Каждое занятое место увеличивает цену по открытой формуле.</li><li>Когда места закончились, купить продвижение нельзя.</li><li>Первые 10 минут заказ можно отменить с полным возвратом.</li><li>Позже продвижение можно остановить, но без автоматического возврата.</li></ol>
      <Link className="button secondary" href="/wallet">Баланс и активные заказы</Link>
    </aside>
  </div>;
}
