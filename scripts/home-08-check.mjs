import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');

const home = read('apps/web/components/home-dashboard.tsx');
const header = read('apps/web/components/site-header.tsx');
const mainNav = read('apps/web/components/main-nav.tsx');
const search = read('apps/web/components/header-search.tsx');
const css = read('apps/web/app/globals.css');

function need(source, marker, label) {
  if (!source.includes(marker)) {
    throw new Error(`${label}: missing ${marker}`);
  }
}

function count(source, marker) {
  return source.split(marker).length - 1;
}

// One theme control only: MainNav owns it, SiteHeader must not duplicate it.
if (count(mainNav, '<ThemeToggle />') !== 1) {
  throw new Error('MainNav must mount exactly one ThemeToggle.');
}
if (header.includes('<ThemeToggle />')) {
  throw new Error('SiteHeader still duplicates ThemeToggle.');
}
if (header.includes("from './theme-toggle'")) {
  throw new Error('SiteHeader still imports ThemeToggle directly.');
}

// Search animates only when empty and unfocused.
for (const marker of [
  'const [query, setQuery]',
  'const [focused, setFocused]',
  'onFocus={() => setFocused(true)}',
  'onBlur={() => setFocused(false)}',
  'onChange={(event) => setQuery(event.target.value)}',
  "'Поиск...'",
  "prefers-reduced-motion: reduce",
]) {
  need(search, marker, 'search');
}

// Home polish.
for (const marker of [
  '4RRUM_HOME_V4',
  'function communityDisplayName(',
  "'FORRUM Start' ? '4RRUM Start'",
  'forrum-home-v16__discussed-head',
  'forrum-home-v16__topic-stat',
  "setWeeklyMode",
]) {
  need(home, marker, 'home');
}

const weeklyDeclaration = home.match(
  /const\s+\[weeklyMode,\s*setWeeklyMode\]\s*=\s*useState<[\s\S]{0,160}?'likes'\s*\|\s*'activity'[\s\S]{0,100}?>\s*\(([\s\S]{0,180}?)\);/
);

if (!weeklyDeclaration) {
  throw new Error('weeklyMode declaration is missing.');
}

const weeklyInitializer = weeklyDeclaration[1].trim().replace(/,$/, '').trim();

if (weeklyInitializer === 'initialWeeklyMode') {
  if (
    !/const\s+initialWeeklyMode\b[\s\S]{0,220}?=\s*'activity'\s*;/.test(home)
  ) {
    throw new Error(
      'initialWeeklyMode must resolve to activity.',
    );
  }
} else if (weeklyInitializer !== "'activity'") {
  throw new Error(
    `Weekly participants must open on activity; got ${weeklyInitializer}`,
  );
}

if (home.includes('data-metric-label="Ответы"')) {
  throw new Error('Discussed replies still use noisy inline label.');
}
if (home.includes('data-metric-label="Просм."')) {
  throw new Error('Discussed views still use noisy inline label.');
}
if (/aria-hidden="true">\s*[◫◉]\s*</.test(home)) {
  throw new Error('Old unclear discussed-topic stat icons remain.');
}

// CSS contract.
for (const marker of [
  '/* 4RRUM_HOME_V4 */',
  '.forrum-home-v16__discussed-head',
  '.forrum-home-v16__topic-stat',
  '.header-search',
  '.theme-toggle-v2:hover',
  '.icon-links a:hover',
  '.auth-actions > a:not(.button):hover',
]) {
  need(css, marker, 'css');
}

console.log('Главная — 08 contract: PASS');
