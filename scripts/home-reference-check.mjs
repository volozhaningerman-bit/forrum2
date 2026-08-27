import fs from 'node:fs';

const navPath = 'apps/web/components/main-nav.tsx';
const homePath = 'apps/web/components/home-dashboard.tsx';
const cssPath = 'apps/web/app/globals.css';

for (const file of [navPath, homePath, cssPath]) {
  if (!fs.existsSync(file)) {
    throw new Error(`Required file is missing: ${file}`);
  }
}

const nav = fs.readFileSync(navPath, 'utf8');
const linksMatch = nav.match(
  /const\s+links\s*=\s*\[([\s\S]*?)\]\s*as\s+const\s*;/,
);

if (!linksMatch) {
  throw new Error('Could not isolate MainNav links array.');
}

const links = linksMatch[1];

for (const rejected of [
  'Услуги',
  'Медиа',
  'Новости',
  '/services',
  '/media',
]) {
  if (links.includes(rejected)) {
    throw new Error(`Legacy nav marker remains in links array: ${rejected}`);
  }
}

for (const required of [
  'Главная',
  'Сообщества',
  'Темы',
  'Пользователи',
  'Архив',
  '/feed',
  '/users',
  '/archive',
]) {
  if (!links.includes(required)) {
    throw new Error(`Canonical nav marker missing: ${required}`);
  }
}

// /news is allowed outside the links array because the current component
// still uses it to calculate the existing unread-news state.
if (!nav.includes("api<ActivityItem[]>('/news')")) {
  console.log('Note: legacy unread-news polling is no longer present.');
}


// The current navigation tuple no longer includes /news.
// A direct literal comparison such as `href === '/news'` is invalid under
// the inferred route union and causes TS2367.
const bareNewsCompare =
  /\b(?:href|pathname)\s*(?:===|!==)\s*(['"])\/news\1/;

if (bareNewsCompare.test(nav)) {
  throw new Error(
    'Bare typed-route comparison with /news remains in MainNav.',
  );
}

const home = fs.readFileSync(homePath, 'utf8');

for (const required of [
  'forrum-home-v16__new-topic-table',
  'forrum-home-v16__new-topic-head',
  'forrum-home-v16__new-topic',
  'Последнее сообщение',
  'forrum-home-v16__tree-children',
  'Участники недели',
  'Активные голосования',
  'FORRUM сегодня',
]) {
  if (!home.includes(required)) {
    throw new Error(`Homepage marker missing: ${required}`);
  }
}

for (const rejected of [
  'Кураторы недели',
  'Развитие FORRUM',
  'Поддержать проект',
  'Ближайшие события',
]) {
  if (home.includes(rejected)) {
    throw new Error(`Rejected homepage block returned: ${rejected}`);
  }
}

const css = fs.readFileSync(cssPath, 'utf8');
const start = '/* FORRUM_HOME_REFERENCE_FINAL_START';
const end = '/* FORRUM_HOME_REFERENCE_FINAL_END */';

if ((css.match(/FORRUM_HOME_REFERENCE_FINAL_START/g) ?? []).length !== 1) {
  throw new Error('Expected exactly one FINAL CSS start marker.');
}

if ((css.match(/FORRUM_HOME_REFERENCE_FINAL_END/g) ?? []).length !== 1) {
  throw new Error('Expected exactly one FINAL CSS end marker.');
}

const block = css.slice(
  css.indexOf(start),
  css.indexOf(end) + end.length,
);

for (const required of [
  'grid-template-columns: 292px minmax(0, 1fr) 306px',
  'forrum-home-v16__new-topic-head',
  'border-left: 1px dotted var(--fhr-line-strong)',
  '--fhr-page: #ecebe7',
  '--fhr-page: #121416',
]) {
  if (!block.includes(required)) {
    throw new Error(`FINAL visual marker missing: ${required}`);
  }
}

for (const forbidden of [
  'linear-gradient',
  'radial-gradient',
  'backdrop-filter',
  'box-shadow:',
]) {
  if (block.includes(forbidden)) {
    throw new Error(`Forbidden visual effect found: ${forbidden}`);
  }
}

const darkStart = block.indexOf('html.dark,');
const layoutStart = block.indexOf('[data-forrum-shell="header"]');

if (darkStart < 0 || layoutStart <= darkStart) {
  throw new Error('Could not isolate Graphite token area.');
}

const tokenArea = block.slice(darkStart, layoutStart);

for (const structural of [
  'display:',
  'position:',
  'grid-template',
  'width:',
  'height:',
  'margin:',
  'padding:',
  'gap:',
]) {
  if (tokenArea.includes(structural)) {
    throw new Error(
      `Graphite changes layout instead of tokens: ${structural}`,
    );
  }
}

console.log(
  'FORRUM Home Reference FINAL passed: tuple nav, reference table/tree, one Paper/Graphite geometry.',
);
