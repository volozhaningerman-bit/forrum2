import { readFileSync } from 'node:fs';

const css = readFileSync('apps/web/app/globals.css', 'utf8');
const home = readFileSync('apps/web/components/home-dashboard.tsx', 'utf8');
const header = readFileSync('apps/web/components/site-header.tsx', 'utf8');

const start = '/* FORRUM_HOME_REDESIGN_STAGE_A_V11';
const end = '/* /FORRUM_HOME_REDESIGN_STAGE_A_V11 */';

if (!css.includes(start) || !css.includes(end)) {
  throw new Error('Stage A CSS markers are missing');
}

const stage = css.split(start, 2)[1].split(end, 1)[0];
const stageWithoutComments = stage.replace(/\/\*[\s\S]*?\*\//g, '');

for (const marker of [
  '--forrum-home-bg: #091215',
  '--forrum-home-surface: #0f191c',
  '--forrum-home-text: #f1f5f4',
  '--forrum-home-accent: #19d39a',
  'body:has(.home-stage-one)',
  '.home-stage-one .home-community-tree',
  '.home-stage-one .home-topic-row',
  '.home-stage-one .home-current-item',
]) {
  if (!stage.includes(marker)) {
    throw new Error(`Stage A contract: missing ${marker}`);
  }
}

for (const forbidden of [
  'linear-gradient',
  'radial-gradient',
  'backdrop-filter',
  'filter: blur',
  'text-shadow',
]) {
  if (stageWithoutComments.includes(forbidden)) {
    throw new Error(`Stage A anti-AI contract: forbidden ${forbidden}`);
  }
}

// Only reject real unscoped header/navigation selectors. Mentions inside comments are harmless.
const forbiddenGlobalSelectors = [
  /(^|[},\n]\s*)\.header\s*\{/m,
  /(^|[},\n]\s*)\.main-links(?:\s|[:.{,#>+~[])/m,
];
if (forbiddenGlobalSelectors.some((pattern) => pattern.test(stageWithoutComments))) {
  throw new Error('Stage A must not redesign the global header');
}

for (const marker of [
  'home-tree-name-link',
  'home-tree-expand-surface',
  'home-workshop-name-link',
  'home-workshop-expand-surface',
]) {
  if (!home.includes(marker)) {
    throw new Error(`Existing tree behaviour marker disappeared: ${marker}`);
  }
}

if (!header.includes('<MainNav />') || !header.includes('<NavCounters />')) {
  throw new Error('Header baseline changed unexpectedly');
}

console.log('FORRUM Home Redesign Stage A V11.A.1 contract passed.');
