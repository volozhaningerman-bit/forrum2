'use client';

import Link from 'next/link';
import type { FormEvent } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { Avatar } from '@/components/avatar';
import { api } from '@/lib/api';
import { formatRelativeTime } from '@/lib/format';

type Interaction = {
  id: string;
  type: string;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
  viewerRole: 'CREATOR' | 'COUNTERPART';
  viewerConfirmed: boolean;
  otherConfirmed: boolean;
  viewerCompleted: boolean;
  otherCompleted: boolean;
  otherUser: { username: string; displayName: string; avatarUrl: string | null };
  community: { slug: string; name: string } | null;
  publication: { slug: string; title: string | null } | null;
  portfolioItem: { id: string; kind: string; title: string } | null;
  review: { id: string; verdict: string; body: string; evidenceMediaId: string | null; moderationStatus: 'REVIEW' | 'PUBLISHED' | 'REJECTED'; moderationNote: string | null; createdAt: string } | null;
};

type UploadedMedia = {
  id: string;
  url: string;
  thumbnailUrl: string;
};

const statusNames: Record<string, string> = {
  PENDING: 'Ждёт подтверждения',
  CONFIRMED: 'Подтверждено',
  COMPLETED: 'Завершено',
  CANCELLED: 'Отменено',
};

const typeNames: Record<string, string> = {
  SERVICE: 'Услуга',
  PROJECT: 'Совместный проект',
  DEAL: 'Сделка',
  HELP: 'Подтверждённая помощь',
};

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('Не удалось прочитать изображение'));
    reader.readAsDataURL(file);
  });
}

