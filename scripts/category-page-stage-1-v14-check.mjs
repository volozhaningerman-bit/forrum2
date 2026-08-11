import fs from 'node:fs';

const route = fs.readFileSync(
  'apps/web/app/communities/[slug]/page.tsx',
  'utf8',
);
const page = fs.readFileSync(
  'apps/web/app/communities/[slug]/category-page.tsx',
  'utf8',
);

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

requireMarker(
  route,
  'FORRUM_CATEGORY_ROUTE_STAGE_1_V14',
  'universal category route',
);
requireMarker(
  route,
  'export default async function CategoryRoute',
  'universal category route',
);
requireMarker(
  route,
  "params: Promise<{ slug: string }>",
  'recursive slug route',
);
requireMarker(
  route,
  '`/communities/${encodeURIComponent(slug)}`',
  'existing category API reuse',
);
requireMarker(
  route,
  "from './category-page';",
  'CategoryPage import',
);
requireMarker(route, '<CategoryPage', 'CategoryPage render');

requireMarker(
  page,
  'FORRUM_CATEGORY_PAGE_STAGE_1_V14',
  'CategoryPage',
);
requireMarker(
  page,
  'export function CategoryPage',
  'CategoryPage',
);
requireMarker(
  page,
  'export type Community = {',
  'existing node contract',
);
requireMarker(
  page,
  'api<Community>(`/communities/${slug}`)',
  'existing category loading',
);
requireMarker(
  page,
  '`/communities/${slug}/subscribe`',
  'existing subscription',
);
requireMarker(
  page,
  '`/create?community=${encodeURIComponent(data.slug)}&format=TOPIC`',
  'existing topic creation',
);

forbidMarker(
  route,
  "from './community-client';",
  'retired category client import',
);
forbidMarker(
  route,
  '<CommunityClient',
  'retired category client render',
);
forbidMarker(
  page,
  'export function CommunityClient',
  'retired category component name',
);

if (fs.existsSync(
  'apps/web/app/communities/[slug]/community-client.tsx',
)) {
  throw new Error(
    'retired community-client.tsx still exists after Stage 1',
  );
}

console.log(
  'FORRUM Category Page Stage 1 V14 passed: one universal [slug] CategoryPage route.',
);
