import type { OfficeSkillKey } from './office-data';

export type V6Gender = 'male' | 'female';
export type V6ArchetypeId = 'tech' | 'communicator' | 'careerist' | 'sales' | 'style';
export type V6CareerBranch = 'general' | 'expert' | 'management' | 'sales';
export type V6ItemCategory =
  | 'clothes'
  | 'chair'
  | 'desk'
  | 'pc'
  | 'monitor'
  | 'accessory'
  | 'decor'
  | 'lighting';

export type V6Rarity = 'Обычный' | 'Хороший' | 'Редкий' | 'Премиум' | 'Элитный';

export type V6BonusKey =
  | 'productivity'
  | 'energyMax'
  | 'energyRecovery'
  | 'stressResist'
  | 'motivation'
  | 'reputation'
  | 'competence'
  | 'communication'
  | 'drive'
  | 'charisma'
  | 'authority'
  | 'logicDamage'
  | 'socialDamage'
  | 'pressureDamage'
  | 'incomeBonus'
  | 'workSuccess';

export type V6Bonuses = Partial<Record<V6BonusKey, number>>;

export type V6ItemRequirement = {
  level?: number;
  reputation?: number;
  branch?: V6CareerBranch;
  gender?: V6Gender;
  companyId?: string;
};

export type V6Item = {
  id: string;
  category: V6ItemCategory;
  name: string;
  rarity: V6Rarity;
  price: number;
  level: number;
  icon: string;
  visual: string;
  description: string;
  bonuses: V6Bonuses;
  requirement?: V6ItemRequirement;
};

export type V6Archetype = {
  id: V6ArchetypeId;
  name: string;
  subtitle: string;
  description: string;
  bonuses: V6Bonuses;
  preferredBranch: V6CareerBranch;
};

export type V6GenderProfile = {
  id: V6Gender;
  name: string;
  description: string;
  bonuses: V6Bonuses;
  affinity: string;
};

export type V6CareerNode = {
  id: string;
  title: string;
  subtitle: string;
  branch: V6CareerBranch;
  salary: number;
  level: number;
  reputation: number;
  skill?: OfficeSkillKey;
  skillValue?: number;
  x: number;
  y: number;
  parent?: string;
  unlocks: string[];
};

export type V6Company = {
  id: string;
  name: string;
  industry: string;
  salaryMultiplier: number;
  minLevel: number;
  minReputation: number;
  officeStyle: string;
  perk: string;
  description: string;
};

export type V6Boss = {
  id: string;
  name: string;
  title: string;
  maxHp: number;
  logicDefense: number;
  socialDefense: number;
  pressureDefense: number;
  weakness: 'logic' | 'social' | 'pressure';
  quote: string;
  rewardMoney: number;
  rewardXp: number;
  rewardReputation: number;
};

export type V6State = {
  gender: V6Gender;
  archetypeId: V6ArchetypeId;
  careerBranch: V6CareerBranch;
  ownedItemIds: string[];
  equipped: Partial<Record<V6ItemCategory, string>>;
  companyId: string;
  bossHp: number;
  bossResolved: boolean;
};

export const v6CategoryMeta: Record<V6ItemCategory, { label: string; icon: string; hint: string }> = {
  clothes: { label: 'Одежда', icon: 'clothes', hint: 'Имидж, репутация и социальные бонусы' },
  chair: { label: 'Стул', icon: 'chair', hint: 'Стресс, энергия и восстановление' },
  desk: { label: 'Стол', icon: 'desk', hint: 'Продуктивность и статус рабочего места' },
  pc: { label: 'ПК', icon: 'pc', hint: 'Работа, техничность и логический урон' },
  monitor: { label: 'Монитор', icon: 'monitor', hint: 'Концентрация и качество задач' },
  accessory: { label: 'Аксессуар', icon: 'watch', hint: 'Точечные бонусы и стиль' },
  decor: { label: 'Декор', icon: 'decor', hint: 'Мотивация, статус и атмосфера' },
  lighting: { label: 'Свет', icon: 'lighting', hint: 'Комфорт и устойчивость к стрессу' },
};

