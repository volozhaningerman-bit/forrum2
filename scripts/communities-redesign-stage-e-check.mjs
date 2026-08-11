import fs from 'node:fs';

const client = fs.readFileSync(
  'apps/web/app/communities/communities-client.tsx',
  'utf8',
);
const css = fs.readFileSync(
  'apps/web/app/globals.css',
  'utf8',
);
const seed = fs.readFileSync(
  'apps/api/prisma/seed.ts',
  'utf8',
);
const home = fs.readFileSync(
  'apps/web/components/home-dashboard.tsx',
  'utf8',
);
const ui = fs.readFileSync(
  'scripts/ui-interaction-check.mjs',
  'utf8',
);
const nav = fs.readFileSync(
  'apps/web/components/main-nav.tsx',
  'utf8',
);
const footer = fs.readFileSync(
  'apps/web/components/site-footer.tsx',
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

// FORRUM_COMMUNITIES_REDESIGN_STAGE_F5_INITIAL_SELECTION_CONTRACT
for (const marker of [
  'communities-v12-hero',
  'communities-v12-tools',
  'communities-v12-catalogue',
  'communities-v12-desktop-grid',
  'communities-v12-hierarchy-panel',
  'communities-v12-hierarchy-identity',
  'communities-v12-hierarchy-child',
  'communities-v12-hierarchy-child-arrow',
  'useState<string | null>(null)',
  'selectedRootSlug',
  'hierarchyTrail(item: Community)',
  'CommunityGlyph',
  'communityHref(slug: string)',
  "workshop: '/workshop'",
  "'workshop-projects': '/workshop?section=projects'",
  "'workshop-solutions': '/workshop?section=solutions'",
  "'workshop-teams': '/workshop?section=teams'",
]) {
  requireMarker(client, marker, 'approved Stage E Communities');
}

for (const marker of [
  'CommunityMark',
  'navigationIcons',
  'navigationIcon(item.slug)',
  'community-browser-main-link',
  'renderBranch(',
]) {
  forbidMarker(client, marker, 'retired Communities implementation');
}

requireMarker(
  css,
  'FORRUM_COMMUNITIES_REDESIGN_STAGE_E_V12',
  'Stage E CSS',
);
requireMarker(
  css,
  'grid-template-columns: minmax(0, 1fr) minmax(300px, 29%);',
  'approved desktop ratio',
);
requireMarker(
  css,
  '.communities-v12-stage-a .communities-v12-hierarchy-panel',
  'sticky hierarchy selector',
);
requireMarker(
  css,
  'position: sticky;',
  'sticky hierarchy behavior',
);
requireMarker(
  css,
  '.communities-v12-stage-a .communities-v12-glyph[data-tone="workshop"]',
  'Workshop system icon tone',
);
requireMarker(
  css,
  '.communities-v12-stage-a .communities-v12-glyph[data-tone="telegram"]',
  'Telegram system icon tone',
);

requireMarker(
  seed,
  'FORRUM_COMMUNITIES_STAGE_E_WORKSHOP_ROOT',
  'Workshop taxonomy root',
);
requireMarker(
  seed,
  "slug: 'workshop'",
  'Workshop root slug',
);
requireMarker(
  seed,
  'FORRUM_COMMUNITIES_STAGE_E_WORKSHOP_CHILDREN',
  'Workshop taxonomy children',
);
for (const marker of [
  "slug: 'workshop-projects'",
  "slug: 'workshop-solutions'",
  "slug: 'workshop-teams'",
]) {
  requireMarker(seed, marker, 'Workshop child');
}

const workshopIndex = seed.indexOf("slug: 'workshop'");
const internetIndex = seed.indexOf("slug: 'internet-projects'");
if (workshopIndex < 0 || internetIndex < 0 || workshopIndex > internetIndex) {
  throw new Error(
    'Workshop must be seeded before Internet Projects in the root catalogue',
  );
}

requireMarker(
  home,
  "community.slug !== 'workshop'",
  'homepage duplicate Workshop protection',
);
requireMarker(
  home,
  'home-tree-workshop-section',
  'approved homepage Workshop remains',
);
requireMarker(
  home,
  'home-discussed-stage-d',
  'approved homepage discussed table',
);
requireMarker(
  home,
  'home-new-topics-stage-e',
  'approved homepage new topics table',
);
requireMarker(
  home,
  'home-right-stage-f',
  'approved homepage right rail',
);

requireMarker(
  ui,
  'FORRUM_COMMUNITIES_REDESIGN_STAGE_E_V12_INTERACTION_CONTRACT',
  'Stage E global interaction contract',
);

const stageDCheck = fs.readFileSync(
  'scripts/communities-redesign-stage-d-check.mjs',
  'utf8',
);
requireMarker(
  stageDCheck,
  "'roots.map((root) =>'",
  'Stage D evolved root-only map contract',
);
requireMarker(
  stageDCheck,
  "'renderCatalogueRow(root)'",
  'Stage D evolved root-only renderer contract',
);
forbidMarker(
  stageDCheck,
  "'roots.map((root) => renderCatalogueRow(root))'",
  'obsolete Stage D single-line renderer assertion',
);

requireMarker(
  nav,
  'FORRUM_GLOBAL_HEADER_V13_4',
  'approved global header mode',
);
requireMarker(
  footer,
  "const hideFooter = pathname === '/communities';",
  'no Communities footer',
);

console.log(
  'FORRUM Communities Redesign Stage E final reference contract passed.',
);
