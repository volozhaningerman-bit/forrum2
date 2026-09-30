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
  css: path.join(root, 'apps/web/app/applications/games/expedition-alpha/expedition-alpha.css'),
  spec: path.join(root, 'docs/game-expedition-alpha-source-of-truth.md'),
  client: path.join(root, 'apps/web/app/applications/games/expedition-alpha/expedition-client.ts'),
  controller: path.join(root, 'apps/api/src/expedition/expedition.controller.ts'),
  service: path.join(root, 'apps/api/src/expedition/expedition.service.ts'),
  schema: path.join(root, 'apps/api/prisma/schema.prisma'),
  heroArt: path.join(root, 'apps/web/public/games/expedition-alpha/hero-base.svg'),
  locationArt: path.join(root, 'apps/web/public/games/expedition-alpha/rust-outskirts.svg'),
  bossArt: path.join(root, 'apps/web/public/games/expedition-alpha/iron-shepherd.svg'),
  itemArt: path.join(root, 'apps/web/public/games/expedition-alpha/equipment-atlas.svg'),
  approvedRaster: path.join(root, 'apps/web/public/games/expedition/approved-alpha-atlas.webp'),
};

for (const [name, file] of Object.entries(files)) {
  if (!fs.existsSync(file)) throw new Error(`Missing ${name}: ${file}`);
}

const pageSource = fs.readFileSync(files.page, 'utf8');
const gameSource = fs.readFileSync(files.game, 'utf8');
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
  ['four rarity tiers', ['common', 'uncommon', 'rare', 'epic'].every((value) => gameSource.includes(value))],
  ['20+ numbered items', itemCount >= 20 && gameSource.includes('serial:') && gameSource.includes('circulation:')],
  ['server loot covers all 16 slots', (serviceSource.match(/slot: '/g) ?? []).length >= 16 && ['HEAD','NECK','SHOULDERS','CLOAK','CHEST','WRISTS','GLOVES','BELT','LEGS','FEET','RING_1','RING_2','RELIC_1','RELIC_2','MAIN_HAND','OFF_HAND'].every((slot) => serviceSource.includes(`slot: '${slot}'`))],
  ['energy expedition flow', gameSource.includes('sendExpedition') && gameSource.includes('collectReturn') && gameSource.includes('endsAt')],
  ['five Rust Outskirts depths', gameSource.includes('Реакторная зона') && gameSource.includes('Ломовые дворы') && gameSource.includes('depthId')],
  ['Iron Shepherd raid join', gameSource.includes('Железный Пастырь') && gameSource.includes('raidJoined')],
  ['category and syndicate preview', gameSource.includes('Железный Герольд') && gameSource.includes('Ядро Ковчега')],
  ['dedicated art pack referenced', cssSource.includes('/games/expedition-alpha/hero-base.svg') && cssSource.includes('/games/expedition-alpha/rust-outskirts.svg') && cssSource.includes('/games/expedition-alpha/iron-shepherd.svg') && cssSource.includes('/games/expedition-alpha/equipment-atlas.svg')],
  ['true paper-doll layers wired', gameSource.includes('exp-gear exp-gear-cloak') && gameSource.includes('exp-gear exp-gear-mainhand') && cssSource.includes('.exp-avatar.has-gloves .exp-gear-gloves')],
  ['approved raster atlas wired', cssSource.includes('/games/expedition/approved-alpha-atlas.webp') && cssSource.includes('--exp-approved-art')],
  ['legacy pseudo gear disabled', cssSource.includes('.exp-avatar.has-gloves::before') && cssSource.includes('.exp-avatar.has-cloak::after{display:none!important}')],
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
  inventory: [starter],
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
    '/games/expedition-alpha/hero-base.svg',
    '/games/expedition-alpha/rust-outskirts.svg',
    '/games/expedition-alpha/iron-shepherd.svg',
    '/games/expedition-alpha/equipment-atlas.svg',
    '/games/expedition/approved-alpha-atlas.webp',
  ]) {
    const response = await fetch('http://127.0.0.1:' + port + asset);
    assert.equal(response.status, 200, `asset missing: ${asset}`);
  }

  browser = await chromium.launch({ headless: true });
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

  const metrics = await page.evaluate(() => ({
    width: innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    game: Boolean(document.querySelector('[data-testid="expedition-alpha"]')),
    avatar: Boolean(document.querySelector('.exp-avatar-art')),
    location: Boolean(document.querySelector('.exp-location-art')),
    boss: Boolean(document.querySelector('.exp-boss-crop')),
  }));
  assert(metrics.game && metrics.avatar && metrics.location && metrics.boss, 'core visual surfaces missing');
  assert(metrics.scrollWidth <= metrics.width + 2, `horizontal overflow ${metrics.scrollWidth}/${metrics.width}`);

  await page.screenshot({ path: output + '/expedition-alpha-v05-1720x900.png', fullPage: true });

  const raidJoin = page.getByRole('button', { name: 'Отправить персонажа' });
  await raidJoin.click();
  await page.getByRole('button', { name: 'Вы записаны' }).waitFor();
  await page.getByText('8/10').waitFor();

  await page.getByRole('button', { name: /Отправить ·/ }).click();
  await page.getByText('Персонаж в пути').waitFor();
  await page.getByRole('button', { name: 'Забрать добычу' }).waitFor({ timeout: 8000 });
  await page.getByRole('button', { name: 'Забрать добычу' }).click();

  const drop = page.getByRole('button', { name: /Перчатки Сервомастера/ }).first();
  await drop.waitFor();
  await drop.click();
  await page.getByText('Перчатки Сервомастера').first().waitFor();
  await page.locator('.exp-avatar.has-gloves').waitFor({ timeout: 5000 });
  await page.waitForTimeout(250);
  const gloveLayer = await page.locator('.exp-gear-gloves').evaluate((node) => ({
    opacity: getComputedStyle(node).opacity,
    display: getComputedStyle(node).display,
  }));
  const legacyGlovePseudo = await page.locator('.exp-avatar').evaluate((node) => getComputedStyle(node, '::before').display);
  assert.equal(gloveLayer.display === 'none', false, 'paper-doll glove layer must exist');
  assert(Number(gloveLayer.opacity) > 0.8, 'equipped gloves must visibly activate paper-doll layer');
  assert.equal(legacyGlovePseudo, 'none', 'legacy floating glove pseudo must stay disabled');

  await page.screenshot({ path: output + '/expedition-alpha-v05-loot-equipped-1720x900.png', fullPage: true });

  await page.setViewportSize({ width: 1366, height: 768 });
  await page.screenshot({ path: output + '/expedition-alpha-v05-1366x768.png', fullPage: true });
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

console.log(`Expedition alpha v0.5 checks passed. Item templates covered: ${itemCount}.`);
