'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { api } from '@/lib/api';
import type { PublicationCardData, Tag } from '@/lib/types';
import { PublicationCard } from '@/components/publication-card';
import { Avatar } from '@/components/avatar';
import { CommunityMark } from '@/components/community-mark';
import { UsersIcon } from '@/components/icons';

export type Community = {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription?: string | null;
  avatarUrl?: string | null;
  coverUrl?: string | null;
  accentColor: string;
  subscriberCount: number;
  publicationCount: number;
  isSubscribed: boolean;
  canManage: boolean;
  notifyLevel: 'NONE' | 'IMPORTANT' | 'ALL' | null;
  parent: { slug: string; name: string } | null;
  children: Array<{ slug: string; name: string; shortDescription?: string | null; avatarUrl?: string | null; coverUrl?: string | null; subscriberCount: number }>;
  team: Array<{ role: string; user: { username: string; displayName: string; avatarUrl?: string | null } }>;
  popularTags: Array<Tag & { publicationCount: number }>;
  activePoll: null | { id: string; title: string; closesAt: string; totalVotes: number };
  publications: PublicationCardData[];
};

type Section = 'all' | 'posts' | 'topics' | 'news' | 'guides';
type SortMode = 'activity' | 'new' | 'popular';
const roleNames: Record<string, string> = { CURATOR: 'Куратор', ASSISTANT: 'Помощник куратора', MODERATOR: 'Модератор' };
const sections: Array<[Section, string]> = [['all', 'Все'], ['posts', 'Посты'], ['topics', 'Постоянные темы'], ['news', 'Новости'], ['guides', 'Гайды']];

