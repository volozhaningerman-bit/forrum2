import Link from 'next/link';
import type { Tag } from '@/lib/types';
export function TagList({ tags }: { tags: Tag[] }) {
  if (!tags.length) return null;
  return <div className="tag-list" aria-label="Хэштеги">{tags.map((tag) => <Link
    href={`/tags/${tag.slug}`}
    className="tag"
    key={tag.id}
    style={tag.styleEnabled ? { background: tag.backgroundColor, color: tag.textColor, borderColor: tag.borderColor } : undefined}
  >#{tag.label}</Link>)}</div>;
}
