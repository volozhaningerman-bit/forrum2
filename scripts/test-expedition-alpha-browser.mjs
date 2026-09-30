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
  await page.screenshot({ path: output + '/01-hub-1600x900.png', fullPage: true });

  await page.getByRole('button', { name: /Отправить ·/ }).click();
  await page.waitForTimeout(500);
  assert(await page.getByText('Персонаж в пути').isVisible(), 'Expedition should enter running state');
  await page.screenshot({ path: output + '/02-expedition-running.png', fullPage: true });

  await page.waitForTimeout(5000);
  await page.getByRole('button', { name: 'Забрать добычу' }).click();
  assert(await page.getByText('Последняя экспедиция').isVisible(), 'Expedition result should be visible');
  await page.screenshot({ path: output + '/03-expedition-loot.png', fullPage: true });

  const equipButtons = page.locator('.exp-result-grid button');
  assert((await equipButtons.count()) >= 1, 'At least one loot item should be returned');
  await equipButtons.first().click();
  const equippedCount = await page.locator('.exp-slots button.equipped').count();
  assert(equippedCount >= 1, 'Equipping loot should update an equipment slot');
  await page.screenshot({ path: output + '/04-equipped.png', fullPage: true });

  await page.getByRole('button', { name: 'Отправить персонажа' }).click();
  assert(await page.getByRole('button', { name: 'Вы записаны' }).isVisible(), 'Raid join state should toggle');
  await page.screenshot({ path: output + '/05-raid-joined.png', fullPage: true });

  await page.setViewportSize({ width: 1366, height: 768 });
  await page.screenshot({ path: output + '/06-hub-1366x768.png', fullPage: true });

  const metrics = await page.evaluate(() => ({
    width: innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    bodyWidth: document.body.scrollWidth,
  }));
  assert(metrics.scrollWidth <= metrics.width + 2, `Horizontal overflow: ${metrics.scrollWidth}/${metrics.width}`);
  assert(metrics.bodyWidth <= metrics.width + 2, `Body horizontal overflow: ${metrics.bodyWidth}/${metrics.width}`);

  const source = await page.content();
  assert(source.includes('Ржавые окраины'), 'Rust Outskirts must render');
  assert(source.includes('Железный Пастырь'), 'Iron Shepherd must render');
  assert(source.includes('Железный Герольд'), 'Category Champion preview must render');
  assert(source.includes('Ядро Ковчега'), 'Syndicate relic preview must render');
  assert.equal(pageErrors.length, 0, 'Page errors: ' + pageErrors.join(' | '));

  console.log('PASS expedition alpha browser QA');
} finally {
  if (browser) await browser.close();
  web.kill('SIGTERM');
  upstream.close();
}
