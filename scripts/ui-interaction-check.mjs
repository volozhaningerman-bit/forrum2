import fs from 'node:fs';

function read(path) {
  return fs.readFileSync(path, 'utf8');
}

function requireMarker(source, marker, label) {
  if (!source.includes(marker)) {
    throw new Error(`${label}: missing ${marker}`);
  }
}

function forbidMarker(source, marker, label) {
  if (source.includes(marker)) {
    throw new Error(`${label}: forbidden ${marker}`);
  }
}

const home = read('apps/web/components/home-dashboard.tsx');
const catalogue = read(
  'apps/web/app/communities/communities-client.tsx',
);
const ranking = read('apps/api/src/feed/ranking.ts');
const feed = read('apps/api/src/feed/feed.service.ts');
const css = read('apps/web/app/globals.css');

for (const marker of [
  'home-tree-link',
  'home-tree-hitarea',
  'home-tree-toggle',
  "event.key === 'ArrowRight'",
  "event.key === 'ArrowLeft'",
  'navigationIcon(community.slug)',
]) {
  requireMarker(home, marker, 'home tree');
}

for (const marker of [
  'community-browser-main-link',
  'community-browser-hitarea',
  'community-browser-chevron',
  "event.key === 'ArrowRight'",
  "event.key === 'ArrowLeft'",
  'navigationIcon(item.slug)',
]) {
  requireMarker(catalogue, marker, 'community catalogue tree');
}

forbidMarker(home, "'unanswered'", 'home feed');
forbidMarker(home, 'Без ответа', 'home feed');
forbidMarker(home, 'Все категории', 'home tree');

requireMarker(
  ranking,
  'recentCommentCount * 160',
  'popular ranking',
);
requireMarker(
  feed,
  'recentCommentSince',
  'recent comment query',
);
requireMarker(
  feed,
  'recentCommentCount: publication.comments.length',
  'recent comment result',
);

for (const marker of [
  'FORRUM_CANONICAL_INTERFACE_V8',
  '.home-tree-hitarea',
  '.community-browser-hitarea',
  '.home-topic-visual',
  '.publication-preview',
]) {
  requireMarker(css, marker, 'canonical CSS');
}

const obsoleteWorkflows = [
  '.github/workflows/forrum-ssr-routes-qa-v6-1.yml',
  '.github/workflows/forrum-ssr-routes-qa-v6-3.yml',
  '.github/workflows/forrum-final-monochrome-v7.yml',
  '.github/workflows/forrum-final-monochrome-v7-1.yml',
  '.github/workflows/forrum-final-monochrome-v7-2.yml',
];

for (const path of obsoleteWorkflows) {
  if (fs.existsSync(path)) {
    throw new Error(`obsolete workflow remains: ${path}`);
  }
}

console.log(
  'V8 interaction contract passed: independent links, toggle zones, keyboard control and popular ranking.',
);
