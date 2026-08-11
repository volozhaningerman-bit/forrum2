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

function forbidMarker(source, marker, label) {
  if (source.includes(marker)) {
    throw new Error(`${label}: forbidden ${marker}`);
  }
}

for (const marker of [
  'FORRUM_SECTION_PAGE_POLISH_V14_8',
  'FORRUM_SECTION_PAGE_NAVIGATION_V14_10',
  'const TOPICS_PER_PAGE = 20;',
  'function formatTopicCreatedAt(value: string)',
  'function buildTopicPagination(',
  'const [topicPage, setTopicPage] = useState(1);',
  'const paginatedTopics = visibleTopics.slice(',
  'paginatedTopics.map((item) => {',
  '<span>Дата</span>',
  'dateTime={item.createdAt}',
  'formatTopicCreatedAt(item.createdAt)',
  'className="section-topic-date"',
  'className="section-topic-pagination"',
  'aria-label="Страницы тем"',
  '← Назад',
  'Вперёд →',
  'setTopicPage(1);',
]) {
  requireMarker(
    page,
    marker,
    'Section Page Navigation V14.10',
  );
}

for (const marker of [
  "{ key: 'all', label: 'Все' }",
  "{ key: 'new', label: 'Новые' }",
  "{ key: 'discussed', label: 'Обсуждаемые' }",
  "{ key: 'unanswered', label: 'Без ответа' }",
  "topicSort === 'new'",
  'right.lastActivityAt ?? right.createdAt',
]) {
  requireMarker(
    page,
    marker,
    'existing filters and sorting preserved',
  );
}

for (const marker of [
  'FORRUM_SECTION_PAGE_NAVIGATION_V14_10',
  '.section-tree-row,',
  '.section-workshop-row {',
  'cursor: default !important;',
  '.section-tree-icon-link,',
  '.section-tree-name-link,',
  '.section-tree-chevron,',
  'cursor: pointer !important;',
  '170px',
  '112px',
  '.section-topic-date {',
  '.section-topic-pagination {',
  '.section-topic-pagination-controls',
]) {
  requireMarker(
    css,
    marker,
    'Section Page Navigation V14.10 CSS',
  );
}

forbidMarker(
  page,
  'className="section-topic-date"\n' +
    '                        dateTime={item.lastActivityAt',
  'date column must be publication date',
);

console.log(
  'FORRUM Section Page Navigation V14.10 passed: ' +
    'tree cursor, publication date and 20-topic pagination.',
);
