import type { OfficeSkillKey } from './office-data';

export type OfficeOutcome = {
  energy?: number;
  money?: number;
  xp?: number;
  reputation?: number;
  motivation?: number;
  stress?: number;
  skills?: Partial<Record<OfficeSkillKey, number>>;
};

export type OfficeRequirement = {
  skill: OfficeSkillKey;
  min: number;
};

export type OfficeStoryChoice = {
  id: string;
  label: string;
  description: string;
  requirement?: OfficeRequirement;
  outcome: OfficeOutcome;
  result: string;
};

export type OfficeStoryEvent = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  speaker?: string;
  choices: OfficeStoryChoice[];
};

export type OfficePrank = {
  id: string;
  title: string;
  description: string;
  risk: 'Низкий' | 'Средний' | 'Высокий';
  successChance: number;
  success: OfficeOutcome;
  fail: OfficeOutcome;
  successText: string;
  failText: string;
};

export type OfficeCareerNode = {
  id: string;
  title: string;
  subtitle: string;
  branch: 'start' | 'expert' | 'management' | 'sales';
  salary: number;
  requirement: string;
  x: number;
  y: number;
};

export type OfficeStoryState = {
  completedEvents: string[];
  completedPranks: string[];
  bossChoiceId: string | null;
  bossResolved: boolean;
};

export const initialOfficeStoryState: OfficeStoryState = {
  completedEvents: [],
  completedPranks: [],
  bossChoiceId: null,
  bossResolved: false,
};

export const firstDayEvents: OfficeStoryEvent[] = [
  {
    id: 'inbox',
    eyebrow: 'Первый рабочий день · задача 1',
    title: 'Разобрать входящие',
    description:
      'В почте 47 писем. Половина с пометкой «срочно», три — с темой «СРОЧНО!!!», одно отправлено тебе по ошибке.',
    choices: [
      {
        id: 'priorities',
        label: 'Разобрать по приоритетам',
        description: 'Скучно, зато профессионально.',
        outcome: { energy: -1, money: 75, xp: 10, reputation: 1 },
        result: 'Ты нашёл действительно срочное письмо. Остальные 46 могут немного подождать.',
      },
      {
        id: 'ask-colleague',
        label: 'Спросить коллегу',
        description: 'Заодно узнать, кто здесь вообще чем занимается.',
        outcome: { energy: -1, xp: 7, reputation: 1, skills: { communication: 1 } },
        result: 'Коллега объяснил систему и показал папку «важное_финал_точно2».',
      },
      {
        id: 'archive-all',
        label: 'Сложить всё в архив',
        description: 'Радикальное управление входящими.',
        outcome: { xp: 2, motivation: 2, stress: -1, reputation: -1 },
        result: 'Входящих больше нет. Проблема технически решена.',
      },
    ],
  },
  {
    id: 'document',
    eyebrow: 'Первый рабочий день · задача 2',
    title: 'Исправить документ',
    description:
      'В презентации для клиента съехала таблица, пропал логотип и почему-то появился слайд с меню столовой.',
    choices: [
      {
        id: 'fix-yourself',
        label: 'Исправить самому',
        description: 'Придётся разобраться, зато это заметят.',
        outcome: { energy: -2, money: 100, xp: 12, skills: { competence: 1 } },
        result: 'Таблица на месте. Меню столовой ты сохранил отдельно — на всякий случай.',
      },
      {
        id: 'ask-designer',
        label: 'Попросить помощи',
        description: 'Нормальные люди иногда разговаривают друг с другом.',
        outcome: { energy: -1, xp: 8, reputation: 2, skills: { communication: 1 } },
        result: 'Коллега исправил логотип, а ты впервые узнал, где лежат исходники.',
      },
      {
        id: 'pretend-fine',
        label: 'Сделать вид, что так и было',
        description: 'Смелая авторская позиция.',
        outcome: { motivation: 3, stress: -2, reputation: -2, xp: 3 },
        result: 'Никто не спросил про таблицу. Про меню столовой спросили двое.',
      },
    ],
  },
  {
    id: 'brief',
    eyebrow: 'Первый рабочий день · задача 3',
    title: 'Согласовать ТЗ',
    description:
      'Коллега говорит, что «так никто не договаривался». В переписке есть 38 сообщений, и каждое можно трактовать по-разному.',
    choices: [
      {
        id: 'walk-through',
        label: 'Спокойно пройтись по пунктам',
        description: 'Потребуется Коммуникация 2.',
        requirement: { skill: 'communication', min: 2 },
        outcome: { energy: -1, xp: 16, reputation: 4, skills: { communication: 1 } },
        result: 'На четвёртом пункте все неожиданно согласились. Никто не понял почему.',
      },
      {
        id: 'show-history',
        label: 'Показать переписку',
        description: 'Потребуется Компетентность 2.',
        requirement: { skill: 'competence', min: 2 },
        outcome: { energy: -1, xp: 18, reputation: 5 },
        result: 'Ты нашёл нужное сообщение за 14 секунд. В отделе стало подозрительно тихо.',
      },
      {
        id: 'redo',
        label: 'Согласиться переделать',
        description: 'Не победа, но дедлайн переживёт.',
        outcome: { energy: -2, money: 100, xp: 8, reputation: 2, stress: 2 },
        result: 'Все довольны, кроме тебя. Зато теперь ты знаешь, что значит «небольшая правка».',
      },
    ],
  },
];

