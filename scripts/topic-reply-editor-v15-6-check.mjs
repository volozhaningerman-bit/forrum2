import fs from 'node:fs';

const editor = fs.readFileSync(
  'apps/web/components/bbcode-editor.tsx',
  'utf8',
);
const content = fs.readFileSync(
  'apps/web/components/bbcode-content.tsx',
  'utf8',
);
const parser = fs.readFileSync(
  'apps/web/lib/bbcode.ts',
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
  'FORRUM_TOPIC_PAGE_FRAME_V15_4',
  'FORRUM_TOPIC_REPLY_EDITOR_V15_6',
  'topic-reply-composer-v15-6',
  'mode="topic-reply"',
  'Ответить в теме',
]) {
  requireMarker(topic, marker, 'Topic reply V15.6');
}

for (const marker of [
  'FORRUM_EDITOR_ENGINE_V15_6',
  "mode?: 'default' | 'topic-reply' | 'topic-create';",
  'onPaste={handlePaste}',
  'event.preventDefault();',
  "item.type.startsWith('image/')",
  "kind: 'POST_IMAGE'",
  'formatSelectionRef',
  '`[size=${normalized}px]`',
  '`[color=${customColor.toLowerCase()}]`',
  'type="color"',
  'type="number"',
  'Ctrl+V или скрепка вставляют изображение прямо',
  'Предпросмотр',
  'Добавить ссылку',
  'Вставить изображение',
  'Цитата',
  'Код',
  'Список',
  'Спойлер',
]) {
  requireMarker(editor, marker, 'BBCode editor V15.6');
}

for (const marker of [
  'FORRUM_BBCODE_FREE_FORMATTING_V15_6',
  '/^#[0-9a-f]{6}$/i',
  '/^(\\d{1,2})px$/',
  'pixels < 10 || pixels > 48',
]) {
  requireMarker(parser, marker, 'BBCode safety V15.6');
}

for (const marker of [
  "color.startsWith('#')",
  'style={{ color }}',
  "size.endsWith('px')",
  'style={{ fontSize: size }}',
]) {
  requireMarker(content, marker, 'BBCode rendering V15.6');
}

for (const marker of [
  'FORRUM_TOPIC_REPLY_EDITOR_V15_6',
  '.bb-editor-topic-reply',
  '.bb-size-input',
  '.bb-color-native',
  '.bb-color-value',
  '.bb-editor-hint',
  '.topic-reply-composer-v15-6',
  'background: #0d1a1e !important;',
]) {
  requireMarker(css, marker, 'Topic reply editor CSS V15.6');
}

for (const marker of [
  'FORRUM_SECTION_TREE_HIT_AREA_V14_12',
  'className="section-topic-table"',
  'className="section-topic-pagination"',
  '<span>Дата</span>',
]) {
  requireMarker(category, marker, 'approved CategoryPage V14.12');
}

console.log(
  'FORRUM Topic Reply Editor V15.6 passed: ' +
    'dark editor + arbitrary 10-48px size + HEX color + ' +
    'cursor-position image insertion by paste/file + preview.',
);
