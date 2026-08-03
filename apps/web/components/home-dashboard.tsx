'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { api } from '@/lib/api';
import { FeedView } from './feed-view';
import { FlameIcon, SearchIcon, UsersIcon } from './icons';

type Community = {
  id: string;
  slug: string;
  name: string;
  shortDescription?: string | null;
  description: string;
  accentColor: string;
  subscriberCount: number;
  publicationCount: number;
  isSubscribed?: boolean;
};

type HomeOverview = {
  stats: { verifiedUsers: number; activeUsers24h: number; publications: number; comments24h: number; communities: number };
  poll: null | { id: string; title: string; closesAt: string; totalVotes: number; viewerVoted: boolean; community: { slug: string; name: string; accentColor: string } };
  proposal: null | { id: string; name: string; description: string; supportCount: number; author: { username: string; displayName: string } };
};

const preferred = ['gta-rp', 'telegram', 'promotion'];
const symbols: Record<string, string> = { 'gta-rp': 'V', telegram: '➤', promotion: '↗', 'forrum-start': 'F', 'internet-projects': '◆' };
const emptyOverview: HomeOverview = { stats: { verifiedUsers: 0, activeUsers24h: 0, publications: 0, comments24h: 0, communities: 0 }, poll: null, proposal: null };

function formatNumber(value: number) { return new Intl.NumberFormat('ru-RU').format(value); }
function formatDeadline(value: string) { return new Date(value).toLocaleString('ru-RU', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' }); }

export function HomeDashboard() {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [overview, setOverview] = useState<HomeOverview>(emptyOverview);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([
      api<Community[]>('/communities'),
      api<HomeOverview>('/home/overview'),
    ]).then(([communityItems, home]) => {
      setCommunities(communityItems);
      setOverview(home);
      setError('');
    }).catch((cause) => setError(cause instanceof Error ? cause.message : 'Не удалось загрузить главную')).finally(() => setLoading(false));
  }, []);

  const active = useMemo(() => {
    const ranked = [...communities].sort((a, b) => {
      const ai = preferred.indexOf(a.slug); const bi = preferred.indexOf(b.slug);
      if (ai !== bi) return (ai < 0 ? 99 : ai) - (bi < 0 ? 99 : bi);
      return b.publicationCount - a.publicationCount;
    });
    return ranked.slice(0, 3);
  }, [communities]);
  const discovery = useMemo(() => communities.filter((item) => !item.isSubscribed && !item.slug.includes('majestic')).sort((a, b) => b.publicationCount - a.publicationCount).slice(0, 3), [communities]);

  return <div className="dashboard-grid">
    <section className="dashboard-main">
      <form className="home-search" action="/search">
        <SearchIcon/>
        <input name="q" aria-label="Поиск" placeholder="Ищите темы, людей, сообщества и хэштеги"/>
      </form>
      {error && <div className="error-box">{error}</div>}

      <section className="surface-section active-communities" aria-labelledby="active-communities-title">
        <div className="compact-heading"><h2 id="active-communities-title">Активные сообщества</h2><Link href="/communities">Смотреть все</Link></div>
        {loading ? <div className="compact-loading">Загружаем сообщества…</div> : active.length > 0 ? <div className="active-community-grid">{active.map((item) => <Link className="active-community-card" href={`/communities/${item.slug}`} key={item.id}>
          <span className={`community-art art-${item.slug}`} style={{ '--community-accent': item.accentColor } as React.CSSProperties}>{symbols[item.slug] ?? item.name.slice(0, 1)}</span>
          <span className="active-community-copy"><strong>{item.name}</strong><small>{item.shortDescription || item.description}</small><span className="community-card-metrics"><span>{formatNumber(item.subscriberCount)} подписчиков</span><span>·</span><span>{formatNumber(item.publicationCount)} публикаций</span></span></span>
        </Link>)}</div> : <div className="compact-empty">Сообщества появятся здесь после создания.</div>}
      </section>

      <section className="today-strip" aria-labelledby="today-title">
        <h2 id="today-title">FORRUM сейчас</h2>
        <div className="today-metrics">
          <div><UsersIcon/><span><strong>{formatNumber(overview.stats.verifiedUsers)}</strong><small>Подтверждённых аккаунтов</small></span></div>
          <div><span className="metric-icon">◯</span><span><strong>{formatNumber(overview.stats.publications)}</strong><small>Опубликованных материалов</small></span></div>
          <div><FlameIcon/><span><strong>{formatNumber(overview.stats.comments24h)}</strong><small>Ответов за 24 часа</small></span></div>
          <div><span className="metric-icon">▦</span><span><strong>{formatNumber(overview.stats.communities)}</strong><small>Активных сообществ</small></span></div>
        </div>
        {overview.stats.activeUsers24h > 0 && <p className="today-note">За последние 24 часа заходили: {formatNumber(overview.stats.activeUsers24h)}</p>}
      </section>

      <FeedView/>
    </section>

    <aside className="dashboard-sidebar" aria-label="Дополнительная информация">
      <section className="sidebar-card poll-card">
        <div className="compact-heading"><h3>Голосование</h3><Link href="/events">Все</Link></div>
        {overview.poll ? <>
          <Link className="sidebar-context-link" href={`/communities/${overview.poll.community.slug}`}>{overview.poll.community.name}</Link>
          <strong>{overview.poll.title}</strong>
          <p className="sidebar-fact">До {formatDeadline(overview.poll.closesAt)} · {formatNumber(overview.poll.totalVotes)} голосов</p>
          <Link className="button ghost small" href="/events">{overview.poll.viewerVoted ? 'Посмотреть результаты' : 'Проголосовать'}</Link>
        </> : <div className="sidebar-empty"><p>Открытых голосований пока нет.</p><Link href="/events">Открыть события</Link></div>}
      </section>

      <section className="sidebar-card">
        <div className="compact-heading"><h3>Предложение сообщества</h3><Link href="/communities/proposals">Все</Link></div>
        {overview.proposal ? <>
          <strong>{overview.proposal.name}</strong>
          <p className="sidebar-clamped">{overview.proposal.description}</p>
          <p className="sidebar-fact">{formatNumber(overview.proposal.supportCount)} поддержали · автор @{overview.proposal.author.username}</p>
          <Link className="button ghost small" href="/communities/proposals">Посмотреть предложение</Link>
        </> : <div className="sidebar-empty"><p>Новых предложений пока нет.</p><Link href="/communities/proposals">Предложить сообщество</Link></div>}
      </section>

      {discovery.length > 0 && <section className="sidebar-card"><div className="compact-heading"><h3>Открыть новое</h3><Link href="/settings/interests">Настроить</Link></div>{discovery.map((item) => <Link className="mini-community" href={`/communities/${item.slug}`} key={item.id}><span style={{ background: item.accentColor }}>{item.name.slice(0, 1)}</span><div><strong>{item.name}</strong><small>{formatNumber(item.subscriberCount)} подписчиков</small></div><b aria-hidden="true">→</b></Link>)}</section>}

      <section className="sidebar-card sponsor-card"><span className="ad-label">Продвижение</span><div className="sponsor-art">●</div><strong>Продвижение вашей темы</strong><p>Количество мест и цена задаются администрацией. Рекламные материалы всегда отмечаются.</p><Link href="/wallet">Узнать условия ↗</Link></section>
    </aside>
  </div>;
}
