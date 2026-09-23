'use client';

import { useMemo, useState } from 'react';

type WorkspaceSlot = {
  key: string;
  label: string;
  item: string;
  level: number;
  icon: string;
};

type ActionCard = {
  id: string;
  icon: string;
  title: string;
  text: string;
  tone: 'green' | 'blue' | 'purple' | 'orange';
};

const workspace: WorkspaceSlot[] = [
  { key: 'clothes', label: 'Одежда', item: 'Обычная рубашка', level: 1, icon: 'clothes' },
  { key: 'chair', label: 'Стул', item: 'Старый офисный', level: 1, icon: 'chair' },
  { key: 'desk', label: 'Стол', item: 'Потрёпанный', level: 1, icon: 'desk' },
  { key: 'pc', label: 'ПК', item: 'Старый системник', level: 1, icon: 'pc' },
  { key: 'monitor', label: 'Монитор', item: 'CRT 15″', level: 1, icon: 'monitor' },
  { key: 'accessory', label: 'Аксессуар', item: 'Пусто', level: 0, icon: 'plus' },
];

const nav = [
  ['home', 'Главная'],
  ['career', 'Карьера'],
  ['company', 'Компания'],
  ['inventory', 'Инвентарь'],
  ['achievement', 'Достижения'],
  ['character', 'Персонаж'],
  ['shop', 'Магазин'],
] as const;

const actionCards: ActionCard[] = [
  { id: 'work', icon: 'work', title: 'Работать', text: 'Выполнять задачи', tone: 'green' },
  { id: 'approve', icon: 'approve', title: 'Согласовать', text: 'Общаться с коллегами', tone: 'blue' },
  { id: 'learn', icon: 'training', title: 'Обучение', text: 'Развивать навыки', tone: 'purple' },
  { id: 'prank', icon: 'prank', title: 'Шалости', text: 'Немного отвлечься', tone: 'orange' },
];

const news = [
  ['Новый финансовый директор', 'Сегодня, 12:30', 'green'],
  ['Пятничная пицца в 17:00', 'Вчера, 15:20', 'gold'],
  ['Кофемашина снова работает!', 'Вчера, 11:05', 'blue'],
];

