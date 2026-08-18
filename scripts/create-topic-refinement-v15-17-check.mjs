import fs from 'node:fs';

const editor = fs.readFileSync(
  'apps/web/components/bbcode-editor.tsx',
  'utf8',
);
const form = fs.readFileSync(
  'apps/web/app/create/publication-form.tsx',
  'utf8',
);
const css = fs.readFileSync(
  'apps/web/app/globals.css',
  'utf8',
);
const service = fs.readFileSync(
  'apps/api/src/publications/publications.service.ts',
  'utf8',
);

function count(source, token) {
  return source.split(token).length - 1;
}

function requireContract(condition, message) {
  if (!condition) throw new Error(message);
}

requireContract(
  count(editor, '// FORRUM_STABLE_VISUAL_SELECTION_V15_17') === 1,
  'Expected exactly one V15.17 editor marker.',
);
requireContract(
  count(form, '// FORRUM_CREATE_TOPIC_REFINEMENT_V15_17') === 1,
  'Expected exactly one V15.17 form marker.',
);
requireContract(
  count(css, '/* FORRUM_CREATE_TOPIC_REFINEMENT_V15_17_START */') === 1 &&
    count(css, '/* FORRUM_CREATE_TOPIC_REFINEMENT_V15_17_END */') === 1,
  'Expected one complete V15.17 CSS block.',
);

for (const contract of [
  'type VisualSelectionBookmark = SelectionRange;',
  'visualSelectionBookmarkRef',
  'function textOffsetWithin(',
  'function pointAtTextOffset(',
  'function bookmarkVisualRange(',
  'function rangeFromVisualBookmark()',
  'const range = rangeFromVisualBookmark();',
  "applyVisualSpanStyle('color', normalized)",
  "applyVisualSpanStyle('fontSize', `${normalized}px`)",
  'event.preventDefault(); rememberVisualSelection();',
]) {
  requireContract(editor.includes(contract), `Missing stable-selection contract: ${contract}`);
}

for (const contract of [
  "const defaultTagStyle: TagStyleId = 'slate';",
  'function visibleBbcodeLength(source: string)',
  'const visibleBodyLength = useMemo(',
  'Количество видимых символов',
  'topic-create-destination',
  'Раздел публикации',
  'topic-create-destination-path',
  'Оформление #{tagStylePicker}',
  '<span aria-hidden="true">#</span>',
  'title={preset.label}',
]) {
  requireContract(form.includes(contract), `Missing create-form refinement: ${contract}`);
}

requireContract(
  !form.includes('className="topic-create-section-line"'),
  'The loose legacy section line must not be rendered.',
);
requireContract(
  !form.includes('<span>{body.length}/30000</span>'),
  'The editor counter must not expose BBCode markup length.',
);

for (const contract of [
  '.topic-create-destination {',
  '.topic-create-destination-path {',
  '.topic-create-tag-style-heading {',
  'grid-template-columns: repeat(6, minmax(38px, 1fr));',
  'border-radius: 6px;',
  'font-weight: 650;',
]) {
  requireContract(css.includes(contract), `Missing V15.17 CSS contract: ${contract}`);
}

requireContract(
  css.indexOf('/* FORRUM_CREATE_TOPIC_REFINEMENT_V15_17_START */') >
    css.indexOf('/* FORRUM_CREATE_TOPIC_POLISH_V15_12_END */'),
  'V15.17 must remain an isolated layer after V15.12.',
);

for (const contract of [
  'FORRUM_RESTRAINED_TAG_STYLE_PRESETS_V15_17',
  "textColor: '#8ED8C0'",
  "backgroundColor: '#102923'",
  "textColor: '#C7D2CF'",
  "backgroundColor: '#132124'",
]) {
  requireContract(service.includes(contract), `Missing API tag-style refinement: ${contract}`);
}

console.log(
  'FORRUM Create Topic Refinement V15.17 passed: explicit publication path, restrained hashtag chips and compact swatches, stable logical text selection, and visible-character counting.',
);
