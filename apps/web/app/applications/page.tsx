import Link from 'next/link';

export const metadata = { title: 'Приложения — 4rrum' };

const sections = [
  { name: 'AI-инструменты', description: 'Помощники для повседневных задач и творчества.' },
  { name: 'Игры', description: 'Браузерные игры и интерактивные миры.', href: '/applications/games/tyuryaga', badge: 'Новый прототип' },
  { name: 'Эксперименты', description: 'Небольшие прототипы и необычные идеи.' },
  { name: 'Neural Lab', description: 'Исследования возможностей нейросетей.' },
];

export default function Applications() {
  return (
    <section className="applications-directory">
      <span className="eyebrow">Лаборатория сообщества</span>
      <h1>Приложения</h1>
      <p>Инструменты, игры и эксперименты внутри 4rrum.</p>

      <div className="applications-grid">
        {sections.map((item, i) => (
          <article key={item.name} id={`section-${i}`}>
            <div className="inline-actions">
              <h2>{item.name}</h2>
              {item.badge ? <small className="tag">{item.badge}</small> : null}
            </div>
            <p>{item.description}</p>
            {item.href ? (
              <Link className="button small" href={item.href}>Открыть игру</Link>
            ) : (
              <small>Приложений пока нет</small>
            )}
          </article>
        ))}
      </div>

      <Link className="button" href="/create?intent=result">Предложить свой проект</Link>
    </section>
  );
}
