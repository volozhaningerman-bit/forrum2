'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { PublicationCard } from '@/components/publication-card';
import type { PublicationCardData } from '@/lib/types';

export default function MediaPage() {
  const [items, setItems] = useState<PublicationCardData[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api<PublicationCardData[]>('/news').then(setItems).catch((cause) => {
      setError(cause instanceof Error ? cause.message : 'Не удалось загрузить медиаматериалы');
    });
  }, []);

  return <div className="media-page">
    <section className="section-hero media-hero">
      <div>
        <span className="eyebrow">Люди, которые рассказывают о проектах</span>
        <h1>Медиа FORRUM</h1>
        <p>Стримеры, видеоблогеры и авторы каналов, которые открыто поддерживают FORRUM и упоминают платформу в своих материалах.</p>
      </div>
      <Link className="button" href="/messages?to=owner">Стать медиапартнёром</Link>
    </section>

    <section className="media-program-grid">
      <article className="card">
        <span className="media-program-number">01</span>
        <h2>Стримеры</h2>
        <p>Упоминание FORRUM во время эфира, ссылка в описании и участие в событиях сообщества.</p>
      </article>
      <article className="card">
        <span className="media-program-number">02</span>
        <h2>Авторы видео</h2>
        <p>Интеграция названия FORRUM в ролик, честное обозначение сотрудничества и ссылка на релевантный раздел.</p>
      </article>
      <article className="card">
        <span className="media-program-number">03</span>
        <h2>Блогеры и каналы</h2>
        <p>Регулярные подборки, интервью с авторами проектов и совместные редакционные форматы.</p>
      </article>
    </section>

    <section className="media-rules card">
      <div>
        <span className="eyebrow">Принцип программы</span>
        <h2>Не покупаем фальшивые рекомендации</h2>
      </div>
      <p>Партнёр сам решает, что говорить о FORRUM. Обязательны только честная маркировка сотрудничества, ссылка и отсутствие накрученных показателей.</p>
    </section>

    <div className="section-title">
      <div>
        <h2>Материалы и обновления</h2>
        <p className="muted">Редакционные публикации FORRUM и новости медиапартнёров.</p>
      </div>
    </div>

    {error && <div className="error-box">{error}</div>}
    <div className="publication-list spacious-list">
      {items.map((item) => <PublicationCard key={item.id} item={item}/>)}
      {!items.length && !error && <div className="empty-state">
        <strong>Медиаматериалов пока нет</strong>
        <span>Первых партнёров и редакционные публикации добавим после согласования формата.</span>
      </div>}
    </div>
  </div>;
}
