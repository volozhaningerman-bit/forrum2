import fs from 'node:fs';

const client = fs.readFileSync('apps/web/app/communities/communities-client.tsx', 'utf8');
const css = fs.readFileSync('apps/web/app/globals.css', 'utf8');
const home = fs.readFileSync('apps/web/components/home-dashboard.tsx', 'utf8');
const nav = fs.readFileSync('apps/web/components/main-nav.tsx', 'utf8');
const footer = fs.readFileSync('apps/web/components/site-footer.tsx', 'utf8');

function requireMarker(source, marker, label) {
  if (!source.includes(marker)) throw new Error(`${label}: missing ${marker}`);
}
function forbidMarker(source, marker, label) {
  if (source.includes(marker)) throw new Error(`${label}: forbidden ${marker}`);
}

requireMarker(client, 'communities-v12-stage-a', 'Stage A root');
requireMarker(client, 'communities-v12-hero', 'Stage B heading');
requireMarker(client, 'communities-v12-hero-icon', 'Stage B system icon');
requireMarker(client, 'Сообщества — основные направления FORRUM.', 'approved heading copy');
requireMarker(client, 'За порядком и развитием следят кураторы, выбранные участниками.', 'approved curator copy');
requireMarker(client, 'href="/communities/proposals"', 'proposal CTA');
requireMarker(client, 'Предложить сообщество', 'proposal CTA label');
requireMarker(client, 'href="/#become-curator"', 'curator CTA');
requireMarker(client, 'Стать куратором', 'curator CTA label');

forbidMarker(client, '<header className="compact-page-heading">', 'legacy Communities heading');

requireMarker(css, 'FORRUM_COMMUNITIES_REDESIGN_STAGE_B_V12', 'Stage B CSS');
requireMarker(css, '.communities-v12-stage-a .communities-v12-hero', 'Stage B hero selector');
forbidMarker(css, '.communities-v12-stage-a .communities-v12-hero {\\n  min-height: 300px', 'oversized hero');

requireMarker(nav, "const onCommunities = pathname === '/communities';", 'approved Communities header');
requireMarker(footer, "const hideFooter = pathname === '/communities';", 'no Communities footer');

requireMarker(home, 'home-discussed-stage-d', 'approved homepage discussed table');
requireMarker(home, 'home-new-topics-stage-e', 'approved homepage new topics table');
requireMarker(home, 'home-right-stage-f', 'approved homepage right rail');

console.log('FORRUM Communities Redesign Stage B contract passed.');
