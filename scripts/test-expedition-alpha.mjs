import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const files = {
  page: path.join(root, 'apps/web/app/applications/games/expedition-alpha/page.tsx'),
  game: path.join(root, 'apps/web/app/applications/games/expedition-alpha/expedition-alpha-game.tsx'),
  css: path.join(root, 'apps/web/app/applications/games/expedition-alpha/expedition-alpha.css'),
  spec: path.join(root, 'docs/game-expedition-alpha-source-of-truth.md'),
};

for (const [name, file] of Object.entries(files)) {
  if (!fs.existsSync(file)) throw new Error(`Missing ${name}: ${file}`);
}

const game = fs.readFileSync(files.game, 'utf8');
const css = fs.readFileSync(files.css, 'utf8');
const spec = fs.readFileSync(files.spec, 'utf8');

const checks = [
  ['16 equipment slots', (game.match(/label: '/g) ?? []).length >= 16],
  ['four rarity tiers', ['common', 'uncommon', 'rare', 'epic'].every((value) => game.includes(value))],
  ['energy expedition flow', game.includes('sendExpedition') && game.includes('collectReturn')],
  ['five Rust Outskirts depths', game.includes('Реакторная зона') && game.includes('Ломовые дворы')],
  ['numbered loot', game.includes('serial') && game.includes('circulation')],
  ['Iron Shepherd raid', game.includes('Железный Пастырь')],
  ['modular avatar appearance hooks', game.includes('has-sword') && css.includes('.exp-avatar.has-sword')],
  ['server authority documented', spec.includes('Server authority') && spec.includes('localStorage')],
  ['office styling explicitly excluded', spec.includes('not office / corporate styling')],
];

const failed = checks.filter(([, pass]) => !pass);
if (failed.length) {
  for (const [name] of failed) console.error(`FAIL: ${name}`);
  process.exit(1);
}

for (const [name] of checks) console.log(`PASS: ${name}`);
console.log('Expedition alpha foundation checks passed.');
