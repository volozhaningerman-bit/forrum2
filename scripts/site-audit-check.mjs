import { readFileSync, existsSync } from 'node:fs';

const failures = [];
function requireFile(path) {
  if (!existsSync(path)) failures.push(`missing ${path}`);
}
function expect(path, pattern, label) {
  if (!existsSync(path)) { failures.push(`missing ${path}`); return; }
  const text = readFileSync(path, 'utf8');
  if (!pattern.test(text)) failures.push(`${path}: ${label}`);
}

for (const path of [
  'apps/web/app/robots.ts',
  'apps/web/app/sitemap.ts',
  'apps/web/app/manifest.ts',
  'apps/web/app/icon.svg',
  'apps/web/app/error.tsx',
  'apps/web/app/loading.tsx',
  'apps/web/app/opengraph-image.tsx',
  'apps/web/app/twitter-image.tsx',
]) requireFile(path);

expect('apps/web/app/layout.tsx', /metadataBase:\s*siteUrl/, 'metadataBase is missing');
expect('apps/web/app/layout.tsx', /openGraph:/, 'OpenGraph metadata is missing');
expect('apps/web/app/layout.tsx', /twitter:/, 'Twitter metadata is missing');
expect('apps/web/app/layout.tsx', /application\/ld\+json/, 'WebSite structured data is missing');
const rootLayout = readFileSync('apps/web/app/layout.tsx', 'utf8');
if (/alternates:\s*\{\s*canonical:\s*['"]\/['"]/.test(rootLayout)) failures.push('layout: root metadata must not force homepage canonical onto every route');
if (/openGraph:\s*\{[\s\S]{0,300}?url:\s*['"]\/['"]/.test(rootLayout)) failures.push('layout: root OpenGraph URL must not be inherited as homepage URL on every route');
if (/openGraph:[\s\S]{0,500}?hero-planet\.svg/.test(rootLayout) || /twitter:[\s\S]{0,500}?hero-planet\.svg/.test(rootLayout)) failures.push('layout: social previews must use generated PNG cards, not SVG hero art');
expect('apps/web/app/opengraph-image.tsx', /contentType\s*=\s*['"]image\/png['"]/, 'OpenGraph image must render PNG');
expect('apps/web/app/twitter-image.tsx', /contentType\s*=\s*['"]image\/png['"]/, 'Twitter image must render PNG');

for (const path of [
  'apps/web/app/page.tsx',
  'apps/web/app/communities/page.tsx',
  'apps/web/app/applications/page.tsx',
  'apps/web/app/digital-services/page.tsx',
  'apps/web/app/services/page.tsx',
  'apps/web/app/events/page.tsx',
  'apps/web/app/projects/page.tsx',
  'apps/web/app/rules/page.tsx',
  'apps/web/app/support/page.tsx',
  'apps/web/app/search/page.tsx',
]) expect(path, /alternates:\s*\{\s*canonical:/, 'public route canonical metadata is missing');

for (const path of [
  'apps/web/app/p/[slug]/page.tsx',
  'apps/web/app/communities/[slug]/page.tsx',
  'apps/web/app/u/[username]/page.tsx',
]) expect(path, /generateMetadata[\s\S]*alternates:\s*\{\s*canonical/, 'dynamic public route metadata/canonical is missing');

expect('apps/web/next.config.ts', /Content-Security-Policy/, 'CSP header is missing');
expect('apps/web/next.config.ts', /Strict-Transport-Security/, 'HSTS header is missing');
expect('apps/web/next.config.ts', /X-Content-Type-Options/, 'nosniff header is missing');
expect('apps/web/next.config.ts', /X-Frame-Options/, 'clickjacking protection is missing');
expect('apps/web/next.config.ts', /Permissions-Policy/, 'Permissions-Policy is missing');
expect('apps/web/next.config.ts', /Referrer-Policy/, 'Referrer-Policy is missing');
expect('apps/web/next.config.ts', /Cross-Origin-Resource-Policy/, 'Cross-Origin-Resource-Policy is missing');
expect('apps/web/next.config.ts', /X-Permitted-Cross-Domain-Policies/, 'cross-domain policy hardening is missing');
expect('apps/web/next.config.ts', /X-Robots-Tag[^\n]*noindex/, 'private-route X-Robots-Tag protection is missing');

expect('apps/api/src/main.ts', /trust proxy/, 'production proxy trust is missing for real client IP handling');
expect('apps/api/src/main.ts', /ValidationPipe\(\{[^}]*whitelist:\s*true[^}]*forbidNonWhitelisted:\s*true/s, 'strict DTO validation is missing');
expect('apps/api/src/main.ts', /helmet\(/, 'Helmet middleware is missing');

expect('apps/web/components/reference-home.tsx', /width="1600" height="420" fetchPriority="high"/, 'hero intrinsic dimensions/LCP hint are missing');
expect('apps/web/components/reference-home.tsx', /aria-live="polite"/, 'dynamic forum feed live region is missing');
const homeSource = readFileSync('apps/web/components/reference-home.tsx', 'utf8');
const highPriorityImages = (homeSource.match(/fetchPriority="high"/g) ?? []).length;
if (highPriorityImages !== 1) failures.push(`homepage: expected exactly one high-priority image (the LCP hero), found ${highPriorityImages}`);
if (!/skipInitialDefaultFeed\.current/.test(homeSource)) failures.push('homepage: hydration should not immediately refetch the server-rendered default feed');
const homePage = readFileSync('apps/web/app/page.tsx', 'utf8');
if (/publicApi<HomeInitialData\['events'\]>\('\/events'\)/.test(homePage)) failures.push('homepage: unused events API request reintroduced');
const homeRevision = homeSource.match(/data-home-revision="([^"\s]+)"/)?.[1];
for (const workflow of ['.github/workflows/deploy-firstvds-web.yml', '.github/workflows/production-deploy-verify.yml']) {
  const expectedRevision = readFileSync(workflow, 'utf8').match(/EXPECTED_HOME_REVISION:\s*(\S+)/)?.[1];
  if (!homeRevision || expectedRevision !== homeRevision) failures.push(`${workflow}: expected homepage revision must match rendered ${homeRevision}`);
}
const homeCss = readFileSync('apps/web/app/home-alpha.css', 'utf8');
if (!/@media \(prefers-reduced-data:reduce\)/.test(homeCss)) failures.push('homepage: reduced-data preference fallback is missing');
if (!/@media \(forced-colors:active\)/.test(homeCss)) failures.push('homepage: forced-colors keyboard/structure support is missing');

for (const path of [
  '.github/workflows/forrum-v34-ai-reference-20260909.yml',
  '.github/workflows/forrum-v34-ai-reference-20260909(1).yml',
]) expect(path, /Archived workflow/, 'obsolete migration workflow must stay archived');

const sitemap = readFileSync('apps/web/app/sitemap.ts', 'utf8');
if (/lastModified:\s*now/.test(sitemap)) failures.push('sitemap: synthetic current timestamps create false recrawl signals');

if (failures.length) {
  console.error('Site audit regression check failed:\n' + failures.map(item => '- ' + item).join('\n'));
  process.exit(1);
}
console.log('Site audit regression check passed: SEO, security, resilience, accessibility and performance guardrails are present.');