export const v6GenderProfiles: V6GenderProfile[] = [
  {
    id: 'male',
    name: 'Мужчина',
    description: 'Лучше раскрывается через рабочее место, технику и устойчивые производительные сборки.',
    affinity: 'Техника и рабочее место',
    bonuses: { productivity: 2, stressResist: 2, logicDamage: 1 },
  },
  {
    id: 'female',
    name: 'Женщина',
    description: 'Получает больше вариантов гардероба и аксессуаров и сильнее собирает социальные синергии.',
    affinity: 'Стиль и социальные синергии',
    bonuses: { charisma: 2, reputation: 1, socialDamage: 1 },
  },
];

export const v6Archetypes: V6Archetype[] = [
  {
    id: 'tech',
    name: 'Технарь',
    subtitle: 'Сначала понять, потом сделать',
    description: 'Сильнее техника, обучение и логические ответы боссам.',
    preferredBranch: 'expert',
    bonuses: { competence: 2, logicDamage: 3, productivity: 2 },
  },
  {
    id: 'communicator',
    name: 'Коммуникатор',
    subtitle: 'Созвон можно пережить',
    description: 'Лучше переговоры, согласования и социальные варианты.',
    preferredBranch: 'management',
    bonuses: { communication: 2, socialDamage: 3, reputation: 1 },
  },
  {
    id: 'careerist',
    name: 'Карьерист',
    subtitle: 'В календаре уже стоит повышение',
    description: 'Ускоряет репутацию, авторитет и продвижение по управленческой ветке.',
    preferredBranch: 'management',
    bonuses: { authority: 3, reputation: 2, pressureDamage: 2 },
  },
  {
    id: 'sales',
    name: 'Продаван',
    subtitle: 'Любую проблему можно переупаковать',
    description: 'Деньги, напор и бонусы за успешные договорённости.',
    preferredBranch: 'sales',
    bonuses: { drive: 2, pressureDamage: 3, incomeBonus: 8 },
  },
  {
    id: 'style',
    name: 'Имиджмейкер',
    subtitle: 'Сначала впечатление, потом Excel',
    description: 'Сильнее одежда, аксессуары, харизма и статусные решения.',
    preferredBranch: 'sales',
    bonuses: { charisma: 3, socialDamage: 2, reputation: 2 },
  },
];

const item = (
  id: string,
  category: V6ItemCategory,
  name: string,
  rarity: V6Rarity,
  price: number,
  level: number,
  visual: string,
  description: string,
  bonuses: V6Bonuses,
  requirement?: V6ItemRequirement,
): V6Item => ({
  id,
  category,
  name,
  rarity,
  price,
  level,
  icon: v6CategoryMeta[category].icon,
  visual,
  description,
  bonuses,
  requirement,
});