export function OfficeGame() {
  const [selectedSlot, setSelectedSlot] = useState('pc');
  const [notice, setNotice] = useState('Первый рабочий день. Начни с простого поручения.');
  const [energy, setEnergy] = useState(8);

  const slot = useMemo(
    () => workspace.find((item) => item.key === selectedSlot) ?? workspace[0],
    [selectedSlot],
  );

  const triggerAction = (id: string) => {
    if (id === 'work') {
      if (energy <= 0) {
        setNotice('Энергия закончилась. Даже стажёрам иногда нужен кофе.');
        return;
      }
      setEnergy((value) => Math.max(0, value - 1));
      setNotice('Задача закрыта. Теперь главное — правильно отправить результат.');
      return;
    }

    if (id === 'approve') {
      setNotice('Согласования открыты: убеждай коллег и прокачивай коммуникацию.');
      return;
    }

    if (id === 'learn') {
      setNotice('Обучение откроет новые навыки и карьерные развилки.');
      return;
    }

    setNotice('Шалость дня: переставить чужую кружку. Риск небольшой, настроение +1.');
  };

  return (
    <div className="office-page">
      <div className="office-game">
        <header className="office-topbar">
          <div className="office-logo">
            <div className="office-logo-emblem"><OfficeIcon name="briefcase" /></div>
            <div>
              <b>В ОФИСЕ</b>
              <small>КАРЬЕРА — ТОЖЕ ИГРА</small>
            </div>
          </div>

          <div className="office-player-chip">
            <div>
              <strong>Бродяга</strong>
              <span>ур. 1 · Стажёр</span>
            </div>
            <div className="office-xp"><i /></div>
            <em>0 / 100</em>
          </div>

          <Resource icon="energy" value={`${energy} (+1)`} detail="02:45" className="office-energy" />
          <Resource icon="cash" value="1 250" />
          <Resource icon="morale" value="25" />

          <div className="office-top-icons">
            <button type="button" title="Рейтинг"><OfficeIcon name="rating" /></button>
            <button type="button" title="Сообщения" className="office-mail"><OfficeIcon name="mail" /><sup>3</sup></button>
            <button type="button" title="Ночной режим"><OfficeIcon name="moon" /></button>
            <button type="button" title="Настройки"><OfficeIcon name="settings" /></button>
          </div>
        </header>

        <div className="office-body">
          <nav className="office-side-nav" aria-label="Разделы игры">
            {nav.map(([icon, label], index) => (
              <button className={index === 0 ? 'active' : ''} type="button" key={label}>
                <OfficeIcon name={icon} />
                <small>{label}</small>
              </button>
            ))}
            <div className="office-bonus">
              <OfficeIcon name="gift" />
              <span>Бонус</span>
              <small>03:12:45</small>
            </div>
          </nav>

          <aside className="office-profile">
            <div className="office-portrait">
              <img src="/games/office/avatar.svg" alt="Персонаж Бродяга" />
              <button type="button" title="Редактор персонажа"><OfficeIcon name="edit" /></button>
            </div>

            <div className="office-profile-name">
              <strong>Бродяга</strong>
              <span>Стажёр</span>
              <b>Уровень 1</b>
            </div>

            <Stat label="Энергия" value={energy} max={100} icon="energy" tone="yellow" />
            <Stat label="Репутация" value={5} max={100} icon="reputation" tone="green" />
            <Stat label="Стресс" value={20} max={100} icon="stress" tone="red" />

            <div className="office-skill-title">Навыки <span>?</span></div>
            <Skill label="Компетентность" value={1} icon="competence" />
            <Skill label="Коммуникация" value={1} icon="communication" />
            <Skill label="Напор" value={1} icon="drive" />

            <div className="office-quick-links">
              <button type="button">Инвентарь <span>›</span></button>
              <button type="button">Достижения <span>›</span></button>
              <button type="button">Персонаж <span>›</span></button>
            </div>
          </aside>

          <main className="office-center">
            <section className="office-scene">
              <img src="/games/office/office-start.svg" alt="Первое рабочее место стажёра" />
              <button
                className="office-hotspot"
                type="button"
                onClick={() => setSelectedSlot('pc')}
                aria-label="Старый компьютер"
              >
                <span>＋</span> Старый ПК
              </button>
              <div className="office-scene-note">{notice}</div>
            </section>

            <div className="office-actions">
              {actionCards.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => triggerAction(item.id)}
                  className={'office-action office-action-' + item.tone}
                >
                  <OfficeIcon name={item.icon} />
                  <div><b>{item.title}</b><small>{item.text}</small></div>
                </button>
              ))}
            </div>
          </main>

          <aside className="office-right">
            <section className="office-company-card">
              <div className="office-card-head">
                <h3>ООО «Потенциал+»</h3>
                <span>?</span>
              </div>
              <div className="office-company-row">
                <img src="/games/office/company.svg" alt="" />
                <div><b>IT / Разработка</b><small>Небольшая компания с большими планами.</small></div>
              </div>
              <button type="button">О компании →</button>
            </section>

            <section className="office-daily">
              <h3>Задание дня</h3>
              <label><span className="office-checkbox" />Разобрать входящие письма</label>
              <div className="office-progress"><i /></div>
              <div className="office-reward">
                <span>Награда:</span>
                <b><OfficeIcon name="cash" /> +50</b>
                <b><OfficeIcon name="morale" /> +10</b>
              </div>
            </section>

            <section className="office-boss">
              <div className="office-card-head"><h3>Следующий босс</h3></div>
              <div className="office-boss-row">
                <img src="/games/office/boss.svg" alt="Сергей Петрович" />
                <div>
                  <strong>Сергей Петрович</strong>
                  <span>Руководитель отдела</span>
                  <blockquote>«Посмотрим, на что ты способен»</blockquote>
                </div>
              </div>
              <div className="office-boss-requirement"><OfficeIcon name="task" /> Первое поручение · требуется ур. 3</div>
              <button type="button" onClick={() => setNotice('Испытание пока закрыто: сначала достигни 3 уровня.')}>
                К испытанию »
              </button>
            </section>

            <section className="office-news">
              <div className="office-card-head"><h3>Новости офиса</h3><button type="button">Все »</button></div>
              {news.map(([title, time, color]) => (
                <div className="office-news-row" key={title}>
                  <span className={'dot dot-' + color} />
                  <div><b>{title}</b><small>{time}</small></div>
                </div>
              ))}
            </section>
          </aside>
        </div>

        <footer className="office-bottom">
          <section className="office-workspace">
            <div className="office-bottom-title">Моё рабочее место <span>?</span></div>
            <div className="office-slots">
              {workspace.map((item) => (
                <button
                  type="button"
                  key={item.key}
                  onClick={() => setSelectedSlot(item.key)}
                  className={selectedSlot === item.key ? 'selected' : ''}
                >
                  <small>{item.label}</small>
                  <OfficeIcon name={item.icon} />
                  <b>{item.item}</b>
                  <em>{item.level ? 'Обычный · ' + item.level + ' ур.' : 'Пусто'}</em>
                </button>
              ))}
            </div>
          </section>

          <section className="office-promotion">
            <div className="office-bottom-title">Следующее повышение <span>?</span></div>
            <div className="office-promotion-head">
              <OfficeIcon name="briefcase" />
              <strong>Младший специалист</strong>
            </div>
            <Requirement label="Компетентность" value="1 / 5" progress={20} />
            <Requirement label="Репутация" value="5 / 30" progress={17} />
            <Requirement label="Первое поручение" value="0 / 1" progress={0} />
            <div className="office-promotion-actions">
              <button type="button" className="primary" onClick={() => setNotice('Подготовка к повышению: выполняй задачи и прокачивай навыки.')}>Подготовиться</button>
              <button type="button" disabled>Просить повышение</button>
            </div>
            <small className="office-unlocks">Откроется: новая компания · новое кресло · новые задания</small>
          </section>

          <aside className="office-item-details">
            <small>Выбрано</small>
            <OfficeIcon name={slot.icon} />
            <strong>{slot.label}</strong>
            <b>{slot.item}</b>
            <button type="button" onClick={() => setNotice(slot.key === 'accessory' ? 'Слот пуст. Первый аксессуар откроется после поручения.' : 'Улучшения появятся после первого поручения.')}>
              {slot.key === 'accessory' ? 'Найти предмет' : 'Улучшить'}
            </button>
          </aside>
        </footer>
      </div>
    </div>
  );
}

