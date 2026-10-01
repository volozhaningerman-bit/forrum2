import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const root = new URL('../', import.meta.url).pathname;
const output = root + 'test-results/expedition-alpha';
await mkdir(output, { recursive: true });

const files = {
  page: path.join(root, 'apps/web/app/applications/games/expedition-alpha/page.tsx'),
  game: path.join(root, 'apps/web/app/applications/games/expedition-alpha/expedition-alpha-game.tsx'),
  appearance: path.join(root, 'apps/web/app/applications/games/expedition-alpha/expedition-appearance.tsx'),
  femaleArtData: path.join(root, 'apps/web/app/applications/games/expedition-alpha/expedition-art-v09.ts'),
  css: path.join(root, 'apps/web/app/applications/games/expedition-alpha/expedition-alpha.css'),
  spec: path.join(root, 'docs/game-expedition-alpha-source-of-truth.md'),
  client: path.join(root, 'apps/web/app/applications/games/expedition-alpha/expedition-client.ts'),
  controller: path.join(root, 'apps/api/src/expedition/expedition.controller.ts'),
  service: path.join(root, 'apps/api/src/expedition/expedition.service.ts'),
  schema: path.join(root, 'apps/api/prisma/schema.prisma'),
  heroArt: path.join(root, 'apps/web/public/games/expedition-alpha/art-v09/hero-base.webp'),
  locationArt: path.join(root, 'apps/web/public/games/expedition-alpha/art-v09/rust-outskirts.webp'),
  bossArt: path.join(root, 'apps/web/public/games/expedition-alpha/art-v09/iron-shepherd.webp'),
  itemArt: path.join(root, 'apps/web/public/games/expedition-alpha/equipment-atlas.svg'),
  stage2ItemArt: path.join(root, 'apps/web/public/games/expedition-alpha/equipment-icons-v10.svg'),
  stage2PaperDollArt: path.join(root, 'apps/web/public/games/expedition-alpha/equipment-paperdoll-v10.svg'),
};

for (const [name, file] of Object.entries(files)) {
  if (!fs.existsSync(file)) throw new Error(`Missing ${name}: ${file}`);
}

const pageSource = fs.readFileSync(files.page, 'utf8');
const gameSource = fs.readFileSync(files.game, 'utf8');
const appearanceSource = fs.readFileSync(files.appearance, 'utf8');
const femaleArtSource = fs.readFileSync(files.femaleArtData, 'utf8');
const cssSource = fs.readFileSync(files.css, 'utf8');
const specSource = fs.readFileSync(files.spec, 'utf8');
const clientSource = fs.readFileSync(files.client, 'utf8');
const controllerSource = fs.readFileSync(files.controller, 'utf8');
const serviceSource = fs.readFileSync(files.service, 'utf8');
const schemaSource = fs.readFileSync(files.schema, 'utf8');

