import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const root = new URL('../', import.meta.url).pathname;
const output = root + 'test-results/office-v5';
await mkdir(output, { recursive: true });

const upstream = createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  let status = 200;
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

  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
});

await new Promise((resolve) => upstream.listen(0, '127.0.0.1', resolve));
const apiPort = upstream.address().port;
const port = Number(process.env.OFFICE_TEST_PORT || 3131);
const web = spawn(
  process.execPath,
  [
    root + 'node_modules/next/dist/bin/next',
    'start',
    '--hostname',
    '127.0.0.1',
    '--port',
    String(port),
  ],
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
      const response = await fetch('http://127.0.0.1:' + port + '/applications/games/office');
      if (response.ok) break;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (n === 119) throw new Error('Next did not start: ' + logs);
  }

  browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1600, height: 1000 },
    deviceScaleFactor: 1,
  });
  await context.addCookies([
    { name: 'forrum_test', value: 'viewer', domain: '127.0.0.1', path: '/' },
  ]);

  const page = await context.newPage();
  const pageErrors = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));

  await page.goto('http://127.0.0.1:' + port + '/applications/games/office', {
    waitUntil: 'networkidle',
  });

  await page.locator('.office-game').waitFor();
  assert.equal(await page.locator('.office-action').count(), 4);
  assert.equal(await page.locator('.office-slots button').count(), 6);

  await page.getByRole('button', { name: /Работать/ }).click();
  const storyDialog = page.getByRole('dialog');
  await storyDialog.getByRole('heading', { name: 'Разобрать входящие' }).waitFor();
  await storyDialog.getByRole('button', { name: /Разобрать по приоритетам/ }).click();
  await storyDialog.waitFor({ state: 'detached' });
  assert.match(await page.locator('.office-scene-note').textContent(), /срочное письмо/i);

  await page.getByRole('button', { name: /Шалости/ }).click();
  await page.getByRole('dialog', { name: 'Шалости' }).waitFor();
  assert.equal(await page.locator('.office-prank-grid>button').count(), 4);
  await page.getByRole('button', { name: /Спрятать степлер/ }).click();

  await page.getByRole('button', { name: /Карьера/ }).click();
  await page.getByRole('heading', { name: 'Куда приведёт этот офис?' }).waitFor();
  assert.equal(await page.locator('.office-career-node').count(), 9);
  assert.equal(await page.locator('.office-career-current').count(), 1);

  await page.screenshot({ path: output + '/career-1600.png', fullPage: true });

  await page.getByRole('button', { name: /Вернуться в офис/ }).click();
  await page.locator('.office-scene').waitFor();

  for (const width of [1600, 1024]) {
    await page.setViewportSize({ width, height: 900 });
    await page.waitForTimeout(100);
    const dimensions = await page.evaluate(() => ({
      width: innerWidth,
      scroll: document.documentElement.scrollWidth,
    }));
    assert(
      dimensions.scroll <= dimensions.width + 1,
      `Office v5 must not overflow at ${width}px: ${dimensions.scroll}`,
    );
  }

  const persisted = await page.evaluate(() => localStorage.getItem('4rrum.office.v4_1'));
  assert(persisted && persisted.includes('"story"'));
  assert.deepEqual(pageErrors, []);
  console.log('Office v5: story, pranks, career, persistence and layout checks passed');
} finally {
  await browser?.close();
  web.kill('SIGTERM');
  upstream.close();
}
