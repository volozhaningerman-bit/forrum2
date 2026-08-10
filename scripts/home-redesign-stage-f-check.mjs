import fs from 'node:fs';

const home = fs.readFileSync('apps/web/components/home-dashboard.tsx', 'utf8');
const page = fs.readFileSync('apps/web/app/page.tsx', 'utf8');
const css = fs.readFileSync('apps/web/app/globals.css', 'utf8');
const schema = fs.readFileSync('apps/api/prisma/schema.prisma', 'utf8');
const governance = fs.readFileSync('apps/api/src/governance/governance.controller.ts', 'utf8');

function requireMarker(source, marker, label) {
  if (!source.includes(marker)) throw new Error(`${label}: missing ${marker}`);
}
function forbidMarker(source, marker, label) {
  if (source.includes(marker)) throw new Error(`${label}: forbidden ${marker}`);
}

requireMarker(home, 'home-right-stage-f', 'Stage F right rail');
requireMarker(home, 'home-news-stage-f', 'Stage F news');
requireMarker(home, 'Новости', 'Stage F news title');
requireMarker(home, 'news.slice(0, 5)', 'Stage F news limit');
requireMarker(home, 'home-participation-stage-f', 'Stage F participation');
requireMarker(home, 'Стать куратором', 'Stage F curator tab');
requireMarker(home, 'Предложить раздел', 'Stage F section tab');
requireMarker(home, "api('/governance/curator-applications'", 'curator form submission');
requireMarker(home, "api('/governance/proposals'", 'section proposal submission');

forbidMarker(home, '>Актуальное<', 'legacy current rail');
forbidMarker(home, 'Новое в Мастерской', 'legacy workshop rail');
forbidMarker(home, 'Новые сообщества', 'legacy communities rail');

requireMarker(page, "'/news'", 'server news data');
requireMarker(css, 'FORRUM_HOME_REDESIGN_STAGE_F_V11', 'Stage F CSS');
requireMarker(schema, 'model CuratorApplication', 'curator application model');
requireMarker(schema, 'curatorInterest', 'proposal curator interest');
requireMarker(governance, "@Post('curator-applications')", 'curator application endpoint');

console.log('FORRUM Home Redesign Stage F contract passed.');
