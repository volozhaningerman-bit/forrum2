export type BbTextNode = { type: 'text'; value: string };
export type BbTagNode = {
  type: 'tag';
  name: string;
  param?: string;
  children: BbNode[];
};
export type BbNode = BbTextNode | BbTagNode;

const supported = new Set([
  'b', 'i', 'u', 's', 'quote', 'code', 'url', 'spoiler',
  'list', 'h2', 'h3', 'color', 'size', 'img', '*',
]);

const tokenPattern =
  /\[(\/)?(b|i|u|s|quote|code|url|spoiler|list|h2|h3|color|size|img|\*)(?:=([^\]]+))?\]/gi;

const allowedColors = new Set([
  'gray', 'blue', 'cyan', 'green', 'yellow',
  'orange', 'red', 'pink', 'purple',
]);

const allowedSizes = new Set([
  'small', 'normal', 'large', 'xlarge',
]);

function appendText(target: BbNode[], value: string) {
  if (!value) return;
  const previous = target[target.length - 1];
  if (previous?.type === 'text') previous.value += value;
  else target.push({ type: 'text', value });
}

export function parseBbcode(source: string): BbNode[] {
  const root: BbTagNode = { type: 'tag', name: 'root', children: [] };
  const stack: BbTagNode[] = [root];
  let cursor = 0;
  tokenPattern.lastIndex = 0;

  for (
    let match = tokenPattern.exec(source);
    match;
    match = tokenPattern.exec(source)
  ) {
    appendText(
      stack[stack.length - 1].children,
      source.slice(cursor, match.index),
    );
    cursor = tokenPattern.lastIndex;
    const closing = Boolean(match[1]);
    const name = match[2].toLowerCase();
    const param = match[3]?.trim();

    if (!supported.has(name)) {
      appendText(stack[stack.length - 1].children, match[0]);
      continue;
    }

    if (name === '*' && !closing) {
      if (stack[stack.length - 1].name === '*') stack.pop();

      const listIndex = [...stack]
        .reverse()
        .findIndex((node) => node.name === 'list');

      if (listIndex < 0) {
        appendText(stack[stack.length - 1].children, match[0]);
        continue;
      }

      const node: BbTagNode = {
        type: 'tag',
        name: '*',
        children: [],
      };

      stack[stack.length - 1].children.push(node);
      stack.push(node);
      continue;
    }

    if (!closing) {
      const node: BbTagNode = {
        type: 'tag',
        name,
        param,
        children: [],
      };
      stack[stack.length - 1].children.push(node);
      stack.push(node);
      continue;
    }

    if (
      name === 'list' &&
      stack[stack.length - 1].name === '*'
    ) {
      stack.pop();
    }

    let matchingIndex = -1;

    for (
      let index = stack.length - 1;
      index > 0;
      index -= 1
    ) {
      if (stack[index].name === name) {
        matchingIndex = index;
        break;
      }
    }

    if (matchingIndex === -1) {
      appendText(stack[stack.length - 1].children, match[0]);
    } else {
      stack.splice(matchingIndex);
    }
  }

  appendText(
    stack[stack.length - 1].children,
    source.slice(cursor),
  );

  return root.children;
}

export function bbcodePlainText(nodes: BbNode[]): string {
  return nodes
    .map((node) => {
      if (node.type === 'text') return node.value;
      if (node.name === 'img') {
        return node.param
          ? `[Изображение: ${node.param}]`
          : '[Изображение]';
      }
      return bbcodePlainText(node.children);
    })
    .join('');
}

export function safeBbcodeUrl(
  value: string | undefined,
): string | null {
  if (!value) return null;

  try {
    const url = new URL(value, 'https://forrum.local');
    if (!['http:', 'https:'].includes(url.protocol)) return null;
    return value;
  } catch {
    return null;
  }
}

export function safeBbcodeImageUrl(
  value: string | undefined,
): string | null {
  const safe = safeBbcodeUrl(value);
  if (!safe) return null;

  try {
    const url = new URL(safe, 'https://forrum.local');
    if (
      !url.pathname.match(
        /^\/v1\/media\/[0-9a-f-]+\/content$/i,
      )
    ) {
      return null;
    }
    return safe;
  } catch {
    return null;
  }
}

// FORRUM_BBCODE_FREE_FORMATTING_V15_6
export function safeBbcodeColor(
  value: string | undefined,
): string | null {
  const normalized = value?.trim().toLowerCase();
  if (!normalized) return null;

  if (allowedColors.has(normalized)) return normalized;
  if (/^#[0-9a-f]{6}$/i.test(normalized)) return normalized;

  return null;
}

export function safeBbcodeSize(
  value: string | undefined,
): string | null {
  const normalized = value?.trim().toLowerCase();
  if (!normalized) return null;

  if (allowedSizes.has(normalized)) return normalized;

  const pixelMatch = normalized.match(/^(\d{1,2})px$/);
  if (!pixelMatch) return null;

  const pixels = Number(pixelMatch[1]);
  if (!Number.isInteger(pixels)) return null;
  // FORRUM_EDITOR_CONTROLS_V15_10
  // Legacy V15.6 upper bound: pixels < 10 || pixels > 48
  if (pixels < 10 || pixels > 72) return null;

  return `${pixels}px`;
}
