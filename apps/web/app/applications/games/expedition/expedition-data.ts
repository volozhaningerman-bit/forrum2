export type View = 'expeditions' | 'character' | 'inventory' | 'raid' | 'faction' | 'syndicate' | 'market' | 'warehouse';
export type Rarity = 'common' | 'uncommon' | 'rare' | 'epic';
export type Slot = 'head' | 'neck' | 'shoulders' | 'cape' | 'chest' | 'wrists' | 'gloves' | 'belt' | 'legs' | 'feet' | 'ring1' | 'ring2' | 'relic1' | 'relic2' | 'mainhand' | 'offhand';

export type ItemTemplate = {
  id: string;
  name: string;
  slot: Slot;
  rarity: Rarity;
  power: number;
  supply: number;
  icon: string;
  color: string;
  description: string;
};

export type ItemInstance = { uid: string; templateId: string; serial: number };

export const rarityLabels: Record<Rarity, string> = {
  common: 'Обычный',
  uncommon: 'Необычный',
  rare: 'Редкий',
  epic: 'Эпический',
};

export const slotLabels: Record<Slot, string> = {
  head: 'Голова',
  neck: 'Шея',
  shoulders: 'Плечи',
  cape: 'Плащ',
  chest: 'Грудь',
  wrists: 'Запястья',
  gloves: 'Перчатки',
  belt: 'Пояс',
  legs: 'Ноги',
  feet: 'Обувь',
  ring1: 'Кольцо I',
  ring2: 'Кольцо II',
  relic1: 'Реликвия I',
  relic2: 'Реликвия II',
  mainhand: 'Основная рука',
  offhand: 'Вторая рука',
};

export const slotOrder = Object.keys(slotLabels) as Slot[];

