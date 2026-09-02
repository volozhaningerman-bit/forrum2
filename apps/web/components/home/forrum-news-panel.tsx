import Link from 'next/link';
import type { PublicationCardData } from '@/lib/types';
import { CommunityMark } from '@/components/community-mark';
import { HomePanel } from './home-panel';
import { relativeTime, topicContentVisual } from './utils';

export function ForrumNewsPanel({
  announcements,
}: {
  announcements: PublicationCardData[];
}) {
  return (
    <HomePanel title="Новости 4RRUM" href="/news">
      <div className="forrum-home-v16__actual-list">
        {announcements.length ? (
          announcements.slice(0, 3).map((item) => (
            <Link
              className="forrum-home-v16__actual"
              href={`/p/${item.slug}`}
              key={item.id}
            >
              <CommunityMark
                name={item.community.name}
                url={topicContentVisual(item)}
                size={30}
              />
              <span>
                <strong>{item.title || 'Новость 4RRUM'}</strong>
                <small>{relativeTime(item.createdAt)}</small>
              </span>
            </Link>
          ))
        ) : (
          <p className="forrum-home-v16__empty">
            Новости 4RRUM пока не опубликованы.
          </p>
        )}
      </div>
    </HomePanel>
  );
}
