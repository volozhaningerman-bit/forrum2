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
]) requireFile(path);

expect('apps/web/app/layout.tsx', /metadataBase:\s*siteUrl/, 'metadataBase is missing');
expect('apps/web/app/layout.tsx', /openGraph:/, 'OpenGraph metadata is missing');
expect('apps/web/app/layout.tsx', /twitter:/, 'Twitter metadata is missing');
expect('apps/web/app/layout.tsx', /application\/ld\+json/, 'WebSite structured data is missing');

expect('apps/web/next.config.ts', /Content-Security-Policy/, 'CSP header is missing');
expect('apps/web/next.config.ts', /Strict-Transport-Security/, 'HSTS header is missing');
expect('apps/web/next.config.ts', /X-Content-Type-Options/, 'nosniff header is missing');
expect('apps/web/next.config.ts', /X-Frame-Options/, 'clickjacking protection is missing');
expect('apps/web/next.config.ts', /Permissions-Policy/, 'Permissions-Policy is missing');
expect('apps/web/next.config.ts', /Referrer-Policy/, 'Referrer-Policy is missing');

expect('apps/api/src/main.ts', /trust proxy/, 'production proxy trust is missing for real client IP handling');
expect('apps/api/src/main.ts', /ValidationPipe\(\{[^}]*whitelist:\s*true[^}]*forbidNonWhitelisted:\s*true/s, 'strict DTO validation is missing');
expect('apps/api/src/main.ts', /helmet\(/, 'Helmet middleware is missing');

expect('apps/web/components/reference-home.tsx', /width="1600" height="420" fetchPriority="high"/, 'hero intrinsic dimensions/LCP hint are missing');
expect('apps/web/components/reference-home.tsx', /aria-live="polite"/, 'dynamic forum feed live region is missing');

if (failures.length) {
  console.error('Site audit regression check failed:\n' + failures.map(item => '- ' + item).join('\n'));
  process.exit(1);
}
console.log('Site audit regression check passed: SEO, security, resilience, accessibility and performance guardrails are present.');
