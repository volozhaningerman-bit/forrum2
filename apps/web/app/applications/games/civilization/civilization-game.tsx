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
  ['Пещера', 'Открыто', 'cave'],
  ['Каменный век', 'Ур. 5 · 500 камня · 100 власти', 'stone'],
  ['Бронзовый век', 'После Каменного века', 'bronze'],
  ['Железный век', 'После Бронзового века', 'iron'],
  ['Средневековье', 'Позже', 'medieval'],
] as const;

const craftRecipes = [
  { name: 'Каменный топор', itemId: 'axe', needs: '40 камня · 20 дерева', ready: true },
  { name: 'Факел', itemId: 'torch', needs: '15 дерева · 5 смолы', ready: true },
  { name: 'Каменная кирка', itemId: 'pick', needs: '60 камня · 30 дерева', ready: false },
  { name: 'Шкура охотника', itemId: 'fur', needs: '3 шкуры · 10 костей', ready: false },
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

type CivGlyph = 'cave' | 'fire' | 'energy' | 'food' | 'resources' | 'power' | 'equipment' | 'clothes' | 'accessory' | 'bosses' | 'map' | 'craft' | 'tribe' | 'profile' | 'achievements' | 'inventory' | 'evolution';

function CivSymbol({ kind }: { kind: CivGlyph }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  return (
    <span className="civ-icon civ-vector-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" role="presentation">
        {kind === 'cave' ? <><path {...common} d="M3 19c2.5-7.8 5.6-12 9-15 3.5 3 6.6 7.2 9 15"/><path {...common} d="M8.2 19c.7-4.6 2-7.3 3.8-9 1.9 1.7 3.2 4.4 3.8 9"/><path {...common} d="M3 19h18"/></> : null}
        {kind === 'fire' ? <path d="M13 2.7c.9 3.2-.7 4.8-1.8 6.1-.9-1.9-2.2-3-3.9-4.2.4 3.8-3.3 5.7-3.3 10.1A8 8 0 0 0 12 22a8 8 0 0 0 8-7.6c0-4.5-2.9-8-7-11.7Zm-1 16.2c-1.8 0-3.2-1.4-3.2-3.2 0-1.4.8-2.5 2-3.6.1 1.2.6 2 1.3 2.6.7-.8 1.2-1.8 1.2-3.2 1.3 1.1 2 2.5 2 4.1 0 1.8-1.5 3.3-3.3 3.3Z" fill="currentColor"/> : null}
        {kind === 'energy' ? <path d="M13.8 2.5 6.2 13h5.2L10.2 21.5 18 10.4h-5.1z" fill="currentColor"/> : null}
        {kind === 'food' ? <><path {...common} d="M12 7.5c-4-4.1-8.6-1.4-8.6 3.2 0 5 4.1 8.8 8.6 10.3 4.5-1.5 8.6-5.3 8.6-10.3 0-4.6-4.6-7.3-8.6-3.2Z"/><path {...common} d="M12 7.5c.1-3.2 1.8-5 4.9-5"/><path {...common} d="M15.5 4.1c1.7-.4 3 .1 4 1.5"/></> : null}
        {kind === 'resources' ? <><path {...common} d="m5 8 7-5 7 5-7 5z"/><path {...common} d="m5 8 1.2 8.1L12 21l5.8-4.9L19 8"/><path {...common} d="M12 13v8"/></> : null}
        {kind === 'power' ? <><path {...common} d="M4 8h16l-2 11H6z"/><path {...common} d="m5 8-2-4 5 2 4-4 4 4 5-2-2 4"/></> : null}
        {kind === 'equipment' ? <><path {...common} d="M4 4l16 16M20 4 4 20"/><path {...common} d="m3 3 4 1-3 3zM21 3l-4 1 3 3z"/></> : null}
        {kind === 'clothes' ? <><path {...common} d="M8 4 4 7l2.2 4L8 10v10h8V10l1.8 1L20 7l-4-3-2 2h-4z"/><path {...common} d="M10 4c.5 1.4 1.2 2.1 2 2.1S13.5 5.4 14 4"/></> : null}
        {kind === 'accessory' ? <><circle {...common} cx="12" cy="13" r="6"/><path {...common} d="m9 7 3-4 3 4-3 3z"/></> : null}
        {kind === 'bosses' ? <><path {...common} d="M5 10c0-4.2 3.1-7 7-7s7 2.8 7 7c0 3.2-1.7 5.2-4.2 6.2V21l-2.8-2-2.8 2v-4.8C6.7 15.2 5 13.2 5 10Z"/><circle cx="9.2" cy="10.2" r="1.4" fill="currentColor"/><circle cx="14.8" cy="10.2" r="1.4" fill="currentColor"/></> : null}
        {kind === 'map' ? <><path {...common} d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3z"/><path {...common} d="M9 3v15M15 6v15"/></> : null}
        {kind === 'craft' ? <><path {...common} d="m14.5 4.5 5 5-2.8 2.8-5-5z"/><path {...common} d="M13 9 5.3 16.7a2.2 2.2 0 0 0 0 3.1 2.2 2.2 0 0 0 3.1 0L16 12.2"/></> : null}
        {kind === 'tribe' ? <><path {...common} d="M4 20 12 4l8 16z"/><path {...common} d="M8.5 20 12 13l3.5 7"/></> : null}
        {kind === 'profile' ? <><circle {...common} cx="12" cy="8" r="4"/><path {...common} d="M4.5 21c.8-5 3.2-7.4 7.5-7.4s6.7 2.4 7.5 7.4"/></> : null}
        {kind === 'achievements' ? <><path {...common} d="M8 4h8v4c0 3-1.7 5-4 5s-4-2-4-5z"/><path {...common} d="M8 6H4c0 3 1.6 5 4.4 5M16 6h4c0 3-1.6 5-4.4 5M12 13v4M8 21h8M9 17h6"/></> : null}
        {kind === 'inventory' ? <><path {...common} d="M5 8h14l1 13H4z"/><path {...common} d="M9 8V6a3 3 0 0 1 6 0v2"/></> : null}
        {kind === 'evolution' ? <><path {...common} d="M12 21V9M12 15c-4 0-7-2-8-6 4 0 7 1 8 4M12 11c3.9 0 6.5-2 7.5-6-4 0-6.8 1.3-7.5 4"/></> : null}
      </svg>
    </span>
  );
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
            <CivSymbol kind="cave" />
            <span><small>Локация</small><strong>В пещере</strong></span>
            <b>⌄</b>
          </button>

          <div className="civ-resource-strip">
            <button type="button" className="civ-resource" onClick={() => setResourceOpen(null)}>
              <CivSymbol kind="energy" /><span><strong>100/100</strong><small>Энергия</small></span><b>+</b>
            </button>
            <div className="civ-resource-wrap">
              <button type="button" aria-expanded={resourceOpen === 'food'} className={`civ-resource ${resourceOpen === 'food' ? 'active' : ''}`} onClick={() => setResourceOpen(resourceOpen === 'food' ? null : 'food')}>
                <CivSymbol kind="food" /><span><strong>340</strong><small>Еда</small></span><b>{resourceOpen === 'food' ? '⌃' : '⌄'}</b>
              </button>
              {resourceOpen === 'food' ? (
                <div className="civ-resource-popover">
                  <div className="civ-popover-title"><b>Еда</b><small>340 всего</small></div>
                  <ResourceRow kind="berries" label="Ягоды" value="120" />
                  <ResourceRow kind="meat" label="Мясо" value="85" />
                  <ResourceRow kind="mushrooms" label="Грибы" value="45" />
                  <ResourceRow kind="fish" label="Рыба" value="90" />
                </div>
              ) : null}
            </div>
            <div className="civ-resource-wrap">
              <button type="button" aria-expanded={resourceOpen === 'materials'} className={`civ-resource ${resourceOpen === 'materials' ? 'active' : ''}`} onClick={() => setResourceOpen(resourceOpen === 'materials' ? null : 'materials')}>
                <CivSymbol kind="resources" /><span><strong>411</strong><small>Ресурсы</small></span><b>{resourceOpen === 'materials' ? '⌃' : '⌄'}</b>
              </button>
              {resourceOpen === 'materials' ? (
                <div className="civ-resource-popover resources">
                  <div className="civ-popover-title"><b>Ресурсы</b><small>Материалы лагеря</small></div>
                  <ResourceRow kind="wood" label="Дерево" value="120" />
                  <ResourceRow kind="stone" label="Камень" value="210" />
                  <ResourceRow kind="flint" label="Кремень" value="37" />
                  <ResourceRow kind="hide" label="Шкуры" value="28" />
                  <ResourceRow kind="bone" label="Кости" value="16" />
                </div>
              ) : null}
            </div>
            <button type="button" className="civ-resource" onClick={() => setNotice('Власть растёт от боссов, заданий, племени и редких трофеев.')}>
              <CivSymbol kind="power" /><span><strong>37</strong><small>Власть</small></span><b>+</b>
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
                ['profile', 'profile', 'Профиль'],
                ['achievements', 'achievements', 'Достижения'],
                ['inventory', 'inventory', 'Инвентарь'],
                ['evolution', 'evolution', 'Эволюция'],
              ] as const).map(([id, icon, label]) => (
                <button type="button" key={id} onClick={() => { setPanel(id); setProfileOpen(false); setResourceOpen(null); }}>
                  <CivSymbol kind={icon} />{label}
                </button>
              ))}
            </nav>
          ) : null}
        </aside>

        <main className="civ-scene">
          <img className="civ-cave-background" src="/games/civilization/cave-hub.svg" alt="Пещера первобытного лагеря" />
          <div className="civ-mascot-stage"><Mascot avatar={avatar} /></div>
          <Hotspot className="fire" icon="fire" title="Костёр" text="Восстановить энергию" onClick={() => setNotice('Костёр восстановит энергию после короткого отдыха.')} />
          <Hotspot className="bench" icon="craft" title="Верстак" text="Создание предметов" onClick={() => setPanel('craft')} />
          <Hotspot className="stash" icon="inventory" title="Тайник" text="Ресурсы и трофеи" onClick={() => setResourceOpen('materials')} />
          <Hotspot className="exit" icon="map" title="Выход" text="Исследовать мир" onClick={() => setPanel('map')} />
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
            ['equipment', 'equipment', 'Снаряжение'],
            ['bosses', 'bosses', 'Боссы'],
            ['map', 'map', 'Карта'],
            ['craft', 'craft', 'Крафт'],
            ['tribe', 'tribe', 'Племя'],
          ] as const).map(([id, icon, label]) => (
            <button type="button" key={id} className={panel === id ? 'active' : ''} aria-pressed={panel === id} onClick={() => togglePanel(id)}>
              <CivSymbol kind={icon} /><b>{label}</b>
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
  const hairMode = avatar.hair === 'Пучок' ? 'bun' : avatar.hair === 'Косы' ? 'braids' : avatar.hair === 'Длинные' ? 'long' : 'short';

  return (
    <svg
      className={`civ-mascot-svg ${compact ? 'compact' : ''} ${avatar.gender}`}
      viewBox="0 0 240 340"
      role="img"
      aria-label={avatar.gender === 'female' ? 'Персонаж: первобытная девушка' : 'Персонаж: первобытный мужчина'}
      style={{ '--civ-skin': avatar.color } as CSSProperties}
    >
      <defs>
        <linearGradient id="mascot-fur" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#9a6039" />
          <stop offset=".45" stopColor="#5a3424" />
          <stop offset="1" stopColor="#2f201a" />
        </linearGradient>
        <linearGradient id="mascot-fur-light" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#dcc09a" />
          <stop offset="1" stopColor="#8f6b4d" />
        </linearGradient>
        <linearGradient id="mascot-wood" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#a96934" />
          <stop offset=".5" stopColor="#704225" />
          <stop offset="1" stopColor="#3c2418" />
        </linearGradient>
        <linearGradient id="mascot-stone" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#98948b" />
          <stop offset=".45" stopColor="#5f6362" />
          <stop offset="1" stopColor="#2f3436" />
        </linearGradient>
        <radialGradient id="mascot-head-glow" cx=".36" cy=".25" r=".78">
          <stop offset="0" stopColor="#fff" stopOpacity=".28" />
          <stop offset=".6" stopColor="#fff" stopOpacity=".04" />
          <stop offset="1" stopColor="#3b1207" stopOpacity=".18" />
        </radialGradient>
        <filter id="mascot-shadow" x="-35%" y="-35%" width="170%" height="190%">
          <feDropShadow dx="0" dy="13" stdDeviation="8" floodColor="#000" floodOpacity=".52" />
        </filter>
        <filter id="mascot-soft" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>

      <ellipse cx="119" cy="316" rx="73" ry="15" fill="#020304" opacity=".58" filter="url(#mascot-soft)" />

      {!compact ? (
        <g className="civ-mascot-weapon" filter="url(#mascot-shadow)">
          <path d="M189 300 161 173" stroke="url(#mascot-wood)" strokeWidth="17" strokeLinecap="round" />
          <path d="M155 181 176 171M159 194 180 184" stroke="#d0a46c" strokeWidth="4" strokeLinecap="round" />
          <path d="M148 156c6-21 18-36 37-45 15 7 24 18 28 32-7 17-20 28-38 35-14-3-23-10-27-22Z" fill="url(#mascot-stone)" stroke="#d4a55c" strokeWidth="2.4" />
          <path d="m163 130 20-7 13 17-18 13-21-5Z" fill="#b0afa6" opacity=".32" />
          <path d="M154 163c11 2 24 8 33 17M151 172c12 2 23 7 33 15" fill="none" stroke="#5d3a25" strokeWidth="5" strokeLinecap="round" />
        </g>
      ) : null}

      <g filter="url(#mascot-shadow)">
        <path d="M75 267c-7 20-9 39-5 56h39l3-58Z" fill="#5b3b2d" stroke="#2b1c17" strokeWidth="2.4" />
        <path d="M128 265l4 58h39c5-18 3-37-6-56Z" fill="#4a3027" stroke="#261a16" strokeWidth="2.4" />
        <path d="M69 306h42v17H65c-4-6-3-12 4-17Zm62 0h42c7 5 8 11 4 17h-46Z" fill="#3b2c26" />
        <path d="M68 293h44M131 293h42" stroke="#9b6b49" strokeWidth="5" strokeDasharray="7 5" opacity=".85" />

        <path d="M70 151c15-15 32-22 50-22 20 0 38 8 52 23l5 103c-13 21-31 31-56 31-24 0-43-10-57-31Z" fill="var(--civ-skin)" stroke="#9c5e39" strokeWidth="2.8" />
        <path d="M63 171c-18 23-24 48-18 76 5 10 14 14 26 11l16-60Z" fill="var(--civ-skin)" stroke="#985936" strokeWidth="2.4" />
        <path d="M178 171c18 23 24 48 18 76-5 10-14 14-26 11l-16-60Z" fill="var(--civ-skin)" stroke="#985936" strokeWidth="2.4" />
        <path d="M48 238c2 17 11 25 26 23 8-6 11-14 8-24Z" fill="var(--civ-skin)" />
        <path d="M193 238c-2 17-11 25-26 23-8-6-11-14-8-24Z" fill="var(--civ-skin)" />

        <path d="M66 169c17 7 34 9 52 6 20 3 40 1 59-6l-3 93c-16 15-34 23-54 23-21 0-39-8-55-23Z" fill="url(#mascot-fur)" />
        <path d="m67 169 12 9 11-11 13 12 12-13 14 12 14-12 12 12 12-9v34c-11-4-22-5-32-2-17 5-31 3-42-4-10-6-19-7-26-4Z" fill="#b77a48" opacity=".36" />
        <path d="M65 257c15 4 28 2 39-6 11 12 23 13 36 3 11 8 22 8 33 2l1 20c-14 15-32 22-54 22-23 0-41-7-55-22Z" fill="url(#mascot-fur-light)" opacity=".96" />
        <path d="M63 198c36 9 76 9 115 0" stroke="#302019" strokeWidth="8" />
        <path d="M64 197c36 8 75 8 113 0" stroke="#aa754a" strokeWidth="3.3" strokeDasharray="5 5" />

        <path d="M77 151c14-15 29-22 44-22s30 7 45 22l-9 15c-11-12-23-18-36-18-14 0-26 6-36 18Z" fill="#f0e3c6" opacity=".86" />
        <g fill="#efe5cc" stroke="#9e8155" strokeWidth="1">
          <path d="m92 149 8 16 9-15-8-9Z"/><path d="m108 149 10 18 10-18-10-8Z"/><path d="m128 149 9 16 9-16-9-8Z"/>
        </g>
      </g>

      <g filter="url(#mascot-shadow)">
        <ellipse cx="121" cy="94" rx="72" ry="68" fill="var(--civ-skin)" stroke="#a3623c" strokeWidth="3" />
        <ellipse cx="120" cy="89" rx="68" ry="64" fill="url(#mascot-head-glow)" />
        <ellipse cx="51" cy="101" rx="15" ry="21" fill="var(--civ-skin)" stroke="#9b5936" strokeWidth="2" />
        <ellipse cx="190" cy="101" rx="15" ry="21" fill="var(--civ-skin)" stroke="#9b5936" strokeWidth="2" />
        <path d="M77 77c10-7 20-9 29-5" stroke="#201914" strokeWidth="7" strokeLinecap="round" />
        <path d="M134 73c10-4 20-2 29 5" stroke="#201914" strokeWidth="7" strokeLinecap="round" />
        <ellipse cx="91" cy="96" rx="7.5" ry="12" fill="#171514" />
        <ellipse cx="150" cy="96" rx="7.5" ry="12" fill="#171514" />
        <ellipse cx="89" cy="91" rx="2.2" ry="3.8" fill="#fff" opacity=".78" />
        <ellipse cx="148" cy="91" rx="2.2" ry="3.8" fill="#fff" opacity=".78" />
        <path d="M111 108c5 3 11 3 17 0" fill="none" stroke="#a25f3b" strokeWidth="3" strokeLinecap="round" opacity=".55" />
        <path d="M101 120c12 10 26 10 39 0" fill="none" stroke="#2a1814" strokeWidth="4" strokeLinecap="round" />
        <path d="M78 111h-19m18 8H60m104-8h18m-19 8h17" stroke="#f5e9d9" strokeWidth="5" strokeLinecap="round" opacity=".82" />
        <path d="M72 48c15-22 33-31 55-29 22 2 40 12 54 31-8-37-30-55-62-55-30 0-53 18-67 52Z" fill="#2b1a14" opacity=".2" />
      </g>

      {hair ? (
        <g className={`civ-svg-hair hair-${hairMode}`} filter="url(#mascot-shadow)">
          {hairMode === 'bun' ? (
            <>
              <circle cx="118" cy="28" r="27" fill="#3b2118" />
              <path d="M61 84c0-44 25-67 62-67 34 0 57 20 62 58-17-15-32-22-46-24-25-4-48 6-78 33Z" fill="#4c291d" />
              <path d="M105 17c10-14 23-18 39-12-5 4-8 9-8 14" fill="none" stroke="#74432d" strokeWidth="8" strokeLinecap="round" />
              <path d="M65 79c5-14 13-25 25-34M173 76c-6-16-15-27-28-35" stroke="#6f3e2b" strokeWidth="8" strokeLinecap="round" />
            </>
          ) : hairMode === 'braids' ? (
            <>
              <path d="M59 83c2-43 26-65 63-65 36 0 58 21 61 59-22-19-42-27-61-25-22 2-42 12-63 31Z" fill="#46261b" />
              <path d="M65 71c-17 27-18 55-4 84M178 71c16 28 17 56 3 84" fill="none" stroke="#4c2a1e" strokeWidth="12" strokeLinecap="round" strokeDasharray="12 7" />
            </>
          ) : hairMode === 'long' ? (
            <>
              <path d="M55 86c-2-46 23-70 65-70 40 0 64 23 64 68l-8 77c-16 8-29 3-38-13 7-31 5-59-5-84-20-7-38-4-55 10-4 30-1 57 8 82-11 11-23 13-37 5Z" fill="#43241b" />
              <path d="M66 74c18-19 39-29 64-30 19 1 35 8 49 22" fill="none" stroke="#70402c" strokeWidth="8" strokeLinecap="round" />
            </>
          ) : (
            <path d="M58 84c2-44 26-66 64-66 35 0 58 20 62 59-18-16-36-24-53-24-24 0-47 10-73 31Z" fill="#45261c" />
          )}
          <path d="M126 18 141 5l11 14-12 10" fill="#e9dfc6" stroke="#8c724d" strokeWidth="2" />
        </g>
      ) : null}
    </svg>
  );
}

function Hotspot({ className, icon, title, text, onClick }: { className: string; icon: CivGlyph; title: string; text: string; onClick: () => void }) {
  return <button type="button" className={`civ-hotspot ${className}`} onClick={onClick}><CivSymbol kind={icon} /><div><b>{title}</b><small>{text}</small></div><em>›</em></button>;
}

type ResourceArtKind = 'berries' | 'meat' | 'mushrooms' | 'fish' | 'wood' | 'stone' | 'flint' | 'hide' | 'bone';

function ResourceArt({ kind }: { kind: ResourceArtKind }) {
  return (
    <span className={`civ-resource-art resource-${kind}`} aria-hidden="true">
      <svg viewBox="0 0 48 48" role="presentation">
        <defs>
          <linearGradient id={`resource-red-${kind}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ff6152"/><stop offset="1" stopColor="#9b1f2b"/></linearGradient>
          <linearGradient id={`resource-brown-${kind}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#c98243"/><stop offset="1" stopColor="#56301d"/></linearGradient>
          <linearGradient id={`resource-stone-${kind}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#b9bbb6"/><stop offset=".55" stopColor="#6b7072"/><stop offset="1" stopColor="#343a3d"/></linearGradient>
        </defs>
        {kind === 'berries' ? <>
          <path d="M13 14c3-6 8-8 13-5-2 3-2 6-1 8-5 2-9 1-12-3Z" fill="#4f8d3f"/>
          <path d="M25 10c5-4 10-2 12 3-4 0-7 2-9 5-2-2-3-5-3-8Z" fill="#6ea44e"/>
          <circle cx="16" cy="27" r="9" fill="url(#resource-red-berries)" /><circle cx="28" cy="25" r="9" fill="#d52d45"/><circle cx="23" cy="35" r="8" fill="#ba2437"/>
          <g fill="#ffd58a" opacity=".72"><circle cx="13" cy="25" r="1"/><circle cx="20" cy="31" r="1"/><circle cx="28" cy="22" r="1"/><circle cx="31" cy="29" r="1"/></g>
        </> : null}
        {kind === 'meat' ? <>
          <path d="M12 17c7-8 18-9 25-1 6 7 4 16-4 22-8 5-17 3-22-3-5-6-4-13 1-18Z" fill="url(#resource-red-meat)" stroke="#ee8f7f" strokeWidth="1.5"/>
          <path d="M31 34c5 2 8 1 10-2 2-4 0-7-4-8" fill="none" stroke="#ead7b9" strokeWidth="7" strokeLinecap="round"/>
          <path d="M17 19c5-3 10-3 15 0M16 27c6-2 11-1 16 2" fill="none" stroke="#ffc2ad" strokeWidth="2" opacity=".65"/>
        </> : null}
        {kind === 'mushrooms' ? <>
          <path d="M12 27c0-7 5-12 12-12s12 5 12 12Z" fill="#d94337" stroke="#ff8b72" strokeWidth="1.5"/>
          <path d="M20 26h8l2 15H18Z" fill="#d6b88e"/>
          <circle cx="18" cy="22" r="2" fill="#f9dec0"/><circle cx="28" cy="20" r="2.2" fill="#f9dec0"/><circle cx="32" cy="25" r="1.8" fill="#f9dec0"/>
          <path d="M5 32c0-5 4-8 8-8 3 0 6 2 7 5l-3 4H7Z" fill="#b7352f"/><path d="M10 32h5l1 9H9Z" fill="#c7a77d"/>
        </> : null}
        {kind === 'fish' ? <>
          <path d="M8 26c8-11 18-15 29-7l6-6-1 10 1 10-7-6c-10 7-20 4-28-1Z" fill="#4f9ed0" stroke="#9dd8f2" strokeWidth="1.5"/>
          <path d="M19 20c5 3 8 7 8 12M29 18c3 4 4 8 4 12" fill="none" stroke="#2d6b92" strokeWidth="2" opacity=".75"/>
          <circle cx="14" cy="23" r="2.2" fill="#11181c"/><circle cx="13.3" cy="22.3" r=".7" fill="#fff"/>
        </> : null}
        {kind === 'wood' ? <>
          <path d="M8 13h26l5 7-5 15H8L3 28Z" fill="url(#resource-brown-wood)" stroke="#d39b5f" strokeWidth="1.5"/>
          <path d="M11 14v21m8-21v21m8-21v21" stroke="#6f3f25" strokeWidth="2"/>
          <circle cx="35" cy="24" r="6" fill="#af7442"/><circle cx="35" cy="24" r="3" fill="none" stroke="#734825" strokeWidth="1.4"/>
        </> : null}
        {kind === 'stone' ? <>
          <path d="m7 34 6-18 13-9 15 13-4 17-17 5Z" fill="url(#resource-stone-stone)" stroke="#c9c8bf" strokeWidth="1.3"/>
          <path d="m13 16 11 8 2-17M24 24l13-4m-17 22 4-18" fill="none" stroke="#4e5457" strokeWidth="1.7" opacity=".7"/>
        </> : null}
        {kind === 'flint' ? <>
          <path d="m9 37 10-25 13-7 8 11-9 24-13 4Z" fill="#474d52" stroke="#c4beb1" strokeWidth="1.4"/>
          <path d="m19 12 8 8 5-15m-5 15 13-4M18 44l9-24" fill="none" stroke="#929792" strokeWidth="1.6" opacity=".75"/>
          <path d="M9 37 18 44" stroke="#f1b75d" strokeWidth="2" opacity=".55"/>
        </> : null}
        {kind === 'hide' ? <>
          <path d="M10 9 21 6l6 5 9-3 3 10-5 6 4 9-9 3-5 7-8-6-9 1 2-10-5-7Z" fill="url(#resource-brown-hide)" stroke="#d59a5c" strokeWidth="1.3"/>
          <path d="M16 14c5 3 9 2 13-1m-16 14c7-3 13-1 19 3" fill="none" stroke="#f0c38d" strokeWidth="2" opacity=".45"/>
        </> : null}
        {kind === 'bone' ? <>
          <path d="M12 17c-5-2-8 1-8 5s4 6 8 4l22 10c-1 5 2 8 6 8s6-4 4-8l-24-11c2-5-1-8-5-8Z" fill="#e3d4b3" stroke="#9f875d" strokeWidth="1.4"/>
          <path d="M10 31c-4-2-7 1-7 5s4 6 8 3l22-14c4 3 8 1 9-3 0-4-4-6-8-4Z" fill="#f0e3c5" stroke="#9f875d" strokeWidth="1.4"/>
        </> : null}
      </svg>
    </span>
  );
}

function ResourceRow({ kind, label, value }: { kind: ResourceArtKind; label: string; value: string }) {
  return <div className="civ-resource-row"><ResourceArt kind={kind} /><b>{label}</b><em>{value}</em></div>;
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
          ['weapon', 'equipment', 'Оружие'],
          ['clothes', 'clothes', 'Одежда'],
          ['accessory', 'accessory', 'Аксессуары'],
          ['tool', 'craft', 'Инструменты'],
        ] as const).map(([id, icon, label]) => (
          <button key={id} type="button" aria-pressed={category === id} className={category === id ? 'active' : ''} onClick={() => { setCategory(id); const first = equipment.find(item => item.category === id); if (first) setSelectedItemId(first.id); }}><CivSymbol kind={icon} /> {label}</button>
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
  const id = boss.id;
  return (
    <span className={`civ-boss-illustration boss-${id} ${large ? 'large' : ''}`} aria-hidden="true">
      <svg viewBox="0 0 260 220" role="presentation">
        <defs>
          <radialGradient id={`boss-aura-${id}`} cx=".5" cy=".46" r=".58">
            <stop offset="0" stopColor={id === 'tiger' ? '#e48331' : id === 'mammoth' ? '#97877b' : '#9c6540'} stopOpacity=".48" />
            <stop offset=".72" stopColor={id === 'tiger' ? '#6c2914' : id === 'mammoth' ? '#342f2d' : '#3a2419'} stopOpacity=".16" />
            <stop offset="1" stopColor="#050607" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`boss-fur-${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={id === 'tiger' ? '#f0a13f' : id === 'mammoth' ? '#7e6e63' : '#7d5139'} />
            <stop offset=".45" stopColor={id === 'tiger' ? '#cf6726' : id === 'mammoth' ? '#5a4d46' : '#573726'} />
            <stop offset="1" stopColor={id === 'tiger' ? '#6c2d18' : id === 'mammoth' ? '#2d2928' : '#261914'} />
          </linearGradient>
          <linearGradient id={`boss-bone-${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fff0c5" /><stop offset=".55" stopColor="#d7bc83" /><stop offset="1" stopColor="#8e744f" />
          </linearGradient>
          <filter id={`boss-shadow-${id}`} x="-35%" y="-35%" width="170%" height="190%">
            <feDropShadow dx="0" dy="12" stdDeviation="8" floodColor="#000" floodOpacity=".58" />
          </filter>
        </defs>
        <ellipse cx="130" cy="115" rx="116" ry="92" fill={`url(#boss-aura-${id})`} />
        <ellipse cx="130" cy="195" rx="82" ry="16" fill="#020304" opacity=".52" />

        {id === 'tiger' ? (
          <g filter={`url(#boss-shadow-${id})`}>
            <path d="M54 94 38 37l47 28c27-24 65-27 93-2l45-27-15 58c15 18 19 42 10 68-13 37-47 55-87 55-42 0-77-18-90-55-9-25-4-49 13-68Z" fill={`url(#boss-fur-${id})`} stroke="#efb05e" strokeWidth="2.8" />
            <path d="M71 54 86 83m20-34 5 31m43-31-6 31m38-27-17 31M58 111l37 12m106-12-37 12" stroke="#4c2418" strokeWidth="10" strokeLinecap="round" opacity=".9" />
            <path d="M82 135c12-19 29-28 49-28s38 9 49 28c-8 28-25 42-50 42s-42-14-48-42Z" fill="#f1d6ad" />
            <path d="m108 132 22-9 22 9-22 17Z" fill="#682f29" />
            <ellipse cx="94" cy="111" rx="9" ry="11" fill="#17120f" /><ellipse cx="166" cy="111" rx="9" ry="11" fill="#17120f" />
            <circle cx="91" cy="108" r="2.6" fill="#ffd86a" /><circle cx="163" cy="108" r="2.6" fill="#ffd86a" />
            <path d="M88 96c11-10 22-12 34-6M172 96c-11-10-22-12-34-6" fill="none" stroke="#281813" strokeWidth="7" strokeLinecap="round" />
            <path d="M108 150c2 18 7 32 15 42l7-27 7 27c8-10 13-24 15-42" fill="url(#boss-bone-tiger)" stroke="#b38e57" strokeWidth="1.5" />
            <path d="M75 144c-13 8-22 21-27 38m137-38c13 8 22 21 27 38" fill="none" stroke="#efe2c5" strokeWidth="3" strokeLinecap="round" opacity=".65" />
          </g>
        ) : id === 'mammoth' ? (
          <g filter={`url(#boss-shadow-${id})`}>
            <path d="M69 83c10-34 33-52 61-52 29 0 52 18 62 52 17 10 27 28 27 51 0 29-13 54-35 68-18 12-38 17-58 17-24 0-46-6-64-20-19-15-29-37-29-65 0-24 12-42 36-51Z" fill={`url(#boss-fur-${id})`} stroke="#9c887b" strokeWidth="2.8" />
            <path d="M79 73c11-17 28-27 51-29 24 1 43 11 54 29-12-4-24-2-36 6-13-11-26-12-39-3-10-8-20-9-30-3Z" fill="#8f7a6c" opacity=".75" />
            <path d="M60 108c-19 2-30 15-31 38 1 22 12 35 34 39m137-77c19 2 30 15 31 38-1 22-12 35-34 39" fill="#6b5b53" stroke="#8f7e73" strokeWidth="3" />
            <ellipse cx="101" cy="110" rx="7" ry="8.5" fill="#151211" /><ellipse cx="160" cy="110" rx="7" ry="8.5" fill="#151211" />
            <path d="M89 96c9-7 18-9 27-4m56 4c-9-7-18-9-27-4" fill="none" stroke="#2d2421" strokeWidth="7" strokeLinecap="round" />
            <path d="M116 119c1 48 4 74 10 79 7 6 18 5 25-3 6-7 7-32 2-76-8-10-29-10-37 0Z" fill="#5a4a43" />
            <path d="M100 137c-24 11-40 31-48 61 22-8 42-22 59-42m50-19c24 11 40 31 48 61-22-8-42-22-59-42" fill="none" stroke={`url(#boss-bone-${id})`} strokeWidth="13" strokeLinecap="round" />
            <path d="M52 197c10 0 18-4 24-11m132 11c-10 0-18-4-24-11" fill="none" stroke="#735e4f" strokeWidth="5" />
          </g>
        ) : (
          <g filter={`url(#boss-shadow-${id})`}>
            <path d="M66 96c7-42 31-64 65-64 34 0 58 22 65 64 18 13 26 34 24 60-4 38-35 60-89 60-54 0-85-22-89-60-2-26 6-47 24-60Z" fill={`url(#boss-fur-${id})`} stroke="#a96d43" strokeWidth="2.8" />
            <path d="M85 90c10-22 25-33 45-33 21 0 37 11 47 33-6 13-12 24-18 33-15-10-28-14-39-13-13 1-25 6-36 15-5-11-5-23 1-35Z" fill="#b78a64" />
            <path d="M75 116c-15-6-27 2-35 23 3 19 14 30 33 34m116-57c15-6 27 2 35 23-3 19-14 30-33 34" fill="#5a3b2c" stroke="#896149" strokeWidth="3" />
            <ellipse cx="102" cy="108" rx="8" ry="9.5" fill="#17120f" /><ellipse cx="157" cy="108" rx="8" ry="9.5" fill="#17120f" />
            <path d="M88 92c10-8 20-10 31-4m54 4c-10-8-20-10-31-4" fill="none" stroke="#251713" strokeWidth="7" strokeLinecap="round" />
            <path d="M100 139c18 14 41 14 60 0-5 28-15 43-30 43s-25-15-30-43Z" fill="#211411" />
            <path d="M107 144 115 158l7-15 8 17 8-17 8 15 7-14" fill="#f0e4cb" />
            <path d="M63 58 82 22l20 27 27-38 22 38 26-28 19 38-17 18c-34-15-67-15-100 0Z" fill={`url(#boss-bone-${id})`} stroke="#9a7446" strokeWidth="2" />
            <path d="M77 51 92 69m26-33 9 31m31-29-10 31m33-17-16 22" stroke="#7d3325" strokeWidth="5" strokeLinecap="round" />
            <path d="M102 183c10 8 19 12 28 12 9 0 18-4 28-12" fill="none" stroke="#d6b36f" strokeWidth="5" strokeLinecap="round" />
          </g>
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

function EraArt({ era, large = false }: { era: 'cave' | 'stone' | 'bronze' | 'iron' | 'medieval'; large?: boolean }) {
  return (
    <span className={`civ-era-art era-${era} ${large ? 'large' : ''}`} aria-hidden="true">
      <svg viewBox="0 0 120 100" role="presentation">
        <defs>
          <linearGradient id={`era-metal-${era}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={era === 'bronze' ? '#e1a35d' : era === 'iron' ? '#8ca6b5' : '#c9c4b8'} />
            <stop offset="1" stopColor={era === 'bronze' ? '#7c3d23' : era === 'iron' ? '#304755' : '#54565b'} />
          </linearGradient>
        </defs>
        {era === 'cave' ? <>
          <path d="M23 82C31 52 43 29 60 13c18 16 31 39 38 69Z" fill="#33251e" stroke="#a06b38" strokeWidth="3"/>
          <path d="M45 82c3-19 8-31 15-40 8 9 13 22 16 40Z" fill="#0a0e10"/>
          <path d="M55 74c-10-18-3-34 4-44 4 10 9 17 7 27 8-10 10-20 7-31 14 15 17 32 8 46-7 10-20 14-26 2Z" fill="#ff8b25"/>
          <path d="M62 76c-5-10-1-19 4-26 2 7 5 11 3 17 5-6 6-12 4-18 8 9 9 19 4 27-4 5-11 8-15 0Z" fill="#ffd365"/>
        </> : null}
        {era === 'stone' ? <>
          <path d="M25 75 48 34l26 8 18 33-20 15H42Z" fill="#6d7072" stroke="#b5b1a5" strokeWidth="3"/>
          <path d="m41 51 10-17 15 5-7 20Zm28 3 15-10 8 18-19 8Z" fill="#9a9a95" opacity=".7"/>
          <path d="M33 83h56" stroke="#342a24" strokeWidth="8" strokeLinecap="round"/>
        </> : null}
        {era === 'bronze' ? <>
          <path d="M33 78 80 31m-37 5 46 43" stroke="url(#era-metal-bronze)" strokeWidth="10" strokeLinecap="round"/>
          <path d="m24 31 24 8-11 17-22-10Zm72 0-24 8 11 17 22-10Z" fill="#bd7a45" stroke="#e1a35d" strokeWidth="2"/>
          <circle cx="60" cy="58" r="10" fill="#c98a4e"/>
        </> : null}
        {era === 'iron' ? <>
          <path d="M60 14 93 29v25c0 24-14 35-33 43-19-8-33-19-33-43V29Z" fill="url(#era-metal-iron)" stroke="#b6cad4" strokeWidth="3"/>
          <path d="M60 23v62M35 39h50" stroke="#dce6ea" strokeWidth="3" opacity=".5"/>
        </> : null}
        {era === 'medieval' ? <>
          <path d="M23 89V45h15V28h14v17h16V28h14v17h15v44Z" fill="#5e5963" stroke="#aaa0ad" strokeWidth="3"/>
          <path d="M19 45h82l-8-20-12 12-12-18-10 18-13-13-10 13-12-12Z" fill="#7c3348"/>
          <path d="M49 89V64h22v25" fill="#17171a"/>
        </> : null}
      </svg>
    </span>
  );
}

function MapPreviewArt() {
  return (
    <div className="civ-map-preview-art" aria-hidden="true">
      <svg viewBox="0 0 620 330" role="presentation">
        <defs>
          <linearGradient id="map-preview-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#29485c" />
            <stop offset=".55" stopColor="#182a33" />
            <stop offset="1" stopColor="#0a1013" />
          </linearGradient>
          <linearGradient id="map-preview-rock" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#6c3d24" />
            <stop offset=".58" stopColor="#352219" />
            <stop offset="1" stopColor="#17100d" />
          </linearGradient>
          <radialGradient id="map-preview-fire" cx=".5" cy=".5" r=".5">
            <stop offset="0" stopColor="#ffd56a" stopOpacity=".95" />
            <stop offset=".25" stopColor="#ff8b2b" stopOpacity=".8" />
            <stop offset="1" stopColor="#ff5a18" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="620" height="330" rx="18" fill="url(#map-preview-sky)" />
        <path d="M0 158 77 95l68 46 67-86 92 90 58-51 77 64 62-59 119 100v131H0Z" fill="#173039" />
        <path d="M0 194 91 132l62 43 75-87 77 86 54-44 79 68 58-47 124 90v89H0Z" fill="#102127" />
        <path d="M0 246c102-31 202-34 301-9 106 27 213 24 319-11v104H0Z" fill="#0a1418" />
        <path d="M53 252c38-103 101-167 190-194 37 17 68 42 91 74-50-13-92-8-125 16-35 26-58 61-68 104Z" fill="url(#map-preview-rock)" />
        <path d="M120 253c16-62 47-101 91-119 38 15 63 54 76 118Z" fill="#050708" />
        <g fill="#163128">
          <path d="m389 212 22-84 23 84Z"/><path d="m434 224 24-96 26 96Z"/><path d="m503 220 21-76 23 76Z"/>
        </g>
        <path d="M386 263c65-37 136-43 220-17" fill="none" stroke="#4c8592" strokeWidth="18" strokeLinecap="round" opacity=".7" />
        <path d="M395 262c55-21 117-25 188-11" fill="none" stroke="#9ed5dc" strokeWidth="4" strokeLinecap="round" opacity=".45" />
        <ellipse cx="183" cy="251" rx="82" ry="52" fill="url(#map-preview-fire)" />
        <path d="M166 257c-16-31-4-58 12-79 7 20 18 35 11 56 18-23 23-46 17-69 31 31 39 65 20 93-13 20-42 29-60 11Z" fill="#ff7723" />
        <path d="M180 261c-8-17-1-32 7-43 4 11 9 19 5 29 10-12 13-25 10-37 17 17 21 36 10 51-7 11-22 16-32 0Z" fill="#ffd35f" />
        <path d="M97 270h155" stroke="#4c2b1c" strokeWidth="13" strokeLinecap="round" opacity=".8" />
        <path d="M63 74c63 11 111 29 146 54" fill="none" stroke="#b65234" strokeWidth="7" strokeLinecap="round" opacity=".66" />
        <circle cx="73" cy="68" r="10" fill="#b65234" opacity=".68" />
      </svg>
      <div className="civ-map-preview-copy">
        <small>Текущая территория</small>
        <strong>Пещера</strong>
        <span>Здесь начинается путь племени</span>
      </div>
    </div>
  );
}

function MapPanel({ setNotice }: { setNotice: (value: string) => void }) {
  return (
    <div className="civ-panel-body map">
      <header className="civ-panel-head"><div><small>Путь цивилизации</small><h2>Карта эпох</h2><p>От первой пещеры до собственной империи. Новые эпохи меняют мир, ресурсы, боссов и технологии.</p></div></header>
      <div className="civ-map-path">
        {mapStages.map(([name, req, era], index) => <button type="button" key={name} className={index === 0 ? 'active' : 'locked'} onClick={() => setNotice(index === 0 ? 'Ты уже находишься в Пещере.' : `${name}: ${req}`)}><EraArt era={era} /><b>{name}</b><small>{req}</small><em>{index === 0 ? 'Текущая' : 'Закрыто'}</em></button>)}
      </div>
      <div className="civ-map-detail">
        <MapPreviewArt />
        <div className="civ-map-requirements"><small>Следующая эпоха</small><h3>Что нужно для Каменного века</h3><TaskRow task={{ label: 'Достичь 5 уровня', progress: 1, total: 5, reward: '' }} /><TaskRow task={{ label: 'Собрать камень', progress: 210, total: 500, reward: '' }} /><TaskRow task={{ label: 'Набрать власть', progress: 37, total: 100, reward: '' }} /></div>
      </div>
    </div>
  );
}

function CraftPanel({ setNotice }: { setNotice: (value: string) => void }) {
  return (
    <div className="civ-panel-body craft">
      <header className="civ-panel-head"><div><small>Верстак</small><h2>Крафт</h2><p>Создавай оружие, инструменты и одежду из найденных материалов.</p></div></header>
      <div className="civ-craft-grid">
        {craftRecipes.map(recipe => {
          const item = equipment.find(candidate => candidate.id === recipe.itemId) ?? equipment[0];
          return <article key={recipe.name} className={recipe.ready ? 'ready' : 'locked'}><div className="civ-craft-art"><ItemArt item={item} large /></div><h3>{recipe.name}</h3><p>{recipe.needs}</p><button type="button" disabled={!recipe.ready} onClick={() => setNotice(`${recipe.name}: создано и отправлено в инвентарь.`)}>{recipe.ready ? 'Создать' : 'Не хватает ресурсов'}</button></article>;
        })}
      </div>
    </div>
  );
}

function TribeArt({ variant }: { variant: 'camp' | 'fire' | 'hunt' }) {
  return (
    <div className={`civ-tribe-art ${variant}`} aria-hidden="true">
      <svg viewBox="0 0 360 180" role="presentation">
        <defs>
          <linearGradient id={`tribe-sky-${variant}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#203243" />
            <stop offset=".58" stopColor="#182129" />
            <stop offset="1" stopColor="#0a0e11" />
          </linearGradient>
          <radialGradient id={`tribe-fire-${variant}`} cx=".5" cy=".72" r=".34">
            <stop offset="0" stopColor="#ffd56f" stopOpacity=".95" />
            <stop offset=".3" stopColor="#ff8b2e" stopOpacity=".82" />
            <stop offset="1" stopColor="#ff5d20" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="360" height="180" rx="14" fill={`url(#tribe-sky-${variant})`} />
        <path d="M0 116 54 77l37 26 48-53 48 47 40-30 52 46 42-29 39 32v64H0Z" fill="#152025" />
        <path d="M0 132c65-17 124-20 177-9 58 12 118 10 183-7v64H0Z" fill="#0c1215" />
        <path d="M30 123 63 72l31 51Z" fill="#553825" stroke="#9a6339" strokeWidth="3" />
        <path d="M267 121 301 71l31 50Z" fill="#4c3324" stroke="#8d5b34" strokeWidth="3" />
        <path d="M34 123h55M271 121h55" stroke="#c28443" strokeWidth="4" opacity=".6" />
        <ellipse cx="180" cy="138" rx="84" ry="25" fill={`url(#tribe-fire-${variant})`} />
        <path d="M168 143c-15-21-3-38 7-50 5 12 12 20 8 31 12-13 15-27 11-42 20 19 25 41 12 59-9 13-28 18-38 2Z" fill="#ff7824" />
        <path d="M177 145c-8-12-1-22 5-29 3 7 7 11 5 18 7-8 9-16 6-24 11 11 14 23 7 34-5 8-16 11-23 1Z" fill="#ffd35f" />
        <g fill="#b89573">
          <circle cx="125" cy="127" r="8"/><circle cx="144" cy="122" r="8"/><circle cx="215" cy="123" r="8"/><circle cx="234" cy="128" r="8"/>
        </g>
        <g stroke="#7f5a3e" strokeWidth="5" strokeLinecap="round">
          <path d="M125 137v21m19-26v24m71-24v24m19-19v21"/>
        </g>
        {variant === 'camp' ? <>
          <path d="M14 45h120v28H14Z" fill="#7b3c2a" opacity=".88"/>
          <path d="M22 50h104" stroke="#d07b46" strokeWidth="4" strokeDasharray="11 8"/>
        </> : null}
        {variant === 'fire' ? <>
          <path d="M143 152h74" stroke="#8e5b34" strokeWidth="11" strokeLinecap="round"/>
          <path d="M150 144h60" stroke="#d49c5f" strokeWidth="4" strokeLinecap="round"/>
        </> : null}
        {variant === 'hunt' ? <>
          <path d="M278 109c14-26 28-41 43-47 10 9 16 20 18 35-11 17-28 28-51 33Z" fill="#71665f" opacity=".9"/>
          <path d="M303 91c6 19 5 31-3 38" stroke="#d8c8a4" strokeWidth="7" strokeLinecap="round"/>
        </> : null}
      </svg>
    </div>
  );
}

function TribePanel({ setNotice }: { setNotice: (value: string) => void }) {
  return (
    <div className="civ-panel-body tribe">
      <header className="civ-panel-head"><div><small>Социальный прогресс</small><h2>Племя</h2><p>Общий лагерь игроков: развитие поселения, вклад ресурсов и совместные цели.</p></div></header>
      <div className="civ-tribe-grid">
        <article className="civ-tribe-card camp"><TribeArt variant="camp" /><div className="civ-tribe-card-copy"><small>Твоё племя</small><h3>Каменный круг</h3><strong>7 / 20 участников</strong><p>Уровень лагеря 2 · +4% к сбору ресурсов</p><button type="button" onClick={() => setNotice('Открыт список участников племени.')}>Участники</button></div></article>
        <article className="civ-tribe-card fire"><TribeArt variant="fire" /><div className="civ-tribe-card-copy"><small>Общая цель</small><h3>Большой костёр</h3><strong>1 420 / 2 000 дерева</strong><div className="civ-task-progress"><i style={{ width: '71%' }} /></div><button type="button" onClick={() => setNotice('Ты внёс 20 дерева в развитие племени.')}>Внести ресурсы</button></div></article>
        <article className="civ-tribe-card hunt"><TribeArt variant="hunt" /><div className="civ-tribe-card-copy"><small>Бонус недели</small><h3>Охота на мамонта</h3><strong>Осталось 2 дня</strong><p>Победи Мамонта вместе с племенем и получи редкий трофей.</p><button type="button" onClick={() => setNotice('Племенная охота отмечена как текущая цель.')}>Сделать целью</button></div></article>
      </div>
    </div>
  );
}
