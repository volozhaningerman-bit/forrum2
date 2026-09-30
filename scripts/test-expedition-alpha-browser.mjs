import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const root = new URL('../', import.meta.url).pathname;
const output = root + 'test-results/expedition-alpha';
await mkdir(output, { recursive: true });

const upstream = createServer((req, res) => {
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
  }
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
});

await new Promise((resolve) => upstream.listen(0, '127.0.0.1', resolve));
const apiPort = upstream.address().port;
const port = Number(process.env.EXPEDITION_TEST_PORT || 3138);

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
  const context = await browser.newContext({
    viewport: { width: 1600, height: 900 },
    deviceScaleFactor: 1,
  });
  await context.addCookies([
    { name: 'forrum_test', value: 'viewer', domain: '127.0.0.1', path: '/' },
  ]);

  const page = await context.newPage();
  const pageErrors = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));

  await page.goto('http://127.0.0.1:' + port + '/applications/games/expedition-alpha', { waitUntil: 'networkidle' });

  assert.equal(await page.locator('[data-testid="expedition-alpha"]').count(), 1);
  assert.equal(await page.locator('.exp-slots button').count(), 16);
  assert.equal(await page.locator('.exp-items .exp-item').count(), 6);
  assert.match(await page.locator('.exp-location-copy').textContent(), /Ржавые окраины/);
  assert.match(await page.locator('.exp-raid-copy').textContent(), /Железный Пастырь/);

  const art = await page.evaluate(() => {
    const hero = document.querySelector('.exp-avatar-art');
    const location = getComputedStyle(document.querySelector('.exp-location-art')).backgroundImage;
    const boss = getComputedStyle(document.querySelector('.exp-raid-art')).backgroundImage;
    const item = getComputedStyle(document.querySelector('.exp-item-icon')).backgroundImage;
    return {
      heroReady: hero instanceof HTMLImageElement && hero.complete && hero.naturalWidth > 0,
      location,
      boss,
      item,
    };
  });
  assert.equal(art.heroReady, true, 'hero production art must load');
  assert.match(art.location, /rust-outskirts\.webp/);
  assert.match(art.boss, /iron-shepherd\.webp/);
  assert.match(art.item, /items-atlas\.webp/);

  const energyBefore = await page.locator('.exp-hud').textContent();
  assert.match(energyBefore, /12\/12/);

  await page.getByRole('button', { name: /Отправить в экспедицию/ }).click();
  await page.getByRole('button', { name: /В пути/ }).waitFor();
  await page.getByRole('button', { name: 'Забрать добычу' }).waitFor({ timeout: 12_000 });
  await page.getByRole('button', { name: 'Забрать добычу' }).click();

  assert.equal(await page.locator('.exp-items .exp-item').count(), 7);
  assert.match(await page.locator('.exp-drop').textContent(), /№\d+\/\d+/);
  assert.match(await page.locator('.exp-resources').textContent(), /металл/i);
  assert.doesNotMatch(await page.locator('.exp-hud').textContent(), /12\/12/);

  await page.locator('.exp-drop').getByRole('button', { name: 'Надеть' }).click();
  assert.equal(await page.locator('.exp-slots button.equipped').count(), 1);

  const raid = page.locator('.exp-raid-copy');
  await raid.getByRole('button', { name: 'Записаться на рейд' }).click();
  assert.match(await raid.textContent(), /8\/10/);
  assert.equal(await raid.getByRole('button', { name: /Персонаж записан/ }).count(), 1);

  const desktopOverflow = await page.evaluate(() => ({
    width: innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  assert(desktopOverflow.scrollWidth <= desktopOverflow.width + 2, 'desktop horizontal overflow');

  await page.screenshot({ path: output + '/expedition-alpha-1600x900.png', fullPage: false });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(150);
  const mobileOverflow = await page.evaluate(() => ({
    width: innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  assert(mobileOverflow.scrollWidth <= mobileOverflow.width + 2, 'mobile horizontal overflow');
  await page.screenshot({ path: output + '/expedition-alpha-390x844.png', fullPage: true });

  assert.deepEqual(pageErrors, []);
  console.log('Expedition alpha browser checks passed.');
} finally {
  await browser?.close();
  web.kill('SIGTERM');
  upstream.close();
}
