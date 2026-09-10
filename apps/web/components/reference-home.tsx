'use client';
import Link from 'next/link';
import { BannerCard } from './home/banner-card';
import { CommunityPanels } from './home/community-panels';
import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { useTopicReading } from './use-topic-reading';
import { topicReadState, type ReadHistory } from '@/lib/topic-reading';
import { api } from '@/lib/api';
import type { PublicationCardData } from '@/lib/types';
import { Avatar } from './avatar';
import { AuthActions } from './auth-actions';
import { HeaderSearch } from './header-search';
import { ThemeToggle } from './theme-toggle';
import { TelegramShareButton } from './telegram-share-button';
import { formatCount } from './home/utils';
import type { Community, HomeInitialData, HomeOverview } from './home/types';
export type { HomeInitialData } from './home/types';

type Glyph = 'home' | 'work' | 'media' | 'service' | 'search' | 'plus' | 'bell' | 'comment' | 'eye' | 'bookmark' | 'close' | 'chevron' | 'menu' | 'filter' | 'code' | 'flame' | 'game' | 'growth' | 'community';
const paths: Record<Glyph, string> = {
 game: 'M7 7h10l4 10-3 2-4-4h-4l-4 4-3-2ZM7 10v4M5 12h4M16 11h.01M18 13h.01',
 growth: 'M4 20V4M4 20h16M7 15l5-5 4 2 5-8M16 4h5v5',
 community: 'M8 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM2 20v-4a6 6 0 0 1 12 0v4M16 4a3 3 0 0 1 0 6M17 13a5 5 0 0 1 5 5v2',
 flame: 'M12 2c2 5 8 7 8 13a8 8 0 0 1-16 0c0-3 2-5 4-7 0 4 2 5 3 5 2-3 2-7 1-11Z',
 home: 'm3 10 9-7 9 7v10h-6v-6H9v6H3Z',
 work: 'm14 5 5 5M4 20l5-1L21 7l-4-4L5 15Z',
 media: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM10 8l6 4-6 4Z',
 service: 'M3 7h18v13H3ZM8 7V3h8v4M3 11l9 4 9-4M12 13v4',
 search: 'M10.5 3a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15ZM16 16l5 5',
 plus: 'M12 5v14M5 12h14',
 bell: 'M5 16V9a7 7 0 0 1 14 0v7l2 3H3ZM10 22h4',
 comment: 'M21 11a9 8 0 0 1-9 8H8l-5 3 1-6a8 8 0 0 1-1-5 9 8 0 0 1 18 0Z',
 eye: 'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z',
 close: 'M6 6l12 12M18 6 6 18',
 bookmark: 'M6 3h12v18l-6-4-6 4Z', chevron: 'm7 9 5 5 5-5',
 menu: 'M4 6h16M4 12h16M4 18h16',
 filter: 'M3 6h18M3 12h18M3 18h18M8 3v6M16 9v6M10 15v6',
 code: 'm8 6-6 6 6 6m8-12 6 6-6 6M14 3l-4 18',
};
function Icon({ name }: { name: Glyph }) {
 return <svg data-ui-icon="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]}/></svg>;
}
function categoryIcon(name: string): Glyph {
 if (/GTA|игр|gaming/i.test(name)) return 'game';
 if (/продвиж|маркет|бизнес/i.test(name)) return 'growth';
 if (/мастер|дизайн/i.test(name)) return 'work';
 if (/telegram|общест|forrum/i.test(name)) return 'community';
 return 'code';
}
function Categories({ items, selected }: { items: Community[]; selected: string }) {
 const [collapsed, setCollapsed] = useState<Set<string>>(new Set());
 const known = new Set(items.map(item => item.slug));
 const roots = items.filter(item => !item.parent || !known.has(item.parent.slug));
 function renderCategory(root: Community, trail = new Set<string>()): React.ReactNode {
  if (trail.has(root.slug)) return null;
  const nextTrail = new Set([...trail, root.slug]);
  const children = items.filter(item => item.parent?.slug === root.slug && !nextTrail.has(item.slug));
  const open = !collapsed.has(root.slug);
  return <div className="forum-category" key={root.slug}><div className={`forum-category-heading ${selected === root.slug ? 'is-active' : ''}`}>
   <Link href={`/communities/${root.slug}`}><Icon name={categoryIcon(root.name)}/>{root.name}</Link>
   {!!children.length && <button type="button" aria-label={`${open ? 'Свернуть' : 'Развернуть'}: ${root.name}`} aria-expanded={open} onClick={() => setCollapsed(previous => { const next = new Set(previous); if (next.has(root.slug)) next.delete(root.slug); else next.add(root.slug); return next; })}><Icon name="chevron"/></button>}
  </div>{!root.parent && <p className="forum-category-stats">{formatCount(root.subscriberCount)} подписчиков{root.onlineCount !== undefined ? ` · ${formatCount(root.onlineCount)} онлайн` : ` · ${formatCount(root.publicationCount)} тем`}</p>}{open && !!children.length && <div className="forum-category-children">{children.map(child => renderCategory(child, nextTrail))}</div>}</div>;
 }
 return <nav className="forum-categories" aria-label="Категории"><p className="forum-eyebrow">Категории</p>
  {(roots.length ? roots : items).map(root => renderCategory(root))}
  <Link className="forum-all-communities" href="/communities">Все сообщества →</Link>
 </nav>;
}

