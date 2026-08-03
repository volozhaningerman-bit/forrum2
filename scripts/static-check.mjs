import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';

const require = createRequire(import.meta.url);
let ts;
try { ts = require('typescript'); }
catch {
  const globalRoot = execFileSync('npm', ['root', '-g'], { encoding: 'utf8' }).trim();
  ts = require(path.join(globalRoot, 'typescript'));
}

const root = process.cwd();
const errors = [];
const sourceFiles = [];
const jsonFiles = [];
const ignored = new Set(['node_modules', '.next', 'dist', '.git', 'backups']);

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    if (ignored.has(name)) continue;
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full);
    else {
      if (/\.(ts|tsx)$/.test(name)) sourceFiles.push(full);
      if (name.endsWith('.json')) jsonFiles.push(full);
    }
  }
}
walk(root);

for (const full of sourceFiles) {
  const source = fs.readFileSync(full, 'utf8');
  const result = ts.transpileModule(source, {
    reportDiagnostics: true,
    compilerOptions: {
      jsx: ts.JsxEmit.ReactJSX,
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.ESNext,
      experimentalDecorators: true,
    },
  });
  for (const diagnostic of result.diagnostics ?? []) {
    errors.push(`${path.relative(root, full)}: ${ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')}`);
  }

  const imports = [...source.matchAll(/(?:from\s+|import\s*)['"](\.[^'"]+)['"]/g)].map((match) => match[1]);
  for (const specifier of imports) {
    if (specifier.includes('/generated/prisma/client.js')) continue; // generated during Prisma setup
    const raw = path.resolve(path.dirname(full), specifier);
    const candidates = [raw, raw.replace(/\.js$/, '.ts'), raw.replace(/\.js$/, '.tsx'), `${raw}.ts`, `${raw}.tsx`, path.join(raw, 'index.ts'), path.join(raw, 'index.tsx')];
    if (!candidates.some((candidate) => fs.existsSync(candidate))) errors.push(`${path.relative(root, full)}: broken local import ${specifier}`);
  }
}

for (const file of jsonFiles) {
  try { JSON.parse(fs.readFileSync(file, 'utf8')); }
  catch (error) { errors.push(`${path.relative(root, file)}: invalid JSON: ${error.message}`); }
}

const schemaPath = path.join(root, 'apps/api/prisma/schema.prisma');
if (!fs.existsSync(schemaPath)) errors.push('apps/api/prisma/schema.prisma is missing');
else {
  const schema = fs.readFileSync(schemaPath, 'utf8');
  const topNames = new Map();
  for (const match of schema.matchAll(/^(model|enum)\s+(\w+)\s*\{/gm)) {
    const key = `${match[1]}:${match[2]}`;
    if (topNames.has(key)) errors.push(`schema.prisma: duplicate ${match[1]} ${match[2]}`);
    topNames.set(key, true);
  }
  for (const block of schema.matchAll(/^model\s+(\w+)\s*\{([\s\S]*?)^\}/gm)) {
    const fields = new Set();
    for (const line of block[2].split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('@@')) continue;
      const field = trimmed.match(/^(\w+)\s+/)?.[1];
      if (!field) continue;
      if (fields.has(field)) errors.push(`schema.prisma: model ${block[1]} has duplicate field ${field}`);
      fields.add(field);
    }
  }
}

const packagePaths = ['package.json', 'apps/api/package.json', 'apps/web/package.json', 'packages/contracts/package.json'];
const bannedDependencies = [/openai/i, /anthropic/i, /langchain/i, /pinecone/i, /weaviate/i, /qdrant/i, /chromadb/i];
for (const relative of packagePaths) {
  const file = path.join(root, relative);
  if (!fs.existsSync(file)) continue;
  const pkg = JSON.parse(fs.readFileSync(file, 'utf8'));
  for (const section of ['dependencies', 'devDependencies', 'optionalDependencies']) {
    for (const dep of Object.keys(pkg[section] ?? {})) {
      if (bannedDependencies.some((pattern) => pattern.test(dep))) errors.push(`${relative}: forbidden AI dependency ${dep}`);
    }
  }
}

const requiredFiles = [
  'apps/api/src/auth/auth.controller.ts',
  'apps/api/src/governance/governance.controller.ts',
  'apps/api/src/moderation/moderation.controller.ts',
  'apps/api/src/workshop/workshop.controller.ts',
  'apps/api/src/telegram/telegram.controller.ts',
  'apps/api/src/tags/tags.controller.ts',
  'apps/api/src/interactions/interactions.controller.ts',
  'apps/api/src/interactions/interactions.module.ts',
  'apps/api/src/community-management/community-management.controller.ts',
  'apps/api/src/community-management/community-management.service.ts',
  'apps/api/src/events/events.controller.ts',
  'apps/api/src/events/events.service.ts',
  'apps/api/src/portfolio/portfolio.controller.ts',
  'apps/api/src/portfolio/portfolio.service.ts',
  'apps/api/src/wallet/rules.ts',
  'apps/api/src/users/achievements.ts',
  'apps/api/src/users/trust.ts',
  'apps/web/app/page.tsx',
  'apps/web/app/events/page.tsx',
  'apps/web/app/welcome/page.tsx',
  'apps/web/app/settings/interests/page.tsx',
  'apps/web/app/subscriptions/page.tsx',
  'apps/web/app/saved/page.tsx',
  'apps/web/app/activity/page.tsx',
  'apps/web/app/interactions/page.tsx',
  'apps/web/app/communities/[slug]/manage/page.tsx',
  'apps/web/app/events/create/page.tsx',
  'apps/web/app/events/[id]/page.tsx',
  'apps/web/app/projects/page.tsx',
  'apps/web/app/services/page.tsx',
  'apps/web/app/portfolio/page.tsx',
  'apps/web/app/portfolio/[id]/page.tsx',
  'apps/web/app/promote/[slug]/page.tsx',
  'apps/web/app/wallet/page.tsx',
  'apps/web/app/u/[username]/page.tsx',
  'apps/web/app/tags/[slug]/page.tsx',
  'apps/web/app/workshop/page.tsx',
  'scripts/smoke-test.ps1',
  'scripts/auto-backup.sh',
];
for (const relative of requiredFiles) if (!fs.existsSync(path.join(root, relative))) errors.push(`${relative} is missing`);

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`Static validation passed: ${sourceFiles.length} TypeScript files, ${jsonFiles.length} JSON files, Prisma structure and local imports.`);
