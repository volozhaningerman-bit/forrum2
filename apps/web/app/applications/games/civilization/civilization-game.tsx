'use client';

import { useEffect, useMemo, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';

type MainPanel = 'equipment' | 'bosses' | 'map' | 'craft' | 'tribe' | 'profile' | 'achievements' | 'inventory' | 'evolution';
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
const PROGRESS_KEY = '4rrum.civilization.alpha.v1.progress';

type ProgressState = {
  equippedId: string;
  bossHp: Record<string, number>;
  bossWins: Record<string, number>;
  loot: Record<string, number>;
};

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

  // В альфе закрытые предметы показываются заранее: игрок понимает,
  // что выпадет с боссов и ради чего стоит развиваться.
  { id: 'bone-club', name: 'Костяная палица', category: 'weapon', icon: '🦴', level: 4, stat: 'Атака', value: 7, description: 'Усиленная дубина из крупных костей. Хороша против лёгкой брони.', how: 'Кости ×12 · верстак', rarity: 'Необычный', locked: true },
  { id: 'flint-shard', name: 'Острый кремень', category: 'weapon', icon: '◆', level: 2, stat: 'Атака', value: 4, description: 'Лёгкий режущий камень. Быстрый, но требует ближнего боя.', how: 'Найти залежь кремня на карте', rarity: 'Обычный', locked: true },
  { id: 'bow', name: 'Деревянный лук', category: 'weapon', icon: '➶', level: 6, stat: 'Атака', value: 10, description: 'Первое дальнобойное оружие племени. Даёт бонус на охоте.', how: 'Эволюция охоты II · крафт', rarity: 'Необычный', locked: true },
  { id: 'obsidian-axe', name: 'Обсидиановый топор', category: 'weapon', icon: '◈', level: 8, stat: 'Атака', value: 15, description: 'Тяжёлое оружие с острым вулканическим лезвием.', how: 'Редкий обсидиан · босс пещеры', rarity: 'Редкий', locked: true },
  { id: 'hunter-spear', name: 'Копьё охотника', category: 'weapon', icon: '↑', level: 12, stat: 'Атака', value: 19, description: 'Длинное копьё для крупных зверей. Бонус против Мамонта.', how: 'Трофей племенной охоты', rarity: 'Редкий', locked: true },
  { id: 'mammoth-maul', name: 'Мамонтовый молот', category: 'weapon', icon: '◆', level: 20, stat: 'Атака', value: 28, description: 'Трофейное оружие из бивня и тяжёлого камня.', how: 'Очень редкий дроп с Мамонта', rarity: 'Эпический', locked: true },

  { id: 'wraps', name: 'Кожаные обмотки', category: 'clothes', icon: '▰', level: 1, stat: 'Защита', value: 2, description: 'Простая защита рук и ног от царапин.', how: 'Доступно после первого задания', rarity: 'Обычный' },
  { id: 'bone-armor', name: 'Костяной нагрудник', category: 'clothes', icon: '◇', level: 5, stat: 'Защита', value: 10, description: 'Пластины из костей крупных зверей.', how: 'Кости ×20 · шкуры ×4', rarity: 'Необычный', locked: true },
  { id: 'ape-hide', name: 'Шкура вожака', category: 'clothes', icon: '▥', level: 6, stat: 'Защита', value: 13, description: 'Плотная шкура, усиливающая сопротивление ударам.', how: 'Дроп с Вожака обезьян', rarity: 'Редкий', locked: true },
  { id: 'mammoth-mantle', name: 'Мантия мамонта', category: 'clothes', icon: '▧', level: 12, stat: 'Защита', value: 22, description: 'Тёплая тяжёлая мантия для суровых регионов.', how: 'Дроп с Мамонта · редкий', rarity: 'Эпический', locked: true },

  { id: 'stone-charm', name: 'Каменный оберег', category: 'accessory', icon: '◉', level: 2, stat: 'Власть', value: 3, description: 'Первый символ статуса внутри племени.', how: 'Камень ×25 · крафт', rarity: 'Обычный', locked: true },
  { id: 'bone-ring', name: 'Костяное кольцо', category: 'accessory', icon: '○', level: 5, stat: 'Дроп', value: 5, description: 'Небольшой талисман охотника.', how: 'Кость ×8 · крафт', rarity: 'Необычный', locked: true },
  { id: 'tiger-fang', name: 'Клык саблезуба', category: 'accessory', icon: '⌁', level: 8, stat: 'Власть', value: 12, description: 'Трофей, который замечают все в племени.', how: 'Редкий дроп с Саблезубого тигра', rarity: 'Редкий', locked: true },
  { id: 'tribal-totem', name: 'Тотем племени', category: 'accessory', icon: '✦', level: 12, stat: 'Власть', value: 18, description: 'Ритуальный предмет, усиливающий племенные бонусы.', how: 'Награда за развитие племени', rarity: 'Эпический', locked: true },

  { id: 'stone-hammer', name: 'Каменный молоток', category: 'tool', icon: '◆', level: 2, stat: 'Крафт', value: 8, description: 'Ускоряет создание простых предметов.', how: 'Камень ×30 · дерево ×15', rarity: 'Обычный', locked: true },
  { id: 'bone-needle', name: 'Костяная игла', category: 'tool', icon: '╱', level: 4, stat: 'Крафт', value: 10, description: 'Нужна для сложной одежды и кожаных вещей.', how: 'Кость ×6 · верстак', rarity: 'Необычный', locked: true },
  { id: 'flint-kit', name: 'Набор кремня', category: 'tool', icon: '◇', level: 5, stat: 'Огонь', value: 12, description: 'Позволяет быстрее разжигать костры в экспедициях.', how: 'Кремень ×20 · крафт', rarity: 'Необычный', locked: true },
  { id: 'hunter-trap', name: 'Охотничья ловушка', category: 'tool', icon: '⌗', level: 7, stat: 'Охота', value: 15, description: 'Повышает шанс дополнительной добычи с вылазок.', how: 'Эволюция охоты II', rarity: 'Редкий', locked: true },
];

