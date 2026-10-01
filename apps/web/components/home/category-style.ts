import type { CSSProperties } from 'react';

export function categoryStyle(slug: string, accent?: string, name = ''): CSSProperties {
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

  const semantic = `${slug} ${name}`.toLowerCase();
  const referenceAccent = /дизайн|design|медиа/.test(semantic) ? '#a24c7c'
    : /gta|игр|gaming/.test(semantic) ? '#7953ac'
    : /желез|hardware|продвиж|promotion|маркет|seo|бизнес/.test(semantic) ? '#a17748'
    : /софт|сервер|сет|telegram/.test(semantic) ? '#3d8b78'
    : /технолог|backend|разработ|ai|нейро/.test(semantic) ? '#477caf' : undefined;

  return {
    '--chip-accent': colorful ? accent : referenceAccent ?? palette[hash % palette.length]
  } as CSSProperties;
}
