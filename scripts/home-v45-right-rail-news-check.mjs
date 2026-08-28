import fs from 'node:fs';

const source = fs.readFileSync(
  'apps/web/components/home-dashboard.tsx',
  'utf8',
);

for (const marker of [
  '// FORRUM_HOME_V45_RIGHT_RAIL_NEWS',
  'title="Актуальное"',
  'href="/feed?mode=popular"',
  'discussed.slice(0, 3).map((item) => (',
  'title="Новости FORRUM"',
  'href="/news"',
  'announcements.map((item) => (',
  'Новости FORRUM пока не опубликованы.',
]) {
  if (!source.includes(marker)) {
    throw new Error(`V45 marker missing: ${marker}`);
  }
}

if (source.includes('FORRUM сегодня')) {
  throw new Error('Legacy FORRUM today panel remains.');
}

if ((source.match(/title="Актуальное"/g) ?? []).length !== 1) {
  throw new Error('Expected exactly one Actual panel.');
}

if ((source.match(/title="Новости FORRUM"/g) ?? []).length !== 1) {
  throw new Error('Expected exactly one News panel.');
}

console.log('V45 regression contract: PASS');