function OfficeIcon({ name }: { name: string }) {
  return (
    <svg className="office-icon" aria-hidden="true">
      <use href={`/games/office/ui-icons.svg#${name}`} />
    </svg>
  );
}

function Resource({ icon, value, detail, className = '' }: { icon: string; value: string; detail?: string; className?: string }) {
  return (
    <div className={`office-resource ${className}`.trim()}>
      <OfficeIcon name={icon} />
      <b>{value}</b>
      {detail ? <small>{detail}</small> : null}
      <button type="button">+</button>
    </div>
  );
}

function Stat({ label, value, max, icon, tone }: { label: string; value: number; max: number; icon: string; tone: string }) {
  return (
    <div className="office-stat">
      <div><span><OfficeIcon name={icon} /> {label}</span><b>{value} / {max}</b><button type="button">+</button></div>
      <div className="office-statbar"><i className={tone} style={{ width: `${Math.min(100, value / max * 100)}%` }} /></div>
    </div>
  );
}

function Skill({ label, value, icon }: { label: string; value: number; icon: string }) {
  return (
    <div className="office-skill">
      <OfficeIcon name={icon} /><b>{label}</b><em>{value}</em><button type="button">+</button>
    </div>
  );
}

function Requirement({ label, value, progress }: { label: string; value: string; progress: number }) {
  return (
    <div className="office-requirement">
      <div><span>{label}</span><b>{value}</b></div>
      <div><i style={{ width: `${progress}%` }} /></div>
    </div>
  );
}
