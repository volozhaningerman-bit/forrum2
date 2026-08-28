import fs from 'node:fs';

const nav = fs.readFileSync('apps/web/components/main-nav.tsx', 'utf8');
const home = fs.readFileSync('apps/web/components/home-dashboard.tsx', 'utf8');
const css = fs.readFileSync('apps/web/app/globals.css', 'utf8');

const linksMatch = nav.match(/const\s+links\s*=\s*\[([\s\S]*?)\]\s*as\s+const\s*;/);
if (!linksMatch) throw new Error('Could not isolate MainNav product links.');
const tuples = [...linksMatch[1].matchAll(/\[\s*['"]([^'"]+)['"]\s*,\s*['"]([^'"]+)['"]\s*\]/g)].map((m) => [m[1], m[2]]);
const expected = [['/','Главная'],['/communities','Сообщества'],['/services','Услуги'],['/media','Медиа'],['/news','Новости']];
if (JSON.stringify(tuples) !== JSON.stringify(expected)) throw new Error(`MainNav product contract mismatch: ${JSON.stringify(tuples)}`);
if (!nav.includes("api<ActivityItem[]>('/news')")) throw new Error('Existing News polling was removed.');
if (nav.includes('String(href)')) throw new Error('String(href) workaround returned.');

for (const marker of [
  'data-home-reference="v36"', 'data-home-polish="v40"',
  'forrum-home-v16__tree', 'forrum-home-v16__discussed',
  'forrum-home-v16__new-topic-table', 'forrum-home-v16__poll-list',
  'forrum-home-v16__weekly', 'forrum-home-v16__stats',
]) {
  if (!home.includes(marker)) throw new Error(`Reference structure missing: ${marker}`);
}

const start = css.indexOf('/* FORRUM_HOME_REFERENCE_V36_START');
const end = css.indexOf('/* FORRUM_HOME_REFERENCE_V36_END */', start);
if (start < 0 || end < 0) throw new Error('Canonical homepage CSS missing.');
const block = css.slice(start, end);

if (!block.includes('width: min(calc(100vw - 20px), 1920px)')) throw new Error('Homepage does not use reference-scale viewport width.');
if (!block.includes('grid-template-columns: 300px minmax(0, 1fr) 326px')) throw new Error('Three-column reference geometry missing.');
if (!block.includes('border-left: 1px dotted')) throw new Error('Visible community hierarchy missing.');

console.log('FORRUM reference contract passed: product navigation preserved; composition follows approved home geometry.');