export const items: ItemTemplate[] = [
  { id:'collector-hood', name:'Капюшон Собирателя', slot:'head', rarity:'common', power:3, supply:12000, icon:'◒', color:'#9b7655', description:'Грубая ткань и кожаная подкладка.' },
  { id:'watcher-helm', name:'Шлем Дозорного', slot:'head', rarity:'uncommon', power:7, supply:4000, icon:'⬡', color:'#70a993', description:'Кованый шлем с фрагментом древней оптики.' },
  { id:'traveler-seal', name:'Печать Путника', slot:'neck', rarity:'common', power:2, supply:18000, icon:'◇', color:'#d1a85c', description:'Старая дорожная печать.' },
  { id:'archivist-eye', name:'Око Архивариуса', slot:'neck', rarity:'rare', power:14, supply:700, icon:'◉', color:'#56b8ff', description:'Миниатюрный сенсор, переделанный в амулет.' },
  { id:'frontier-shoulders', name:'Наплечники Рубежа', slot:'shoulders', rarity:'uncommon', power:8, supply:3500, icon:'⌁', color:'#718b7d', description:'Сталь и пластины старых машин.' },
  { id:'ash-road-cape', name:'Плащ Пепельной Дороги', slot:'cape', rarity:'common', power:4, supply:15000, icon:'◢', color:'#8e3434', description:'Потрёпанный плащ караванщиков.' },
  { id:'blue-banner-cape', name:'Плащ Синего Знамени', slot:'cape', rarity:'rare', power:13, supply:900, icon:'◫', color:'#397fbd', description:'Плотная ткань с восстановленной нитью Старого мира.' },
  { id:'frontier-jacket', name:'Куртка Пограничника', slot:'chest', rarity:'common', power:5, supply:16000, icon:'▣', color:'#7d5a42', description:'Простая кожаная защита для первых вылазок.' },
  { id:'old-guard-shell', name:'Панцирь Старой Стражи', slot:'chest', rarity:'uncommon', power:10, supply:2800, icon:'▤', color:'#657c72', description:'Кузнечная броня вокруг древней композитной пластины.' },
  { id:'rust-consul-cuirass', name:'Кираса Ржавого Консула', slot:'chest', rarity:'epic', power:24, supply:80, icon:'✦', color:'#a56ddb', description:'Редкий нагрудник консульской гвардии.' },
  { id:'seeker-bracers', name:'Наручи Искателя', slot:'wrists', rarity:'common', power:3, supply:14000, icon:'═', color:'#8d674a', description:'Кожа, заклёпки и старый кабель.' },
  { id:'servo-gloves', name:'Перчатки Сервомастера', slot:'gloves', rarity:'rare', power:15, supply:600, icon:'⌘', color:'#338ed4', description:'Механические усилители пальцев всё ещё работают.' },
  { id:'mechanic-belt', name:'Пояс Механика', slot:'belt', rarity:'common', power:4, supply:15000, icon:'▰', color:'#8b5d37', description:'Подсумки, крепления и инструменты.' },
  { id:'scrap-hunter-belt', name:'Пояс Руинного Ловца', slot:'belt', rarity:'rare', power:12, supply:1000, icon:'▱', color:'#397db1', description:'Пояс для глубоких экспедиций.' },
  { id:'road-trousers', name:'Штаны Пыльной Тропы', slot:'legs', rarity:'common', power:3, supply:20000, icon:'Ⅱ', color:'#505866', description:'Прочная ткань с кожаными вставками.' },
  { id:'iron-step-boots', name:'Сапоги Железного Шага', slot:'feet', rarity:'uncommon', power:8, supply:4200, icon:'∩', color:'#527469', description:'Тяжёлые ботинки, усиленные пластинами.' },
  { id:'signal-ring', name:'Кольцо Сигнала', slot:'ring1', rarity:'uncommon', power:6, supply:3200, icon:'○', color:'#4cb892', description:'Тихо вибрирует возле старых комплексов.' },
  { id:'black-ring', name:'Чёрное Кольцо №0', slot:'ring2', rarity:'epic', power:18, supply:40, icon:'●', color:'#a05be3', description:'Происхождение неизвестно. Нумерация начинается с нуля.' },
  { id:'reactor-shard', name:'Осколок Реактора', slot:'relic1', rarity:'uncommon', power:9, supply:2400, icon:'◆', color:'#4dcda7', description:'Тёплый фрагмент древнего энергетического узла.' },
  { id:'beacon-heart', name:'Сердце Маяка', slot:'relic2', rarity:'epic', power:23, supply:50, icon:'✺', color:'#b15df0', description:'Источник света из погибшей сети навигационных башен.' },
  { id:'dust-sword', name:'Меч Пыльной Стражи', slot:'mainhand', rarity:'common', power:7, supply:14000, icon:'†', color:'#b7b0a2', description:'Простой ремонтопригодный клинок.' },
  { id:'last-circuit-blade', name:'Клинок Последнего Контура', slot:'mainhand', rarity:'rare', power:17, supply:550, icon:'ϟ', color:'#4caaff', description:'Внутри лезвия просыпается энергетический контур.' },
  { id:'steel-prior-maul', name:'Молот Стального Приора', slot:'mainhand', rarity:'epic', power:26, supply:60, icon:'‡', color:'#bd68e9', description:'Тяжёлое оружие с импульсным сердечником.' },
  { id:'barrier-shield', name:'Щит Заслона', slot:'offhand', rarity:'common', power:6, supply:9000, icon:'⬟', color:'#8c7355', description:'Щит вокруг старой композитной пластины.' },
  { id:'seeker-lantern', name:'Фонарь Искателя', slot:'offhand', rarity:'uncommon', power:8, supply:3000, icon:'▥', color:'#4cb792', description:'Светит там, где обычное масло гаснет.' },
];

export const itemById = Object.fromEntries(items.map((item) => [item.id, item])) as Record<string, ItemTemplate>;

export const lootCycle = [
  'collector-hood','frontier-jacket','mechanic-belt','dust-sword','iron-step-boots',
  'reactor-shard','watcher-helm','frontier-shoulders','signal-ring','last-circuit-blade',
  'blue-banner-cape','archivist-eye','servo-gloves','rust-consul-cuirass','beacon-heart',
];

export const depths = [
  { depth:1, name:'Вход в окраины', power:0, cost:2, seconds:8, note:'Лагеря, рынок и первые руины.' },
  { depth:2, name:'Ломовые дворы', power:18, cost:2, seconds:10, note:'Старые машины и сборщики металла.' },
  { depth:3, name:'Старые кварталы', power:34, cost:3, seconds:12, note:'Закрытые подвалы и более редкий лут.' },
  { depth:4, name:'Промышленный двор', power:52, cost:3, seconds:14, note:'Опасные механизмы и древние детали.' },
  { depth:5, name:'Реакторная зона', power:72, cost:4, seconds:16, note:'Лучший лут и логово Железного Пастыря.' },
];
