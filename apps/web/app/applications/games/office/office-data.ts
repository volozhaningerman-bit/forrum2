export type OfficeRarity = 'Обычный' | 'Хороший' | 'Редкий' | 'Эпический' | 'Легендарный' | 'Уникальный';

export type OfficeSkillKey = 'competence' | 'communication' | 'drive';

export type OfficeWorkspaceItem = {
  key: 'clothes' | 'chair' | 'desk' | 'pc' | 'monitor' | 'accessory';
  label: string;
  item: string;
  level: number;
  rarity: OfficeRarity;
  icon: string;
  effectLabel: string;
  effectValue: number;
  nextEffectValue: number;
  upgradePrice: number;
  description: string;
};

export type OfficeSnapshot = {
  playerName: string;
  level: number;
  xp: number;
  xpToNext: number;
  energy: number;
  maxEnergy: number;
  money: number;
  motivation: number;
  reputation: number;
  stress: number;
  salary: number;
  role: string;
  skills: Record<OfficeSkillKey, number>;
  daily: {
    title: string;
    progress: number;
    target: number;
    moneyReward: number;
    motivationReward: number;
    claimed: boolean;
  };
  firstAssignment: {
    progress: number;
    target: number;
  };
  company: {
    name: string;
    industry: string;
    level: number;
    maxLevel: number;
    description: string;
  };
};

export type OfficeNavigationItem = {
  icon: string;
  label: string;
  hint: string;
};

export type OfficeActionCard = {
  id: 'work' | 'approve' | 'learn' | 'prank';
  icon: string;
  title: string;
  text: string;
  tone: 'green' | 'blue' | 'purple' | 'orange';
};

export const initialOfficeSnapshot: OfficeSnapshot = {
  playerName: 'Бродяга',
  level: 1,
  xp: 0,
  xpToNext: 100,
  energy: 8,
  maxEnergy: 100,
  money: 1250,
  motivation: 25,
  reputation: 5,
  stress: 20,
  salary: 35000,
  role: 'Стажёр',
  skills: {
    competence: 1,
    communication: 1,
    drive: 1,
  },
  daily: {
    title: 'Разобрать входящие письма',
    progress: 0,
    target: 10,
    moneyReward: 50,
    motivationReward: 10,
    claimed: false,
  },
  firstAssignment: {
    progress: 0,
    target: 1,
  },
  company: {
    name: 'ООО «Потенциал+»',
    industry: 'IT / Разработка',
    level: 1,
    maxLevel: 5,
    description: 'Небольшая компания с большими планами.',
  },
};

export const initialWorkspaceItems: OfficeWorkspaceItem[] = [
  {
    key: 'clothes',
    label: 'Одежда',
    item: 'Обычная рубашка',
    level: 1,
    rarity: 'Обычный',
    icon: 'clothes',
    effectLabel: 'Репутация',
    effectValue: 1,
    nextEffectValue: 2,
    upgradePrice: 280,
    description: 'Ничего особенного. Зато хотя бы без пятен от кофе.',
  },
  {
    key: 'chair',
    label: 'Стул',
    item: 'Старый офисный',
    level: 1,
    rarity: 'Обычный',
    icon: 'chair',
    effectLabel: 'Снижение стресса',
    effectValue: 1,
    nextEffectValue: 2,
    upgradePrice: 320,
    description: 'Скрипит при любом движении и знает слишком много.',
  },
  {
    key: 'desk',
    label: 'Стол',
    item: 'Потрёпанный',
    level: 1,
    rarity: 'Обычный',
    icon: 'desk',
    effectLabel: 'Продуктивность',
    effectValue: 1,
    nextEffectValue: 2,
    upgradePrice: 300,
    description: 'Пережил минимум трёх стажёров и один переезд.',
  },
  {
    key: 'pc',
    label: 'ПК',
    item: 'Старый системник',
    level: 1,
    rarity: 'Обычный',
    icon: 'pc',
    effectLabel: 'Продуктивность',
    effectValue: 2,
    nextEffectValue: 3,
    upgradePrice: 350,
    description: 'Запускается не с первого раза, но Excel ещё открывает.',
  },
  {
    key: 'monitor',
    label: 'Монитор',
    item: 'CRT 15″',
    level: 1,
    rarity: 'Обычный',
    icon: 'monitor',
    effectLabel: 'Компетентность',
    effectValue: 1,
    nextEffectValue: 2,
    upgradePrice: 380,
    description: 'Глубокий корпус, тёплый гул и очень убедительный вес.',
  },
  {
    key: 'accessory',
    label: 'Аксессуар',
    item: 'Пусто',
    level: 0,
    rarity: 'Обычный',
    icon: 'plus',
    effectLabel: 'Бонус',
    effectValue: 0,
    nextEffectValue: 1,
    upgradePrice: 180,
    description: 'Первый аксессуар откроется после поручения.',
  },
];

