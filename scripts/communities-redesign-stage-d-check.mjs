import fs from 'node:fs';

const client = fs.readFileSync('apps/web/app/communities/communities-client.tsx', 'utf8');
const css = fs.readFileSync('apps/web/app/globals.css', 'utf8');
const home = fs.readFileSync('apps/web/components/home-dashboard.tsx', 'utf8');

function requireMarker(source, marker, label) {
  if (!source.includes(marker)) throw new Error(`${label}: missing ${marker}`);
}
function forbidMarker(source, marker, label) {
  if (source.includes(marker)) throw new Error(`${label}: forbidden ${marker}`);
}

requireMarker(client, 'communities-v12-tools', 'approved Stage C tools');
requireMarker(client, 'communities-v12-catalogue', 'Stage D catalogue');
requireMarker(client, 'communities-v12-catalogue-head', 'Stage D column header');
requireMarker(client, '<span>Сообщество</span>', 'community column');
requireMarker(client, '<span>Куратор</span>', 'curator column');
requireMarker(client, '<span>Подписчики</span>', 'subscriber column');
requireMarker(client, 'renderCatalogueRow', 'root catalogue renderer');
requireMarker(
  client,
  'roots.map((root) =>',
  'root-only catalogue map',
);
requireMarker(
  client,
  'renderCatalogueRow(root)',
  'root-only catalogue renderer',
);
requireMarker(client, 'communities-v12-catalogue-name', 'separate title link');
requireMarker(client, 'communities-v12-subscribe', 'separate subscription control');
requireMarker(client, 'communities-v12-open-hierarchy', 'separate hierarchy arrow');
requireMarker(client, 'setSelectedSlug(item.slug)', 'catalogue selection');
requireMarker(client, 'avatarUrl?: string | null;', 'curator avatar support');
requireMarker(client, 'item.curator.avatarUrl', 'curator avatar render');

forbidMarker(client, 'roots.map((root) => renderBranch(root))', 'legacy recursive catalogue render');
forbidMarker(client, 'className="community-browser-index"', 'obsolete left index DOM');

requireMarker(css, 'FORRUM_COMMUNITIES_REDESIGN_STAGE_D_V12', 'Stage D CSS');
requireMarker(css, '.communities-v12-stage-a .communities-v12-catalogue-row', 'Stage D row CSS');
requireMarker(css, '.communities-v12-stage-a .communities-v12-catalogue-row.selected', 'selected row CSS');

requireMarker(home, 'home-discussed-stage-d', 'approved homepage discussed table');
requireMarker(home, 'home-new-topics-stage-e', 'approved homepage new topics table');
requireMarker(home, 'home-right-stage-f', 'approved homepage right rail');

console.log('FORRUM Communities Redesign Stage D contract passed.');