const bosses = [
  { id: 'ape', name: 'Вожак обезьян', level: 2, emoji: '🦍', hp: 70, drops: ['🗿 Тотем вожака', '🦴 Кость', '🍖 Мясо'], power: 7 },
  { id: 'tiger', name: 'Саблезубый тигр', level: 3, emoji: '🐅', hp: 100, drops: ['🦷 Клык саблезуба', '🥋 Тигриная шкура', '🍖 Мясо'], power: 10 },
  { id: 'mammoth', name: 'Мамонт', level: 5, emoji: '🦣', hp: 180, drops: ['🦴 Бивень мамонта', '🥋 Шкура мамонта', '💎 Редкий камень'], power: 16 },
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


function initialProgress(): ProgressState {
  return {
    equippedId: 'club',
    bossHp: Object.fromEntries(bosses.map((boss) => [boss.id, boss.hp])),
    bossWins: Object.fromEntries(bosses.map((boss) => [boss.id, 0])),
    loot: {},
  };
}

function loadProgress(): ProgressState {
  const fallback = initialProgress();
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    const equippedId = equipment.some((item) => item.id === parsed.equippedId && !item.locked)
      ? parsed.equippedId as string
      : 'club';
    const bossHp = Object.fromEntries(
      bosses.map((boss) => {
        const saved = Number(parsed.bossHp?.[boss.id]);
        return [boss.id, Number.isFinite(saved) ? Math.max(0, Math.min(boss.hp, saved)) : boss.hp];
      }),
    );
    const bossWins = Object.fromEntries(
      bosses.map((boss) => [boss.id, Math.max(0, Math.floor(Number(parsed.bossWins?.[boss.id]) || 0))]),
    );
    const loot = Object.fromEntries(
      Object.entries(parsed.loot ?? {}).filter(([name, value]) => name.length > 0 && Number.isFinite(Number(value)) && Number(value) >= 0)
        .map(([name, value]) => [name, Math.floor(Number(value))]),
    );
    return { equippedId, bossHp, bossWins, loot };
  } catch {
    return fallback;
  }
}

function dropName(drop: string) {
  const parts = drop.trim().split(/\s+/);
  return parts.length > 1 ? parts.slice(1).join(' ') : drop;
}

