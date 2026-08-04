'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

type Terms = {
  pinLimit: number;
  pinBasePricePerDay: number;
  pinDemandPercentPerOccupied: number;
  boostLimit: number;
  boostBasePricePerDay: number;
  boostDemandPercentPerOccupied: number;
  durations: number[];
  refundGraceMinutes: number;
};

export default function PromotionPage() {
  const [terms, setTerms] = useState<Terms | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api<Terms>('/promotion/terms')
      .then(setTerms)
      .catch((cause) => setError(cause instanceof Error ? cause.message : 'Не удалось загрузить условия'));
  }, []);

  return <div className="promotion-page">
    <section className="section-hero compact-hero">
      <div><span className="eyebrow">Прозрачное продвижение</span><h1>Продвижение публикаций</h1><p>На FORRUM рекламные места всегда отмечены. Продвигать можно только свою опубликованную тему.</p></div>
      <Link className="button" href="/wallet">Мой кошелёк</Link>
    </section>

    {error && <div className="error-box">{error}</div>}

    {terms ? <>
      <section className="promotion-terms-grid">
        <article className="card"><span className="type-label">Закрепление</span><h2>Верх раздела</h2><p>Публикация закрепляется в своём сообществе на выбранный срок.</p><strong className="promotion-price">от {terms.pinBasePricePerDay.toLocaleString('ru-RU')} баллов в день</strong><small>Мест: {terms.pinLimit}. Рост цены за занятое место: {terms.pinDemandPercentPerOccupied}%.</small></article>
        <article className="card"><span className="type-label">Boost</span><h2>Дополнительный показ</h2><p>Тема получает дополнительный показ в лентах, но остаётся явно отмеченной.</p><strong className="promotion-price">от {terms.boostBasePricePerDay.toLocaleString('ru-RU')} баллов в день</strong><small>Мест: {terms.boostLimit}. Рост цены за занятое место: {terms.boostDemandPercentPerOccupied}%.</small></article>
      </section>
      <section className="card promotion-rules"><h2>Условия</h2><ol><li>Доступные сроки: {terms.durations.join(', ')} дней.</li><li>Итоговая цена показывается до подтверждения покупки.</li><li>При заполнении лимита новое продвижение недоступно.</li><li>Отмена с автоматическим возвратом возможна в течение {terms.refundGraceMinutes} минут.</li><li>Рекламные материалы всегда имеют видимую маркировку.</li></ol><Link className="button secondary" href="/wallet">Перейти к продвижениям</Link></section>
    </> : !error && <div className="card">Загружаем актуальные условия…</div>}
  </div>;
}
