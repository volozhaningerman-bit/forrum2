import fs from 'node:fs';

const css = fs.readFileSync('apps/web/app/globals.css', 'utf8');
const layout = fs.readFileSync('apps/web/app/layout.tsx', 'utf8');
const footer = fs.readFileSync('apps/web/components/site-footer.tsx', 'utf8');
const home = fs.readFileSync('apps/web/components/home-dashboard.tsx', 'utf8');

function requireMarker(source, marker, label) {
  if (!source.includes(marker)) throw new Error(`${label}: missing ${marker}`);
}
function forbidMarker(source, marker, label) {
  if (source.includes(marker)) throw new Error(`${label}: forbidden ${marker}`);
}

requireMarker(css, 'FORRUM_HOME_REDESIGN_STAGE_H2_V11', 'Stage H.2 CSS');
requireMarker(css, '.shell { width: min(1180px, calc(100% - 32px));', 'canonical shell');
requireMarker(css, '.app-page-frame > #main-content {', 'page frame main');
requireMarker(css, 'width: min(1180px, calc(100% - 32px));', 'footer shell width');
forbidMarker(css, '.app-page-frame > #main-content {\n  width: 100%;', 'full-width main regression');
requireMarker(layout, '<SiteFooter/>', 'global footer');
requireMarker(footer, 'site-footer-inner', 'global footer component');
requireMarker(home, 'home-right-stage-f', 'approved right rail');
requireMarker(home, 'home-curator-requirements-stage-h', 'approved light curator form');
requireMarker(home, 'home-new-topics-stage-e', 'approved new topics table');

console.log('FORRUM Home Redesign Stage H.2 contract passed.');
