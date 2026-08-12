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

for (const marker of [
  'FORRUM_CREATE_TOPIC_WORKSPACE_V15_7',
  '<TopicCategoryTree',
  'activeSlug={community || null}',
  '<h1>Создать тему</h1>',
  'Заголовок темы',
  'Хэштеги',
  'mode="topic-create"',
  'Предпросмотр FORRUM',
  'Telegram-превью',
  'const [telegramPreviewOpen, setTelegramPreviewOpen] =',
  'useState(false);',
  'aria-expanded={telegramPreviewOpen}',
  "telegramPreviewOpen ? 'open' : 'collapsed'",
  '{telegramPreviewOpen && (',
  'Проверить Telegram →',
  'telegramUsesCustomSize',
  'telegramUsesCustomColor',
  'telegramImageCount',
  'setTelegramCheckedAt(new Date())',
  'window.localStorage.setItem(',
  'DRAFT_KEY',
  'api<{ slug: string }>(',
  '`/communities/${community}/publications`',
  'router.push(`/p/${result.slug}`)',
]) {
  requireMarker(create, marker, 'Create Topic V15.7');
}

for (const marker of [
  'FORRUM_EDITOR_ENGINE_V15_6',
  "mode?: 'default' | 'topic-reply' | 'topic-create';",
  'onPaste={handlePaste}',
  '`[size=${normalized}px]`',
  '`[color=${customColor.toLowerCase()}]`',
]) {
  requireMarker(editor, marker, 'Editor V15.6 baseline');
}

for (const marker of [
  'FORRUM_TOPIC_PAGE_FRAME_V15_4',
  'FORRUM_TOPIC_REPLY_EDITOR_V15_6',
]) {
  requireMarker(topic, marker, 'TopicPage protected baseline');
}

for (const marker of [
  'FORRUM_SECTION_TREE_HIT_AREA_V14_12',
  'className="section-topic-table"',
  'className="section-topic-pagination"',
  '<span>Дата</span>',
]) {
  requireMarker(category, marker, 'CategoryPage V14.12 baseline');
}

for (const marker of [
  'FORRUM_CREATE_TOPIC_WORKSPACE_V15_7',
  '.topic-create-v15-7 {',
  'grid-template-columns: 220px minmax(0, 1fr) 224px;',
  '.topic-create-main {',
  '.bb-editor-topic-create',
  'min-height: 380px;',
  '.topic-create-telegram {',
  '.topic-create-telegram.collapsed',
  '.topic-create-telegram-content {',
  '.topic-create-forrum-preview {',
  '.topic-create-actions {',
]) {
  requireMarker(css, marker, 'Create Topic CSS V15.7');
}

console.log(
  'FORRUM Create Topic Workspace V15.7 passed: ' +
    'approved tree + V15.6 editor + draft + FORRUM preview + ' +
    'collapsed-by-default Telegram preview; API contract preserved.',
);
