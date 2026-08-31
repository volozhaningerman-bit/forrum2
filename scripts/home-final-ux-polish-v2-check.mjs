import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const exists = (path) => fs.existsSync(path);

const home = read('apps/web/components/home-dashboard.tsx');
const header = read('apps/web/components/site-header.tsx');
const footer = read('apps/web/components/site-footer.tsx');
const layout = read('apps/web/app/layout.tsx');
const css = read('apps/web/app/globals.css');
const search = exists('apps/web/components/header-search.tsx')
  ? read('apps/web/components/header-search.tsx')
  : '';
const theme = exists('apps/web/components/theme-toggle.tsx')
  ? read('apps/web/components/theme-toggle.tsx')
  : '';

const need = (source, marker, label) => {
  if (!source.includes(marker)) {
    throw new Error(`${label}: missing ${marker}`);
  }
};

need(header, 'aria-label="4RRUM"', 'brand');
need(header, '>4RRUM</span>', 'brand');
need(footer, '© 4RRUM', 'footer');
need(layout, '4RRUM', 'metadata');
need(home, 'title="Новости 4RRUM"', 'news');

need(header, '<HeaderSearch />', 'search mount');
need(search, "'Поиск...'", 'search animation');
need(search, 'prefers-reduced-motion: reduce', 'reduced motion');
need(search, 'aria-label="Поиск по 4RRUM"', 'search accessibility');

need(header, '<ThemeToggle />', 'theme mount');
need(theme, 'theme-toggle-v2', 'theme control');
need(theme, 'Включить тёмную тему', 'theme action');
need(theme, 'Включить светлую тему', 'theme action');

need(home, '4RRUM_HOME_TREE_COUNTS_REMOVED', 'tree cleanup');
need(home, 'data-metric-label="Ответы"', 'reply metric');
need(home, 'data-metric-label="Просм."', 'view metric');
need(home, '4RRUM_HOME_START_RAIL', 'right rail');
need(home, 'title="Старт 4RRUM"', 'right rail');

for (const marker of [
  '/* 4RRUM_HOME_FINAL_UX_POLISH_V2 */',
  '.theme-toggle-v2',
  '.header-search',
  '[data-metric-label]',
  '.forrum-home-v16__new-topic-title',
  '.forrum-home-v16__start-list',
  '.icon-links a:hover',
  '.auth-actions > a:not(.button):hover',
]) {
  need(css, marker, 'css');
}

if (/fakeUser|fakeParticipant|fakeNews|demoParticipant/.test(home)) {
  throw new Error('Fake engagement data introduced.');
}

console.log('4RRUM final UX V2 contract: PASS');
