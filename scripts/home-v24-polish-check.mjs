import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const read = (path) => {
  assert.equal(existsSync(path), true, `Missing required file: ${path}`);
  return readFileSync(path, 'utf8');
};

const dashboard = read('apps/web/components/home-dashboard.tsx');
const layout = read('apps/web/app/layout.tsx');
const css = read('apps/web/app/home-v24.css');
const tree = read('apps/web/components/home/community-tree.tsx');
const topics = read('apps/web/components/home/popular-topics-panel.tsx');
const header = read('apps/web/components/site-header.tsx');

assert.match(layout, /import '\.\/home-v24\.css';/);
assert.match(dashboard, /forrum-home-v24/);
assert.match(dashboard, /data-home-reference="v24"/);
assert.match(dashboard, /WeeklyPulsePanel/);
assert.doesNotMatch(dashboard, /ForumStatsPanel/);

assert.match(css, /\.forrum-home-v24 \.forrum-home-v16__center[\s\S]{0,180}grid-template-rows:\s*none/);
assert.match(css, /\.forrum-home-v24 \.forrum-home-v18__discovery-grid[\s\S]{0,180}align-items:\s*stretch/);
assert.match(css, /\.forrum-home-v24 \.forrum-home-v18__discovery-grid\s*>\s*\.forrum-home-v16__panel[\s\S]{0,160}height:\s*auto/);
assert.doesNotMatch(css, /\.forrum-home-v24[\s\S]{0,120}tree-children::before[\s\S]{0,120}display:\s*block/);
assert.match(css, /tree-children\s*>\s*\.forrum-home-v16__tree-node::before/);
assert.match(css, /telegram-share-trigger\.compact\.endcap[\s\S]{0,220}height:\s*52px/);
assert.doesNotMatch(css, /telegram-share-trigger\.compact\.endcap[\s\S]{0,220}calc\(100%/);
assert.match(css, /@media\s*\(max-width:\s*767px\)[\s\S]*?topic-metrics[\s\S]{0,180}grid-column:\s*1\s*!important/);

assert.match(tree, /data-community-depth=/);
assert.match(tree, /isOpen \? '⌄' : '›'/);
assert.match(topics, /forrum-home-v24__topic-actions/);
assert.match(header, /brand-wordmark--v24/);

console.log('Home v24 polish contract passed.');
