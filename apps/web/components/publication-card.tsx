'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import type { PublicationCardData } from '@/lib/types';
import { api } from '@/lib/api';
import { Avatar } from './avatar';
import { TagList } from './tag-list';
import { TelegramShareButton } from './telegram-share-button';
import { BookmarkIcon, CommentIcon, EyeIcon, HeartIcon } from './icons';

const typeNames: Record<string, string> = { DISCUSSION: 'Обсуждение', QUESTION: 'Вопрос', NEWS: 'Новость', GUIDE: 'Гайд', PROJECT: 'Проект', SERVICE: 'Услуга', CASE: 'Кейс', ANNOUNCEMENT: 'Объявление' };
function relativeDate(value: string) {
  const time = new Date(value).getTime();
  const difference = Date.now() - time;
  if (!Number.isFinite(time)) return '';
  if (difference < 60_000) return 'только что';
  const minutes = Math.floor(difference / 60_000);
  if (minutes < 60) return `${minutes} мин. назад`;
  const hours = Math.floor(difference / 3_600_000);
  if (hours < 24) return `${hours} ч. назад`;
  const days = Math.floor(difference / 86_400_000);
  if (days < 14) return `${days} дн. назад`;
  return new Date(value).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: new Date(value).getFullYear() === new Date().getFullYear() ? undefined : 'numeric' });
}

export function PublicationCard({ item, onFeedback }: {
  item: PublicationCardData;
  onFeedback?: (action: 'publication' | 'community', value: string) => void;
}) {
  const isTopic = item.format === 'TOPIC';
  const pinned = Boolean(item.pinnedUntil && new Date(item.pinnedUntil).getTime() > Date.now());
  const [feedbackState, setFeedbackState] = useState<'publication' | 'community' | null>(null);
  const [feedbackError, setFeedbackError] = useState('');
  const menuRef = useRef<HTMLDetailsElement>(null);

  async function hide(action: 'publication' | 'community') {
    setFeedbackState(action); setFeedbackError('');
    try {
      const path = action === 'publication' ? `/feed/hidden-publications/${item.id}` : `/feed/hidden-communities/${item.community.slug}`;
      await api(path, { method: 'POST' });
      menuRef.current?.removeAttribute('open');
      onFeedback?.(action, action === 'publication' ? item.id : item.community.slug);
    } catch (cause) {
      setFeedbackError(cause instanceof Error ? cause.message : 'Не удалось изменить ленту');
    } finally { setFeedbackState(null); }
  }

  return <article className={`publication-card modern-publication ${isTopic ? 'permanent-topic' : 'short-post'}`} data-community={item.community.slug} style={{ '--community-accent': item.community.accentColor ?? '#4C4C4C' } as React.CSSProperties}>
    <div className="publication-topline">
      <Link className="community-link" href={`/communities/${item.community.slug}`}>{item.community.name}</Link>
      <span className={`format-label ${isTopic ? 'topic-label' : 'post-label'}`}>{isTopic ? 'Постоянная тема' : 'Пост'}</span>
      <span className="type-label">{typeNames[item.type] ?? item.type}</span>
      {item.inheritedFromChild && <span className="inherited-label">Из подраздела</span>}
      {pinned && <span className="promoted-label">Закреплено</span>}
      {item.feedbackEnabled && <details className="publication-feedback" ref={menuRef}>
        <summary aria-label="Настроить показ публикации">•••</summary>
        <div className="publication-feedback-popover">
          <strong>Настроить ленту</strong>
          <button type="button" disabled={Boolean(feedbackState)} onClick={() => hide('publication')}>{feedbackState === 'publication' ? 'Скрываем…' : 'Не показывать эту публикацию'}</button>
          <button type="button" disabled={Boolean(feedbackState)} onClick={() => hide('community')}>{feedbackState === 'community' ? 'Скрываем…' : `Меньше из «${item.community.name}»`}</button>
          <Link href="/settings/interests">Подписки и рекомендации</Link>
          {feedbackError && <span className="error-text">{feedbackError}</span>}
        </div>
      </details>}
    </div>
    <div className="publication-content-row">
      <Avatar name={item.author.displayName} size={48} url={item.author.avatarUrl}/>
      <div className="publication-content">
        <div className="publication-author-inline"><Link href={`/u/${item.author.username}`}><strong>{item.author.displayName}</strong></Link><span>{relativeDate(item.createdAt)}</span></div>
        <Link className="publication-main" href={`/p/${item.slug}`}>{item.title && <h2>{item.title}</h2>}<p>{item.excerpt}</p></Link>
        <TagList tags={item.tags}/>
        <div className="publication-bottom"><TelegramShareButton slug={item.slug} compact/><div className="publication-stats" aria-label="Статистика публикации"><span title="Ответы"><CommentIcon/> {item.commentCount}</span><span title="Просмотры"><EyeIcon/> {item.viewCount ?? 0}</span><span title="Реакции"><HeartIcon/> {item.reactionCount}</span>{Boolean(item.bookmarkCount && item.bookmarkCount > 0) && <span title="Сохранения"><BookmarkIcon/> {item.bookmarkCount}</span>}</div>{item.reason && <span className="feed-reason">{item.reason}</span>}</div>
      </div>
    </div>
  </article>;
}
