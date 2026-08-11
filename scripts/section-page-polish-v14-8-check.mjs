
import fs from 'node:fs';

const page = fs.readFileSync(
  'apps/web/app/communities/[slug]/category-page.tsx',
  'utf8',
);
const css = fs.readFileSync('apps/web/app/globals.css', 'utf8');
const seed = fs.readFileSync('apps/api/prisma/seed.ts', 'utf8');

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
  'FORRUM_SECTION_PAGE_LAYOUT_V14_7',
  'FORRUM_SECTION_PAGE_POLISH_V14_8',
  'data-section-polish="v14-8"',
  'function SectionGlyph({ slug }',
  'className="section-symbol"',
  '<SectionGlyph slug={community.slug} />',
  '<SectionGlyph slug={data.slug} />',
  'className="section-category-tree"',
  'className="section-topic-table"',
  'className={`section-topic-row ${',
  'href={`/u/${item.author.username}`}',
  'href={`/create?community=${encodeURIComponent(data.slug)}&format=TOPIC`}',
]) {
  requireMarker(page, marker, 'Section Page Polish V14.8');
}

for (const marker of [
  "import { CommunityMark } from '@/components/community-mark';",
  '<CommunityMark',
  '<PublicationCard',
  "from '@/components/publication-card'",
  'className="dashboard-sidebar"',
]) {
  forbidMarker(page, marker, 'retired section-page visual');
}

for (const marker of [
  'FORRUM_SECTION_PAGE_POLISH_V14_8',
  '.section-page-v14-4[data-section-polish="v14-8"] .section-symbol',
  'grid-template-columns: 246px minmax(0, 1fr);',
  'width: 58px;',
  'height: 58px;',
  'width: 46px;',
  'height: 46px;',
  'font-size: 12.45px;',
]) {
  requireMarker(css, marker, 'Section Page Polish V14.8 CSS');
}

for (const marker of [
  'FORRUM_SECTION_PAGE_POLISH_V14_8_DEMO_TOPICS',
  "slug: 'promotion-first-users-without-ads'",
  "slug: 'promotion-channel-audit'",
  "slug: 'promotion-organic-growth-checklist'",
  "slug: 'promotion-retention-after-launch'",
  'viewCount: 840',
  'pinnedUntil',
  'promotionDemoComments',
]) {
  requireMarker(seed, marker, 'Section Page Polish V14.8 demo seed');
}

requireMarker(
  page,
  'PublicationCardData',
  'publication data type retained',
);

console.log(
  'FORRUM Section Page Polish V14.8 passed: icon system, hierarchy polish and realistic topic QA content.',
);
