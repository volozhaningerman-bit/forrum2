
import fs from 'node:fs';

const page = fs.readFileSync(
  'apps/web/app/communities/[slug]/category-page.tsx',
  'utf8',
);
const css = fs.readFileSync(
  'apps/web/app/globals.css',
  'utf8',
);

function requireMarker(source, marker, label) {
  if (!source.includes(marker)) {
    throw new Error(`${label}: missing ${marker}`);
  }
}

for (const marker of [
  'FORRUM_SECTION_PAGE_POLISH_V14_8',
  'FORRUM_SECTION_PAGE_NAVIGATION_V14_10',
  'FORRUM_SECTION_TREE_HIT_AREA_V14_11',
  'FORRUM_SECTION_TREE_HIT_AREA_V14_12',
  "if (target.closest('a, button')) return;",
  'toggleTree(community.slug);',
  'setWorkshopOpen((current) => !current);',
  'className="section-tree-icon-link"',
  'className="section-tree-name-link"',
  'className="section-tree-chevron"',
  '<span>Дата</span>',
  'dateTime={item.createdAt}',
  'const TOPICS_PER_PAGE = 20;',
  'className="section-topic-pagination"',
]) {
  requireMarker(
    page,
    marker,
    'Section Tree Hit Area V14.12',
  );
}

for (const marker of [
  'FORRUM_SECTION_TREE_HIT_AREA_V14_12',
  'display: inline-flex !important;',
  'justify-self: start !important;',
  'width: fit-content !important;',
  'max-width: max-content !important;',
  'cursor: default !important;',
  'cursor: pointer !important;',
]) {
  requireMarker(
    css,
    marker,
    'Section Tree Hit Area V14.12 CSS',
  );
}

// A large global stylesheet can legitimately contain older rules for the same
// selector. V14.11 incorrectly inspected only the first match. V14.12 checks
// every exact title rule and requires the final applicable contract to exist.
const titleRules = [
  ...css.matchAll(
    /\.section-page-v14-4\[data-section-polish="v14-8"\]\s+\.section-tree-name-link\s*\{([^}]*)\}/gs,
  ),
];

if (titleRules.length === 0) {
  throw new Error(
    'Section Tree Hit Area V14.12: title rules not found',
  );
}

const exactTitleRule = titleRules.find((match) => {
  const body = match[1];
  return (
    body.includes('display: inline-flex !important;') &&
    body.includes('justify-self: start !important;') &&
    body.includes('width: fit-content !important;') &&
    body.includes('max-width: max-content !important;') &&
    body.includes('cursor: pointer !important;')
  );
});

if (!exactTitleRule) {
  throw new Error(
    'Section Tree Hit Area V14.12: intrinsic title hitbox rule missing',
  );
}

// The row itself owns blank-space clicks. Anchors/buttons must be excluded so
// only the icon/title/chevron navigate or act as their own controls.
const genericRowContract =
  /onClick=\{\(event\) => \{[\s\S]*?if \(!expandable\) return;[\s\S]*?if \(target\.closest\('a, button'\)\) return;[\s\S]*?toggleTree\(community\.slug\);[\s\S]*?\}\}/;

if (!genericRowContract.test(page)) {
  throw new Error(
    'Section Tree Hit Area V14.12: generic blank-space toggle contract changed',
  );
}

const workshopRowContract =
  /onClick=\{\(event\) => \{[\s\S]*?if \(target\.closest\('a, button'\)\) return;[\s\S]*?setWorkshopOpen\(\(current\) => !current\);[\s\S]*?\}\}/;

if (!workshopRowContract.test(page)) {
  throw new Error(
    'Section Tree Hit Area V14.12: workshop blank-space toggle contract changed',
  );
}

console.log(
  'FORRUM Section Tree Hit Area V14.12 passed: ' +
    'text/icon links are intrinsic; remaining row space expands.',
);
