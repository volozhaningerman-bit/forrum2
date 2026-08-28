import fs from 'node:fs';

const source = fs.readFileSync(
  'apps/web/components/home-dashboard.tsx',
  'utf8',
);

for (const marker of [
  '// FORRUM_HOME_ACTUAL_ACTIVE_COMMUNITIES',
  'const activeCommunities = useMemo(() => {',
  'title="Актуальное"',
  'href="/communities"',
  'activeCommunities.map((community) => (',
  'href={`/communities/${community.slug}`}',
  'title="Новости FORRUM"',
]) {
  if (!source.includes(marker)) {
    throw new Error(`Missing marker: ${marker}`);
  }
}

const actualStart = source.indexOf('title="Актуальное"');
const weeklyStart = source.indexOf('<h2>Участники недели</h2>');

if (actualStart < 0 || weeklyStart <= actualStart) {
  throw new Error('Could not locate Actual boundaries.');
}

const actual = source.slice(actualStart, weeklyStart);

if (actual.includes('discussed.slice(0, 3).map((item) => (')) {
  throw new Error(
    'Actual still duplicates discussed topics.',
  );
}

console.log(
  'Actual Active Communities FIXED: PASS',
);