function formatNumber(value: number) { return new Intl.NumberFormat('ru-RU').format(value); }
function formatDeadline(value: string) { return new Date(value).toLocaleString('ru-RU', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' }); }

export function CommunityClient({
  slug,
  initialData,
}: {
  slug: string;
  initialData: Community;
}) {
  const [data, setData] =
    useState<Community | null>(initialData);
  const [error, setError] = useState('');
  const [section, setSection] = useState<Section>('all');
  const [sort, setSort] = useState<SortMode>('activity');

  const load = () => api<Community>(`/communities/${slug}`).then((value) => { setData(value); setError(''); }).catch((cause) => setError(cause.message));
  useEffect(() => {
    setData(initialData);
    setError('');
  }, [initialData]);

  async function toggle() {
    if (!data) return;
    try { await api(`/communities/${slug}/subscribe`, { method: data.isSubscribed ? 'DELETE' : 'POST' }); await load(); }
    catch (cause) { setError(cause instanceof Error ? cause.message : 'Не удалось изменить подписку'); }
  }

  async function setNotifyLevel(notifyLevel: 'NONE' | 'IMPORTANT' | 'ALL') {
    try { await api(`/communities/${slug}/subscription`, { method: 'PATCH', body: JSON.stringify({ notifyLevel }) }); await load(); }
    catch (cause) { setError(cause instanceof Error ? cause.message : 'Не удалось изменить уведомления'); }
  }

  const filtered = useMemo(() => {
    if (!data) return [];
    const items = data.publications.filter((item) => {
      if (section === 'posts') return item.format === 'POST';
      if (section === 'topics') return item.format === 'TOPIC';
      if (section === 'news') return item.type === 'NEWS';
      if (section === 'guides') return item.type === 'GUIDE';
      return true;
    });
    return [...items].sort((a, b) => {
      const aPinned = a.pinnedUntil && new Date(a.pinnedUntil).getTime() > Date.now() ? 1 : 0;
      const bPinned = b.pinnedUntil && new Date(b.pinnedUntil).getTime() > Date.now() ? 1 : 0;
      if (aPinned !== bPinned) return bPinned - aPinned;
      if (sort === 'new') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sort === 'popular') return (b.commentCount + b.reactionCount) - (a.commentCount + a.reactionCount);
      return new Date(b.lastActivityAt ?? b.createdAt).getTime() - new Date(a.lastActivityAt ?? a.createdAt).getTime();
    });
  }, [data, section, sort]);

  if (!data) return <div className={error ? 'error-box' : 'card'}>{error || 'Загрузка сообщества…'}</div>;
  const curator = data.team.find((item) => item.role === 'CURATOR') ?? data.team[0];

  return <>
    <section className="community-profile" style={{ '--community-accent': data.accentColor } as React.CSSProperties}>
      <div className="community-cover">
        {data.coverUrl && <img className="community-cover-image" src={data.coverUrl} alt="" />}
        <CommunityMark name={data.name} url={data.avatarUrl} size={104} />
      </div>
      <div className="community-profile-main">
        <div className="community-title-row">
          <div><h1>{data.name}</h1><p>{data.shortDescription || data.description}</p></div>
          <div className="community-subscription-controls">
            <button type="button" className={`button ${data.isSubscribed ? 'secondary' : ''}`} onClick={toggle}>{data.isSubscribed ? 'Вы подписаны' : 'Подписаться'}</button>
            {data.isSubscribed && <label><span>Уведомления</span><select value={data.notifyLevel ?? 'IMPORTANT'} onChange={(event) => setNotifyLevel(event.target.value as 'NONE' | 'IMPORTANT' | 'ALL')}><option value="NONE">Без уведомлений</option><option value="IMPORTANT">Только важное</option><option value="ALL">Все новости</option></select></label>}
          </div>
        </div>
        <div className="community-numbers"><span><UsersIcon/><strong>{formatNumber(data.subscriberCount)}</strong> подписчиков</span><span>·</span><span><strong>{formatNumber(data.publicationCount)}</strong> публикаций в общей ленте</span></div>
        <div className="community-utility-links"><a href="#team">Команда</a>{data.activePoll && <Link href="/events">Открытое голосование</Link>}{data.canManage && <Link href={`/communities/${data.slug}/manage`}>Кабинет команды</Link>}</div>
      </div>
      <div className="curator-panel">{curator ? <>
        <div className="curator-person"><Avatar name={curator.user.displayName} size={52} url={curator.user.avatarUrl}/><div><span>{roleNames[curator.role] ?? 'Команда'}: <Link href={`/u/${curator.user.username}`}>@{curator.user.username}</Link></span><p>Отвечает за порядок и развитие сообщества.</p></div></div>
        <div className="curator-actions"><Link className="button" href={`/messages?to=${curator.user.username}`}>Написать</Link><a className="button ghost" href="#team">Вся команда</a></div>
      </> : <div className="sidebar-empty"><strong>Куратор ещё не назначен</strong><p>Сообщество пока управляется администрацией FORRUM.</p></div>}</div>
    </section>

    {data.children.length > 0 && <section className="child-community-strip"><div><strong>Подразделы {data.name}</strong><span>Материалы из них автоматически появляются и в этой общей ленте.</span></div><nav>{data.children.map((child) => <Link key={child.slug} href={`/communities/${child.slug}`}><CommunityMark name={child.name} url={child.avatarUrl} size={32}/><span>{child.name}</span><small>{formatNumber(child.subscriberCount)} подписчиков</small></Link>)}</nav></section>}
    {data.parent && <div className="parent-aggregation-note">Материалы подраздела <strong>{data.name}</strong> также показываются в общей ленте <Link href={`/communities/${data.parent.slug}`}>{data.parent.name}</Link>.</div>}
    {error && <div className="error-box" style={{ marginTop: 14 }}>{error}</div>}

    <div className="community-toolbar">
      <nav aria-label="Фильтр публикаций">{sections.map(([key, label]) => <button type="button" className={section === key ? 'active' : ''} onClick={() => setSection(key)} key={key}>{label}</button>)}</nav>
      <div><Link className="button secondary small" href={`/create?community=${encodeURIComponent(data.slug)}&format=TOPIC`}>Новая тема</Link><label className="compact-select"><span className="visually-hidden">Сортировка</span><select value={sort} onChange={(event) => setSort(event.target.value as SortMode)}><option value="activity">По последней активности</option><option value="new">Сначала новые</option><option value="popular">Самые обсуждаемые</option></select></label></div>
    </div>

    <div className="dashboard-grid community-layout">
      <section className="dashboard-main"><div className="publication-list spacious-list">{filtered.map((item) => <PublicationCard key={item.id} item={item}/>)}{!filtered.length && <div className="empty-state"><h3>Здесь пока нет публикаций</h3><p>Выберите другой фильтр или создайте первый материал.</p><Link className="button small" href={`/create?community=${encodeURIComponent(data.slug)}`}>Создать публикацию</Link></div>}</div></section>
      <aside className="dashboard-sidebar">
        <section className="sidebar-card"><div className="compact-heading"><h3>Популярные хэштеги</h3><Link href="/search">Поиск</Link></div>{data.popularTags.length ? <div className="popular-tags">{data.popularTags.map((tag) => <Link href={`/tags/${tag.slug}`} key={tag.id} style={tag.styleEnabled ? { background: tag.backgroundColor, color: tag.textColor, borderColor: tag.borderColor } : undefined}>#{tag.label}<small>{formatNumber(tag.publicationCount)}</small></Link>)}</div> : <p className="muted small-text">Хэштеги появятся после первых публикаций.</p>}</section>

        <section className="sidebar-card poll-card"><div className="compact-heading"><h3>Голосование</h3><Link href="/events">Все</Link></div>{data.activePoll ? <><strong>{data.activePoll.title}</strong><p className="sidebar-fact">До {formatDeadline(data.activePoll.closesAt)} · {formatNumber(data.activePoll.totalVotes)} голосов</p><Link className="button ghost small" href="/events">Перейти к голосованию</Link></> : <div className="sidebar-empty"><p>Открытых голосований в этом сообществе нет.</p></div>}</section>

        <section className="sidebar-card" id="team"><h3>Команда сообщества</h3>{data.team.length ? data.team.map((member) => <Link className="team-member" href={`/u/${member.user.username}`} key={`${member.role}-${member.user.username}`}><Avatar name={member.user.displayName} size={38} url={member.user.avatarUrl}/><div><strong>@{member.user.username}</strong><small>{roleNames[member.role] ?? member.role}</small></div>{member.role === 'CURATOR' && <span>Куратор</span>}</Link>) : <p className="muted">Команда ещё не сформирована.</p>}</section>
      </aside>
    </div>
  </>;
}
