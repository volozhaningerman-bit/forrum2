'use client';

import { useMemo, useState } from 'react';
import {
  formatMoney,
  getCompanyStars,
  initialOfficeSnapshot,
  initialWorkspaceItems,
  nextPromotion,
  officeActions,
  officeNavigation,
  officeNews,
  upgradeWorkspaceItem,
  type OfficeWorkspaceItem,
} from './office-data';

export function OfficeGame() {
  const [snapshot, setSnapshot] = useState(initialOfficeSnapshot);
  const [workspace, setWorkspace] = useState<OfficeWorkspaceItem[]>(initialWorkspaceItems);
  const [selectedSlot, setSelectedSlot] = useState<OfficeWorkspaceItem['key']>('pc');
  const [notice, setNotice] = useState('Первый рабочий день. Начни с простого поручения.');

  const selectedItem = useMemo(
    () => workspace.find((item) => item.key === selectedSlot) ?? workspace[0],
    [selectedSlot, workspace],
  );

  const firstAssignmentDone = snapshot.daily.progress >= 1;
  const promotionReady =
    snapshot.skills.competence >= nextPromotion.competence &&
    snapshot.reputation >= nextPromotion.reputation &&
    firstAssignmentDone;

  const companyStars = getCompanyStars(snapshot.company.level, snapshot.company.maxLevel);

  const gainXp = (amount: number) => {
    setSnapshot((current) => {
      const totalXp = current.xp + amount;
      if (totalXp < current.xpToNext) {
        return { ...current, xp: totalXp };
      }

      return {
        ...current,
        level: current.level + 1,
        xp: totalXp - current.xpToNext,
        xpToNext: Math.round(current.xpToNext * 1.2),
        maxEnergy: Math.min(120, current.maxEnergy + 2),
      };
    });
  };

  const triggerAction = (id: (typeof officeActions)[number]['id']) => {
    if (id === 'work') {
      if (snapshot.energy <= 0) {
        setNotice('Энергия закончилась. Даже стажёрам иногда нужен кофе.');
        return;
      }

      const finishingDaily =
        snapshot.daily.progress < snapshot.daily.target &&
        snapshot.daily.progress + 1 >= snapshot.daily.target;

      setSnapshot((current) => ({
        ...current,
        energy: Math.max(0, current.energy - 1),
        money: current.money + 75 + (finishingDaily ? current.daily.moneyReward : 0),
        motivation: Math.min(
          100,
          current.motivation + (finishingDaily ? current.daily.motivationReward : 0),
        ),
        daily: {
          ...current.daily,
          progress: Math.min(current.daily.target, current.daily.progress + 1),
        },
      }));
      gainXp(8);
      setNotice(
        finishingDaily
          ? 'Ежедневка закрыта. Награда начислена — можно сделать вид, что день прошёл продуктивно.'
          : 'Задача закрыта: +75 ₽ и +8 опыта. Осталось правильно отправить результат.',
      );
      return;
    }

    if (id === 'approve') {
      if (snapshot.energy <= 0) {
        setNotice('На согласования тоже нужны силы. Энергия закончилась.');
        return;
      }
      setSnapshot((current) => ({
        ...current,
        energy: Math.max(0, current.energy - 1),
        reputation: Math.min(100, current.reputation + 2),
        motivation: Math.min(100, current.motivation + 1),
      }));
      gainXp(4);
      setNotice('Согласование прошло без трёх созвонов. Репутация +2.');
      return;
    }

    if (id === 'learn') {
      if (snapshot.energy < 2) {
        setNotice('Для обучения нужно минимум 2 энергии.');
        return;
      }
      setSnapshot((current) => ({
        ...current,
        energy: Math.max(0, current.energy - 2),
        skills: {
          ...current.skills,
          competence: current.skills.competence + 1,
        },
      }));
      gainXp(6);
      setNotice('Компетентность +1. Теперь можно увереннее говорить «я посмотрю».');
      return;
    }

    setSnapshot((current) => ({
      ...current,
      motivation: Math.min(100, current.motivation + 3),
      stress: Math.max(0, current.stress - 2),
      reputation: Math.max(0, current.reputation - (current.reputation > 12 ? 1 : 0)),
    }));
    setNotice('Шалость удалась: настроение +3, стресс −2. Никто ничего не видел.');
  };

  const upgradeSelectedItem = () => {
    const item = selectedItem;
    if (!item) {
      return;
    }

    if (snapshot.money < item.upgradePrice) {
      setNotice(`Не хватает денег. Нужно ещё ${formatMoney(item.upgradePrice - snapshot.money)} ₽.`);
      return;
    }

    setSnapshot((current) => ({
      ...current,
      money: current.money - item.upgradePrice,
    }));
    setWorkspace((items) =>
      items.map((candidate) =>
        candidate.key === item.key ? upgradeWorkspaceItem(candidate) : candidate,
      ),
    );
    setNotice(
      item.level === 0
        ? 'Первый аксессуар появился на столе. Рабочее место начинает становиться твоим.'
        : `${item.item}: улучшение куплено. Рабочее место стало немного менее печальным.`,
    );
  };

  const requestPromotion = () => {
    if (!promotionReady) {
      setNotice('Повышение пока рано просить: закрой требования справа.');
      return;
    }

    setSnapshot((current) => ({
      ...current,
      role: nextPromotion.role,
      salary: nextPromotion.salary,
      reputation: Math.min(100, current.reputation + 5),
      motivation: Math.min(100, current.motivation + 10),
    }));
    setNotice('Повышение получено. В резюме появилась новая строчка, а зарплата наконец выросла.');
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
              <strong>{snapshot.playerName}</strong>
              <span>ур. {snapshot.level} · {snapshot.role}</span>
            </div>
            <div className="office-xp">
              <i style={{ width: `${Math.min(100, snapshot.xp / snapshot.xpToNext * 100)}%` }} />
            </div>
            <em>{snapshot.xp} / {snapshot.xpToNext}</em>
          </div>

          <Resource icon="energy" value={`${snapshot.energy} (+1)`} detail="02:45" className="office-energy" />
          <Resource icon="cash" value={formatMoney(snapshot.money)} className="office-money" />
          <Resource icon="morale" value={String(snapshot.motivation)} className="office-motivation" />

          <div className="office-top-icons">
            <button type="button" title="Рейтинг"><OfficeIcon name="rating" /></button>
            <button type="button" title="Сообщения" className="office-mail"><OfficeIcon name="mail" /><sup>3</sup></button>
            <button type="button" title="Ночной режим"><OfficeIcon name="moon" /></button>
            <button type="button" title="Настройки"><OfficeIcon name="settings" /></button>
          </div>
        </header>

        <div className="office-body">
          <nav className="office-side-nav" aria-label="Разделы игры">
            {officeNavigation.map((item, index) => (
              <button className={index === 0 ? 'active' : ''} type="button" key={item.label}>
                <OfficeIcon name={item.icon} />
                <small>{item.label}</small>
                <span className="office-nav-tooltip">
                  <b>{item.label}</b>
                  <em>{item.hint}</em>
                </span>
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
              <strong>{snapshot.playerName}</strong>
              <span>{snapshot.role}</span>
              <b>Уровень {snapshot.level}</b>
            </div>

            <Stat label="Энергия" value={snapshot.energy} max={snapshot.maxEnergy} icon="energy" tone="yellow" />
            <Stat label="Репутация" value={snapshot.reputation} max={100} icon="reputation" tone="green" />
            <Stat label="Стресс" value={snapshot.stress} max={100} icon="stress" tone="red" />

            <div className="office-skill-title">Навыки <span>?</span></div>
            <Skill label="Компетентность" value={snapshot.skills.competence} icon="competence" />
            <Skill label="Коммуникация" value={snapshot.skills.communication} icon="communication" />
            <Skill label="Напор" value={snapshot.skills.drive} icon="drive" />

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
                className="office-hotspot office-hotspot-pc"
                type="button"
                onClick={() => setSelectedSlot('pc')}
                aria-label="Старый компьютер"
              >
                <span>＋</span> Старый ПК
              </button>
              <button
                className="office-hotspot office-hotspot-chair"
                type="button"
                onClick={() => setSelectedSlot('chair')}
                aria-label="Старый офисный стул"
              >
                <span>＋</span> Стул
              </button>
              <div className="office-scene-rank">
                <small>{snapshot.company.name}</small>
                <b>{snapshot.role}</b>
              </div>
              <div className="office-scene-note">{notice}</div>
            </section>

            <div className="office-actions">
              {officeActions.map((item) => (
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
                <h3>{snapshot.company.name}</h3>
                <span>?</span>
              </div>
              <div className="office-company-row">
                <img src="/games/office/company.svg" alt="" />
                <div>
                  <b>{snapshot.company.industry}</b>
                  <small>{snapshot.company.description}</small>
                </div>
              </div>
              <div className="office-company-meta">
                <span>
                  <small>Компания</small>
                  <b className="office-stars" aria-label={`Уровень компании ${snapshot.company.level} из ${snapshot.company.maxLevel}`}>
                    {companyStars.map((filled, index) => <i key={index} className={filled ? 'filled' : ''}>★</i>)}
                  </b>
                </span>
                <span>
                  <small>Зарплата</small>
                  <b>{formatMoney(snapshot.salary)} ₽</b>
                </span>
              </div>
              <button type="button">О компании →</button>
            </section>

            <section className="office-daily">
              <div className="office-card-head">
                <h3>Задание дня</h3>
                <b className="office-daily-count">{snapshot.daily.progress}/{snapshot.daily.target}</b>
              </div>
              <label>
                <span className={`office-checkbox ${snapshot.daily.progress >= snapshot.daily.target ? 'done' : ''}`} />
                {snapshot.daily.title}
              </label>
              <div className="office-progress">
                <i style={{ width: `${Math.min(100, snapshot.daily.progress / snapshot.daily.target * 100)}%` }} />
              </div>
              <div className="office-reward">
                <span>Награда:</span>
                <b><OfficeIcon name="cash" /> +{snapshot.daily.moneyReward}</b>
                <b><OfficeIcon name="morale" /> +{snapshot.daily.motivationReward}</b>
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
              <button type="button" onClick={() => setNotice('Испытание откроется на 3 уровне. Пока Сергей Петрович просто наблюдает.')}>
                К испытанию »
              </button>
            </section>

            <section className="office-news">
              <div className="office-card-head"><h3>Новости офиса</h3><button type="button">Все »</button></div>
              {officeNews.map(([title, time, color]) => (
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
                  <em>{item.level ? `${item.rarity} · ${item.level} ур.` : 'Пусто'}</em>
                </button>
              ))}
            </div>
          </section>

          <section className="office-promotion">
            <div className="office-bottom-title">Следующее повышение <span>?</span></div>
            <div className="office-promotion-head">
              <OfficeIcon name="briefcase" />
              <div>
                <strong>{nextPromotion.role}</strong>
                <small>{formatMoney(snapshot.salary)} ₽ → {formatMoney(nextPromotion.salary)} ₽</small>
              </div>
            </div>
            <Requirement label="Компетентность" value={`${snapshot.skills.competence} / ${nextPromotion.competence}`} progress={snapshot.skills.competence / nextPromotion.competence * 100} />
            <Requirement label="Репутация" value={`${snapshot.reputation} / ${nextPromotion.reputation}`} progress={snapshot.reputation / nextPromotion.reputation * 100} />
            <Requirement label="Первое поручение" value={firstAssignmentDone ? '1 / 1' : '0 / 1'} progress={firstAssignmentDone ? 100 : 0} />
            <div className="office-promotion-actions">
              <button type="button" className="primary" onClick={() => setNotice('Подготовка: работай, учись и подними репутацию до требований.')}>Подготовиться</button>
              <button type="button" disabled={!promotionReady} onClick={requestPromotion}>Просить повышение</button>
            </div>
            <small className="office-unlocks">Откроется: новая компания · новое кресло · новые задания</small>
          </section>

          <aside className="office-item-details">
            <small>Выбрано</small>
            <OfficeIcon name={selectedItem.icon} />
            <strong>{selectedItem.item}</strong>
            <em>{selectedItem.rarity} · {selectedItem.level ? `${selectedItem.level} ур.` : 'пусто'}</em>
            <p>{selectedItem.description}</p>
            <div className="office-item-effect">
              <span>{selectedItem.effectLabel}</span>
              <b>+{selectedItem.effectValue} → +{selectedItem.nextEffectValue}</b>
            </div>
            <div className="office-item-price">
              <span>Улучшение</span>
              <b>{formatMoney(selectedItem.upgradePrice)} ₽</b>
            </div>
            <button type="button" onClick={upgradeSelectedItem}>
              {selectedItem.level === 0 ? 'Найти предмет' : 'Улучшить'}
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
      <div><i style={{ width: `${Math.min(100, progress)}%` }} /></div>
    </div>
  );
}
