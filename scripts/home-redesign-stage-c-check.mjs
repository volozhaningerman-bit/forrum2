import { readFileSync } from 'node:fs';

const home = readFileSync('apps/web/components/home-dashboard.tsx', 'utf8');
const css = readFileSync('apps/web/app/globals.css', 'utf8');
const interaction = readFileSync('scripts/ui-interaction-check.mjs', 'utf8');

function requireMarker(source, marker, label) {
  if (!source.includes(marker)) {
    throw new Error(`${label}: missing ${marker}`);
  }
}

function forbidMarker(source, marker, label) {
  if (source.includes(marker)) {
    throw new Error(`${label}: forbidden ${marker}`);
  }
}

for (const marker of [
  'FORRUM_HOME_REDESIGN_STAGE_C_V11',
  'treeCollapsed',
  'home-layout-tree-collapsed',
  'home-tree-panel-toggle',
  'home-tree-collapsed-list',
  'home-tree-collapsed-link',
  'home-tree-icon-link',
  'home-workshop-icon-link',
  'WorkshopTreeIcon',
  'home-tree-expand-surface',
  'home-tree-name-link',
]) {
  requireMarker(home, marker, 'Stage C home tree');
}

forbidMarker(home, 'home-tree-all-link', 'removed catalogue footer');
forbidMarker(home, 'Все категории', 'removed catalogue footer label');

/* Stage C must leave the later redesign areas structurally untouched. */
for (const marker of [
  'Лента обсуждений',
  'По подпискам',
  'Актуальное',
  'Новое в Мастерской',
  'Новые сообщества',
]) {
  requireMarker(home, marker, 'Stage C staged scope');
}

for (const marker of [
  'FORRUM_HOME_REDESIGN_STAGE_C_V11',
  '.home-layout.home-layout-tree-collapsed',
  '.home-tree-panel-toggle',
  '.home-tree-collapsed-list',
  '.home-tree-icon-link',
  'var(--forrum-home-accent-soft)',
]) {
  requireMarker(css, marker, 'Stage C CSS');
}

const start = css.indexOf('/* FORRUM_HOME_REDESIGN_STAGE_C_V11');
const end = css.indexOf('/* /FORRUM_HOME_REDESIGN_STAGE_C_V11 */');
if (start < 0 || end < start) {
  throw new Error('Stage C CSS markers are invalid');
}
const stage = css.slice(start, end);
for (const forbidden of [
  'linear-gradient',
  'radial-gradient',
  'backdrop-filter: blur',
  'filter: blur',
  'box-shadow:',
]) {
  forbidMarker(stage, forbidden, 'Stage C anti-AI contract');
}

requireMarker(
  interaction,
  'FORRUM_HOME_REDESIGN_STAGE_C_V11_INTERACTION_CONTRACT',
  'interaction contract',
);
requireMarker(interaction, "forbidMarker(home, 'Все категории', 'home tree');", 'interaction contract');
requireMarker(interaction, "requireMarker(home, 'home-tree-panel-toggle', 'home tree');", 'interaction contract');
requireMarker(interaction, "requireMarker(home, 'home-tree-icon-link', 'home tree');", 'interaction contract');

console.log('FORRUM Home Redesign Stage C V11 contract passed.');
