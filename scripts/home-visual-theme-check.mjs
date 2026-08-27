import fs from 'node:fs';

const css = fs.readFileSync('apps/web/app/globals.css', 'utf8');

for (const token of [
  '--fvt-page:',
  '--fvt-panel:',
  '--fvt-line:',
  '--fvt-text:',
  '--fvt-muted:',
  '--fvt-accent:',
]) {
  if (!css.includes(token)) {
    throw new Error(`FORRUM visual token missing: ${token}`);
  }
}

if (
  !css.includes('html[data-theme="graphite"]') &&
  !css.includes('html[data-forrum-theme="graphite"]') &&
  !css.includes('html.dark')
) {
  throw new Error('Graphite token theme selector is missing.');
}

if (!css.includes('.forrum-theme-toggle')) {
  throw new Error('Theme toggle styling is missing.');
}

const start = css.indexOf('/* FORRUM_HOME_REFERENCE_V36_START');
const end = css.indexOf('/* FORRUM_HOME_REFERENCE_V36_END */', start);
const block = start >= 0 && end >= 0 ? css.slice(start, end) : '';

if (!block) {
  throw new Error('V36 canonical homepage style block missing.');
}

for (const selector of [
  'html.dark',
  'html[data-theme=',
  'html[data-forrum-theme=',
]) {
  if (block.includes(selector)) {
    throw new Error(
      `Theme-specific homepage geometry is forbidden in V36: ${selector}`,
    );
  }
}

console.log(
  'FORRUM Visual Theme V36 passed: Paper/Graphite are token-only with one shared homepage geometry.',
);