export const officeNavigation: OfficeNavigationItem[] = [
  { icon: 'home', label: 'Главная', hint: 'Текущий офис, задачи и основные действия.' },
  { icon: 'career', label: 'Карьера', hint: 'Путь развития, должности и будущие профессии.' },
  { icon: 'company', label: 'Компания', hint: 'Коллеги, отделы, зарплата и переходы между компаниями.' },
  { icon: 'inventory', label: 'Инвентарь', hint: 'Одежда, техника и предметы рабочего места.' },
  { icon: 'achievement', label: 'Достижения', hint: 'Редкие события, награды и карьерные отметки.' },
  { icon: 'character', label: 'Персонаж', hint: 'Внешность, стиль и будущий редактор персонажа.' },
  { icon: 'shop', label: 'Магазин', hint: 'Покупка предметов и улучшений за игровую валюту.' },
];

export const officeActions: OfficeActionCard[] = [
  { id: 'work', icon: 'work', title: 'Работать', text: 'Выполнять задачи', tone: 'green' },
  { id: 'approve', icon: 'approve', title: 'Согласовать', text: 'Общаться с коллегами', tone: 'blue' },
  { id: 'learn', icon: 'training', title: 'Обучение', text: 'Развивать навыки', tone: 'purple' },
  { id: 'prank', icon: 'prank', title: 'Шалости', text: 'Немного отвлечься', tone: 'orange' },
];

export const officeNews = [
  ['Новый финансовый директор', 'Сегодня, 12:30', 'green'],
  ['Пятничная пицца в 17:00', 'Вчера, 15:20', 'gold'],
  ['Кофемашина снова работает!', 'Вчера, 11:05', 'blue'],
] as const;

export const nextPromotion = {
  role: 'Младший специалист',
  salary: 50000,
  competence: 5,
  reputation: 30,
  firstAssignment: 1,
};

export function formatMoney(value: number) {
  return new Intl.NumberFormat('ru-RU').format(value);
}

export function getCompanyStars(level: number, maxLevel: number) {
  return Array.from({ length: maxLevel }, (_, index) => index < level);
}

export function upgradeWorkspaceItem(item: OfficeWorkspaceItem): OfficeWorkspaceItem {
  if (item.key === 'accessory' && item.level === 0) {
    return {
      ...item,
      item: 'Дешёвая кружка',
      level: 1,
      effectValue: 1,
      nextEffectValue: 2,
      upgradePrice: 240,
      description: 'Своя кружка — первый признак того, что ты задержался надолго.',
    };
  }

  const nextLevel = item.level + 1;
  return {
    ...item,
    level: nextLevel,
    effectValue: item.nextEffectValue,
    nextEffectValue: item.nextEffectValue + 1,
    upgradePrice: Math.round(item.upgradePrice * 1.45 / 10) * 10,
  };
}


export const OFFICE_ENERGY_REGEN_SECONDS = 180;
export const OFFICE_ACTION_COOLDOWN_MS = 520;
export const OFFICE_STORAGE_KEY = '4rrum.office.v4_1';
export const OFFICE_STORAGE_VERSION = 1;

export type OfficePersistedState = {
  version: number;
  snapshot: OfficeSnapshot;
  workspace: OfficeWorkspaceItem[];
  energyNextAt: number | null;
};

export function isOfficePersistedState(value: unknown): value is OfficePersistedState {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Partial<OfficePersistedState>;
  return (
    candidate.version === OFFICE_STORAGE_VERSION &&
    !!candidate.snapshot &&
    typeof candidate.snapshot === 'object' &&
    Array.isArray(candidate.workspace) &&
    (candidate.energyNextAt === null || typeof candidate.energyNextAt === 'number')
  );
}
