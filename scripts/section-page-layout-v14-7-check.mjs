import fs from 'node:fs';

const page = fs.readFileSync(
  'apps/web/app/communities/[slug]/category-page.tsx',
  'utf8',
);
const css = fs.readFileSync('apps/web/app/globals.css', 'utf8');

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
  'FORRUM_CATEGORY_PAGE_STAGE_1_V14',
  'FORRUM_SECTION_PAGE_HEADER_V14_3',
  'FORRUM_SECTION_PAGE_LAYOUT_V14_7',
  'className="section-page-v14-4"',
  'className="section-category-tree"',
  'className="section-tree-icon-link"',
  'className="section-tree-name-link"',
  'className="section-tree-chevron"',
  "target.closest('a, button')",
  "api<TreeCommunity[]>('/communities')",
  'rootCommunities.map((community)',
  'renderTreeNode(community)',
  'className="section-topic-table"',
  'className="section-topic-toolbar"',
  "type TopicTab = 'all' | 'new' | 'discussed' | 'unanswered';",
  "{ key: 'all', label: 'Все' }",
  "{ key: 'new', label: 'Новые' }",
  "{ key: 'discussed', label: 'Обсуждаемые' }",
  "{ key: 'unanswered', label: 'Без ответа' }",
  'publication.format === \'TOPIC\'',
  'publication.commentCount === 0',
  'className="section-topic-table-head"',
  'className={`section-topic-row ${',
  'className="section-topic-author"',
  'item.viewCount ?? 0',
  'Создать тему',
]) {
  requireMarker(page, marker, 'Section Page Layout V14.7');
}

for (const marker of [
  '<PublicationCard',
  "from '@/components/publication-card'",
  'className="child-community-strip"',
  'className="parent-aggregation-note"',
  'className="community-toolbar"',
  'className="dashboard-grid community-layout"',
  'className="dashboard-sidebar"',
  'Популярные хэштеги',
  'Команда сообщества',
]) {
  forbidMarker(page, marker, 'retired category layout');
}

for (const marker of [
  'FORRUM_SECTION_PAGE_LAYOUT_V14_7',
  'body:has(.section-page-v14-4)',
  '.section-page-layout {',
  '.section-category-tree {',
  '.section-topic-table {',
  '.section-topic-row {',
  '.section-tree-chevron {',
]) {
  requireMarker(css, marker, 'Section Page Layout V14.7 CSS');
}


requireMarker(
  page,
  'href={`/create?community=${encodeURIComponent(data.slug)}&format=TOPIC`}',
  'canonical Stage 1 create-topic compatibility',
);

requireMarker(
  page,
  "active ? 'recent' : ''",
  'dynamic recent topic row state',
);

requireMarker(
  page,
  'PublicationCardData',
  'publication data type retained',
);

console.log(
  'FORRUM Section Page Layout V14.7 passed: tree + compact dark topic table, no right rail.',
);
