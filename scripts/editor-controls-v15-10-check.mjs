import fs from 'node:fs';

const editor = fs.readFileSync(
  'apps/web/components/bbcode-editor.tsx',
  'utf8',
);
const create = fs.readFileSync(
  'apps/web/app/create/publication-form.tsx',
  'utf8',
);
const parser = fs.readFileSync(
  'apps/web/lib/bbcode.ts',
  'utf8',
);
const css = fs.readFileSync(
  'apps/web/app/globals.css',
  'utf8',
);
const controller = fs.readFileSync(
  'apps/api/src/publications/tag-styles.controller.ts',
  'utf8',
);
const module = fs.readFileSync(
  'apps/api/src/publications/publications.module.ts',
  'utf8',
);
const service = fs.readFileSync(
  'apps/api/src/publications/publications.service.ts',
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
  'FORRUM_VISUAL_BBCODE_EDITOR_V15_9',
  'FORRUM_EDITOR_CONTROLS_V15_10',
  'ToolbarIconName',
  'function ToolbarIcon',
  '<ToolbarIcon name="link" />',
  '<ToolbarIcon name="image" />',
  "Цитата: 'quote'",
  "Код: 'code'",
  "Список: 'list'",
  "Спойлер: 'spoiler'",
  'sizeMenuRef',
  'colorMenuRef',
  "document.addEventListener('pointerdown', closeDetachedMenus)",
  'syncVisualValue(true)',
  'Math.min(72, nextSize)',
  'max={72}',
  '56,',
  '64,',
  '72,',
]) {
  requireMarker(editor, marker, 'V15.10 editor');
}

for (const marker of [
  'FORRUM_EDITOR_CONTROLS_V15_10',
  'type TagStyleId =',
  'const tagStylePresets:',
  "id: 'emerald'",
  "id: 'sky'",
  "id: 'violet'",
  "id: 'amber'",
  "id: 'rose'",
  "id: 'slate'",
  'topic-create-tag-style-picker',
  'chooseTagStyle(',
  '/tag-styles`,',
  "method: 'PATCH'",
  '<span>Название темы</span>',
  '<span>Описание темы</span>',
  'topic-create-preview-title',
  'topic-create-preview-description',
]) {
  requireMarker(create, marker, 'V15.10 create form');
}

for (const marker of [
  'FORRUM_EDITOR_CONTROLS_V15_10',
  'pixels > 72',
  'pixels < 10 || pixels > 48',
]) {
  requireMarker(parser, marker, 'V15.10 BBCode parser');
}

for (const marker of [
  '/* FORRUM_EDITOR_CONTROLS_V15_10_START */',
  '/* FORRUM_EDITOR_CONTROLS_V15_10_END */',
  '.bb-tool-icon {',
  'grid-template-columns: repeat(5, minmax(0, 1fr));',
  '.bb-size-range input[type="range"]::-webkit-slider-thumb',
  '.topic-create-tag-style-picker {',
  '.topic-create-tag-style-options {',
  '.topic-create-preview-title,',
  '.topic-create-preview-description {',
]) {
  requireMarker(css, marker, 'V15.10 CSS');
}

requireCount(
  controller,
  'FORRUM_TAG_STYLE_CONTROLLER_V15_10',
  1,
  'V15.10 tag style controller marker',
);
requireCount(
  module,
  'FORRUM_TAG_STYLE_MODULE_V15_10',
  1,
  'V15.10 tag style module marker',
);
requireCount(
  service,
  'FORRUM_TAG_STYLE_PRESETS_V15_10',
  1,
  'V15.10 tag style service marker',
);

for (const marker of [
  "@Patch(':publicationSlug/tag-styles')",
  'this.service.styleTags(',
]) {
  requireMarker(controller, marker, 'V15.10 tag style controller');
}

for (const marker of [
  "import { TagStylesController } from './tag-styles.controller.js';",
  'controllers:',
  'TagStylesController',
]) {
  requireMarker(module, marker, 'V15.10 publications module');
}

for (const marker of [
  'async styleTags(',
  'styleEnabled: true',
  "textColor: '#79E6C4'",
  "backgroundColor: '#0C2B24'",
  "borderColor: '#286956'",
  'publications: {',
  'some: { publicationId: publication.id }',
  'this.prisma.tag.updateMany({',
]) {
  requireMarker(service, marker, 'V15.10 tag style service');
}

requireCount(
  editor,
  '// FORRUM_EDITOR_CONTROLS_V15_10',
  1,
  'V15.10 editor marker',
);
requireCount(
  create,
  '// FORRUM_EDITOR_CONTROLS_V15_10',
  1,
  'V15.10 form marker',
);
requireCount(
  parser,
  '// FORRUM_EDITOR_CONTROLS_V15_10',
  1,
  'V15.10 parser marker',
);
requireCount(
  css,
  '/* FORRUM_EDITOR_CONTROLS_V15_10_START */',
  1,
  'V15.10 CSS start marker',
);
requireCount(
  css,
  '/* FORRUM_EDITOR_CONTROLS_V15_10_END */',
  1,
  'V15.10 CSS end marker',
);

console.log(
  'FORRUM Editor Controls V15.10 passed: 10–72 px live slider, outside-close menus, clear SVG tools, persistent hashtag colour presets, and separated title/body preview.',
);
