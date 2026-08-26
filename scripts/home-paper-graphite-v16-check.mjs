import fs from 'node:fs';

const homePath =
  'apps/web/components/home-dashboard.tsx';
const pagePath = 'apps/web/app/page.tsx';
const cssPath = 'apps/web/app/globals.css';

for (const path of [homePath, pagePath, cssPath]) {
  if (!fs.existsSync(path)) {
    throw new Error(
      `Missing required file: ${path}`,
    );
  }
}

const home = fs.readFileSync(homePath, 'utf8');
const page = fs.readFileSync(pagePath, 'utf8');
const css = fs.readFileSync(cssPath, 'utf8');

const requiredHome = [
  'forrum-home-v16',
  'Обсуждаемые темы',
  'Новые темы',
  'Активные голосования',
  'Актуальное',
  'Участники недели',
  'FORRUM сегодня',
  'Предложить сообщество',
  'forrum-home-v16__tree-children',
  'aria-expanded={isOpen}',
  'href="/feed?mode=popular"',
  'href="/feed?mode=new"',
];

for (const marker of requiredHome) {
  if (!home.includes(marker)) {
    throw new Error(
      `Homepage contract is missing: ${marker}`,
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

for (const marker of [
  "'/communities'",
  "'/governance/polls'",
  "'/announcements'",
  "'/feed?mode=popular'",
  "'/feed?mode=new'",
]) {
  if (!page.includes(marker)) {
    throw new Error(
      `Homepage data source is missing: ${marker}`,
    );
  }
}

const start =
  '/* FORRUM_HOME_PAPER_GRAPHITE_V16_START';
const end =
  '/* FORRUM_HOME_PAPER_GRAPHITE_V16_END */';

if (
  (
    css.match(
      /FORRUM_HOME_PAPER_GRAPHITE_V16_START/g,
    ) ?? []
  ).length !== 1
) {
  throw new Error(
    'Expected exactly one V16 CSS start marker.',
  );
}

if (
  (
    css.match(
      /FORRUM_HOME_PAPER_GRAPHITE_V16_END/g,
    ) ?? []
  ).length !== 1
) {
  throw new Error(
    'Expected exactly one V16 CSS end marker.',
  );
}

const v16 = css.slice(
  css.indexOf(start),
  css.indexOf(end) + end.length,
);

for (const marker of [
  '--fh-bg: #ecebe7',
  '--fh-panel: #faf9f6',
  '--fh-accent: #1769ff',
  'html.dark .forrum-home-v16',
  '--fh-bg: #121416',
  '--fh-accent: #2c70ff',
  'grid-template-columns: 270px minmax(0, 1fr) 292px',
  'border-left: 1px dotted',
  'border-top: 1px dotted',
]) {
  if (!v16.includes(marker)) {
    throw new Error(
      `V16 visual contract is missing: ${marker}`,
    );
  }
}

for (const forbidden of [
  'linear-gradient',
  'radial-gradient',
  'backdrop-filter',
  'box-shadow:',
]) {
  if (v16.includes(forbidden)) {
    throw new Error(
      `V16 must stay restrained; forbidden styling found: ${forbidden}`,
    );
  }
}

const darkStart =
  v16.indexOf('html.dark .forrum-home-v16');
const bodyStart =
  v16.indexOf('body:has(.forrum-home-v16)');

if (
  darkStart < 0 ||
  bodyStart < 0 ||
  bodyStart <= darkStart
) {
  throw new Error(
    'Could not isolate Graphite token override.',
  );
}

const darkTokenBlock =
  v16.slice(darkStart, bodyStart);

for (const structuralRule of [
  'grid-template-columns:',
  'grid-template-rows:',
  'display:',
  'position:',
  'padding:',
  'margin:',
  'gap:',
  'width:',
  'height:',
]) {
  if (darkTokenBlock.includes(structuralRule)) {
    throw new Error(
      `Graphite must not redefine layout: ${structuralRule}`,
    );
  }
}

console.log(
  'FORRUM Home Paper/Graphite V16 passed: one layout, token-only themes, visible hierarchy, approved blocks.',
);