export const v6Items: V6Item[] = [
  item('clothes-basic-shirt','clothes','Обычная рубашка','Обычный',0,1,'Рубашка','Ничего особенного, зато без пятен от кофе.',{ reputation:1 }),
  item('clothes-clean-shirt','clothes','Свежая офисная рубашка','Хороший',420,2,'Рубашка+','Выглядит так, будто ты подготовился заранее.',{ reputation:2, charisma:1 }),
  item('clothes-smart-casual','clothes','Smart casual','Хороший',850,4,'Casual','Можно на встречу и в кофейню после неё.',{ reputation:3, charisma:2, socialDamage:1 }),
  item('clothes-suit','clothes','Строгий костюм','Редкий',1800,6,'Костюм','Даёт ощущение, что ты знаешь, где лежит бюджет.',{ reputation:5, authority:2, pressureDamage:1 }),
  item('clothes-designer','clothes','Дизайнерский комплект','Премиум',3200,8,'Designer','Имидж становится частью билда.',{ charisma:5, socialDamage:3, reputation:4 },{ gender:'female' }),
  item('clothes-executive','clothes','Костюм руководителя','Элитный',5400,12,'Executive','Вызывает желание согласовать всё с первого раза.',{ authority:5, reputation:6, pressureDamage:3 },{ branch:'management' }),

  item('chair-old','chair','Старый офисный','Обычный',0,1,'Скрип','Скрипит при любом движении.',{ stressResist:1 }),
  item('chair-basic','chair','Офисное кресло','Хороший',380,2,'Office','Спина впервые не пишет жалобу.',{ stressResist:2, energyRecovery:1 }),
  item('chair-ergonomic','chair','Эргономичное кресло','Редкий',1100,4,'Ergo','Рабочий день ощущается короче.',{ stressResist:4, energyRecovery:2, productivity:1 }),
  item('chair-manager','chair','Кресло менеджера','Редкий',2200,7,'Manager','Высокая спинка, высокая самооценка.',{ authority:2, stressResist:4, reputation:2 },{ branch:'management' }),
  item('chair-premium','chair','Премиальное кресло','Премиум',4200,10,'Premium','Комфорт уже похож на компенсацию.',{ stressResist:7, energyRecovery:3, productivity:2 }),
  item('chair-executive','chair','Кожаное кресло директора','Элитный',7600,14,'Executive','Вращается медленно и авторитетно.',{ authority:5, pressureDamage:3, reputation:4 },{ branch:'management' }),

  item('desk-worn','desk','Потрёпанный стол','Обычный',0,1,'ДСП','Пережил несколько стажёров.',{ productivity:1 }),
  item('desk-basic','desk','Обычный рабочий стол','Хороший',450,2,'Basic','На нём помещается и ноутбук, и отчаяние.',{ productivity:2 }),
  item('desk-wide','desk','Широкий стол','Хороший',900,4,'Wide','Больше места — больше видимости занятости.',{ productivity:3, stressResist:1 }),
  item('desk-standing','desk','Стол с регулировкой','Редкий',1900,6,'Stand','Можно работать стоя и страдать разнообразнее.',{ productivity:4, energyRecovery:1, stressResist:2 }),
  item('desk-manager','desk','Стол руководителя','Премиум',3900,9,'Boss desk','Подходит для совещаний и тяжёлых взглядов.',{ authority:4, reputation:3, pressureDamage:2 },{ branch:'management' }),
  item('desk-studio','desk','Технологичный стол','Элитный',6200,12,'Studio','Кабели наконец перестают быть частью интерьера.',{ productivity:7, logicDamage:3, competence:1 },{ branch:'expert' }),

  item('pc-old','pc','Старый системник','Обычный',0,1,'Pentium','Запускается не с первого раза, но Excel ещё открывает.',{ productivity:1, logicDamage:1 }),
  item('pc-office','pc','Офисный системник','Хороший',420,2,'Office PC','Уже не страшно открывать два файла одновременно.',{ productivity:2, logicDamage:2 }),
  item('pc-fast','pc','Быстрый офисный ПК','Хороший',900,4,'Fast PC','Chrome может позволить себе несколько вкладок.',{ productivity:3, logicDamage:3, competence:1 }),
  item('pc-workstation','pc','Рабочая станция','Редкий',2200,7,'Workstation','Серьёзный инструмент для серьёзных таблиц.',{ productivity:5, logicDamage:5, competence:2 },{ branch:'expert' }),
  item('pc-pro','pc','Профессиональная станция','Премиум',4800,10,'Pro WS','Компиляция заканчивается раньше, чем кофе.',{ productivity:7, logicDamage:7, workSuccess:4 },{ branch:'expert' }),
  item('pc-elite','pc','Топовая рабочая станция','Элитный',8500,14,'Elite WS','Техника уже сильнее половины отдела.',{ productivity:10, logicDamage:10, competence:3, workSuccess:7 },{ branch:'expert' }),

  item('monitor-crt','monitor','CRT 15″','Обычный',0,1,'CRT','Глубокий корпус и убедительный вес.',{ competence:1 }),
  item('monitor-lcd','monitor','Офисный LCD','Хороший',360,2,'LCD','Глаза благодарят хотя бы немного.',{ competence:1, stressResist:1 }),
  item('monitor-24','monitor','IPS 24″','Хороший',760,4,'24 IPS','Таблица наконец помещается целиком.',{ competence:2, productivity:2 }),
  item('monitor-ultra','monitor','Широкоформатный монитор','Редкий',1600,6,'UltraWide','Можно видеть дедлайн и причину дедлайна одновременно.',{ competence:3, productivity:3, logicDamage:2 }),
  item('monitor-dual','monitor','Двойной монитор','Премиум',3000,9,'Dual','Один для работы, второй для созвона.',{ productivity:5, logicDamage:4, workSuccess:4 },{ branch:'expert' }),
  item('monitor-pro','monitor','Профессиональный дисплей','Элитный',5600,12,'Pro Display','Цвета точные, решения тоже.',{ competence:4, productivity:6, logicDamage:5 },{ branch:'expert' }),

  item('accessory-mug','accessory','Своя кружка','Обычный',180,1,'Mug','Первый признак, что ты задержался надолго.',{ stressResist:1, energyRecovery:1 }),
  item('accessory-notebook','accessory','Ежедневник','Хороший',320,2,'Notebook','Делает видимость контроля немного реальнее.',{ competence:1, productivity:1 }),
  item('accessory-headphones','accessory','Наушники','Хороший',650,3,'Headphones','Главная защита от открытого офиса.',{ stressResist:3, productivity:1 }),
  item('accessory-watch','accessory','Хорошие часы','Редкий',1500,5,'Watch','Пунктуальность теперь можно носить на руке.',{ reputation:2, authority:1, pressureDamage:1 }),
  item('accessory-fashion','accessory','Стильный аксессуар','Редкий',1800,5,'Style','Маленькая вещь, большой социальный эффект.',{ charisma:4, socialDamage:2, reputation:2 },{ gender:'female' }),
  item('accessory-status','accessory','Статусные часы','Премиум',4200,9,'Status','Время всё ещё идёт, но выглядит дороже.',{ authority:4, pressureDamage:3, reputation:4 },{ branch:'sales' }),

  item('decor-box','decor','Коробка «важное»','Обычный',0,1,'Box','Декор уровня «когда-нибудь разберём».',{ motivation:1 }),
  item('decor-plant','decor','Неприхотливое растение','Хороший',260,2,'Plant','Единственный сотрудник без дедлайнов.',{ motivation:2, stressResist:1 }),
  item('decor-poster','decor','Мотивационный постер','Хороший',520,3,'Poster','Надпись не помогает, но выглядит уверенно.',{ motivation:3 }),
  item('decor-award','decor','Диплом в рамке','Редкий',1200,5,'Award','Гости офиса задают меньше вопросов.',{ reputation:2, authority:1 }),
  item('decor-art','decor','Дизайнерский арт','Премиум',2600,8,'Art','Офис начинает выглядеть как место, куда хотелось прийти.',{ charisma:3, reputation:3, socialDamage:2 }),
  item('decor-executive','decor','Статусная композиция','Элитный',5200,12,'Status Decor','Никто не знает цену, и это правильно.',{ authority:4, reputation:5 },{ branch:'management' }),

  item('light-fluorescent','lighting','Лампа из потолка','Обычный',0,1,'Fluorescent','Моргает только в самые важные моменты.',{ stressResist:0 }),
  item('light-desk','lighting','Настольная лампа','Хороший',240,2,'Desk light','Создаёт локальную надежду.',{ stressResist:1, productivity:1 }),
  item('light-warm','lighting','Тёплый рабочий свет','Хороший',540,3,'Warm','Вечерний дедлайн становится человечнее.',{ stressResist:2, motivation:1 }),
  item('light-smart','lighting','Умное освещение','Редкий',1350,5,'Smart light','Подстраивается раньше менеджера.',{ stressResist:3, productivity:2 }),
  item('light-studio','lighting','Студийный свет','Премиум',2800,8,'Studio light','Созвон выглядит дороже, чем компания.',{ charisma:3, socialDamage:2, reputation:2 }),
  item('light-exec','lighting','Свет кабинета руководителя','Элитный',4900,12,'Executive light','Правильный свет для неправильных решений.',{ authority:3, pressureDamage:2, stressResist:4 },{ branch:'management' }),
];

