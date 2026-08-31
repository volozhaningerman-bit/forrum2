import fs from 'node:fs';

const css = fs.readFileSync(
  'apps/web/app/globals.css',
  'utf8',
);

const required = [
  '/* FORRUM_HOME_TABLE_OVERFLOW_FIX */',
  '.forrum-home-v16__new-topic-table {',
  'overflow: hidden;',
  '.forrum-home-v16__new-topic-head > *,',
  '.forrum-home-v16__new-topic > * {',
  'min-width: 0;',
  '.forrum-home-v16__new-topic-last {',
  'text-overflow: ellipsis;',
  'white-space: nowrap;',
  'max-width: 100%;',
  'minmax(0, 2.35fr)',
  'minmax(0, 1.15fr);',
];

for (const marker of required) {
  if (!css.includes(marker)) {
    throw new Error(`Missing overflow marker: ${marker}`);
  }
}

console.log('Home table overflow contract: PASS');
