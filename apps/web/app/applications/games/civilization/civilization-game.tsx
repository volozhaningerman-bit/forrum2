'use client';

import { useEffect, useMemo, useState } from 'react';

type MainPanel = 'equipment' | 'bosses' | 'map' | 'craft' | 'tribe';
type EquipmentCategory = 'weapon' | 'clothes' | 'accessory' | 'tool';
type TaskPeriod = 'daily' | 'weekly';
type AvatarGender = 'male' | 'female';

type AvatarState = {
  created: boolean;
  gender: AvatarGender;
  color: string;
  hair: string;
};

type Item = {
  id: string;
  name: string;
  category: EquipmentCategory;
  icon: string;
  level: number;
  stat: string;
  value: number;
  description: string;
  how: string;
  rarity: string;
  locked?: boolean;
};

const STORAGE_KEY = '4rrum.civilization.alpha.v1';

const colors = ['#f0bd84', '#d99562', '#b96f4a', '#8f513b'];
const femaleHair = ['Короткие', 'Пучок', 'Косы', 'Длинные'];

const equipment: Item[] = [
  { id: 'club', name: 'Дубина', category: 'weapon', icon: '🪵', level: 1, stat: 'Атака', value: 5, description: 'Простое, но надёжное оружие первых охотников. Камень и крепкая ветка.', how: 'Доступно с начала игры', rarity: 'Обычный' },
  { id: 'axe', name: 'Каменный топор', category: 'weapon', icon: '🪓', level: 2, stat: 'Атака', value: 8, description: 'Инструмент и оружие. Открывает новые рецепты и ускоряет сбор дерева.', how: 'Создать на верстаке', rarity: 'Обычный' },
  { id: 'knife', name: 'Кремнёвый нож', category: 'weapon', icon: '🔪', level: 3, stat: 'Атака', value: 9, description: 'Лёгкое оружие с повышенным шансом критического удара.', how: 'Крафт после исследования кремня', rarity: 'Необычный' },
  { id: 'spear', name: 'Костяное копьё', category: 'weapon', icon: '🏹', level: 5, stat: 'Атака', value: 12, description: 'Дальнобойное оружие охотника. Особенно эффективно против зверей.', how: 'Дроп с Вожака обезьян или крафт', rarity: 'Редкий', locked: true },
  { id: 'fur', name: 'Шкура охотника', category: 'clothes', icon: '🥋', level: 2, stat: 'Защита', value: 6, description: 'Тёплая шкура, защищающая от холода и лёгких ударов.', how: 'Шкуры зверей + верстак', rarity: 'Обычный' },
  { id: 'tiger', name: 'Накидка тигра', category: 'clothes', icon: '🐅', level: 7, stat: 'Защита', value: 16, description: 'Редкая накидка, усиливающая власть и устрашающая противников.', how: 'Дроп с Саблезубого тигра', rarity: 'Эпический', locked: true },
  { id: 'fang', name: 'Ожерелье из клыков', category: 'accessory', icon: '🦷', level: 4, stat: 'Власть', value: 8, description: 'Трофей охотника. Повышает власть и шанс редкого дропа.', how: 'Собрать 8 клыков', rarity: 'Необычный', locked: true },
  { id: 'basket', name: 'Плетёная сумка', category: 'accessory', icon: '🧺', level: 1, stat: 'Сбор', value: 10, description: 'Позволяет унести больше еды и материалов за одну вылазку.', how: 'Получить за первое ежедневное задание', rarity: 'Обычный' },
  { id: 'pick', name: 'Каменная кирка', category: 'tool', icon: '⛏️', level: 3, stat: 'Добыча', value: 12, description: 'Ускоряет добычу камня и открывает редкие залежи.', how: 'Создать на верстаке', rarity: 'Обычный', locked: true },
  { id: 'torch', name: 'Факел', category: 'tool', icon: '🔥', level: 1, stat: 'Исследование', value: 5, description: 'Позволяет исследовать глубокие зоны пещеры.', how: 'Дерево + смола', rarity: 'Обычный' },
];

