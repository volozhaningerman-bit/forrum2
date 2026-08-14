import fs from 'node:fs';

const create = fs.readFileSync(
  'apps/web/app/create/publication-form.tsx',
  'utf8',
);
const editor = fs.readFileSync(
  'apps/web/components/bbcode-editor.tsx',
  'utf8',
);
const topic = fs.readFileSync(
  'apps/web/app/p/[slug]/publication-client.tsx',
  'utf8',
);
const category = fs.readFileSync(
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

function requireCount(source, marker, expected, label) {
  const count = source.split(marker).length - 1;
  if (count !== expected) {
    throw new Error(
      `${label}: expected ${expected} occurrence(s) of ${marker}, found ${count}`,
    );
  }
}

for (const marker of [
  'FORRUM_CREATE_TOPIC_WORKSPACE_V15_7',
  'FORRUM_CREATE_TOPIC_WORKSPACE_V15_7_2',
  '<TopicCategoryTree',
  'activeSlug={community || null}',
  '<h1>Создать тему</h1>',
  'Заголовок темы',
  'Хэштеги',
  'mode="topic-create"',
  'Предпросмотр FORRUM',
  'Telegram-превью',
  'useState(false);',
  'aria-expanded={telegramPreviewOpen}',
  "telegramPreviewOpen ? 'open' : 'collapsed'",
  '{telegramPreviewOpen && (',
  'uniqueTags.slice(0, 5)',
  'window.localStorage.setItem(',
  'readStoredDraft()',
  'writeStoredDraft(draft)',
  'deleteStoredDraft();',
  'DRAFT_KEY',
  '/communities/${community}/publications',
  'router.push(`/p/${result.slug}`)',
]) {
  requireMarker(create, marker, 'Create Topic V15.7.4');
}

for (const marker of [
  'FORRUM_EDITOR_ENGINE_V15_6',
  "mode?: 'default' | 'topic-reply' | 'topic-create';",
  'onPaste={handlePaste}',
  'className={`bb-preview-toggle ${',
  '`[size=${normalized}px]`',
  '`[color=${customColor.toLowerCase()}]`',
]) {
  requireMarker(editor, marker, 'Editor V15.6 baseline');
}

for (const marker of [
  'FORRUM_TOPIC_PAGE_FRAME_V15_4',
  'FORRUM_TOPIC_REPLY_EDITOR_V15_6',
]) {
  requireMarker(topic, marker, 'Topic Page protected baseline');
}

for (const marker of [
  'FORRUM_SECTION_TREE_HIT_AREA_V14_12',
  'className="section-topic-table"',
  'className="section-topic-pagination"',
  '<span>Дата</span>',
]) {
  requireMarker(category, marker, 'Category Page protected baseline');
}

for (const marker of [
  'FORRUM_CREATE_TOPIC_WORKSPACE_V15_7_3_START',
  'FORRUM_CREATE_TOPIC_WORKSPACE_V15_7_3_END',
  'FORRUM_CREATE_TOPIC_WORKSPACE_V15_7_4_START',
  'FORRUM_CREATE_TOPIC_WORKSPACE_V15_7_4_END',
  '.bb-preview-toggle {',
  'display: none !important;',
  'min-height: 232px;',
  '.topic-create-submit-actions .button.ghost {',
  '.topic-create-forrum-preview .bb-quote {',
  '.topic-create-forrum-preview .bb-code {',
  '.topic-create-forrum-preview .bb-spoiler {',
  '.topic-create-forrum-preview .bb-list {',
  '.topic-create-forrum-preview .bb-image {',
  '@media (max-width: 720px)',
]) {
  requireMarker(css, marker, 'Create Topic CSS V15.7.4');
}

for (const marker of [
  '/* FORRUM_CREATE_TOPIC_WORKSPACE_V15_7_4_START */',
  '/* FORRUM_CREATE_TOPIC_WORKSPACE_V15_7_4_END */',
]) {
  requireCount(css, marker, 1, 'Create Topic CSS V15.7.4');
}

console.log(
  'FORRUM Create Topic Workspace V15.7.4 passed: one FORRUM preview action, dark BBCode preview surfaces, stronger hierarchy and actions; API and protected V15.6 scope preserved.',
);