function Icon({ children }: { children: ReactNode }) {
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
  const [bossHpById, setBossHpById] = useState<Record<string, number>>(() => initialProgress().bossHp);
  const [bossWins, setBossWins] = useState<Record<string, number>>(() => initialProgress().bossWins);
  const [loot, setLoot] = useState<Record<string, number>>({});
  const [progressHydrated, setProgressHydrated] = useState(false);
  const [notice, setNotice] = useState('Пещера — твой первый дом. Собери ресурсы и подготовься к Каменному веку.');

  useEffect(() => {
    const saved = loadState();
    const progress = loadProgress();
    setAvatar(saved);
    setDraftGender(saved.gender);
    setDraftColor(saved.color);
    setDraftHair(saved.hair);
    setEquippedId(progress.equippedId);
    setSelectedItemId(progress.equippedId);
    setBossHpById(progress.bossHp);
    setBossWins(progress.bossWins);
    setLoot(progress.loot);
    setProgressHydrated(true);
  }, []);

  useEffect(() => {
    if (!progressHydrated) return;
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify({
        equippedId,
        bossHp: bossHpById,
        bossWins,
        loot,
      } satisfies ProgressState));
    } catch {
      // The alpha remains playable if browser storage is unavailable.
    }
  }, [bossHpById, bossWins, equippedId, loot, progressHydrated]);

  useEffect(() => {
    document.body.classList.add('civilization-no-scroll');
    return () => document.body.classList.remove('civilization-no-scroll');
  }, []);

  useEffect(() => {
    const closeTopLayer = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      if (resourceOpen) {
        setResourceOpen(null);
        return;
      }
      if (profileOpen) {
        setProfileOpen(false);
        return;
      }
      if (tasksExpanded) {
        setTasksExpanded(false);
        return;
      }
      if (panel) setPanel(null);
    };
    window.addEventListener('keydown', closeTopLayer);
    return () => window.removeEventListener('keydown', closeTopLayer);
  }, [panel, profileOpen, resourceOpen, tasksExpanded]);

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
    const currentHp = bossHpById[selectedBossData.id] ?? selectedBossData.hp;
    if (currentHp <= 0) {
      setBossHpById((state) => ({ ...state, [selectedBossData.id]: selectedBossData.hp }));
      setNotice(`${selectedBossData.name}: новая охота началась.`);
      return;
    }

    const nextHp = Math.max(0, currentHp - 22);
    setBossHpById((state) => ({ ...state, [selectedBossData.id]: nextHp }));

    if (nextHp === 0) {
      const previousWins = bossWins[selectedBossData.id] ?? 0;
      const guaranteed = dropName(selectedBossData.drops[0]);
      const bonus = dropName(selectedBossData.drops[1 + (previousWins % Math.max(1, selectedBossData.drops.length - 1))]);
      setBossWins((state) => ({ ...state, [selectedBossData.id]: previousWins + 1 }));
      setLoot((state) => ({
        ...state,
        [guaranteed]: (state[guaranteed] ?? 0) + 1,
        [bonus]: (state[bonus] ?? 0) + 1,
      }));
      setNotice(`${selectedBossData.name} побеждён. Добыто: ${guaranteed} и ${bonus}.`);
    }
  };

  const activeBossHp = Math.min(bossHpById[selectedBossData.id] ?? selectedBossData.hp, selectedBossData.hp);

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
              <button type="button" aria-expanded={resourceOpen === 'food'} className={`civ-resource ${resourceOpen === 'food' ? 'active' : ''}`} onClick={() => setResourceOpen(resourceOpen === 'food' ? null : 'food')}>
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
              <button type="button" aria-expanded={resourceOpen === 'materials'} className={`civ-resource ${resourceOpen === 'materials' ? 'active' : ''}`} onClick={() => setResourceOpen(resourceOpen === 'materials' ? null : 'materials')}>
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
          <button className="civ-avatar-card" type="button" onClick={() => { setProfileOpen(false); setPanel('profile'); }}>
            <Mascot avatar={avatar} compact />
            <span className="civ-player-name">Первобытный</span>
            <small>Ур. 1 · Новичок</small>
            <div className="civ-xp"><i style={{ width: '58%' }} /></div>
            <em>58 / 100 XP</em>
          </button>
          <button className={`civ-player-chevron ${profileOpen ? 'open' : ''}`} type="button" aria-label="Открыть меню персонажа" aria-expanded={profileOpen} onClick={() => setProfileOpen(!profileOpen)}>⌄</button>
          {profileOpen ? (
            <nav className="civ-player-menu">
              {([
                ['profile', '👤', 'Профиль'],
                ['achievements', '🏆', 'Достижения'],
                ['inventory', '🎒', 'Инвентарь'],
                ['evolution', '🌿', 'Эволюция'],
              ] as const).map(([id, icon, label]) => (
                <button type="button" key={id} onClick={() => { setPanel(id); setProfileOpen(false); setResourceOpen(null); }}>
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
          <button type="button" aria-expanded={tasksExpanded} className={`civ-task-expand ${tasksExpanded ? 'open' : ''}`} onClick={() => setTasksExpanded(!tasksExpanded)}>
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
                setSelectedBoss={(id) => { setSelectedBoss(id); }}
                hp={activeBossHp}
                attackBoss={attackBoss}
              />
            ) : null}
            {panel === 'map' ? <MapPanel setNotice={setNotice} /> : null}
            {panel === 'craft' ? <CraftPanel setNotice={setNotice} /> : null}
            {panel === 'tribe' ? <TribePanel setNotice={setNotice} /> : null}
            {panel === 'profile' ? <ProfilePanel avatar={avatar} equippedId={equippedId} /> : null}
            {panel === 'achievements' ? <AchievementsPanel /> : null}
            {panel === 'inventory' ? <InventoryPanel loot={loot} /> : null}
            {panel === 'evolution' ? <EvolutionPanel /> : null}
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
            <button type="button" key={id} className={panel === id ? 'active' : ''} aria-pressed={panel === id} onClick={() => togglePanel(id)}>
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


function ItemArt({ item, large = false }: { item: Item; large?: boolean }) {
  const id = item.id;
  const weapon = item.category === 'weapon';
  const clothes = item.category === 'clothes';
  const accessory = item.category === 'accessory';
  const bow = id === 'bow';
  const spear = id.includes('spear') || id === 'knife' || id === 'flint-shard';
  const axe = id.includes('axe');
  const maul = id.includes('maul') || id.includes('club') || id === 'club';
  const torch = id === 'torch';
  const pick = id === 'pick';

  return (
    <span className={`civ-item-art ${large ? 'large' : ''} art-${item.category} art-${id}`} aria-hidden="true">
      <svg viewBox="0 0 120 120" role="presentation">
        <defs>
          <linearGradient id={`wood-${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#c37b3b" />
            <stop offset="1" stopColor="#58341f" />
          </linearGradient>
          <linearGradient id={`stone-${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#b8b6ac" />
            <stop offset=".55" stopColor="#62676b" />
            <stop offset="1" stopColor="#30363b" />
          </linearGradient>
          <linearGradient id={`hide-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#9b6237" />
            <stop offset="1" stopColor="#3d261b" />
          </linearGradient>
        </defs>

        {weapon && bow ? (
          <>
            <path d="M78 13 Q31 58 75 108" fill="none" stroke="#b17a42" strokeWidth="8" strokeLinecap="round" />
            <path d="M77 14 L76 108" fill="none" stroke="#d9d0ba" strokeWidth="1.8" />
            <path d="M32 78 L92 42" stroke="#87603a" strokeWidth="4" strokeLinecap="round" />
            <path d="M92 42 L82 42 L88 51 Z" fill="#bfc3bf" />
          </>
        ) : weapon && axe ? (
          <>
            <path d="M34 103 L74 25" stroke={`url(#wood-${id})`} strokeWidth="11" strokeLinecap="round" />
            <path d="M65 25 Q82 15 104 27 L92 54 Q77 48 61 39 Z" fill={`url(#stone-${id})`} stroke="#d0a35c" strokeWidth="1.5" />
            <path d="M56 39 L83 48" stroke="#3b261a" strokeWidth="5" />
          </>
        ) : weapon && spear ? (
          <>
            <path d="M28 104 L83 33" stroke={`url(#wood-${id})`} strokeWidth="7" strokeLinecap="round" />
            <path d="M82 34 L96 10 L105 18 L88 39 Z" fill={`url(#stone-${id})`} stroke="#d4c8a9" strokeWidth="1.3" />
            <path d="M72 46 L88 57" stroke="#745037" strokeWidth="3" />
          </>
        ) : weapon && maul ? (
          <>
            <path d="M42 108 L70 45" stroke={`url(#wood-${id})`} strokeWidth="12" strokeLinecap="round" />
            <path d="M50 49 Q58 16 90 16 Q107 30 89 53 Q67 61 50 49 Z" fill={`url(#stone-${id})`} stroke="#d0984a" strokeWidth="2" />
            <path d="M49 52 L82 64 M53 43 L86 55" stroke="#684127" strokeWidth="4" strokeLinecap="round" />
          </>
        ) : clothes ? (
          <>
            <path d="M34 26 L52 16 L68 16 L87 27 L101 50 L87 60 L82 104 L38 104 L33 60 L19 50 Z" fill={`url(#hide-${id})`} stroke="#c99558" strokeWidth="2" />
            <path d="M52 17 Q60 35 68 17" fill="#181719" opacity=".55" />
            <path d="M40 72 Q59 84 80 72" fill="none" stroke="#ddbd8d" strokeWidth="3" strokeDasharray="5 5" />
          </>
        ) : accessory ? (
          <>
            <circle cx="60" cy="57" r="31" fill="none" stroke="#c9a46d" strokeWidth="7" />
            <path d="M60 15 L72 37 L60 52 L48 37 Z" fill="#d9b14f" stroke="#ffde82" strokeWidth="1.5" />
            <circle cx="60" cy="58" r="8" fill="#6d4a2c" />
          </>
        ) : torch ? (
          <>
            <path d="M44 108 L68 49" stroke={`url(#wood-${id})`} strokeWidth="12" strokeLinecap="round" />
            <path d="M56 49 Q39 31 56 10 Q62 26 73 13 Q88 34 67 51 Z" fill="#ff9d2d" stroke="#ffd568" strokeWidth="2" />
          </>
        ) : pick ? (
          <>
            <path d="M42 104 L72 40" stroke={`url(#wood-${id})`} strokeWidth="10" strokeLinecap="round" />
            <path d="M28 36 Q62 15 101 33" fill="none" stroke={`url(#stone-${id})`} strokeWidth="10" strokeLinecap="round" />
          </>
        ) : (
          <>
            <path d="M39 105 L72 39" stroke={`url(#wood-${id})`} strokeWidth="10" strokeLinecap="round" />
            <path d="M51 43 Q65 22 91 31 L78 55 Z" fill={`url(#stone-${id})`} stroke="#d1a05b" strokeWidth="2" />
          </>
        )}
      </svg>
    </span>
  );
}


function ProfilePanel({ avatar, equippedId }: { avatar: AvatarState; equippedId: string }) {
  const equipped = equipment.find((item) => item.id === equippedId) ?? equipment[0];
  return (
    <div className="civ-panel-body civ-profile-panel">
      <header className="civ-panel-head">
        <div><small>Персонаж</small><h2>Профиль</h2><p>Стартовая внешность зафиксирована. Новые элементы образа открываются только через развитие и трофеи.</p></div>
      </header>
      <div className="civ-profile-layout">
        <article className="civ-profile-hero-card">
          <div className="civ-profile-mascot"><Mascot avatar={avatar} /></div>
          <div className="civ-profile-identity"><small>Первобытный</small><h3>Новичок · уровень 1</h3><div className="civ-xp"><i style={{ width: '58%' }} /></div><span>58 / 100 XP</span></div>
        </article>
        <div className="civ-profile-stats">
          <article><small>Базовая сила</small><strong>12</strong><span>урон и переносимый вес</span></article>
          <article><small>Выносливость</small><strong>10</strong><span>запас энергии и защита</span></article>
          <article><small>Ловкость</small><strong>8</strong><span>критический шанс и уклонение</span></article>
          <article><small>Власть</small><strong>37</strong><span>влияние внутри племени</span></article>
        </div>
        <article className="civ-profile-loadout">
          <div><small>Используется</small><h3>{equipped.name}</h3><p>{equipped.stat} +{equipped.value}</p></div>
          <ItemArt item={equipped} large />
        </article>
        <article className="civ-profile-origin">
          <small>Созданный персонаж</small>
          <h3>{avatar.gender === 'female' ? 'Девочка' : 'Мальчик'} · стартовая форма</h3>
          <p>Цвет и стартовая внешность больше не редактируются. Причёски, краски, маски и редкие элементы тела будут выпадать с боссов и открываться на уровнях.</p>
          <div className="civ-profile-unlocks"><span>Ур. 3 · краски</span><span>Ур. 5 · аксессуары</span><span>Ур. 8 · редкие причёски</span></div>
        </article>
      </div>
    </div>
  );
}

function AchievementsPanel() {
  const achievements = [
    ['Первый огонь', 'Развести костёр впервые', '✓', 'Получено'],
    ['Каменный мастер', 'Создать первый инструмент', '2/5', 'В процессе'],
    ['Охотник', 'Победить первого босса', '0/1', 'В процессе'],
    ['Собиратель', 'Собрать 500 единиц еды', '340/500', 'В процессе'],
    ['Голос племени', 'Набрать 100 власти', '37/100', 'В процессе'],
    ['Следующая эпоха', 'Перейти в Каменный век', '🔒', 'Скрыто'],
  ];
  return (
    <div className="civ-panel-body civ-achievements-panel">
      <header className="civ-panel-head"><div><small>Прогресс аккаунта</small><h2>Достижения</h2><p>Вехи показывают, что уже освоено и какие долгосрочные цели ждут впереди.</p></div></header>
      <div className="civ-achievement-grid">
        {achievements.map(([title, text, progress, state], index) => (
          <article key={title} className={index === 0 ? 'done' : index === achievements.length - 1 ? 'locked' : ''}>
            <span className="civ-achievement-medal">{index === 0 ? '★' : index === 5 ? '◆' : '◇'}</span>
            <div><small>{state}</small><h3>{title}</h3><p>{text}</p></div>
            <strong>{progress}</strong>
          </article>
        ))}
      </div>
    </div>
  );
}

function InventoryPanel({ loot }: { loot: Record<string, number> }) {
  const groups = [
    { title: 'Пища', items: [['Ягоды','120'],['Мясо','85'],['Грибы','45'],['Рыба','90']] },
    { title: 'Материалы', items: [['Дерево','120'],['Камень','210'],['Кремень','37'],['Шкуры','28'],['Кости','16']] },
    { title: 'Трофеи', items: [
      ['Клык саблезуба', String(loot['Клык саблезуба'] ?? 0)],
      ['Бивень мамонта', String(loot['Бивень мамонта'] ?? 0)],
      ['Тотем вожака', String(loot['Тотем вожака'] ?? 0)],
      ['Редкий камень', String(loot['Редкий камень'] ?? 0)],
    ] },
  ];
  return (
    <div className="civ-panel-body civ-inventory-panel">
      <header className="civ-panel-head"><div><small>Хранилище</small><h2>Инвентарь</h2><p>Все расходники, материалы и трофеи. Снаряжение управляется отдельно через нижнее меню.</p></div></header>
      <div className="civ-inventory-groups">
        {groups.map((group) => (
          <section key={group.title}><h3>{group.title}</h3>
            <div>{group.items.map(([name,value]) => <article key={name}><span className="civ-inventory-glyph">{group.title === 'Пища' ? '●' : group.title === 'Трофеи' ? '◆' : '■'}</span><b>{name}</b><strong>{value}</strong></article>)}</div>
          </section>
        ))}
      </div>
    </div>
  );
}

function EvolutionPanel() {
  const steps = [
    ['Ур. 1', 'Пещерный житель', 'Стартовая форма', true],
    ['Ур. 3', 'Краски племени', 'Цветовые узоры и боевые метки', false],
    ['Ур. 5', 'Охотник', 'Трофейные аксессуары и новые стойки', false],
    ['Ур. 8', 'Вожак', 'Редкие причёски и украшения', false],
    ['Ур. 12', 'Старейшина', 'Эпические элементы внешности', false],
  ];
  return (
    <div className="civ-panel-body civ-evolution-panel">
      <header className="civ-panel-head"><div><small>Развитие персонажа</small><h2>Эволюция</h2><p>Уровни открывают не только силу, но и новую кастомизацию. Стартовые параметры изменить нельзя.</p></div></header>
      <div className="civ-evolution-track">
        {steps.map(([level,title,text,open], index) => (
          <article key={level as string} className={open ? 'active' : ''}>
            <span>{open ? '✓' : index + 1}</span><small>{level}</small><h3>{title}</h3><p>{text}</p><em>{open ? 'Открыто' : 'Закрыто'}</em>
          </article>
        ))}
      </div>
      <div className="civ-evolution-note"><strong>Следующий заметный unlock — уровень 3</strong><p>Откроются боевые метки и первые цветовые узоры, которые можно получить через задания и ранних боссов.</p></div>
    </div>
  );
}

function Mascot({ avatar, compact = false }: { avatar: AvatarState; compact?: boolean }) {
  const hair = avatar.gender === 'female' && avatar.hair !== 'Лысый';
  return (
    <div className={`civ-mascot ${compact ? 'compact' : ''}`} style={{ '--civ-skin': avatar.color } as CSSProperties}>
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
          <button key={id} type="button" aria-pressed={category === id} className={category === id ? 'active' : ''} onClick={() => { setCategory(id); const first = equipment.find(item => item.category === id); if (first) setSelectedItemId(first.id); }}>{icon} {label}</button>
        ))}
      </div>
      <div className="civ-equipment-layout">
        <div className="civ-item-grid">
          {items.map(item => (
            <button type="button" key={item.id} className={`civ-item-card ${selectedItem.id === item.id ? 'active' : ''} ${item.locked ? 'locked' : ''}`} onClick={() => setSelectedItemId(item.id)}>
              <ItemArt item={item} /><b>{item.name}</b><small>{item.locked ? `Ур. ${item.level}` : `${item.stat} +${item.value}`}</small>{item.locked ? <em>🔒</em> : null}
            </button>
          ))}
        </div>
        <article className="civ-item-detail">
          <div className="civ-item-hero"><ItemArt item={selectedItem} large /></div>
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


function BossArt({ boss, large = false }: { boss: Boss; large?: boolean }) {
  return (
    <span className={`civ-boss-illustration boss-${boss.id} ${large ? 'large' : ''}`} aria-hidden="true">
      <svg viewBox="0 0 220 180" role="presentation">
        <defs>
          <radialGradient id={`boss-bg-${boss.id}`} cx=".5" cy=".42" r=".62">
            <stop offset="0" stopColor={boss.id === 'tiger' ? '#c96e27' : boss.id === 'mammoth' ? '#7a716b' : '#73523b'} stopOpacity=".74" />
            <stop offset="1" stopColor="#12110f" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`boss-fur-${boss.id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={boss.id === 'tiger' ? '#d98a39' : boss.id === 'mammoth' ? '#786b61' : '#806048'} />
            <stop offset=".55" stopColor={boss.id === 'tiger' ? '#a84f21' : boss.id === 'mammoth' ? '#4d4947' : '#513a2c'} />
            <stop offset="1" stopColor="#241914" />
          </linearGradient>
        </defs>
        <ellipse cx="110" cy="100" rx="100" ry="76" fill={`url(#boss-bg-${boss.id})`} />
        {boss.id === 'tiger' ? (
          <>
            <path d="M51 70 L31 24 L75 47 Q110 27 145 47 L188 24 L169 71 Q184 93 174 127 Q153 160 110 163 Q65 161 45 127 Q35 94 51 70 Z" fill={`url(#boss-fur-${boss.id})`} stroke="#e1a34e" strokeWidth="3" />
            <path d="M44 45 L72 67 M176 45 L148 67 M77 48 L88 72 M143 48 L132 72 M63 88 L84 95 M157 88 L136 95" stroke="#311b14" strokeWidth="8" strokeLinecap="round" opacity=".85"/>
            <path d="M75 109 Q90 93 109 103 Q129 93 145 109 Q137 145 110 151 Q82 145 75 109 Z" fill="#eee0c3" opacity=".93"/>
            <ellipse cx="81" cy="88" rx="10" ry="8" fill="#0a0807"/><ellipse cx="139" cy="88" rx="10" ry="8" fill="#0a0807"/>
            <circle cx="84" cy="86" r="2.5" fill="#f6d266"/><circle cx="142" cy="86" r="2.5" fill="#f6d266"/>
            <path d="M104 111 L116 111 L110 120 Z" fill="#2a1915"/>
            <path d="M91 124 L97 153 L105 128 M129 124 L123 153 L115 128" fill="#f5e4bd" stroke="#d5bd91" strokeWidth="1.5"/>
          </>
        ) : boss.id === 'mammoth' ? (
          <>
            <path d="M46 87 Q47 36 95 27 Q148 19 178 58 Q195 88 176 127 Q158 159 112 161 Q62 161 43 125 Q34 105 46 87 Z" fill={`url(#boss-fur-${boss.id})`} stroke="#9e8d7f" strokeWidth="3"/>
            <path d="M45 85 Q22 83 18 109 Q18 133 46 139" fill="#514944" stroke="#887a70" strokeWidth="3"/>
            <path d="M175 84 Q203 83 207 108 Q207 132 177 139" fill="#514944" stroke="#887a70" strokeWidth="3"/>
            <path d="M103 99 Q119 96 127 113 L124 149 Q121 170 104 170 Q91 168 92 151 L94 113 Q95 103 103 99 Z" fill="#5c514b"/>
            <path d="M85 119 Q66 128 62 154 Q77 144 94 141 M139 119 Q158 128 163 154 Q148 144 130 141" fill="none" stroke="#ead9ac" strokeWidth="8" strokeLinecap="round"/>
            <ellipse cx="83" cy="86" rx="8" ry="6" fill="#0c0908"/><ellipse cx="142" cy="86" rx="8" ry="6" fill="#0c0908"/>
            <path d="M65 54 Q80 39 95 33 M158 54 Q143 39 129 33" stroke="#2d2927" strokeWidth="7" strokeLinecap="round" opacity=".65"/>
          </>
        ) : (
          <>
            <path d="M48 80 Q54 37 92 27 Q133 14 169 48 Q190 76 177 119 Q163 158 111 164 Q61 158 42 121 Q32 97 48 80 Z" fill={`url(#boss-fur-${boss.id})`} stroke="#9d7550" strokeWidth="3"/>
            <path d="M62 80 Q75 52 105 50 Q140 46 160 78 Q162 120 139 142 Q109 157 79 141 Q57 120 62 80 Z" fill="#a67b59"/>
            <path d="M72 52 Q52 38 42 61 M149 51 Q171 36 181 60" fill="none" stroke="#503729" strokeWidth="15" strokeLinecap="round"/>
            <ellipse cx="83" cy="91" rx="9" ry="7" fill="#090706"/><ellipse cx="139" cy="91" rx="9" ry="7" fill="#090706"/>
            <path d="M92 119 Q110 132 130 118" fill="none" stroke="#3b251d" strokeWidth="6" strokeLinecap="round"/>
            <path d="M110 24 L123 6 L135 29 L154 17 L150 46 L70 46 L68 18 L88 30 L98 7 Z" fill="#d99b39" stroke="#f2c36d" strokeWidth="2"/>
          </>
        )}
      </svg>
    </span>
  );
}

function BossesPanel({ bosses, selected, selectedBoss, setSelectedBoss, hp, attackBoss }: { bosses: Boss[]; selected: Boss; selectedBoss: string; setSelectedBoss: (id: string) => void; hp: number; attackBoss: () => void }) {
  return (
    <div className="civ-panel-body bosses">
      <header className="civ-panel-head"><div><small>Охота и трофеи</small><h2>Боссы</h2><p>Побеждай существ эпохи, получай уникальные материалы и кастомизацию.</p></div></header>
      <div className="civ-boss-layout">
        <div className="civ-boss-list">
          {bosses.map(boss => <button key={boss.id} type="button" className={selectedBoss === boss.id ? 'active' : ''} onClick={() => setSelectedBoss(boss.id)}><BossArt boss={boss} /><div><b>{boss.name}</b><small>Ур. {boss.level}</small></div><em>›</em></button>)}
        </div>
        <article className="civ-boss-detail">
          <div className="civ-boss-art"><BossArt boss={selected} large /></div>
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