export const v6StarterOwned = [
  'clothes-basic-shirt',
  'chair-old',
  'desk-worn',
  'pc-old',
  'monitor-crt',
  'decor-box',
  'light-fluorescent',
];

export const v6StarterEquipped: Partial<Record<V6ItemCategory, string>> = {
  clothes: 'clothes-basic-shirt',
  chair: 'chair-old',
  desk: 'desk-worn',
  pc: 'pc-old',
  monitor: 'monitor-crt',
  decor: 'decor-box',
  lighting: 'light-fluorescent',
};

export const initialV6State: V6State = {
  gender: 'male',
  archetypeId: 'tech',
  careerBranch: 'general',
  ownedItemIds: v6StarterOwned,
  equipped: v6StarterEquipped,
  companyId: 'potential',
  bossHp: 100,
  bossResolved: false,
};

export const v6CareerNodes: V6CareerNode[] = [
  { id:'intern',title:'Стажёр',subtitle:'Точка входа',branch:'general',salary:35000,level:1,reputation:0,x:6,y:50,unlocks:['Базовое рабочее место'] },
  { id:'junior',title:'Младший специалист',subtitle:'Первая ступень',branch:'general',salary:50000,level:3,reputation:30,skill:'competence',skillValue:5,x:20,y:50,parent:'intern',unlocks:['Офисная техника II','Новая компания'] },
  { id:'specialist',title:'Специалист',subtitle:'Выбор пути',branch:'general',salary:80000,level:8,reputation:50,x:34,y:50,parent:'junior',unlocks:['Выбор карьерной ветки'] },

  { id:'analyst',title:'Аналитик',subtitle:'Логика и цифры',branch:'expert',salary:105000,level:11,reputation:55,skill:'competence',skillValue:10,x:49,y:18,parent:'specialist',unlocks:['Рабочая станция','Логический урон +10%'] },
  { id:'senior-expert',title:'Старший специалист',subtitle:'Сложные задачи',branch:'expert',salary:135000,level:16,reputation:62,skill:'competence',skillValue:15,x:63,y:18,parent:'analyst',unlocks:['Двойной монитор','Логический урон +15%'] },
  { id:'architect',title:'Архитектор',subtitle:'Системное мышление',branch:'expert',salary:190000,level:24,reputation:72,skill:'competence',skillValue:22,x:77,y:18,parent:'senior-expert',unlocks:['Премиум техника','Офис Tech'] },
  { id:'cto',title:'CTO',subtitle:'Технологическая вершина',branch:'expert',salary:290000,level:35,reputation:85,skill:'competence',skillValue:30,x:91,y:18,parent:'architect',unlocks:['Элитная техника','Кабинет CTO'] },

  { id:'coordinator',title:'Координатор',subtitle:'Люди и процессы',branch:'management',salary:110000,level:11,reputation:58,skill:'communication',skillValue:9,x:49,y:50,parent:'specialist',unlocks:['Кресло менеджера','Социальный урон +10%'] },
  { id:'teamlead',title:'Тимлид',subtitle:'Команда и дедлайны',branch:'management',salary:150000,level:17,reputation:68,skill:'communication',skillValue:15,x:63,y:50,parent:'coordinator',unlocks:['Стол руководителя','Авторитет +3'] },
  { id:'head',title:'Руководитель отдела',subtitle:'Решения и ответственность',branch:'management',salary:210000,level:25,reputation:78,skill:'drive',skillValue:18,x:77,y:50,parent:'teamlead',unlocks:['Кабинет руководителя','Давление +15%'] },
  { id:'ceo',title:'CEO',subtitle:'Теперь проблемы все твои',branch:'management',salary:360000,level:40,reputation:92,skill:'drive',skillValue:28,x:91,y:50,parent:'head',unlocks:['Executive офис','Элитная мебель'] },

  { id:'account',title:'Аккаунт',subtitle:'Люди, сделки, деньги',branch:'sales',salary:115000,level:11,reputation:55,skill:'communication',skillValue:10,x:49,y:82,parent:'specialist',unlocks:['Статусные аксессуары','Доход +8%'] },
  { id:'sales-senior',title:'Senior Sales',subtitle:'Договориться можно обо всём',branch:'sales',salary:155000,level:17,reputation:65,skill:'drive',skillValue:14,x:63,y:82,parent:'account',unlocks:['Премиум одежда','Давление +10%'] },
  { id:'bizdev',title:'BizDev',subtitle:'Новые рынки и новые созвоны',branch:'sales',salary:220000,level:25,reputation:76,skill:'communication',skillValue:20,x:77,y:82,parent:'sales-senior',unlocks:['Имиджевые предметы','Доход +15%'] },
  { id:'sales-head',title:'Head of Sales',subtitle:'Планы растут быстрее зарплаты',branch:'sales',salary:300000,level:34,reputation:88,skill:'drive',skillValue:26,x:91,y:82,parent:'bizdev',unlocks:['Элитные аксессуары','Статусный кабинет'] },
];