export default function InteractionsPage() {
  const [items, setItems] = useState<Interaction[]>([]);
  const [filter, setFilter] = useState<'active' | 'completed' | 'all'>('active');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [loading, setLoading] = useState(true);
  const [reviewingId, setReviewingId] = useState<string | null>(null);
  const [submittingReview, setSubmittingReview] = useState(false);

  const load = async () => {
    try {
      setError('');
      setItems(await api<Interaction[]>('/interactions'));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Не удалось загрузить взаимодействия');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const shown = useMemo(
    () => items.filter((item) => filter === 'all' || (filter === 'completed' ? item.status === 'COMPLETED' : ['PENDING', 'CONFIRMED'].includes(item.status))),
    [items, filter],
  );

  async function action(id: string, kind: 'confirm' | 'complete' | 'cancel') {
    try {
      setError('');
      await api(`/interactions/${id}/${kind}`, {
        method: 'POST',
        body: JSON.stringify(kind === 'cancel' ? { reason: 'Отменено участником' } : {}),
      });
      setNotice(kind === 'confirm' ? 'Взаимодействие подтверждено' : kind === 'complete' ? 'Подтверждение завершения сохранено' : 'Взаимодействие отменено');
      await load();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Не удалось выполнить действие');
    }
  }

  async function review(event: FormEvent<HTMLFormElement>, item: Interaction) {
    event.preventDefault();
    if (submittingReview) return;

    const form = new FormData(event.currentTarget);
    const evidence = form.get('evidence');
    setSubmittingReview(true);

    try {
      setError('');
      let evidenceMediaId: string | undefined;

      if (evidence instanceof File && evidence.size > 0) {
        if (evidence.size > 8 * 1024 * 1024) throw new Error('Изображение больше 8 МБ');
        if (!['image/png', 'image/jpeg', 'image/webp'].includes(evidence.type)) {
          throw new Error('Разрешены только PNG, JPEG и WebP');
        }

        const uploaded = await api<UploadedMedia>('/media', {
          method: 'POST',
          body: JSON.stringify({
            kind: 'POST_IMAGE',
            originalName: evidence.name,
            dataUrl: await fileToDataUrl(evidence),
          }),
        });
        evidenceMediaId = uploaded.id;
      }

      await api(`/interactions/${item.id}/reviews`, {
        method: 'POST',
        body: JSON.stringify({
          verdict: form.get('verdict'),
          body: form.get('body'),
          evidenceMediaId,
        }),
      });

      setReviewingId(null);
      setNotice(evidenceMediaId ? 'Отзыв с фото отправлен на модерацию.' : 'Отзыв опубликован.');
      await load();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Не удалось оставить отзыв');
    } finally {
      setSubmittingReview(false);
    }
  }

  return <div className="interactions-page">
    <header className="page-heading">
      <div>
        <span className="eyebrow">Личный раздел</span>
        <h1>Подтверждённые взаимодействия</h1>
        <p>Фиксируйте услуги, совместные проекты, сделки и помощь. Отзыв становится доступен только после подтверждения обеими сторонами и завершения.</p>
      </div>
    </header>

    {notice && <div className="success-box" role="status">{notice}</div>}
    {error && <div className="error-box" role="alert">{error}</div>}

    <nav className="segmented-tabs" aria-label="Фильтр взаимодействий">
      <button type="button" className={filter === 'active' ? 'active' : ''} onClick={() => setFilter('active')}>Активные</button>
      <button type="button" className={filter === 'completed' ? 'active' : ''} onClick={() => setFilter('completed')}>Завершённые</button>
      <button type="button" className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>Все</button>
    </nav>

    {loading ? <div className="interaction-list"><div className="skeleton tall"/><div className="skeleton tall"/></div> : <div className="interaction-list">
      {shown.map((item) => <article className={`interaction-card status-${item.status.toLowerCase()}`} key={item.id}>
        <header>
          <div className="interaction-person">
            <Avatar name={item.otherUser.displayName} size={46} url={item.otherUser.avatarUrl}/>
            <div>
              <Link href={`/u/${item.otherUser.username}`}><strong>{item.otherUser.displayName}</strong></Link>
              <span>@{item.otherUser.username}</span>
            </div>
          </div>
          <div className="interaction-status">
            <span>{statusNames[item.status]}</span>
            <small>{formatRelativeTime(item.updatedAt)}</small>
          </div>
        </header>

        <div className="interaction-body">
          <span className="type-label">{typeNames[item.type] ?? item.type}</span>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
          <div className="interaction-links">
            {item.community && <Link href={`/communities/${item.community.slug}`}>{item.community.name}</Link>}
            {item.publication && <Link href={`/p/${item.publication.slug}`}>Связанная публикация</Link>}
            {item.portfolioItem && <Link href={`/portfolio/${item.portfolioItem.id}`}>{item.portfolioItem.kind === 'SERVICE' ? 'Связанная услуга' : 'Связанный проект'}</Link>}
          </div>
        </div>

        <div className="interaction-confirmation-grid">
          <div className={item.viewerConfirmed ? 'done' : ''}><strong>Вы подтвердили</strong><span>{item.viewerConfirmed ? 'Да' : 'Нет'}</span></div>
          <div className={item.otherConfirmed ? 'done' : ''}><strong>Вторая сторона</strong><span>{item.otherConfirmed ? 'Подтвердила' : 'Ожидается'}</span></div>
          <div className={item.viewerCompleted ? 'done' : ''}><strong>Вы завершили</strong><span>{item.viewerCompleted ? 'Да' : 'Нет'}</span></div>
          <div className={item.otherCompleted ? 'done' : ''}><strong>Вторая сторона</strong><span>{item.otherCompleted ? 'Завершила' : 'Ожидается'}</span></div>
        </div>

        <footer>
          {item.status === 'PENDING' && item.viewerRole === 'COUNTERPART' && <button type="button" className="button small" onClick={() => action(item.id, 'confirm')}>Подтвердить факт</button>}
          {item.status === 'CONFIRMED' && !item.viewerCompleted && <button type="button" className="button small" onClick={() => action(item.id, 'complete')}>Подтвердить завершение</button>}
          {['PENDING', 'CONFIRMED'].includes(item.status) && <button type="button" className="button ghost small danger-text" onClick={() => action(item.id, 'cancel')}>Отменить</button>}
          {item.status === 'COMPLETED' && !item.review && <button type="button" className="button secondary small" onClick={() => setReviewingId(reviewingId === item.id ? null : item.id)}>Оставить отзыв</button>}
          {item.review && <span className="verified-review-note">{item.review.moderationStatus === 'REVIEW' ? 'Отзыв ожидает модерации' : item.review.moderationStatus === 'REJECTED' ? 'Отзыв отклонён модерацией' : 'Ваш отзыв опубликован'}{item.review.evidenceMediaId ? ' · фото приложено' : ''}</span>}
        </footer>

        {reviewingId === item.id && <form className="interaction-review-form" onSubmit={(event) => review(event, item)}>
          <label>
            Итог взаимодействия
            <select name="verdict" defaultValue="POSITIVE">
              <option value="POSITIVE">Положительный</option>
              <option value="NEUTRAL">Нейтральный</option>
              <option value="NEGATIVE">Негативный</option>
            </select>
          </label>
          <label>
            Конкретный отзыв
            <textarea name="body" minLength={10} maxLength={2000} placeholder="Опишите результат и важные факты без личных и платёжных данных" required/>
          </label>
          <label>
            Фото или скриншот <span className="optional-label">желательно</span>
            <input name="evidence" type="file" accept="image/png,image/jpeg,image/webp"/>
          </label>
          <div className="warning-box review-evidence-warning">
            Перед загрузкой закройте лишние имена, аватары, телефоны, адреса, реквизиты и части личной переписки. Отзыв может не пройти модерацию, если на изображении видны посторонние люди или данные, не относящиеся к отзыву.
          </div>
          <button className="button small" disabled={submittingReview}>{submittingReview ? 'Сохраняем…' : 'Опубликовать отзыв'}</button>
        </form>}
      </article>)}

      {!shown.length && <div className="empty-state">
        <strong>Здесь пока ничего нет</strong>
        <span>{filter === 'active' ? 'Новый запрос создаётся из профиля другого пользователя.' : 'Завершённые взаимодействия появятся после подтверждения обеими сторонами.'}</span>
      </div>}
    </div>}
  </div>;
}
