'use client';

import { useMemo, useRef, useState, type ReactNode } from 'react';
import { formatMoney, type OfficeSnapshot } from './office-data';
import {
  branchLabel,
  getBossDamage,
  getV6BuildBonuses,
  getV6Item,
  getV6ItemsByCategory,
  v6Archetypes,
  v6BonusLabels,
  v6CareerAvailable,
  v6CareerNodes,
  v6CategoryMeta,
  v6Companies,
  v6GenderProfiles,
  v6ItemLockReason,
  v6Bosses,
  type V6ArchetypeId,
  type V6BonusKey,
  type V6Bonuses,
  type V6CareerBranch,
  type V6Gender,
  type V6Item,
  type V6ItemCategory,
  type V6State,
} from './office-v6-system';

export function V6Icon({ name }: { name: string }) {
  return (
    <svg className="office-icon" aria-hidden="true">
      <use href={`/games/office/ui-icons.svg#${name}`} />
    </svg>
  );
}

export function EquipmentDock({
  state,
  activeCategory,
  onOpen,
}: {
  state: V6State;
  activeCategory?: V6ItemCategory | null;
  onOpen: (category: V6ItemCategory) => void;
}) {
  const categories = Object.keys(v6CategoryMeta) as V6ItemCategory[];

  return (
    <section className="office-v6-equipment">
      <div className="office-bottom-title">
        Рабочее место и персонаж
        <span>Нажми на слот, чтобы выбрать предмет</span>
      </div>
      <div className="office-v6-equipment-grid">
        {categories.map((category) => {
          const meta = v6CategoryMeta[category];
          const equipped = getV6Item(state.equipped[category]);
          return (
            <button
              type="button"
              key={category}
              data-category={category}
              onClick={() => onOpen(category)}
              className={`office-v6-equipment-slot ${activeCategory === category ? 'is-open' : ''}`}
            >
              <small>{meta.label}</small>
              <V6Icon name={meta.icon} />
              <strong>{equipped?.name ?? 'Пусто'}</strong>
              <em>{equipped?.rarity ?? meta.hint}</em>
            </button>
          );
        })}
      </div>
    </section>
  );
}

type ItemFilter = 'all' | 'available' | 'owned' | 'locked';