function chipStyle(key: string, accent?: string): CSSProperties {
 const colors=['#789747','#5d8db5','#b49349','#9176ad'];
 const hash=Array.from(key).reduce((sum,char)=>sum+char.charCodeAt(0),0);
 return {'--chip-accent': accent && /^#[0-9a-f]{6}$/i.test(accent) ? accent : colors[hash%colors.length]} as CSSProperties;
}
function Topic({ item, history, communities, demo }: { item: PublicationCardData; history: ReadHistory | null; communities: Community[]; demo: boolean }) {
 const parent=communities.find(community=>community.slug===item.community.slug)?.parent;
 const readState = topicReadState(history, item.id, item.lastComment?.createdAt);
 const replyHref = `/p/${item.slug}${item.lastComment?.id ? `#comment-${item.lastComment.id}` : "#discussion"}`;
 const [saved, setSaved] = useState(item.isBookmarked ?? false);
 const [pending, setPending] = useState(false);
 const [error, setError] = useState('');
 async function bookmark() {
  if (pending) return;
  setPending(true); setError('');
  try { const result = await api<{ bookmarked: boolean }>(`/publications/${item.slug}/bookmark`, { method: 'POST' }); setSaved(result.bookmarked); }
  catch (cause) { setError(cause instanceof Error ? cause.message : 'Не удалось сохранить'); }
  finally { setPending(false); }
 }
 return <article className={`forum-topic is-${readState}`} data-reading-state={readState}>
  <Link className="forum-topic-avatar" href={`/u/${item.author.username}`} title={item.author.displayName} aria-label={`Автор: ${item.author.displayName}`}><Avatar name={item.author.displayName} url={item.author.avatarUrl} size={38}/></Link>
  <div className="forum-topic-content">
   <div className="forum-topic-context">{parent && <Link className="forum-category-chip" style={chipStyle(parent.slug,communities.find(row=>row.slug===parent.slug)?.accentColor)} href={`/communities/${parent.slug}`}>{parent.name}</Link>}<Link className="forum-category-chip" style={chipStyle(item.community.slug,item.community.accentColor)} href={`/communities/${item.community.slug}`}>{item.community.name}</Link>{item.tags?.slice(0,2).map(tag=><Link className="forum-tag" style={chipStyle(tag.slug,tag.styleEnabled?tag.backgroundColor:undefined)} href={`/tags/${tag.slug}`} key={tag.id}>#{tag.label}</Link>)}</div>
   <h2><Link href={`/p/${item.slug}`}>{item.title?.trim() || 'Запись без заголовка'}</Link></h2>
   <details className="forum-topic-summary"><summary><span>{item.excerpt}</span><small>Подробнее</small></summary><p>{item.excerpt}</p></details>
   <div className="forum-topic-service">
    {readState === 'updated' && <Link className="forum-new-replies" href={`/p/${item.slug}#new-replies`} title="После прошлого открытия темы в этом браузере">Новые ответы →</Link>}
    {item.lastComment ? <div className="forum-last-reply"><Link className="forum-reply-person" href={`/u/${item.lastComment.author.username}`}><Avatar name={item.lastComment.author.displayName} url={item.lastComment.author.avatarUrl} size={20}/><strong>{item.lastComment.author.displayName}</strong></Link><span className="forum-reply-verb">ответил:</span><Link className="forum-reply-preview" href={replyHref}>{item.lastComment.excerpt || 'Открыть ответ'}</Link></div> : <div className="forum-last-reply forum-reply-empty"><Link href={`/u/${item.author.username}`}>{item.author.displayName}</Link> · <span>{item.commentCount===0?'Пока без ответов':'Ответы в теме'}</span></div>}
   </div>
  </div>
  <div className="forum-topic-meta">
   <div className="forum-topic-share">{demo ? <button type="button" disabled title="Демонстрация: публикация недоступна">В Telegram</button> : <TelegramShareButton slug={item.slug} label="В Telegram" variant="inline"/>}</div>
   <button type="button" className={`forum-bookmark ${saved ? 'is-saved' : ''}`} disabled={pending || demo} aria-pressed={saved} aria-label={saved ? 'Убрать из сохранённого' : 'Сохранить тему'} onClick={() => void bookmark()}><Icon name="bookmark"/></button>
   <Link className="forum-reply-count" href={`/p/${item.slug}#discussion`} title="Ответы" aria-label={`Ответы: ${item.commentCount}`}><Icon name="comment"/>{formatCount(item.commentCount)}</Link>
   <span className="forum-view-count" title="Просмотры" aria-label={`Просмотры: ${item.viewCount ?? 0}`}><Icon name="eye"/>{formatCount(item.viewCount)}</span>
  </div>
  {error && <p className="forum-action-error" role="alert">{error}</p>}
 </article>;
}

const tabs = [{ id: 'all', label: 'Все темы', mode: 'all' }, { id: 'popular', label: 'Обсуждаемые', mode: 'popular' }, { id: 'new', label: 'Новые', mode: 'new' }, { id: 'unanswered', label: 'Без ответов', mode: 'all' }] as const;
type Tab = typeof tabs[number]['id'];
export function HomeDashboard({ initialData, demo = false }: { initialData: HomeInitialData; demo?: boolean }) {
 const reading = useTopicReading();
 const viewer=demo?'guest':reading.viewer;
 const history=demo?null:reading.history;
 const [overview, setOverview] = useState(initialData.overview);
 const [activityError, setActivityError] = useState(false);
 const [bannerClock, setBannerClock] = useState<number | null>(null);
 useEffect(() => {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const tick = () => {
   const now=Date.now(); setBannerClock(now);
   const next=(overview?.banners ?? []).flatMap(item=>[Date.parse(item.startsAt),Date.parse(item.endsAt)]).filter(at=>at>now);
   if(next.length) timer=setTimeout(tick,Math.min(Math.min(...next)-now+10,2147483647));
  };
  tick(); return ()=>clearTimeout(timer);
 }, [overview?.banners]);
 const banners = activityError ? [] : (overview?.banners ?? []).filter(item=>item.enabled && (bannerClock===null || ((!item.endsAt || Date.parse(item.endsAt)>bannerClock) && (!item.startsAt || Date.parse(item.startsAt)<=bannerClock))));
 useEffect(() => {
  if (demo) return;
  let controller: AbortController | undefined;
  const refresh = async () => {
   if (document.hidden) return;
   controller?.abort(); controller = new AbortController();
   const signal = controller.signal;
   try { const data = await api<HomeOverview>('/home/overview', { signal }); if (!signal.aborted) { setOverview(data); setActivityError(false); } }
   catch { if (!signal.aborted) setActivityError(true); }
  };
  const interval = setInterval(() => void refresh(), 60000);
  document.addEventListener('visibilitychange', refresh);
  return () => { clearInterval(interval); controller?.abort(); document.removeEventListener('visibilitychange', refresh); };
 }, [demo]);
 const [tab, setTab] = useState<Tab>('all');
 const [topics, setTopics] = useState(initialData.feed ?? []);
 const [loading, setLoading] = useState(false);
 const [pendingTopics, setPendingTopics] = useState<PublicationCardData[] | null>(null);
 useEffect(() => {
  if (demo) return;
  let request: AbortController | undefined;
  const signature = (rows: PublicationCardData[]) => rows.map(row => `${row.id}:${row.commentCount}:${row.lastComment?.id || row.lastComment?.createdAt || ''}`).join('|');
  const check = async () => {
   if (document.hidden || loading) return;
   request?.abort(); request = new AbortController();
   const signal = request.signal;
   try {
    const rows = await api<PublicationCardData[]>(`/feed?mode=${tabs.find(item => item.id === tab)?.mode ?? 'all'}`, {signal});
    if (!signal.aborted) setPendingTopics(signature(rows) === signature(topics) ? null : rows);
   } catch { /* Keep the current feed and do not advertise unavailable updates. */ }
  };
  const timer = window.setInterval(() => void check(), 60000);
  document.addEventListener('visibilitychange', check);
  return () => {window.clearInterval(timer);request?.abort();document.removeEventListener('visibilitychange',check);};
 }, [topics, tab, loading, demo]);

 const [error, setError] = useState(initialData.feed === undefined ? 'Не удалось загрузить темы. Попробуйте ещё раз.' : '');
 const [filters, setFilters] = useState(false);
 const [community, setCommunity] = useState('');
 const [sidebar, setSidebar] = useState(false);
 const [retry, setRetry] = useState(0);
 const firstLoad = useRef(true);
 const searchInput = useRef<HTMLInputElement>(null);
 useEffect(() => {
  const shortcut = (event: KeyboardEvent) => { if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); searchInput.current?.focus(); } if (event.key === 'Escape') setSidebar(false); };
  document.addEventListener('keydown', shortcut); return () => document.removeEventListener('keydown', shortcut);
 }, []);
 useEffect(() => {
  if (demo) return;
  if (firstLoad.current) { firstLoad.current = false; return; }
  const controller = new AbortController(); setPendingTopics(null); setLoading(true); setError('');
  api<PublicationCardData[]>(`/feed?mode=${tabs.find(item => item.id === tab)?.mode ?? 'all'}`, { signal: controller.signal })
   .then(rows => { if (!controller.signal.aborted) setTopics(rows); })
   .catch(cause => { if (!controller.signal.aborted) setError(cause instanceof Error ? cause.message : 'Не удалось загрузить темы'); })
   .finally(() => { if (!controller.signal.aborted) setLoading(false); });
  return () => controller.abort();
 }, [tab, retry, demo]);
 const visible = useMemo(() => {
  const rows = topics.filter(item => item.format === 'TOPIC' && (tab !== 'unanswered' || item.commentCount === 0) && (!community || item.community.slug === community));
  if (tab === 'new') rows.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));

  return rows;
 }, [topics, tab, community]);
 const news = initialData.announcements?.slice(0, 4) ?? [];
 return <div className="forum-home" data-home-reference="v34" onClickCapture={demo ? event=>{const link=(event.target as HTMLElement).closest('a');if(link && link.getAttribute('href')!=='/')event.preventDefault();} : undefined}>
  <aside className={`forum-sidebar ${sidebar ? 'is-open' : ''}`} aria-label="Навигация форума">
   <Link className="forum-brand" href="/"><span className="forum-brand-mark"><Icon name="comment"/></span><span><strong>FORRUM</strong><small>Нейросети. Люди. Проекты.</small></span></Link>

   <Categories items={initialData.communities ?? []} selected={community}/>

   <div className="forum-sidebar-art" aria-hidden="true"/><p className="forum-sidebar-note"><strong>Место для ваших идей</strong><span>Обсуждайте. Экспериментируйте. Создавайте вместе.</span></p>
   <div className="forum-sidebar-bottom"><Link href="/rules">Правила</Link><Link href="/support">Обратная связь</Link></div>
  </aside>
  {sidebar && <button type="button" className="forum-sidebar-backdrop" aria-label="Закрыть навигацию" onClick={() => setSidebar(false)}/>}
  <header className="forum-topbar"><button type="button" className="forum-menu" aria-label={sidebar ? 'Закрыть меню' : 'Открыть меню'} aria-expanded={sidebar} onClick={() => setSidebar(value => !value)}><Icon name="menu"/></button>
   <nav className="forum-primary" aria-label="Основная навигация">{([{ href: '/', label: 'Главная', icon: 'home' }, { href: '/workshop', label: 'Мастерская', icon: 'work' }, { href: '/media', label: 'Медиа', icon: 'media' }, { href: '/services', label: 'Услуги', icon: 'service' }] as const).map(item => <Link key={item.href} href={item.href} aria-current={item.href === '/' ? 'page' : undefined}><Icon name={item.icon}/>{item.label}</Link>)}</nav>
   <Link className="forum-button forum-top-create" href="/create"><Icon name="plus"/>Создать тему</Link><ThemeToggle/><Link className="forum-notifications" href="/notifications" aria-label="Уведомления"><Icon name="bell"/></Link><AuthActions/>{viewer === 'guest' && <Link className="forum-header-join" href="/register">Присоединиться</Link>}
  </header>
  <section className={`forum-intro ${banners.length ? 'has-banners' : ''}`} aria-label="Найдите своё сообщество">
   {demo && <span className="forum-demo-label">Демонстрационные данные · <Link href="/">На форум</Link></span>}
   <div className="forum-search-hero">
    <div className="forum-hero-copy"><small className="forum-hero-kicker">Сообщество о нейросетях</small><h1>Найди своих. <span>Создай с AI.</span></h1><p>Код, творчество, работа — обсуждаем инструменты и делаем проекты вместе.</p><HeaderSearch inputRef={searchInput}/></div>
    <div className="forum-hero-stats" aria-label="Статистика форума">{overview && !activityError ? <><span><strong>{formatCount(overview.stats.usersOnline)}</strong> онлайн <small>за 5 минут</small></span><span><strong>{formatCount(overview.stats.topics)}</strong> тем</span><span><strong>{formatCount(overview.stats.messages)}</strong> сообщений</span><Link href="/communities">Найти сообщество →</Link></> : <span>Место для ваших идей и первых совместных проектов</span>}</div>
   </div>
   {!!banners.length && <div className="forum-banners" aria-label="Реклама и сообщества">{banners.map(item=><BannerCard key={item.slot} item={item}/>)}</div>}
  </section>
  <div className="forum-center">
   <div className="forum-feed-toolbar"><div className="forum-tabs" role="group" aria-label="Выбор ленты">{tabs.map(item => <button type="button" aria-pressed={item.id === tab} key={item.id} onClick={() => setTab(item.id)}>{item.label}</button>)}</div><button type="button" className="forum-filter-toggle" aria-expanded={filters} onClick={() => setFilters(value => !value)}>Фильтры<Icon name="filter"/></button></div>
   {filters && <div className="forum-filters"><label>Сообщество<select aria-label="Сообщество" value={community} onChange={event => setCommunity(event.target.value)}><option value="">Все сообщества</option>{initialData.communities?.map(item => <option key={item.slug} value={item.slug}>{item.name}</option>)}</select></label><button type="button" onClick={() => setCommunity('')}>Сбросить</button></div>}
   {pendingTopics && !loading && <button type="button" className="forum-feed-update" onClick={() => {setTopics(pendingTopics);setPendingTopics(null);}}>Есть обновления в ленте · Показать</button>}
   <section className="forum-feed" aria-label="Темы форума" aria-busy={loading}>{loading ? <div className="forum-empty" role="status">Загружаем темы…</div> : error ? <div className="forum-empty" role="alert"><p>{error}</p><button type="button" className="forum-button" onClick={() => setRetry(value => value + 1)}>Попробовать снова</button></div> : visible.length ? visible.map(item => <Topic key={`${tab}-${item.id}`} item={item} history={history} communities={initialData.communities ?? []} demo={demo}/>) : <div className="forum-empty"><strong>Тем пока нет</strong><p>Измените фильтр или начните новое обсуждение.</p><Link className="forum-button" href="/create">Создать тему</Link></div>}</section>
  </div>
  <CommunityPanels overview={overview} unavailable={activityError || !overview} news={news}/>

 </div>;
}
