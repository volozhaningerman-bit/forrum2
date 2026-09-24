import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const root = new URL('../', import.meta.url).pathname;
const output = root + 'test-results/office-v6';
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
const port = Number(process.env.OFFICE_TEST_PORT || 3132);
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
  await page.evaluate(() => localStorage.removeItem('4rrum.office.v4_1'));
  await page.reload({ waitUntil: 'networkidle' });

  await page.locator('.office-game').waitFor();
  assert.equal(await page.locator('.office-action').count(), 4);
  assert.equal(await page.locator('.office-v6-equipment-slot').count(), 8);

  // Equipment drawer: real catalog, purchase and equip.
  await page.locator('.office-v6-equipment-slot[data-category="pc"]').click();
  await page.locator('.office-v6-drawer').waitFor();
  assert((await page.locator('.office-v6-item-card').count()) >= 6);
  await page.getByRole('button', { name: 'Купить' }).first().click();
  await page.waitForFunction(() => /куплен|установлен/i.test(document.querySelector('.office-scene-note')?.textContent ?? ''));
  assert.match(await page.locator('.office-scene-note').textContent(), /куплен|установлен/i);
  await page.locator('.office-v6-drawer-close').click();

  // Character build screen.
  await page.getByRole('button', { name: /Персонаж/ }).first().click();
  await page.getByRole('heading', { name: 'Собери свой офисный билд' }).waitFor();
  await page.getByRole('button', { name: /Женщина/ }).click();
  await page.getByRole('button', { name: /Коммуникатор/ }).click();

  // Expanded career tree.
  await page.getByRole('button', { name: /Карьера/ }).first().click();
  await page.getByRole('heading', { name: 'Большое дерево развития' }).waitFor();
  assert((await page.locator('.office-v6-career-node').count()) >= 15);
  await page.getByRole('button', { name: /Эксперт/ }).click();

  // Companies are now a real screen.
  await page.getByRole('button', { name: /Компания/ }).first().click();
  await page.getByRole('heading', { name: 'Меняй офис вместе с карьерой' }).waitFor();
  assert.equal(await page.locator('.office-v6-company-grid>article').count(), 6);

  // Return home and complete first-day story to unlock the new boss battle.
  await page.getByRole('button', { name: /Главная/ }).first().click();
  for (const choiceName of [/Разобрать по приоритетам/, /Попросить помощи/, /Согласиться переделать/]) {
    await page.getByRole('button', { name: /Работать/ }).click();
    const dialog = page.getByRole('dialog');
    await dialog.waitFor();
    await dialog.getByRole('button', { name: choiceName }).click();
    await dialog.waitFor({ state: 'detached' });
  }

  await page.getByRole('button', { name: /Начать поручение|К испытанию/ }).click();
  await page.getByRole('dialog', { name: /Босс: Сергей Петрович/ }).waitFor();
  assert.equal(await page.locator('.office-v6-boss-actions>button').count(), 3);
  await page.getByRole('button', { name: /Аргументировать/ }).click();
  assert.match(await page.locator('.office-v6-boss-health').textContent(), /Терпение босса/);

  await page.screenshot({ path: output + '/boss-1600.png', fullPage: true });

  for (const width of [1600, 1200, 1024]) {
    await page.getByRole('button', { name: '×' }).click().catch(() => {});
    await page.setViewportSize({ width, height: 900 });
    await page.waitForTimeout(100);
    const dimensions = await page.evaluate(() => ({
      width: innerWidth,
      scroll: document.documentElement.scrollWidth,
    }));
    assert(
      dimensions.scroll <= dimensions.width + 1,
      `Office v6 must not overflow at ${width}px: ${dimensions.scroll}`,
    );
  }

  const persisted = await page.evaluate(() => localStorage.getItem('4rrum.office.v4_1'));
  assert(persisted && persisted.includes('"v6"'));
  assert(persisted && persisted.includes('"gender":"female"'));
  assert.deepEqual(pageErrors, []);
  console.log('Office v6: equipment, profile, career, companies, boss combat and persistence passed');
} finally {
  await browser?.close();
  web.kill('SIGTERM');
  upstream.close();
}
