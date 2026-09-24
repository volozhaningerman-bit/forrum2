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
  assert.equal(await page.locator('.office-v6-equipment-slot').count(), 0);
  assert.equal(await page.locator('.office-hotspot-zone').count(), 0);
  assert.equal(await page.locator('.office-scene-shape').count(), 8);
  assert.equal(
    await page.locator('.office-scene-shape').evaluateAll((nodes) =>
      nodes.every((node) => !(node.textContent ?? '').trim()),
    ),
    true,
  );
  assert.equal(await page.evaluate(() => document.body.classList.contains('office-no-scroll')), true);
  const initialGameRect = await page.locator('.office-page').boundingBox();
  assert(initialGameRect && initialGameRect.y + initialGameRect.height <= 1001);

  // Scene-only interaction: the category strip is gone and object clicks replace the content in-place.
  await page.getByRole('button', { name: 'Выбрать стол' }).click({ position: { x: 42, y: 18 } });
  await page.locator('.office-v6-workplace-stack .office-v6-drawer').waitFor();
  assert.match(await page.locator('.office-v6-drawer-title h3').textContent(), /Стол/i);
  const openHeight = await page.locator('.office-v6-bottom').evaluate((node) => node.getBoundingClientRect().height);
  assert(openHeight <= 150);

  await page.getByRole('button', { name: 'Выбрать компьютер' }).click();
  await page.locator('.office-v6-workplace-stack .office-v6-drawer').waitFor();
  assert((await page.locator('.office-v6-item-card').count()) >= 6);
  assert((await page.locator('.office-v6-item-card.is-locked').count()) >= 1);

  await page.getByRole('button', { name: 'Выбрать аксессуары' }).click();
  await page.locator('.office-v6-drawer').waitFor();
  const mug = page.locator('.office-v6-item-card').filter({ hasText: 'Своя кружка' });
  await mug.getByRole('button', { name: /^Купить$/ }).click();
  await page.waitForFunction(() => /куплен|установлен/i.test(document.querySelector('.office-scene-note')?.textContent ?? ''));
  assert.match(await page.locator('.office-scene-note').textContent(), /куплен|установлен/i);
  await page.locator('.office-v6-workplace-close').click();

  // Character build screen.
  await page.getByRole('button', { name: /Персонаж/ }).first().click();
  await page.getByRole('heading', { name: 'Собери свой офисный билд' }).waitFor();
  await page.locator('.office-v64-character-avatar').waitFor();
  assert((await page.locator('.office-v64-loadout-slot').count()) >= 4);
  assert.equal(await page.locator('.office-v64-archetype-grid>button').count(), 5);
  await page.getByRole('button', { name: /Женщина/ }).click();
  await page.getByRole('button', { name: /Коммуникатор/ }).click();
  assert.match(await page.locator('.office-v64-build-head').textContent(), /Коммуникатор/i);
  await page.screenshot({ path: output + '/character-v64-1600.png', fullPage: false });

  // Expanded career tree.
  await page.getByRole('button', { name: /Карьера/ }).first().click();
  await page.getByRole('heading', { name: 'Большое дерево развития' }).waitFor();
  assert((await page.locator('.office-v6-career-node').count()) >= 15);
  assert((await page.locator('.office-v6-career-canvas line.is-path').count()) >= 1);
  await page.locator('.office-v6-career-detail').waitFor();
  assert.match(await page.locator('.office-v6-career-detail').textContent(), /Что получишь/i);
  assert.match(await page.locator('.office-v6-career-detail').textContent(), /Что откроется/i);

  await page.getByRole('button', { name: /Подробнее: Младший специалист/ }).click();
  assert.match(await page.locator('.office-v6-career-detail').textContent(), /Младший специалист/i);
  assert.match(await page.locator('.office-v6-career-detail').textContent(), /50[\s\u00a0]000/i);

  await page.getByRole('button', { name: /Эксперт/ }).click();

  const canvas = page.locator('.office-v6-career-canvas');
  const transformBeforeZoom = await canvas.getAttribute('style');
  await page.getByRole('button', { name: 'Увеличить дерево' }).click();
  const transformAfterZoom = await canvas.getAttribute('style');
  assert.notEqual(transformAfterZoom, transformBeforeZoom);
  await page.screenshot({ path: output + '/career-v63-1600.png', fullPage: false });

  // Companies are now a real screen.
  await page.getByRole('button', { name: /Компания/ }).first().click();
  await page.getByRole('heading', { name: 'Меняй офис вместе с карьерой' }).waitFor();
  assert.equal(await page.locator('.office-v6-company-grid>article').count(), 6);
  assert.equal(await page.locator('.office-v64-company-scene').count(), 6);
  assert.equal(await page.locator('.office-v64-company-progress>div').count(), 6);
  assert.match(await page.locator('.office-v6-company-grid>article').first().textContent(), /Пассивный бонус/i);
  await page.screenshot({ path: output + '/companies-v64-1600.png', fullPage: false });

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
    await page.waitForTimeout(150);
    const dimensions = await page.evaluate(() => {
      const office = document.querySelector('.office-page')?.getBoundingClientRect();
      return {
        width: innerWidth,
        height: innerHeight,
        scroll: document.documentElement.scrollWidth,
        bodyOverflow: getComputedStyle(document.body).overflowY,
        officeBottom: office?.bottom ?? 0,
      };
    });
    assert(
      dimensions.scroll <= dimensions.width + 1,
      `Office v6 must not overflow horizontally at ${width}px: ${dimensions.scroll}`,
    );
    assert.equal(dimensions.bodyOverflow, 'hidden');
    assert(
      dimensions.officeBottom <= dimensions.height + 1,
      `Office v6 must fit the viewport at ${width}px: bottom=${dimensions.officeBottom}, height=${dimensions.height}`,
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
