import fs from 'node:fs';

const homePath = 'apps/web/components/home-dashboard.tsx';
const cssPath = 'apps/web/app/globals.css';
const pagePath = 'apps/web/app/page.tsx';

for (const path of [homePath, cssPath, pagePath]) {
  if (!fs.existsSync(path)) {
    throw new Error(`Homepage V36 required file missing: ${path}`);
  }
}

const home = fs.readFileSync(homePath, 'utf8');
const css = fs.readFileSync(cssPath, 'utf8');
const page = fs.readFileSync(pagePath, 'utf8');

for (const required of [
  'data-home-reference="v36"',
  'Обсуждаемые темы',
  'Новые темы',
  'Активные голосования',
  'Участники недели',
  'FORRUM сегодня',
  'Сообщества',
  'Тем создано',
  'Сообщений',
  'Пользователей онлайн',
  'Рекорд онлайн:',
  'item.lastComment?.author.username',
  'poll.options ?? []',
  'option.bindingVotes',
  'Осталось:',
]) {
  if (!home.includes(required)) {
    throw new Error(`Homepage V36 product element missing: ${required}`);
  }
}

for (const required of [
  "'/communities'",
  "'/governance/polls'",
  "'/announcements'",
  "'/feed?mode=popular'",
  "'/feed?mode=new'",
  "'/home/overview'",
]) {
  if (!page.includes(required)) {
    throw new Error(`Homepage V36 server data source missing: ${required}`);
  }
}

const startMarker = '/* FORRUM_HOME_REFERENCE_V36_START';
const endMarker = '/* FORRUM_HOME_REFERENCE_V36_END */';
const starts = css.split(startMarker).length - 1;
const ends = css.split(endMarker).length - 1;

if (starts !== 1 || ends !== 1) {
  throw new Error(
    `Homepage V36 must have exactly one canonical CSS block; got ${starts}/${ends}.`,
  );
}

const start = css.indexOf(startMarker);
const end = css.indexOf(endMarker, start);
const block = css.slice(start, end + endMarker.length);
const outside = css.slice(0, start) + css.slice(end + endMarker.length);

for (const required of [
  'grid-template-columns: 300px minmax(0, 1fr) 326px',
  'max-width: 1680px',
  'gap: 14px',
  'min-height: 68px',
  'min-height: 39px',
  'min-height: 78px',
  '.forrum-home-v16__tree-children::before',
  'border-left: 1px dotted',
  '.forrum-home-v16__new-topic-head',
  '.forrum-home-v16__poll-option',
  '.forrum-home-v16__weekly',
  '.forrum-home-v16__record',
  '@media (max-width: 860px)',
]) {
  if (!block.includes(required)) {
    throw new Error(`Homepage V36 reference geometry missing: ${required}`);
  }
}

if (outside.includes('.forrum-home-v16')) {
  throw new Error(
    'Homepage styles are duplicated outside the single V36 canonical block.',
  );
}

for (const forbidden of [
  '!important',
  'linear-gradient',
  'radial-gradient',
  'box-shadow:',
  'backdrop-filter:',
  'border-radius: 12px',
  'border-radius: 16px',
]) {
  if (block.includes(forbidden)) {
    throw new Error(`Homepage V36 forbidden visual pattern: ${forbidden}`);
  }
}

for (const forbiddenThemeGeometry of [
  'html.dark .forrum-home-v16',
  'html[data-theme="dark"] .forrum-home-v16',
  'html[data-theme="graphite"] .forrum-home-v16',
  'html[data-forrum-theme="graphite"] .forrum-home-v16',
]) {
  if (block.includes(forbiddenThemeGeometry)) {
    throw new Error(
      `Paper/Graphite geometry diverged in V36: ${forbiddenThemeGeometry}`,
    );
  }
}

console.log(
  'FORRUM Home V36 passed: reference geometry, dense tree/table/polls, one Paper/Graphite layout.',
);
