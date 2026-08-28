import fs from 'node:fs';

const paths = {
  home: 'apps/web/components/home-dashboard.tsx',
  css: 'apps/web/app/globals.css',
  page: 'apps/web/app/page.tsx',
  service: 'apps/api/src/home/home.service.ts',
};

for (const path of Object.values(paths)) {
  if (!fs.existsSync(path)) throw new Error(`Homepage contract file missing: ${path}`);
}

const home = fs.readFileSync(paths.home, 'utf8');
const css = fs.readFileSync(paths.css, 'utf8');
const page = fs.readFileSync(paths.page, 'utf8');
const service = fs.readFileSync(paths.service, 'utf8');

for (const required of [
  'Обсуждаемые темы', 'Новые темы', 'Активные голосования',
  'Участники недели', 'FORRUM сегодня',
  'event.target !== event.currentTarget',
  'initialData.overview?.discussed',
  'initialData.overview?.activePolls',
]) {
  if (!home.includes(required)) throw new Error(`Homepage product element missing: ${required}`);
}

for (const required of ["'/home/overview'", "'/feed?mode=new'", "'/announcements'"]) {
  if (!page.includes(required)) throw new Error(`Homepage server source missing: ${required}`);
}

for (const required of ['discussedCandidates', 'activePolls: polls.map', 'VoteClass.BINDING']) {
  if (!service.includes(required)) throw new Error(`Homepage real-data contract missing: ${required}`);
}

const startMarker = '/* FORRUM_HOME_REFERENCE_V36_START';
const endMarker = '/* FORRUM_HOME_REFERENCE_V36_END */';
const start = css.indexOf(startMarker);
const end = css.indexOf(endMarker, start);
if (start < 0 || end < 0) throw new Error('Canonical homepage CSS source missing.');
const block = css.slice(start, end);
const outside = css.slice(0, start) + css.slice(end + endMarker.length);

for (const required of [
  'width: min(calc(100vw - 32px), 1580px)',
  'grid-template-columns: 300px minmax(0, 1fr) 326px',
  '.forrum-home-v16__tree-children::before',
  '.forrum-home-v16__discussed',
  '.forrum-home-v16__poll-option',
  '@media (max-width: 860px)',
]) {
  if (!block.includes(required)) throw new Error(`Homepage layout contract missing: ${required}`);
}

if (outside.includes('.forrum-home-v16')) {
  throw new Error('Competing homepage CSS exists outside canonical source.');
}

for (const forbidden of ['!important', 'box-shadow:', 'backdrop-filter:']) {
  if (block.includes(forbidden)) throw new Error(`Homepage canonical CSS forbidden pattern: ${forbidden}`);
}

console.log('FORRUM Home product contract passed: real data, centered 1580px shell, dense responsive composition.');
