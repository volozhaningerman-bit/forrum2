import fs from 'node:fs';
const css = fs.readFileSync('apps/web/app/globals.css', 'utf8');
const start = css.indexOf('/* FORRUM_HOME_REFERENCE_V36_START');
const end = css.indexOf('/* FORRUM_HOME_REFERENCE_V36_END */', start);
if (start < 0 || end < 0) throw new Error('Canonical homepage CSS missing.');
const block = css.slice(start, end);

for (const marker of [
  'width: min(calc(100vw - 20px), 1920px)',
  'grid-template-columns: 300px minmax(0, 1fr) 326px',
  '.forrum-home-v16__discussed',
  '.forrum-home-v16__new-topic',
  '.forrum-home-v16__poll',
  '.forrum-home-v16__weekly',
  '@media (max-width: 1480px)',
  '@media (max-width: 1240px)',
  '@media (max-width: 860px)',
  '@media (max-width: 560px)',
]) {
  if (!block.includes(marker)) throw new Error(`Homepage density/scale contract missing: ${marker}`);
}

console.log('FORRUM Home scale contract passed: wide desktop shell, dense functional rows, responsive collapse.');
