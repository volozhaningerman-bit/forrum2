import { readFileSync } from 'node:fs';

const home = readFileSync('apps/web/components/home-dashboard.tsx', 'utf8');
const css = readFileSync('apps/web/app/globals.css', 'utf8');

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

const treeStart = home.indexOf('function renderTree(');
const treeEnd = home.indexOf('\n  return (\n    <div className="home-board', treeStart);
if (treeStart < 0 || treeEnd < 0) {
  throw new Error('category-tree: renderTree source range not found');
}
const tree = home.slice(treeStart, treeEnd);

requireMarker(home, 'home-rail-panel', 'right rail composition');
requireMarker(home, 'Новое в Мастерской', 'workshop block');
requireMarker(home, 'Новые сообщества', 'communities block');
requireMarker(home, 'home-workshop-entry', 'workshop tree entry');
requireMarker(tree, 'CommunityMark', 'tree system icons');
forbidMarker(tree, 'home-tree-new-count', 'category-tree counter badge');
forbidMarker(tree, 'subscriberCount', 'category-tree subscriber copy');
forbidMarker(tree, 'has-unread', 'category-tree unread marker');
forbidMarker(home, 'home-lower-grid', 'separate lower grid');

requireMarker(css, 'FORRUM_HOME_STAGE_1_HOTFIX_V9_2', 'css hotfix marker');
requireMarker(css, '.publication-detail-topic .publication-detail-header::before', 'duplicate topic title suppression');
requireMarker(css, '[class*="reply-editor"]', 'editor neutralization');

console.log('FORRUM Home Hotfix V9.2.1 contract passed.');
