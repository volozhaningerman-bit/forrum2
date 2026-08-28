import fs from 'node:fs';

const source = fs.readFileSync(
  'apps/web/components/home-dashboard.tsx',
  'utf8',
);
const css = fs.readFileSync(
  'apps/web/app/globals.css',
  'utf8',
);

for (const marker of [
  '// FORRUM_HOME_CONTEXTUAL_ACTUAL',
  'const actualAnnouncements = useMemo(() => {',
  'actualAnnouncements.map((item) => (',
  'activePolls.slice(0, 2).map((poll) => (',
  'title="Активные голосования"',
  'title="Новости FORRUM"',
]) {
  if (!source.includes(marker)) {
    throw new Error(`Missing production marker: ${marker}`);
  }
}

const actualStart = source.indexOf('title="Актуальное"');
const weeklyStart = source.indexOf('<h2>Участники недели</h2>');

if (actualStart < 0 || weeklyStart <= actualStart) {
  throw new Error('Could not locate Actual panel boundaries.');
}

const actual = source.slice(actualStart, weeklyStart);

if (actual.includes('activeCommunities.map((community) => (')) {
  throw new Error('Actual still duplicates communities.');
}

if (actual.includes('discussed.slice(0, 3).map((item) => (')) {
  throw new Error('Actual still duplicates discussed topics.');
}

if (
  !source.includes(
    '(activePolls.length > 0 || actualAnnouncements.length > 0) && (',
  )
) {
  throw new Error('Actual is not conditional.');
}

if (!source.includes('activePolls.length > 0 && (')) {
  throw new Error('Empty active-polls section is not hidden.');
}

const actualAnnouncementsCount = (
  source.match(/const actualAnnouncements\s*=/g) ?? []
).length;

if (actualAnnouncementsCount !== 1) {
  throw new Error(
    `Expected exactly one actualAnnouncements declaration, got ${actualAnnouncementsCount}.`,
  );
}

for (const marker of [
  '/* FORRUM_LOGO_DARK_HOVER_FIX */',
  'html.dark .brand:hover',
  'html.dark .brand:focus-visible',
  'html[data-forrum-theme="graphite"] .brand:hover',
]) {
  if (!css.includes(marker)) {
    throw new Error(`Missing logo hover fix: ${marker}`);
  }
}

console.log(
  'Contextual Actual: PASS — no duplicate blocks, empty polls hidden, logo hover protected.',
);