export const v6Companies: V6Company[] = [
  { id:'potential',name:'ООО «Потенциал+»',industry:'IT / Разработка',salaryMultiplier:1,minLevel:1,minReputation:0,officeStyle:'Старый небольшой офис',perk:'Быстрый старт',description:'Небольшая компания с большими планами и одним рабочим принтером.' },
  { id:'pixelsoft',name:'PixelSoft',industry:'Продуктовая IT',salaryMultiplier:1.25,minLevel:5,minReputation:25,officeStyle:'Светлый open space',perk:'Техника дешевле на 5%',description:'Здесь уже есть нормальная кофемашина и таск-трекер.' },
  { id:'novasystems',name:'Nova Systems',industry:'Enterprise',salaryMultiplier:1.55,minLevel:10,minReputation:45,officeStyle:'Современный техно-офис',perk:'Логический урон +5%',description:'Большие проекты, большие процессы и очень большие таблицы.' },
  { id:'northagency',name:'North Agency',industry:'Маркетинг / Продажи',salaryMultiplier:1.45,minLevel:10,minReputation:42,officeStyle:'Креативное агентство',perk:'Социальный урон +5%',description:'Дедлайны короткие, презентации длинные.' },
  { id:'megacorp',name:'MegaCorp',industry:'Корпорация',salaryMultiplier:1.9,minLevel:18,minReputation:65,officeStyle:'Корпоративный премиум',perk:'Репутация +10%',description:'Здесь есть отдел, который согласовывает согласования.' },
  { id:'own',name:'Собственная компания',industry:'Ты решаешь',salaryMultiplier:2.4,minLevel:32,minReputation:85,officeStyle:'Свой кабинет',perk:'Свободный билд',description:'Поздравляем: теперь зарплату другим людям платишь ты.' },
];

