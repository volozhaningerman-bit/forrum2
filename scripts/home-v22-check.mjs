import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const read = (path) => {
  assert.equal(existsSync(path), true, `Missing required file: ${path}`);
  return readFileSync(path, 'utf8');
};

const dashboard = read('apps/web/components/home-dashboard.tsx');
const layout = read('apps/web/app/layout.tsx');
const css = read('apps/web/app/home-v22.css');
const topics = read('apps/web/components/home/popular-topics-panel.tsx');
const tree = read('apps/web/components/home/community-tree.tsx');
const discovery = read('apps/web/components/home/discovery-panels.tsx');

assert.match(layout, /import '\.\/home-v22\.css';/);
assert.match(dashboard, /forrum-home-v22/);
assert.match(dashboard, /data-home-reference="v22"/);
assert.match(dashboard, /Поделитесь мыслью или задайте вопрос/);
assert.match(dashboard, /После публикации/);

assert.match(css, /@media\s*\(min-width:\s*1280px\)/);
assert.match(css, /body:has\(\.forrum-home-v22\)[\s\S]{0,180}overflow:\s*hidden/);
assert.match(css, /\.forrum-home-v22[\s\S]{0,180}height:\s*100%/);
assert.match(css, /\.forrum-home-v22[\s\S]*?__center[\s\S]{0,180}overflow-y:\s*auto/);
assert.match(css, /@media\s*\(max-width:\s*1279px\)[\s\S]*?overflow:\s*visible/);
assert.match(css, /\.forrum-home-v22[\s\S]*?__panel[\s\S]{0,160}border:\s*0/);
assert.match(css, /box-shadow:/);

assert.match(topics, /TelegramShareButton/);
assert.match(topics, /reactionCount/);
assert.match(topics, /🔥 Горячее/);
assert.match(topics, /Моя лента/);
assert.match(tree, /CommunityMark/);
assert.doesNotMatch(tree, /tree-folder/);
assert.match(discovery, /home-demo-content/);

console.log('Home v22 behavioral and layout contract passed.');
