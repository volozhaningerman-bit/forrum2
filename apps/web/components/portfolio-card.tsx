import Link from 'next/link';
import { Avatar } from './avatar';
import { formatRelativeTime } from '@/lib/format';

export type PortfolioCardData = {
  id: string; kind: 'PROJECT' | 'SERVICE'; status: string; title: string; summary: string; coverUrl: string | null;
  lookingForTeam: boolean; priceText: string | null; updatedAt: string; interactionCount: number;
  owner: { username: string; displayName: string; avatarUrl: string | null; forrumId: number };
  community: { slug: string; name: string; accentColor: string } | null;
  publication: { slug: string; title: string | null } | null;
};

export function PortfolioCard({ item }: { item: PortfolioCardData }) {
  return <article className="portfolio-card" style={{ '--portfolio-accent': item.community?.accentColor ?? '#3157D5' } as React.CSSProperties}>
    {item.coverUrl ? <Link className="portfolio-cover" href={`/portfolio/${item.id}`} style={{ backgroundImage: `url(${item.coverUrl})` }} aria-label={`Открыть ${item.title}`}/> : <Link className="portfolio-cover portfolio-cover-fallback" href={`/portfolio/${item.id}`}><span>{item.kind === 'PROJECT' ? 'Проект' : 'Услуга'}</span></Link>}
    <div className="portfolio-card-body"><div className="publication-topline"><span className="type-label">{item.kind === 'PROJECT' ? 'Проект' : 'Услуга'}</span>{item.lookingForTeam && <span className="portfolio-team-label">Ищет команду</span>}</div><h2><Link href={`/portfolio/${item.id}`}>{item.title}</Link></h2><p>{item.summary}</p><div className="portfolio-context">{item.community && <Link href={`/communities/${item.community.slug}`}>{item.community.name}</Link>}{item.priceText && <span>{item.priceText}</span>}{item.interactionCount > 0 && <span>{item.interactionCount} подтверждённых взаимодействий</span>}</div><footer><Link className="portfolio-owner" href={`/u/${item.owner.username}`}><Avatar name={item.owner.displayName} url={item.owner.avatarUrl} size={34}/><span><strong>{item.owner.displayName}</strong><small>@{item.owner.username}</small></span></Link><time>{formatRelativeTime(item.updatedAt)}</time></footer></div>
  </article>;
}
