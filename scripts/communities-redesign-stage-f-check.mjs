import fs from 'node:fs';

const css = fs.readFileSync('apps/web/app/globals.css', 'utf8');
const client = fs.readFileSync(
  'apps/web/app/communities/communities-client.tsx',
  'utf8',
);
const header = fs.readFileSync(
  'apps/web/components/main-nav.tsx',
  'utf8',
);
const home = fs.readFileSync(
  'apps/web/components/home-dashboard.tsx',
  'utf8',
);

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

requireMarker(
  css,
  'FORRUM_COMMUNITIES_REDESIGN_STAGE_F_V12',
  'Stage F CSS',
);
requireMarker(
  css,
  'grid-template-columns: minmax(0, 1fr) minmax(330px, 30.5%);',
  'desktop catalogue/hierarchy ratio',
);
requireMarker(css, 'min-height: 92px;', 'catalogue row breathing room');
requireMarker(css, 'font-size: 25px;', 'hero heading emphasis');
requireMarker(
  css,
  'border-color: rgba(25, 211, 154, .32);',
  'lighter subscribe control',
);
requireMarker(css, 'color: #7f8d8b;', 'quiet hierarchy arrow');
requireMarker(css, 'min-height: 112px;', 'hierarchy subdivision height');
requireMarker(
  css,
  'background: rgba(25, 211, 154, .075);',
  'lighter system glyph surface',
);
requireMarker(css, '@media (max-width: 980px)', 'narrow desktop protection');
requireMarker(
  css,
  'grid-template-columns: minmax(0, 1fr);',
  'single-column responsive fallback',
);

for (const marker of [
  'communities-v12-desktop-grid',
  'communities-v12-hierarchy-panel',
  'communities-v12-catalogue-row',
  'communities-v12-catalogue-name',
  'communities-v12-subscribe',
  'communities-v12-open-hierarchy',
  'CommunityGlyph',
  'communityHref(item.slug)',
  'setSelectedSlug(item.slug)',
]) {
  requireMarker(client, marker, 'approved Communities structure');
}

for (const marker of [
  'community-browser-main-link',
  'community-browser-hitarea',
  'renderBranch(',
  'CommunityMark',
]) {
  forbidMarker(client, marker, 'retired Communities structure');
}

requireMarker(home, 'home-tree-workshop-section', 'approved homepage remains intact');
requireMarker(
  home,
  'home-discussed-stage-d',
  'approved homepage discussed topics remain intact',
);
requireMarker(
  home,
  'home-new-topics-stage-e',
  'approved homepage new topics remain intact',
);

// Новости -> Услуги is intentionally deferred to the saved post-Communities package.
requireMarker(
  header,
  'Новости',
  'pre-services header intentionally unchanged during Communities polish',
);

console.log(
  'FORRUM Communities Redesign Stage F visual polish contract passed.',
);
