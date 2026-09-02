import fs from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';

export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith('.') && context.parentURL?.startsWith('file:')) {
    const candidates = specifier.endsWith('.js')
      ? [specifier.replace(/\.js$/, '.ts')]
      : /\.[a-z0-9]+$/i.test(specifier)
        ? []
        : [`${specifier}.ts`, `${specifier}.tsx`];

    for (const candidate of candidates) {
      const candidateUrl = new URL(candidate, context.parentURL);
      if (fs.existsSync(fileURLToPath(candidateUrl))) {
        return { url: candidateUrl.href, shortCircuit: true };
      }
    }
  }
  return nextResolve(specifier, context);
}
