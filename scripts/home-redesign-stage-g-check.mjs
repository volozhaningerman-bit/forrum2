import fs from 'node:fs';

const home = fs.readFileSync('apps/web/components/home-dashboard.tsx', 'utf8');
const css = fs.readFileSync('apps/web/app/globals.css', 'utf8');
const rules = fs.readFileSync('apps/web/app/rules/page.tsx', 'utf8');
const support = fs.readFileSync('apps/web/app/support/page.tsx', 'utf8');
const layout = fs.readFileSync('apps/web/app/layout.tsx', 'utf8');
const siteFooter = fs.readFileSync('apps/web/components/site-footer.tsx', 'utf8');

function requireMarker(source, marker, label) {
  if (!source.includes(marker)) throw new Error(`${label}: missing ${marker}`);
}
function forbidMarker(source, marker, label) {
  if (source.includes(marker)) throw new Error(`${label}: forbidden ${marker}`);
}

requireMarker(layout, '<SiteFooter/>', 'global footer placement');
requireMarker(siteFooter, 'site-footer', 'global footer component');
requireMarker(siteFooter, 'href="/rules"', 'Rules footer link');
requireMarker(siteFooter, 'href="/support"', 'Support footer link');
requireMarker(siteFooter, 'href="/#propose-section"', 'Section proposal footer action');
requireMarker(siteFooter, 'href="/#become-curator"', 'Curator footer action');
requireMarker(home, 'id="home-participation"', 'Participation scroll target');

requireMarker(css, 'FORRUM_HOME_REDESIGN_STAGE_G_V11', 'Stage G CSS');
requireMarker(css, 'min-height: calc(100dvh - 52px)', 'dark viewport completion');
requireMarker(css, '.home-reference-footer', 'footer styling');

requireMarker(rules, 'Правила', 'Rules page');
requireMarker(rules, 'Кураторы и модерация', 'Rules moderation section');
requireMarker(support, 'Поддержка', 'Support page');
requireMarker(support, 'Найти «Обратную связь»', 'Support feedback path');

forbidMarker(home, 'О проекте', 'unapproved footer item');

console.log('FORRUM Home Redesign Stage G contract passed.');
