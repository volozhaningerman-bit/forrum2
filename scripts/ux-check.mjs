import { readFile, readdir } from 'node:fs/promises';
import { join, extname } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const sourceRoots = ['apps/web/app', 'apps/web/components'];
const files = [];
async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await walk(path);
    else if (['.tsx', '.ts'].includes(extname(path))) files.push(path);
  }
}
for (const directory of sourceRoots) await walk(join(root, directory));

const banned = [
  ['fabricated online count', /Сегодня онлайн/],
  ['fabricated trust percent', /Доверие\s+\d+%/],
  ['fabricated advertising availability', /Свободно мест:\s*\d/],
  ['hard-coded poll votes', /Голосов:\s*2\s?341/],
  ['fake promo code', /Промокод:/],
];
const failures = [];
for (const file of files) {
  const text = await readFile(file, 'utf8');
  for (const [label, pattern] of banned) if (pattern.test(text)) failures.push(`${label}: ${file.replace(root, '')}`);
}

const interactionFailures = [];
for (const file of files) {
  const text = await readFile(file, 'utf8');
  if (/window\.prompt\s*\(/.test(text)) interactionFailures.push(`native browser prompt in interface: ${file.replace(root, '')}`);
  if (/<footer><button>Нравится<\/button><button>Ответить<\/button>/.test(text)) interactionFailures.push(`non-functional wall actions: ${file.replace(root, '')}`);
  if (/navigator\.clipboard\?\.writeText/.test(text)) interactionFailures.push(`silent clipboard action without feedback: ${file.replace(root, '')}`);
  if (/verify-email\?email=/.test(text)) interactionFailures.push(`email exposed in verification URL: ${file.replace(root, '')}`);
}
failures.push(...interactionFailures);

const authRequirements = [
  ['apps/web/app/register/page.tsx', /username-availability/, 'registration does not check username availability'],
  ['apps/web/app/register/page.tsx', /PasswordField/, 'registration does not explain password rules'],
  ['apps/web/app/verify-email/page.tsx', /resend-verification/, 'verification page cannot resend a letter'],
  ['apps/web/app/login/page.tsx', /onboardingCompleted/, 'login does not continue to onboarding'],
  ['apps/web/app/welcome/page.tsx', /onboarding\/complete/, 'onboarding completion is not persisted'],
];

const feedRequirements = [
  ['apps/web/app/settings/interests/page.tsx', /recommendationsEnabled/, 'feed recommendations cannot be disabled'],
  ['apps/web/app/settings/interests/page.tsx', /hidden-communities/, 'hidden communities cannot be restored'],
  ['apps/web/components/publication-card.tsx', /hidden-publications/, 'publication feedback does not persist'],
  ['apps/web/components/feed-view.tsx', /saved/, 'saved feed mode is missing'],
];
for (const [relative, pattern, label] of feedRequirements) {
  const file = join(root, relative);
  try {
    const text = await readFile(file, 'utf8');
    if (!pattern.test(text)) failures.push(`${label}: ${relative}`);
  } catch { failures.push(`missing feed preferences interface: ${relative}`); }
}

for (const [relative, pattern, label] of authRequirements) {
  const file = join(root, relative);
  try {
    const text = await readFile(file, 'utf8');
    if (!pattern.test(text)) failures.push(`${label}: ${relative}`);
  } catch { failures.push(`missing onboarding interface: ${relative}`); }
}


const libraryRequirements = [
  ['apps/web/app/communities/communities-client.tsx', /recentPublicationCount/, 'community directory does not show real recent activity'],
  ['apps/web/app/communities/communities-client.tsx', /collectDescendants/, 'community directory does not support nested subdivisions'],
  ['apps/web/app/subscriptions/page.tsx', /users\/me\/following/, 'author subscriptions page is not connected'],
  ['apps/web/app/subscriptions/page.tsx', /tags\/subscriptions/, 'tag subscriptions page is not connected'],
  ['apps/web/app/saved/page.tsx', /publications\/saved/, 'saved library is not connected'],
  ['apps/web/app/activity/page.tsx', /users\/me\/activity/, 'private activity history is not connected'],
  ['apps/web/app/tags/[slug]/page.tsx', /subscribe/, 'tag page cannot manage subscriptions'],
];
for (const [relative, pattern, label] of libraryRequirements) {
  const file = join(root, relative);
  try {
    const text = await readFile(file, 'utf8');
    if (!pattern.test(text)) failures.push(`${label}: ${relative}`);
  } catch { failures.push(`missing personal library interface: ${relative}`); }
}

const profileTrustRequirements = [
  ['apps/web/app/u/[username]/profile-client.tsx', /localTrust/, 'profile does not show contextual local trust'],
  ['apps/web/app/u/[username]/profile-client.tsx', /usefulPublications/, 'profile does not show useful publications'],
  ['apps/web/app/u/[username]/profile-client.tsx', /achievements/, 'profile does not show verified achievements'],
  ['apps/web/app/u/[username]/profile-client.tsx', /reviews/, 'profile does not show verified reviews'],
  ['apps/web/app/interactions/page.tsx', /\/interactions\//, 'interaction manager is not connected to its API'],
  ['apps/web/app/admin/page.tsx', /community-roles/, 'Control Center cannot manage community role lifecycle'],
  ['apps/api/src/users/users.service.ts', /userId:\s*\{\s*not:\s*userId\s*\}/, 'self reactions or bookmarks can influence trust evidence'],
];
for (const [relative, pattern, label] of profileTrustRequirements) {
  const file = join(root, relative);
  try {
    const text = await readFile(file, 'utf8');
    if (!pattern.test(text)) failures.push(`${label}: ${relative}`);
  } catch { failures.push(`missing profile trust interface: ${relative}`); }
}


const releaseCandidateRequirements = [
  ['apps/web/app/communities/[slug]/manage/page.tsx', /community-management/, 'community workspace is not connected'],
  ['apps/web/app/events/events-client.tsx', /governance\/polls/, 'events hub does not show governance polls'],
  ['apps/web/app/events/create/page.tsx', /\/events/, 'event creation workflow is not connected'],
  ['apps/web/app/portfolio/page.tsx', /\/portfolio\/me/, 'portfolio manager is not connected'],
  ['apps/web/app/u/[username]/profile-client.tsx', /portfolio/, 'profile does not show projects and services'],
  ['apps/web/app/promote/[slug]/page.tsx', /baseDurationPrice/, 'promotion does not disclose its base price'],
  ['apps/web/app/promote/[slug]/page.tsx', /demandSurcharge/, 'promotion does not disclose demand surcharge'],
  ['apps/web/app/wallet/page.tsx', /promotions\/:id\/cancel|promotions\/\$\{id\}\/cancel/, 'wallet cannot stop active promotion'],
  ['apps/web/app/admin/page.tsx', /admin\/promotions/, 'Control Center does not load promotion orders'],
];
for (const [relative, pattern, label] of releaseCandidateRequirements) {
  const file = join(root, relative);
  try {
    const text = await readFile(file, 'utf8');
    if (!pattern.test(text)) failures.push(`${label}: ${relative}`);
  } catch { failures.push(`missing release candidate interface: ${relative}`); }
}

const eventsPage = join(root, 'apps/web/app/events/events-client.tsx');
try {
  const text = await readFile(eventsPage, 'utf8');
  if (/<form[\s>]/.test(text)) failures.push('public events hub contains a creation form');
} catch {}

const globalNavFiles = ['apps/web/components/header.tsx', 'apps/web/components/site-header.tsx'];
for (const relative of globalNavFiles) {
  try {
    const text = await readFile(join(root, relative), 'utf8');
    if (/href=["'{`]\/?(?:projects|services|portfolio)["'}`]/.test(text)) failures.push(`portfolio added visual noise to global navigation: ${relative}`);
  } catch {}
}

const profileFile = join(root, 'apps/web/app/u/[username]/profile-client.tsx');
try {
  const profileText = await readFile(profileFile, 'utf8');
  if (/trustScore|Доверие\s*\{?\s*\d+%/.test(profileText)) failures.push('profile reintroduced a global or percentage trust score');
} catch {}

if (failures.length) {
  console.error('UX truthfulness check failed:\n' + failures.map((item) => `- ${item}`).join('\n'));
  process.exit(1);
}
console.log(`UX truthfulness check passed: ${files.length} interface source files.`);
