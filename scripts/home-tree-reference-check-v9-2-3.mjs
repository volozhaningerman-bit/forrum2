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

requireMarker(home, 'function CategoryTreeIcon', 'plain category icons');
requireMarker(home, 'home-tree-expand-surface', 'single row expansion surface');
requireMarker(home, 'home-tree-reference-icon', 'reference tree icon slot');
requireMarker(home, 'home-tree-reference-chevron', 'reference tree chevron');
requireMarker(home, 'className="home-tree-name-link"', 'name-only navigation link');
requireMarker(home, 'href={`/communities/${community.slug}`}', 'category destination');
requireMarker(home, 'onClick={toggleCurrent}', 'row expansion action');

forbidMarker(home, 'home-tree-icon-toggle', 'separate icon hover button');
forbidMarker(home, 'home-tree-hitarea', 'separate blank hover area');
forbidMarker(home, 'home-tree-toggle', 'separate chevron hover button');
forbidMarker(home, 'navigationIcon(', 'boxed asset icon mapping');
forbidMarker(home, '<CommunityMark', 'boxed community mark in tree');

requireMarker(css, 'FORRUM_HOME_TREE_REFERENCE_V9_2_3', 'reference CSS marker');
requireMarker(css, 'background: transparent !important;', 'transparent row states');
requireMarker(css, 'text-decoration: none !important;', 'no hover underline');
requireMarker(css, '.home-tree-children', 'nested hierarchy guide');
requireMarker(css, '.home-tree-reference-icon svg', 'plain line icon styling');

console.log('FORRUM tree reference V9.2.3 contract passed.');
