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

requireMarker(client, 'communities-v12-hero', 'approved Stage B hero');
requireMarker(client, 'communities-v12-tools', 'Stage C toolbar');
requireMarker(client, 'communities-v12-search', 'Stage C local search');
requireMarker(client, 'placeholder="Найти сообщество или раздел..."', 'approved search placeholder');
requireMarker(client, "type Sort = 'default' | 'subscribers' | 'name';", 'approved sort modes');
requireMarker(client, "useState<Sort>('default')", 'default sort state');
requireMarker(client, '<option value="default">', 'default sort option');
requireMarker(client, 'По умолчанию', 'default sort label');
requireMarker(client, 'По подписчикам', 'subscriber sort');
requireMarker(client, 'По названию', 'name sort');
requireMarker(client, 'canonicalRootOrder', 'canonical root order');

forbidMarker(client, 'type Scope =', 'removed legacy scope type');
forbidMarker(client, 'setScope(', 'removed legacy scope state');
forbidMarker(client, 'Показывать', 'removed scope UI');
forbidMarker(client, 'Только мои подписки', 'removed subscribed-only UI');
forbidMarker(client, 'По активности', 'removed activity sort');
forbidMarker(client, 'className="compact-filterbar"', 'removed legacy filterbar');
forbidMarker(client, 'communities-v12-hierarchy-panel', 'future hierarchy panel stage');

requireMarker(css, 'FORRUM_COMMUNITIES_REDESIGN_STAGE_C_V12', 'Stage C CSS');
requireMarker(css, '.communities-v12-stage-a .communities-v12-tools', 'Stage C toolbar CSS');

requireMarker(home, 'home-discussed-stage-d', 'approved homepage discussed table');
requireMarker(home, 'home-new-topics-stage-e', 'approved homepage new topics table');
requireMarker(home, 'home-right-stage-f', 'approved homepage right rail');

console.log('FORRUM Communities Redesign Stage C contract passed.');
