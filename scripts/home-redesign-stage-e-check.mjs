import fs from 'node:fs';

const home = fs.readFileSync('apps/web/components/home-dashboard.tsx', 'utf8');
const page = fs.readFileSync('apps/web/app/page.tsx', 'utf8');
const css = fs.readFileSync('apps/web/app/globals.css', 'utf8');
const feed = fs.readFileSync('apps/api/src/feed/feed.service.ts', 'utf8');

function requireMarker(source, marker, label) {
  if (!source.includes(marker)) throw new Error(`${label}: missing ${marker}`);
}
function forbidMarker(source, marker, label) {
  if (source.includes(marker)) throw new Error(`${label}: forbidden ${marker}`);
}

requireMarker(home, 'home-new-topics-stage-e', 'Stage E center marker');
requireMarker(home, 'home-new-topics-table', 'new topics table');
requireMarker(home, 'Новые темы', 'new topics heading');
requireMarker(home, 'newFeed.slice(0, 5)', 'new topics row limit');
requireMarker(home, "api<PublicationCardData[]>('/feed?mode=new')", 'client new feed');
requireMarker(page, "'/feed?mode=popular'", 'discussed feed remains');
requireMarker(page, "'/feed?mode=new'", 'server new feed');
requireMarker(page, 'newFeed,', 'new feed initial data');
requireMarker(css, 'FORRUM_HOME_REDESIGN_STAGE_E_V11', 'Stage E CSS');
requireMarker(feed, 'FORRUM_DISCUSSED_TOPICS_24H_V11', 'Stage D 24h ranking remains');

forbidMarker(home, 'Лента обсуждений', 'legacy center heading');
forbidMarker(home, 'home-feed-tabs', 'legacy center tabs');
forbidMarker(home, 'home-feed-toolbar', 'legacy center toolbar');

console.log('FORRUM Home Redesign Stage E contract passed.');
