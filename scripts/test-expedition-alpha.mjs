import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const files = {
  page: path.join(root, 'apps/web/app/applications/games/expedition-alpha/page.tsx'),
  game: path.join(root, 'apps/web/app/applications/games/expedition-alpha/expedition-alpha-game.tsx'),
  css: path.join(root, 'apps/web/app/applications/games/expedition-alpha/expedition-alpha.css'),
  spec: path.join(root, 'docs/game-expedition-alpha-source-of-truth.md'),
  service: path.join(root, 'apps/api/src/expedition/expedition.service.ts'),
  schema: path.join(root, 'apps/api/prisma/schema.prisma'),
  hero: path.join(root, 'apps/web/public/games/expedition-alpha/hero-base.svg'),
  location: path.join(root, 'apps/web/public/games/expedition-alpha/rust-outskirts.svg'),
  boss: path.join(root, 'apps/web/public/games/expedition-alpha/iron-shepherd.svg'),
  items: path.join(root, 'apps/web/public/games/expedition-alpha/equipment-atlas.svg'),
};

for (const [name, file] of Object.entries(files)) {
  if (!fs.existsSync(file)) throw new Error(`Missing ${name}: ${file}`);
}

const page = fs.readFileSync(files.page, 'utf8');
const game = fs.readFileSync(files.game, 'utf8');
const css = fs.readFileSync(files.css, 'utf8');
const spec = fs.readFileSync(files.spec, 'utf8');
const service = fs.readFileSync(files.service, 'utf8');
const schema = fs.readFileSync(files.schema, 'utf8');

const checks = [
  ['hidden route noindex', page.includes('index: false') && page.includes('follow: false')],
  ['authenticated server state', page.includes("requireUser('/applications/games/expedition-alpha')") && page.includes("serverApi<ExpeditionState>('/expedition/me')")],
  ['16 equipment slots', (game.match(/label: '/g) ?? []).length >= 16],
  ['exactly four Expedition rarities', schema.includes('enum ExpeditionItemRarity') && ['COMMON', 'UNCOMMON', 'RARE', 'EPIC'].every((value) => game.includes(value))],
  ['server expedition start', game.includes("api('/expedition/runs'") && game.includes('startExpedition')],
  ['server expedition claim', game.includes('/claim') && game.includes('claimRun')],
  ['server equip', game.includes('/expedition/items/') && game.includes('/equip')],
  ['five Rust Outskirts depths', game.includes('Реакторная зона') && game.includes('Ломовые дворы')],
  ['numbered server loot', service.includes('issuedCount') && service.includes('serialNumber') && service.includes('sourceKey')],
  ['resource persistence', schema.includes('oldParts') && service.includes('resources.metal') && service.includes('resources.oldParts')],
  ['dedicated hero art', css.includes('/games/expedition-alpha/hero-base.svg')],
  ['dedicated location art', css.includes('/games/expedition-alpha/rust-outskirts.svg')],
  ['dedicated boss art', css.includes('/games/expedition-alpha/iron-shepherd.svg')],
  ['dedicated equipment art', css.includes('/games/expedition-alpha/equipment-atlas.svg')],
  ['no Civilization art dependency', !css.includes('/games/civilization/')],
  ['modular avatar appearance', game.includes('appearanceClasses') && css.includes('.exp-avatar.has-chest')],
  ['Iron Shepherd visible', game.includes('Железный Пастырь')],
  ['shared raid API wired', game.includes("'/expedition/raid'") && game.includes("'/expedition/raid/join'") && service.includes('joinRaid') && service.includes('raidState')],
  ['raid schema present', schema.includes('model ExpeditionRaid') && schema.includes('model ExpeditionRaidParticipant')],
  ['category and syndicate roadmap visible', game.includes('Железный Герольд') && game.includes('Ядро Ковчега')],
  ['server authority documented', spec.includes('Server authority') && spec.includes('localStorage')],
  ['office styling excluded', spec.includes('not office / corporate styling')],
];

const failed = checks.filter(([, pass]) => !pass);
if (failed.length) {
  for (const [name] of failed) console.error(`FAIL: ${name}`);
  process.exit(1);
}

for (const [name] of checks) console.log(`PASS: ${name}`);
console.log('Expedition alpha 0.1 server/art checks passed.');
