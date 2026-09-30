import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const root = new URL('../', import.meta.url).pathname;
const output = root + 'test-results/expedition-alpha';
await mkdir(output, { recursive: true });

let energy = 12;
let unlockedDepth = 1;
let run = null;
let equipped = false;
let inventory = [];

const serverItem = {
  id: 'item-gloves-1',
  templateId: 'exp_gloves_servo',
  name: 'Перчатки Сервомастера',
  slot: 'GLOVES',
  rarity: 'UNCOMMON',
  serialNumber: 1,
  circulation: 4000,
  power: 4,
  visualKey: 'gloves',
  equipped: false,
  acquiredAt: new Date().toISOString(),
};

function state() {
  return {
    profile: {
      level: 1,
      xp: inventory.length ? 40 : 0,
      energy,
      maxEnergy: 12,
      unlockedDepth,
      power: 13 + (equipped ? 4 : 0),
    },
    run,
    inventory: inventory.map((item) => ({ ...item, equipped })),
  };
}

const upstream = createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  let data = {};

  if (url.pathname === '/v1/auth/me') {
    data = {
      user: {
        id: 'viewer',
        username: 'viewer',
        displayName: 'Алексей Петров',
        emailVerified: true,
        onboardingCompleted: true,
        role: 'OWNER',
      },
    };
  } else if (url.pathname === '/v1/communities') {
    data = [];
  } else if (url.pathname === '/v1/notifications/unread-count') {
    data = { count: 0 };
  } else if (url.pathname === '/v1/expedition/me') {
    data = state();
  } else if (url.pathname === '/v1/expedition/runs' && req.method === 'POST') {
    energy -= 1;
    run = {
      id: 'run-1',
      depth: 1,
      energyCost: 1,
      status: 'ACTIVE',
      startedAt: new Date().toISOString(),
      readyAt: new Date(Date.now() + 350).toISOString(),
      secondsLeft: 1,
    };
    data = { ok: true, run };
  } else if (url.pathname === '/v1/expedition/runs/run-1/claim' && req.method === 'POST') {
    inventory = [{ ...serverItem }];
    unlockedDepth = 2;
    run = null;
    data = {
      ok: true,
      reward: {
        xp: 40,
        resources: { scrap: 13, cloth: 5, oldParts: 0 },
        item: serverItem,
      },
      profile: { level: 1, xp: 40, unlockedDepth: 2 },
    };
  } else if (url.pathname === '/v1/expedition/items/item-gloves-1/equip' && req.method === 'POST') {
    equipped = true;
    data = state();
  } else {
    data = {};
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
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

  browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 1 });
  await context.addCookies([{ name: 'forrum_test', value: 'viewer', domain: '127.0.0.1', path: '/' }]);

  const page = await context.newPage();
  const pageErrors = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));

  await page.goto('http://127.0.0.1:' + port + '/applications/games/expedition-alpha', { waitUntil: 'networkidle' });
  await page.waitForSelector('[data-testid="expedition-alpha"]');
  await page.waitForFunction(() => document.body.innerText.includes('Серверный профиль'));

  const art = await page.evaluate(() => {
    const hero = document.querySelector('.exp-avatar-art');
    const location = document.querySelector('.exp-location-art');
    const boss = document.querySelector('.exp-raid-art');
    const heroBg = hero ? getComputedStyle(hero).backgroundImage : '';
    const locationBefore = location ? getComputedStyle(location, '::before').backgroundImage : '';
    const bossBefore = boss ? getComputedStyle(boss, '::before').backgroundImage : '';
    return { heroBg, locationBefore, bossBefore, scrollWidth: document.documentElement.scrollWidth, width: innerWidth };
  });
  assert(art.heroBg.includes('alpha-reference-atlas.webp'), 'hero must use approved reference atlas');
  assert(art.locationBefore.includes('alpha-reference-atlas.webp'), 'location must use approved reference atlas');
  assert(art.bossBefore.includes('alpha-reference-atlas.webp'), 'boss must use approved reference atlas');
  assert(art.scrollWidth <= art.width + 2, 'desktop must not horizontally overflow');

  await page.screenshot({ path: output + '/01-home-1600x900.png', fullPage: true });

  await page.getByRole('button', { name: /Отправить в экспедицию/ }).click();
  await page.waitForFunction(() => document.body.innerText.includes('Персонаж в пути'));
  await page.waitForTimeout(1200);
  await page.getByRole('button', { name: 'Забрать добычу' }).click();
  await page.waitForFunction(() => document.body.innerText.includes('Перчатки Сервомастера'));

  const loot = await page.locator('.exp-drop').innerText();
  assert.match(loot, /№1\/4000/, 'returned loot must show its serial number');

  await page.locator('.exp-drop').getByRole('button', { name: 'Надеть' }).click();
  await page.waitForFunction(() => document.querySelector('.exp-avatar')?.className.includes('has-gloves'));
  assert.equal(await page.locator('.exp-server-ok').innerText(), 'Серверный профиль');

  await page.screenshot({ path: output + '/02-loot-equipped-1600x900.png', fullPage: true });

  await page.setViewportSize({ width: 1366, height: 768 });
  await page.waitForTimeout(150);
  const mobileSafe = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    width: innerWidth,
  }));
  assert(mobileSafe.scrollWidth <= mobileSafe.width + 2, '1366 layout must not horizontally overflow');
  await page.screenshot({ path: output + '/03-home-1366x768.png', fullPage: true });

  assert.deepEqual(pageErrors, [], 'page errors: ' + pageErrors.join('; '));
  console.log('Expedition alpha browser QA passed.');
} finally {
  if (browser) await browser.close();
  web.kill('SIGTERM');
  upstream.close();
}