export const bossEvent: OfficeStoryEvent = {
  id: 'sergey-first-assignment',
  eyebrow: 'Испытание · Сергей Петрович',
  title: '«Клиент прислал правки. Говорит, что всё не так»',
  description:
    'Сергей Петрович кладёт перед тобой распечатку. На ней красным отмечено почти всё. Это первое настоящее поручение.',
  speaker: 'Сергей Петрович',
  choices: [
    {
      id: 'boss-redo',
      label: 'Переделать молча',
      description: 'Надёжно. Больно. Работает.',
      outcome: { energy: -3, money: 300, xp: 25, reputation: 5 },
      result: 'Через два часа клиент написал «ну уже лучше». Сергей Петрович кивнул.',
    },
    {
      id: 'boss-explain',
      label: 'Объяснить клиенту',
      description: 'Потребуется Коммуникация 3.',
      requirement: { skill: 'communication', min: 3 },
      outcome: { energy: -2, money: 350, xp: 30, reputation: 8, skills: { communication: 1 } },
      result: 'Ты перевёл требования клиента с эмоционального на человеческий. Это впечатлило даже Сергея.',
    },
    {
      id: 'boss-tz',
      label: 'Сказать: «Это было в ТЗ»',
      description: 'Потребуется Компетентность 4.',
      requirement: { skill: 'competence', min: 4 },
      outcome: { energy: -1, money: 400, xp: 35, reputation: 10 },
      result: 'Ты открыл ТЗ на нужной странице. Сергей Петрович впервые назвал тебя по имени.',
    },
    {
      id: 'boss-colleague',
      label: 'Свалить на коллегу',
      description: 'Потребуется Напор 3. Репутация среди коллег пострадает.',
      requirement: { skill: 'drive', min: 3 },
      outcome: { energy: -1, money: 300, xp: 22, reputation: 3, motivation: 4 },
      result: 'Формально сработало. Коллега теперь очень внимательно следит за твоей кружкой.',
    },
  ],
};

