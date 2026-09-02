import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const read = (path) => {
  assert.equal(existsSync(path), true, `Missing required file: ${path}`);
  return readFileSync(path, 'utf8');
};

const layout = read('apps/web/app/layout.tsx');
const dashboard = read('apps/web/components/home-dashboard.tsx');
const css = read('apps/web/app/home-v20.css');
const discovery = read('apps/web/components/home/discovery-panels.tsx');
const communityTree = read('apps/web/components/home/community-tree.tsx');
const activity = read('apps/web/components/home/activity-panel.tsx');
const news = read('apps/web/components/home/forrum-news-panel.tsx');
const siteHeader = read('apps/web/components/site-header.tsx');

assert.match(
  layout,
  /import '\.\/globals\.css';[\s\S]*import '\.\/home-v20\.css';/,
  'home-v20.css must load after the legacy cascade',
);
assert.equal(
  (dashboard.match(/forrum-home-v20/g) ?? []).length,
  1,
  'The dashboard must expose one v20 scope marker',
);
assert.match(dashboard, /data-home-reference="v20"/);

assert.match(css, /\.forrum-home-v20\s*\{/);
assert.match(css, /body:has\(\.forrum-home-v20\)/);
assert.match(css, /html\.dark[\s\S]*\.forrum-home-v20/);
assert.match(css, /--home-surface:/);
assert.match(css, /--home-accent:/);

for (const selector of ['header', 'brand', 'forrum-home-v16__panel']) {
  assert.doesNotMatch(
    css,
    new RegExp(`^\\s*\\.${selector}\\b`, 'm'),
    `Unscoped selector is not allowed in home-v20.css: .${selector}`,
  );
}

for (const copy of [
  'Старт стрима',
  'Новости участника',
  'Найти специалиста',
  'Предложить работу',
  'Показать кейс',
]) {
  assert.match(discovery, new RegExp(copy));
}
assert.match(communityTree, /структура форума/);
assert.match(communityTree, /Показать всю структуру/);
assert.match(activity, /Обновляется раз в минуту/);
assert.match(news, /is-lead/);
assert.match(siteHeader, /brand-symbol--legacy/);
assert.match(siteHeader, /brand-symbol--neo/);
assert.equal((siteHeader.match(/aria-label="4RRUM"/g) ?? []).length, 1);
assert.match(
  css,
  /body:not\(:has\(\.forrum-home-v20\)\) \.brand-symbol--neo/,
);
assert.match(
  css,
  /body:has\(\.forrum-home-v20\) \.brand-symbol--legacy/,
);

console.log('Home v20 structural contract passed.');
