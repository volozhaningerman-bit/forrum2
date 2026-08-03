import fs from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';

export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith('.') && specifier.endsWith('.js') && context.parentURL?.startsWith('file:')) {
    const candidateUrl = new URL(specifier.replace(/\.js$/, '.ts'), context.parentURL);
    if (fs.existsSync(fileURLToPath(candidateUrl))) return { url: candidateUrl.href, shortCircuit: true };
  }
  return nextResolve(specifier, context);
}
