import type { CSSProperties } from 'react';

export function categoryStyle(slug: string, accent?: string): CSSProperties {
  const palette = [
    '#548e70', '#678baa', '#9b7bae',
    '#b38a61', '#648e94', '#a47786'
  ];
  const hash = Array.from(slug).reduce(
    (sum, char) => sum + char.charCodeAt(0), 0
  );
  const valid = accent && /^#[0-9a-f]{6}$/i.test(accent);
  const channels = valid
    ? [1, 3, 5].map(offset => parseInt(accent!.slice(offset, offset + 2), 16))
    : [];
  const colorful = channels.length === 3
    && Math.max(...channels) - Math.min(...channels) > 40;

  return {
    '--chip-accent': colorful ? accent : palette[hash % palette.length]
  } as CSSProperties;
}
