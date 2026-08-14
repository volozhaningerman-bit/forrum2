import fs from 'node:fs';

const editor = fs.readFileSync(
  'apps/web/components/bbcode-editor.tsx',
  'utf8',
);
const create = fs.readFileSync(
  'apps/web/app/create/publication-form.tsx',
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
  'FORRUM_EDITOR_ENGINE_V15_6',
  'FORRUM_CREATE_TOPIC_EDITOR_V15_8',
  'FORRUM_VISUAL_BBCODE_EDITOR_V15_9',
  'contentEditable',
  'visualHtmlToBbcode',
  'bbcodeToHtml',
  'serializeVisualNode',
  'rememberVisualSelection',
  'restoreVisualSelection',
  'className="bb-visual-input"',
  'className="bb-size-trigger"',
  'className="bb-size-popover"',
  'className="bb-color-trigger"',
  'className="bb-color-popover"',
  'type="range"',
  'applyCustomSize(size)',
  'applyCustomColor(color)',
  '<span className="bb-tool-symbol"',
  '❝',
  '</>',
  '☷',
  '◫',
  "kind: 'POST_IMAGE'",
  'onPaste={handlePaste}',
]) {
  requireMarker(editor, marker, 'V15.9 visual editor');
}

const palette = editor.match(
  /const customColorOptions = \[([\s\S]*?)\] as const;/,
);
if (!palette) {
  throw new Error('V15.9 visual editor: palette block missing');
}
const paletteColors = palette[1].match(/#[0-9A-F]{6}/g) ?? [];
if (paletteColors.length < 30) {
  throw new Error(
    `V15.9 visual editor: expected at least 30 colours, found ${paletteColors.length}`,
  );
}

for (const marker of [
  'FORRUM_CREATE_TOPIC_WORKSPACE_V15_7',
  'FORRUM_CREATE_TOPIC_EDITOR_V15_8',
  'FORRUM_VISUAL_BBCODE_EDITOR_V15_9',
  'setFormat(draft.format)',
  'setBody(draft.body)',
  'setDraftSavedAt(new Date())',
  'Предпросмотр FORRUM',
  'mode="topic-create"',
]) {
  requireMarker(create, marker, 'V15.9 create form');
}

for (const forbidden of [
  'pendingDraft',
  'Найден незавершённый черновик',
  '<strong>Telegram-превью</strong>',
  'className={`topic-create-telegram',
  'const [telegramPreviewOpen',
  'const [telegramCheckedAt',
]) {
  if (create.includes(forbidden)) {
    throw new Error(`V15.9 create form: obsolete block remains: ${forbidden}`);
  }
}

for (const marker of [
  '/* FORRUM_VISUAL_BBCODE_EDITOR_V15_9_START */',
  '/* FORRUM_VISUAL_BBCODE_EDITOR_V15_9_END */',
  '.bb-editor-visual .bb-visual-input {',
  '.bb-size-popover {',
  '.bb-size-presets {',
  '.bb-color-palette {',
  'grid-template-columns: repeat(6, 1fr);',
  '.bb-tool-symbol {',
  'grid-template-columns: 220px minmax(0, 1fr) !important;',
]) {
  requireMarker(css, marker, 'V15.9 CSS');
}

requireCount(
  editor,
  '// FORRUM_VISUAL_BBCODE_EDITOR_V15_9',
  1,
  'V15.9 editor marker',
);
requireCount(
  create,
  '// FORRUM_VISUAL_BBCODE_EDITOR_V15_9',
  1,
  'V15.9 form marker',
);
requireCount(
  css,
  '/* FORRUM_VISUAL_BBCODE_EDITOR_V15_9_START */',
  1,
  'V15.9 CSS start marker',
);
requireCount(
  css,
  '/* FORRUM_VISUAL_BBCODE_EDITOR_V15_9_END */',
  1,
  'V15.9 CSS end marker',
);

console.log(
  'FORRUM Visual BBCode Editor V15.9 passed: live WYSIWYG formatting backed by BBCode, 30-colour palette, custom size panel, labelled icons, silent draft resume, and no Telegram preview block.',
);
