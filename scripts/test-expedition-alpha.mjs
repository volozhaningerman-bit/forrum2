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

const page = fs.readFileSync(files.page, 'utf8');
const game = fs.readFileSync(files.game, 'utf8');
const css = fs.readFileSync(files.css, 'utf8');
const spec = fs.readFileSync(files.spec, 'utf8');

const itemCount = (game.match(/circulation:/g) ?? []).length;
const checks = [
  ['hidden route noindex', page.includes('index: false') && page.includes('follow: false')],
  ['16 equipment slots', (game.match(/label: '/g) ?? []).length >= 16],
  ['four rarity tiers', ['common', 'uncommon', 'rare', 'epic'].every((value) => game.includes(value))],
  ['20+ numbered items', itemCount >= 20 && game.includes('serial:') && game.includes('circulation:')],
  ['energy expedition flow', game.includes('sendExpedition') && game.includes('collectReturn') && game.includes('endsAt')],
  ['five Rust Outskirts depths', game.includes('Реакторная зона') && game.includes('Ломовые дворы') && game.includes('depthId')],
  ['loot pools by depth', game.includes('lootPools') && game.includes('lastDrops')],
  ['Iron Shepherd raid join', game.includes('Железный Пастырь') && game.includes('raidJoined')],
  ['category and syndicate preview', game.includes('Железный Герольд') && game.includes('Ядро Ковчега')],
  ['generated art files referenced', css.includes('/games/civilization/art-v3/hero-sprite-v3.webp') && css.includes('/games/civilization/art-v2/boss-sprite-v2.avif')],
  ['modular avatar appearance hooks', game.includes('appearanceClasses') && css.includes('.exp-avatar.has-chest-epic')],
  ['server authority documented', spec.includes('Server authority') && spec.includes('localStorage')],
  ['office styling explicitly excluded', spec.includes('not office / corporate styling')],
];

const failed = checks.filter(([, pass]) => !pass);
if (failed.length) {
  for (const [name] of failed) console.error(`FAIL: ${name}`);
  process.exit(1);
}

for (const [name] of checks) console.log(`PASS: ${name}`);
console.log(`Expedition alpha v2 checks passed. Item templates covered: ${itemCount}.`);

await import('./test-expedition-alpha-browser.mjs');