export const v6Bosses: V6Boss[] = [
  {
    id:'sergey',
    name:'Сергей Петрович',
    title:'Руководитель отдела',
    maxHp:100,
    logicDefense:0.75,
    socialDefense:0.9,
    pressureDefense:1.1,
    weakness:'logic',
    quote:'«Посмотрим, на что ты способен»',
    rewardMoney:500,
    rewardXp:45,
    rewardReputation:8,
  },
];

export const v6BonusLabels: Record<V6BonusKey,string> = {
  productivity:'Продуктивность',
  energyMax:'Макс. энергия',
  energyRecovery:'Восстановление энергии',
  stressResist:'Устойчивость к стрессу',
  motivation:'Мотивация',
  reputation:'Репутация',
  competence:'Компетентность',
  communication:'Коммуникация',
  drive:'Напор',
  charisma:'Харизма',
  authority:'Авторитет',
  logicDamage:'Логический урон',
  socialDamage:'Социальный урон',
  pressureDamage:'Урон напором',
  incomeBonus:'Доход',
  workSuccess:'Успех работы',
};

export function getV6Item(id: string | undefined) {
  return id ? v6Items.find((candidate) => candidate.id === id) : undefined;
}

export function getV6ItemsByCategory(category: V6ItemCategory) {
  return v6Items.filter((candidate) => candidate.category === category);
}

