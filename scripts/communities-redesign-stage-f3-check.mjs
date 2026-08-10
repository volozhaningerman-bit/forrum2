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

for (const marker of [
  'FORRUM_COMMUNITIES_REDESIGN_STAGE_F3_V12_INTERACTION',
  'onClick={(event) => {',
  'target.closest(',
  "'a, button, input, select, textarea'",
  'setSelectedSlug(item.slug);',
  'setSelectedSlug(child.slug);',
  'communities-v12-row-expand-surface',
  'communities-v12-hierarchy-child-expand-surface',
  'communities-v12-catalogue-icon-link',
  'communities-v12-catalogue-name',
  'communities-v12-curator-profile-link',
  'communities-v12-hierarchy-curator-link',
  'href={`/u/${encodeURIComponent(item.curator.username)}`}',
  'communityHref(item.slug)',
  'communityHref(child.slug)',
]) {
  requireMarker(client, marker, 'Stage F.3 interaction');
}

for (const marker of [
  'FORRUM_COMMUNITIES_REDESIGN_STAGE_F3_V12',
  'min-height: 98px;',
  'width: 56px;',
  'font-size: 15px;',
  'min-height: 120px;',
  'width: 54px;',
  'pointer-events: auto;',
]) {
  requireMarker(css, marker, 'Stage F.3 visual and hit-area polish');
}

requireMarker(
  ui,
  'FORRUM_COMMUNITIES_REDESIGN_STAGE_F3_V12_INTERACTION_CONTRACT',
  'Stage F.3 global interaction regression contract',
);

console.log(
  'FORRUM Communities Stage F.3 reliable row clicks, curator links and scale polish passed.',
);
