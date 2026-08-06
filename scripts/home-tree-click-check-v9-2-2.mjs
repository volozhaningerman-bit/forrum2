import { readFileSync } from 'node:fs';

const home = readFileSync('apps/web/components/home-dashboard.tsx', 'utf8');
const css = readFileSync('apps/web/app/globals.css', 'utf8');

function requireMarker(source, marker, label) {
  if (!source.includes(marker)) {
    throw new Error(`${label}: missing ${marker}`);
  }
}

requireMarker(home, 'home-tree-icon-toggle', 'tree icon expand control');
requireMarker(home, 'home-tree-icon-static', 'tree leaf icon');
requireMarker(home, 'home-tree-link home-tree-name-link', 'name-only navigation link');
requireMarker(home, 'home-tree-hitarea', 'blank expand area');
requireMarker(home, 'home-tree-toggle', 'chevron expand control');
requireMarker(css, 'FORRUM_HOME_TREE_CLICK_V9_2_2', 'tree click CSS contract');

const nameLink = home.match(
  /<Link\s+[\s\S]*?className="home-tree-link home-tree-name-link"[\s\S]*?<\/Link>/,
)?.[0];

if (!nameLink) {
  throw new Error('name-only navigation link block was not found');
}

if (nameLink.includes('CommunityMark')) {
  throw new Error('category icon must not be inside the navigation link');
}

if (!nameLink.includes('<strong>{community.name}</strong>')) {
  throw new Error('category name is missing from the navigation link');
}

const iconToggle = home.match(
  /<button\s+[\s\S]*?className="home-tree-icon-toggle"[\s\S]*?<\/button>/,
)?.[0];

if (!iconToggle?.includes('CommunityMark') || !iconToggle.includes('onClick={toggleCurrent}')) {
  throw new Error('category icon must expand or collapse the branch');
}

console.log('FORRUM tree click behavior V9.2.2 contract passed.');