const itemCount = (gameSource.match(/circulation:/g) ?? []).length;
const staticChecks = [
  ['hidden route noindex', pageSource.includes('index: false') && pageSource.includes('follow: false')],
  ['16 equipment slots', (gameSource.match(/label: '/g) ?? []).length >= 16],
  ['five rarity tiers', ['common', 'uncommon', 'rare', 'legendary', 'relic'].every((value) => gameSource.includes(value)) && gameSource.includes('Легендарный') && gameSource.includes('Реликтовый')],
  ['20+ numbered items', itemCount >= 20 && gameSource.includes('serial:') && gameSource.includes('circulation:')],
  ['server loot covers all 16 slots', (serviceSource.match(/slot: '/g) ?? []).length >= 16 && ['HEAD','NECK','SHOULDERS','CLOAK','CHEST','WRISTS','GLOVES','BELT','LEGS','FEET','RING_1','RING_2','RELIC_1','RELIC_2','MAIN_HAND','OFF_HAND'].every((slot) => serviceSource.includes(`slot: '${slot}'`))],
  ['energy expedition flow', gameSource.includes('sendExpedition') && gameSource.includes('collectReturn') && gameSource.includes('endsAt')],
  ['five Rust Outskirts depths', gameSource.includes('Реакторная зона') && gameSource.includes('Ломовые дворы') && gameSource.includes('depthId')],
  ['Iron Shepherd raid join', gameSource.includes('Железный Пастырь') && gameSource.includes('raidJoined')],
  ['category and syndicate preview', gameSource.includes('Железный Герольд') && gameSource.includes('Ядро Ковчега')],
  ['live-safe art pack referenced', cssSource.includes('/games/expedition-alpha/art-v09/hero-base.webp') && cssSource.includes('/games/expedition-alpha/art-v09/rust-outskirts.webp') && cssSource.includes('/games/expedition-alpha/art-v09/iron-shepherd.webp') && cssSource.includes('/games/expedition-alpha/equipment-atlas.svg')],
  ['v0.6 reference composition', cssSource.includes('EXPEDITION ALPHA V0.6') && cssSource.includes('champion-herald-v06.svg') && cssSource.includes('ark-core-v06.svg')],
  ['scalable appearance compositor wired', gameSource.includes('ExpeditionAppearanceCompositor') && gameSource.includes('appearanceId') && appearanceSource.includes('familyByVisual') && appearanceSource.includes('defaultFamilyBySlot') && appearanceSource.includes('data-channel="torso"') && appearanceSource.includes('data-channel="effect"')],
  ['single compositor replaces per-slot body layers', !gameSource.includes('exp-gear exp-gear-cloak') && !gameSource.includes('exp-world-gear exp-world-gear-head') && cssSource.includes('EXPEDITION ALPHA 0.14 — SCALABLE APPEARANCE COMPOSITOR')],
  ['stage two inventory icon atlas retained', gameSource.includes('EXPEDITION_EQUIPMENT_ICONS_V12') && cssSource.includes('--exp-item-art') && cssSource.includes('.art-24') && gameSource.includes("visual:'consul-mask', art:2") && gameSource.includes("visual:'shield', art:24")],
  ['appearance families are reusable and slot-fallback safe', appearanceSource.includes("head.hood") && appearanceSource.includes("torso.light") && appearanceSource.includes("weapon.sword") && appearanceSource.includes("defaultFamilyBySlot")],
  ['rarity decorates reusable appearance families', appearanceSource.includes("legendary:") && appearanceSource.includes("relic:") && appearanceSource.includes("data-rarity") && cssSource.includes('EXPEDITION ALPHA 0.15 — RARITY-DRIVEN APPEARANCE')],
  ['server supports scarce relic tier', schemaSource.includes('RELIC') && serviceSource.includes("rarity: 'RELIC'") && serviceSource.includes("circulationCap: 7")],
  ['server grants starter inventory idempotently', serviceSource.includes('STARTER_TEMPLATE_IDS') && serviceSource.includes('ensureStarterItems(actorId)') && serviceSource.includes('starter:${actorId}:${templateId}') && serviceSource.includes("isolationLevel: 'Serializable'")],
  ['female raster edges are feathered', cssSource.includes('EXPEDITION ALPHA 0.15.1 — PRODUCTION QA HOTFIX') && cssSource.includes('data-character-body="female"') && cssSource.includes('mask-image:radial-gradient')],
  ['no transmog system', !gameSource.toLowerCase().includes('transmog') && !appearanceSource.toLowerCase().includes('transmog')],
  ['distinct visible neck art', serviceSource.includes("name: 'Око Архивариуса'") && serviceSource.includes("visualKey: 'neck-eye'") && gameSource.includes("'neck-eye': 4")],
  ['world hero uses live-safe art', gameSource.includes('exp-world-hero') && cssSource.includes('/games/expedition-alpha/art-v09/hero-base.webp')],
  ['male and female base heroes wired', gameSource.includes("characterBody") && gameSource.includes('EXPEDITION_FEMALE_HERO_V09') && femaleArtSource.includes('data:image/webp;base64,UklGR') && cssSource.includes('--exp-hero-art')],
  ['no civilization art dependency', !cssSource.includes('/games/civilization/')],
  ['typed server client wired', clientSource.includes("'/expedition/me'") && clientSource.includes("'/expedition/runs'") && gameSource.includes('serverMode') && gameSource.includes('applyServerState')],
  ['server unequip contract', controllerSource.includes("items/:id/unequip") && serviceSource.includes('async unequip(')],
  ['server raid contract', controllerSource.includes("raid/current/join") && controllerSource.includes("raid/current/leave") && serviceSource.includes('async joinRaid(') && schemaSource.includes('model ExpeditionRaidParticipant')],
  ['persistent expedition resources', schemaSource.includes('scrap           Int') && schemaSource.includes('cloth           Int') && schemaSource.includes('oldParts        Int') && serviceSource.includes('scrap: { increment: resources.scrap }')],
  ['claim skips exhausted templates', serviceSource.includes('for (const candidate of orderedCandidates)') && serviceSource.includes('Тираж доступной добычи для этой глубины исчерпан')],
  ['run start is serializable', serviceSource.includes("isolationLevel: 'Serializable'") && serviceSource.includes('pendingInside')],
  ['server authority documented', specSource.includes('Server authority') && specSource.includes('localStorage')],
  ['office styling explicitly excluded', specSource.includes('not office / corporate styling')],
];

for (const [name, pass] of staticChecks) {
  assert(pass, `Static check failed: ${name}`);
  console.log(`PASS: ${name}`);
}

const starter = {
  id: 'item-hood-1',
  templateId: 'exp_head_hood',
  name: 'Капюшон Собирателя',
  slot: 'HEAD',
  rarity: 'COMMON',
  serialNumber: 1,
  circulation: 5000,
  power: 2,
  visualKey: 'hood',
  equipped: false,
  acquiredAt: new Date().toISOString(),
};

const paperDollFixtures = [
  { id:'item-neck-1', templateId:'exp_neck_traveler', name:'Печать Путника', slot:'NECK', rarity:'COMMON', serialNumber:2, circulation:8000, power:2, visualKey:'neck', equipped:false, acquiredAt:new Date().toISOString() },
  { id:'item-shoulders-1', templateId:'exp_shoulders_border', name:'Наплечники Рубежа', slot:'SHOULDERS', rarity:'RARE', serialNumber:3, circulation:650, power:7, visualKey:'shoulders', equipped:false, acquiredAt:new Date().toISOString() },
  { id:'item-cloak-1', templateId:'exp_cloak_blue', name:'Плащ Синего Знамени', slot:'CLOAK', rarity:'RARE', serialNumber:4, circulation:500, power:8, visualKey:'cloak-blue', equipped:false, acquiredAt:new Date().toISOString() },
  { id:'item-chest-1', templateId:'exp_chest_guard', name:'Панцирь Старой Стражи', slot:'CHEST', rarity:'UNCOMMON', serialNumber:5, circulation:2500, power:5, visualKey:'chest-guard', equipped:false, acquiredAt:new Date().toISOString() },
  { id:'item-wrists-1', templateId:'exp_wrists_seeker', name:'Наручи Искателя', slot:'WRISTS', rarity:'COMMON', serialNumber:6, circulation:6000, power:2, visualKey:'wrists', equipped:false, acquiredAt:new Date().toISOString() },
  { id:'item-belt-1', templateId:'exp_belt_mechanic', name:'Пояс Механика', slot:'BELT', rarity:'UNCOMMON', serialNumber:7, circulation:3500, power:4, visualKey:'belt', equipped:false, acquiredAt:new Date().toISOString() },
  { id:'item-legs-1', templateId:'exp_legs_dust', name:'Штаны Пыльной Тропы', slot:'LEGS', rarity:'COMMON', serialNumber:8, circulation:9000, power:2, visualKey:'legs', equipped:false, acquiredAt:new Date().toISOString() },
  { id:'item-boots-1', templateId:'exp_boots_iron', name:'Сапоги Железного Шага', slot:'FEET', rarity:'UNCOMMON', serialNumber:9, circulation:3000, power:4, visualKey:'boots', equipped:false, acquiredAt:new Date().toISOString() },
  { id:'item-ring-1', templateId:'exp_ring_alloy', name:'Кольцо Старого Сплава', slot:'RING_1', rarity:'COMMON', serialNumber:10, circulation:12000, power:2, visualKey:'ring', equipped:false, acquiredAt:new Date().toISOString() },
  { id:'item-ring-2', templateId:'exp_ring_reactor', name:'Перстень Реакторщика', slot:'RING_2', rarity:'RARE', serialNumber:11, circulation:800, power:6, visualKey:'ring-blue', equipped:false, acquiredAt:new Date().toISOString() },
  { id:'item-relic-1', templateId:'exp_relic_shard', name:'Осколок Реактора', slot:'RELIC_1', rarity:'UNCOMMON', serialNumber:12, circulation:3000, power:5, visualKey:'relic', equipped:false, acquiredAt:new Date().toISOString() },
  { id:'item-relic-2', templateId:'exp_relic_beacon', name:'Сердце Маяка', slot:'RELIC_2', rarity:'EPIC', serialNumber:13, circulation:60, power:14, visualKey:'relic-epic', equipped:false, acquiredAt:new Date().toISOString() },
  { id:'item-prism-1', templateId:'exp_relic_prism', name:'Призматический Осколок Рассвета', slot:'RELIC_2', rarity:'RELIC', serialNumber:3, circulation:7, power:22, visualKey:'relic-prismatic', equipped:false, acquiredAt:new Date().toISOString() },
  { id:'item-main-1', templateId:'exp_sword_contour', name:'Клинок Последнего Контура', slot:'MAIN_HAND', rarity:'RARE', serialNumber:14, circulation:400, power:11, visualKey:'sword-blue', equipped:false, acquiredAt:new Date().toISOString() },
  { id:'item-off-1', templateId:'exp_shield_barrier', name:'Щит Заслона', slot:'OFF_HAND', rarity:'RARE', serialNumber:15, circulation:300, power:9, visualKey:'shield', equipped:false, acquiredAt:new Date().toISOString() },
];

const rewardItem = {
  id: 'item-gloves-17',
  templateId: 'exp_gloves_servo',
  name: 'Перчатки Сервомастера',
  slot: 'GLOVES',
  rarity: 'UNCOMMON',
  serialNumber: 17,
  circulation: 4000,
  power: 4,
  visualKey: 'gloves',
  equipped: false,
  acquiredAt: new Date().toISOString(),
};

let state = {
  profile: {
    level: 1,
    xp: 0,
    energy: 12,
    maxEnergy: 12,
    unlockedDepth: 3,
    power: 13,
    resources: { scrap: 7, cloth: 4, oldParts: 2 },
  },
  run: null,
  raid: {
    id: 'raid-browser-1',
    bossKey: 'iron-shepherd',
    startsAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    minParticipants: 5,
    maxParticipants: 10,
    participantCount: 7,
    joined: false,
  },
  inventory: [starter, ...paperDollFixtures],
};

function json(res, status, data) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

async function readBody(req) {
  let raw = '';
  for await (const chunk of req) raw += chunk;
  return raw ? JSON.parse(raw) : {};
}

const upstream = createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');

  if (url.pathname === '/v1/auth/me') {
    return json(res, 200, {
      user: {
        id: 'viewer',
        username: 'viewer',
        displayName: 'Игрок',
        emailVerified: true,
        onboardingCompleted: true,
        role: 'OWNER',
      },
    });
  }
  if (url.pathname === '/v1/communities') return json(res, 200, []);
  if (url.pathname === '/v1/notifications/unread-count') return json(res, 200, { count: 0 });

  if (url.pathname === '/v1/expedition/me' && req.method === 'GET') {
    if (state.run && Date.now() >= new Date(state.run.readyAt).getTime()) {
      state = { ...state, run: { ...state.run, status: 'READY', secondsLeft: 0 } };
    } else if (state.run) {
      state = {
        ...state,
        run: {
          ...state.run,
          secondsLeft: Math.max(0, Math.ceil((new Date(state.run.readyAt).getTime() - Date.now()) / 1000)),
        },
      };
    }
    return json(res, 200, state);
  }

  if (url.pathname === '/v1/expedition/runs' && req.method === 'POST') {
    const body = await readBody(req);
    const depth = Number(body.depth || 1);
    const readyAt = new Date(Date.now() + 1200).toISOString();
    state = {
      ...state,
      profile: { ...state.profile, energy: state.profile.energy - (depth === 1 ? 1 : 2) },
      run: {
        id: 'run-browser-1',
        depth,
        energyCost: depth === 1 ? 1 : 2,
        status: 'ACTIVE',
        startedAt: new Date().toISOString(),
        readyAt,
        secondsLeft: 2,
      },
    };
    return json(res, 201, { ok: true, run: state.run });
  }

  if (url.pathname === '/v1/expedition/runs/run-browser-1/claim' && req.method === 'POST') {
    state = {
      ...state,
      profile: {
        ...state.profile,
        xp: 40,
        unlockedDepth: 3,
        resources: {
          scrap: state.profile.resources.scrap + 13,
          cloth: state.profile.resources.cloth + 5,
          oldParts: state.profile.resources.oldParts,
        },
      },
      run: null,
      inventory: [...state.inventory, rewardItem],
    };
    return json(res, 201, {
      ok: true,
      reward: {
        xp: 40,
        resources: { scrap: 13, cloth: 5, oldParts: 0 },
        itemId: rewardItem.id,
        templateId: rewardItem.templateId,
        serialNumber: rewardItem.serialNumber,
        item: rewardItem,
      },
      profile: { level: 1, xp: 40, unlockedDepth: 3 },
    });
  }

  if (url.pathname === '/v1/expedition/raid/current/join' && req.method === 'POST') {
    state = {
      ...state,
      raid: {
        ...state.raid,
        joined: true,
        participantCount: Math.min(state.raid.maxParticipants, state.raid.participantCount + (state.raid.joined ? 0 : 1)),
      },
    };
    return json(res, 201, state.raid);
  }

  if (url.pathname === '/v1/expedition/raid/current/leave' && req.method === 'POST') {
    state = {
      ...state,
      raid: {
        ...state.raid,
        participantCount: Math.max(0, state.raid.participantCount - (state.raid.joined ? 1 : 0)),
        joined: false,
      },
    };
    return json(res, 201, state.raid);
  }

  const equipMatch = url.pathname.match(/^\/v1\/expedition\/items\/([^/]+)\/(equip|unequip)$/);
  if (equipMatch && req.method === 'POST') {
    const [, id, action] = equipMatch;
    const target = state.inventory.find((item) => item.id === id);
    if (!target) return json(res, 404, { message: 'Предмет не найден' });
    state = {
      ...state,
      inventory: state.inventory.map((item) => {
        if (action === 'equip') {
          if (item.slot === target.slot) return { ...item, equipped: item.id === id };
          return item;
        }
        return item.id === id ? { ...item, equipped: false } : item;
      }),
    };
    return json(res, 201, state);
  }

  return json(res, 200, {});
});

await new Promise((resolve) => upstream.listen(0, '127.0.0.1', resolve));
const apiPort = upstream.address().port;
const port = Number(process.env.EXPEDITION_TEST_PORT || 3137);
const web = spawn(
  process.execPath,
  [root + 'node_modules/next/dist/bin/next', 'start', '--hostname', '127.0.0.1', '--port', String(port)],
  {
    cwd: root + 'apps/web',
    env: {
      ...process.env,
      NEXT_TELEMETRY_DISABLED: '1',
      API_INTERNAL_URL: 'http://127.0.0.1:' + apiPort,
    },
    stdio: ['ignore', 'pipe', 'pipe'],
  },
);

let logs = '';
web.stdout.on('data', (chunk) => (logs += chunk));
web.stderr.on('data', (chunk) => (logs += chunk));

let browser;
try {
  for (let n = 0; n < 120; n += 1) {
    try {
      const response = await fetch('http://127.0.0.1:' + port + '/applications/games/expedition-alpha');
      if (response.ok) break;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (n === 119) throw new Error('Next did not start: ' + logs);
  }

  for (const asset of [
    '/games/expedition-alpha/art-v09/hero-base.webp',
    '/games/expedition-alpha/art-v09/rust-outskirts.webp',
    '/games/expedition-alpha/art-v09/iron-shepherd.webp',
    '/games/expedition-alpha/equipment-atlas.svg',
    '/games/expedition-alpha/equipment-icons-v10.svg',
    '/games/expedition-alpha/equipment-paperdoll-v10.svg',
    '/games/expedition-alpha/equipment-rig-v13.svg',
  ]) {
    const response = await fetch('http://127.0.0.1:' + port + asset);
    assert.equal(response.status, 200, `asset missing: ${asset}`);
  }

  browser = await chromium.launch({ headless: true, ...(process.env.PLAYWRIGHT_EXECUTABLE_PATH ? { executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH, args: ['--no-sandbox'] } : {}) });
  const context = await browser.newContext({
    viewport: { width: 1720, height: 900 },
    deviceScaleFactor: 1,
  });
  await context.addCookies([
    { name: 'forrum_test', value: 'viewer', domain: '127.0.0.1', path: '/' },
  ]);

  const page = await context.newPage();
  const pageErrors = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));

  await page.goto('http://127.0.0.1:' + port + '/applications/games/expedition-alpha', { waitUntil: 'networkidle' });
  await page.getByText('серверный прогресс').waitFor();

  const metrics = await page.evaluate(() => {
    const layout = document.querySelector('.exp-layout')?.getBoundingClientRect();
    const location = document.querySelector('.exp-location-art')?.getBoundingClientRect();
    return {
      width: innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      game: Boolean(document.querySelector('[data-testid="expedition-alpha"]')),
      avatar: Boolean(document.querySelector('.exp-avatar-art')),
      location: Boolean(document.querySelector('.exp-location-art')),
      boss: Boolean(document.querySelector('.exp-boss-crop')),
      avatarBg: getComputedStyle(document.querySelector('.exp-avatar-art')).backgroundImage,
      locationBg: getComputedStyle(document.querySelector('.exp-location-art')).backgroundImage,
      bossBg: getComputedStyle(document.querySelector('.exp-boss-crop')).backgroundImage,
      bossDisplay: getComputedStyle(document.querySelector('.exp-boss-crop')).display,
      raidDisplay: getComputedStyle(document.querySelector('.exp-raid')).display,
      raidButtonVisible: (() => { const el=document.querySelector('.exp-raid-copy button'); if(!el) return false; const r=el.getBoundingClientRect(); const s=getComputedStyle(el); return r.width>0 && r.height>0 && s.display!=='none' && s.visibility!=='hidden'; })(),
      championArtDisplay: getComputedStyle(document.querySelector('.exp-champion'),'::before').display,
      relicArtDisplay: getComputedStyle(document.querySelector('.exp-relic'),'::before').display,
      slots: document.querySelectorAll('.exp-slots button').length,
      rarityKeys: document.querySelectorAll('.exp-rarity-key > span').length,
      layoutHeight: layout?.height ?? 9999,
      locationHeight: location?.height ?? 0,
      inventoryActionCount: document.querySelectorAll('.exp-item-action').length,
      slotAffordanceCount: document.querySelectorAll('.exp-slots button i').length,
      portraitCompositors: document.querySelectorAll('.exp-avatar .exp-appearance-compositor').length,
      worldCompositors: document.querySelectorAll('.exp-world-hero .exp-appearance-compositor').length,
      legacyPortraitGearLayers: document.querySelectorAll('.exp-avatar .exp-gear').length,
      legacyWorldGearLayers: document.querySelectorAll('.exp-world-hero .exp-world-gear').length,
      inventoryIconBg: getComputedStyle(document.querySelector('.exp-item-icon')).backgroundImage,
      characterRect: (() => { const r=document.querySelector('.exp-character')?.getBoundingClientRect(); return r ? {left:r.left,right:r.right,top:r.top,bottom:r.bottom} : null; })(),
      centerRect: (() => { const el=document.querySelector('.exp-center'); if(!el) return null; const r=el.getBoundingClientRect(); return {left:r.left,right:r.right,top:r.top,bottom:r.bottom,display:getComputedStyle(el).display}; })(),
      inventoryRect: (() => { const r=document.querySelector('.exp-inventory')?.getBoundingClientRect(); return r ? {left:r.left,right:r.right,top:r.top,bottom:r.bottom} : null; })(),
      raidRect: (() => { const r=document.querySelector('.exp-raid')?.getBoundingClientRect(); return r ? {left:r.left,right:r.right,top:r.top,bottom:r.bottom} : null; })(),
      locationRect: (() => { const r=document.querySelector('.exp-location')?.getBoundingClientRect(); return r ? {left:r.left,right:r.right,top:r.top,bottom:r.bottom} : null; })(),
    };
  });
  assert(metrics.game && metrics.avatar && metrics.location && metrics.boss, 'core visual surfaces missing');
  assert(metrics.avatarBg.includes('hero-base.webp'), 'hero art must render from production WebP');
  assert(metrics.locationBg.includes('rust-outskirts.webp'), 'location art must render from production WebP');
  assert(metrics.bossBg.includes('iron-shepherd.webp') && metrics.bossDisplay !== 'none', 'boss art must be visibly rendered');
  assert.equal(metrics.raidDisplay, 'grid', 'desktop raid must render as a dedicated objective card');
  assert(metrics.raidButtonVisible, 'raid action must remain visible and clickable');
  assert.notEqual(metrics.championArtDisplay, 'none', 'Champion art must be rendered');
  assert.notEqual(metrics.relicArtDisplay, 'none', 'Ark Core art must be rendered');
  assert.equal(metrics.slots, 16, 'all 16 equipment slots must remain available');
  assert.equal(metrics.rarityKeys, 5, 'inventory must expose all five rarity tiers');
  assert(metrics.locationHeight >= 420, `game world too small: ${metrics.locationHeight}px`);
  assert(metrics.inventoryActionCount >= 1, 'inventory items must expose an equip affordance');
  assert.equal(metrics.slotAffordanceCount, 16, 'all equipment slots must expose an empty/remove affordance');
  assert.equal(metrics.portraitCompositors, 0, 'clean starter must not allocate an empty portrait compositor');
  assert.equal(metrics.worldCompositors, 0, 'clean starter must not allocate an empty world compositor');
  assert.equal(metrics.legacyPortraitGearLayers, 0, 'legacy portrait paper-doll nodes must be removed');
  assert.equal(metrics.legacyWorldGearLayers, 0, 'legacy world paper-doll nodes must be removed');
  assert(metrics.inventoryIconBg.includes('data:image/webp;base64,'), 'inventory must render the high-detail Stage 2 WebP atlas');
  assert(metrics.layoutHeight <= 790, `1720 desktop composition is too tall: ${metrics.layoutHeight}px`);
  assert(metrics.characterRect && metrics.inventoryRect && metrics.locationRect && metrics.inventoryRect.left <= metrics.characterRect.right + 2 && metrics.inventoryRect.right <= metrics.locationRect.left + 2, 'inventory must stay under the character in the left rail');
  assert(metrics.raidRect && metrics.locationRect && metrics.raidRect.left >= metrics.locationRect.right - 2, 'raid must stay in the right rail beside the world');
  assert(metrics.scrollWidth <= metrics.width + 2, `horizontal overflow ${metrics.scrollWidth}/${metrics.width}`);

  const starterLayerState = await page.evaluate(() => ({
    portraitCompositor:document.querySelectorAll('.exp-avatar .exp-appearance-compositor').length,
    worldCompositor:document.querySelectorAll('.exp-world-hero .exp-appearance-compositor').length,
    avatarAnimation:getComputedStyle(document.querySelector('.exp-avatar-art')).animationName,
    worldAnimation:getComputedStyle(document.querySelector('.exp-world-hero-base')).animationName,
  }));
  assert.equal(starterLayerState.portraitCompositor, 0, 'clean starter must not allocate a portrait appearance surface');
  assert.equal(starterLayerState.worldCompositor, 0, 'clean starter must not allocate a world appearance surface');
  assert.equal(starterLayerState.avatarAnimation, 'none', 'portrait base and appearance compositor must stay on one rig frame');
  assert.equal(starterLayerState.worldAnimation, 'none', 'world base and appearance compositor must stay on one rig frame');
  await page.screenshot({ path: output + '/expedition-alpha-v015-clean-base-1720x900.png', fullPage: true });

  const rigChecks = [
    { name:/Капюшон Собирателя/, channel:'head' },
    { name:/Печать Путника/, channel:'torso' },
    { name:/Наплечники Рубежа/, channel:'torso' },
    { name:/Плащ Синего Знамени/, channel:'cloak' },
    { name:/Панцирь Старой Стражи/, channel:'torso' },
    { name:/Наручи Искателя/, channel:'arms' },
    { name:/Пояс Механика/, channel:'torso' },
    { name:/Штаны Пыльной Тропы/, channel:'legs' },
    { name:/Сапоги Железного Шага/, channel:'feet' },
    { name:/Кольцо Старого Сплава/, channel:'effect' },
    { name:/Перстень Реакторщика/, channel:'effect' },
    { name:/Осколок Реактора/, channel:'effect' },
    { name:/Сердце Маяка/, channel:'effect' },
    { name:/Призматический Осколок Рассвета/, channel:'effect' },
    { name:/Клинок Последнего Контура/, channel:'mainHand' },
    { name:/Щит Заслона/, channel:'offHand' },
  ];
  for (const check of rigChecks) {
    await page.getByRole('button', { name: check.name }).first().click();
    await page.waitForTimeout(120);
    const portrait = page.locator('.exp-avatar .exp-appearance-compositor');
    const world = page.locator('.exp-world-hero .exp-appearance-compositor');
    await portrait.waitFor({ timeout: 5000 });
    await world.waitFor({ timeout: 5000 });
    assert(await portrait.locator('[data-channel="' + check.channel + '"]').count() >= 1, check.name + ' must activate its portrait appearance channel');
    assert(await world.locator('[data-channel="' + check.channel + '"]').count() >= 1, check.name + ' must activate its world appearance channel');
  }

  const equippedHero = await page.evaluate(() => {
    const portrait=document.querySelector('.exp-avatar .exp-appearance-compositor');
    const world=document.querySelector('.exp-world-hero .exp-appearance-compositor');
    const portraitRect=portrait?.getBoundingClientRect();
    const worldRect=world?.getBoundingClientRect();
    return {
      portraitCompositors:document.querySelectorAll('.exp-avatar .exp-appearance-compositor').length,
      worldCompositors:document.querySelectorAll('.exp-world-hero .exp-appearance-compositor').length,
      portraitChannels:portrait?.querySelectorAll('[data-channel]').length ?? 0,
      worldChannels:world?.querySelectorAll('[data-channel]').length ?? 0,
      portraitActive:Number(portrait?.getAttribute('data-active-channels') || 0),
      worldActive:Number(world?.getAttribute('data-active-channels') || 0),
      portraitRatio:portraitRect ? portraitRect.width / portraitRect.height : 0,
      worldRatio:worldRect ? worldRect.width / worldRect.height : 0,
      equippedSlots:document.querySelectorAll('.exp-slots button.equipped').length,
      legacyLayers:document.querySelectorAll('.exp-gear,.exp-world-gear').length,
      relicEffectRarity:document.querySelector('.exp-world-hero .exp-appearance-compositor [data-channel="effect"]')?.getAttribute('data-rarity') ?? '',
    };
  });
  assert.equal(equippedHero.portraitCompositors, 1, 'portrait must use one composite appearance surface');
  assert.equal(equippedHero.worldCompositors, 1, 'world hero must use one composite appearance surface');
  assert(equippedHero.portraitChannels <= 9 && equippedHero.worldChannels <= 9, 'appearance must stay within the small reusable channel budget');
  assert(equippedHero.portraitActive <= 9 && equippedHero.worldActive <= 9, 'active appearance channel count must stay bounded');
  assert(Math.abs(equippedHero.portraitRatio-(2/3)) < .03, 'portrait compositor must preserve the 2:3 hero canvas');
  assert(Math.abs(equippedHero.worldRatio-(2/3)) < .03, 'world compositor must preserve the 2:3 hero canvas');
  assert(equippedHero.equippedSlots >= 10, 'equipment must remain represented in the 16-slot grid');
  assert.equal(equippedHero.legacyLayers, 0, 'legacy per-slot body overlays must not return');
  assert.equal(equippedHero.relicEffectRarity, 'relic', 'prismatic relic must drive the effect channel rarity');
  await page.screenshot({ path: output + '/expedition-alpha-v015-mixed-kit-1720x900.png', fullPage: true });

  const femaleToggle = page.getByRole('button', { name: 'Женский герой' });
  await femaleToggle.click();
  await page.locator('[data-testid="expedition-alpha"][data-character-body="female"]').waitFor();
  const femaleHero = await page.evaluate(() => ({
    avatarBg: getComputedStyle(document.querySelector('.exp-avatar-art')).backgroundImage,
    worldBg: getComputedStyle(document.querySelector('.exp-world-hero-base')).backgroundImage,
  }));
  assert(femaleHero.avatarBg.includes('data:image/webp;base64,'), 'female portrait must render from the approved WebP base');
  assert(femaleHero.worldBg.includes('data:image/webp;base64,'), 'female world hero must stay synchronized with the portrait');
  const femaleRig = await page.evaluate(() => ({
    portrait:document.querySelectorAll('.exp-avatar .exp-appearance-compositor').length,
    world:document.querySelectorAll('.exp-world-hero .exp-appearance-compositor').length,
  }));
  assert.equal(femaleRig.portrait, 0, 'female base must stay clean until a dedicated female appearance geometry exists');
  assert.equal(femaleRig.world, 0, 'female world hero must stay clean until a dedicated female appearance geometry exists');
  await page.screenshot({ path: output + '/expedition-alpha-v015-female-1720x900.png', fullPage: true });
  await page.getByRole('button', { name: 'Мужской герой' }).click();
  await page.locator('[data-testid="expedition-alpha"][data-character-body="male"]').waitFor();

  await page.screenshot({ path: output + '/expedition-alpha-v015-1720x900.png', fullPage: true });

  const raidJoin = page.getByRole('button', { name: 'Отправить персонажа' });
  await raidJoin.click();
  await page.getByRole('button', { name: 'Вы записаны' }).waitFor();
  await page.getByText('8/10').waitFor();

  await page.getByRole('button', { name: /Отправить героя/ }).click();
  await page.getByText('Персонаж в пути').waitFor();
  await page.getByRole('button', { name: 'Забрать добычу' }).waitFor({ timeout: 8000 });
  await page.getByRole('button', { name: 'Забрать добычу' }).click();

  const drop = page.getByRole('button', { name: /Перчатки Сервомастера/ }).first();
  await drop.waitFor();
  await drop.click();
  await page.getByText('Перчатки Сервомастера').first().waitFor();
  await page.waitForTimeout(250);
  const portraitArms = page.locator('.exp-avatar .exp-appearance-compositor [data-channel="arms"]');
  const worldArms = page.locator('.exp-world-hero .exp-appearance-compositor [data-channel="arms"]');
  assert(await portraitArms.count() >= 1, 'equipped gloves must activate the shared portrait arms channel');
  assert(await worldArms.count() >= 1, 'equipped gloves must activate the shared world arms channel');
  const equippedGloveSlot = page.locator('.exp-slots button.equipped').filter({ hasText: 'Перчатки Сервомастера' });
  assert(await equippedGloveSlot.count() >= 1, 'equipped gloves must remain visibly represented in the equipment grid');
  const socialArt = await page.evaluate(() => ({
    champion: getComputedStyle(document.querySelector('.exp-champion'), '::before').display,
    relic: getComputedStyle(document.querySelector('.exp-relic'), '::before').display,
  }));
  assert.notEqual(socialArt.champion, 'none', 'champion art must be visible');
  assert.notEqual(socialArt.relic, 'none', 'relic art must be visible');

  await page.screenshot({ path: output + '/expedition-alpha-v015-loot-equipped-1720x900.png', fullPage: true });

  await page.setViewportSize({ width: 1366, height: 768 });
  await page.screenshot({ path: output + '/expedition-alpha-v015-1366x768.png', fullPage: true });
  const mobileish = await page.evaluate(() => ({
    width: innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  assert(mobileish.scrollWidth <= mobileish.width + 2, `1366 horizontal overflow ${mobileish.scrollWidth}/${mobileish.width}`);

  assert.deepEqual(pageErrors, [], `browser page errors: ${pageErrors.join('; ')}`);
  console.log('PASS: authenticated browser expedition loop');
  console.log('PASS: dedicated art assets load');
  console.log('PASS: desktop screenshots captured');
} finally {
  await browser?.close().catch(() => {});
  web.kill('SIGTERM');
  upstream.close();
}

console.log(`Expedition alpha v0.15 rarity appearance checks passed. Item templates covered: ${itemCount}; all 16 equipment slots exercised.`);