export function EquipmentDrawer({
  category,
  state,
  level,
  reputation,
  money,
  onClose,
  onBuy,
  onEquip,
}: {
  category: V6ItemCategory | null;
  state: V6State;
  level: number;
  reputation: number;
  money: number;
  onClose: () => void;
  onBuy: (item: V6Item) => void;
  onEquip: (item: V6Item) => void;
}) {
  const [filter, setFilter] = useState<ItemFilter>('all');
  const [sort, setSort] = useState<'level' | 'price' | 'power'>('level');
  const items = useMemo(() => {
    if (!category) return [];
    const source = getV6ItemsByCategory(category).filter((item) => {
      const locked = Boolean(v6ItemLockReason(item, { level, reputation, state }));
      const owned = state.ownedItemIds.includes(item.id);
      if (filter === 'available') return !locked && !owned;
      if (filter === 'owned') return owned;
      if (filter === 'locked') return locked;
      return true;
    });

    return [...source].sort((a, b) => {
      if (sort === 'price') return a.price - b.price;
      if (sort === 'power') return bonusPower(b.bonuses) - bonusPower(a.bonuses);
      return a.level - b.level || a.price - b.price;
    });
  }, [category, filter, level, reputation, sort, state]);

  if (!category) return null;
  const meta = v6CategoryMeta[category];

  return (
    <section className="office-v6-drawer" aria-label={`Выбор: ${meta.label}`}>
      <header>
        <div className="office-v6-drawer-title">
          <V6Icon name={meta.icon} />
          <div>
            <small>Категория</small>
            <h3>{meta.label}</h3>
            <p>{meta.hint}</p>
          </div>
        </div>
        <div className="office-v6-drawer-controls">
          <div className="office-v6-filter">
            {([
              ['all', 'Все'],
              ['available', 'Можно купить'],
              ['owned', 'Куплено'],
              ['locked', 'Закрыто'],
            ] as const).map(([id, label]) => (
              <button type="button" className={filter === id ? 'active' : ''} key={id} onClick={() => setFilter(id)}>
                {label}
              </button>
            ))}
          </div>
          <select value={sort} onChange={(event) => setSort(event.target.value as typeof sort)}>
            <option value="level">По уровню</option>
            <option value="price">По цене</option>
            <option value="power">По силе</option>
          </select>
          <button type="button" className="office-v6-drawer-close" onClick={onClose}>×</button>
        </div>
      </header>

      <div
        className="office-v6-item-list"
        onWheel={(event) => {
          if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
          event.preventDefault();
          event.currentTarget.scrollLeft += event.deltaY;
        }}
      >
        {items.map((item) => {
          const lockReason = v6ItemLockReason(item, { level, reputation, state });
          const owned = state.ownedItemIds.includes(item.id);
          const equipped = state.equipped[item.category] === item.id;
          const affordable = money >= item.price;
          return (
            <article
              key={item.id}
              className={[
                'office-v6-item-card',
                equipped ? 'is-equipped' : '',
                lockReason ? 'is-locked' : '',
              ].filter(Boolean).join(' ')}
              data-rarity={item.rarity}
              data-category={item.category}
            >
              <div className="office-v6-item-visual" data-rarity={item.rarity}>
                <V6Icon name={item.icon} />
                <span>{item.visual}</span>
              </div>
              <div className="office-v6-item-copy">
                <div className="office-v6-item-head">
                  <small>{item.rarity} · ур. {item.level}</small>
                  {equipped ? <b>Установлено</b> : null}
                </div>
                <strong>{item.name}</strong>
                <p>{item.description}</p>
                <BonusChips bonuses={item.bonuses} />
              </div>
              <div className="office-v6-item-buy">
                {lockReason ? (
                  <>
                    <small>Недоступно</small>
                    <b>{lockReason}</b>
                    <button type="button" disabled>Закрыто</button>
                  </>
                ) : owned ? (
                  <>
                    <small>В коллекции</small>
                    <b>{item.price === 0 ? 'Стартовый' : formatMoney(item.price) + ' ₽'}</b>
                    <button type="button" disabled={equipped} onClick={() => onEquip(item)}>
                      {equipped ? 'Установлено' : 'Установить'}
                    </button>
                  </>
                ) : (
                  <>
                    <small>Цена</small>
                    <b>{formatMoney(item.price)} ₽</b>
                    <button type="button" disabled={!affordable} onClick={() => onBuy(item)}>
                      {affordable ? 'Купить' : 'Не хватает денег'}
                    </button>
                  </>
                )}
              </div>
            </article>
          );
        })}
        {items.length === 0 ? <div className="office-v6-empty">В этом фильтре предметов пока нет.</div> : null}
      </div>
    </section>
  );
}

function bonusPower(bonuses: V6Bonuses) {
  return Object.values(bonuses).reduce((sum, value) => sum + Math.abs(value ?? 0), 0);
}

export function BonusChips({ bonuses }: { bonuses: V6Bonuses }) {
  const entries = Object.entries(bonuses) as Array<[V6BonusKey, number]>;
  return (
    <div className="office-v6-bonus-chips">
      {entries.map(([key, value]) => (
        <span key={key}>
          {v6BonusLabels[key]} <b>{value > 0 ? '+' : ''}{value}{key === 'incomeBonus' || key === 'workSuccess' ? '%' : ''}</b>
        </span>
      ))}
    </div>
  );
}

