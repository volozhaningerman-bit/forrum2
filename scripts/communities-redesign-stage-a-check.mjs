import fs from 'node:fs';

const client = fs.readFileSync('apps/web/app/communities/communities-client.tsx', 'utf8');
const nav = fs.readFileSync('apps/web/components/main-nav.tsx', 'utf8');
const footer = fs.readFileSync('apps/web/components/site-footer.tsx', 'utf8');
const css = fs.readFileSync('apps/web/app/globals.css', 'utf8');
const home = fs.readFileSync('apps/web/components/home-dashboard.tsx', 'utf8');

function requireMarker(source, marker, label) {
  if (!source.includes(marker)) throw new Error(`${label}: missing ${marker}`);
}
function forbidMarker(source, marker, label) {
  if (source.includes(marker)) throw new Error(`${label}: forbidden ${marker}`);
}

requireMarker(client, 'community-browser-page communities-v12-stage-a', 'communities Stage A root');
requireMarker(nav, "const onCommunities = pathname === '/communities';", 'approved communities nav mode');
requireMarker(nav, 'const useApprovedNav = onHome || onCommunities;', 'shared approved nav');
requireMarker(nav, "['/news', 'Новости']", 'News navigation');
requireMarker(nav, "href === '/news' && newsUnread", 'News unread indicator');

requireMarker(footer, "const hideFooter = pathname === '/communities';", 'communities footer suppression');
requireMarker(footer, 'if (hideFooter) return null;', 'communities no-footer contract');

requireMarker(css, 'FORRUM_COMMUNITIES_REDESIGN_STAGE_A_HEADER_V12', 'reused homepage header CSS');
requireMarker(css, 'FORRUM_COMMUNITIES_REDESIGN_STAGE_A_V12', 'communities dark foundation');
requireMarker(css, 'body:has(.communities-v12-stage-a)', 'communities dark body scope');
requireMarker(css, '.communities-v12-stage-a .community-browser-index', 'obsolete left index removal');

forbidMarker(client, 'communities-v12-stage-b', 'future Stage B leaked into Stage A');
forbidMarker(client, 'communities-v12-catalogue', 'future catalogue redesign leaked into Stage A');
forbidMarker(client, 'communities-v12-hierarchy-panel', 'future hierarchy panel leaked into Stage A');

requireMarker(home, 'home-discussed-stage-d', 'approved homepage discussed table');
requireMarker(home, 'home-new-topics-stage-e', 'approved homepage new table');
requireMarker(home, 'home-right-stage-f', 'approved homepage right rail');
requireMarker(home, 'home-curator-requirements-stage-h', 'approved homepage curator form');

console.log('FORRUM Communities Redesign Stage A contract passed.');
