import fs from 'node:fs';

const topic = fs.readFileSync(
  'apps/web/app/p/[slug]/publication-client.tsx',
  'utf8',
);
const category = fs.readFileSync(
  'apps/web/app/communities/[slug]/category-page.tsx',
  'utf8',
);
const tree = fs.readFileSync(
  'apps/web/components/topic-category-tree.tsx',
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
  'FORRUM_TOPIC_PAGE_FRAME_V15_4',
  "data-topic-frame={isTopic ? 'v15-4' : undefined}",
  '<TopicCategoryTree activeSlug={item.community.slug} />',
  'className="topic-frame-header"',
]) {
  requireMarker(topic, marker, 'Topic Page Frame V15.4 baseline');
}

for (const marker of [
  'FORRUM_TOPIC_TREE_FRAME_V15_4',
  "if (target.closest('a, button')) return;",
  'className="section-tree-icon-link"',
  'className="section-tree-name-link"',
  'className="section-tree-chevron"',
]) {
  requireMarker(tree, marker, 'Topic tree V15.4 baseline');
}

for (const marker of [
  'FORRUM_SECTION_TREE_HIT_AREA_V14_12',
  'className="section-topic-table"',
  'className="section-topic-pagination"',
  '<span>Дата</span>',
]) {
  requireMarker(category, marker, 'approved CategoryPage V14.12');
}

for (const marker of [
  'FORRUM_TOPIC_POST_SURFACE_V15_5',
  '.topic-page-frame-v15-4 .publication-detail-topic {',
  'grid-template-columns: 154px minmax(0, 1fr);',
  '> .publication-detail-author {',
  '> .publication-rich-body {',
  '> .publication-detail-footer {',
  '.topic-page-frame-v15-4 .discussion-section {',
  '.topic-page-frame-v15-4 .threaded-comments {',
  'order: 2;',
  '.topic-page-frame-v15-4 .reply-composer {',
  'order: 3;',
  '.topic-page-frame-v15-4 .discussion-comment {',
  'background: #0d1a1e;',
]) {
  requireMarker(css, marker, 'Topic post surface V15.5');
}

console.log(
  'FORRUM Topic Post Surface V15.5 passed: dark post/comment surface; ' +
    'editor remains separate.',
);