const bosses = [
  { id: 'ape', name: 'Вожак обезьян', level: 2, emoji: '🦍', hp: 70, drops: ['🦴 Кость', '🍖 Мясо', '🪵 Древесина'], power: 7 },
  { id: 'tiger', name: 'Саблезубый тигр', level: 3, emoji: '🐅', hp: 100, drops: ['🦷 Клык', '🥋 Шкура', '🍖 Мясо'], power: 10 },
  { id: 'mammoth', name: 'Мамонт', level: 5, emoji: '🦣', hp: 180, drops: ['🦴 Бивень', '🥋 Густая шкура', '💎 Редкий камень'], power: 16 },
];

type Boss = (typeof bosses)[number];

const dailyTasks = [
  { label: 'Собрать ягоды', progress: 7, total: 10, reward: '+5 власти' },
  { label: 'Собрать камень', progress: 120, total: 200, reward: '+10 власти' },
  { label: 'Создать каменный топор', progress: 0, total: 1, reward: '+20 власти' },
];

const weeklyTasks = [
  { label: 'Победить 3 боссов', progress: 1, total: 3, reward: '+60 власти' },
  { label: 'Создать 5 предметов', progress: 2, total: 5, reward: '+35 власти' },
  { label: 'Исследовать 4 точки карты', progress: 1, total: 4, reward: '+40 власти' },
];

const mapStages = [
  ['Пещера', 'Открыто', '🔥'],
  ['Каменный век', 'Ур. 5 · 500 камня · 100 власти', '🪨'],
  ['Бронзовый век', 'После Каменного века', '⚒️'],
  ['Железный век', 'После Бронзового века', '🛡️'],
  ['Средневековье', 'Позже', '🏰'],
];

const craftRecipes = [
  { name: 'Каменный топор', icon: '🪓', needs: '40 камня · 20 дерева', ready: true },
  { name: 'Факел', icon: '🔥', needs: '15 дерева · 5 смолы', ready: true },
  { name: 'Каменная кирка', icon: '⛏️', needs: '60 камня · 30 дерева', ready: false },
  { name: 'Шкура охотника', icon: '🥋', needs: '3 шкуры · 10 костей', ready: false },
];

function loadState(): AvatarState {
  if (typeof window === 'undefined') return { created: false, gender: 'male', color: colors[0], hair: 'Лысый' };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { created: false, gender: 'male', color: colors[0], hair: 'Лысый' };
    const parsed = JSON.parse(raw);
    return {
      created: Boolean(parsed.created),
      gender: parsed.gender === 'female' ? 'female' : 'male',
      color: colors.includes(parsed.color) ? parsed.color : colors[0],
      hair: typeof parsed.hair === 'string' ? parsed.hair : 'Лысый',
    };
  } catch {
    return { created: false, gender: 'male', color: colors[0], hair: 'Лысый' };
  }
}

function Icon({ children }: { children: React.ReactNode }) {
  return <span className="civ-icon" aria-hidden="true">{children}</span>;
}

