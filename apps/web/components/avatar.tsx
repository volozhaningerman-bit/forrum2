function stableTone(name: string) {
  let hash = 0;
  for (const char of name) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  }
  return hash % 4;
}

export function Avatar({
  name,
  size = 38,
  url,
}: {
  name: string;
  size?: number;
  url?: string | null;
}) {
  const initials =
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join('') || '?';

  return (
    <span
      className={`avatar ${url ? 'avatar-image' : ''} avatar-tone-${stableTone(name)}`}
      style={{
        width: size,
        height: size,
        fontSize: Math.max(12, size * 0.34),
      }}
      aria-hidden="true"
    >
      {url ? (
        <img src={url} alt="" loading="lazy" referrerPolicy="no-referrer" />
      ) : (
        <strong>{initials}</strong>
      )}
    </span>
  );
}
