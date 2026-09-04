import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

function read(path) {
  assert.equal(existsSync(path), true, `Missing required file: ${path}`);
  return readFileSync(path, 'utf8');
}

const layout = read('apps/web/app/layout.tsx');
const page = read('apps/web/app/page.tsx');
const dashboard = read('apps/web/components/home-dashboard.tsx');
const css = read('apps/web/app/home-v23.css');
const topics = read('apps/web/components/home/popular-topics-panel.tsx');
const reactions = read('apps/web/components/home/topic-reactions.tsx');
const share = read('apps/web/components/telegram-share-button.tsx');
const weekly = read('apps/web/components/home/weekly-members-panel.tsx');
const tree = read('apps/web/components/home/community-tree.tsx');
const header = read('apps/web/components/site-header.tsx');

assert.match(layout, /import '\.\/home-v23\.css';/);
assert.match(dashboard, /forrum-home-v23/);
assert.match(dashboard, /data-home-reference="v2[34]"/);
assert.doesNotMatch(dashboard, /ActivityPanel/);
assert.doesNotMatch(dashboard, /activityFeed/);
assert.doesNotMatch(page, /activityFeed/);
assert.doesNotMatch(page, /\/feed\?mode=all/);

const weeklyIndex = dashboard.indexOf('<WeeklyMembersPanel');
const newsIndex = dashboard.indexOf('<ForrumNewsPanel');
const pulseIndex = dashboard.indexOf('<WeeklyPulsePanel');
assert.equal(weeklyIndex >= 0, true);
assert.equal(newsIndex > weeklyIndex, true);
assert.equal(pulseIndex > newsIndex, true);

assert.match(
  css,
  /body:has\(\.forrum-home-v23\)[\s\S]{0,180}overflow-y:\s*auto/,
);
assert.match(
  css,
  /\.forrum-home-v23\.forrum-home-v16[\s\S]{0,180}height:\s*auto/,
);
assert.match(
  css,
  /\.forrum-home-v23 \.forrum-home-v16__tree,[\s\S]{0,220}overflow:\s*visible/,
);
assert.doesNotMatch(
  css,
  /\.forrum-home-v23 \.forrum-home-v16__(?:tree|center|rail)[\s\S]{0,160}overflow-y:\s*auto/,
);
assert.match(css, /border-radius:\s*6px/);
assert.match(css, /--v23-shadow-contact/);
assert.match(css, /--v23-shadow-cast/);
assert.match(topics, /🔥 Тренд/);
assert.match(topics, /TopicReactions/);
assert.match(topics, /variant="endcap"/);
assert.match(reactions, /\/publications\/\$\{slug\}\/reaction/);
assert.match(reactions, /'LIKE'/);
assert.match(reactions, /'FIRE'/);
assert.match(reactions, /'USEFUL'/);
assert.match(share, /variant === 'endcap'/);
assert.match(weekly, /\.slice\(0, 3\)/);
assert.match(weekly, /forrum-home-v23__weekly-card/);
assert.match(tree, /communityToneIndex\(node\.slug\)/);
assert.match(header, /brand-wordmark--v23/);
assert.match(header, /<strong>4<\/strong><span>RRUM<\/span>/);

console.log('Home V23 natural-flow and island contract passed.');