export function CivilizationGame() {
  const [avatar, setAvatar] = useState<AvatarState>({ created: false, gender: 'male', color: colors[0], hair: 'Лысый' });
  const [draftGender, setDraftGender] = useState<AvatarGender>('male');
  const [draftColor, setDraftColor] = useState(colors[0]);
  const [draftHair, setDraftHair] = useState('Лысый');
  const [panel, setPanel] = useState<MainPanel | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [resourceOpen, setResourceOpen] = useState<'food' | 'materials' | null>(null);
  const [taskPeriod, setTaskPeriod] = useState<TaskPeriod>('daily');
  const [tasksExpanded, setTasksExpanded] = useState(false);
  const [category, setCategory] = useState<EquipmentCategory>('weapon');
  const [selectedItemId, setSelectedItemId] = useState('club');
  const [equippedId, setEquippedId] = useState('club');
  const [selectedBoss, setSelectedBoss] = useState('tiger');
  const [bossHp, setBossHp] = useState(100);
  const [notice, setNotice] = useState('Пещера — твой первый дом. Собери ресурсы и подготовься к Каменному веку.');

  useEffect(() => {
    const saved = loadState();
    setAvatar(saved);
    setDraftGender(saved.gender);
    setDraftColor(saved.color);
    setDraftHair(saved.hair);
  }, []);

  useEffect(() => {
    document.body.classList.add('civilization-no-scroll');
    return () => document.body.classList.remove('civilization-no-scroll');
  }, []);

  const items = useMemo(() => equipment.filter((item) => item.category === category), [category]);
  const selectedItem = equipment.find((item) => item.id === selectedItemId) ?? equipment[0];
  const selectedBossData = bosses.find((boss) => boss.id === selectedBoss) ?? bosses[1];
  const visibleTasks = taskPeriod === 'daily' ? dailyTasks : weeklyTasks;

  const togglePanel = (next: MainPanel) => {
    setResourceOpen(null);
    setProfileOpen(false);
    setPanel((current) => current === next ? null : next);
  };

  const createAvatar = () => {
    const next: AvatarState = {
      created: true,
      gender: draftGender,
      color: draftColor,
      hair: draftGender === 'male' ? 'Лысый' : draftHair === 'Лысый' ? femaleHair[0] : draftHair,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setAvatar(next);
    setNotice('Персонаж создан. Внешность зафиксирована; новые элементы кастомизации будут открываться с уровнем.');
  };

  const attackBoss = () => {
    const maxHp = selectedBossData.hp;
    setBossHp((hp) => {
      const next = Math.max(0, hp - 22);
      if (next === 0) setNotice(`${selectedBossData.name} побеждён. Трофеи отправлены в инвентарь.`);
      return next;
    });
    if (bossHp <= 0) setBossHp(maxHp);
  };

  const activeBossHp = Math.min(bossHp, selectedBossData.hp);

  return (
    <div className="civilization-app">
      <div className="civilization-hub">
        <header className="civ-game-hud">
          <button className="civ-location" type="button" onClick={() => togglePanel('map')}>
            <Icon>🔥</Icon>
            <span><small>Локация</small><strong>В пещере</strong></span>
            <b>⌄</b>
          </button>

          <div className="civ-resource-strip">
            <button type="button" className="civ-resource" onClick={() => setResourceOpen(null)}>
              <Icon>⚡</Icon><span><strong>100/100</strong><small>Энергия</small></span><b>+</b>
            </button>
            <div className="civ-resource-wrap">
              <button type="button" className={`civ-resource ${resourceOpen === 'food' ? 'active' : ''}`} onClick={() => setResourceOpen(resourceOpen === 'food' ? null : 'food')}>
                <Icon>🍓</Icon><span><strong>340</strong><small>Еда</small></span><b>{resourceOpen === 'food' ? '⌃' : '⌄'}</b>
              </button>
              {resourceOpen === 'food' ? (
                <div className="civ-resource-popover">
                  <div className="civ-popover-title"><b>Еда</b><small>340 всего</small></div>
                  <ResourceRow icon="🍓" label="Ягоды" value="120" />
                  <ResourceRow icon="🍖" label="Мясо" value="85" />
                  <ResourceRow icon="🍄" label="Грибы" value="45" />
                  <ResourceRow icon="🐟" label="Рыба" value="90" />
                </div>
              ) : null}
            </div>
            <div className="civ-resource-wrap">
              <button type="button" className={`civ-resource ${resourceOpen === 'materials' ? 'active' : ''}`} onClick={() => setResourceOpen(resourceOpen === 'materials' ? null : 'materials')}>
                <Icon>🪨</Icon><span><strong>120</strong><small>Ресурсы</small></span><b>{resourceOpen === 'materials' ? '⌃' : '⌄'}</b>
              </button>
              {resourceOpen === 'materials' ? (
                <div className="civ-resource-popover resources">
                  <div className="civ-popover-title"><b>Ресурсы</b><small>Материалы лагеря</small></div>
                  <ResourceRow icon="🪵" label="Дерево" value="120" />
                  <ResourceRow icon="🪨" label="Камень" value="210" />
                  <ResourceRow icon="🔪" label="Кремень" value="37" />
                  <ResourceRow icon="🥋" label="Шкуры" value="28" />
                  <ResourceRow icon="🦴" label="Кости" value="16" />
                </div>
              ) : null}
            </div>
            <button type="button" className="civ-resource" onClick={() => setNotice('Власть растёт от боссов, заданий, племени и редких трофеев.')}>
              <Icon>👑</Icon><span><strong>37</strong><small>Власть</small></span><b>+</b>
            </button>
          </div>
        </header>

        <aside className="civ-player-rail">
          <button className="civ-avatar-card" type="button" onClick={() => setNotice('Профиль открыт через меню персонажа.')}>
            <Mascot avatar={avatar} compact />
            <span className="civ-player-name">Первобытный</span>
            <small>Ур. 1 · Новичок</small>
            <div className="civ-xp"><i style={{ width: '58%' }} /></div>
            <em>58 / 100 XP</em>
          </button>
          <button className={`civ-player-chevron ${profileOpen ? 'open' : ''}`} type="button" aria-label="Открыть меню персонажа" onClick={() => setProfileOpen(!profileOpen)}>⌄</button>
          {profileOpen ? (
            <nav className="civ-player-menu">
              {[
                ['👤', 'Профиль'],
                ['🏆', 'Достижения'],
                ['🎒', 'Инвентарь'],
                ['🌿', 'Эволюция'],
              ].map(([icon, label]) => (
                <button type="button" key={label} onClick={() => { setNotice(`${label}: раздел профиля будет развиваться вместе с прогрессом персонажа.`); setProfileOpen(false); }}>
                  <span>{icon}</span>{label}
                </button>
              ))}
            </nav>
          ) : null}
        </aside>

        <main className="civ-scene">
          <img className="civ-cave-background" src="/games/civilization/cave-hub.svg" alt="Пещера первобытного лагеря" />
          <div className="civ-mascot-stage"><Mascot avatar={avatar} /></div>
          <Hotspot className="fire" icon="🔥" title="Костёр" text="Восстановить энергию" onClick={() => setNotice('Костёр восстановит энергию после короткого отдыха.')} />
          <Hotspot className="bench" icon="🔨" title="Верстак" text="Создание предметов" onClick={() => setPanel('craft')} />
          <Hotspot className="stash" icon="🧰" title="Тайник" text="Ресурсы и трофеи" onClick={() => setResourceOpen('materials')} />
          <Hotspot className="exit" icon="⛰️" title="Выход" text="Исследовать мир" onClick={() => setPanel('map')} />
          <div className="civ-scene-notice" role="status">{notice}</div>
        </main>

        <aside className="civ-task-rail">
          <div className="civ-task-head">
            <div>
              <small>Прогресс периода</small>
              <strong>Текущие задания</strong>
            </div>
            <span>{visibleTasks.filter(t => t.progress >= t.total).length}/{visibleTasks.length}</span>
          </div>
          <div className="civ-task-tabs">
            <button type="button" className={taskPeriod === 'daily' ? 'active' : ''} onClick={() => { setTaskPeriod('daily'); setTasksExpanded(false); }}>Ежедневные</button>
            <button type="button" className={taskPeriod === 'weekly' ? 'active' : ''} onClick={() => { setTaskPeriod('weekly'); setTasksExpanded(false); }}>Еженедельные</button>
          </div>
          <div className="civ-task-current">
            {visibleTasks.slice(0, 3).map(task => <TaskRow key={task.label} task={task} />)}
          </div>
          <button type="button" className={`civ-task-expand ${tasksExpanded ? 'open' : ''}`} onClick={() => setTasksExpanded(!tasksExpanded)}>
            <span>{tasksExpanded ? 'Скрыть список' : `Все задания · ${taskPeriod === 'daily' ? 'день' : 'неделя'}`}</span><b>⌄</b>
          </button>
          {tasksExpanded ? (
            <div className="civ-task-scroll">
              {[...visibleTasks, ...(taskPeriod === 'daily' ? [
                { label: 'Разжечь костёр', progress: 1, total: 1, reward: '+5 власти' },
                { label: 'Посетить карту', progress: 1, total: 1, reward: '+5 власти' },
                { label: 'Улучшить снаряжение', progress: 0, total: 1, reward: '+10 власти' },
              ] : [
                { label: 'Собрать 500 еды', progress: 340, total: 500, reward: '+25 власти' },
                { label: 'Найти редкий трофей', progress: 0, total: 1, reward: '+50 власти' },
              ])].map(task => <TaskRow key={task.label} task={task} compact />)}
            </div>
          ) : null}
        </aside>

        {panel ? (
          <section className="civ-full-panel" aria-label={panel}>
            <button className="civ-panel-collapse" type="button" onClick={() => setPanel(null)} aria-label="Свернуть раздел">⌄</button>
            {panel === 'equipment' ? (
              <EquipmentPanel
                category={category}
                setCategory={setCategory}
                items={items}
                selectedItem={selectedItem}
                setSelectedItemId={setSelectedItemId}
                equippedId={equippedId}
                setEquippedId={setEquippedId}
                close={() => setPanel(null)}
              />
            ) : null}
            {panel === 'bosses' ? (
              <BossesPanel
                bosses={bosses}
                selected={selectedBossData}
                selectedBoss={selectedBoss}
                setSelectedBoss={(id) => { setSelectedBoss(id); const boss = bosses.find(b => b.id === id); setBossHp(boss?.hp ?? 100); }}
                hp={activeBossHp}
                attackBoss={attackBoss}
              />
            ) : null}
            {panel === 'map' ? <MapPanel setNotice={setNotice} /> : null}
            {panel === 'craft' ? <CraftPanel setNotice={setNotice} /> : null}
            {panel === 'tribe' ? <TribePanel setNotice={setNotice} /> : null}
          </section>
        ) : null}

        <nav className="civ-bottom-nav">
          {([
            ['equipment', '⚔️', 'Снаряжение'],
            ['bosses', '💀', 'Боссы'],
            ['map', '🗺️', 'Карта'],
            ['craft', '🔨', 'Крафт'],
            ['tribe', '⛺', 'Племя'],
          ] as const).map(([id, icon, label]) => (
            <button type="button" key={id} className={panel === id ? 'active' : ''} onClick={() => togglePanel(id)}>
              <span>{icon}</span><b>{label}</b>
            </button>
          ))}
        </nav>
      </div>

      {!avatar.created ? (
        <div className="civ-create-backdrop">
          <section className="civ-create-card" role="dialog" aria-modal="true" aria-label="Создание персонажа">
            <div className="civ-create-preview"><Mascot avatar={{ created: false, gender: draftGender, color: draftColor, hair: draftGender === 'male' ? 'Лысый' : draftHair }} /></div>
            <div className="civ-create-copy">
              <small>ЦИВИЛИЗАЦИЯ · НАЧАЛО</small>
              <h1>Создай первобытного</h1>
              <p>Этот выбор задаёт базовый облик персонажа. После старта менять пол и цвет нельзя — новые элементы внешности будут открываться с уровнем и трофеями.</p>

              <div className="civ-create-section">
                <label>Пол</label>
                <div className="civ-choice-grid two">
                  <button type="button" className={draftGender === 'male' ? 'active' : ''} onClick={() => { setDraftGender('male'); setDraftHair('Лысый'); }}>♂ Мальчик</button>
                  <button type="button" className={draftGender === 'female' ? 'active' : ''} onClick={() => { setDraftGender('female'); setDraftHair(femaleHair[0]); }}>♀ Девочка</button>
                </div>
              </div>

              <div className="civ-create-section">
                <label>Цвет</label>
                <div className="civ-color-row">
                  {colors.map(color => <button key={color} type="button" aria-label={color} className={draftColor === color ? 'active' : ''} style={{ background: color }} onClick={() => setDraftColor(color)} />)}
                </div>
              </div>

              <div className="civ-create-section">
                <label>Причёска</label>
                {draftGender === 'male' ? (
                  <div className="civ-locked-note">На старте мальчик лысый. Причёски откроются с уровнями и трофеями.</div>
                ) : (
                  <div className="civ-choice-grid hair">
                    {femaleHair.map(hair => <button key={hair} type="button" className={draftHair === hair ? 'active' : ''} onClick={() => setDraftHair(hair)}>{hair}</button>)}
                  </div>
                )}
              </div>

              <button type="button" className="civ-create-submit" onClick={createAvatar}>Начать путь цивилизации →</button>
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}

function Mascot({ avatar, compact = false }: { avatar: AvatarState; compact?: boolean }) {
  const hair = avatar.gender === 'female' && avatar.hair !== 'Лысый';
  return (
    <div className={`civ-mascot ${compact ? 'compact' : ''}`} style={{ '--civ-skin': avatar.color } as React.CSSProperties}>
      <div className="civ-hair">{hair ? <span>{avatar.hair === 'Пучок' ? '●' : avatar.hair === 'Косы' ? '⌁' : avatar.hair === 'Длинные' ? '◒' : '⌒'}</span> : null}</div>
      <div className="civ-head">
        <i className="eye left" /><i className="eye right" />
        <i className="brow left" /><i className="brow right" />
        <i className="cheek left" /><i className="cheek right" />
        <i className="mouth" />
      </div>
      <div className="civ-necklace">◆ ◆ ◆</div>
      <div className="civ-body"><i className="fur" /></div>
      {!compact ? <><div className="civ-arm left" /><div className="civ-arm right" /><div className="civ-leg left" /><div className="civ-leg right" /><div className="civ-club"><i /></div></> : null}
    </div>
  );
}

function Hotspot({ className, icon, title, text, onClick }: { className: string; icon: string; title: string; text: string; onClick: () => void }) {
  return <button type="button" className={`civ-hotspot ${className}`} onClick={onClick}><span>{icon}</span><div><b>{title}</b><small>{text}</small></div><em>›</em></button>;
}

function ResourceRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return <div className="civ-resource-row"><span>{icon}</span><b>{label}</b><em>{value}</em></div>;
}

function TaskRow({ task, compact = false }: { task: { label: string; progress: number; total: number; reward: string }; compact?: boolean }) {
  const done = task.progress >= task.total;
  const pct = Math.min(100, task.total > 0 ? task.progress / task.total * 100 : 0);
  return (
    <div className={`civ-task-row ${compact ? 'compact' : ''}`}>
      <span className={`civ-task-check ${done ? 'done' : ''}`}>{done ? '✓' : ''}</span>
      <div><b>{task.label}</b><div className="civ-task-progress"><i style={{ width: `${pct}%` }} /></div></div>
      <em>{task.progress}/{task.total}<small>{task.reward}</small></em>
    </div>
  );
}

function EquipmentPanel({
  category,
  setCategory,
  items,
  selectedItem,
  setSelectedItemId,
  equippedId,
  setEquippedId,
  close,
}: {
  category: EquipmentCategory;
  setCategory: (value: EquipmentCategory) => void;
  items: Item[];
  selectedItem: Item;
  setSelectedItemId: (id: string) => void;
  equippedId: string;
  setEquippedId: (id: string) => void;
  close: () => void;
}) {
  return (
    <div className="civ-panel-body equipment">
      <header className="civ-panel-head">
        <div><small>Управление персонажем</small><h2>Снаряжение</h2><p>Собирай экипировку, сравнивай характеристики и открывай редкие предметы с боссов.</p></div>
      </header>
      <div className="civ-equipment-tabs">
        <button type="button" className="back" onClick={close}>←</button>
        {([
          ['weapon', '⚔️', 'Оружие'],
          ['clothes', '👕', 'Одежда'],
          ['accessory', '💍', 'Аксессуары'],
          ['tool', '🔨', 'Инструменты'],
        ] as const).map(([id, icon, label]) => (
          <button key={id} type="button" className={category === id ? 'active' : ''} onClick={() => { setCategory(id); const first = equipment.find(item => item.category === id); if (first) setSelectedItemId(first.id); }}>{icon} {label}</button>
        ))}
      </div>
      <div className="civ-equipment-layout">
        <div className="civ-item-grid">
          {items.map(item => (
            <button type="button" key={item.id} className={`civ-item-card ${selectedItem.id === item.id ? 'active' : ''} ${item.locked ? 'locked' : ''}`} onClick={() => setSelectedItemId(item.id)}>
              <span>{item.icon}</span><b>{item.name}</b><small>{item.locked ? `Ур. ${item.level}` : `${item.stat} +${item.value}`}</small>{item.locked ? <em>🔒</em> : null}
            </button>
          ))}
        </div>
        <article className="civ-item-detail">
          <div className="civ-item-hero"><span>{selectedItem.icon}</span></div>
          <div className="civ-item-copy">
            <div className="civ-detail-title"><div><small>{selectedItem.rarity}</small><h3>{selectedItem.name}</h3></div><span>Ур. {selectedItem.level}</span></div>
            <p>{selectedItem.description}</p>
            <dl><div><dt>Характеристики</dt><dd>{selectedItem.stat} <b>+{selectedItem.value}</b></dd></div><div><dt>Эффекты</dt><dd>{selectedItem.locked ? 'Неизвестно до открытия' : 'Базовый эффект предмета'}</dd></div><div><dt>Как получить</dt><dd>{selectedItem.how}</dd></div></dl>
            <button type="button" disabled={selectedItem.locked} className={equippedId === selectedItem.id ? 'equipped' : ''} onClick={() => !selectedItem.locked && setEquippedId(selectedItem.id)}>
              {selectedItem.locked ? 'Предмет пока закрыт' : equippedId === selectedItem.id ? '✓ Используется' : 'Использовать'}
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}

function BossesPanel({ bosses, selected, selectedBoss, setSelectedBoss, hp, attackBoss }: { bosses: Boss[]; selected: Boss; selectedBoss: string; setSelectedBoss: (id: string) => void; hp: number; attackBoss: () => void }) {
  return (
    <div className="civ-panel-body bosses">
      <header className="civ-panel-head"><div><small>Охота и трофеи</small><h2>Боссы</h2><p>Побеждай существ эпохи, получай уникальные материалы и кастомизацию.</p></div></header>
      <div className="civ-boss-layout">
        <div className="civ-boss-list">
          {bosses.map(boss => <button key={boss.id} type="button" className={selectedBoss === boss.id ? 'active' : ''} onClick={() => setSelectedBoss(boss.id)}><span>{boss.emoji}</span><div><b>{boss.name}</b><small>Ур. {boss.level}</small></div><em>›</em></button>)}
        </div>
        <article className="civ-boss-detail">
          <div className="civ-boss-art">{selected.emoji}</div>
          <div>
            <small>Босс пещеры · ур. {selected.level}</small>
            <h3>{selected.name}</h3>
            <p>Сила босса: {selected.power}. Подготовь оружие и запас энергии перед охотой.</p>
            <div className="civ-boss-hp"><span>Здоровье</span><b>{hp}/{selected.hp}</b><div><i style={{ width: `${Math.min(100, hp / selected.hp * 100)}%` }} /></div></div>
            <div className="civ-drops"><small>Возможные трофеи</small>{selected.drops.map(drop => <span key={drop}>{drop}</span>)}</div>
            <button type="button" className="civ-primary" onClick={attackBoss}>{hp <= 0 ? 'Охота завершена — начать заново' : 'Атаковать · −22 HP'}</button>
          </div>
        </article>
      </div>
    </div>
  );
}

function MapPanel({ setNotice }: { setNotice: (value: string) => void }) {
  return (
    <div className="civ-panel-body map">
      <header className="civ-panel-head"><div><small>Путь цивилизации</small><h2>Карта эпох</h2><p>От первой пещеры до собственной империи. Новые эпохи меняют мир, ресурсы, боссов и технологии.</p></div></header>
      <div className="civ-map-path">
        {mapStages.map(([name, req, icon], index) => <button type="button" key={name} className={index === 0 ? 'active' : 'locked'} onClick={() => setNotice(index === 0 ? 'Ты уже находишься в Пещере.' : `${name}: ${req}`)}><span>{icon}</span><b>{name}</b><small>{req}</small><em>{index === 0 ? 'Текущая' : '🔒'}</em></button>)}
      </div>
      <div className="civ-map-detail">
        <div className="civ-map-visual"><span>🔥</span><b>Пещера</b><small>Стартовая территория</small></div>
        <div><h3>Что нужно для Каменного века</h3><TaskRow task={{ label: 'Достичь 5 уровня', progress: 1, total: 5, reward: '' }} /><TaskRow task={{ label: 'Собрать камень', progress: 210, total: 500, reward: '' }} /><TaskRow task={{ label: 'Набрать власть', progress: 37, total: 100, reward: '' }} /></div>
      </div>
    </div>
  );
}

function CraftPanel({ setNotice }: { setNotice: (value: string) => void }) {
  return (
    <div className="civ-panel-body craft">
      <header className="civ-panel-head"><div><small>Верстак</small><h2>Крафт</h2><p>Создавай оружие, инструменты и одежду из найденных материалов.</p></div></header>
      <div className="civ-craft-grid">
        {craftRecipes.map(recipe => <article key={recipe.name} className={recipe.ready ? 'ready' : 'locked'}><span>{recipe.icon}</span><h3>{recipe.name}</h3><p>{recipe.needs}</p><button type="button" disabled={!recipe.ready} onClick={() => setNotice(`${recipe.name}: создано и отправлено в инвентарь.`)}>{recipe.ready ? 'Создать' : 'Не хватает ресурсов'}</button></article>)}
      </div>
    </div>
  );
}

function TribePanel({ setNotice }: { setNotice: (value: string) => void }) {
  return (
    <div className="civ-panel-body tribe">
      <header className="civ-panel-head"><div><small>Социальный прогресс</small><h2>Племя</h2><p>Общий лагерь игроков: развитие поселения, вклад ресурсов и совместные цели.</p></div></header>
      <div className="civ-tribe-grid">
        <article><small>Твоё племя</small><h3>Каменный круг</h3><strong>7 / 20 участников</strong><p>Уровень лагеря 2 · +4% к сбору ресурсов</p><button type="button" onClick={() => setNotice('Открыт список участников племени.')}>Участники</button></article>
        <article><small>Общая цель</small><h3>Большой костёр</h3><strong>1 420 / 2 000 дерева</strong><div className="civ-task-progress"><i style={{ width: '71%' }} /></div><button type="button" onClick={() => setNotice('Ты внёс 20 дерева в развитие племени.')}>Внести ресурсы</button></article>
        <article><small>Бонус недели</small><h3>Охота на мамонта</h3><strong>Осталось 2 дня</strong><p>Победи Мамонта вместе с племенем и получи редкий трофей.</p><button type="button" onClick={() => setNotice('Племенная охота отмечена как текущая цель.')}>Сделать целью</button></article>
      </div>
    </div>
  );
}
