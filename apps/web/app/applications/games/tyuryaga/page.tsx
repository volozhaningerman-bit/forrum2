import Link from 'next/link';
import './tyuryaga.css';

export const metadata = { title: 'Тюряга — 4rrum Игры' };

const nav = ['Камера', 'Карта', 'Драки', 'Задания', 'Братва', 'Магазин', 'Рейтинг'];

export default function TyuryagaPrototype() {
  return (
    <section className="tyu-page">
      <div className="tyu-breadcrumbs" aria-label="Хлебные крошки">
        <Link href="/applications">Приложения</Link><span>›</span>
        <Link href="/applications#section-1">Игры</Link><span>›</span>
        <strong>Тюряга</strong>
      </div>

      <div className="tyu-appbar">
        <div className="tyu-app-id">
          <div className="tyu-app-icon">Т</div>
          <div>
            <strong>Тюряга</strong>
            <span>Игровой прототип внутри 4rrum</span>
          </div>
        </div>
        <div className="tyu-app-meta">
          <span>● 12 483 онлайн</span>
          <span>★ 4.8</span>
          <button type="button">Сообщество игры</button>
        </div>
      </div>

      <div className="tyu-shell">
        <header className="tyu-game-header">
          <div className="tyu-logo">ТЮРЯГА <small>НОВАЯ ГЛАВА</small></div>
          <nav className="tyu-game-nav" aria-label="Навигация игры">
            {nav.map((item, index) => <button className={index === 0 ? 'active' : ''} type="button" key={item}>{item}</button>)}
          </nav>
          <div className="tyu-wallet">
            <span>💵 12 430</span>
            <span>🪙 380</span>
          </div>
        </header>

        <div className="tyu-dashboard">
          <aside className="tyu-profile">
            <div className="tyu-avatar">Б</div>
            <div className="tyu-name"><strong>Бродяга</strong><span>ID: 458732</span></div>

            <div className="tyu-level"><b>18 уровень</b><span>2 430 / 5 000</span></div>
            <div className="tyu-progress"><i /></div>

            <Stat label="Здоровье" value="100 / 100" percent="100%" tone="red" />
            <Stat label="Энергия" value="60 / 100" percent="60%" tone="gold" />
            <Stat label="Сытость" value="70 / 100" percent="70%" tone="mint" />

            <div className="tyu-stats">
              <div><span>Сила</span><b>48</b></div>
              <div><span>Защита</span><b>32</b></div>
              <div><span>Авторитет</span><b>1 240</b></div>
            </div>
          </aside>

          <main className="tyu-scene">
            <div className="tyu-cell">
              <div className="tyu-window" />
              <div className="tyu-walltext">СВОБОДА<br/>НАЧИНАЕТСЯ<br/>ВНУТРИ</div>
              <div className="tyu-bed" />
              <div className="tyu-prisoner">
                <div className="tyu-head" />
                <div className="tyu-body" />
                <div className="tyu-legs" />
              </div>
              <div className="tyu-lamp" />
            </div>

            <div className="tyu-actions">
              <Action icon="✊" title="Тренировка" text="Развивай характеристики" />
              <Action icon="🥊" title="Драки" text="Проверь свою силу" />
              <Action icon="🎒" title="Инвентарь" text="Одежда, предметы, тату" />
              <Action icon="🛒" title="Магазин" text="Всё для выживания" />
            </div>
          </main>

          <aside className="tyu-side">
            <section>
              <small>Текущая локация</small>
              <h3>Барак №4</h3>
              <p>Новичок · Северный корпус</p>
              <button type="button">К карте тюрем →</button>
            </section>
            <section>
              <small>Задание дня</small>
              <h3>Победи 3 заключённых</h3>
              <p>Прогресс: 1 / 3</p>
              <div className="tyu-taskbar"><i /></div>
              <p>Награда: 💵 500 · 🪙 50</p>
            </section>
            <section>
              <small>Новости</small>
              <p>Открыта регистрация в турнир «Беспредел».</p>
              <p>В магазин добавлены новые предметы.</p>
            </section>
          </aside>
        </div>

        <div className="tyu-bottom">
          <section>
            <h3>Друзья в игре</h3>
            <div className="tyu-friends">
              <span>Кот_Батя · онлайн</span><span>Лёша · в игре</span><span>Малой · 2ч назад</span>
            </div>
          </section>
          <section>
            <h3>Последние события</h3>
            <p>Кот_Батя победил тебя в бою</p>
            <p>Получен предмет: «Чёрная кепка»</p>
          </section>
        </div>
      </div>

      <div className="tyu-footerline">
        <Link href="/applications">← Вернуться к приложениям</Link>
        <span>Прототип v0.1 · без серверной логики</span>
      </div>
    </section>
  );
}

function Stat({ label, value, percent, tone }: { label: string; value: string; percent: string; tone: 'red'|'gold'|'mint' }) {
  return <div className="tyu-stat"><div><span>{label}</span><b>{value}</b></div><div className={`tyu-meter ${tone}`}><i style={{width: percent}} /></div></div>;
}

function Action({ icon, title, text }: { icon: string; title: string; text: string }) {
  return <button className="tyu-action" type="button"><span>{icon}</span><div><b>{title}</b><small>{text}</small></div></button>;
}
