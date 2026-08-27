import fs from 'node:fs';

const cssPath = 'apps/web/app/globals.css';

if (!fs.existsSync(cssPath)) {
  throw new Error(`Missing ${cssPath}`);
}

const css = fs.readFileSync(cssPath, 'utf8');

const start = '/* FORRUM_HOME_SCALE_POLISH_START';
const end = '/* FORRUM_HOME_SCALE_POLISH_END */';

if ((css.match(/FORRUM_HOME_SCALE_POLISH_START/g) ?? []).length !== 1) {
  throw new Error('Expected exactly one scale-polish start marker.');
}

if ((css.match(/FORRUM_HOME_SCALE_POLISH_END/g) ?? []).length !== 1) {
  throw new Error('Expected exactly one scale-polish end marker.');
}

const block = css.slice(
  css.indexOf(start),
  css.indexOf(end) + end.length,
);

for (const required of [
  'max-width: 1920px',
  'grid-template-columns: 320px minmax(0, 1fr) 326px',
  'font-size: 12.5px',
  'min-height: 39px',
  'min-height: 148px',
  'width: 14px',
  'font-size: 13.5px',
]) {
  if (!block.includes(required)) {
    throw new Error(`Scale-polish contract missing: ${required}`);
  }
}

for (const forbidden of [
  'linear-gradient',
  'radial-gradient',
  'backdrop-filter',
  'filter: blur',
  'box-shadow:',
]) {
  if (block.includes(forbidden)) {
    throw new Error(`Forbidden decorative effect found: ${forbidden}`);
  }
}

// This pass must not add theme-specific geometry.
// It deliberately contains no dark/graphite selector at all.
for (const forbiddenThemeSelector of [
  'html.dark',
  'data-theme="dark"',
  'data-theme="graphite"',
  'data-forrum-theme="graphite"',
]) {
  if (block.includes(forbiddenThemeSelector)) {
    throw new Error(
      `Scale polish contains theme-specific layout: ${forbiddenThemeSelector}`,
    );
  }
}

console.log(
  'FORRUM Home Scale Polish passed: wider shell, stronger type, denser tree/table, identical Paper/Graphite geometry.',
);
