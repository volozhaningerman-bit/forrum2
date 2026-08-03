'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { api } from '@/lib/api';

type Transaction = { id: string; type: string; amount: number; description: string; createdAt: string };
type Promotion = { id: string; type: 'PIN' | 'BOOST'; status: string; price: number; startsAt: string; endsAt: string; cancelledAt: string | null; cancellationReason: string | null; publication: { slug: string; title: string | null }; community: { slug: string; name: string } };
type Wallet = { balance: number; transactions: Transaction[]; promotions: Promotion[]; refundGraceMinutes: number };

const promotionStatus: Record<string, string> = { ACTIVE: 'Действует', EXPIRED: 'Завершено', CANCELLED: 'Остановлено', REFUNDED: 'Возвращено' };
const transactionType: Record<string, string> = { TOPUP: 'Пополнение', SPEND: 'Списание', MANUAL_GRANT: 'Начисление администрацией', REFUND: 'Возврат' };

export default function WalletPage() {
  const [data, setData] = useState<Wallet | null>(null);
  const [error, setError] = useState('');
  const [cancelId, setCancelId] = useState<string | null>(null);
  const [reason, setReason] = useState('');
  const [busy, setBusy] = useState(false);

  const load = async () => { try { setError(''); setData(await api<Wallet>('/wallet')); } catch (cause) { setError(cause instanceof Error ? cause.message : 'Не удалось загрузить баланс'); } };
  useEffect(() => { void load(); }, []);
  const active = useMemo(() => data?.promotions.filter((item) => item.status === 'ACTIVE') ?? [], [data]);
  const history = useMemo(() => data?.promotions.filter((item) => item.status !== 'ACTIVE') ?? [], [data]);

  async function cancelPromotion(id: string) {
    if (reason.trim().length < 3) { setError('Укажите причину остановки'); return; }
    setBusy(true); setError('');
    try {
      const result = await api<{ status: string; refunded: number }>(`/promotions/${id}/cancel`, { method: 'POST', body: JSON.stringify({ reason }) });
      setCancelId(null); setReason('');
      await load();
      if (result.refunded) setError('');
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Не удалось остановить продвижение'); }
    finally { setBusy(false); }
  }

  if (!data) return <div className={error ? 'error-box' : 'card'}>{error || 'Загрузка баланса…'}</div>;

  return <div className="wallet-page">
    <div className="section-title"><div><span className="eyebrow">Внутренняя экономика</span><h1>Баланс и продвижение</h1><p className="muted">Только тестовые баллы. Реального пополнения, вывода и автоматических выплат нет.</p></div></div>
    {error && <div className="error-box" role="alert">{error}</div>}
    <div className="wallet-summary"><div className="metric-card"><span>Доступно</span><strong className="viz-stat-value">{data.balance.toLocaleString('ru-RU')}</strong><small>баллов</small></div><div className="metric-card"><span>Активно</span><strong className="viz-stat-value">{active.length}</strong><small>продвижений</small></div></div>

    <div className="section-title"><div><h2>Активные продвижения</h2><p className="muted">В первые {data.refundGraceMinutes} минут доступен полный автоматический возврат. После — только досрочная остановка.</p></div></div>
    <div className="publication-list">{active.map((item) => <article className="card wallet-promotion-card" key={item.id}>
      <div><span className="type-label">{item.type === 'PIN' ? 'Закрепление' : 'Boost'} · {promotionStatus[item.status]}</span><h3><Link href={`/p/${item.publication.slug}`}>{item.publication.title || 'Публикация'}</Link></h3><p className="muted">{item.community.name} · до {new Date(item.endsAt).toLocaleString('ru-RU')}</p><strong>{item.price.toLocaleString('ru-RU')} баллов</strong></div>
      {cancelId === item.id ? <div className="inline-cancel-form"><label>Причина остановки<textarea minLength={3} maxLength={300} value={reason} onChange={(event) => setReason(event.target.value)} placeholder="Например, публикация больше не актуальна"/></label><div><button type="button" className="button small danger" disabled={busy} onClick={() => cancelPromotion(item.id)}>Остановить</button><button type="button" className="button ghost small" onClick={() => { setCancelId(null); setReason(''); }}>Не останавливать</button></div></div> : <button type="button" className="button ghost small danger-text" onClick={() => setCancelId(item.id)}>Остановить продвижение</button>}
    </article>)}{!active.length && <div className="empty-state"><strong>Активных продвижений нет</strong><span>Продвижение можно включить со страницы своей публикации.</span></div>}</div>

    {!!history.length && <><div className="section-title"><h2>История продвижений</h2></div><div className="wallet-promotion-history">{history.map((item) => <article className="card" key={item.id}><span className="type-label">{item.type === 'PIN' ? 'Закрепление' : 'Boost'} · {promotionStatus[item.status] ?? item.status}</span><h3><Link href={`/p/${item.publication.slug}`}>{item.publication.title || 'Публикация'}</Link></h3><p className="muted">{item.community.name} · {new Date(item.startsAt).toLocaleDateString('ru-RU')}—{new Date(item.endsAt).toLocaleDateString('ru-RU')}</p>{item.cancellationReason && <small>Причина: {item.cancellationReason}</small>}</article>)}</div></>}

    <div className="section-title"><h2>Операции</h2></div><div className="publication-list">{data.transactions.map((item) => <article className="card wallet-transaction" key={item.id}><div><span className="type-label">{transactionType[item.type] ?? item.type}</span><strong>{item.description}</strong><span className="muted small-text">{new Date(item.createdAt).toLocaleString('ru-RU')}</span></div><strong className={item.amount >= 0 ? 'amount-positive' : 'amount-negative'}>{item.amount >= 0 ? '+' : ''}{item.amount.toLocaleString('ru-RU')}</strong></article>)}{!data.transactions.length && <div className="empty-state">Операций пока нет.</div>}</div>
  </div>;
}