export function mergeV6Bonuses(...sources: Array<V6Bonuses | undefined>): V6Bonuses {
  const result: V6Bonuses = {};
  for (const source of sources) {
    if (!source) continue;
    for (const [key, value] of Object.entries(source) as Array<[V6BonusKey, number]>) {
      result[key] = (result[key] ?? 0) + value;
    }
  }
  return result;
}

export function getV6BuildBonuses(state: V6State): V6Bonuses {
  const gender = v6GenderProfiles.find((candidate) => candidate.id === state.gender);
  const archetype = v6Archetypes.find((candidate) => candidate.id === state.archetypeId);
  const equipped = Object.values(state.equipped)
    .map((id) => getV6Item(id))
    .filter((candidate): candidate is V6Item => Boolean(candidate));
  return mergeV6Bonuses(gender?.bonuses, archetype?.bonuses, ...equipped.map((candidate) => candidate.bonuses));
}

export function v6ItemLockReason(
  item: V6Item,
  input: { level: number; reputation: number; state: V6State },
) {
  const requirement = item.requirement;
  const requiredLevel = Math.max(item.level, requirement?.level ?? 0);
  if (input.level < requiredLevel) return `Нужен ур. ${requiredLevel}`;
  if ((requirement?.reputation ?? 0) > input.reputation) return `Репутация ${requirement?.reputation}`;
  if (requirement?.branch && requirement.branch !== input.state.careerBranch) return `Ветка: ${branchLabel(requirement.branch)}`;
  if (requirement?.gender && requirement.gender !== input.state.gender) return requirement.gender === 'female' ? 'Женский гардероб' : 'Мужской гардероб';
  if (requirement?.companyId && requirement.companyId !== input.state.companyId) return 'Другая компания';
  return null;
}

export function v6CareerAvailable(
  node: V6CareerNode,
  input: { level: number; reputation: number; skills: Record<OfficeSkillKey, number>; branch: V6CareerBranch },
) {
  if (input.level < node.level || input.reputation < node.reputation) return false;
  if (node.skill && input.skills[node.skill] < (node.skillValue ?? 0)) return false;
  if (node.branch !== 'general' && input.branch !== 'general' && node.branch !== input.branch) return false;
  return true;
}

export function branchLabel(branch: V6CareerBranch) {
  if (branch === 'expert') return 'Эксперт';
  if (branch === 'management') return 'Управление';
  if (branch === 'sales') return 'Продажи';
  return 'Общий путь';
}

export function getBossDamage(
  kind: 'logic' | 'social' | 'pressure',
  input: {
    skills: Record<OfficeSkillKey, number>;
    bonuses: V6Bonuses;
    branch: V6CareerBranch;
    boss: V6Boss;
  },
) {
  const base =
    kind === 'logic'
      ? 8 +
        (input.skills.competence + (input.bonuses.competence ?? 0)) * 2 +
        (input.bonuses.logicDamage ?? 0) +
        Math.floor((input.bonuses.productivity ?? 0) / 3)
      : kind === 'social'
        ? 8 +
          (input.skills.communication + (input.bonuses.communication ?? 0)) * 2 +
          (input.bonuses.socialDamage ?? 0) +
          Math.floor((input.bonuses.charisma ?? 0) / 2)
        : 8 +
          (input.skills.drive + (input.bonuses.drive ?? 0)) * 2 +
          (input.bonuses.pressureDamage ?? 0) +
          Math.floor((input.bonuses.authority ?? 0) / 2);

  const branchBoost =
    (kind === 'logic' && input.branch === 'expert') ||
    (kind === 'social' && input.branch === 'management') ||
    (kind === 'pressure' && input.branch === 'sales')
      ? 1.18
      : 1;

  const defense =
    kind === 'logic'
      ? input.boss.logicDefense
      : kind === 'social'
        ? input.boss.socialDefense
        : input.boss.pressureDefense;

  const weaknessBoost = input.boss.weakness === kind ? 1.2 : 1;
  return Math.max(1, Math.round(base * branchBoost * weaknessBoost * defense));
}
