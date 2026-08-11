import fs from 'node:fs';

const nav = fs.readFileSync('apps/web/components/main-nav.tsx', 'utf8');
const header = fs.readFileSync('apps/web/components/site-header.tsx', 'utf8');
const layout = fs.readFileSync('apps/web/app/layout.tsx', 'utf8');

function requireMarker(source, marker, label) {
  if (!source.includes(marker)) throw new Error(`${label}: missing ${marker}`);
}
function forbidMarker(source, marker, label) {
  if (source.includes(marker)) throw new Error(`${label}: forbidden ${marker}`);
}

requireMarker(nav, 'FORRUM_GLOBAL_HEADER_V13_4', 'global header');

const ordered = [
  "['/', 'Главная']",
  "['/communities', 'Сообщества']",
  "['/services', 'Услуги']",
  "['/media', 'Медиа']",
  "['/news', 'Новости']",
];

let previous = -1;
for (const marker of ordered) {
  const index = nav.indexOf(marker);
  if (index === -1) throw new Error(`global header: missing ${marker}`);
  if (index <= previous) throw new Error(`global header: wrong order at ${marker}`);
  previous = index;
}

for (const marker of [
  'legacyLinks',
  'homeLinks',
  'useApprovedNav',
  'onHome',
  'onCommunities',
  'eventsUnread',
  'eventsSeenKey',
  'checkEvents',
  "['/events', 'События']",
  "['/workshop', 'Мастерская']",
]) {
  forbidMarker(nav, marker, 'retired navigation');
}

requireMarker(nav, "const showDot = href === '/news' && newsUnread;", 'news unread');
requireMarker(nav, 'aria-label="Есть новые материалы в Новостях"', 'news unread a11y');
requireMarker(header, '<MainNav />', 'SiteHeader');
requireMarker(layout, '<SiteHeader/>', 'RootLayout');

console.log(
  'FORRUM Global Header V13.4 passed: Главная · Сообщества · Услуги · Медиа · Новости.',
);
