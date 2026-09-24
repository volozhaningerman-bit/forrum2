'use client';

import { useEffect, useRef, useState } from 'react';
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
   type OfficeSnapshot,
  type OfficeWorkspaceItem,
} from './office-data';
import {
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
import {
  EquipmentDock,
  EquipmentDrawer,
  V6BossBattle,
  V6CareerView,
  V6CharacterView,
  V6CompanyView,
} from './office-v6-ui';
import {
  getV6BuildBonuses,
  initialV6State,
  v6Bosses,
  v6Companies,
  v6ItemLockReason,
  type V6ArchetypeId,
  type V6CareerBranch,
  type V6Gender,
  type V6Item,
  type V6ItemCategory,
  type V6State,
} from './office-v6-system';

type FeedbackTone = 'money' | 'xp' | 'social' | 'warning';

type ActionFeedback = {
  id: number;
  text: string;
  tone: FeedbackTone;
};

type OfficeView = 'home' | 'career' | 'company' | 'character';
type OfficeModal =
  | { type: 'event'; event: OfficeStoryEvent }
  | { type: 'boss'; event: OfficeStoryEvent }
  | { type: 'pranks' }
  | { type: 'promotion-help' }
  | null;

export function OfficeGame() {
  const [snapshot, setSnapshot] = useState(initialOfficeSnapshot);
  const [workspace, setWorkspace] = useState<OfficeWorkspaceItem[]>(initialWorkspaceItems);
  const [v6, setV6] = useState<V6State>(initialV6State);
  const [drawerCategory, setDrawerCategory] = useState<V6ItemCategory | null>(null);
  const [bossBattleOpen, setBossBattleOpen] = useState(false);
  const [notice, setNotice] = useState('Первый рабочий день. Начни с простого поручения.');
  const [energyCountdown, setEnergyCountdown] = useState(OFFICE_ENERGY_REGEN_SECONDS);
  const [energyNextAt, setEnergyNextAt] = useState<number | null>(null);
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<ActionFeedback | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [story, setStory] = useState<OfficeStoryState>(initialOfficeStoryState);
  const [activeView, setActiveView] = useState<OfficeView>('home');
  const [modal, setModal] = useState<OfficeModal>(null);

  const feedbackTimerRef = useRef<number | null>(null);
  const cooldownTimerRef = useRef<number | null>(null);
  const feedbackIdRef = useRef(0);

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
  const firstDayDone = story.completedEvents.length >= 3;
  const bossUnlocked = snapshot.level >= 3 || firstDayDone;
  const buildBonuses = getV6BuildBonuses(v6);
  const effectiveMaxEnergy = snapshot.maxEnergy + (buildBonuses.energyMax ?? 0);
  const effectiveEnergyRegenSeconds = Math.max(
    60,
    OFFICE_ENERGY_REGEN_SECONDS - (buildBonuses.energyRecovery ?? 0) * 10,
  );

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
          const persistedStory = (parsed as typeof parsed & { story?: OfficeStoryState }).story;
          const persistedV6 = (parsed as typeof parsed & { v6?: V6State }).v6;
          if (persistedV6) {
            setV6({
              ...initialV6State,
              ...persistedV6,
              ownedItemIds: Array.isArray(persistedV6.ownedItemIds)
                ? persistedV6.ownedItemIds
                : initialV6State.ownedItemIds,
              equipped: { ...initialV6State.equipped, ...persistedV6.equipped },
            });
          }
          if (persistedStory) {
            setStory({
              ...initialOfficeStoryState,
              ...persistedStory,
              completedEvents: Array.isArray(persistedStory.completedEvents)
                ? persistedStory.completedEvents
                : [],
              completedPranks: Array.isArray(persistedStory.completedPranks)
                ? persistedStory.completedPranks
                : [],
            });
          }
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
          story,
          v6,
        }),
      );
    } catch {
      // Prototype remains playable even when storage is unavailable.
    }
  }, [energyNextAt, hydrated, snapshot, story, v6, workspace]);

  useEffect(() => {
    if (!hydrated) return;

    if (snapshot.energy >= effectiveMaxEnergy) {
      setEnergyCountdown(effectiveEnergyRegenSeconds);
      if (energyNextAt !== null) setEnergyNextAt(null);
      return;
    }

    if (energyNextAt === null) {
      const target = Date.now() + effectiveEnergyRegenSeconds * 1000;
      setEnergyNextAt(target);
      setEnergyCountdown(effectiveEnergyRegenSeconds);
      return;
    }

    const tick = () => {
      const now = Date.now();
      const remainingMs = energyNextAt - now;

      if (remainingMs > 0) {
        setEnergyCountdown(Math.max(1, Math.ceil(remainingMs / 1000)));
        return;
      }

      const intervalMs = effectiveEnergyRegenSeconds * 1000;
      const elapsedIntervals = Math.floor(Math.abs(remainingMs) / intervalMs) + 1;
      const missingEnergy = effectiveMaxEnergy - snapshot.energy;
      const restored = Math.min(missingEnergy, elapsedIntervals);

      if (restored > 0) {
        setSnapshot((state) => ({
          ...state,
          energy: Math.min(effectiveMaxEnergy, state.energy + restored),
        }));
      }

      if (restored >= missingEnergy) {
        setEnergyNextAt(null);
        setEnergyCountdown(effectiveEnergyRegenSeconds);
      } else {
        const nextTarget = energyNextAt + elapsedIntervals * intervalMs;
        setEnergyNextAt(nextTarget);
        setEnergyCountdown(Math.max(1, Math.ceil((nextTarget - now) / 1000)));
      }
    };

    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, [effectiveEnergyRegenSeconds, effectiveMaxEnergy, energyNextAt, hydrated, snapshot.energy]);

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

  const applyOutcome = (outcome: OfficeOutcome) => {
    const rawStress = outcome.stress ?? 0;
    const adjustedStress =
      rawStress > 0
        ? Math.max(0, rawStress - Math.floor((buildBonuses.stressResist ?? 0) / 2))
        : rawStress;

    setSnapshot((current) => ({
      ...current,
      energy: Math.max(0, Math.min(effectiveMaxEnergy, current.energy + (outcome.energy ?? 0))),
      money: Math.max(0, current.money + (outcome.money ?? 0)),
      reputation: Math.max(0, Math.min(100, current.reputation + (outcome.reputation ?? 0))),
      motivation: Math.max(0, Math.min(100, current.motivation + (outcome.motivation ?? 0))),
      stress: Math.max(0, Math.min(100, current.stress + adjustedStress)),
      skills: {
        competence: current.skills.competence + (outcome.skills?.competence ?? 0),
        communication: current.skills.communication + (outcome.skills?.communication ?? 0),
        drive: current.skills.drive + (outcome.skills?.drive ?? 0),
      },
    }));
    if (outcome.xp) gainXp(outcome.xp);
  };

  const choiceBlockedReason = (choice: OfficeStoryChoice) => {
    const energyCost = Math.max(0, -(choice.outcome.energy ?? 0));
    if (snapshot.energy < energyCost) return `Нужно энергии: ${energyCost}`;
    if (choice.requirement && snapshot.skills[choice.requirement.skill] < choice.requirement.min) {
      return `${getSkillLabel(choice.requirement.skill)} ${choice.requirement.min}`;
    }
    return null;
  };

  const completeStoryChoice = (event: OfficeStoryEvent, choice: OfficeStoryChoice, boss = false) => {
    const blocked = choiceBlockedReason(choice);
    if (blocked) {
      showFeedback(blocked, 'warning');
      return;
    }

    applyOutcome(choice.outcome);

    if (boss) {
      setSnapshot((current) => ({
        ...current,
        firstAssignment: {
          ...current.firstAssignment,
          progress: current.firstAssignment.target,
        },
      }));
      setStory((current) => ({
        ...current,
        bossResolved: true,
        bossChoiceId: choice.id,
      }));
    } else {
      setStory((current) => ({
        ...current,
        completedEvents: current.completedEvents.includes(event.id)
          ? current.completedEvents
          : [...current.completedEvents, event.id],
      }));
      setSnapshot((current) => {
        const nextProgress = Math.min(current.daily.target, current.daily.progress + 1);
        const completesNow =
          !current.daily.claimed &&
          current.daily.progress < current.daily.target &&
          nextProgress >= current.daily.target;
        return {
          ...current,
          money: current.money + (completesNow ? current.daily.moneyReward : 0),
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
    }

    const rewardBits = [
      choice.outcome.money ? `+${choice.outcome.money} ₽` : null,
      choice.outcome.xp ? `+${choice.outcome.xp} XP` : null,
      choice.outcome.reputation ? `Репутация ${choice.outcome.reputation > 0 ? '+' : ''}${choice.outcome.reputation}` : null,
    ].filter(Boolean);

    showFeedback(rewardBits.join(' · ') || 'Событие завершено', boss ? 'money' : 'xp');
    setNotice(choice.result);
    setModal(null);
  };

  const handlePrank = (prank: OfficePrank) => {
    const succeeded = Math.random() <= prank.successChance;
    const outcome = succeeded ? prank.success : prank.fail;
    applyOutcome(outcome);
    setStory((current) => ({
      ...current,
      completedPranks: current.completedPranks.includes(prank.id)
        ? current.completedPranks
        : [...current.completedPranks, prank.id],
    }));
    showFeedback(
      succeeded
        ? `Успех · ${Math.round(prank.successChance * 100)}%`
        : 'Поймали',
      succeeded ? 'social' : 'warning',
    );
    setNotice(succeeded ? prank.successText : prank.failText);
    setModal(null);
  };

  const handleNavigation = (label: string) => {
    setDrawerCategory(null);
    if (label === 'Главная') {
      setActiveView('home');
      return;
    }
    if (label === 'Карьера') {
      setActiveView('career');
      return;
    }
    if (label === 'Компания') {
      setActiveView('company');
      return;
    }
    if (label === 'Персонаж') {
      setActiveView('character');
      return;
    }
    if (label === 'Инвентарь' || label === 'Магазин') {
      setActiveView('home');
      setDrawerCategory('pc');
      return;
    }
    setActiveView('home');
    setNotice(`Раздел «${label}» будет добавлен после базовых RPG-систем.`);
    showFeedback(`${label}: в разработке`, 'xp');
  };

  const triggerAction = (id: (typeof officeActions)[number]['id']) => {
    if (activeAction) return;

    if (id === 'work') {
      const nextEvent = getNextFirstDayEvent(story.completedEvents);
      if (nextEvent) {
        setModal({ type: 'event', event: nextEvent });
        return;
      }

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
          money:
            current.money +
            Math.round(
              (75 + (buildBonuses.productivity ?? 0) * 3) *
                (1 + (buildBonuses.incomeBonus ?? 0) / 100),
            ) +
            (completesNow ? current.daily.moneyReward : 0),
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
          : 'Обычная задача закрыта. После первых трёх историй начинается нормальная офисная рутина.',
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

    setModal({ type: 'pranks' });
  };

  const handleBoss = () => {
    if (!bossUnlocked) {
      setNotice('Сергей Петрович пока не зовёт: закончи три задачи первого дня или достигни 3 уровня.');
      showFeedback('Закончи первый день', 'warning');
      return;
    }

    if (firstAssignmentDone || v6.bossResolved) {
      setNotice('Сергей Петрович уже пройден. Твой билд готовится к следующему боссу.');
      return;
    }

    setBossBattleOpen(true);
  };

  const buyV6Item = (item: V6Item) => {
    const lockReason = v6ItemLockReason(item, {
      level: snapshot.level,
      reputation: snapshot.reputation,
      state: v6,
    });
    if (lockReason) {
      showFeedback(lockReason, 'warning');
      return;
    }
    if (v6.ownedItemIds.includes(item.id)) {
      equipV6Item(item);
      return;
    }
    if (snapshot.money < item.price) {
      showFeedback('Не хватает денег', 'warning');
      setNotice(`Для покупки «${item.name}» не хватает ${formatMoney(item.price - snapshot.money)} ₽.`);
      return;
    }

    setSnapshot((current) => ({ ...current, money: current.money - item.price }));
    setV6((current) => ({
      ...current,
      ownedItemIds: [...current.ownedItemIds, item.id],
      equipped: { ...current.equipped, [item.category]: item.id },
    }));
    showFeedback(`Куплено: ${item.name}`, 'money');
    setNotice(`${item.name} куплен и сразу установлен.`);
  };

  const equipV6Item = (item: V6Item) => {
    if (!v6.ownedItemIds.includes(item.id)) return;
    setV6((current) => ({
      ...current,
      equipped: { ...current.equipped, [item.category]: item.id },
    }));
    showFeedback(`Установлено: ${item.name}`, 'xp');
    setNotice(`${item.name} теперь влияет на твой билд.`);
  };

  const selectGender = (gender: V6Gender) => {
    setV6((current) => ({ ...current, gender }));
    setNotice('Профиль персонажа обновлён. Общая сила остаётся сбалансированной, меняются синергии.');
  };

  const selectArchetype = (archetypeId: V6ArchetypeId) => {
    setV6((current) => ({ ...current, archetypeId }));
    setNotice('Архетип изменён. Новый стиль уже влияет на экипировку и боссов.');
  };

  const selectCareerBranch = (careerBranch: V6CareerBranch) => {
    if (v6.careerBranch !== 'general' && v6.careerBranch !== careerBranch) {
      showFeedback('Ветка уже выбрана', 'warning');
      setNotice('Карьерная специализация уже выбрана. Смена ветки позже будет отдельной механикой переподготовки.');
      return;
    }
    setV6((current) => ({ ...current, careerBranch }));
    showFeedback(`Ветка: ${careerBranch === 'expert' ? 'Эксперт' : careerBranch === 'management' ? 'Управление' : 'Продажи'}`, 'xp');
    setNotice('Карьерная ветка зафиксирована и теперь влияет на предметы и урон по боссам.');
  };

  const switchCompany = (companyId: string) => {
    const company = v6Companies.find((candidate) => candidate.id === companyId);
    if (!company) return;
    if (snapshot.level < company.minLevel || snapshot.reputation < company.minReputation) {
      showFeedback('Компания пока недоступна', 'warning');
      return;
    }

    const baseSalary = snapshot.role === 'Младший специалист' ? 50000 : snapshot.role === 'Стажёр' ? 35000 : snapshot.salary;
    const salary = Math.round(baseSalary * company.salaryMultiplier / 1000) * 1000;
    setV6((current) => ({ ...current, companyId }));
    setSnapshot((current) => ({
      ...current,
      salary,
      company: {
        ...current.company,
        name: company.name,
        industry: company.industry,
        description: company.description,
        level: Math.min(5, v6Companies.findIndex((candidate) => candidate.id === companyId) + 1),
      },
    }));
    showFeedback(`Новая компания: ${company.name}`, 'money');
    setNotice(`Ты перешёл в ${company.name}. Офис и доступные предметы начинают меняться вместе с компанией.`);
  };

  const attackBoss = (kind: 'logic' | 'social' | 'pressure', expectedDamage: number) => {
    if (snapshot.energy <= 0 || v6.bossResolved) {
      showFeedback('Нет энергии', 'warning');
      return;
    }

    const boss = v6Bosses[0];
    const nextHp = Math.max(0, v6.bossHp - expectedDamage);
    setSnapshot((current) => ({ ...current, energy: Math.max(0, current.energy - 1) }));
    setV6((current) => ({ ...current, bossHp: nextHp }));
    showFeedback(`${kind === 'logic' ? 'Логика' : kind === 'social' ? 'Переговоры' : 'Напор'} −${expectedDamage}`, 'social');

    if (nextHp > 0) {
      setNotice(`Сергей Петрович теряет терпение: осталось ${nextHp}.`);
      return;
    }

    setV6((current) => ({ ...current, bossHp: 0, bossResolved: true }));
    setSnapshot((current) => ({
      ...current,
      money: current.money + boss.rewardMoney,
      reputation: Math.min(100, current.reputation + boss.rewardReputation),
      firstAssignment: {
        ...current.firstAssignment,
        progress: current.firstAssignment.target,
      },
    }));
    setStory((current) => ({ ...current, bossResolved: true, bossChoiceId: `v6-${kind}` }));
    gainXp(boss.rewardXp);
    setBossBattleOpen(false);
    showFeedback('Босс пройден!', 'money');
    setNotice('Сергей Петрович сдался перед твоим билдом. Первое поручение выполнено.');
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
    setV6(initialV6State);
    setDrawerCategory(null);
    setBossBattleOpen(false);
    setEnergyCountdown(OFFICE_ENERGY_REGEN_SECONDS);
    setEnergyNextAt(null);
    setStory(initialOfficeStoryState);
    setActiveView('home');
    setModal(null);
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
              snapshot.energy >= effectiveMaxEnergy
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
            {officeNavigation.map((item) => {
              const isActive =
                (activeView === 'home' && item.label === 'Главная') ||
                (activeView === 'career' && item.label === 'Карьера') ||
                (activeView === 'company' && item.label === 'Компания') ||
                (activeView === 'character' && item.label === 'Персонаж');
              return (
              <button
                className={isActive ? 'active' : ''}
                type="button"
                key={item.label}
                onClick={() => handleNavigation(item.label)}
              >
                <OfficeIcon name={item.icon} />
                <small>{item.label}</small>
                <span className="office-nav-tooltip">
                  <b>{item.label}</b>
                  <em>{item.hint}</em>
                </span>
              </button>
            )})}
            <div className="office-bonus">
              <OfficeIcon name="gift" />
              <span>Бонус</span>
              <small>03:12:45</small>
            </div>
          </nav>

          {activeView === 'home' ? (
            <>
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

            <Stat label="Энергия" value={snapshot.energy} max={effectiveMaxEnergy} icon="energy" tone="yellow" />
            <Stat label="Репутация" value={snapshot.reputation} max={100} icon="reputation" tone="green" />
            <Stat label="Стресс" value={snapshot.stress} max={100} icon="stress" tone="red" />

            <div className="office-skill-title">Навыки <span>?</span></div>
            <Skill label="Компетентность" value={snapshot.skills.competence} icon="competence" />
            <Skill label="Коммуникация" value={snapshot.skills.communication} icon="communication" />
            <Skill label="Напор" value={snapshot.skills.drive} icon="drive" />

            <div className="office-quick-links">
              <button type="button" onClick={() => setDrawerCategory('pc')}>Инвентарь <span>›</span></button>
              <button type="button" onClick={() => handleNavigation('Достижения')}>Достижения <span>›</span></button>
              <button type="button" onClick={() => setActiveView('character')}>Персонаж <span>›</span></button>
            </div>
          </aside>

          <main className="office-center">
            <section className="office-scene">
              <img src="/games/office/office-start.svg" alt="Первое рабочее место стажёра" />
              <button
                className="office-hotspot office-hotspot-pc"
                type="button"
                onClick={() => setDrawerCategory('pc')}
                aria-label="Старый компьютер"
              >
                <span>＋</span> Старый ПК
              </button>
              <button
                className="office-hotspot office-hotspot-chair"
                type="button"
                onClick={() => setDrawerCategory('chair')}
                aria-label="Старый офисный стул"
              >
                <span>＋</span> Стул
              </button>
              <button
                className="office-hotspot office-hotspot-desk"
                type="button"
                onClick={() => setDrawerCategory('desk')}
                aria-label="Рабочий стол"
              >
                <span>＋</span> Стол
              </button>
              <button
                className="office-hotspot office-hotspot-monitor"
                type="button"
                onClick={() => setDrawerCategory('monitor')}
                aria-label="Монитор"
              >
                <span>＋</span> Монитор
              </button>
              <button
                className="office-hotspot office-hotspot-character"
                type="button"
                onClick={() => setDrawerCategory('clothes')}
                aria-label="Одежда персонажа"
              >
                <span>＋</span> Одежда
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
                  <div>
                    <b>{item.title}</b>
                    <small>{item.id === 'work' && !firstDayDone ? `Первый день · ${story.completedEvents.length}/3` : item.text}</small>
                  </div>
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
              <button type="button" onClick={() => setActiveView('company')}>О компании →</button>
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
                Первое поручение · {firstAssignmentDone ? 'выполнено' : bossUnlocked ? 'доступно' : '3 задачи или ур. 3'}
              </div>
              <button type="button" onClick={handleBoss}>
                {firstAssignmentDone ? 'Поручение выполнено' : bossUnlocked ? 'Начать поручение »' : 'К испытанию »'}
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
            </>
          ) : activeView === 'career' ? (
            <V6CareerView
              state={v6}
              snapshot={snapshot}
              onSelectBranch={selectCareerBranch}
              onBack={() => setActiveView('home')}
            />
          ) : activeView === 'company' ? (
            <V6CompanyView
              state={v6}
              snapshot={snapshot}
              onSwitch={switchCompany}
              onBack={() => setActiveView('home')}
            />
          ) : (
            <V6CharacterView
              state={v6}
              snapshot={snapshot}
              onGender={selectGender}
              onArchetype={selectArchetype}
              onBack={() => setActiveView('home')}
            />
          )}
        </div>

        {activeView === 'home' ? (
        <>
        <footer className="office-bottom office-v6-bottom">
          <EquipmentDock state={v6} onOpen={setDrawerCategory} />

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
              <button type="button" className="primary" onClick={() => setModal({ type: 'promotion-help' })}>Подготовиться</button>
              <button type="button" disabled={!promotionReady} onClick={requestPromotion}>
                {promotionCompleted ? 'Получено' : 'Просить повышение'}
              </button>
            </div>
            <small className="office-unlocks">Ветка карьеры и экипировка влияют на дальнейшие повышения</small>
          </section>
        </footer>

        <EquipmentDrawer
          category={drawerCategory}
          state={v6}
          level={snapshot.level}
          reputation={snapshot.reputation}
          money={snapshot.money}
          onClose={() => setDrawerCategory(null)}
          onBuy={buyV6Item}
          onEquip={equipV6Item}
        />
        </>
        ) : null}

        {bossBattleOpen ? (
          <V6BossBattle
            state={v6}
            snapshot={snapshot}
            onAttack={attackBoss}
            onClose={() => setBossBattleOpen(false)}
          />
        ) : null}

        <OfficeOverlay
          modal={modal}
          snapshot={snapshot}
          onClose={() => setModal(null)}
          onStoryChoice={completeStoryChoice}
          onPrank={handlePrank}
          onGoToCareer={() => {
            setModal(null);
            setActiveView('career');
          }}
        />
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

function OfficeOverlay({
  modal,
  snapshot,
  onClose,
  onStoryChoice,
  onPrank,
  onGoToCareer,
}: {
  modal: OfficeModal;
  snapshot: OfficeSnapshot;
  onClose: () => void;
  onStoryChoice: (event: OfficeStoryEvent, choice: OfficeStoryChoice, boss?: boolean) => void;
  onPrank: (prank: OfficePrank) => void;
  onGoToCareer: () => void;
}) {
  if (!modal) return null;

  if (modal.type === 'event' || modal.type === 'boss') {
    const isBoss = modal.type === 'boss';
    return (
      <div className="office-modal-backdrop" role="presentation" onMouseDown={onClose}>
        <section
          className={`office-modal office-story-modal ${isBoss ? 'office-boss-modal' : ''}`}
          role="dialog"
          aria-modal="true"
          aria-label={modal.event.title}
          onMouseDown={(event) => event.stopPropagation()}
        >
          <button type="button" className="office-modal-close" onClick={onClose}>×</button>
          <div className="office-story-heading">
            {isBoss ? <img src="/games/office/boss.svg" alt="" /> : <OfficeIcon name="work" />}
            <div>
              <small>{modal.event.eyebrow}</small>
              <h2>{modal.event.title}</h2>
              {modal.event.speaker ? <b>{modal.event.speaker}</b> : null}
            </div>
          </div>
          <p className="office-story-description">{modal.event.description}</p>
          <div className="office-story-choices">
            {modal.event.choices.map((choice) => {
              const energyCost = Math.max(0, -(choice.outcome.energy ?? 0));
              const lacksEnergy = snapshot.energy < energyCost;
              const lacksSkill =
                choice.requirement &&
                snapshot.skills[choice.requirement.skill] < choice.requirement.min;
              const disabled = lacksEnergy || Boolean(lacksSkill);
              const requirement = choice.requirement
                ? `${getSkillLabel(choice.requirement.skill)} ${snapshot.skills[choice.requirement.skill]}/${choice.requirement.min}`
                : energyCost
                  ? `Энергия −${energyCost}`
                  : 'Без затрат энергии';

              return (
                <button
                  type="button"
                  key={choice.id}
                  disabled={disabled}
                  onClick={() => onStoryChoice(modal.event, choice, isBoss)}
                >
                  <div>
                    <strong>{choice.label}</strong>
                    <span>{choice.description}</span>
                  </div>
                  <small className={disabled ? 'blocked' : ''}>{lacksEnergy ? `Нужно энергии: ${energyCost}` : requirement}</small>
                </button>
              );
            })}
          </div>
        </section>
      </div>
    );
  }

  if (modal.type === 'pranks') {
    return (
      <div className="office-modal-backdrop" role="presentation" onMouseDown={onClose}>
        <section className="office-modal office-prank-modal" role="dialog" aria-modal="true" aria-label="Шалости" onMouseDown={(event) => event.stopPropagation()}>
          <button type="button" className="office-modal-close" onClick={onClose}>×</button>
          <header>
            <small>Перерыв от продуктивности</small>
            <h2>Чем займёмся?</h2>
            <p>Шалости поднимают мотивацию, но некоторые могут ударить по репутации.</p>
          </header>
          <div className="office-prank-grid">
            {officePranks.map((prank) => (
              <button type="button" key={prank.id} onClick={() => onPrank(prank)}>
                <span className={`office-risk office-risk-${prank.risk === 'Низкий' ? 'low' : prank.risk === 'Средний' ? 'mid' : 'high'}`}>{prank.risk} риск</span>
                <strong>{prank.title}</strong>
                <p>{prank.description}</p>
                <div><b>{Math.round(prank.successChance * 100)}%</b><small>шанс успеха</small></div>
              </button>
            ))}
          </div>
        </section>
      </div>
    );
  }

  const competenceLeft = Math.max(0, nextPromotion.competence - snapshot.skills.competence);
  const reputationLeft = Math.max(0, nextPromotion.reputation - snapshot.reputation);
  const assignmentLeft = Math.max(0, nextPromotion.firstAssignment - snapshot.firstAssignment.progress);

  return (
    <div className="office-modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="office-modal office-promotion-modal" role="dialog" aria-modal="true" aria-label="Подготовка к повышению" onMouseDown={(event) => event.stopPropagation()}>
        <button type="button" className="office-modal-close" onClick={onClose}>×</button>
        <small>Карьерный помощник</small>
        <h2>До повышения осталось</h2>
        <div className="office-promotion-todo">
          <div className={competenceLeft === 0 ? 'done' : ''}><OfficeIcon name="competence" /><span>Компетентность</span><b>{competenceLeft === 0 ? 'Готово' : `ещё ${competenceLeft}`}</b></div>
          <div className={reputationLeft === 0 ? 'done' : ''}><OfficeIcon name="reputation" /><span>Репутация</span><b>{reputationLeft === 0 ? 'Готово' : `ещё ${reputationLeft}`}</b></div>
          <div className={assignmentLeft === 0 ? 'done' : ''}><OfficeIcon name="task" /><span>Первое поручение</span><b>{assignmentLeft === 0 ? 'Готово' : 'не выполнено'}</b></div>
        </div>
        <div className="office-promotion-help-actions">
          <button type="button" onClick={onClose}>Продолжить подготовку</button>
          <button type="button" onClick={onGoToCareer}>Посмотреть карьеру →</button>
        </div>
      </section>
    </div>
  );
}

function formatCountdown(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(rest).padStart(2, '0')}`;
}
