import fs from 'node:fs';

const headerPath =
  'apps/web/components/site-header.tsx';
const footerPath =
  'apps/web/components/site-footer.tsx';
const cssPath = 'apps/web/app/globals.css';
const homePath =
  'apps/web/components/home-dashboard.tsx';

for (const path of [
  headerPath,
  footerPath,
  cssPath,
  homePath,
]) {
  if (!fs.existsSync(path)) {
    throw new Error(`Required file missing: ${path}`);
  }
}

const header = fs.readFileSync(headerPath, 'utf8');
const footer = fs.readFileSync(footerPath, 'utf8');
const css = fs.readFileSync(cssPath, 'utf8');
const home = fs.readFileSync(homePath, 'utf8');

if (!header.includes('data-forrum-shell="header"')) {
  throw new Error(
    'Global header is not tagged for V16 shell styling.',
  );
}

if (!footer.includes('data-forrum-shell="footer"')) {
  throw new Error(
    'Global footer is not tagged for V16 shell styling.',
  );
}

const start =
  '/* FORRUM_GLOBAL_SHELL_V16_1_START';
const end =
  '/* FORRUM_GLOBAL_SHELL_V16_1_END */';

if (
  (
    css.match(
      /FORRUM_GLOBAL_SHELL_V16_1_START/g,
    ) ?? []
  ).length !== 1
) {
  throw new Error(
    'Expected one global shell CSS start marker.',
  );
}

if (
  (
    css.match(
      /FORRUM_GLOBAL_SHELL_V16_1_END/g,
    ) ?? []
  ).length !== 1
) {
  throw new Error(
    'Expected one global shell CSS end marker.',
  );
}

const block = css.slice(
  css.indexOf(start),
  css.indexOf(end) + end.length,
);

for (const required of [
  '--forrum-shell-page: #ecebe7',
  '--forrum-shell-surface: #f5f4f0',
  '--forrum-shell-accent: #1769ff',
  '--forrum-shell-page: #121416',
  '--forrum-shell-surface: #181b1f',
  '--forrum-shell-accent: #2c70ff',
  '[data-forrum-shell="header"]',
  '[data-forrum-shell="footer"]',
  'width: min(calc(100vw - 24px), 1680px)',
  'border-left-color: var(--fh-line-strong)',
  'border-top-color: var(--fh-line-strong)',
]) {
  if (!block.includes(required)) {
    throw new Error(
      `Global shell contract is missing: ${required}`,
    );
  }
}

const darkIndex = block.indexOf('html.dark,');
const headerIndex = block.indexOf(
  '[data-forrum-shell="header"]',
);

if (
  darkIndex < 0 ||
  headerIndex < 0 ||
  headerIndex <= darkIndex
) {
  throw new Error(
    'Could not isolate Graphite token override.',
  );
}

const darkTokenBlock =
  block.slice(darkIndex, headerIndex);

for (const structural of [
  'display:',
  'position:',
  'width:',
  'height:',
  'margin:',
  'padding:',
  'grid-template',
  'flex-direction:',
]) {
  if (darkTokenBlock.includes(structural)) {
    throw new Error(
      `Graphite changes layout: ${structural}`,
    );
  }
}

for (const forbidden of [
  'linear-gradient',
  'radial-gradient',
  'filter: blur',
]) {
  if (block.includes(forbidden)) {
    throw new Error(
      `FORRUM shell contains forbidden decoration: ${forbidden}`,
    );
  }
}

for (const rejected of [
  'Кураторы недели',
  'Развитие FORRUM',
  'Поддержать проект',
  'Ближайшие события',
]) {
  if (home.includes(rejected)) {
    throw new Error(
      `Rejected homepage block returned: ${rejected}`,
    );
  }
}

for (const required of [
  'Участники недели',
  'FORRUM сегодня',
  'Активные голосования',
  'forrum-home-v16__tree-children',
]) {
  if (!home.includes(required)) {
    throw new Error(
      `Homepage requirement missing: ${required}`,
    );
  }
}

console.log(
  'FORRUM Global Shell V16.1 passed.',
);
