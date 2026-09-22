export interface QuestDef {
  id: string;
  title: string;
  description: string;
  energyCost: number;
  minLevel: number;
  rewardRespect: number;
  rewardCigarettes: [number, number];
  sugarDropChance: number;
}

export interface BossDef {
  id: string;
  name: string;
  maxHp: number;
  minLevel: number;
  durationHours: number;
  rewardCigarettes: number;
  rewardRespect: number;
  rewardSugar: number;
}

export interface TattooDef {
  id: string;
  name: string;
  part: 'chest' | 'back' | 'arm' | 'knees';
  costCigarettes: number;
  costSugar: number;
  bonusDamage: number;
  bonusMaxEnergy: number;
  minLevel: number;
}

export interface WeaponDef {
  id: string;
  name: string;
  costCigarettes: number;
  costSugar: number;
  damageMultiplier: number;
  critChance: number;
}

export const ENERGY_REGEN_INTERVAL_SECONDS = 180;

export const QUESTS: QuestDef[] = [
  {
    id: 'clean_parasha',
    title: 'Навести порядок у параши',
    description: 'Грязная работа, но первоходов не спрашивают.',
    energyCost: 5,
    minLevel: 1,
    rewardRespect: 10,
    rewardCigarettes: [15, 25],
    sugarDropChance: 0.02,
  },
  {
    id: 'take_tea',
    title: 'Отжать чай у первоходов',
    description: 'Купцы подогрели передачкой, пора делиться.',
    energyCost: 10,
    minLevel: 1,
    rewardRespect: 25,
    rewardCigarettes: [30, 50],
    sugarDropChance: 0.05,
  },
  {
    id: 'brew_chifir',
    title: 'Сварить чифир на лезвии',
    description: 'Два коробка на кружку, кипятим самодельным кипятильником.',
    energyCost: 18,
    minLevel: 2,
    rewardRespect: 45,
    rewardCigarettes: [60, 95],
    sugarDropChance: 0.08,
  },
  {
    id: 'pass_malyava',
    title: 'Передать маляву через вертухая',
    description: 'Рискованное дело через коридорного надзирателя.',
    energyCost: 28,
    minLevel: 3,
    rewardRespect: 80,
    rewardCigarettes: [110, 160],
    sugarDropChance: 0.15,
  },
  {
    id: 'nardy_smotryaschiy',
    title: 'Обыграть смотрящего в нарды',
    description: 'Игра идет на интерес и уважение в хате.',
    energyCost: 40,
    minLevel: 4,
    rewardRespect: 130,
    rewardCigarettes: [180, 260],
    sugarDropChance: 0.22,
  },
  {
    id: 'bunt_shizo',
    title: 'Бунт в штрафном изоляторе',
    description: 'Стучим мисками, требуем соблюдения понятий.',
    energyCost: 60,
    minLevel: 5,
    rewardRespect: 240,
    rewardCigarettes: [320, 480],
    sugarDropChance: 0.35,
  },
];

export const BOSSES: Record<string, BossDef> = {
  kirpich: {
    id: 'kirpich',
    name: 'Кирпич',
    maxHp: 1200,
    minLevel: 1,
    durationHours: 24,
    rewardCigarettes: 450,
    rewardRespect: 250,
    rewardSugar: 3,
  },
  siziy: {
    id: 'siziy',
    name: 'Сизый',
    maxHp: 4500,
    minLevel: 3,
    durationHours: 24,
    rewardCigarettes: 1800,
    rewardRespect: 850,
    rewardSugar: 8,
  },
  krest: {
    id: 'krest',
    name: 'Крест',
    maxHp: 12000,
    minLevel: 5,
    durationHours: 24,
    rewardCigarettes: 5000,
    rewardRespect: 2200,
    rewardSugar: 20,
  },
};

export const TATTOOS: Record<string, TattooDef> = {
  cat_shoulder: {
    id: 'cat_shoulder',
    name: 'Кот в кепке (Коренной Обитатель Тюрьмы)',
    part: 'arm',
    costCigarettes: 200,
    costSugar: 0,
    bonusDamage: 5,
    bonusMaxEnergy: 5,
    minLevel: 1,
  },
  stars_knees: {
    id: 'stars_knees',
    name: 'Звезды на коленях (Не встану)',
    part: 'knees',
    costCigarettes: 600,
    costSugar: 2,
    bonusDamage: 12,
    bonusMaxEnergy: 10,
    minLevel: 2,
  },
  domes_back: {
    id: 'domes_back',
    name: 'Купола с крестами на спине',
    part: 'back',
    costCigarettes: 1500,
    costSugar: 5,
    bonusDamage: 25,
    bonusMaxEnergy: 20,
    minLevel: 3,
  },
  tiger_chest: {
    id: 'tiger_chest',
    name: 'Оскал тигра на груди',
    part: 'chest',
    costCigarettes: 3500,
    costSugar: 12,
    bonusDamage: 50,
    bonusMaxEnergy: 35,
    minLevel: 4,
  },
};

export const WEAPONS: Record<string, WeaponDef> = {
  punch: {
    id: 'punch',
    name: 'Удар под дых',
    costCigarettes: 0,
    costSugar: 0,
    damageMultiplier: 1.0,
    critChance: 0.05,
  },
  finka: {
    id: 'finka',
    name: 'Заточка из ложки',
    costCigarettes: 25,
    costSugar: 0,
    damageMultiplier: 3.5,
    critChance: 0.15,
  },
  samopal: {
    id: 'samopal',
    name: 'Выстрел из самопала',
    costCigarettes: 75,
    costSugar: 0,
    damageMultiplier: 8.0,
    critChance: 0.25,
  },
  poison: {
    id: 'poison',
    name: 'Яд в баланду',
    costCigarettes: 0,
    costSugar: 1,
    damageMultiplier: 22.0,
    critChance: 0.4,
  },
};

export function getXpForNextLevel(level: number): number {
  return Math.floor(100 * Math.pow(1.65, level - 1));
}
