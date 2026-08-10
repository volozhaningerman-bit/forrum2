import fs from 'node:fs';

const client = fs.readFileSync(
  'apps/web/app/communities/communities-client.tsx',
  'utf8',
);
const css = fs.readFileSync(
  'apps/web/app/globals.css',
  'utf8',
);
const ui = fs.readFileSync(
  'scripts/ui-interaction-check.mjs',
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

for (const marker of [
  'communities-v12-row-expand-surface',
  'communities-v12-catalogue-icon-link',
  'communities-v12-catalogue-name',
  'communities-v12-hierarchy-child-expand-surface',
  'communities-v12-hierarchy-child-icon-link',
  'communities-v12-hierarchy-child-name',
  'onClick={() => setSelectedSlug(item.slug)}',
  'setSelectedSlug(child.slug)',
]) {
  requireMarker(client, marker, 'tree-parity interaction');
}

requireMarker(
  client,
  'href={communityHref(item.slug)}',
  'root community navigation',
);
requireMarker(
  client,
  'href={communityHref(child.slug)}',
  'child community navigation',
);
requireMarker(
  css,
  'FORRUM_COMMUNITIES_REDESIGN_STAGE_F2_V12',
  'Stage F.2 CSS',
);
requireMarker(
  css,
  'pointer-events: none;',
  'background hit-area routing',
);
requireMarker(
  css,
  'pointer-events: auto;',
  'independent navigation targets',
);
requireMarker(
  ui,
  'FORRUM_COMMUNITIES_REDESIGN_STAGE_F2_V12_INTERACTION_CONTRACT',
  'global interaction regression contract',
);

forbidMarker(
  client,
  'className="communities-v12-hierarchy-child-main"\n                          href=',
  'whole child card must not be a navigation link',
);

console.log(
  'FORRUM Communities Stage F.2 category-tree interaction parity passed.',
);
