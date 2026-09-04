import { buildWeeklyPulse } from './model';
import type { WeeklyUser } from './types';
import { formatCount } from './utils';

export function WeeklyPulsePanel({
  weekly,
  demo = false,
}: {
  weekly: {
    likes: WeeklyUser[];
    activity: WeeklyUser[];
  };
  demo?: boolean;
}) {
  const pulse = buildWeeklyPulse(weekly);

  return (
    <section
      className="forrum-home-v16__panel forrum-home-v24__pulse-panel"
      data-demo={demo ? 'true' : undefined}
    >
      <header className="forrum-home-v16__panel-head">
        <h2>Пульс недели</h2>
        {demo && (
          <small className="forrum-home-v22__demo-label">
            Бета-пример
          </small>
        )}
        {!demo && (
          <small className="forrum-home-v24__pulse-note">
            топ недели
          </small>
        )}
      </header>
      <dl className="forrum-home-v24__pulse-list">
        {pulse.map((item, index) => (
          <div key={item.label}>
            <dt>
              <span aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              {item.label}
            </dt>
            <dd>{formatCount(item.value)}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
