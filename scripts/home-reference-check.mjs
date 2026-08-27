import fs from 'node:fs';

const navPath = 'apps/web/components/main-nav.tsx';
const homePath = 'apps/web/components/home-dashboard.tsx';
const cssPath = 'apps/web/app/globals.css';

for (const path of [navPath, homePath, cssPath]) {
  if (!fs.existsSync(path)) {
    throw new Error(`FORRUM reference file missing: ${path}`);
  }
}

const nav = fs.readFileSync(navPath, 'utf8');
const linksMatch = nav.match(
  /const\s+links\s*=\s*\[([\s\S]*?)\]\s*as\s+const\s*;/,
);

if (!linksMatch) {
  throw new Error('Could not isolate MainNav product links array.');
}

const tuples = [
  ...linksMatch[1].matchAll(
    /\[\s*['"]([^'"]+)['"]\s*,\s*['"]([^'"]+)['"]\s*\]/g,
  ),
].map((match) => [match[1], match[2]]);

const expectedNavigation = [
  ['/', 'Главная'],
  ['/communities', 'Сообщества'],
  ['/services', 'Услуги'],
  ['/media', 'Медиа'],
  ['/news', 'Новости'],
];

if (JSON.stringify(tuples) !== JSON.stringify(expectedNavigation)) {
  throw new Error(
    `MainNav product contract mismatch: ${JSON.stringify(tuples)}`,
  );
}

for (const routePage of [
  'apps/web/app/services/page.tsx',
  'apps/web/app/media/page.tsx',
  'apps/web/app/news/page.tsx',
]) {
  if (!fs.existsSync(routePage)) {
    throw new Error(`Approved MainNav route has no real page: ${routePage}`);
  }
}

if (!nav.includes("api<ActivityItem[]>('/news')")) {
  throw new Error('Existing News polling was removed.');
}

if (nav.includes('String(href)')) {
  throw new Error('String(href) workaround returned to MainNav.');
}

const home = fs.readFileSync(homePath, 'utf8');
const css = fs.readFileSync(cssPath, 'utf8');

const requiredHome = [
  'data-home-reference="v36"',
  'forrum-home-v16__tree',
  'forrum-home-v16__discussed',
  'forrum-home-v16__new-topic-table',
  'forrum-home-v16__poll-list',
  'forrum-home-v16__weekly',
  'forrum-home-v16__stats',
];

for (const marker of requiredHome) {
  if (!home.includes(marker)) {
    throw new Error(`V36 reference screen structure missing: ${marker}`);
  }
}

const start = css.indexOf('/* FORRUM_HOME_REFERENCE_V36_START');
const end = css.indexOf('/* FORRUM_HOME_REFERENCE_V36_END */', start);

if (start < 0 || end < 0) {
  throw new Error('V36 reference CSS block is missing.');
}

const block = css.slice(start, end);

if (!block.includes('grid-template-columns: 300px minmax(0, 1fr) 326px')) {
  throw new Error('V36 reference three-column geometry is missing.');
}

if (!block.includes('border-left: 1px dotted')) {
  throw new Error('V36 visible community hierarchy is missing.');
}

console.log(
  'FORRUM Home Reference V36 passed: approved navigation preserved and homepage aligned to reference.',
);
