'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  formatMoney,
  getCompanyStars,
  initialOfficeSnapshot,
  initialWorkspaceItems,
  isOfficePersistedState,
  nextPromotion,
  officeActions,
  officeNavigation,
  officeNews,
  OFFICE_ACTION_COOLDOWN_MS,
  OFFICE_ENERGY_REGEN_SECONDS,
  OFFICE_STORAGE_KEY,
  OFFICE_STORAGE_VERSION,
  upgradeWorkspaceItem,
  type OfficeWorkspaceItem,
} from './office-data';
import {
  bossEvent,
  careerNodes,
  firstDayEvents,
  getNextFirstDayEvent,
  getSkillLabel,
  initialOfficeStoryState,
  officePranks,
  type OfficeOutcome,
  type OfficePrank,
  type OfficeStoryChoice,
  type OfficeStoryEvent,
  type OfficeStoryState,
} from './office-v5-content';

type FeedbackTone = 'money' | 'xp' | 'social' | 'warning';

type ActionFeedback = {
  id: number;
  text: string;
  tone: FeedbackTone;
};

type OfficeView = 'home' | 'career';
type OfficeModal =
  | { type: 'event'; event: OfficeStoryEvent }
  | { type: 'boss'; event: OfficeStoryEvent }
  | { type: 'pranks' }
  | { type: 'promotion-help' }
  | null;

