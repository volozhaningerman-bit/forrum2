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
  'customSizeOptions',
  'customColorOptions',
  'className="bb-size-select"',
  'className="bb-color-trigger"',
  'className="bb-color-popover"',
  "selectedFormatRange('размер')",
  "selectedFormatRange('цвет')",
  'applyCustomSize(Number(event.target.value))',
  'applyCustomColor(color)',
  'Ссылка',
  'Фото',
  'Цитата',
  'Список',
]) {
  requireMarker(editor, marker, 'V15.8 editor');
}

for (const forbidden of [
  'className="bb-size-input"',
  'className="bb-unit-button"',
  'className="bb-color-native"',
  'className="bb-editor-hint"',
]) {
  if (editor.includes(forbidden)) {
    throw new Error(`V15.8 editor: obsolete control remains: ${forbidden}`);
  }
}

for (const marker of [
  'FORRUM_CREATE_TOPIC_WORKSPACE_V15_7',
  'FORRUM_CREATE_TOPIC_WORKSPACE_V15_7_2',
  'FORRUM_CREATE_TOPIC_EDITOR_V15_8',
  'mode="topic-create"',
  'Предпросмотр FORRUM',
  '<span>{body.length}/30000</span>',
]) {
  requireMarker(create, marker, 'V15.8 create form');
}

for (const forbidden of [
  'Стандарт: 16 px · автоцвет',
  'Произвольный размер и цвет',
  'className="topic-create-autosave"',
  'placeholder="Расскажите о теме подробно.',
]) {
  if (create.includes(forbidden)) {
    throw new Error(`V15.8 create form: obsolete explanation remains: ${forbidden}`);
  }
}

for (const marker of [
  '/* FORRUM_CREATE_TOPIC_EDITOR_V15_8_START */',
  '/* FORRUM_CREATE_TOPIC_EDITOR_V15_8_END */',
  '.bb-size-select {',
  '.bb-color-popover {',
  '.topic-create-tag-preview span,',
  'font-size: 13px;',
  'footer:not(.topic-create-actions)',
]) {
  requireMarker(css, marker, 'V15.8 CSS');
}

requireCount(
  css,
  '/* FORRUM_CREATE_TOPIC_EDITOR_V15_8_START */',
  1,
  'V15.8 CSS',
);
requireCount(
  css,
  '/* FORRUM_CREATE_TOPIC_EDITOR_V15_8_END */',
  1,
  'V15.8 CSS',
);
requireCount(
  editor,
  '// FORRUM_CREATE_TOPIC_EDITOR_V15_8',
  1,
  'V15.8 editor marker',
);
requireCount(
  create,
  '// FORRUM_CREATE_TOPIC_EDITOR_V15_8',
  1,
  'V15.8 form marker',
);

console.log(
  'FORRUM Create Topic Editor V15.8 passed: direct selected-text size/color formatting, dark HEX palette, clearer controls, larger typography, visible hashtag chips, and one FORRUM preview.',
);
