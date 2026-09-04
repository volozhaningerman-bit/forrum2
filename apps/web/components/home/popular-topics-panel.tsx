import Link from 'next/link';
import { CommunityMark } from '@/components/community-mark';
import { TelegramShareButton } from '@/components/telegram-share-button';
import { HomePanel } from './home-panel';
import { topicSignal } from './model';
import { TopicReactions } from './topic-reactions';
import type { DiscussedTopicData } from './types';
import {
  formatCount,
  lastReply,
  publicationTypeName,
  relativeTime,
  topicContentVisual,
} from './utils';

function DiscussedTopic({ item }: { item: DiscussedTopicData }) {
  const reply = lastReply(item);
  const type = item.type.toLowerCase();
  const signal = topicSignal(item);

  return (
    <article
      className={`forrum-home-v16__discussed forrum-home-v18__discussed forrum-home-v19__topic type-${type}`}
      data-topic-type={type}
    >
      <Link
        className="forrum-home-v22__topic-main"
        href={`/p/${item.slug}`}
      >
        <CommunityMark
          className="forrum-home-v16__topic-mark forrum-home-v18__topic-mark"
          name={item.community.name}
          url={topicContentVisual(item)}
          size={48}
        />
        <span className="forrum-home-v16__discussed-copy">
          <span className="forrum-home-v16__topic-title">
            <span
              className={`forrum-home-v16__type forrum-home-v18__topic-type type-${type}`}
            >
              #{publicationTypeName[item.type.toUpperCase()] ?? 'Тема'}
            </span>
            {signal && (
              <span
                className={`forrum-home-v20__topic-pulse is-${signal.status}`}
                aria-label={`Статус темы: ${signal.label}`}
              >
                <i aria-hidden="true" />
                {signal.label}
              </span>
            )}
            <strong>
              {item.title?.trim() || 'Тема без заголовка'}
            </strong>
          </span>
          <span className="forrum-home-v16__topic-excerpt">
            {item.excerpt}
          </span>
        </span>
      </Link>
      <span className="forrum-home-v20__topic-metrics">
        <span
          className="forrum-home-v16__discussion-stat forrum-home-v16__topic-stat"
          title="Ответы"
        >
          {formatCount(item.commentCount)}
        </span>
        <span
          className="forrum-home-v16__discussion-stat forrum-home-v16__topic-stat"
          title="Просмотры"
        >
          {formatCount(item.viewCount)}
        </span>
        <span className="forrum-home-v16__last-message forrum-home-v18__last-message">
          <strong>@{reply.username}</strong>
          <small>{relativeTime(reply.createdAt)}</small>
        </span>
        <span className="forrum-home-v24__topic-actions">
          <TopicReactions
            slug={item.slug}
            initialCount={item.reactionCount}
            initialViewerReaction={item.viewerReaction}
          />
          <TelegramShareButton
            compact
            variant="endcap"
            label="Поделиться в Telegram"
            slug={item.slug}
          />
        </span>
      </span>
    </article>
  );
}

export function PopularTopicsPanel({
  items,
}: {
  items: DiscussedTopicData[];
}) {
  return (
    <HomePanel
      title="Обсуждаемые темы"
      href="/feed?mode=popular"
      linkLabel="Все темы"
      className="forrum-home-v19__popular-panel"
    >
      <nav
        className="forrum-home-v22__feed-tabs"
        aria-label="Режим ленты"
      >
        <Link aria-current="page" href="/feed?mode=popular">
          🔥 Тренд
        </Link>
        <Link href="/feed?mode=new">✨ Новое</Link>
        <Link href="/feed?mode=subscriptions">Моя лента</Link>
      </nav>
      <div
        className="forrum-home-v16__discussed-head"
        aria-hidden="true"
      >
        <span>Ответы</span>
        <span>Просмотры</span>
        <span>Последнее</span>
      </div>
      <div className="forrum-home-v16__discussed-list">
        {items.length ? (
          items.map((item) => (
            <DiscussedTopic key={item.id} item={item} />
          ))
        ) : (
          <p className="forrum-home-v16__empty">
            Обсуждаемых тем пока нет.
          </p>
        )}
      </div>
    </HomePanel>
  );
}
