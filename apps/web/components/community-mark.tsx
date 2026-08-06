type CommunityMarkProps = {
  name: string;
  url?: string | null;
  size?: number;
  className?: string;
};

export function CommunityMark({
  name,
  url,
  size = 38,
  className = '',
}: CommunityMarkProps) {
  const initials =
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join('') || '?';

  return (
    <span
      className={`community-mark ${className}`.trim()}
      style={{
        width: size,
        height: size,
        fontSize: Math.max(10, size * 0.32),
      }}
      aria-hidden="true"
    >
      {url ? (
        <img src={url} alt="" loading="lazy" referrerPolicy="no-referrer" />
      ) : (
        initials
      )}
    </span>
  );
}
