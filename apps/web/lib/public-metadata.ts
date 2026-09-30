export function metadataText(value: string | null | undefined, fallback: string, max = 180) {
  const cleaned = String(value ?? '')
    .replace(/\[(?:\/?[a-z]+)(?:=[^\]]+)?\]/gi, ' ')
    .replace(/https?:\/\/\S+/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const source = cleaned || fallback;
  return source.length <= max ? source : source.slice(0, max - 1).trimEnd() + '…';
}

export function canonicalPath(...parts: string[]) {
  return '/' + parts.map((part) => encodeURIComponent(part)).join('/');
}
