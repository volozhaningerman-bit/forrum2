import { formatCount } from './utils';
import type { HomeOverview } from './types';

const betaStats: HomeOverview['stats'] = {
  communities: 7,
  topics: 84,
  messages: 1_284,
  usersOnline: 19,
  recordOnline: 0,
  recordOnlineAt: null,
};

export function ForumStatsPanel({
  stats,
}: {
  stats?: HomeOverview['stats'];
}) {
  const values = stats ?? betaStats;
  const demo = !stats;
  const items = [
    { label: 'Сообщений', value: values.messages },
    { label: 'Тем', value: values.topics },
    { label: 'Сообществ', value: values.communities },
    { label: 'Сейчас онлайн', value: values.usersOnline, live: true },
  ];

  return (
    <section
      className="forrum-home-v16__panel forrum-home-v23__stats-panel"
      data-demo={demo ? 'true' : undefined}
    >
      <header className="forrum-home-v16__panel-head">
        <h2>4RRUM в цифрах</h2>
        {demo && (
          <small className="forrum-home-v22__demo-label">
            Бета-пример
          </small>
        )}
      </header>
      <dl className="forrum-home-v23__stats-list">
        {items.map((item) => (
          <div
            className={item.live ? 'is-live' : undefined}
            key={item.label}
          >
            <dt>{item.label}</dt>
            <dd>{formatCount(item.value)}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
