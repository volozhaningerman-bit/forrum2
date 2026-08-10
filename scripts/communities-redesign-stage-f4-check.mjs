import fs from 'node:fs';

const client = fs.readFileSync(
  'apps/web/app/communities/communities-client.tsx',
  'utf8',
);
const css = fs.readFileSync(
  'apps/web/app/globals.css',
  'utf8',
);

function requireMarker(source, marker, label) {
  if (!source.includes(marker)) {
    throw new Error(`${label}: missing ${marker}`);
  }
}

for (const marker of [
  'FORRUM_COMMUNITIES_REDESIGN_STAGE_F3_V12_INTERACTION',
  'communities-v12-row-expand-surface',
  'communities-v12-hierarchy-child-expand-surface',
  'communities-v12-curator-profile-link',
  'communities-v12-hierarchy-curator-link',
  'href={`/u/${encodeURIComponent(item.curator.username)}`}',
  "target.closest(",
  "'a, button, input, select, textarea'",
  'setSelectedSlug(item.slug);',
  'setSelectedSlug(child.slug);',
]) {
  requireMarker(client, marker, 'Stage F.4 interaction baseline');
}

for (const marker of [
  'FORRUM_COMMUNITIES_REDESIGN_STAGE_F4_V12',
  '.communities-v12-stage-a .communities-v12-catalogue-curator {',
  'pointer-events: auto;',
  'cursor: default;',
  'cursor: pointer;',
  '.communities-v12-stage-a .communities-v12-curator-profile-link,',
  '.communities-v12-stage-a .communities-v12-row-expand-surface,',
]) {
  requireMarker(css, marker, 'Stage F.4 cursor and curator fix');
}

console.log(
  'FORRUM Communities Stage F.4 curator link and honest cursor contract passed.',
);
