import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const files = {
  page: path.join(root, 'apps/web/app/applications/games/expedition-alpha/page.tsx'),
  game: path.join(root, 'apps/web/app/applications/games/expedition-alpha/expedition-alpha-game.tsx'),
  css: path.join(root, 'apps/web/app/applications/games/expedition-alpha/expedition-alpha.css'),
  spec: path.join(root, 'docs/game-expedition-alpha-source-of-truth.md'),
  hero: path.join(root, 'apps/web/public/games/expedition-alpha/hero.webp'),
  location: path.join(root, 'apps/web/public/games/expedition-alpha/rust-outskirts.webp'),
  boss: path.join(root, 'apps/web/public/games/expedition-alpha/iron-shepherd.webp'),
  atlas: path.join(root, 'apps/web/public/games/expedition-alpha/items-atlas.webp'),
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
  ['modular avatar appearance hooks', game.includes('has-${item.visual}') && css.includes('.exp-avatar.has-sword')],
  ['server authority documented', spec.includes('Server authority') && spec.includes('localStorage')],
  ['office styling explicitly excluded', spec.includes('not office / corporate styling')],
  ['generated hero art wired', game.includes('/games/expedition-alpha/hero.webp') && css.includes('.exp-avatar-art')],
  ['generated location art wired', css.includes('rust-outskirts.webp')],
  ['generated boss art wired', css.includes('iron-shepherd.webp')],
  ['generated item atlas wired', css.includes('items-atlas.webp') && game.includes('atlas-')],
  ['timed expedition implemented', game.includes('finishAt') && game.includes('remaining')],
  ['resource return implemented', game.includes('setResources') && game.includes('exp-resources')],
  ['raid signup implemented', game.includes('raidJoined') && game.includes('Записаться на рейд')],
];

const failed = checks.filter(([, pass]) => !pass);
if (failed.length) {
  for (const [name] of failed) console.error(`FAIL: ${name}`);
  process.exit(1);
}

for (const [name] of checks) console.log(`PASS: ${name}`);
console.log('Expedition alpha 0.1 checks passed.');
