import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './applications.module.css';

export const metadata: Metadata = {
  title: 'Приложения',
  description: 'Игры, AI-инструменты и эксперименты внутри 4rrum.',
  alternates: { canonical: '/applications' },
  openGraph: {
    url: '/applications',
    title: 'Приложения',
    description: 'Игры, AI-инструменты и эксперименты внутри 4rrum.',
  },
};

const secondarySections = [
  { name: 'AI-инструменты', description: 'Помощники для повседневных задач и творчества.' },
  { name: 'Эксперименты', description: 'Небольшие прототипы и необычные идеи.' },
  { name: 'Neural Lab', description: 'Исследования возможностей нейросетей.' },
];

export default function Applications() {
  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>Лаборатория сообщества</span>
        <h1>Приложения</h1>
        <p>Игры, инструменты и эксперименты внутри 4rrum.</p>
      </header>

      <div className="applications-grid">
        <article className={styles.featured}>
          <div className={styles.featuredArt} aria-hidden="true" />
          <div className={styles.featuredCopy}>
            <div className={styles.badges}>
              <span className={styles.badge}>Игра</span>
              <span className={styles.statusBadge}>В разработке</span>
            </div>
            <h2>Новая игра 4rrum</h2>
            <p>
              Готовим новый игровой проект 4rrum. Публичной альфы пока нет:
              сначала фиксируем основной игровой цикл, механику и визуальное направление.
            </p>
            <div className={styles.gameFacts}>
              <span>Новая концепция</span>
              <span>•</span>
              <span>Чистый прототип</span>
            </div>
            <span className={styles.gameStatus}>Публичная версия пока недоступна</span>
          </div>
        </article>

        <div className={styles.grid}>
          {secondarySections.map((item) => (
            <article className={styles.card} key={item.name}>
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <small>Приложений пока нет</small>
            </article>
          ))}
        </div>
      </div>

      <div className={styles.footerAction}>
        <Link className={styles.projectButton} href="/create?intent=result">
          Предложить свой проект
        </Link>
      </div>
    </section>
  );
}
