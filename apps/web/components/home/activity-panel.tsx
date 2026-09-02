import Link from 'next/link';
import type { PublicationCardData } from '@/lib/types';
import { buildLiveActivity } from './model';
import { HomePanel } from './home-panel';
import { relativeTime } from './utils';

const activityCopy = {
  reply: {
    mark: '↳',
    action: 'ответил в теме',
  },
  topic: {
    mark: '+',
    action: 'открыл тему',
  },
  post: {
    mark: '•',
    action: 'опубликовал запись',
  },
} as const;

export function ActivityPanel({
  publications,
}: {
  publications: PublicationCardData[];
}) {
  const activity = buildLiveActivity(publications);

  return (
    <HomePanel
      title="Сейчас на 4RRUM"
      href="/feed?mode=all"
      linkLabel="Вся лента"
      className="forrum-home-v191__activity-panel"
    >
      <div className="forrum-home-v191__activity-status">
        <span>
          <i aria-hidden="true" />
          Живая лента
        </span>
        <small>Обновляется раз в минуту</small>
      </div>

      {activity.length ? (
        <div className="forrum-home-v191__activity-list">
          {activity.map((item) => {
            const copy = activityCopy[item.kind];

            return (
              <Link
                className={`forrum-home-v191__activity-item is-${item.kind}`}
                href={`/p/${item.slug}`}
                key={item.id}
              >
                <span
                  className="forrum-home-v191__activity-mark"
                  aria-hidden="true"
                >
                  {copy.mark}
                </span>
                <span className="forrum-home-v191__activity-copy">
                  <strong>
                    <b>@{item.username}</b> {copy.action}
                  </strong>
                  <span>{item.title}</span>
                  <small>
                    {item.communityName} · {relativeTime(item.occurredAt)}
                  </small>
                </span>
              </Link>
            );
          })}
        </div>
      ) : (
        <p className="forrum-home-v191__activity-empty">
          Новых действий пока нет.
        </p>
      )}
    </HomePanel>
  );
}
