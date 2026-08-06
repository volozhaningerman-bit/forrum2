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

requireMarker(home, 'FORRUM_HOME_TREE_REFERENCE_V9_2_4', 'source marker');
requireMarker(home, 'workshopNavigation', 'Workshop child navigation');
requireMarker(home, 'home-workshop-expand-surface', 'Workshop expansion surface');
requireMarker(home, 'home-workshop-name-link', 'Workshop name-only link');
requireMarker(home, 'home-workshop-children', 'Workshop hierarchy');
requireMarker(home, 'home-tree-expand-surface', 'category expansion surface');
requireMarker(home, 'home-tree-name-link', 'category name-only link');
requireMarker(home, 'function CategoryTreeIcon', 'consistent system icons');
forbidMarker(home, 'home-workshop-entry', 'old Workshop direct-link row');
forbidMarker(home, '<CommunityMark', 'boxed category marks');

requireMarker(css, 'FORRUM_HOME_TREE_REFERENCE_V9_2_4', 'CSS marker');
requireMarker(css, 'grid-template-columns: 264px minmax(0, 1fr) 320px', 'wider tree column');
requireMarker(css, 'font-weight: 600;', 'restrained root typography');
requireMarker(css, 'font-weight: 450;', 'lighter child typography');
requireMarker(css, '.home-tree-row.active::after', 'compact active marker');
requireMarker(css, '.home-tree-children .home-tree-row::before', 'L-shaped hierarchy guides');
requireMarker(css, '.home-workshop-node.opened .home-workshop-chevron', 'Workshop chevron state');
requireMarker(css, 'vector-effect: non-scaling-stroke;', 'consistent icon strokes');
requireMarker(css, 'background: transparent !important;', 'no card-like row hover');
forbidMarker(css, 'FORRUM_HOME_TREE_REFERENCE_V9_2_3', 'obsolete V9.2.3 CSS block');

console.log('FORRUM Tree Reference V9.2.4 contract passed.');
