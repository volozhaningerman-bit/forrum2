import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const publicDir = path.join(root, 'apps', 'web', 'public', 'games', 'civilization');
const chunkDir = path.join(publicDir, 'generated-atlas');
const outputDir = path.join(publicDir, 'art');
const output = path.join(outputDir, 'civilization-atlas.webp');

const chunks = ['atlas-00.b64.txt', 'atlas-01.b64.txt'];
const encodedParts = await Promise.all(
  chunks.map(async (name) => (await readFile(path.join(chunkDir, name), 'utf8')).replace(/\s+/g, '')),
);
const encoded = encodedParts.join('');
const bytes = Buffer.from(encoded, 'base64');

if (bytes.length < 150_000) {
  throw new Error(`Civilization atlas is suspiciously small: ${bytes.length} bytes`);
}
if (bytes.subarray(0, 4).toString('ascii') !== 'RIFF' || bytes.subarray(8, 12).toString('ascii') !== 'WEBP') {
  throw new Error('Civilization atlas is not a valid RIFF/WEBP payload');
}

await mkdir(outputDir, { recursive: true });
await writeFile(output, bytes);
console.log(`Prepared Civilization art atlas: ${path.relative(root, output)} (${bytes.length} bytes)`);
