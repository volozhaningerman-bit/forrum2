import fs from 'node:fs';

const client = fs.readFileSync(
  'apps/web/app/communities/communities-client.tsx',
  'utf8',
);
const css = fs.readFileSync(
  'apps/web/app/globals.css',
  'utf8',
);
const stageE = fs.readFileSync(
  'scripts/communities-redesign-stage-e-check.mjs',
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
  client,
  'useState<string | null>(null)',
  'F.5 empty initial hierarchy state',
);
forbidMarker(
  client,
  "useState<string | null>('internet-projects')",
  'F.5 obsolete automatic selection',
);

for (const marker of [
  'communities-v12-hierarchy-placeholder',
  'Выберите сообщество',
  'communities-v12-subscribe',
  'void changeSubscription(item, event)',
  'communities-v12-open-hierarchy',
  'communities-v12-hierarchy-child-arrow',
  'setSelectedSlug(item.slug);',
  'setSelectedSlug(child.slug);',
]) {
  requireMarker(client, marker, 'F.5 interaction');
}

for (const marker of [
  'FORRUM_COMMUNITIES_REDESIGN_STAGE_F5_V12',
  '> .communities-v12-subscribe {',
  'z-index: 5;',
  'pointer-events: auto;',
  '> .communities-v12-open-hierarchy,',
  '> .communities-v12-hierarchy-child-arrow {',
  'cursor: pointer;',
]) {
  requireMarker(css, marker, 'F.5 CSS');
}

requireMarker(
  stageE,
  'FORRUM_COMMUNITIES_REDESIGN_STAGE_F5_INITIAL_SELECTION_CONTRACT',
  'evolved Stage E contract marker',
);
requireMarker(
  stageE,
  "'useState<string | null>(null)'",
  'evolved Stage E initial state',
);
forbidMarker(
  stageE,
  '"useState<string | null>(\'internet-projects\')"',
  'obsolete Stage E initial state',
);

console.log(
  'FORRUM Communities F.5.1 contract passed: empty initial state, subscribe action and chevron cursor.',
);
