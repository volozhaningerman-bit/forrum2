import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const files = {
  page: path.join(root, 'apps/web/app/applications/games/expedition-alpha/page.tsx'),
  game: path.join(root, 'apps/web/app/applications/games/expedition-alpha/expedition-alpha-game.tsx'),
  css: path.join(root, 'apps/web/app/applications/games/expedition-alpha/expedition-alpha.css'),
  spec: path.join(root, 'docs/game-expedition-alpha-source-of-truth.md'),
  client: path.join(root, 'apps/web/app/applications/games/expedition-alpha/expedition-client.ts'),
  controller: path.join(root, 'apps/api/src/expedition/expedition.controller.ts'),
  service: path.join(root, 'apps/api/src/expedition/expedition.service.ts'),
  heroArt: path.join(root, 'apps/web/public/games/expedition-alpha/hero-base.svg'),
  locationArt: path.join(root, 'apps/web/public/games/expedition-alpha/rust-outskirts.svg'),
  bossArt: path.join(root, 'apps/web/public/games/expedition-alpha/iron-shepherd.svg'),
  itemArt: path.join(root, 'apps/web/public/games/expedition-alpha/equipment-atlas.svg'),
};

for (const [name, file] of Object.entries(files)) {
  if (!fs.existsSync(file)) throw new Error(`Missing ${name}: ${file}`);
}

const page = fs.readFileSync(files.page, 'utf8');
const game = fs.readFileSync(files.game, 'utf8');
const css = fs.readFileSync(files.css, 'utf8');
const spec = fs.readFileSync(files.spec, 'utf8');
const client = fs.readFileSync(files.client, 'utf8');
const controller = fs.readFileSync(files.controller, 'utf8');
const service = fs.readFileSync(files.service, 'utf8');

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
  ['dedicated art pack referenced', css.includes('/games/expedition-alpha/hero-base.svg') && css.includes('/games/expedition-alpha/rust-outskirts.svg') && css.includes('/games/expedition-alpha/iron-shepherd.svg') && css.includes('/games/expedition-alpha/equipment-atlas.svg')],
  ['no civilization art dependency', !css.includes('/games/civilization/')],
  ['typed server client wired', client.includes("'/expedition/me'") && client.includes("'/expedition/runs'") && game.includes('serverMode') && game.includes('applyServerState')],
  ['server unequip contract', controller.includes("items/:id/unequip") && service.includes('async unequip(')],
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
