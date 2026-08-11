import fs from 'node:fs';

const category = fs.readFileSync(
  'apps/web/app/communities/[slug]/category-page.tsx',
  'utf8',
);

const topic = fs.readFileSync(
  'apps/web/app/p/[slug]/publication-client.tsx',
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

function forbidMarker(source, marker, label) {
  if (source.includes(marker)) {
    throw new Error(`${label}: forbidden ${marker}`);
  }
}

for (const marker of [
  'FORRUM_SECTION_TREE_HIT_AREA_V14_12',
  "api<TreeCommunity[]>('/communities')",
  "if (target.closest('a, button')) return;",
  'toggleTree(community.slug);',
  'setWorkshopOpen((current) => !current);',
  'className="section-tree-icon-link"',
  'className="section-tree-name-link"',
  'className="section-tree-chevron"',
  'className="section-topic-table"',
  'className="section-topic-pagination"',
  '<span>Дата</span>',
  'const TOPICS_PER_PAGE = 20;',
]) {
  requireMarker(category, marker, 'approved CategoryPage V14.12');
}

for (const marker of [
  'FORRUM_TOPIC_TREE_FRAME_V15_4',
  "api<TopicTreeCommunity[]>('/communities')",
  "if (target.closest('a, button')) return;",
  'toggleTree(community.slug);',
  'setWorkshopOpen((current) => !current);',
  'className="section-tree-icon-link"',
  'className="section-tree-name-link"',
  'className="section-tree-chevron"',
  "'internet-projects'",
  "'promotion'",
  "'forrum-start'",
  "'gta-rp'",
  "'telegram'",
]) {
  requireMarker(tree, marker, 'Topic tree V15.4');
}

for (const marker of [
  'FORRUM_TOPIC_PAGE_FRAME_V15_4',
  "from '@/components/topic-category-tree';",
  'topicCommunityAncestors',
  "api<{ ancestors?: Array<{ slug: string; name: string }> }>(",
  '<TopicCategoryTree activeSlug={item.community.slug} />',
  "data-topic-frame={isTopic ? 'v15-4' : undefined}",
  'className="topic-frame-header"',
  'id="topic-frame-title"',
  '<Link href="/communities">Сообщества</Link>',
  'href={`/communities/${ancestor.slug}`}',
  'href={`/communities/${item.community.slug}`}',
  'href={`/u/${item.author.username}`}',
  'Подписаться',
  'Сохранить',
  'onClick={bookmark}',
]) {
  requireMarker(topic, marker, 'Topic Page Frame V15.4');
}

for (const marker of [
  'FORRUM_TOPIC_PAGE_FRAME_V15_4',
  '.topic-page-frame-v15-4 {',
  'grid-template-columns: 246px minmax(0, 1fr);',
  '.topic-page-frame-v15-4 > .section-category-tree',
  '.topic-page-frame-v15-4 > .publication-sidebar',
  'display: none !important;',
  '.topic-frame-header {',
  '> .publication-detail-header',
]) {
  requireMarker(css, marker, 'Topic Page Frame V15.4 CSS');
}

forbidMarker(
  topic,
  "/publications/${slug}/subscribe",
  'fake topic subscription API',
);

forbidMarker(
  topic,
  'FORRUM_TOPIC_POST_COMPONENT',
  'future post stage leaked',
);

forbidMarker(
  topic,
  'FORRUM_EDITOR_ENGINE',
  'future editor stage leaked',
);

console.log(
  'FORRUM Topic Page Frame V15.4 passed: ' +
    'approved CategoryPage untouched; TopicPage frame isolated.',
);