export function V6CharacterView({
  state,
  snapshot,
  onGender,
  onArchetype,
  onBack,
}: {
  state: V6State;
  snapshot: OfficeSnapshot;
  onGender: (gender: V6Gender) => void;
  onArchetype: (archetype: V6ArchetypeId) => void;
  onBack: () => void;
}) {
  const build = getV6BuildBonuses(state);
  const activeArchetype =
    v6Archetypes.find((item) => item.id === state.archetypeId) ?? v6Archetypes[0];
  const equippedCategories: V6ItemCategory[] = ['clothes', 'accessory', 'pc', 'desk', 'chair', 'monitor'];
  const equippedItems = equippedCategories
    .map((category) => ({ category, item: getV6Item(state.equipped[category]) }))
    .filter((entry): entry is { category: V6ItemCategory; item: V6Item } => Boolean(entry.item));
  const strongestBonuses = (Object.entries(build) as Array<[V6BonusKey, number]>)
    .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]))
    .slice(0, 6);
  const missingEquipment = Math.max(0, equippedCategories.length - equippedItems.length);
  const playstyleHint =
    activeArchetype.preferredBranch === 'expert'
      ? 'Техника, сложные задачи и логика против боссов'
      : activeArchetype.preferredBranch === 'management'
        ? 'Переговоры, репутация и социальные решения'
        : 'Доход, напор и агрессивные карьерные сделки';

  return (
    <section className="office-v6-page office-v6-character office-v64-character">
      <PageHeader eyebrow="Персонаж" title="Собери свой офисный билд" onBack={onBack}>
        Здесь должен читаться сам герой, а не меню настроек. Выбирай основу персонажа и архетип,
        а одежда, аксессуары и рабочее место дальше усиливают выбранный стиль.
      </PageHeader>

      <div className="office-v610-next-goal tone-blue">
        <V6Icon name="character" />
        <div>
          <small>Твой билд</small>
          <strong>{activeArchetype.name} · {branchLabel(activeArchetype.preferredBranch)}</strong>
        </div>
        <span>{missingEquipment > 0 ? `Свободных ключевых слотов: ${missingEquipment}` : playstyleHint}</span>
      </div>

      <div className="office-v64-character-layout">
        <section className="office-v64-character-stage">
          <div className="office-v64-character-room" aria-hidden="true">
            <span className="wall-line wall-line-a" />
            <span className="wall-line wall-line-b" />
            <span className="room-window" />
            <span className="room-desk" />
            <span className="room-monitor" />
            <span className="room-mug" />
          </div>

          <div className="office-v64-character-avatar">
            <img src="/games/office/avatar.svg" alt="" />
            <span className="office-v64-character-level">ур. {snapshot.level}</span>
          </div>

          <div className="office-v64-character-identity">
            <small>{snapshot.role}</small>
            <h3>{snapshot.playerName}</h3>
            <span>{activeArchetype.name} · {branchLabel(activeArchetype.preferredBranch)}</span>
          </div>

          <div className="office-v64-character-loadout">
            {equippedItems.map(({ category, item }) => (
              <div className="office-v64-loadout-slot" key={category}>
                <V6Icon name={v6CategoryMeta[category].icon} />
                <div>
                  <small>{v6CategoryMeta[category].label}</small>
                  <strong>{item.name}</strong>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="office-v64-character-build">
          <div className="office-v64-build-head">
            <div>
              <small>Текущий стиль</small>
              <h3>{activeArchetype.name}</h3>
              <p>{activeArchetype.description}</p>
            </div>
            <div className="office-v64-build-score">
              <span>Сила билда</span>
              <strong>{strongestBonuses.reduce((sum, [, value]) => sum + Math.max(0, value), 0)}</strong>
            </div>
          </div>

          <div className="office-v64-build-stats">
            {strongestBonuses.map(([key, value]) => (
              <div key={key}>
                <span>{v6BonusLabels[key]}</span>
                <b>{value > 0 ? '+' : ''}{value}{key === 'incomeBonus' || key === 'workSuccess' ? '%' : ''}</b>
              </div>
            ))}
          </div>

          <div className="office-v64-character-choice">
            <header>
              <div><small>Основа персонажа</small><strong>Синергии</strong></div>
              <span>Общая сила сбалансирована</span>
            </header>
            <div className="office-v64-gender-pills">
              {v6GenderProfiles.map((profile) => (
                <button
                  type="button"
                  key={profile.id}
                  className={state.gender === profile.id ? 'active' : ''}
                  onClick={() => onGender(profile.id)}
                >
                  <V6Icon name={profile.id === 'female' ? 'character-female' : 'character'} />
                  <span>
                    <strong>{profile.name}</strong>
                    <small>{profile.affinity}</small>
                  </span>
                  <i>{state.gender === profile.id ? 'Выбрано' : 'Выбрать'}</i>
                </button>
              ))}
            </div>
          </div>

          <div className="office-v64-archetypes">
            <header>
              <div><small>Архетип старта</small><strong>Как ты проходишь офис</strong></div>
              <span>Позже усиливается карьерной веткой</span>
            </header>
            <div className="office-v64-archetype-grid">
              {v6Archetypes.map((archetype) => (
                <button
                  type="button"
                  key={archetype.id}
                  className={state.archetypeId === archetype.id ? 'active' : ''}
                  data-branch={archetype.preferredBranch}
                  onClick={() => onArchetype(archetype.id)}
                >
                  <small>{branchLabel(archetype.preferredBranch)}</small>
                  <strong>{archetype.name}</strong>
                  <em>{archetype.subtitle}</em>
                  <span className="office-v610-archetype-effect">{
                    archetype.preferredBranch === 'expert'
                      ? 'Техника + логический урон'
                      : archetype.preferredBranch === 'management'
                        ? 'Репутация + переговоры'
                        : 'Доход + напор'
                  }</span>
                  <BonusChips bonuses={archetype.bonuses} />
                </button>
              ))}
            </div>
          </div>

          <div className="office-v68-character-guidance">
            <div>
              <small>Сильная сторона</small>
              <strong>{strongestBonuses[0] ? v6BonusLabels[strongestBonuses[0][0]] : 'Базовый билд'}</strong>
            </div>
            <div>
              <small>Карьерная синергия</small>
              <strong>{branchLabel(activeArchetype.preferredBranch)}</strong>
            </div>
            <div>
              <small>Экипировано</small>
              <strong>{equippedItems.length}/{equippedCategories.length}</strong>
            </div>
            <p>Профиль — это сводка. Покупка одежды, техники и мебели остаётся в офисе через клики по объектам комнаты.</p>
          </div>

          <div className="office-v64-customize-note">
            <V6Icon name="clothes" />
            <div>
              <strong>Внешний вид меняется через экипировку</strong>
              <span>Одежда и аксессуары уже влияют на билд, репутацию и социальные бонусы персонажа.</span>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

export function V6CareerView({
  state,
  snapshot,
  onSelectBranch,
  onBack,
}: {
  state: V6State;
  snapshot: OfficeSnapshot;
  onSelectBranch: (branch: V6CareerBranch) => void;
  onBack: () => void;
}) {
  const build = getV6BuildBonuses(state);
  const [zoom, setZoom] = useState(0.82);
  const [pan, setPan] = useState({ x: 16, y: 4 });
  const [dragging, setDragging] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState('intern');
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    panX: number;
    panY: number;
  } | null>(null);

  const effectiveSkills = {
    competence: snapshot.skills.competence + (build.competence ?? 0),
    communication: snapshot.skills.communication + (build.communication ?? 0),
    drive: snapshot.skills.drive + (build.drive ?? 0),
  };
  const effectiveReputation = snapshot.reputation + (build.reputation ?? 0);
  const alphaChapterComplete = snapshot.role === 'Младший специалист' && state.bossResolved;
  const branchChoiceAvailable = false;

  const setClampedZoom = (value: number) => {
    setZoom(Math.min(1.55, Math.max(0.68, Math.round(value * 100) / 100)));
  };

  const resetView = () => {
    setZoom(0.82);
    setPan({ x: 16, y: 4 });
  };

  const branchCards: Array<{
    id: V6CareerBranch;
    damage: string;
    title: string;
    summary: string;
    rewards: string[];
  }> = [
    {
      id: 'expert',
      damage: 'Логический урон',
      title: 'Эксперт',
      summary: 'Техника, рабочие станции, сложные задачи и аргументация.',
      rewards: ['+18% урон логикой', 'ПК и мониторы ветки', 'Tech-офисы'],
    },
    {
      id: 'management',
      damage: 'Социальный урон',
      title: 'Управление',
      summary: 'Люди, авторитет, статусная мебель и руководящие кабинеты.',
      rewards: ['+18% соц. урон', 'Мебель руководителя', 'Авторитет'],
    },
    {
      id: 'sales',
      damage: 'Напор и доход',
      title: 'Продажи',
      summary: 'Сделки, статусные аксессуары, давление и денежные бонусы.',
      rewards: ['+18% урон напором', 'Имиджевые предметы', 'Доход'],
    },
  ];

  const getNodeState = (node: (typeof v6CareerNodes)[number]) => {
    const available = v6CareerAvailable(node, {
      level: snapshot.level,
      reputation: effectiveReputation,
      skills: effectiveSkills,
      branch: state.careerBranch,
    });
    const activeBranch =
      node.branch === 'general' ||
      state.careerBranch === 'general' ||
      state.careerBranch === node.branch;
    const current =
      node.title === snapshot.role ||
      (snapshot.role === 'Стажёр' && node.id === 'intern');

    return {
      available,
      activeBranch,
      current,
      status: current ? 'current' : available && activeBranch ? 'available' : 'locked',
      statusLabel: current ? 'Сейчас' : !activeBranch ? 'Другая ветка' : available ? 'Доступно' : 'Закрыто',
    } as const;
  };

  const selectedNode =
    v6CareerNodes.find((node) => node.id === selectedNodeId) ?? v6CareerNodes[0];
  const selectedState = getNodeState(selectedNode);
  const careerTarget =
    state.careerBranch === 'general'
      ? null
      : [...v6CareerNodes]
          .filter((node) => node.branch === 'general' || node.branch === state.careerBranch)
          .sort((a, b) => a.level - b.level || a.reputation - b.reputation)
          .find((node) => node.title !== snapshot.role && !getNodeState(node).current && (node.level > snapshot.level || node.reputation > effectiveReputation || !getNodeState(node).available));

  return (
    <section className="office-v6-page office-v6-career">
      <PageHeader eyebrow="Карьера" title="Большое дерево развития" onBack={onBack}>
        Первая альфа-глава заканчивается должностью «Младший специалист». Дальнейшие узлы показывают
        направление развития игры и требования будущих карьерных глав.
      </PageHeader>

      <div className={`office-v610-next-goal ${alphaChapterComplete ? 'tone-green' : 'tone-gold'}`}>
        <V6Icon name="career" />
        <div>
          <small>{alphaChapterComplete ? 'Альфа · Глава 1' : 'Цель первой главы'}</small>
          <strong>{alphaChapterComplete ? 'Первое повышение получено' : 'Дойди до «Младшего специалиста»'}</strong>
        </div>
        <span>{alphaChapterComplete ? 'Следующие ветки — roadmap следующих глав' : 'Босс · компетентность 5 · репутация 30'}</span>
      </div>

      <div className="office-v6-branch-pick" aria-label="Карьерные ветки следующих глав">
        {branchCards.map((branch) => (
          <button
            type="button"
            key={branch.id}
            className={[
              state.careerBranch === branch.id ? 'active' : '',
              !branchChoiceAvailable ? 'alpha-future' : '',
            ].filter(Boolean).join(' ')}
            data-branch={branch.id}
            disabled={!branchChoiceAvailable}
            onClick={() => onSelectBranch(branch.id)}
          >
            <small>{branch.damage}</small>
            <strong>{branch.title}</strong>
            <span>{branch.summary}</span>
            <div className="office-v6-branch-rewards">
              {branch.rewards.map((reward) => <b key={reward}>{reward}</b>)}
            </div>
            {!branchChoiceAvailable ? <em className="office-alpha-roadmap-label">Следующая глава</em> : null}
          </button>
        ))}
      </div>

      <div className="office-v68-career-summary">
        <div>
          <small>Текущая должность</small>
          <strong>{snapshot.role}</strong>
        </div>
        <div>
          <small>Выбранная ветка</small>
          <strong>{state.careerBranch === 'general' ? 'Откроется в следующей главе' : branchLabel(state.careerBranch)}</strong>
        </div>
        <div>
          <small>Эффективная репутация</small>
          <strong>{effectiveReputation}</strong>
        </div>
        <p>В альфе активен первый карьерный отрезок. Остальные узлы можно изучать как roadmap: требования, награды и будущие открытия уже видны.</p>
      </div>

      <div className="office-v6-career-toolbar">
        <div className="office-v6-career-zoom">
          <button type="button" aria-label="Уменьшить дерево" onClick={() => setClampedZoom(zoom - 0.1)}>−</button>
          <button type="button" className="reset" onClick={resetView}>{Math.round(zoom * 100)}%</button>
          <button type="button" aria-label="Увеличить дерево" onClick={() => setClampedZoom(zoom + 0.1)}>+</button>
        </div>
        <div className="office-v6-career-hint">
          <span>Колесо — масштаб</span>
          <span>Потяни фон — перемещение</span>
          <span>82% — подогнать дерево</span>
        </div>
        <div className="office-v6-career-legend">
          <span><i className="current" /> Сейчас</span>
          <span><i className="available" /> Доступно</span>
          <span><i className="locked" /> Закрыто</span>
        </div>
      </div>

      <div className="office-v6-career-stage">
        <div
          className={`office-v6-career-viewport ${dragging ? 'is-dragging' : ''}`}
          onWheel={(event) => {
            event.preventDefault();
            setClampedZoom(zoom + (event.deltaY < 0 ? 0.08 : -0.08));
          }}
          onPointerDown={(event) => {
            const target = event.target as HTMLElement;
            if (target.closest('.office-v6-career-node') || target.closest('button')) return;
            dragRef.current = {
              pointerId: event.pointerId,
              startX: event.clientX,
              startY: event.clientY,
              panX: pan.x,
              panY: pan.y,
            };
            event.currentTarget.setPointerCapture(event.pointerId);
            setDragging(true);
          }}
          onPointerMove={(event) => {
            const drag = dragRef.current;
            if (!drag || drag.pointerId !== event.pointerId) return;
            setPan({
              x: drag.panX + event.clientX - drag.startX,
              y: drag.panY + event.clientY - drag.startY,
            });
          }}
          onPointerUp={(event) => {
            if (dragRef.current?.pointerId !== event.pointerId) return;
            dragRef.current = null;
            setDragging(false);
            if (event.currentTarget.hasPointerCapture(event.pointerId)) {
              event.currentTarget.releasePointerCapture(event.pointerId);
            }
          }}
          onPointerCancel={() => {
            dragRef.current = null;
            setDragging(false);
          }}
        >
          <div
            className="office-v6-career-canvas"
            style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})` }}
          >
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              {v6CareerNodes.filter((node) => node.parent).map((node) => {
                const parent = v6CareerNodes.find((candidate) => candidate.id === node.parent);
                if (!parent) return null;
                const nodeState = getNodeState(node);
                const lineActive =
                  node.branch === 'general' ||
                  state.careerBranch === 'general' ||
                  state.careerBranch === node.branch;
                return (
                  <line
                    key={node.id}
                    className={[
                      'branch-' + node.branch,
                      lineActive ? 'is-path' : 'is-other-path',
                      nodeState.available || nodeState.current ? 'is-reached' : 'is-future',
                    ].join(' ')}
                    x1={parent.x}
                    y1={parent.y}
                    x2={node.x}
                    y2={node.y}
                  />
                );
              })}
            </svg>

            {v6CareerNodes.map((node) => {
              const nodeState = getNodeState(node);
              return (
                <article
                  key={node.id}
                  role="button"
                  tabIndex={0}
                  aria-label={`Подробнее: ${node.title}`}
                  onClick={() => setSelectedNodeId(node.id)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      setSelectedNodeId(node.id);
                    }
                  }}
                  className={[
                    'office-v6-career-node',
                    nodeState.status,
                    `branch-${node.branch}`,
                    !nodeState.activeBranch ? 'is-alternate' : '',
                    selectedNodeId === node.id ? 'is-selected' : '',
                  ].filter(Boolean).join(' ')}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                >
                  <div className="office-v6-career-node-top">
                    <small>{node.subtitle}</small>
                    <b className={`status status-${nodeState.status}`}>{nodeState.statusLabel}</b>
                  </div>
                  <strong>{node.title}</strong>

                  <div className="office-v6-career-node-meta">
                    <span>{formatMoney(node.salary)} ₽</span>
                    <em>ур. {node.level} · реп. {node.reputation}</em>
                  </div>

                  <div className="office-v610-career-node-foot">
                    <span>{node.branch === 'general' ? 'Общий путь' : branchLabel(node.branch)}</span>
                    <b>Подробнее →</b>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <aside className={`office-v6-career-detail branch-${selectedNode.branch}`}>
          <div className="office-v6-career-detail-head">
            <div>
              <small>{selectedNode.branch === 'general' ? 'Общий путь' : branchLabel(selectedNode.branch)}</small>
              <h3>{selectedNode.title}</h3>
              <p>{selectedNode.subtitle}</p>
            </div>
            <b className={`status status-${selectedState.status}`}>{selectedState.statusLabel}</b>
          </div>

          <div className="office-v6-career-detail-salary">
            <span>Зарплата</span>
            <strong>{formatMoney(selectedNode.salary)} ₽</strong>
          </div>

          <div className="office-v6-career-detail-section">
            <span>Требования</span>
            <div className="office-v6-career-detail-chips">
              <b>Уровень {selectedNode.level}</b>
              <b>Репутация {selectedNode.reputation}</b>
              {selectedNode.skill ? <b>{skillShort(selectedNode.skill)} {selectedNode.skillValue}</b> : null}
            </div>
          </div>

          <div className="office-v6-career-detail-section positive">
            <span>Что получишь</span>
            <ul>
              {careerBenefits(selectedNode.branch, selectedNode.id).map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </div>

          <div className="office-v6-career-detail-section unlocks">
            <span>Что откроется</span>
            <ul>
              {selectedNode.unlocks.map((unlock) => (
                <li key={unlock}>{unlock}</li>
              ))}
            </ul>
          </div>

          <div className="office-v6-career-detail-tip">
            {selectedState.current
              ? 'Это твоя текущая точка. Следующие должности открываются по требованиям.'
              : selectedState.available
                ? 'Требования выполнены: эту ступень можно использовать как следующую цель.'
                : selectedState.activeBranch
                  ? 'Прокачай требования этой ступени — она станет доступна.'
                  : 'Эта должность относится к другой карьерной ветке.'}
          </div>
        </aside>
      </div>
    </section>
  );
}

function careerBenefits(branch: V6CareerBranch, nodeId: string) {
  if (branch === 'expert') return ['Логика против боссов', 'Синергия техники'];
  if (branch === 'management') return ['Социальный урон', 'Авторитет и статус'];
  if (branch === 'sales') return ['Напор против боссов', 'Доход и влияние'];
  if (nodeId === 'specialist') return ['Выбор специализации', 'Новые варианты развития'];
  if (nodeId === 'junior') return ['Больше зарплата', 'Доступ к новым предметам'];
  return ['Базовая прогрессия', 'Рабочие возможности'];
}

function skillShort(skill: 'competence' | 'communication' | 'drive') {
  if (skill === 'competence') return 'Комп.';
  if (skill === 'communication') return 'Комм.';
  return 'Напор';
}

export function V6CompanyView({
  state,
  snapshot,
  onSwitch,
  onBack,
}: {
  state: V6State;
  snapshot: OfficeSnapshot;
  onSwitch: (companyId: string) => void;
  onBack: () => void;
}) {
  const activeIndex = Math.max(0, v6Companies.findIndex((company) => company.id === state.companyId));
  const nextCompany = v6Companies[activeIndex + 1];
  const nextCompanyMissing = nextCompany
    ? [
        snapshot.level < nextCompany.minLevel ? `уровень ${snapshot.level}/${nextCompany.minLevel}` : null,
        snapshot.reputation < nextCompany.minReputation ? `репутация ${snapshot.reputation}/${nextCompany.minReputation}` : null,
      ].filter(Boolean).join(' · ')
    : '';

  return (
    <section className="office-v6-page office-v6-companies office-v64-companies">
      <PageHeader eyebrow="Компании" title="Меняй офис вместе с карьерой" onBack={onBack}>
        Новая компания — это не просто множитель зарплаты. Меняются атмосфера офиса, доступные
        предметы, пассивный бонус и ощущение того, насколько далеко ты ушёл от первого стола.
      </PageHeader>

      <div className={`office-v610-next-goal ${nextCompany ? 'tone-blue' : 'tone-green'}`}>
        <V6Icon name="company" />
        <div>
          <small>Следующий офис</small>
          <strong>{nextCompany ? nextCompany.name : 'Ты дошёл до верхней ступени компаний'}</strong>
        </div>
        <span>{nextCompany ? (nextCompanyMissing || 'Можно переходить прямо сейчас') : 'Собственная компания открыта'}</span>
      </div>

      <div className="office-v64-company-progress" aria-label="Прогресс по компаниям">
        {v6Companies.map((company, index) => (
          <div
            key={company.id}
            className={[
              index < activeIndex ? 'passed' : '',
              index === activeIndex ? 'current' : '',
            ].filter(Boolean).join(' ')}
          >
            <i />
            <span>{index + 1}</span>
            {index < v6Companies.length - 1 ? <b /> : null}
          </div>
        ))}
      </div>

      <div className="office-v6-company-grid office-v64-company-grid">
        {v6Companies.map((company, index) => {
          const available = snapshot.level >= company.minLevel && snapshot.reputation >= company.minReputation;
          const active = state.companyId === company.id;
          const estimatedSalary = Math.round(35000 * company.salaryMultiplier / 1000) * 1000;
          const currentCompany = v6Companies[activeIndex] ?? v6Companies[0];
          const currentEstimatedSalary = Math.round(35000 * currentCompany.salaryMultiplier / 1000) * 1000;
          const salaryDelta = estimatedSalary - currentEstimatedSalary;
          return (
            <article
              key={company.id}
              data-company={company.id}
              className={[
                active ? 'active' : available ? 'available' : 'locked',
                index <= activeIndex ? 'reached' : '',
              ].filter(Boolean).join(' ')}
            >
              <div className="office-v64-company-scene" aria-hidden="true">
                <span className="scene-wall" />
                <span className="scene-window" />
                <span className="scene-desk" />
                <span className="scene-monitor" />
                <span className="scene-chair" />
                <span className="scene-plant" />
                <div className="scene-brand">
                  <V6Icon name="company" />
                  <b>{index + 1}</b>
                </div>
              </div>

              <div className="office-v64-company-copy">
                <div className="office-v64-company-title">
                  <div>
                    <small>{company.industry}</small>
                    <strong>{company.name}</strong>
                  </div>
                  <span className={active ? 'state-current' : available ? 'state-ready' : 'state-locked'}>{active ? 'Текущая' : available ? 'Можно перейти' : 'Пока закрыта'}</span>
                </div>
                <p>{company.description}</p>

                <div className="office-v64-company-metrics">
                  <div>
                    <small>Зарплата</small>
                    <b>≈ {formatMoney(estimatedSalary)} ₽</b>
                    {!active ? <em className={salaryDelta >= 0 ? 'positive' : 'negative'}>{salaryDelta >= 0 ? '+' : ''}{formatMoney(salaryDelta)} ₽ к текущей</em> : <em>текущая база</em>}
                  </div>
                  <div><small>Офис</small><b>{company.officeStyle}</b><em>{company.perk}</em></div>
                </div>

                <div className="office-v64-company-perk">
                  <V6Icon name="star" />
                  <div><small>Пассивный бонус</small><strong>{company.perk}</strong></div>
                </div>

                <div className="office-v64-company-requirements">
                  <span className={snapshot.level >= company.minLevel ? 'met' : ''}>ур. {snapshot.level}/{company.minLevel}</span>
                  <span className={snapshot.reputation >= company.minReputation ? 'met' : ''}>реп. {snapshot.reputation}/{company.minReputation}</span>
                  <span>доход ×{company.salaryMultiplier.toFixed(2)}</span>
                </div>
              </div>

              <button type="button" disabled={!available || active} onClick={() => onSwitch(company.id)}>
                {active
                  ? 'Ты работаешь здесь'
                  : available
                    ? 'Перейти в компанию'
                    : <>Откроется: ур. {company.minLevel} · реп. {company.minReputation}</>}
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}


export function V6BossBattle({
  state,
  snapshot,
  onAttack,
  onClose,
}: {
  state: V6State;
  snapshot: OfficeSnapshot;
  onAttack: (kind: 'logic' | 'social' | 'pressure', expected: number) => void;
  onClose: () => void;
}) {
  const boss = v6Bosses[0];
  const bonuses = getV6BuildBonuses(state);
  const kinds = [
    ['logic','Аргументировать','Компетентность','logicDamage'],
    ['social','Договориться','Коммуникация','socialDamage'],
    ['pressure','Надавить','Напор','pressureDamage'],
  ] as const;

  return (
    <div className="office-modal-backdrop">
      <section className="office-modal office-v6-boss-battle" role="dialog" aria-modal="true" aria-label="Босс: Сергей Петрович">
        <button type="button" className="office-modal-close" onClick={onClose}>×</button>
        <header>
          <img src="/games/office/boss.svg" alt="" />
          <div>
            <small>Офисный босс · слабость: логика</small>
            <h2>{boss.name}</h2>
            <b>{boss.title}</b>
            <blockquote>{boss.quote}</blockquote>
          </div>
        </header>

        <div className="office-v6-boss-health">
          <div><span>Терпение босса</span><b>{state.bossHp} / {boss.maxHp}</b></div>
          <div><i style={{ width: `${Math.max(0, state.bossHp / boss.maxHp * 100)}%` }} /></div>
        </div>

        <div className="office-v6-boss-build">
          <span>Твой стиль: <b>{branchLabel(state.careerBranch)}</b></span>
          <BonusChips bonuses={bonuses} />
        </div>

        <div className="office-v6-boss-actions">
          {kinds.map(([kind,label,skillLabel,bonusKey]) => {
            const damage = getBossDamage(kind, {
              skills: snapshot.skills,
              bonuses,
              branch: state.careerBranch,
              boss,
            });
            return (
              <button
                type="button"
                key={kind}
                disabled={snapshot.energy <= 0 || state.bossResolved}
                onClick={() => onAttack(kind, damage)}
              >
                <V6Icon name={kind === 'logic' ? 'competence' : kind === 'social' ? 'communication' : 'drive'} />
                <div><strong>{label}</strong><span>{skillLabel}</span></div>
                <b>−{damage}</b>
                <small>1 энергия · {v6BonusLabels[bonusKey as V6BonusKey]}</small>
              </button>
            );
          })}
        </div>

        <footer>
          <span>Награда за победу</span>
          <b>+{formatMoney(boss.rewardMoney)} ₽ · +{boss.rewardXp} XP · +{boss.rewardReputation} репутации</b>
        </footer>
      </section>
    </div>
  );
}

function PageHeader({
  eyebrow,
  title,
  onBack,
  children,
}: {
  eyebrow: string;
  title: string;
  onBack: () => void;
  children: ReactNode;
}) {
  return (
    <header className="office-v6-page-header">
      <div>
        <small>{eyebrow}</small>
        <h2>{title}</h2>
        <p>{children}</p>
      </div>
      <button type="button" onClick={onBack}>← Вернуться в офис</button>
    </header>
  );
}
