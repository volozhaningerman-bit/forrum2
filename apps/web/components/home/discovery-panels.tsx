import Link from 'next/link';
import type { PublicationCardData } from '@/lib/types';
import { CommunityMark } from '@/components/community-mark';
import { buildServiceLoop } from './model';
import type {
  HomeMediaPartner,
  HomeService,
} from './types';
import {
  isStreamStart,
  relativeTime,
  topicContentVisual,
} from './utils';
import { HomePanel } from './home-panel';

export type MediaSelection = {
  item: PublicationCardData;
  partner: HomeMediaPartner;
};

function MediaNotice({
  item,
  partner,
}: MediaSelection) {
  const live = isStreamStart(item);
  const content = (
    <>
      <CommunityMark
        className="forrum-home-v18__media-mark"
        name={partner.displayName}
        url={partner.user.avatarUrl || topicContentVisual(item)}
        size={38}
      />
      <span className="forrum-home-v18__media-copy">
        <span
          className={`forrum-home-v18__media-kind ${live ? 'is-live' : ''}`}
        >
          {live && <i aria-hidden="true" />}
          {live ? 'В эфире' : '#Новости медиа'}
        </span>
        <strong>
          {item.title?.trim() ||
            `${partner.displayName}: новая публикация`}
        </strong>
        <small>
          {partner.displayName} · {partner.platform} ·{' '}
          {live ? 'смотреть ↗' : relativeTime(item.createdAt)}
        </small>
      </span>
    </>
  );

  return live ? (
    <a
      className="forrum-home-v18__media-item is-live"
      href={partner.channelUrl}
      target="_blank"
      rel="noreferrer"
    >
      {content}
    </a>
  ) : (
    <Link
      className="forrum-home-v18__media-item"
      href={`/p/${item.slug}`}
    >
      {content}
    </Link>
  );
}

function ServiceNotice({ item }: { item: HomeService }) {
  return (
    <Link
      className="forrum-home-v18__service-item"
      href={`/portfolio/${item.id}`}
    >
      <span
        className="forrum-home-v18__service-signal"
        aria-hidden="true"
      />
      <span>
        <strong>{item.title || 'Услуга без заголовка'}</strong>
        <small>
          {item.priceText || 'По договорённости'} · @{item.owner.username}
          {item.interactionCount > 0
            ? ` · ${item.interactionCount} подтвержд.`
            : ''}
        </small>
      </span>
      <em>{relativeTime(item.updatedAt)}</em>
    </Link>
  );
}

export function MediaPanel({
  items,
  loaded,
}: {
  items: MediaSelection[];
  loaded: boolean;
}) {
  const hasLive = items.some(({ item }) =>
    isStreamStart(item),
  );

  return (
    <HomePanel title="Медиа" href="/media">
      <div
        className="forrum-home-v18__media-list"
        aria-live="polite"
      >
        <div className="forrum-home-v181__media-status">
          <span>
            {hasLive ? 'Сейчас в эфире' : 'Эфиры и новости'}
          </span>
          <small>Автообновление · 1 мин.</small>
        </div>
        {items.length ? (
          items.map(({ item, partner }) => (
            <MediaNotice
              key={item.id}
              item={item}
              partner={partner}
            />
          ))
        ) : (
          <div className="forrum-home-v181__empty-state">
            <strong>
              {loaded
                ? 'Медиапартнёры скоро появятся'
                : 'Загружаем медиа…'}
            </strong>
            <span>
              Здесь будут старты стримов и новости подключённых участников.
            </span>
            <Link href="/media">Подключить своё медиа →</Link>
          </div>
        )}
      </div>
    </HomePanel>
  );
}

export function ServicesPanel({
  services,
  loaded,
}: {
  services: HomeService[];
  loaded: boolean;
}) {
  const loop = buildServiceLoop(services.slice(0, 12));

  return (
    <HomePanel title="Услуги" href="/services">
      <div
        className="forrum-home-v18__service-window"
        data-animated={loop.animated ? 'true' : undefined}
      >
        <div className="forrum-home-v18__service-track">
          {loop.items.length ? (
            loop.items.map((item, index) => (
              <ServiceNotice
                key={`${item.id}-${index}`}
                item={item}
              />
            ))
          ) : (
            <div className="forrum-home-v181__empty-state">
              <strong>
                {loaded ? 'Услуг пока нет' : 'Загружаем услуги…'}
              </strong>
              <span>
                Первая опубликованная услуга запустит живую ленту.
              </span>
              <Link href="/services">Разместить услугу →</Link>
            </div>
          )}
        </div>
      </div>
    </HomePanel>
  );
}