export const officePranks: OfficePrank[] = [
  {
    id: 'stapler',
    title: 'Спрятать степлер',
    description: 'Классика офисной дипломатии. Никто не пострадает, кроме поисковой истории.',
    risk: 'Низкий',
    successChance: 0.92,
    success: { motivation: 2, stress: -1, xp: 2 },
    fail: { motivation: 1, reputation: -1 },
    successText: 'Степлер переехал на соседний стол. Расследование уже началось.',
    failText: 'Тебя заметили со степлером в руке. Ты сказал «проверял инвентарь».',
  },
  {
    id: 'coffee',
    title: 'Подменить кофе',
    description: 'Безопасная версия: заменить обычный на декаф и наблюдать за реальностью.',
    risk: 'Средний',
    successChance: 0.72,
    success: { motivation: 4, stress: -2, xp: 4 },
    fail: { reputation: -3, stress: 2 },
    successText: 'Эксперимент удался. Коллега всё равно сказал, что кофе сегодня особенно крепкий.',
    failText: 'Тебя поймали у банки с кофе. Теперь объясняй, что это был социальный эксперимент.',
  },
  {
    id: 'meme',
    title: 'Отправить мем в общий чат',
    description: 'Главное — не перепутать рабочий чат с семейным.',
    risk: 'Низкий',
    successChance: 0.85,
    success: { motivation: 3, reputation: 1, xp: 3 },
    fail: { reputation: -1, stress: 1 },
    successText: 'Поставили семь реакций. Одна от руководителя. Непонятно, хорошо это или нет.',
    failText: 'В чате повисла тишина. Через минуту кто-то написал «пон».',
  },
  {
    id: 'meeting-room',
    title: 'Забронировать переговорку на весь день',
    description: 'Высокий риск, высокая власть над календарём.',
    risk: 'Высокий',
    successChance: 0.55,
    success: { motivation: 5, reputation: 3, xp: 6 },
    fail: { reputation: -4, stress: 3 },
    successText: 'На восемь часов у тебя появился собственный кабинет. Почти руководитель.',
    failText: 'Администратор снял бронь через четыре минуты и добавил тебя в какой-то список.',
  },
];

export const careerNodes: OfficeCareerNode[] = [
  { id: 'intern', title: 'Стажёр', subtitle: 'Точка входа', branch: 'start', salary: 35000, requirement: 'Старт', x: 8, y: 46 },
  { id: 'junior', title: 'Младший специалист', subtitle: 'Первая ступень', branch: 'start', salary: 50000, requirement: 'Компетентность 5 · Репутация 30 · поручение', x: 28, y: 46 },
  { id: 'specialist', title: 'Специалист', subtitle: 'Выбор направления', branch: 'start', salary: 80000, requirement: 'ур. 8 · Репутация 50', x: 49, y: 46 },
  { id: 'expert', title: 'Эксперт', subtitle: 'Глубина знаний', branch: 'expert', salary: 130000, requirement: 'Компетентность 18', x: 70, y: 16 },
  { id: 'cto', title: 'CTO', subtitle: 'Технологическая вершина', branch: 'expert', salary: 260000, requirement: 'Эксперт · ур. 35', x: 90, y: 16 },
  { id: 'teamlead', title: 'Тимлид', subtitle: 'Люди и дедлайны', branch: 'management', salary: 145000, requirement: 'Коммуникация 14 · Напор 10', x: 70, y: 46 },
  { id: 'ceo', title: 'CEO', subtitle: 'Теперь проблемы все твои', branch: 'management', salary: 350000, requirement: 'Руководитель · ур. 40', x: 90, y: 46 },
  { id: 'sales', title: 'Продажи', subtitle: 'Договориться можно обо всём', branch: 'sales', salary: 125000, requirement: 'Коммуникация 16', x: 70, y: 76 },
  { id: 'sales-head', title: 'Head of Sales', subtitle: 'Планы растут быстрее зарплаты', branch: 'sales', salary: 240000, requirement: 'Продажи · ур. 32', x: 90, y: 76 },
];

export function getNextFirstDayEvent(completedEvents: string[]) {
  return firstDayEvents.find((event) => !completedEvents.includes(event.id)) ?? null;
}

export function getSkillLabel(skill: OfficeSkillKey) {
  if (skill === 'competence') return 'Компетентность';
  if (skill === 'communication') return 'Коммуникация';
  return 'Напор';
}
