'use client';

import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Avatar } from '@/components/avatar';
import { PublicationCard } from '@/components/publication-card';
import type { PublicationCardData } from '@/lib/types';

type Partner = { id: string; type: string; displayName: string; platform: string; channelUrl: string; audienceText: string | null; description: string; user: { username: string; displayName: string; avatarUrl: string | null } };

const typeNames: Record<string, string> = { STREAMER: 'Стример', VIDEO_CREATOR: 'Автор видео', BLOGGER: 'Блогер', CHANNEL: 'Канал' };

export default function MediaPage() {
  const [items, setItems] = useState<PublicationCardData[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [applyOpen, setApplyOpen] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    Promise.all([api<PublicationCardData[]>('/news'), api<Partner[]>('/media/partners')])
      .then(([news, partnerRows]) => { setItems(news); setPartners(partnerRows); })
      .catch((cause) => setError(cause instanceof Error ? cause.message : 'Не удалось загрузить Медиа'));
  }, []);

  async function apply(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setSending(true); setError(''); setMessage('');
    const form = new FormData(event.currentTarget);
    try {
      await api('/media/partners/apply', { method: 'POST', body: JSON.stringify(Object.fromEntries(form)) });
      setMessage('Заявка отправлена на проверку.'); setApplyOpen(false); event.currentTarget.reset();
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Не удалось отправить заявку'); }
    finally { setSending(false); }
  }

  return <div className="media-page">
    <section className="section-hero media-hero"><div><span className="eyebrow">Люди, которые рассказывают о проектах</span><h1>Медиа FORRUM</h1><p>Стримеры, видеоблогеры и авторы каналов, которые открыто поддерживают FORRUM и упоминают платформу в своих материалах.</p></div><button type="button" className="button" onClick={() => setApplyOpen((value) => !value)}>Стать медиапартнёром</button></section>
    {message && <div className="success-box">{message}</div>}{error && <div className="error-box">{error}</div>}

    {applyOpen && <section className="card media-application"><div><span className="eyebrow">Заявка</span><h2>Добавить себя в Медиа FORRUM</h2><p className="muted">Укажите реальный канал. Мы не требуем положительного отзыва — только честное упоминание FORRUM и прозрачную маркировку сотрудничества.</p></div><form onSubmit={apply}><label>Тип<select name="type" defaultValue="STREAMER"><option value="STREAMER">Стример</option><option value="VIDEO_CREATOR">Автор видео</option><option value="BLOGGER">Блогер</option><option value="CHANNEL">Канал</option></select></label><label>Название канала или имя<input name="displayName" minLength={2} maxLength={80} required/></label><label>Платформа<input name="platform" placeholder="YouTube, Twitch, Telegram…" minLength={2} maxLength={40} required/></label><label>Ссылка<input name="channelUrl" type="url" placeholder="https://..." required/></label><label>Аудитория <span className="optional-label">необязательно</span><input name="audienceText" maxLength={80} placeholder="Например, 12 000 подписчиков"/></label><label>Как вы готовы участвовать<textarea name="description" minLength={20} maxLength={1500} required/></label><div className="inline-actions"><button className="button" disabled={sending}>{sending ? 'Отправляем…' : 'Отправить заявку'}</button><button type="button" className="button ghost" onClick={() => setApplyOpen(false)}>Закрыть</button></div></form></section>}

    <div className="section-title"><div><span className="eyebrow">Участники программы</span><h2>Медиапартнёры</h2><p className="muted">Профили появляются только после проверки канала.</p></div></div>
    <section className="media-partner-grid">{partners.map((partner) => <a className="media-partner-card" key={partner.id} href={partner.channelUrl} target="_blank" rel="noreferrer"><Avatar name={partner.displayName} size={54} url={partner.user.avatarUrl}/><div><span className="type-label">{typeNames[partner.type] ?? partner.type} · {partner.platform}</span><h3>{partner.displayName}</h3><p>{partner.description}</p><footer><span>@{partner.user.username}</span>{partner.audienceText && <span>{partner.audienceText}</span>}<b>Открыть канал ↗</b></footer></div></a>)}{!partners.length && <div className="empty-state"><strong>Первые партнёры ещё проходят проверку</strong><span>Каталог заполнится реальными стримерами, авторами видео и каналами.</span></div>}</section>

    <section className="media-rules card"><div><span className="eyebrow">Принцип программы</span><h2>Не покупаем фальшивые рекомендации</h2></div><p>Партнёр сам решает, что говорить о FORRUM. Обязательны честная маркировка сотрудничества, ссылка и отсутствие накрученных показателей.</p></section>

    <div className="section-title"><div><h2>Материалы и обновления</h2><p className="muted">Редакционные публикации FORRUM и новости медиапартнёров.</p></div></div>
    <div className="publication-list spacious-list">{items.map((item) => <PublicationCard key={item.id} item={item}/>)}{!items.length && !error && <div className="empty-state"><strong>Медиаматериалов пока нет</strong><span>Здесь появятся интервью, подборки и совместные форматы.</span></div>}</div>
  </div>;
}
