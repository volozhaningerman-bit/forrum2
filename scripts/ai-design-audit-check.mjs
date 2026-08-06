import fs from 'node:fs';

function read(path) {
  return fs.readFileSync(path, 'utf8');
}

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

const css = read('apps/web/app/globals.css');
const home = read('apps/web/components/home-dashboard.tsx');
const catalogue = read(
  'apps/web/app/communities/communities-client.tsx',
);
const community = read(
  'apps/web/app/communities/[slug]/community-client.tsx',
);

requireMarker(css, 'FORRUM_CANONICAL_INTERFACE_V8', 'V8 baseline');
requireMarker(css, 'FORRUM_AI_DESIGN_AUDIT_V8_1', 'V8.1 CSS');
requireMarker(css, 'min-height: 168px !important', 'compact community header');
requireMarker(css, 'repeat(2, minmax(0, 1fr))', 'dense child navigation');
requireMarker(css, 'font-size: 12.5px !important', 'readable secondary text');
requireMarker(css, 'backdrop-filter: none !important', 'non-glass modal');

requireMarker(home, 'className="visually-hidden">Главная</h1>', 'home heading');
forbidMarker(home, '<h1>Главная</h1>', 'visible standalone home heading');
requireMarker(home, 'home-tree-hitarea', 'home navigation behavior');
requireMarker(catalogue, 'community-browser-hitarea', 'catalogue behavior');
requireMarker(community, 'community-profile', 'community architecture');
requireMarker(community, 'child-community-strip', 'child communities');

const telegramPath = 'apps/web/components/telegram-share-button.tsx';
if (fs.existsSync(telegramPath)) {
  forbidMarker(
    read(telegramPath),
    '<span className="eyebrow">Telegram Share</span>',
    'duplicated Telegram heading',
  );
}

console.log('Confirmed AI-design corrections passed without architecture changes.');
