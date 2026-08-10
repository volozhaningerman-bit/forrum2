import fs from 'node:fs';

const home = fs.readFileSync('apps/web/components/home-dashboard.tsx', 'utf8');
const css = fs.readFileSync('apps/web/app/globals.css', 'utf8');
const layout = fs.readFileSync('apps/web/app/layout.tsx', 'utf8');
const footer = fs.readFileSync('apps/web/components/site-footer.tsx', 'utf8');
const seed = fs.readFileSync('apps/api/prisma/seed.ts', 'utf8');

function requireMarker(source, marker, label) {
  if (!source.includes(marker)) throw new Error(`${label}: missing ${marker}`);
}
function forbidMarker(source, marker, label) {
  if (source.includes(marker)) throw new Error(`${label}: forbidden ${marker}`);
}

requireMarker(layout, "import { SiteFooter }", 'global footer import');
requireMarker(layout, '<SiteFooter/>', 'global footer render');
requireMarker(layout, 'app-page-frame', 'global page frame');
requireMarker(footer, 'site-footer-inner', 'compact global footer');
requireMarker(footer, 'href="/rules"', 'rules footer link');
requireMarker(footer, 'href="/support"', 'support footer link');
requireMarker(footer, 'href="/#propose-section"', 'section proposal footer link');
requireMarker(footer, 'href="/#become-curator"', 'curator footer link');
forbidMarker(footer, 'position: fixed', 'footer overlap risk');
forbidMarker(home, 'home-reference-footer home-reference-footer-stage-g', 'duplicate homepage footer');

requireMarker(home, 'FORRUM_HOME_STAGE_H_PARTICIPATION_HASH', 'footer participation routing');
requireMarker(home, 'home-curator-requirements-stage-h', 'lighter curator requirements');
requireMarker(css, 'FORRUM_HOME_REDESIGN_STAGE_H_V11', 'Stage H CSS');
requireMarker(css, '.home-reference-topic-meta::before', 'green metadata dot');
requireMarker(css, '.home-reference-topic-row::before', 'green row detail');
requireMarker(css, '.site-footer-home', 'dark homepage footer');
requireMarker(css, 'min-height: auto !important', 'homepage viewport correction');

requireMarker(seed, 'FORRUM_HOME_STAGE_H_NEWS_SEED', 'Stage H news seed');
requireMarker(seed, 'forrum-home-dark-redesign', 'first additional news material');
requireMarker(seed, 'forrum-curator-applications-open', 'second additional news material');

console.log('FORRUM Home Redesign Stage H contract passed.');
