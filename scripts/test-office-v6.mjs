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

  const assertWorldNav = async (activeLabel = null) => {
    const nav = page.locator('.office-world-nav');
    await nav.waitFor();
    assert.equal(await nav.getByRole('button').count(), 5);
    if (activeLabel) {
      const active = nav.getByRole('button', { name: new RegExp(activeLabel, 'i') });
      assert.equal(await active.getAttribute('aria-current'), 'page');
    }
    const navBox = await nav.boundingBox();
    const pageBox = await page.locator('.office-page').boundingBox();
    assert(navBox && pageBox);
    assert(navBox.y + navBox.height <= pageBox.y + pageBox.height + 1);
  };

  await page.goto('http://127.0.0.1:' + port + '/applications/games/office', {
    waitUntil: 'networkidle',
  });
  await page.evaluate(() => localStorage.removeItem('4rrum.office.v4_1'));
  await page.reload({ waitUntil: 'networkidle' });

  await page.locator('.office-game').waitFor();
  assert.equal(await page.locator('.office-action').count(), 0);
  assert.equal(await page.locator('.office-world-nav>button').count(), 5);
  await assertWorldNav();
  assert.equal(await page.locator('.office-side-nav>button').count(), 6);
  assert.equal(await page.locator('.office-profile-compact').count(), 1);
  assert.equal(await page.locator('.office-v68-scene-status').count(), 1);
  assert.equal(await page.locator('.office-v68-scene-status>span').count(), 3);
  assert.equal(await page.locator('.office-v6-equipment-slot').count(), 0);
  assert.equal(await page.locator('.office-v6-bottom').count(), 0);
  assert.equal(await page.locator('.office-equipment-modal').count(), 0);
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

  // The permanent shelf is gone: the room uses the freed space and object clicks open a popup.
  const sceneRect = await page.locator('.office-scene').boundingBox();
  assert(sceneRect && sceneRect.height >= 500);

  await page.getByRole('button', { name: 'Выбрать стол' }).click({ position: { x: 42, y: 18 } });
  await page.locator('.office-equipment-modal .office-v6-drawer').waitFor();
  assert.match(await page.locator('.office-equipment-modal .office-v6-drawer-title h3').textContent(), /Стол/i);
  assert.equal(await page.locator('.office-v6-bottom').count(), 0);

  // Escape closes the popup without changing the room layout.
  await page.keyboard.press('Escape');
  await page.locator('.office-equipment-modal').waitFor({ state: 'detached' });

  await page.getByRole('button', { name: 'Выбрать компьютер' }).click();
  await page.locator('.office-equipment-modal .office-v6-drawer').waitFor();
  assert((await page.locator('.office-equipment-modal .office-v6-item-card').count()) >= 6);
  assert((await page.locator('.office-equipment-modal .office-v6-item-card.is-locked').count()) >= 1);
  const shelf = page.locator('.office-equipment-modal .office-v6-item-list');
  const scrollBefore = await shelf.evaluate((node) => node.scrollLeft);
  await shelf.hover();
  await page.mouse.wheel(0, 480);
  await page.waitForTimeout(100);
  const scrollAfter = await shelf.evaluate((node) => node.scrollLeft);
  assert(scrollAfter > scrollBefore);
  await page.locator('.office-equipment-modal .office-v6-drawer-close').click();
  await page.locator('.office-equipment-modal').waitFor({ state: 'detached' });

  await page.getByRole('button', { name: 'Выбрать аксессуары' }).click();
  await page.locator('.office-equipment-modal .office-v6-drawer').waitFor();
  const mug = page.locator('.office-equipment-modal .office-v6-item-card').filter({ hasText: 'Своя кружка' });
  await mug.getByRole('button', { name: /^Купить$/ }).click();
  await page.waitForFunction(() => /куплен|установлен/i.test(document.querySelector('.office-scene-note')?.textContent ?? ''));
  assert.match(await page.locator('.office-scene-note').textContent(), /куплен|установлен/i);
  await page.locator('.office-equipment-modal .office-v6-drawer-close').click();
  await page.locator('.office-equipment-modal').waitFor({ state: 'detached' });

  // Energy actions live only in the dedicated Tasks screen.
  await page.getByRole('button', { name: /Задачи/ }).first().click();
  await page.getByRole('heading', { name: 'Задачи' }).waitFor();
  assert.equal(await page.locator('.office-v65-task-card').count(), 4);
  assert.equal(await page.locator('.office-v65-task-grid').count(), 1);
  await assertWorldNav('Задачи');
  await page.getByRole('button', { name: '← Вернуться в офис' }).click();

  // Player progression lives in the left rail; Profile is no longer duplicated in the world strip.
  await page.getByRole('button', { name: /Профиль/ }).first().click();
  await page.getByRole('heading', { name: 'Собери свой офисный билд' }).waitFor();
  await page.locator('.office-v64-character-avatar').waitFor();
  assert((await page.locator('.office-v64-loadout-slot').count()) >= 4);
  assert.equal(await page.locator('.office-v64-archetype-grid>button').count(), 5);
  await assertWorldNav();
  await page.getByRole('button', { name: /Женщина/ }).click();
  await page.getByRole('button', { name: /Коммуникатор/ }).click();
  assert.match(await page.locator('.office-v64-build-head').textContent(), /Коммуникатор/i);
  assert.equal(await page.locator('.office-v68-character-guidance').count(), 1);
  await page.screenshot({ path: output + '/character-v68-1600.png', fullPage: false });

  // Characteristics have real spendable development points.
  await page.getByRole('button', { name: /Характеристики/ }).first().click();
  await page.getByRole('heading', { name: 'Характеристики' }).waitFor();
  assert.equal(await page.locator('.office-v67-primary-grid>article').count(), 3);
  assert.equal(await page.locator('.office-v67-derived-grid>article').count(), 8);
  assert.equal(await page.locator('.office-v68-build-direction').count(), 1);
  await assertWorldNav();
  assert.match(await page.locator('.office-v67-point-bank').textContent(), /3/);
  await page.getByRole('button', { name: /^\+1/ }).first().click();
  assert.match(await page.locator('.office-v67-point-bank').textContent(), /2/);

  await page.getByRole('button', { name: /Навыки/ }).first().click();
  await page.getByRole('heading', { name: 'Навыки' }).waitFor();
  assert.equal(await page.locator('.office-v67-skill-board>article').count(), 6);
  assert.equal(await page.locator('.office-v68-skill-focus').count(), 1);
  await assertWorldNav();

  await page.getByRole('button', { name: /Таланты/ }).first().click();
  await page.getByRole('heading', { name: 'Таланты' }).waitFor();
  assert.equal(await page.locator('.office-v67-talent-columns>article').count(), 3);
  assert.equal(await page.locator('.office-v69-talent-summary').count(), 1);
  await assertWorldNav();

  await page.getByRole('button', { name: /Инвентарь/ }).first().click();
  await page.getByRole('heading', { name: 'Инвентарь' }).waitFor();
  assert.equal(await page.locator('.office-v67-inventory-grid>article').count(), 8);
  assert.equal(await page.locator('.office-v68-inventory-summary').count(), 1);
  await assertWorldNav();

  await page.getByRole('button', { name: /Достижения/ }).first().click();
  await page.getByRole('heading', { name: 'Достижения' }).waitFor();
  assert.equal(await page.locator('.office-v67-achievement-grid>article').count(), 6);
  assert.equal(await page.locator('.office-v68-achievement-progress').count(), 1);
  await assertWorldNav();
  await page.getByRole('button', { name: '← В офис' }).click();

  // Events replace the old bottom Store duplicate.
  await page.getByRole('button', { name: /События/ }).first().click();
  await page.getByRole('heading', { name: 'События' }).waitFor();
  assert.equal(await page.locator('.office-v67-event-feed>article').count(), 3);
  assert.equal(await page.locator('.office-v67-event-feed article em').count(), 3);
  assert.equal(await page.locator('.office-v69-event-next').count(), 1);
  await assertWorldNav('События');
  await page.getByRole('button', { name: '← В офис' }).click();

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
  assert.equal(await page.locator('.office-v68-career-summary').count(), 1);
  await assertWorldNav('Карьера');
  await page.screenshot({ path: output + '/career-v68-1600.png', fullPage: false });
  await page.getByRole('button', { name: /Вернуться в офис/ }).click();

  // Companies are a world location, not a duplicated side-navigation item.
  await page.getByRole('button', { name: /Компания/ }).first().click();
  await page.getByRole('heading', { name: 'Меняй офис вместе с карьерой' }).waitFor();
  assert.equal(await page.locator('.office-v6-company-grid>article').count(), 6);
  assert.equal(await page.locator('.office-v64-company-scene').count(), 6);
  assert.equal(await page.locator('.office-v64-company-progress>div').count(), 6);
  assert.match(await page.locator('.office-v6-company-grid>article').first().textContent(), /Пассивный бонус/i);
  assert((await page.locator('.office-v64-company-metrics em').count()) >= 6);
  await assertWorldNav('Компания');
  await page.screenshot({ path: output + '/companies-v68-1600.png', fullPage: false });
  await page.getByRole('button', { name: /Вернуться в офис/ }).click();

  // Complete first-day story from the dedicated Tasks screen.
  await page.getByRole('button', { name: /Задачи/ }).first().click();
  for (const choiceName of [/Разобрать по приоритетам/, /Попросить помощи/, /Согласиться переделать/]) {
    await page.getByRole('button', { name: /^Выполнить$/ }).first().click();
    const dialog = page.getByRole('dialog');
    await dialog.waitFor();
    await dialog.getByRole('button', { name: choiceName }).click();
    await dialog.waitFor({ state: 'detached' });
  }

  await page.getByRole('button', { name: '← Вернуться в офис' }).click();

  // Bosses have their own navigation screen.
  await page.getByRole('button', { name: /Боссы/ }).first().click();
  await page.getByRole('heading', { name: 'Боссы' }).waitFor();
  assert.equal(await page.locator('.office-v65-current-boss').count(), 1);
  assert((await page.locator('.office-v65-boss-road-item').count()) >= 4);
  assert.equal(await page.locator('.office-v68-boss-advice').count(), 1);
  await assertWorldNav('Боссы');
  await page.getByRole('button', { name: /Начать переговоры/ }).click();
  await page.getByRole('dialog', { name: /Босс: Сергей Петрович/ }).waitFor();
  assert.equal(await page.locator('.office-v6-boss-actions>button').count(), 3);
  await page.getByRole('button', { name: /Аргументировать/ }).click();
  assert.match(await page.locator('.office-v6-boss-health').textContent(), /Терпение босса/);

  await page.screenshot({ path: output + '/boss-1600.png', fullPage: true });

  await page.getByRole('button', { name: '×' }).click().catch(() => {});
  const worldScreens = [
    ['Задачи', 'Задачи'],
    ['Карьера', 'Большое дерево развития'],
    ['Компания', 'Меняй офис вместе с карьерой'],
    ['Боссы', 'Боссы'],
    ['События', 'События'],
  ];
  for (const [label, heading] of worldScreens) {
    await page.locator('.office-world-nav').getByRole('button', { name: new RegExp(label, 'i') }).click();
    await page.getByRole('heading', { name: heading }).waitFor();
    await assertWorldNav(label);
  }
  await page.getByRole('button', { name: '← В офис' }).click();

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
        pageScrollHeight: document.documentElement.scrollHeight,
      };
    });
    assert(
      dimensions.scroll <= dimensions.width + 1,
      `Office v6 must not overflow horizontally at ${width}px: ${dimensions.scroll}`,
    );
    assert.equal(dimensions.bodyOverflow, 'hidden');
    assert(
      dimensions.pageScrollHeight <= dimensions.height + 2,
      `Office v6.5 must keep the document on one screen at ${width}px: scrollHeight=${dimensions.pageScrollHeight}`,
    );
    assert(
      dimensions.officeBottom <= dimensions.height + 1,
      `Office v6 must fit the viewport at ${width}px: bottom=${dimensions.officeBottom}, height=${dimensions.height}`,
    );
  }

  const persisted = await page.evaluate(() => localStorage.getItem('4rrum.office.v4_1'));
  assert(persisted && persisted.includes('"v6"'));
  assert(persisted && persisted.includes('"gender":"female"'));
  assert.deepEqual(pageErrors, []);
  console.log('Office v6.9 alpha: persistent world nav, one-screen shell and every major UI/UX screen passed');
} finally {
  await browser?.close();
  web.kill('SIGTERM');
  upstream.close();
}
