import fs from 'node:fs';

const css = fs.readFileSync('apps/web/app/globals.css', 'utf8');
const start = css.indexOf('/* FORRUM_HOME_REFERENCE_V36_START');
const end = css.indexOf('/* FORRUM_HOME_REFERENCE_V36_END */', start);

if (start < 0 || end < 0) {
  throw new Error('V36 canonical homepage block missing.');
}

const block = css.slice(start, end);

const densityContract = [
  'grid-template-columns: 300px minmax(0, 1fr) 326px',
  'min-height: 44px',
  'min-height: 68px',
  'min-height: 39px',
  'min-height: 78px',
  'font-size: 12.5px',
  '@media (max-width: 1480px)',
  '@media (max-width: 1240px)',
  '@media (max-width: 860px)',
  '@media (max-width: 560px)',
];

for (const marker of densityContract) {
  if (!block.includes(marker)) {
    throw new Error(`V36 density/scale contract missing: ${marker}`);
  }
}

console.log(
  'FORRUM Home Scale V36 passed: reference shell width, dense rows and responsive collapse.',
);
