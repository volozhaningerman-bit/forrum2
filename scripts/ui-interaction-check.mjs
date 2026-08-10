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
  'home-tree-name-link',
  'home-tree-expand-surface',
  'home-tree-reference-chevron',
  "event.key === 'ArrowRight'",
  "event.key === 'ArrowLeft'",
  'CategoryTreeIcon',
]) {
  requireMarker(home, marker, 'home tree');
}

// FORRUM_COMMUNITIES_REDESIGN_STAGE_E_V12_INTERACTION_CONTRACT
for (const marker of [
  'communities-v12-catalogue-name',
  'communities-v12-catalogue-icon-link',
  'communities-v12-subscribe',
  'communities-v12-open-hierarchy',
  'roots.map((root) =>',
  'renderCatalogueRow(root)',
  'setSelectedSlug(item.slug)',
  'CommunityGlyph',
  'communityHref(item.slug)',
  'communities-v12-hierarchy-panel',
  'communities-v12-hierarchy-child-arrow',
  'hierarchyTrail(selectedItem)',
]) {
  requireMarker(catalogue, marker, 'community catalogue and hierarchy');
}
for (const marker of [
  'community-browser-main-link',
  'community-browser-hitarea',
  'community-browser-chevron',
  'renderBranch(',
  'CommunityMark',
  'navigationIcon(item.slug)',
]) {
  forbidMarker(catalogue, marker, 'retired community catalogue tree');
}
// FORRUM_HOME_REDESIGN_STAGE_D_V11_INTERACTION_CONTRACT
requireMarker(home, 'home-discussed-stage-d', 'home discussed topics');
requireMarker(home, 'Обсуждаемые темы', 'home discussed topics');
requireMarker(home, 'home-reference-topic-row', 'home discussed topics');
requireMarker(home, 'Показать больше тем', 'home discussed topics');
forbidMarker(home, 'home-feed-toolbar', 'legacy home feed');
forbidMarker(home, 'home-feed-tabs', 'legacy home feed');
// FORRUM_HOME_REDESIGN_STAGE_C_V11_INTERACTION_CONTRACT
forbidMarker(home, 'Все категории', 'home tree');
forbidMarker(home, 'home-tree-all-link', 'home tree');
requireMarker(home, 'home-tree-panel-toggle', 'home tree');
requireMarker(home, 'home-tree-collapsed-list', 'home tree');
requireMarker(home, 'home-tree-icon-link', 'home tree');

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
  '.home-tree-expand-surface',
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

// FORRUM_HOME_REDESIGN_STAGE_F_V11_INTERACTION_CONTRACT
requireMarker(home, 'home-right-stage-f', 'home right rail');
requireMarker(home, 'home-news-stage-f', 'home news rail');
requireMarker(home, 'home-participation-stage-f', 'home participation rail');
forbidMarker(home, 'Новое в Мастерской', 'legacy workshop rail');
forbidMarker(home, 'Новые сообщества', 'legacy communities rail');

// FORRUM_COMMUNITIES_REDESIGN_STAGE_F2_V12_INTERACTION_CONTRACT
for (const marker of [
  'communities-v12-row-expand-surface',
  'communities-v12-catalogue-icon-link',
  'communities-v12-catalogue-name',
  'communities-v12-hierarchy-child-expand-surface',
  'communities-v12-hierarchy-child-icon-link',
  'communities-v12-hierarchy-child-name',
]) {
  requireMarker(
    catalogue,
    marker,
    'community tree-parity interaction',
  );
}
