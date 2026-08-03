export function Avatar({ name, size = 38, url }: { name: string; size?: number; url?: string | null }) {
  const initials = name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase()).join('') || '?';
  return <span className={`avatar ${url ? 'avatar-image' : ''}`} style={{ width: size, height: size, fontSize: Math.max(12, size * .36) }} aria-hidden="true">
    {url ? <img src={url} alt="" referrerPolicy="no-referrer"/> : initials}
  </span>;
}
