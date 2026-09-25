'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  formatMoney,
  getCompanyStars,
  initialOfficeSnapshot,
  initialWorkspaceItems,
  isOfficePersistedState,
  nextPromotion,
  officeActions,
  officeDevelopmentNavigation,
  officeLocationNavigation,
  officeNews,
  OFFICE_ACTION_COOLDOWN_MS,
  OFFICE_ENERGY_REGEN_SECONDS,
  OFFICE_STORAGE_KEY,
  OFFICE_STORAGE_VERSION,
   type OfficeSnapshot,
  type OfficeSkillKey,
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
  EquipmentDrawer,
  V6BossBattle,
  V6CareerView,
  V6CharacterView,
  V6CompanyView,
} from './office-v6-ui';
import {
  getBossDamage,
  getV6BuildBonuses,
  initialV6State,
  v6Bosses,
  v6CategoryMeta,
  v6Companies,
  v6ItemLockReason,
  v6Items,
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

type OfficeView =
  | 'home'
  | 'tasks'
  | 'career'
  | 'company'
  | 'bosses'
  | 'events'
  | 'character'
  | 'stats'
  | 'skills'
  | 'talents'
  | 'inventory'
  | 'achievements';
type OfficeModal =
  | { type: 'event'; event: OfficeStoryEvent }
  | { type: 'boss'; event: OfficeStoryEvent }
  | { type: 'pranks' }
  | { type: 'promotion-help' }
  | null;

function getOfficeProgressNotice(snapshot: OfficeSnapshot, story: OfficeStoryState, v6: V6State) {
  const promotionCompleted = snapshot.role === nextPromotion.role;
  const firstDayDone = story.completedEvents.length >= 3;

  if (promotionCompleted && v6.bossResolved) {
    return 'Первая альфа-глава завершена. Можно продолжать развивать персонажа и рабочее место.';
  }
  if (promotionCompleted) {
    return 'Повышение получено. Осталось пройти первое испытание руководителя.';
  }
  if (v6.bossResolved) {
    return 'Первый босс пройден. Закрой требования и получи первое повышение.';
  }
  if (firstDayDone) {
    return 'Первый день завершён. Готовься к первому испытанию руководителя.';
  }
  if (story.completedEvents.length > 0) {
    return `Первый рабочий день: выполнено ${story.completedEvents.length}/3 событий.`;
  }
  return 'Первый рабочий день. Начни с простого поручения.';
}

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

  const pageRef = useRef<HTMLDivElement | null>(null);
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
  const alphaChapterComplete = promotionCompleted && v6.bossResolved;

  const companyStars = getCompanyStars(snapshot.company.level, snapshot.company.maxLevel);
  const activeCompany = v6Companies.find((company) => company.id === v6.companyId) ?? v6Companies[0];
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
          const hydratedSnapshot: OfficeSnapshot = {
            ...initialOfficeSnapshot,
            ...parsed.snapshot,
            skills: { ...initialOfficeSnapshot.skills, ...parsed.snapshot.skills },
            daily: { ...initialOfficeSnapshot.daily, ...parsed.snapshot.daily },
            firstAssignment: {
              ...initialOfficeSnapshot.firstAssignment,
              ...parsed.snapshot.firstAssignment,
            },
            company: { ...initialOfficeSnapshot.company, ...parsed.snapshot.company },
          };
          const persistedStory = (parsed as typeof parsed & { story?: OfficeStoryState }).story;
          const persistedV6 = (parsed as typeof parsed & { v6?: V6State }).v6;
          const hydratedV6: V6State = persistedV6
            ? {
                ...initialV6State,
                ...persistedV6,
                ownedItemIds: Array.isArray(persistedV6.ownedItemIds)
                  ? persistedV6.ownedItemIds
                  : initialV6State.ownedItemIds,
                equipped: { ...initialV6State.equipped, ...persistedV6.equipped },
              }
            : initialV6State;
          const hydratedStory: OfficeStoryState = persistedStory
            ? {
                ...initialOfficeStoryState,
                ...persistedStory,
                completedEvents: Array.isArray(persistedStory.completedEvents)
                  ? persistedStory.completedEvents
                  : [],
                completedPranks: Array.isArray(persistedStory.completedPranks)
                  ? persistedStory.completedPranks
                  : [],
              }
            : initialOfficeStoryState;

          setSnapshot(hydratedSnapshot);
          if (parsed.workspace.length === initialWorkspaceItems.length) {
            setWorkspace(parsed.workspace);
          }
          setEnergyNextAt(parsed.energyNextAt);
          setV6(hydratedV6);
          setStory(hydratedStory);
          setNotice(getOfficeProgressNotice(hydratedSnapshot, hydratedStory, hydratedV6));
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

  useEffect(() => {
    const hadNoScroll = document.body.classList.contains('office-no-scroll');
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

    const syncViewport = () => {
      const page = pageRef.current;
      if (!page) return;
      const top = Math.max(0, page.getBoundingClientRect().top);
      page.style.setProperty('--office-viewport-height', `${Math.max(0, window.innerHeight - top - 8)}px`);
    };

    document.body.classList.add('office-no-scroll');
    syncViewport();
    window.requestAnimationFrame(syncViewport);
    window.addEventListener('resize', syncViewport);

    return () => {
      window.removeEventListener('resize', syncViewport);
      if (!hadNoScroll) document.body.classList.remove('office-no-scroll');
    };
  }, []);

  useEffect(() => {
    if (activeView !== 'home' && drawerCategory !== null) {
      setDrawerCategory(null);
    }
  }, [activeView, drawerCategory]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;

      if (drawerCategory !== null) {
        setDrawerCategory(null);
        return;
      }

      if (bossBattleOpen) {
        setBossBattleOpen(false);
        return;
      }

      if (modal) setModal(null);
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [bossBattleOpen, drawerCategory, modal]);

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
      let gainedSkillPoints = 0;

      while (nextXp >= nextThreshold) {
        nextXp -= nextThreshold;
        nextLevel += 1;
        nextThreshold = Math.round(nextThreshold * 1.2);
        nextMaxEnergy = Math.min(120, nextMaxEnergy + 2);
        gainedSkillPoints += 2;
      }

      return {
        ...current,
        xp: nextXp,
        level: nextLevel,
        xpToNext: nextThreshold,
        maxEnergy: nextMaxEnergy,
        skillPoints: current.skillPoints + gainedSkillPoints,
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

  const upgradePrimarySkill = (skill: OfficeSkillKey) => {
    if (snapshot.skillPoints <= 0) {
      showFeedback('Нет свободных очков развития', 'warning');
      return;
    }

    setSnapshot((current) => {
      if (current.skillPoints <= 0) return current;
      return {
        ...current,
        skillPoints: current.skillPoints - 1,
        skills: {
          ...current.skills,
          [skill]: current.skills[skill] + 1,
        },
      };
    });
    showFeedback(getSkillLabel(skill) + ' +1', 'xp');
  };

  const handleNavigation = (label: string) => {
    setDrawerCategory(null);

    const viewByLabel: Record<string, OfficeView> = {
      Главная: 'home',
      Задачи: 'tasks',
      Карьера: 'career',
      Компания: 'company',
      Боссы: 'bosses',
      События: 'events',
      Профиль: 'character',
      Характеристики: 'stats',
      Навыки: 'skills',
      Таланты: 'talents',
      Инвентарь: 'inventory',
      Достижения: 'achievements',
    };

    const nextView = viewByLabel[label];
    if (nextView) {
      setActiveView(nextView);
      return;
    }

    setNotice('Раздел пока в разработке.');
    showFeedback('Скоро', 'warning');
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
      setNotice(
        v6.bossResolved
          ? 'Первая альфа-глава завершена: босс пройден, повышение получено.'
          : 'Повышение уже получено. Заверши первое испытание руководителя, чтобы закрыть альфа-главу.',
      );
      return;
    }

    if (!promotionReady) {
      setModal({ type: 'promotion-help' });
      setNotice('До повышения остались требования. Карьерный помощник показывает, что закрыть дальше.');
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
    setNotice(
      v6.bossResolved
        ? 'Повышение получено. Первая альфа-глава завершена.'
        : 'Повышение получено. Осталось закрыть первое испытание руководителя.',
    );
  };

  const resetPrototype = () => {
    if (feedbackTimerRef.current !== null) {
      window.clearTimeout(feedbackTimerRef.current);
      feedbackTimerRef.current = null;
    }
    if (cooldownTimerRef.current !== null) {
      window.clearTimeout(cooldownTimerRef.current);
      cooldownTimerRef.current = null;
    }

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
    setActiveAction(null);
    setFeedback(null);
    setNotice('Прогресс сброшен. Снова первый рабочий день.');
    window.localStorage.removeItem(OFFICE_STORAGE_KEY);
  };

  return (
    <div className="office-page" ref={pageRef}>
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
            <div className="office-player-main">
              <div>
                <strong>{snapshot.playerName}</strong>
                <span>ур. {snapshot.level} · {snapshot.role}</span>
              </div>
              <small className="office-player-goal">
                Цель: {alphaChapterComplete
                  ? 'альфа-глава 1 завершена'
                  : promotionCompleted
                    ? 'пройти первое испытание руководителя'
                    : v6.bossResolved
                      ? `получить повышение «${nextPromotion.role}»`
                      : promotionReady
                        ? `можно просить повышение «${nextPromotion.role}»`
                        : `${nextPromotion.role} · комп. ${snapshot.skills.competence}/${nextPromotion.competence} · реп. ${snapshot.reputation}/${nextPromotion.reputation}`}
              </small>
            </div>
            <div className="office-player-xp-row">
              <div className="office-xp">
                <i style={{ width: `${Math.min(100, snapshot.xp / snapshot.xpToNext * 100)}%` }} />
              </div>
              <em>{snapshot.xp} / {snapshot.xpToNext}</em>
            </div>
          </div>

          <div className="office-top-status" aria-label="Ресурсы и системные действия">
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
              <button
                type="button"
                title="Сбросить прогресс"
                aria-label="Сбросить прогресс"
                onClick={() => {
                  if (window.confirm('Сбросить локальный прогресс «В Офисе»?')) resetPrototype();
                }}
              >
                <OfficeIcon name="settings" />
              </button>
            </div>
          </div>
        </header>

        <div className="office-body">
          <nav className="office-side-nav" aria-label="Развитие персонажа">
            {officeDevelopmentNavigation.map((item) => {
              const isActive =
                (activeView === 'character' && item.label === 'Профиль') ||
                (activeView === 'stats' && item.label === 'Характеристики') ||
                (activeView === 'skills' && item.label === 'Навыки') ||
                (activeView === 'talents' && item.label === 'Таланты') ||
                (activeView === 'inventory' && item.label === 'Инвентарь') ||
                (activeView === 'achievements' && item.label === 'Достижения');
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
              );
            })}

          </nav>

          {activeView === 'home' ? (
            <>
          <aside className="office-profile office-profile-compact">
            <div className="office-profile-identity">
              <button
                type="button"
                className="office-portrait office-profile-open"
                onClick={() => setActiveView('character')}
                title="Открыть профиль персонажа"
                aria-label="Открыть профиль персонажа"
              >
                <img src="/games/office/avatar.svg" alt="Персонаж Бродяга" />
              </button>

              <div className="office-profile-name">
                <strong>{snapshot.playerName}</strong>
                <span>{snapshot.role}</span>
                <b>ур. {snapshot.level}</b>
              </div>

              <div className="office-profile-xp">
                <div><span>Опыт</span><b>{snapshot.xp}/{snapshot.xpToNext}</b></div>
                <i><em style={{ width: `${Math.min(100, snapshot.xp / snapshot.xpToNext * 100)}%` }} /></i>
              </div>
            </div>

            <div className="office-profile-mini-stats">
              <button type="button" onClick={() => setActiveView('stats')} title="Энергия">
                <OfficeIcon name="energy" /><b>{snapshot.energy}</b><small>энергия</small>
              </button>
              <button type="button" onClick={() => setActiveView('stats')} title="Репутация">
                <OfficeIcon name="reputation" /><b>{snapshot.reputation}</b><small>репутация</small>
              </button>
              <button type="button" onClick={() => setActiveView('stats')} title="Стресс">
                <OfficeIcon name="stress" /><b>{snapshot.stress}</b><small>стресс</small>
              </button>
            </div>

            <button type="button" className="office-profile-points" onClick={() => setActiveView('stats')}>
              <span>Очки развития</span><b>{snapshot.skillPoints}</b>
            </button>
          </aside>

          <main className="office-center">
            <section className="office-scene office-v615-scene" data-company={v6.companyId}>
              <img
                src="/games/office/office-start.svg"
                alt={`Рабочее место в компании ${snapshot.company.name}`}
              />
              <div className="office-v615-office-badge" aria-label={`Текущий офис: ${snapshot.company.name}`}>
                <small>Текущий офис</small>
                <strong>{snapshot.company.name}</strong>
                <span>{activeCompany.officeStyle}</span>
              </div>
              <div className="office-scene-hitmap">
                <svg
                  className="office-scene-hitmap-svg"
                  viewBox="0 0 960 640"
                  preserveAspectRatio="xMidYMid slice"
                  aria-label="Интерактивные объекты рабочего места"
                >
                  <g
                    className={`office-scene-shape office-scene-shape-chair ${drawerCategory === 'chair' ? 'is-active' : ''}`}
                    role="button"
                    tabIndex={0}
                    aria-label="Выбрать стул"
                    onClick={() => setDrawerCategory('chair')}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        setDrawerCategory('chair');
                      }
                    }}
                  >
                    <path d="M465 314H600V512H465Z M513 500H552V584H513Z M533 577L464 603 M533 577L601 604 M533 577L535 612" />
                  </g>

                  <g
                    className={`office-scene-shape office-scene-shape-desk ${drawerCategory === 'desk' ? 'is-active' : ''}`}
                    role="button"
                    tabIndex={0}
                    aria-label="Выбрать стол"
                    onClick={() => setDrawerCategory('desk')}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        setDrawerCategory('desk');
                      }
                    }}
                  >
                    <path d="M288 344H426V386H288Z M638 344H886V386H638Z M314 383H356V557H314Z M827 383H869V557H827Z" />
                  </g>

                  <g
                    className={`office-scene-shape office-scene-shape-pc ${drawerCategory === 'pc' ? 'is-active' : ''}`}
                    role="button"
                    tabIndex={0}
                    aria-label="Выбрать компьютер"
                    onClick={() => setDrawerCategory('pc')}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        setDrawerCategory('pc');
                      }
                    }}
                  >
                    <path d="M737 389H821V542H737Z" />
                  </g>

                  <g
                    className={`office-scene-shape office-scene-shape-monitor ${drawerCategory === 'monitor' ? 'is-active' : ''}`}
                    role="button"
                    tabIndex={0}
                    aria-label="Выбрать монитор"
                    onClick={() => setDrawerCategory('monitor')}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        setDrawerCategory('monitor');
                      }
                    }}
                  >
                    <path d="M586 220H762V345H586Z M584 345H767V363H584Z" />
                  </g>

                  <g
                    className={`office-scene-shape office-scene-shape-accessory ${drawerCategory === 'accessory' ? 'is-active' : ''}`}
                    role="button"
                    tabIndex={0}
                    aria-label="Выбрать аксессуары"
                    onClick={() => setDrawerCategory('accessory')}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        setDrawerCategory('accessory');
                      }
                    }}
                  >
                    <path d="M790 301H836V347H790Z M675 298H753V326H675Z M754 273H801V318H754Z" />
                  </g>

                  <g
                    className={`office-scene-shape office-scene-shape-decor ${drawerCategory === 'decor' ? 'is-active' : ''}`}
                    role="button"
                    tabIndex={0}
                    aria-label="Выбрать декор"
                    onClick={() => setDrawerCategory('decor')}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        setDrawerCategory('decor');
                      }
                    }}
                  >
                    <path d="M64 472H212V578H64Z" />
                  </g>

                  <g
                    className={`office-scene-shape office-scene-shape-lighting ${drawerCategory === 'lighting' ? 'is-active' : ''}`}
                    role="button"
                    tabIndex={0}
                    aria-label="Выбрать освещение"
                    onClick={() => setDrawerCategory('lighting')}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        setDrawerCategory('lighting');
                      }
                    }}
                  >
                    <path d="M325 22H647V42H325Z M350 27H622V35H350Z" />
                  </g>

                  <g
                    className={`office-scene-shape office-scene-shape-character ${drawerCategory === 'clothes' ? 'is-active' : ''}`}
                    role="button"
                    tabIndex={0}
                    aria-label="Выбрать одежду персонажа"
                    onClick={() => setDrawerCategory('clothes')}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        setDrawerCategory('clothes');
                      }
                    }}
                  >
                    <path d="M474 211Q483 150 533 146Q588 142 604 200Q611 225 601 253Q591 284 569 299Q549 312 526 309Q497 305 481 279Q465 254 474 211Z" />
                    <path d="M461 319Q500 293 526 301Q544 318 565 301Q608 309 638 349L614 493Q545 527 443 493L426 357Q438 333 461 319Z" />
                    <path d="M460 330Q426 369 407 434Q400 458 421 469Q438 477 450 457L508 360Q492 338 460 330Z" />
                    <path d="M620 336Q658 377 681 428Q692 453 672 466Q654 476 639 455L569 363Q586 341 620 336Z" />
                    <path d="M455 475Q497 457 539 471Q555 478 562 501L532 620H465Q441 544 455 475Z" />
                    <path d="M556 473Q607 464 634 502Q665 550 707 603L650 632Q581 573 526 513Q523 489 556 473Z" />
                  </g>
                </svg>
              </div>
              <div className="office-scene-note office-v68-scene-status">
                <span className="office-v68-scene-message">{notice}</span>
                <span className={dailyDone ? 'is-done' : ''}>
                  День: {snapshot.daily.progress}/{snapshot.daily.target}
                </span>
                <span className={alphaChapterComplete || promotionReady || promotionCompleted || v6.bossResolved ? 'is-done' : ''}>
                  Далее: {alphaChapterComplete
                    ? 'Глава 1 завершена'
                    : promotionCompleted
                      ? 'Первый босс'
                      : v6.bossResolved
                        ? 'Повышение'
                        : nextPromotion.role}
                </span>
              </div>
            </section>

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



            <section
              className={`office-promotion-compact ${alphaChapterComplete ? 'is-alpha-complete' : promotionReady ? 'is-ready' : promotionCompleted ? 'is-complete' : ''}`}
            >
              <div className="office-card-head">
                <h3>{alphaChapterComplete ? 'Альфа · Глава 1' : 'Первое повышение'}</h3>
                <button
                  type="button"
                  onClick={() => setActiveView(alphaChapterComplete ? 'achievements' : promotionCompleted ? 'bosses' : 'career')}
                >
                  {alphaChapterComplete ? 'Итоги »' : promotionCompleted ? 'К боссу »' : 'К карьере »'}
                </button>
              </div>
              <strong>{alphaChapterComplete ? 'Глава завершена' : promotionCompleted ? snapshot.role : nextPromotion.role}</strong>
              {alphaChapterComplete ? (
                <div className="office-alpha-chapter-checks" aria-label="Прогресс первой альфа-главы">
                  <span className="done"><OfficeIcon name="task" /> Первый день</span>
                  <span className="done"><OfficeIcon name="achievement" /> Первый босс</span>
                  <span className="done"><OfficeIcon name="career" /> Повышение</span>
                </div>
              ) : (
                <>
                  <div className="office-promotion-mini-bars">
                    <Requirement label="Компетентность" value={`${snapshot.skills.competence}/${nextPromotion.competence}`} progress={snapshot.skills.competence / nextPromotion.competence * 100} />
                    <Requirement label="Репутация" value={`${snapshot.reputation}/${nextPromotion.reputation}`} progress={snapshot.reputation / nextPromotion.reputation * 100} />
                  </div>
                  <button
                    type="button"
                    className="office-v615-promotion-action"
                    onClick={() => {
                      if (promotionCompleted) {
                        setActiveView('bosses');
                        return;
                      }
                      requestPromotion();
                    }}
                  >
                    {promotionCompleted
                      ? 'Пройти первое испытание →'
                      : promotionReady
                        ? 'Попросить повышение'
                        : 'Что осталось до повышения?'}
                  </button>
                </>
              )}
            </section>

            <section className="office-news">
              <div className="office-card-head"><h3>Новости офиса</h3><button type="button" onClick={() => setActiveView('events')}>Все »</button></div>
              {officeNews.map(([title, time, color]) => (
                <div className="office-news-row" key={title}>
                  <span className={'dot dot-' + color} />
                  <div><b>{title}</b><small>{time}</small></div>
                </div>
              ))}
            </section>
          </aside>
            </>
          ) : activeView === 'tasks' ? (
            <OfficeTasksView
              snapshot={snapshot}
              story={story}
              buildBonuses={buildBonuses}
              activeAction={activeAction}
              onAction={triggerAction}
              onBack={() => setActiveView('home')}
            />
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
          ) : activeView === 'bosses' ? (
            <OfficeBossesView
              snapshot={snapshot}
              v6={v6}
              bossUnlocked={bossUnlocked}
              firstAssignmentDone={firstAssignmentDone}
              onFight={handleBoss}
              onBack={() => setActiveView('home')}
            />
          ) : activeView === 'events' ? (
            <OfficeEventsView
              snapshot={snapshot}
              story={story}
              onTasks={() => setActiveView('tasks')}
              onBack={() => setActiveView('home')}
            />
          ) : activeView === 'character' ? (
            <V6CharacterView
              state={v6}
              snapshot={snapshot}
              onGender={selectGender}
              onArchetype={selectArchetype}
              onBack={() => setActiveView('home')}
            />
          ) : activeView === 'stats' ? (
            <OfficeCharacteristicsView
              snapshot={snapshot}
              buildBonuses={buildBonuses}
              onUpgrade={upgradePrimarySkill}
              onBack={() => setActiveView('home')}
            />
          ) : activeView === 'skills' ? (
            <OfficeSkillsView
              snapshot={snapshot}
              buildBonuses={buildBonuses}
              onBack={() => setActiveView('home')}
            />
          ) : activeView === 'talents' ? (
            <OfficeTalentsView
              snapshot={snapshot}
              v6={v6}
              onCareer={() => setActiveView('career')}
              onBack={() => setActiveView('home')}
            />
          ) : activeView === 'inventory' ? (
            <OfficeInventoryView
              v6={v6}
              onBack={() => setActiveView('home')}
            />
          ) : (
            <OfficeAchievementsView
              snapshot={snapshot}
              story={story}
              v6={v6}
              onBack={() => setActiveView('home')}
            />
          )}

          <OfficeWorldNavigation
            activeView={activeView}
            feedback={feedback}
            onNavigate={handleNavigation}
          />
        </div>

        {activeView === 'home' && drawerCategory ? (
          <div
            className="office-equipment-backdrop"
            role="presentation"
            onMouseDown={() => setDrawerCategory(null)}
          >
            <section
              className="office-equipment-modal"
              role="dialog"
              aria-modal="true"
              aria-label="Каталог предметов рабочего места"
              onMouseDown={(event) => event.stopPropagation()}
            >
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
            </section>
          </div>
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



function OfficeWorldNavigation({
  activeView,
  feedback,
  onNavigate,
}: {
  activeView: OfficeView;
  feedback: ActionFeedback | null;
  onNavigate: (label: string) => void;
}) {
  const viewByLabel: Record<string, OfficeView> = {
    Задачи: 'tasks',
    Карьера: 'career',
    Компания: 'company',
    Боссы: 'bosses',
    События: 'events',
  };

  return (
    <nav className="office-location-strip office-world-nav" aria-label="Игровые разделы">
      {officeLocationNavigation.map((item) => {
        const targetView = viewByLabel[item.label];
        const isActive = targetView === activeView;
        return (
          <button
            type="button"
            className={isActive ? 'is-active' : ''}
            aria-current={isActive ? 'page' : undefined}
            key={item.label}
            onClick={() => onNavigate(item.label)}
          >
            <OfficeIcon name={item.icon} />
            <span>
              <b>{item.label}</b>
              <small>{item.hint.split(':')[0]}</small>
            </span>
          </button>
        );
      })}
      {feedback ? (
        <div
          key={feedback.id}
          className={`office-location-feedback office-feedback-${feedback.tone}`}
          role="status"
          aria-live="polite"
        >
          {feedback.text}
        </div>
      ) : null}
    </nav>
  );
}

function OfficeDevelopmentHeader({
  eyebrow,
  title,
  description,
  onBack,
  aside,
}: {
  eyebrow: string;
  title: string;
  description: string;
  onBack: () => void;
  aside?: ReactNode;
}) {
  return (
    <header className="office-v67-dev-head">
      <div>
        <small>{eyebrow}</small>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="office-v67-dev-head-actions">
        {aside}
        <button type="button" onClick={onBack}>← В офис</button>
      </div>
    </header>
  );
}

function OfficeAlphaGoal({
  icon,
  label,
  title,
  meta,
  tone = 'gold',
}: {
  icon: string;
  label: string;
  title: string;
  meta?: string;
  tone?: 'gold' | 'green' | 'blue' | 'red';
}) {
  return (
    <div className={`office-v610-next-goal tone-${tone}`}>
      <OfficeIcon name={icon} />
      <div>
        <small>{label}</small>
        <strong>{title}</strong>
      </div>
      {meta ? <span>{meta}</span> : null}
    </div>
  );
}

function OfficeCharacteristicsView({
  snapshot,
  buildBonuses,
  onUpgrade,
  onBack,
}: {
  snapshot: OfficeSnapshot;
  buildBonuses: ReturnType<typeof getV6BuildBonuses>;
  onUpgrade: (skill: OfficeSkillKey) => void;
  onBack: () => void;
}) {
  const primary = [
    { key: 'competence' as const, icon: 'competence', name: 'Компетентность', text: 'Сложные задачи, обучение и логический урон.', bonus: buildBonuses.competence ?? 0 },
    { key: 'communication' as const, icon: 'communication', name: 'Коммуникация', text: 'Согласования, коллеги и социальный урон.', bonus: buildBonuses.communication ?? 0 },
    { key: 'drive' as const, icon: 'drive', name: 'Напор', text: 'Давление, продажи и авторитетные ответы.', bonus: buildBonuses.drive ?? 0 },
  ];

  const derived = [
    ['productivity', 'Продуктивность', buildBonuses.productivity ?? 0, 'Сколько пользы приносит обычная работа.'],
    ['charisma', 'Харизма', buildBonuses.charisma ?? 0, 'Сила первого впечатления и социальных решений.'],
    ['authority', 'Авторитет', buildBonuses.authority ?? 0, 'Вес слова в переговорах и управлении.'],
    ['stressResist', 'Стрессоустойчивость', buildBonuses.stressResist ?? 0, 'Снижает негативный эффект тяжёлых событий.'],
    ['logicDamage', 'Логический урон', buildBonuses.logicDamage ?? 0, 'Урон боссам через аргументы и экспертизу.'],
    ['socialDamage', 'Социальный урон', buildBonuses.socialDamage ?? 0, 'Урон боссам через коммуникацию и связи.'],
    ['pressureDamage', 'Урон напором', buildBonuses.pressureDamage ?? 0, 'Урон боссам через давление и уверенность.'],
    ['incomeBonus', 'Доход', buildBonuses.incomeBonus ?? 0, 'Дополнительная прибыль от рабочих действий.'],
  ] as const;

  return (
    <section className="office-v67-dev-page office-v67-characteristics">
      <OfficeDevelopmentHeader
        eyebrow="Развитие персонажа"
        title="Характеристики"
        description="База прокачивается очками развития, зелёные значения приходят от одежды, техники, архетипа и рабочего места."
        onBack={onBack}
        aside={<div className="office-v67-point-bank"><span>Свободные очки</span><b>{snapshot.skillPoints}</b></div>}
      />

      <OfficeAlphaGoal
        icon="rating"
        label="Следующий шаг"
        title={snapshot.skillPoints > 0 ? `Распредели свободные очки: ${snapshot.skillPoints}` : 'Заработай новые очки развитием уровня'}
        meta={snapshot.skillPoints > 0 ? 'Выбор сразу меняет билд и урон по боссам' : `Текущий уровень: ${snapshot.level}`}
        tone={snapshot.skillPoints > 0 ? 'gold' : 'blue'}
      />

      <div className="office-v67-primary-grid">
        {primary.map((stat) => (
          <article key={stat.key}>
            <div className="office-v67-primary-icon"><OfficeIcon name={stat.icon} /></div>
            <div className="office-v67-primary-copy">
              <small>Основная характеристика</small>
              <h3>{stat.name}</h3>
              <p>{stat.text}</p>
              <div className="office-v67-stat-value">
                <strong>{snapshot.skills[stat.key]}</strong>
                {stat.bonus ? <em>+{stat.bonus} от билда</em> : <em>без бонусов</em>}
              </div>
            </div>
            <button type="button" disabled={snapshot.skillPoints <= 0} onClick={() => onUpgrade(stat.key)}>
              +1 <span>за очко</span>
            </button>
          </article>
        ))}
      </div>

      <div className="office-v68-build-direction">
        <div>
          <small>Сейчас сильнее всего</small>
          <strong>{
            snapshot.skills.competence >= snapshot.skills.communication && snapshot.skills.competence >= snapshot.skills.drive
              ? 'Экспертный путь'
              : snapshot.skills.communication >= snapshot.skills.drive
                ? 'Социальный путь'
                : 'Путь напора'
          }</strong>
        </div>
        <span>База: {snapshot.skills.competence + snapshot.skills.communication + snapshot.skills.drive} · Бонусы билда: +{
          (buildBonuses.competence ?? 0) + (buildBonuses.communication ?? 0) + (buildBonuses.drive ?? 0)
        }</span>
        <em>Очки лучше вкладывать под карьерную ветку и тип урона по боссам.</em>
      </div>

      <div className="office-v67-derived-wrap">
        <header><div><small>Производные параметры</small><h3>Что даёт твой текущий билд</h3></div><span>Эти значения меняются вместе с предметами и веткой развития</span></header>
        <div className="office-v67-derived-grid">
          {derived.map(([key, label, value, hint]) => (
            <article key={key}>
              <div><span>{label}</span><b>{value > 0 ? '+' : ''}{value}{key === 'incomeBonus' ? '%' : ''}</b></div>
              <p>{hint}</p>
              <i><em style={{ width: String(Math.min(100, Math.max(8, Number(value) * 9))) + '%' }} /></i>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function OfficeSkillsView({
  snapshot,
  buildBonuses,
  onBack,
}: {
  snapshot: OfficeSnapshot;
  buildBonuses: ReturnType<typeof getV6BuildBonuses>;
  onBack: () => void;
}) {
  const skills = [
    ['Excel без паники', 'work', snapshot.skills.competence, buildBonuses.productivity ?? 0, 'Работа', 'Быстрее закрывает обычные поручения.'],
    ['Аргументация', 'competence', snapshot.skills.competence, buildBonuses.logicDamage ?? 0, 'Боссы', 'Усиливает логические ответы на испытаниях.'],
    ['Созвоны без боли', 'communication', snapshot.skills.communication, buildBonuses.socialDamage ?? 0, 'Коллеги', 'Повышает силу социальных решений.'],
    ['Офисная дипломатия', 'approve', snapshot.skills.communication, buildBonuses.reputation ?? 0, 'Репутация', 'Помогает выходить из конфликтов с выгодой.'],
    ['Уверенная подача', 'drive', snapshot.skills.drive, buildBonuses.pressureDamage ?? 0, 'Напор', 'Усиливает давление и переговоры о выгоде.'],
    ['Личная эффективность', 'energy', snapshot.level, buildBonuses.energyRecovery ?? 0, 'Энергия', 'Связывает уровень, комфорт и восстановление энергии.'],
  ] as const;

  return (
    <section className="office-v67-dev-page office-v67-skills">
      <OfficeDevelopmentHeader
        eyebrow="Развитие персонажа"
        title="Навыки"
        description="Навыки — это не ещё одна валюта. Они показывают, во что превращаются твои характеристики и предметы в реальных офисных ситуациях."
        onBack={onBack}
      />

      <OfficeAlphaGoal
        icon="training"
        label="Фокус развития"
        title={
          snapshot.skills.competence >= snapshot.skills.communication && snapshot.skills.competence >= snapshot.skills.drive
            ? 'Сильная сторона: технические задачи'
            : snapshot.skills.communication >= snapshot.skills.drive
              ? 'Сильная сторона: переговоры и коллеги'
              : 'Сильная сторона: давление и продажи'
        }
        meta="Навыки растут через задачи, предметы и основные характеристики"
        tone="blue"
      />

      <div className="office-v68-skills-layout">
        <div className="office-v67-skill-board">
          {skills.map(([name, icon, base, bonus, use, description], index) => {
            const level = Math.max(1, Math.floor(Number(base) / 2) + Math.floor(Number(bonus) / 2));
            return (
              <article key={name} className={index < 3 ? 'core' : ''}>
                <div className="office-v67-skill-badge"><OfficeIcon name={icon} /><span>{String(level).padStart(2, '0')}</span></div>
                <div>
                  <small>{use}</small>
                  <h3>{name}</h3>
                  <p>{description}</p>
                  <div className="office-v67-skill-source">
                    <span>База {base}</span><span>Билд +{bonus}</span>
                  </div>
                </div>
                <i><em style={{ width: String(Math.min(100, level * 9)) + '%' }} /></i>
              </article>
            );
          })}
        </div>

        <aside className="office-v68-skill-focus">
          <small>Как развиваться быстрее</small>
          <h3>Свяжи навык с действием</h3>
          <div>
            <OfficeIcon name="task" />
            <span><b>Задачи</b><em>дают практику и деньги</em></span>
          </div>
          <div>
            <OfficeIcon name="rating" />
            <span><b>Характеристики</b><em>задают базовую силу навыка</em></span>
          </div>
          <div>
            <OfficeIcon name="inventory" />
            <span><b>Предметы</b><em>дают специализацию и синергии</em></span>
          </div>
          <footer>
            <strong>Текущий профиль</strong>
            <span>Комп. {snapshot.skills.competence} · Комм. {snapshot.skills.communication} · Напор {snapshot.skills.drive}</span>
          </footer>
        </aside>
      </div>

      <div className="office-v67-skill-note">
        <OfficeIcon name="training" />
        <div><strong>Навыки растут через действия</strong><span>Задачи дают практику, характеристики задают основу, а предметы и таланты усиливают конкретный стиль.</span></div>
      </div>
    </section>
  );
}

function OfficeTalentsView({
  snapshot,
  v6,
  onCareer,
  onBack,
}: {
  snapshot: OfficeSnapshot;
  v6: V6State;
  onCareer: () => void;
  onBack: () => void;
}) {
  const branches = [
    {
      id: 'expert' as const,
      title: 'Эксперт',
      icon: 'competence',
      description: 'Техника, сложные задачи и логический урон.',
      talents: [
        ['Чистая логика', 3, '+5% логический урон'],
        ['Рабочая станция', 6, 'техника даёт больше продуктивности'],
        ['Глубокая экспертиза', 10, '+1 компетентность от премиум-техники'],
      ],
    },
    {
      id: 'management' as const,
      title: 'Управление',
      icon: 'communication',
      description: 'Авторитет, люди и статус рабочего места.',
      talents: [
        ['Собрать созвон', 3, '+5% социальный урон'],
        ['Вес слова', 6, 'одежда сильнее повышает репутацию'],
        ['Руководительская аура', 10, '+2 авторитет в босс-файтах'],
      ],
    },
    {
      id: 'sales' as const,
      title: 'Продажи',
      icon: 'drive',
      description: 'Напор, сделки, доход и имиджевые предметы.',
      talents: [
        ['Закрыть сделку', 3, '+5% доход с работы'],
        ['Дорогой вид', 6, 'аксессуары дают больше харизмы'],
        ['Дожать', 10, '+2 урон напором против боссов'],
      ],
    },
  ];

  return (
    <section className="office-v67-dev-page office-v67-talents">
      <OfficeDevelopmentHeader
        eyebrow="Развитие персонажа"
        title="Таланты"
        description="Таланты связывают карьерную ветку с боем, мебелью и экономикой. Здесь видно, ради чего имеет смысл идти по выбранному пути."
        onBack={onBack}
        aside={<button className="office-v67-head-link" type="button" onClick={onCareer}>Открыть дерево карьеры →</button>}
      />

      <OfficeAlphaGoal
        icon="career"
        label="Карьерный фокус"
        title={
          v6.careerBranch === 'general'
            ? 'Выбери карьерную ветку'
            : snapshot.level < 3
              ? 'Следующий талант откроется на 3 уровне'
              : snapshot.level < 6
                ? 'Следующий талант откроется на 6 уровне'
                : snapshot.level < 10
                  ? 'Следующий талант откроется на 10 уровне'
                  : 'Основные таланты ветки открыты'
        }
        meta={v6.careerBranch === 'general' ? 'Эксперт · Управление · Продажи' : `Текущая ветка: ${v6.careerBranch === 'expert' ? 'Эксперт' : v6.careerBranch === 'management' ? 'Управление' : 'Продажи'}`}
        tone={v6.careerBranch === 'general' ? 'gold' : 'green'}
      />

      <div className="office-v67-talent-columns">
        {branches.map((branch) => {
          const active = v6.careerBranch === branch.id;
          return (
            <article key={branch.id} className={active ? 'active' : ''} data-branch={branch.id}>
              <header>
                <OfficeIcon name={branch.icon} />
                <div><small>{active ? 'Твоя ветка' : 'Альтернативная ветка'}</small><h3>{branch.title}</h3><p>{branch.description}</p></div>
              </header>
              <div className="office-v67-talent-list">
                {branch.talents.map(([name, level, effect], index) => {
                  const unlocked = active && snapshot.level >= Number(level);
                  return (
                    <div key={name} className={unlocked ? 'unlocked' : ''}>
                      <span>{index + 1}</span>
                      <div><b>{name}</b><small>{effect}</small></div>
                      <em>{unlocked ? 'Открыто' : 'ур. ' + level}</em>
                    </div>
                  );
                })}
              </div>
              <footer>{active ? 'Эта ветка усиливает текущий билд' : 'Выбор ветки делается в карьере'}</footer>
            </article>
          );
        })}
      </div>

      <div className="office-v69-talent-summary">
        <div>
          <small>Текущая ветка</small>
          <strong>{v6.careerBranch === 'general' ? 'Ещё не выбрана' : v6.careerBranch === 'expert' ? 'Эксперт' : v6.careerBranch === 'management' ? 'Управление' : 'Продажи'}</strong>
        </div>
        <div>
          <small>Следующая цель</small>
          <strong>{snapshot.level < 3 ? 'Достичь 3 уровня' : snapshot.level < 6 ? 'Открыть талант II' : snapshot.level < 10 ? 'Открыть талант III' : 'Усиливать синергии'}</strong>
        </div>
        <p>Таланты не покупаются отдельно: они открываются уровнем внутри выбранной карьерной ветки и усиливают предметы, задачи и босс-файты.</p>
      </div>
    </section>
  );
}

function OfficeInventoryView({
  v6,
  onBack,
}: {
  v6: V6State;
  onBack: () => void;
}) {
  const categories = Object.entries(v6CategoryMeta) as Array<[V6ItemCategory, (typeof v6CategoryMeta)[V6ItemCategory]]>;

  return (
    <section className="office-v67-dev-page office-v67-inventory">
      <OfficeDevelopmentHeader
        eyebrow="Развитие персонажа"
        title="Инвентарь"
        description="Только то, что уже принадлежит тебе. Покупка новых вещей остаётся в самом офисе — кликом по предметам комнаты."
        onBack={onBack}
        aside={<div className="office-v67-owned-counter"><span>Куплено</span><b>{v6.ownedItemIds.length}</b></div>}
      />

      <OfficeAlphaGoal
        icon="inventory"
        label="Коллекция"
        title={v6.ownedItemIds.length < 8 ? 'Улучшай рабочее место прямо из офиса' : 'Собирай предметы под свой билд'}
        meta={`Куплено ${v6.ownedItemIds.length} · установлено ${Object.values(v6.equipped).filter(Boolean).length}`}
        tone="green"
      />

      <div className="office-v68-inventory-summary">
        <div><OfficeIcon name="inventory" /><span>В коллекции</span><b>{v6.ownedItemIds.length}</b></div>
        <div><OfficeIcon name="star" /><span>Установлено</span><b>{Object.values(v6.equipped).filter(Boolean).length}</b></div>
        <p>Новые вещи покупаются не здесь: вернись в офис и нажми прямо на нужный предмет в комнате.</p>
      </div>

      <div className="office-v67-inventory-grid">
        {categories.map(([category, meta]) => {
          const owned = v6Items.filter((item) => item.category === category && v6.ownedItemIds.includes(item.id));
          const equippedId = v6.equipped[category];
          const equipped = v6Items.find((item) => item.id === equippedId);
          return (
            <article key={category}>
              <header><OfficeIcon name={meta.icon} /><div><small>{meta.label}</small><strong>{equipped?.name ?? 'Не установлено'}</strong></div><b>{owned.length}</b></header>
              <p>{meta.hint}</p>
              <div className="office-v67-inventory-items">
                {owned.slice(0, 4).map((item) => (
                  <span key={item.id} className={item.id === equippedId ? 'equipped' : ''}>
                    {item.name}<small>{item.id === equippedId ? 'установлено' : item.rarity}</small>
                  </span>
                ))}
                {owned.length === 0 ? <em>Пока пусто</em> : null}
                {owned.length > 4 ? <em>+ ещё {owned.length - 4}</em> : null}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function OfficeAchievementsView({
  snapshot,
  story,
  v6,
  onBack,
}: {
  snapshot: OfficeSnapshot;
  story: OfficeStoryState;
  v6: V6State;
  onBack: () => void;
}) {
  const achievements = [
    ['Первый день', 'task', story.completedEvents.length >= 3, story.completedEvents.length + '/3', 'Пройти три первых офисных события.'],
    ['Новая строчка в резюме', 'career', snapshot.role !== 'Стажёр', snapshot.role, 'Получить первое повышение.'],
    ['Свой человек', 'company', snapshot.reputation >= 30, snapshot.reputation + '/30', 'Набрать 30 репутации.'],
    ['Сергей Петрович', 'achievement', v6.bossResolved, v6.bossResolved ? 'пройден' : 'впереди', 'Пройти первое испытание руководителя.'],
    ['Обживаюсь', 'inventory', v6.ownedItemIds.length >= 10, v6.ownedItemIds.length + '/10', 'Собрать десять предметов.'],
    ['Не новичок', 'rating', snapshot.level >= 5, 'ур. ' + snapshot.level, 'Достичь пятого уровня.'],
  ] as const;

  const completed = achievements.filter(([, , done]) => done).length;
  const nextAchievement = achievements.find(([, , done]) => !done);

  return (
    <section className="office-v67-dev-page office-v67-achievements">
      <OfficeDevelopmentHeader
        eyebrow="Развитие персонажа"
        title="Достижения"
        description="Не отдельная работа, а след твоего прогресса: задачи, карьера, компании, боссы и коллекция."
        onBack={onBack}
        aside={<div className="office-v67-owned-counter"><span>Получено</span><b>{completed}/{achievements.length}</b></div>}
      />

      <OfficeAlphaGoal
        icon="achievement"
        label="Ближайшее достижение"
        title={nextAchievement ? nextAchievement[0] : 'Все текущие достижения собраны'}
        meta={nextAchievement ? nextAchievement[4] : 'Ждём следующий набор целей'}
        tone={nextAchievement ? 'gold' : 'green'}
      />

      <div className="office-v68-achievement-progress">
        <div><span>Общий прогресс</span><b>{completed}/{achievements.length}</b></div>
        <i><em style={{ width: String(completed / achievements.length * 100) + '%' }} /></i>
        <p>{completed === achievements.length ? 'Все текущие достижения собраны.' : 'Следующие награды приходят из разных частей игры — не нужно фармить один экран.'}</p>
      </div>

      <div className="office-v67-achievement-grid">
        {achievements.map(([title, icon, done, progress, description]) => (
          <article key={title} className={done ? 'done' : ''}>
            <div className="office-v67-achievement-icon"><OfficeIcon name={icon} /></div>
            <small>{done ? 'Получено' : 'В процессе'}</small>
            <h3>{title}</h3>
            <p>{description}</p>
            <footer><span>{progress}</span><b>{done ? '✓' : '...'}</b></footer>
          </article>
        ))}
      </div>
    </section>
  );
}

function OfficeEventsView({
  snapshot,
  story,
  onTasks,
  onBack,
}: {
  snapshot: OfficeSnapshot;
  story: OfficeStoryState;
  onTasks: () => void;
  onBack: () => void;
}) {
  const firstDayProgress = Math.min(3, story.completedEvents.length);

  return (
    <section className="office-v67-dev-page office-v67-events">
      <OfficeDevelopmentHeader
        eyebrow="Жизнь офиса"
        title="События"
        description="Здесь собирается то, что происходит вокруг работы: новости, ежедневные цели и короткие офисные истории."
        onBack={onBack}
        aside={<button className="office-v67-head-link" type="button" onClick={onTasks}>Перейти к задачам →</button>}
      />

      <OfficeAlphaGoal
        icon="mail"
        label="Сейчас в офисе"
        title={snapshot.daily.claimed ? 'Ежедневная цель выполнена' : `До ежедневной цели: ${Math.max(0, snapshot.daily.target - snapshot.daily.progress)}`}
        meta={firstDayProgress < 3 ? `История первого дня: ${firstDayProgress}/3` : 'История первого дня завершена'}
        tone={snapshot.daily.claimed ? 'green' : 'gold'}
      />

      <div className="office-v67-events-layout">
        <section className="office-v67-event-feed">
          <header><small>Лента офиса</small><h3>Сегодня</h3></header>
          {officeNews.map(([title, time, color], index) => (
            <article key={title}>
              <i className={'dot dot-' + color} />
              <div>
                <small>{time}</small>
                <strong>{title}</strong>
                <p>{index === 0 ? 'В компании меняется расклад сил. Событие влияет на будущие задачи и карьеру.' : index === 1 ? 'Небольшой повод восстановить мотивацию и отношения с коллегами.' : 'Комфорт офиса снова немного выше — рабочая среда влияет на эффективность.'}</p>
                <em>{index === 0 ? 'Ожидается новая цепочка задач' : index === 1 ? 'Социальное событие' : 'Бонус рабочего места'}</em>
              </div>
              <span>{index === 0 ? 'Компания' : index === 1 ? 'Коллеги' : 'Офис'}</span>
            </article>
          ))}
          <footer className="office-v69-event-next">
            <OfficeIcon name="mail" />
            <div>
              <small>Что важно сейчас</small>
              <strong>{snapshot.daily.claimed ? 'Ежедневная цель закрыта' : `До ежедневной цели: ${Math.max(0, snapshot.daily.target - snapshot.daily.progress)}`}</strong>
            </div>
            <button type="button" onClick={onTasks}>К задачам →</button>
          </footer>
        </section>

        <aside className="office-v67-event-goals">
          <article className={snapshot.daily.claimed ? 'done' : ''}>
            <small>Ежедневная цель</small>
            <h3>{snapshot.daily.title}</h3>
            <div><i><em style={{ width: String(Math.min(100, snapshot.daily.progress / snapshot.daily.target * 100)) + '%' }} /></i><b>{snapshot.daily.progress}/{snapshot.daily.target}</b></div>
            <p>Награда: {snapshot.daily.moneyReward} ₽ · мотивация +{snapshot.daily.motivationReward}</p>
          </article>
          <article className={firstDayProgress >= 3 ? 'done' : ''}>
            <small>История</small>
            <h3>Первый день</h3>
            <div><i><em style={{ width: String(firstDayProgress / 3 * 100) + '%' }} /></i><b>{firstDayProgress}/3</b></div>
            <p>После первых историй офис переходит в обычный игровой цикл.</p>
          </article>
          <button type="button" onClick={onTasks}>Открыть задачи</button>
        </aside>
      </div>
    </section>
  );
}

function OfficeTasksView(props: {
  snapshot: OfficeSnapshot;
  story: OfficeStoryState;
  buildBonuses: ReturnType<typeof getV6BuildBonuses>;
  activeAction: string | null;
  onAction: (id: (typeof officeActions)[number]['id']) => void;
  onBack: () => void;
}) {
  const { snapshot, story, buildBonuses, activeAction, onAction, onBack } = props;
  const taskMeta = {
    work: {
      cost: 1,
      reward: 'Деньги · XP',
      stat: 'Продуктивность +' + String(buildBonuses.productivity ?? 0),
      description: 'Письма, таблицы, баги и обычные поручения. Основной источник денег и прогресса дня.',
    },
    approve: {
      cost: 1,
      reward: 'Репутация +2 · XP',
      stat: 'Коммуникация ' + String(snapshot.skills.communication),
      description: 'Согласуй документ или договорись с коллегами. Социальный билд и аксессуары помогают.',
    },
    learn: {
      cost: 2,
      reward: 'Компетентность +1 · XP',
      stat: 'Компетентность +' + String(buildBonuses.competence ?? 0),
      description: 'Разбирайся в инструментах и прокачивай техническую часть персонажа.',
    },
    prank: {
      cost: 0,
      reward: 'Мотивация / риск',
      stat: 'Стресс-защита +' + String(buildBonuses.stressResist ?? 0),
      description: 'Офисные шалости и короткие события. Иногда помогают выдохнуть, иногда создают проблемы.',
    },
  } satisfies Record<(typeof officeActions)[number]['id'], { cost: number; reward: string; stat: string; description: string }>;

  return (
    <section className="office-v65-screen office-v65-tasks">
      <header className="office-v65-screen-head">
        <div>
          <small>Рабочий стол</small>
          <h2>Задачи</h2>
          <p>Энергия тратится только здесь. Экипировка и билд меняют награды и эффективность.</p>
        </div>
        <button type="button" onClick={onBack}>← Вернуться в офис</button>
      </header>

      <OfficeAlphaGoal
        icon="task"
        label="Что делать сейчас"
        title={snapshot.daily.claimed ? 'Дневная цель закрыта — работай на карьеру' : `Закрой ещё ${Math.max(0, snapshot.daily.target - snapshot.daily.progress)} задач для дневной цели`}
        meta={snapshot.energy > 0 ? `Доступно энергии: ${snapshot.energy}` : 'Энергия закончилась — можно открыть события'}
        tone={snapshot.energy > 0 ? 'green' : 'red'}
      />

      <div className="office-v65-task-summary">
        <div><OfficeIcon name="energy" /><span>Энергия</span><b>{snapshot.energy}/{snapshot.maxEnergy}</b></div>
        <div><OfficeIcon name="task" /><span>Первый день</span><b>{story.completedEvents.length}/3</b></div>
        <div><OfficeIcon name="cash" /><span>Деньги</span><b>{formatMoney(snapshot.money)} ₽</b></div>
        <div><OfficeIcon name="reputation" /><span>Репутация</span><b>{snapshot.reputation}</b></div>
      </div>

      <div className="office-v65-task-grid">
        {officeActions.map((task) => {
          const meta = taskMeta[task.id];
          const blocked = activeAction !== null || snapshot.energy < meta.cost;
          return (
            <article key={task.id} className={'office-v65-task-card tone-' + task.tone}>
              <div className="office-v65-task-icon"><OfficeIcon name={task.icon} /></div>
              <div className="office-v65-task-copy">
                <small>{task.id === 'work' ? 'Основная задача' : task.id === 'learn' ? 'Развитие' : task.id === 'approve' ? 'Коммуникация' : 'Событие'}</small>
                <h3>{task.title}</h3>
                <p>{meta.description}</p>
                <div className="office-v65-task-tags"><span>{meta.stat}</span><span>{meta.reward}</span></div>
              </div>
              <div className="office-v65-task-action">
                <div><span>Стоимость</span><b>{meta.cost ? '⚡ ' + String(meta.cost) : 'Без энергии'}</b></div>
                <button type="button" disabled={blocked} onClick={() => onAction(task.id)}>
                  {blocked && meta.cost ? 'Не хватает энергии' : task.id === 'prank' ? 'Открыть события' : 'Выполнить'}
                </button>
              </div>
            </article>
          );
        })}
      </div>

      <div className="office-v65-task-foot">
        <div><strong>Предметы участвуют в задачах</strong><span>ПК и монитор усиливают продуктивность, одежда и аксессуары — социальные задачи, кресло и свет помогают переживать стресс.</span></div>
        <button type="button" onClick={onBack}>Проверить рабочее место →</button>
      </div>
    </section>
  );
}

function OfficeBossesView(props: {
  snapshot: OfficeSnapshot;
  v6: V6State;
  bossUnlocked: boolean;
  firstAssignmentDone: boolean;
  onFight: () => void;
  onBack: () => void;
}) {
  const { snapshot, v6, bossUnlocked, firstAssignmentDone, onFight, onBack } = props;
  const boss = v6Bosses[0];
  const bossBonuses = getV6BuildBonuses(v6);
  const bossDamage = {
    logic: getBossDamage('logic', { skills: snapshot.skills, bonuses: bossBonuses, branch: v6.careerBranch, boss }),
    social: getBossDamage('social', { skills: snapshot.skills, bonuses: bossBonuses, branch: v6.careerBranch, boss }),
    pressure: getBossDamage('pressure', { skills: snapshot.skills, bonuses: bossBonuses, branch: v6.careerBranch, boss }),
  };
  const bestBossApproach =
    bossDamage.logic >= bossDamage.social && bossDamage.logic >= bossDamage.pressure
      ? 'Логика'
      : bossDamage.social >= bossDamage.pressure
        ? 'Переговоры'
        : 'Напор';
  const futureBosses = [
    ['HR-партнёр', 'Испытание коммуникации', 'после альфы'],
    ['Директор направления', 'Испытание авторитета', 'после альфы'],
    ['Генеральный директор', 'Финальная защита результата', 'после альфы'],
  ] as const;

  return (
    <section className="office-v65-screen office-v65-bosses">
      <header className="office-v65-screen-head">
        <div>
          <small>Испытания</small>
          <h2>Боссы</h2>
          <p>Руководители проверяют разные части билда. Карьера и экипировка определяют лучший способ пройти встречу.</p>
        </div>
        <button type="button" onClick={onBack}>← Вернуться в офис</button>
      </header>

      <OfficeAlphaGoal
        icon="achievement"
        label="Испытание"
        title={v6.bossResolved || firstAssignmentDone ? 'Сергей Петрович пройден' : bossUnlocked ? `Лучший подход сейчас: ${bestBossApproach}` : 'Подготовься к первому боссу'}
        meta={bossUnlocked ? `Прогноз урона: логика ${bossDamage.logic} · переговоры ${bossDamage.social} · напор ${bossDamage.pressure}` : 'Откроется после 3 задач или на 3 уровне'}
        tone={v6.bossResolved || firstAssignmentDone ? 'green' : bossUnlocked ? 'red' : 'gold'}
      />

      <div className="office-v65-boss-layout">
        <article className={'office-v65-current-boss ' + (firstAssignmentDone || v6.bossResolved ? 'is-complete' : '')}>
          <div className="office-v65-boss-portrait">
            <img src="/games/office/boss.svg" alt="" />
            <span>{firstAssignmentDone || v6.bossResolved ? 'Пройден' : bossUnlocked ? 'Доступен' : 'Закрыт'}</span>
          </div>

          <div className="office-v65-boss-copy">
            <small>Первое карьерное испытание</small>
            <h3>{boss.name}</h3>
            <p>{boss.title}. Он проверяет, умеешь ли ты не только работать, но и защищать результат.</p>

            <div className="office-v65-boss-hp">
              <div><span>Терпение босса</span><b>{v6.bossHp}/{boss.maxHp}</b></div>
              <i><em style={{ width: String(Math.max(0, Math.min(100, v6.bossHp / boss.maxHp * 100))) + '%' }} /></i>
            </div>

            <div className="office-v65-boss-styles">
              <div className={bestBossApproach === 'Логика' ? 'best' : ''}><OfficeIcon name="competence" /><span>Логика</span><b>{bossDamage.logic} урона</b></div>
              <div className={bestBossApproach === 'Переговоры' ? 'best' : ''}><OfficeIcon name="communication" /><span>Переговоры</span><b>{bossDamage.social} урона</b></div>
              <div className={bestBossApproach === 'Напор' ? 'best' : ''}><OfficeIcon name="drive" /><span>Напор</span><b>{bossDamage.pressure} урона</b></div>
            </div>

            <div className="office-v68-boss-advice">
              <span>Твой лучший подход сейчас</span>
              <strong>{bestBossApproach}</strong>
              <em>Комп. {snapshot.skills.competence + (getV6BuildBonuses(v6).competence ?? 0)} · Комм. {snapshot.skills.communication + (getV6BuildBonuses(v6).communication ?? 0)} · Напор {snapshot.skills.drive + (getV6BuildBonuses(v6).drive ?? 0)}</em>
            </div>

            <div className="office-v65-boss-reward">
              <span>Награда</span><b>+{formatMoney(boss.rewardMoney)} ₽</b><b>+{boss.rewardXp} XP</b><b>реп. +{boss.rewardReputation}</b>
            </div>

            <button type="button" disabled={!bossUnlocked || firstAssignmentDone || v6.bossResolved} onClick={onFight}>
              {firstAssignmentDone || v6.bossResolved ? 'Испытание пройдено' : bossUnlocked ? 'Начать переговоры' : 'Откроется после 3 задач или на 3 уровне'}
            </button>
          </div>
        </article>

        <aside className="office-v65-boss-road">
          <div className="office-alpha-roadmap-head">
            <h3>Карьерные испытания</h3>
            <span>Roadmap после главы 1</span>
          </div>
          <div className="office-v65-boss-road-item current"><span>01</span><div><b>{boss.name}</b><small>Руководитель отдела</small></div><em>{snapshot.level >= 3 ? 'сейчас' : 'ур. 3'}</em></div>
          {futureBosses.map(([name, description, requirement], index) => (
            <div className="office-v65-boss-road-item locked" key={name}>
              <span>{'0' + String(index + 2)}</span><div><b>{name}</b><small>{description}</small></div><em>{requirement}</em>
            </div>
          ))}
        </aside>
      </div>
    </section>
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
