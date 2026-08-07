import fs from 'node:fs';

const home = fs.readFileSync('apps/web/components/home-dashboard.tsx', 'utf8');
const page = fs.readFileSync('apps/web/app/page.tsx', 'utf8');
const feed = fs.readFileSync('apps/api/src/feed/feed.service.ts', 'utf8');
const css = fs.readFileSync('apps/web/app/globals.css', 'utf8');
const interaction = fs.readFileSync('scripts/ui-interaction-check.mjs', 'utf8');

function requireMarker(source, marker, label) {
  if (!source.includes(marker)) throw new Error(`${label}: missing ${marker}`);
}
function forbidMarker(source, marker, label) {
  if (source.includes(marker)) throw new Error(`${label}: forbidden ${marker}`);
}

requireMarker(home, 'home-discussed-stage-d', 'Stage D center');
requireMarker(home, 'Обсуждаемые темы', 'Stage D table heading');
requireMarker(home, 'home-reference-topic-row', 'Stage D topic rows');
requireMarker(home, 'Показать больше тем', 'Stage D thin footer');
forbidMarker(home, 'Лента обсуждений', 'legacy feed UI');
forbidMarker(home, 'home-feed-toolbar', 'legacy feed toolbar');
forbidMarker(home, 'home-feed-tabs', 'legacy feed tabs');
forbidMarker(home, 'Создать тему', 'legacy create action on home center');
forbidMarker(home, 'Фильтры', 'legacy filters on home center');

requireMarker(page, '/feed?mode=popular', 'home initial discussed data');
forbidMarker(page, '/feed?mode=new', 'legacy home initial feed');

requireMarker(feed, 'FORRUM_DISCUSSSED_TOPICS_24H_V11', '24h discussed semantics');
requireMarker(feed, "format: 'TOPIC'", 'popular topics-only filter');
requireMarker(feed, 'recentCommentSince', '24h activity window');
requireMarker(feed, 'publication.comments.length', '24h ranking count');

requireMarker(css, 'FORRUM_HOME_REDESIGN_STAGE_D_V11', 'Stage D CSS');
requireMarker(css, 'background: rgba(25, 211, 154, .085)', 'approved green table header');

requireMarker(interaction, 'FORRUM_HOME_REDESIGN_STAGE_D_V11_INTERACTION_CONTRACT', 'interaction contract');
forbidMarker(interaction, "requireMarker(home, \"'unanswered'\"", 'obsolete V9 feed contract');
forbidMarker(interaction, "requireMarker(home, 'Без ответа'", 'obsolete V9 tab contract');

console.log('FORRUM Home Redesign Stage D contract passed.');
