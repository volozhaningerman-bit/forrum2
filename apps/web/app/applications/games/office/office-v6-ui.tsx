'use client';

import { useMemo, useState, type ReactNode } from 'react';
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
  onOpen,
}: {
  state: V6State;
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
              className="office-v6-equipment-slot"
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

      <div className="office-v6-item-list">
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
  return (
    <section className="office-v6-page office-v6-character">
      <PageHeader eyebrow="Персонаж" title="Собери свой офисный билд" onBack={onBack}>
        Пол влияет на набор синергий и доступный гардероб, а архетип определяет стартовый стиль развития. Оба пути сбалансированы по общей силе.
      </PageHeader>

      <div className="office-v6-profile-summary">
        <div className="office-v6-character-preview">
          <img src="/games/office/avatar.svg" alt="" />
          <strong>{snapshot.playerName}</strong>
          <span>{snapshot.role} · ур. {snapshot.level}</span>
        </div>
        <div className="office-v6-build-panel">
          <small>Текущий билд</small>
          <h3>{v6Archetypes.find((item) => item.id === state.archetypeId)?.name}</h3>
          <BonusChips bonuses={build} />
        </div>
      </div>

      <div className="office-v6-section">
        <header><h3>Персонаж</h3><p>Разные синергии, одинаковый потолок силы.</p></header>
        <div className="office-v6-choice-grid office-v6-gender-grid">
          {v6GenderProfiles.map((profile) => (
            <button
              type="button"
              key={profile.id}
              className={state.gender === profile.id ? 'active' : ''}
              onClick={() => onGender(profile.id)}
            >
              <V6Icon name={profile.id === 'female' ? 'character-female' : 'character'} />
              <small>{profile.affinity}</small>
              <strong>{profile.name}</strong>
              <p>{profile.description}</p>
              <BonusChips bonuses={profile.bonuses} />
            </button>
          ))}
        </div>
      </div>

      <div className="office-v6-section">
        <header><h3>Архетип старта</h3><p>Позже ветка карьеры сможет усилить или изменить этот стиль.</p></header>
        <div className="office-v6-choice-grid office-v6-archetype-grid">
          {v6Archetypes.map((archetype) => (
            <button
              type="button"
              key={archetype.id}
              className={state.archetypeId === archetype.id ? 'active' : ''}
              onClick={() => onArchetype(archetype.id)}
            >
              <small>{branchLabel(archetype.preferredBranch)}</small>
              <strong>{archetype.name}</strong>
              <em>{archetype.subtitle}</em>
              <p>{archetype.description}</p>
              <BonusChips bonuses={archetype.bonuses} />
            </button>
          ))}
        </div>
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
  const effectiveSkills = {
    competence: snapshot.skills.competence + (build.competence ?? 0),
    communication: snapshot.skills.communication + (build.communication ?? 0),
    drive: snapshot.skills.drive + (build.drive ?? 0),
  };
  const effectiveReputation = snapshot.reputation + (build.reputation ?? 0);

  return (
    <section className="office-v6-page office-v6-career">
      <PageHeader eyebrow="Карьера" title="Большое дерево развития" onBack={onBack}>
        Ветка меняет доступ к мебели и технике, усиливает определённый тип урона по боссам и открывает собственные компании и события.
      </PageHeader>

      <div className="office-v6-branch-pick">
        {(['expert','management','sales'] as V6CareerBranch[]).map((branch) => (
          <button
            type="button"
            key={branch}
            className={state.careerBranch === branch ? 'active' : ''}
            onClick={() => onSelectBranch(branch)}
          >
            <small>{branch === 'expert' ? 'Логический урон' : branch === 'management' ? 'Социальный урон' : 'Напор и доход'}</small>
            <strong>{branchLabel(branch)}</strong>
            <span>{branch === 'expert' ? 'Техника и сложные задачи' : branch === 'management' ? 'Люди, авторитет и кабинет' : 'Сделки, аксессуары и давление'}</span>
          </button>
        ))}
      </div>

      <div className="office-v6-career-map">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {v6CareerNodes.filter((node) => node.parent).map((node) => {
            const parent = v6CareerNodes.find((candidate) => candidate.id === node.parent);
            if (!parent) return null;
            return <line key={node.id} x1={parent.x} y1={parent.y} x2={node.x} y2={node.y} />;
          })}
        </svg>
        {v6CareerNodes.map((node) => {
          const available = v6CareerAvailable(node, {
            level: snapshot.level,
            reputation: effectiveReputation,
            skills: effectiveSkills,
            branch: state.careerBranch,
          });
          const activeBranch = node.branch === 'general' || state.careerBranch === 'general' || state.careerBranch === node.branch;
          const current = node.title === snapshot.role || (snapshot.role === 'Стажёр' && node.id === 'intern');
          return (
            <article
              key={node.id}
              className={[
                'office-v6-career-node',
                current ? 'current' : '',
                available && activeBranch ? 'available' : 'locked',
                `branch-${node.branch}`,
              ].filter(Boolean).join(' ')}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
            >
              <small>{node.subtitle}</small>
              <strong>{node.title}</strong>
              <span>{formatMoney(node.salary)} ₽</span>
              <em>ур. {node.level} · реп. {node.reputation}{node.skill ? ` · ${skillShort(node.skill)} ${node.skillValue}` : ''}</em>
              <div>{node.unlocks.slice(0,2).map((unlock) => <b key={unlock}>{unlock}</b>)}</div>
            </article>
          );
        })}
      </div>
    </section>
  );
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
  return (
    <section className="office-v6-page office-v6-companies">
      <PageHeader eyebrow="Компании" title="Меняй офис вместе с карьерой" onBack={onBack}>
        Новая компания меняет зарплатный множитель, стиль офиса и пассивные бонусы. Требования растут вместе со статусом.
      </PageHeader>
      <div className="office-v6-company-grid">
        {v6Companies.map((company) => {
          const available = snapshot.level >= company.minLevel && snapshot.reputation >= company.minReputation;
          const active = state.companyId === company.id;
          return (
            <article key={company.id} className={active ? 'active' : available ? 'available' : 'locked'}>
              <div className="office-v6-company-art"><V6Icon name="company" /></div>
              <small>{company.industry}</small>
              <strong>{company.name}</strong>
              <p>{company.description}</p>
              <dl>
                <div><dt>Офис</dt><dd>{company.officeStyle}</dd></div>
                <div><dt>Зарплата</dt><dd>×{company.salaryMultiplier.toFixed(2)}</dd></div>
                <div><dt>Перк</dt><dd>{company.perk}</dd></div>
              </dl>
              <button type="button" disabled={!available || active} onClick={() => onSwitch(company.id)}>
                {active ? 'Текущая компания' : available ? 'Перейти' : `ур. ${company.minLevel} · реп. ${company.minReputation}`}
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
