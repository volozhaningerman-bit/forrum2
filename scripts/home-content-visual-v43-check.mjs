import fs from 'node:fs';

const sourcePath = 'apps/web/components/home-dashboard.tsx';
const source = fs.readFileSync(sourcePath, 'utf8');

const required = [
  '// FORRUM_HOME_CONTENT_VISUALS_V43',
  'const publicationTypeVisuals: Record<string, string> = {',
  "NEWS: '/forrum-assets/topic-news.svg'",
  "QUESTION: '/forrum-assets/topic-question.svg'",
  "CASE: '/forrum-assets/topic-case.svg'",
  "DISCUSSION: '/forrum-assets/topic-discussion.svg'",
  "GUIDE: '/forrum-assets/topic-guide.svg'",
  "PROJECT: '/forrum-assets/topic-project.svg'",
  "SERVICE: '/forrum-assets/topic-service.svg'",
  "ANNOUNCEMENT: '/forrum-assets/topic-announcement.svg'",
  'function topicContentVisual(',
  'url={topicContentVisual(item)}',
  'communityVisual(poll.community.slug, poll.community.avatarUrl)',
];

for (const marker of required) {
  if (!source.includes(marker)) {
    throw new Error(`V43 content-visual contract missing: ${marker}`);
  }
}

const itemVisualCount = (
  source.match(/url=\{topicContentVisual\(item\)\}/g) ?? []
).length;

if (itemVisualCount !== 3) {
  throw new Error(
    `V43 expects exactly 3 topic/Actual content visuals; found ${itemVisualCount}.`,
  );
}

if (
  source.includes(
    'url={communityVisual(item.community.slug, item.community.avatarUrl)}',
  )
) {
  throw new Error(
    'V43 left a community-level visual on a content row.',
  );
}

const assetNames = [
  'news',
  'question',
  'case',
  'discussion',
  'guide',
  'project',
  'service',
  'announcement',
];

for (const name of assetNames) {
  const path = `apps/web/public/forrum-assets/topic-${name}.svg`;
  if (!fs.existsSync(path)) {
    throw new Error(`V43 pixel asset is missing: ${path}`);
  }

  const svg = fs.readFileSync(path, 'utf8');
  if (!svg.includes('shape-rendering="crispEdges"')) {
    throw new Error(`V43 asset is not pixel-crisp: ${path}`);
  }
  if (svg.includes('<linearGradient') || svg.includes('<radialGradient')) {
    throw new Error(`V43 asset uses a forbidden gradient: ${path}`);
  }
}

console.log(
  'V43 content visuals: PASS — real topics get deterministic type visuals.',
);
