import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = 'apps/web';
const files = [];
function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) walk(path);
    else if (path.endsWith('.tsx')) files.push(path);
  }
}
walk(root);
const errors = [];
for (const file of files) {
  const text = readFileSync(file, 'utf8');
  for (const match of text.matchAll(/<img\b[^>]*>/gs)) {
    if (!/\balt\s*=/.test(match[0])) errors.push(`${file}: image without alt`);
  }
  for (const match of text.matchAll(/<button\b[^>]*>([\s\S]*?)<\/button>/g)) {
    const opening = match[0].slice(0, match[0].indexOf('>') + 1);
    const name = match[1].replace(/<[^>]+>/g, '').trim();
    if (!name && !/aria-label\s*=|title\s*=/.test(opening)) errors.push(`${file}: button without accessible name`);
    if (/onClick\s*=/.test(opening) && !/\btype\s*=/.test(opening)) errors.push(`${file}: onClick button without explicit type`);
  }
}
const layout = readFileSync('apps/web/app/layout.tsx', 'utf8');
if (!/className="skip-link"/.test(layout) || !/id="main-content"/.test(layout)) errors.push('layout: skip link/main target missing');
const css = readFileSync('apps/web/app/globals.css', 'utf8');
if (!/:focus-visible/.test(css)) errors.push('globals.css: visible keyboard focus rule missing');
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`Accessibility source check passed: ${files.length} TSX files, named images/buttons, explicit action button types, skip link and visible focus.`);
