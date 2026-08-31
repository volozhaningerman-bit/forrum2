import fs from 'node:fs';

const home = fs.readFileSync(
  'apps/web/components/home-dashboard.tsx',
  'utf8',
);
const css = fs.readFileSync(
  'apps/web/app/globals.css',
  'utf8',
);

const requiredHome = [
  '// FORRUM_HOME_PRODUCTION_POLISH_V46',
  '// FORRUM_HOME_CONTEXTUAL_ACTUAL',
  'title="Новости FORRUM"',
  'announcements.slice(0, 3).map((item) => (',
  'weekly.slice(0, 5).map((user, index) => (',
  'event.target !== event.currentTarget',
];

for (const marker of requiredHome) {
  if (!home.includes(marker)) {
    throw new Error(`V46 home marker missing: ${marker}`);
  }
}

const startMarker =
  '/* FORRUM_HOME_PRODUCTION_POLISH_V46_START */';
const endMarker =
  '/* FORRUM_HOME_PRODUCTION_POLISH_V46_END */';
const headerStart =
  '/* FORRUM_HEADER_PRODUCTION_POLISH_V46_START */';
const headerEnd =
  '/* FORRUM_HEADER_PRODUCTION_POLISH_V46_END */';

for (const marker of [
  startMarker,
  endMarker,
  headerStart,
  headerEnd,
  'grid-template-columns: minmax(360px, 2.65fr)',
  '.forrum-home-v16__discussion-stat',
  '.forrum-home-v16__tree-count',
  '.header-search',
  'width: min(330px, 25vw);',
]) {
  if (!css.includes(marker)) {
    throw new Error(`V46 CSS marker missing: ${marker}`);
  }
}

if ((css.match(
  /\/\* FORRUM_HOME_PRODUCTION_POLISH_V46_START \*\//g,
) ?? []).length !== 1) {
  throw new Error('V46 home CSS block must exist exactly once.');
}

if ((css.match(
  /\/\* FORRUM_HEADER_PRODUCTION_POLISH_V46_START \*\//g,
) ?? []).length !== 1) {
  throw new Error('V46 header CSS block must exist exactly once.');
}

const canonicalStart = css.indexOf(
  '/* FORRUM_HOME_REFERENCE_V36_START',
);
const canonicalEnd = css.indexOf(
  '/* FORRUM_HOME_REFERENCE_V36_END */',
  canonicalStart,
);
const polishStart = css.indexOf(startMarker);

if (
  canonicalStart < 0 ||
  canonicalEnd < 0 ||
  polishStart < canonicalStart ||
  polishStart > canonicalEnd
) {
  throw new Error(
    'Homepage V46 styles must stay inside canonical homepage CSS.',
  );
}

const polishEnd = css.indexOf(endMarker, polishStart);
const polish = css.slice(
  polishStart,
  polishEnd + endMarker.length,
);

for (const forbidden of [
  'box-shadow:',
  'backdrop-filter:',
  'linear-gradient(',
  'radial-gradient(',
  'border-radius: 8px',
  'border-radius: 12px',
]) {
  if (polish.includes(forbidden)) {
    throw new Error(`V46 forbidden visual pattern: ${forbidden}`);
  }
}

if (home.includes('FORRUM сегодня')) {
  throw new Error('Removed statistics panel returned.');
}

for (const fake of [
  'fakeUser',
  'fakeTopic',
  'fakeNews',
  'mockUser',
  'mockTopic',
  'demoUser',
  'demoTopic',
]) {
  if (home.includes(fake)) {
    throw new Error(`Synthetic homepage data detected: ${fake}`);
  }
}

console.log('FORRUM Home Production Polish V46: PASS');
