import fs from 'node:fs';

const formPath = 'apps/web/app/create/publication-form.tsx';
const cssPath = 'apps/web/app/globals.css';

const form = fs.readFileSync(formPath, 'utf8');
const css = fs.readFileSync(cssPath, 'utf8');

function count(source, token) {
  return source.split(token).length - 1;
}

function requireContract(condition, message) {
  if (!condition) throw new Error(message);
}

requireContract(
  count(form, '// FORRUM_CREATE_TOPIC_POLISH_V15_11') === 1,
  'Expected exactly one V15.11 form marker.',
);
requireContract(
  count(css, '/* FORRUM_CREATE_TOPIC_POLISH_V15_11_START */') === 1 &&
    count(css, '/* FORRUM_CREATE_TOPIC_POLISH_V15_11_END */') === 1,
  'Expected one complete V15.11 CSS block.',
);

for (const legacy of [
  '// FORRUM_CREATE_TOPIC_WORKSPACE_V15_7',
  '// FORRUM_VISUAL_BBCODE_EDITOR_V15_9',
  '// FORRUM_EDITOR_CONTROLS_V15_10',
]) {
  requireContract(form.includes(legacy), `Missing protected marker: ${legacy}`);
}

requireContract(form.includes('<span>Название</span>'), 'Compact preview title label is missing.');
requireContract(form.includes('<span>Описание</span>'), 'Compact preview description label is missing.');
requireContract(
  count(form, '<span>Название темы</span>') === 1 &&
    count(form, '<span>Описание темы</span>') === 1,
  'Protected V15.10 source-contract tokens must remain exactly once.',
);

for (const contract of [
  '.bb-editor-topic-create .bb-visual-input',
  'min-height: 210px;',
  'max-height: 640px;',
  'font-size: 14px;',
  'line-height: 1.55;',
  'span[style*="font-size"]',
  'line-height: 1.25;',
  '.bb-editor-topic-create .bb-tool-icon',
  'width: 20px;',
  '.topic-create-preview-description',
  'min-height: 76px;',
  'text-transform: none;',
]) {
  requireContract(css.includes(contract), `Missing V15.11 CSS contract: ${contract}`);
}

requireContract(
  css.indexOf('/* FORRUM_CREATE_TOPIC_POLISH_V15_11_START */') >
    css.indexOf('/* FORRUM_EDITOR_CONTROLS_V15_10_END */'),
  'V15.11 must remain an isolated layer after V15.10.',
);

console.log(
  'FORRUM Create Topic Polish V15.11 passed: readable controls, compact auto-growing editor, 20px tools, restrained preview labels, tighter preview spacing, and safe large-text leading.',
);