export function OfficeGame() {
  const [snapshot, setSnapshot] = useState(initialOfficeSnapshot);
  const [workspace, setWorkspace] = useState<OfficeWorkspaceItem[]>(initialWorkspaceItems);
  const [selectedSlot, setSelectedSlot] = useState<OfficeWorkspaceItem['key']>('pc');
  const [notice, setNotice] = useState('Первый рабочий день. Начни с простого поручения.');
  const [energyCountdown, setEnergyCountdown] = useState(OFFICE_ENERGY_REGEN_SECONDS);
  const [energyNextAt, setEnergyNextAt] = useState<number | null>(null);
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<ActionFeedback | null>(null);
  const [hydrated, setHydrated] = useState(false);

  const feedbackTimerRef = useRef<number | null>(null);
  const cooldownTimerRef = useRef<number | null>(null);
  const feedbackIdRef = useRef(0);

  const selectedItem = useMemo(
    () => workspace.find((item) => item.key === selectedSlot) ?? workspace[0],
    [selectedSlot, workspace],
  );

  const firstAssignmentDone =
    snapshot.firstAssignment.progress >= snapshot.firstAssignment.target;
  const promotionCompleted = snapshot.role === nextPromotion.role;
  const promotionReady =
    !promotionCompleted &&
    snapshot.skills.competence >= nextPromotion.competence &&
    snapshot.reputation >= nextPromotion.reputation &&
    firstAssignmentDone;

  const companyStars = getCompanyStars(snapshot.company.level, snapshot.company.maxLevel);
  const dailyDone = snapshot.daily.progress >= snapshot.daily.target;

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(OFFICE_STORAGE_KEY);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (isOfficePersistedState(parsed)) {
          setSnapshot({
            ...initialOfficeSnapshot,
            ...parsed.snapshot,
            skills: { ...initialOfficeSnapshot.skills, ...parsed.snapshot.skills },
            daily: { ...initialOfficeSnapshot.daily, ...parsed.snapshot.daily },
            firstAssignment: {
              ...initialOfficeSnapshot.firstAssignment,
              ...parsed.snapshot.firstAssignment,
            },
            company: { ...initialOfficeSnapshot.company, ...parsed.snapshot.company },
          });
          if (parsed.workspace.length === initialWorkspaceItems.length) {
            setWorkspace(parsed.workspace);
          }
          setEnergyNextAt(parsed.energyNextAt);
        }
      }
    } catch {
      window.localStorage.removeItem(OFFICE_STORAGE_KEY);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(
        OFFICE_STORAGE_KEY,
        JSON.stringify({
          version: OFFICE_STORAGE_VERSION,
          snapshot,
          workspace,
          energyNextAt,
        }),
      );
    } catch {
      // Prototype remains playable even when storage is unavailable.
    }
  }, [energyNextAt, hydrated, snapshot, workspace]);

  useEffect(() => {
    if (!hydrated) return;

    if (snapshot.energy >= snapshot.maxEnergy) {
      setEnergyCountdown(OFFICE_ENERGY_REGEN_SECONDS);
      if (energyNextAt !== null) setEnergyNextAt(null);
      return;
    }

    if (energyNextAt === null) {
      const target = Date.now() + OFFICE_ENERGY_REGEN_SECONDS * 1000;
      setEnergyNextAt(target);
      setEnergyCountdown(OFFICE_ENERGY_REGEN_SECONDS);
      return;
    }

    const tick = () => {
      const now = Date.now();
      const remainingMs = energyNextAt - now;

      if (remainingMs > 0) {
        setEnergyCountdown(Math.max(1, Math.ceil(remainingMs / 1000)));
        return;
      }

      const intervalMs = OFFICE_ENERGY_REGEN_SECONDS * 1000;
      const elapsedIntervals = Math.floor(Math.abs(remainingMs) / intervalMs) + 1;
      const missingEnergy = snapshot.maxEnergy - snapshot.energy;
      const restored = Math.min(missingEnergy, elapsedIntervals);

      if (restored > 0) {
        setSnapshot((state) => ({
          ...state,
          energy: Math.min(state.maxEnergy, state.energy + restored),
        }));
      }

      if (restored >= missingEnergy) {
        setEnergyNextAt(null);
        setEnergyCountdown(OFFICE_ENERGY_REGEN_SECONDS);
      } else {
        const nextTarget = energyNextAt + elapsedIntervals * intervalMs;
        setEnergyNextAt(nextTarget);
        setEnergyCountdown(Math.max(1, Math.ceil((nextTarget - now) / 1000)));
      }
    };

    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, [energyNextAt, hydrated, snapshot.energy, snapshot.maxEnergy]);

  useEffect(
    () => () => {
      if (feedbackTimerRef.current !== null) window.clearTimeout(feedbackTimerRef.current);
      if (cooldownTimerRef.current !== null) window.clearTimeout(cooldownTimerRef.current);
    },
    [],
  );

  const showFeedback = (text: string, tone: FeedbackTone) => {
    feedbackIdRef.current += 1;
    setFeedback({ id: feedbackIdRef.current, text, tone });

    if (feedbackTimerRef.current !== null) window.clearTimeout(feedbackTimerRef.current);
    feedbackTimerRef.current = window.setTimeout(() => setFeedback(null), 1050);
  };

  const beginCooldown = (id: string) => {
    setActiveAction(id);
    if (cooldownTimerRef.current !== null) window.clearTimeout(cooldownTimerRef.current);
    cooldownTimerRef.current = window.setTimeout(
      () => setActiveAction(null),
      OFFICE_ACTION_COOLDOWN_MS,
    );
  };

  const gainXp = (amount: number) => {
    setSnapshot((current) => {
      let nextXp = current.xp + amount;
      let nextLevel = current.level;
      let nextThreshold = current.xpToNext;
      let nextMaxEnergy = current.maxEnergy;

      while (nextXp >= nextThreshold) {
        nextXp -= nextThreshold;
        nextLevel += 1;
        nextThreshold = Math.round(nextThreshold * 1.2);
        nextMaxEnergy = Math.min(120, nextMaxEnergy + 2);
      }

      return {
        ...current,
        xp: nextXp,
        level: nextLevel,
        xpToNext: nextThreshold,
        maxEnergy: nextMaxEnergy,
      };
    });
  };

  const triggerAction = (id: (typeof officeActions)[number]['id']) => {
    if (activeAction) return;

    if (id === 'work') {
      if (snapshot.energy <= 0) {
        setNotice('Энергия закончилась. Следующая единица восстановится автоматически.');
        showFeedback('Нет энергии', 'warning');
        return;
      }

      beginCooldown(id);
      setSnapshot((current) => {
        const nextProgress = Math.min(current.daily.target, current.daily.progress + 1);
        const completesNow =
          !current.daily.claimed &&
          current.daily.progress < current.daily.target &&
          nextProgress >= current.daily.target;

        return {
          ...current,
          energy: Math.max(0, current.energy - 1),
          money: current.money + 75 + (completesNow ? current.daily.moneyReward : 0),
          motivation: Math.min(
            100,
            current.motivation + (completesNow ? current.daily.motivationReward : 0),
          ),
          daily: {
            ...current.daily,
            progress: nextProgress,
            claimed: current.daily.claimed || completesNow,
          },
        };
      });
      gainXp(8);

      const closesDaily = !snapshot.daily.claimed && snapshot.daily.progress + 1 >= snapshot.daily.target;
      showFeedback(closesDaily ? '+125 ₽ · +8 XP · ежедневка' : '+75 ₽ · +8 XP', 'money');
      setNotice(
        closesDaily
          ? 'Ежедневка закрыта. Награда выдана один раз — дальше работа приносит обычную оплату.'
          : 'Задача закрыта. Результат отправлен, никто даже не попросил переделать.',
      );
      return;
    }

    if (id === 'approve') {
      if (snapshot.energy <= 0) {
        setNotice('На согласования тоже нужны силы. Подожди восстановления энергии.');
        showFeedback('Нет энергии', 'warning');
        return;
      }

      beginCooldown(id);
      setSnapshot((current) => ({
        ...current,
        energy: Math.max(0, current.energy - 1),
        reputation: Math.min(100, current.reputation + 2),
        motivation: Math.min(100, current.motivation + 1),
      }));
      gainXp(4);
      showFeedback('Репутация +2 · XP +4', 'social');
      setNotice('Согласование прошло без трёх созвонов. Это уже карьерное достижение.');
      return;
    }

    if (id === 'learn') {
      if (snapshot.energy < 2) {
        setNotice('Для обучения нужно минимум 2 энергии.');
        showFeedback('Нужно 2 энергии', 'warning');
        return;
      }

      beginCooldown(id);
      setSnapshot((current) => ({
        ...current,
        energy: Math.max(0, current.energy - 2),
        skills: {
          ...current.skills,
          competence: current.skills.competence + 1,
        },
      }));
      gainXp(6);
      showFeedback('Компетентность +1 · XP +6', 'xp');
      setNotice('Компетентность выросла. Теперь можно увереннее говорить «я посмотрю».');
      return;
    }

    beginCooldown(id);
    setSnapshot((current) => ({
      ...current,
      motivation: Math.min(100, current.motivation + 3),
      stress: Math.max(0, current.stress - 2),
      reputation: Math.max(0, current.reputation - (current.reputation > 12 ? 1 : 0)),
    }));
    showFeedback('Мотивация +3 · Стресс −2', 'social');
    setNotice('Шалость удалась. Никто ничего не видел, а рабочий день стал короче.');
  };

  const handleBoss = () => {
    if (snapshot.level < 3) {
      setNotice('Сергей Петрович пока не зовёт: испытание откроется на 3 уровне.');
      showFeedback('Нужен 3 уровень', 'warning');
      return;
    }

    if (firstAssignmentDone) {
      setNotice('Первое поручение уже выполнено. Теперь готовь требования к повышению.');
      return;
    }

    setSnapshot((current) => ({
      ...current,
      money: current.money + 300,
      reputation: Math.min(100, current.reputation + 5),
      firstAssignment: {
        ...current.firstAssignment,
        progress: current.firstAssignment.target,
      },
    }));
    gainXp(25);
    showFeedback('+300 ₽ · Репутация +5 · XP +25', 'money');
    setNotice('Первое поручение принято. Сергей Петрович сказал «нормально» — это почти похвала.');
  };

  const upgradeSelectedItem = () => {
    const item = selectedItem;
    if (!item) return;

    if (snapshot.money < item.upgradePrice) {
      setNotice(`Не хватает денег. Нужно ещё ${formatMoney(item.upgradePrice - snapshot.money)} ₽.`);
      showFeedback('Не хватает денег', 'warning');
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
    showFeedback(`−${formatMoney(item.upgradePrice)} ₽ · предмет улучшен`, 'xp');
    setNotice(
      item.level === 0
        ? 'Первый аксессуар появился на столе. Рабочее место начинает становиться твоим.'
        : `${item.item}: улучшение куплено. Рабочее место стало немного менее печальным.`,
    );
  };

  const requestPromotion = () => {
    if (promotionCompleted) {
      setNotice('Это повышение уже получено. Следующая карьерная ступень появится позже.');
      return;
    }

    if (!promotionReady) {
      setNotice('Повышение пока рано просить: закрой все требования.');
      showFeedback('Не все требования закрыты', 'warning');
      return;
    }

    setSnapshot((current) => ({
      ...current,
      role: nextPromotion.role,
      salary: nextPromotion.salary,
      reputation: Math.min(100, current.reputation + 5),
      motivation: Math.min(100, current.motivation + 10),
    }));
    showFeedback('Повышение! Зарплата 50 000 ₽', 'money');
    setNotice('Повышение получено. В резюме появилась новая строчка, а зарплата наконец выросла.');
  };

  const resetPrototype = () => {
    setSnapshot(initialOfficeSnapshot);
    setWorkspace(initialWorkspaceItems);
    setSelectedSlot('pc');
    setEnergyCountdown(OFFICE_ENERGY_REGEN_SECONDS);
    setEnergyNextAt(null);
    setNotice('Прототип сброшен. Снова первый рабочий день.');
    window.localStorage.removeItem(OFFICE_STORAGE_KEY);
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

          <Resource
            icon="energy"
            value={`${snapshot.energy} (+1)`}
            detail={
              snapshot.energy >= snapshot.maxEnergy
                ? 'полная'
                : formatCountdown(energyCountdown)
            }
            className="office-energy"
          />
          <Resource icon="cash" value={formatMoney(snapshot.money)} className="office-money" />
          <Resource icon="morale" value={String(snapshot.motivation)} className="office-motivation" />

          <div className="office-top-icons">
            <button type="button" title="Рейтинг"><OfficeIcon name="rating" /></button>
            <button type="button" title="Сообщения" className="office-mail"><OfficeIcon name="mail" /><sup>3</sup></button>
            <button type="button" title="Ночной режим"><OfficeIcon name="moon" /></button>
            <button
              type="button"
              title="Сбросить прототип"
              onClick={() => {
                if (window.confirm('Сбросить локальный прогресс «В Офисе»?')) resetPrototype();
              }}
            >
              <OfficeIcon name="settings" />
            </button>
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
              <div className="office-scene-note">{notice}</div>
            </section>

            <div className="office-actions">
              {officeActions.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => triggerAction(item.id)}
                  disabled={activeAction !== null}
                  aria-busy={activeAction === item.id}
                  className={`office-action office-action-${item.tone} ${activeAction === item.id ? 'is-active' : ''}`}
                >
                  <OfficeIcon name={item.icon} />
                  <div><b>{item.title}</b><small>{item.text}</small></div>
                </button>
              ))}
              {feedback ? (
                <div key={feedback.id} className={`office-action-feedback office-feedback-${feedback.tone}`}>
                  {feedback.text}
                </div>
              ) : null}
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

            <section className={`office-daily ${dailyDone ? 'is-complete' : ''}`}>
              <div className="office-card-head">
                <h3>Задание дня</h3>
                <b className="office-daily-count">{dailyDone ? 'Выполнено' : `${snapshot.daily.progress}/${snapshot.daily.target}`}</b>
              </div>
              <label>
                <span className={`office-checkbox ${dailyDone ? 'done' : ''}`} />
                {snapshot.daily.title}
              </label>
              <div className="office-progress">
                <i style={{ width: `${Math.min(100, snapshot.daily.progress / snapshot.daily.target * 100)}%` }} />
              </div>
              <div className="office-reward">
                <span>{snapshot.daily.claimed ? 'Получено:' : 'Награда:'}</span>
                <b><OfficeIcon name="cash" /> +{snapshot.daily.moneyReward}</b>
                <b><OfficeIcon name="morale" /> +{snapshot.daily.motivationReward}</b>
              </div>
            </section>

            <section className={`office-boss ${firstAssignmentDone ? 'is-complete' : ''}`}>
              <div className="office-card-head">
                <h3>Следующий босс</h3>
                {firstAssignmentDone ? <b className="office-boss-done">Пройден</b> : null}
              </div>
              <div className="office-boss-row">
                <img src="/games/office/boss.svg" alt="Сергей Петрович" />
                <div>
                  <strong>Сергей Петрович</strong>
                  <span>Руководитель отдела</span>
                  <blockquote>«Посмотрим, на что ты способен»</blockquote>
                </div>
              </div>
              <div className="office-boss-requirement">
                <OfficeIcon name="task" />
                Первое поручение · {firstAssignmentDone ? 'выполнено' : 'требуется ур. 3'}
              </div>
              <button type="button" onClick={handleBoss}>
                {firstAssignmentDone ? 'Поручение выполнено' : snapshot.level >= 3 ? 'Начать поручение »' : 'К испытанию »'}
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
                <strong>{promotionCompleted ? 'Повышение получено' : nextPromotion.role}</strong>
                <small>{promotionCompleted ? `${formatMoney(snapshot.salary)} ₽` : `${formatMoney(snapshot.salary)} ₽ → ${formatMoney(nextPromotion.salary)} ₽`}</small>
              </div>
            </div>
            <Requirement label="Компетентность" value={`${snapshot.skills.competence} / ${nextPromotion.competence}`} progress={snapshot.skills.competence / nextPromotion.competence * 100} />
            <Requirement label="Репутация" value={`${snapshot.reputation} / ${nextPromotion.reputation}`} progress={snapshot.reputation / nextPromotion.reputation * 100} />
            <Requirement label="Первое поручение" value={firstAssignmentDone ? '1 / 1' : '0 / 1'} progress={firstAssignmentDone ? 100 : 0} />
            <div className="office-promotion-actions">
              <button type="button" className="primary" onClick={() => setNotice('Подготовка: работай, учись, пройди поручение и подними репутацию.')}>Подготовиться</button>
              <button type="button" disabled={!promotionReady} onClick={requestPromotion}>
                {promotionCompleted ? 'Получено' : 'Просить повышение'}
              </button>
            </div>
            <small className="office-unlocks">Откроется: новая компания · новое кресло · новые задания</small>
          </section>

          <aside className="office-item-details">
            <OfficeIcon name={selectedItem.icon} />
            <div className="office-item-copy">
              <small>Выбрано · {selectedItem.rarity}</small>
              <strong>{selectedItem.item}</strong>
              <p>{selectedItem.description}</p>
            </div>
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

function formatCountdown(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(rest).padStart(2, '0')}`;
}
