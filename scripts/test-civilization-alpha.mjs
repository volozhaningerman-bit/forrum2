import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const root = new URL('../', import.meta.url).pathname;
const output = root + 'test-results/civilization-alpha';
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
const port = Number(process.env.CIVILIZATION_TEST_PORT || 3136);
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
      const response = await fetch('http://127.0.0.1:' + port + '/applications/games/civilization');
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

  const assertOneScreen = async (label) => {
    const metrics = await page.evaluate(() => {
      const app = document.querySelector('.civilization-app')?.getBoundingClientRect();
      return {
        width: innerWidth,
        height: innerHeight,
        scrollWidth: document.documentElement.scrollWidth,
        scrollHeight: document.documentElement.scrollHeight,
        bodyOverflow: getComputedStyle(document.body).overflowY,
        appBottom: app?.bottom ?? 0,
      };
    });
    assert(metrics.scrollWidth <= metrics.width + 2, `${label}: horizontal overflow ${metrics.scrollWidth}/${metrics.width}`);
    assert(metrics.scrollHeight <= metrics.height + 2, `${label}: vertical document overflow ${metrics.scrollHeight}/${metrics.height}`);
    assert.equal(metrics.bodyOverflow, 'hidden', `${label}: body must remain locked`);
    assert(metrics.appBottom <= metrics.height + 2, `${label}: app bottom outside viewport ${metrics.appBottom}/${metrics.height}`);
  };

  const assertOverlayGeometry = async (label) => {
    const boxes = await page.evaluate(() => {
      const scene = document.querySelector('.civ-scene')?.getBoundingClientRect();
      const player = document.querySelector('.civ-player-rail')?.getBoundingClientRect();
      const tasks = document.querySelector('.civ-task-rail')?.getBoundingClientRect();
      const hud = document.querySelector('.civ-game-hud')?.getBoundingClientRect();
      const panel = document.querySelector('.civ-full-panel')?.getBoundingClientRect();
      const nav = document.querySelector('.civ-bottom-nav')?.getBoundingClientRect();
      return scene && player && tasks && hud && panel && nav ? {
        sceneTop: scene.top,
        sceneLeft: scene.left,
        sceneRight: scene.right,
        sceneBottom: scene.bottom,
        panelTop: panel.top,
        panelLeft: panel.left,
        panelRight: panel.right,
        panelBottom: panel.bottom,
        playerRight: player.right,
        tasksLeft: tasks.left,
        hudBottom: hud.bottom,
        navTop: nav.top,
      } : null;
    });
    assert(boxes, `${label}: missing panel geometry`);
    assert(Math.abs(boxes.panelTop - boxes.sceneTop) <= 2, `${label}: panel must start at central scene top`);
    assert(Math.abs(boxes.panelLeft - boxes.sceneLeft) <= 2, `${label}: panel must preserve player rail`);
    assert(Math.abs(boxes.panelRight - boxes.sceneRight) <= 2, `${label}: panel must preserve task rail`);
    assert(Math.abs(boxes.panelBottom - boxes.sceneBottom) <= 2, `${label}: panel must end with central scene`);
    assert(boxes.panelLeft >= boxes.playerRight - 2, `${label}: panel overlaps player rail`);
    assert(boxes.panelRight <= boxes.tasksLeft + 2, `${label}: panel overlaps task rail`);
    assert(boxes.panelTop >= boxes.hudBottom - 2, `${label}: panel overlaps game HUD`);
    assert(boxes.panelBottom <= boxes.navTop + 2, `${label}: panel overlaps bottom navigation`);
  };

  await page.goto('http://127.0.0.1:' + port + '/applications/games/civilization', { waitUntil: 'networkidle' });
  await page.evaluate(() => {
    localStorage.removeItem('4rrum.civilization.alpha.v1');
    localStorage.removeItem('4rrum.civilization.alpha.v1.progress');
  });
  await page.reload({ waitUntil: 'networkidle' });

  // First launch is a one-time character creation flow.
  const createDialog = page.getByRole('dialog', { name: 'Создание персонажа' });
  await createDialog.waitFor();
  await createDialog.getByRole('button', { name: /Девочка/ }).click();
  await createDialog.locator('.civ-color-row button').nth(2).click();
  await createDialog.getByRole('button', { name: 'Пучок' }).click();
  await createDialog.getByRole('button', { name: /Начать путь цивилизации/ }).click();
  await createDialog.waitFor({ state: 'detached' });

  const savedAvatar = JSON.parse(await page.evaluate(() => localStorage.getItem('4rrum.civilization.alpha.v1')));
  assert.equal(savedAvatar.created, true);
  assert.equal(savedAvatar.gender, 'female');
  assert.equal(savedAvatar.hair, 'Пучок');

  // Left side is intentionally compact: avatar, XP and one disclosure menu.
  assert.equal(await page.locator('.civ-player-rail').count(), 1);
  assert.equal(await page.locator('.civ-player-menu').count(), 0);
  await page.getByRole('button', { name: 'Открыть меню персонажа' }).click();
  const playerMenu = page.locator('.civ-player-menu');
  await playerMenu.waitFor();
  assert.equal(await playerMenu.getByRole('button').count(), 4);
  for (const label of ['Профиль', 'Достижения', 'Инвентарь', 'Эволюция']) {
    assert.equal(await playerMenu.getByRole('button', { name: new RegExp(label, 'i') }).count(), 1);
  }
  await page.getByRole('button', { name: 'Открыть меню персонажа' }).click();

  // Every destination behind the compact player disclosure is a real screen, not a placeholder notice.
  for (const [label, marker] of [
    ['Профиль', 'Созданный персонаж'],
    ['Достижения', 'Первый огонь'],
    ['Инвентарь', 'Трофеи'],
    ['Эволюция', 'Следующий заметный unlock'],
  ]) {
    await page.getByRole('button', { name: 'Открыть меню персонажа' }).click();
    const menu = page.locator('.civ-player-menu');
    await menu.waitFor();
    await menu.getByRole('button', { name: new RegExp(label, 'i') }).click();
    await page.locator('.civ-full-panel').waitFor();
    await assertOverlayGeometry(`player menu ${label}`);
    assert.match(await page.locator('.civ-full-panel').textContent(), new RegExp(marker, 'i'));
    assert.equal(await page.locator('.civ-player-menu').count(), 0);
    await page.getByRole('button', { name: 'Свернуть раздел' }).click();
    await page.locator('.civ-full-panel').waitFor({ state: 'detached' });
  }

  // Top HUD has one location and four resource controls.
  assert.equal(await page.locator('.civ-game-hud .civ-location').count(), 1);
  assert.equal(await page.locator('.civ-resource-strip .civ-resource').count(), 4);
  await page.locator('.civ-resource').filter({ hasText: 'Еда' }).click();
  assert.match(await page.locator('.civ-resource-popover').textContent(), /Ягоды/);
  assert.match(await page.locator('.civ-resource-popover').textContent(), /Мясо/);
  await page.locator('.civ-resource').filter({ hasText: 'Еда' }).click();
  await page.locator('.civ-resource').filter({ hasText: 'Ресурсы' }).click();
  assert.match(await page.locator('.civ-resource-popover.resources').textContent(), /Камень/);
  assert.match(await page.locator('.civ-resource-popover.resources').textContent(), /Кости/);
  assert.equal(await page.locator('.civ-resource').filter({ hasText: 'Ресурсы' }).getAttribute('aria-expanded'), 'true');
  await page.keyboard.press('Escape');
  await page.locator('.civ-resource-popover.resources').waitFor({ state: 'detached' });

  // Right side contains only period-scoped tasks; expanding follows selected period.
  const taskRail = page.locator('.civ-task-rail');
  assert.equal(await taskRail.count(), 1);
  await taskRail.getByRole('button', { name: /Все задания/ }).click();
  assert.match(await taskRail.textContent(), /Разжечь костёр/);
  await taskRail.getByRole('button', { name: 'Еженедельные' }).click();
  assert.equal(await page.locator('.civ-task-scroll').count(), 0);
  await taskRail.getByRole('button', { name: /Все задания/ }).click();
  assert.match(await taskRail.textContent(), /Победить 3 боссов/);
  assert.equal(/Разжечь костёр/.test(await page.locator('.civ-task-scroll').textContent()), false);
  await taskRail.getByRole('button', { name: /Скрыть список/ }).click();
  await taskRail.getByRole('button', { name: 'Ежедневные' }).click();

  // Exactly one five-item bottom navigation.
  const bottomNav = page.locator('.civ-bottom-nav');
  assert.equal(await bottomNav.getByRole('button').count(), 5);
  for (const label of ['Снаряжение', 'Боссы', 'Карта', 'Крафт', 'Племя']) {
    assert.equal(await bottomNav.getByRole('button', { name: new RegExp(label, 'i') }).count(), 1);
  }

  // Equipment occupies the full central game area while profile, tasks, HUD and bottom nav stay visible.
  await bottomNav.getByRole('button', { name: /Снаряжение/ }).click();
  await page.locator('.civ-full-panel').waitFor();
  await assertOverlayGeometry('equipment');
  assert.match(await page.locator('.civ-full-panel').textContent(), /Управление персонажем/);
  assert.equal(await page.locator('.civ-equipment-tabs>button').count(), 5);
  assert((await page.locator('.civ-item-card').count()) >= 8, 'weapon catalog should show progression and locked goals');
  assert.equal(await page.locator('.civ-item-art').count(), await page.locator('.civ-item-card').count() + 1);
  // Equip a real unlocked weapon through the UI. This must survive reload later.
  await page.getByRole('button', { name: /Оружие/ }).click();
  const axeCard = page.locator('.civ-item-card').filter({ hasText: 'Каменный топор' }).first();
  await axeCard.click();
  assert.match(await page.locator('.civ-item-detail').textContent(), /Каменный топор/);
  await page.locator('.civ-item-detail').getByRole('button', { name: 'Использовать' }).click();
  await page.waitForFunction(() => {
    const raw = localStorage.getItem('4rrum.civilization.alpha.v1.progress');
    return raw && JSON.parse(raw).equippedId === 'axe';
  });

  await page.getByRole('button', { name: /Одежда/ }).click();
  assert.match(await page.locator('.civ-item-detail').textContent(), /Шкура охотника/);
  assert((await page.locator('.civ-item-card').count()) >= 5, 'clothes catalog should not look empty');
  await bottomNav.getByRole('button', { name: /Снаряжение/ }).click();
  await page.locator('.civ-full-panel').waitFor({ state: 'detached' });

  // Collapse arrow and Escape are secondary close affordances.
  await bottomNav.getByRole('button', { name: /Снаряжение/ }).click();
  await page.getByRole('button', { name: 'Свернуть раздел' }).click();
  await page.locator('.civ-full-panel').waitFor({ state: 'detached' });
  await bottomNav.getByRole('button', { name: /Снаряжение/ }).click();
  await page.keyboard.press('Escape');
  await page.locator('.civ-full-panel').waitFor({ state: 'detached' });

  // Every main section uses the same overlay architecture.
  for (const [label, marker] of [
    ['Боссы', 'Охота и трофеи'],
    ['Карта', 'Путь цивилизации'],
    ['Крафт', 'Верстак'],
    ['Племя', 'Социальный прогресс'],
  ]) {
    await bottomNav.getByRole('button', { name: new RegExp(label, 'i') }).click();
    await page.locator('.civ-full-panel').waitFor();
    await assertOverlayGeometry(label);
    assert.match(await page.locator('.civ-full-panel').textContent(), new RegExp(marker, 'i'));
    await bottomNav.getByRole('button', { name: new RegExp(label, 'i') }).click();
    await page.locator('.civ-full-panel').waitFor({ state: 'detached' });
  }

  // Boss combat is functional: defeat the first boss and verify a real persisted drop.
  await bottomNav.getByRole('button', { name: /Боссы/ }).click();
  await page.getByRole('button', { name: /Вожак обезьян/ }).click();
  assert.match(await page.locator('.civ-boss-detail').textContent(), /Тотем вожака/);
  assert.equal(await page.locator('.civ-boss-list .civ-generated-boss').count(), 3);
  assert.equal(await page.locator('.civ-boss-art .civ-generated-boss.large').count(), 1);
  const apeHpBefore = await page.locator('.civ-boss-hp').textContent();
  for (let hit = 0; hit < 4; hit += 1) {
    await page.getByRole('button', { name: /Атаковать/ }).click();
    await page.waitForTimeout(25);
  }
  const apeHpAfter = await page.locator('.civ-boss-hp').textContent();
  assert.notEqual(apeHpAfter, apeHpBefore);
  assert.match(apeHpAfter, /0\/70/);

  await page.waitForFunction(() => {
    const raw = localStorage.getItem('4rrum.civilization.alpha.v1.progress');
    if (!raw) return false;
    const progress = JSON.parse(raw);
    return progress.bossWins?.ape === 1 && progress.loot?.['Тотем вожака'] === 1;
  });

  await page.getByRole('button', { name: 'Свернуть раздел' }).click();

  // The trophy is visible in the actual inventory screen.
  await page.getByRole('button', { name: 'Открыть меню персонажа' }).click();
  await page.locator('.civ-player-menu').getByRole('button', { name: /Инвентарь/ }).click();
  await page.locator('.civ-full-panel').waitFor();
  const totemInventoryRow = page.locator('.civ-inventory-groups article').filter({ hasText: 'Тотем вожака' });
  assert.match(await totemInventoryRow.textContent(), /1/);
  await page.getByRole('button', { name: 'Свернуть раздел' }).click();

  // Desktop viewport matrix stays one-screen.
  for (const [width, height] of [[1720, 864], [1600, 900], [1366, 768], [1280, 800], [1024, 768]]) {
    await page.setViewportSize({ width, height });
    await page.waitForTimeout(80);
    await assertOneScreen(`hub ${width}x${height}`);
    await bottomNav.getByRole('button', { name: /Карта/ }).click();
    await page.locator('.civ-full-panel').waitFor();
    await assertOverlayGeometry(`map ${width}x${height}`);
    await bottomNav.getByRole('button', { name: /Карта/ }).click();
  }

  await page.setViewportSize({ width: 1720, height: 864 });
  const premiumCave = page.locator('.civ-cave-background');
  assert.match(await premiumCave.getAttribute('src'), /cave-hub-premium\.webp$/);
  assert(
    await premiumCave.evaluate((img) => img instanceof HTMLImageElement && img.complete && img.naturalWidth > 0),
    'premium cave asset must load',
  );
  await page.screenshot({ path: output + '/civilization-hub-1720x864.png', fullPage: false });
  await bottomNav.getByRole('button', { name: /Снаряжение/ }).click();
  await page.getByRole('button', { name: /Оружие/ }).click();
  await assertOverlayGeometry('equipment screenshot');
  assert(
    await page.locator('.civ-generated-item').count() >= 8,
    'generated equipment art should cover the early weapon catalog',
  );
  assert.match(
    await page.locator('.civ-generated-item').first().evaluate((node) => getComputedStyle(node).backgroundImage),
    /equipment-sheet\.webp/,
  );
  await page.screenshot({ path: output + '/civilization-equipment-1720x864.png', fullPage: false });
  await bottomNav.getByRole('button', { name: /Снаряжение/ }).click();

  await bottomNav.getByRole('button', { name: /Боссы/ }).click();
  await page.getByRole('button', { name: /Саблезубый тигр/ }).click();
  assert.equal(await page.locator('.civ-generated-boss').count(), 4);
  assert.match(
    await page.locator('.civ-generated-boss').first().evaluate((node) => getComputedStyle(node).backgroundImage),
    /boss-sheet\.webp/,
  );
  await page.screenshot({ path: output + '/civilization-bosses-1720x864.png', fullPage: false });
  await page.getByRole('button', { name: 'Свернуть раздел' }).click();

  for (const [label, file] of [
    ['Карта', 'civilization-map-1720x864.png'],
    ['Крафт', 'civilization-craft-1720x864.png'],
    ['Племя', 'civilization-tribe-1720x864.png'],
  ]) {
    await bottomNav.getByRole('button', { name: new RegExp(label, 'i') }).click();
    await page.locator('.civ-full-panel').waitFor();
    await page.screenshot({ path: output + '/' + file, fullPage: false });
    await page.getByRole('button', { name: 'Свернуть раздел' }).click();
  }

  await page.getByRole('button', { name: 'Открыть меню персонажа' }).click();
  await page.locator('.civ-player-menu').getByRole('button', { name: /Профиль/ }).click();
  await page.screenshot({ path: output + '/civilization-profile-1720x864.png', fullPage: false });
  await page.getByRole('button', { name: 'Свернуть раздел' }).click();

  // Character creation, equipped item and boss loot all survive reload.
  await page.reload({ waitUntil: 'networkidle' });
  assert.equal(await page.getByRole('dialog', { name: 'Создание персонажа' }).count(), 0);

  await bottomNav.getByRole('button', { name: /Снаряжение/ }).click();
  await page.getByRole('button', { name: /Оружие/ }).click();
  await page.locator('.civ-item-card').filter({ hasText: 'Каменный топор' }).first().click();
  assert.match(await page.locator('.civ-item-detail').getByRole('button').textContent(), /Используется/);
  await page.getByRole('button', { name: 'Свернуть раздел' }).click();

  await page.getByRole('button', { name: 'Открыть меню персонажа' }).click();
  await page.locator('.civ-player-menu').getByRole('button', { name: /Инвентарь/ }).click();
  await page.locator('.civ-full-panel').waitFor();
  assert.match(
    await page.locator('.civ-inventory-groups article').filter({ hasText: 'Тотем вожака' }).textContent(),
    /1/,
  );
  await page.getByRole('button', { name: 'Свернуть раздел' }).click();

  // Legacy Office route must preserve old bookmarks by redirecting to Civilization.
  await page.goto('http://127.0.0.1:' + port + '/applications/games/office', { waitUntil: 'networkidle' });
  assert.match(page.url(), /\/applications\/games\/civilization/);

  assert.deepEqual(pageErrors, []);
  console.log('Civilization alpha: creation, compact shell, scoped tasks, central panels, equipment persistence, real boss drops and desktop matrix passed');
} finally {
  await browser?.close();
  web.kill('SIGTERM');
  upstream.close();
}
