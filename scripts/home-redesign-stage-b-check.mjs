import { readFileSync } from 'node:fs';

const css = readFileSync('apps/web/app/globals.css', 'utf8');
const nav = readFileSync('apps/web/components/main-nav.tsx', 'utf8');
const header = readFileSync('apps/web/components/site-header.tsx', 'utf8');
const home = readFileSync('apps/web/components/home-dashboard.tsx', 'utf8');

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
  'FORRUM_HOME_REDESIGN_STAGE_B_V11',
  'body:has(.home-stage-one) .header',
  'border-bottom-color: #19d39a',
  'background: #0b1417',
  'backdrop-filter: none',
]) {
  requireMarker(css, marker, 'Stage B CSS');
}

const start = css.indexOf('/* FORRUM_HOME_REDESIGN_STAGE_B_V11');
const end = css.indexOf('/* /FORRUM_HOME_REDESIGN_STAGE_B_V11 */');
if (start < 0 || end < start) throw new Error('Stage B CSS markers are invalid');
const stage = css.slice(start, end);

for (const forbidden of [
  'linear-gradient',
  'radial-gradient',
  'backdrop-filter: blur',
  'filter: blur',
  'text-shadow',
]) {
  forbidMarker(stage, forbidden, 'Stage B anti-AI contract');
}

for (const marker of [
  "['/news', 'Новости']",
  "['/media', 'Медиа']",
  "['/events', 'События']",
  "const newsSeenKey = 'forrum.news.seen-signature'",
  "api<ActivityItem[]>('/news')",
  "pathname.startsWith('/news')",
  "href === '/news' && newsUnread",
  'Есть новые материалы в Новостях',
]) {
  requireMarker(nav, marker, 'home header navigation');
}

const homeLinksBlock = nav.split('const homeLinks = [', 2)[1]?.split('] as const;', 1)[0] ?? '';
forbidMarker(homeLinksBlock, "'/workshop'", 'homepage navigation');

requireMarker(nav, "['/workshop', 'Мастерская']", 'legacy navigation preservation');
requireMarker(header, '<MainNav />', 'site header baseline');
requireMarker(header, '<NavCounters />', 'site header counters');
requireMarker(home, 'home-stage-one', 'homepage scope');

console.log('FORRUM Home Redesign Stage B V11 contract passed.');
