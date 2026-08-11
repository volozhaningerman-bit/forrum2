import fs from 'node:fs';

const page = fs.readFileSync(
  'apps/web/app/communities/[slug]/category-page.tsx',
  'utf8',
);
const service = fs.readFileSync(
  'apps/api/src/communities/communities.service.ts',
  'utf8',
);
const css = fs.readFileSync('apps/web/app/globals.css', 'utf8');

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

requireMarker(page, 'FORRUM_SECTION_PAGE_HEADER_V14_3', 'section header');
requireMarker(
  page,
  'ancestors: Array<{ slug: string; name: string }>;',
  'ancestor contract',
);
requireMarker(page, 'className="section-breadcrumbs"', 'breadcrumbs');
requireMarker(page, '<Link href="/">Главная</Link>', 'home breadcrumb');
requireMarker(
  page,
  '<Link href="/communities">Сообщества</Link>',
  'communities breadcrumb',
);
requireMarker(
  page,
  'data.ancestors.map((ancestor)',
  'recursive breadcrumb chain',
);
requireMarker(page, 'className="section-identity"', 'compact header');
requireMarker(page, 'className="section-identity-mark"', 'section mark');
requireMarker(page, 'Куратор:', 'curator label');
requireMarker(
  page,
  'href={`/u/${curator.user.username}`}',
  'curator profile link',
);
requireMarker(page, 'onClick={toggle}', 'subscription action');
requireMarker(
  page,
  'aria-pressed={data.isSubscribed}',
  'subscription state',
);
requireMarker(
  page,
  'href={`/create?community=${encodeURIComponent(data.slug)}&format=TOPIC`}',
  'topic create link',
);
requireMarker(page, 'Создать тему', 'topic create label');

for (const marker of [
  'className="community-profile"',
  'className="community-cover"',
  'className="community-profile-main"',
  'className="community-utility-links"',
  'className="curator-panel"',
]) {
  forbidMarker(page, marker, 'retired old hero');
}

requireMarker(
  service,
  "select: { id: true, parentId: true, slug: true, name: true }",
  'breadcrumb node lookup',
);
requireMarker(
  service,
  'const ancestors: Array<{ slug: string; name: string }> = [];',
  'ancestor chain',
);
requireMarker(
  service,
  'ancestors.unshift({ slug: ancestor.slug, name: ancestor.name });',
  'ancestor ordering',
);
requireMarker(service, 'ancestors,', 'ancestor API response');

requireMarker(
  css,
  'FORRUM_SECTION_PAGE_HEADER_V14_3',
  'section header styles',
);
requireMarker(css, '.section-breadcrumbs {', 'breadcrumb styles');
requireMarker(css, '.section-identity {', 'identity styles');

console.log('FORRUM Section Page Header V14.3 passed.');
