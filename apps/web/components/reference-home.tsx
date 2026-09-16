'use client';
import Link from 'next/link';
import { BannerCard } from './home/banner-card';
import { CommunityPanels } from './home/community-panels';
import { useEffect, useRef, useState } from 'react';
import { useTopicReading } from './use-topic-reading';
import { topicReadState, type ReadHistory } from '@/lib/topic-reading';
import { api } from '@/lib/api';
import type { PublicationCardData } from '@/lib/types';
import { Avatar } from './avatar';
import { AuthActions } from './auth-actions';
import { HeaderSearch } from './header-search';
import { ThemeToggle } from './theme-toggle';
import { TopicActions } from './home/topic-actions';
import { categoryStyle } from './home/category-style';
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
 useEffect(() => { try { const saved = JSON.parse(localStorage.getItem('forrum-category-folds') || 'null'); setCollapsed(new Set(Array.isArray(saved) ? saved.filter(item => typeof item === 'string') : [])); } catch {} }, []);
 function toggle(slug: string) { setCollapsed(previous => { const next = new Set(previous); next.has(slug) ? next.delete(slug) : next.add(slug); try { localStorage.setItem('forrum-category-folds', JSON.stringify([...next])); } catch {} return next; }); }
 const known = new Set(items.map(item => item.slug));
 const roots = items.filter(item => !item.parent || !known.has(item.parent.slug));
 function renderCategory(root: Community, trail = new Set<string>()): React.ReactNode {
  if (trail.has(root.slug)) return null;
  const nextTrail = new Set([...trail, root.slug]);
  const children = items.filter(item => item.parent?.slug === root.slug && !nextTrail.has(item.slug));
  const open = !collapsed.has(root.slug);
  return <div className="forum-category" key={root.slug} style={categoryStyle(root.slug, root.accentColor)}><div className={`forum-category-heading ${selected === root.slug ? 'is-active' : ''}`}>
   <Link href={`/communities/${root.slug}`}><Icon name={categoryIcon(root.name)}/><span>{root.name.replace(/^FORRUM\b/i, '4rrum')}</span></Link>
   {<span className="forum-category-counts"><span title="Подписчики" aria-label={`Подписчики: ${root.subscriberCount}`}>{formatCount(root.subscriberCount)}</span><span className="forum-category-online" title="Подписчики с активной сессией за последние 5 минут" aria-label={root.onlineCount === undefined ? "Онлайн недоступен" : `Из подписчиков онлайн: ${root.onlineCount}`}><i aria-hidden="true"/>{root.onlineCount === undefined ? "—" : formatCount(root.onlineCount)}</span></span>}
   {!!children.length && <button type="button" aria-label={`${open ? 'Свернуть' : 'Развернуть'}: ${root.name}`} aria-expanded={open} onClick={() => toggle(root.slug)}><Icon name="chevron"/></button>}
  </div>{open && !!children.length && <div className="forum-category-children">{children.map(child => renderCategory(child, nextTrail))}</div>}</div>;
 }
 return <nav className="forum-categories" aria-label="Категории"><div className="forum-category-title"><p className="forum-eyebrow">Сообщества</p><details className="forum-help"><summary aria-label="Что означают числа у сообществ?">?</summary><p>Первое число — подписчики. Число с зелёной точкой — сколько из них были активны за последние 5 минут.</p></details></div>
  {(roots.length ? roots : items).map(root => renderCategory(root))}
  <div className="forum-category forum-app-category"><div className="forum-category-heading"><Link href="/applications"><Icon name="game"/><span>Приложения</span></Link></div><div className="forum-category-children">{["AI-инструменты","Игры","Эксперименты","Neural Lab"].map((name,i)=><Link key={name} href={`/applications#section-${i}`}>{name}</Link>)}</div></div>
  <Link className="forum-all-communities" href="/communities">Все сообщества →</Link>
 </nav>;
}

function Topic({ item, history, communities, demo }: { item: PublicationCardData; history: ReadHistory | null; communities: Community[]; demo: boolean }) {
 const category=communities.find(row=>row.slug===item.community.slug);
 const parent=category?.parent;
 const readState=topicReadState(history,item.id,item.lastComment?.createdAt);
 return <article className={`forum-topic is-${readState}`} data-reading-state={readState}>
  <Link className="forum-topic-avatar" href={`/u/${item.author.username}`} title={item.author.displayName} aria-label={`Автор: ${item.author.displayName}`}><Avatar name={item.author.displayName} url={item.author.avatarUrl} size={36}/></Link>
  <div className="forum-topic-content">
   <h2><Link href={`/p/${item.slug}`}>{item.title?.trim() || 'Запись без заголовка'}</Link></h2>
   <div className="forum-topic-context" aria-label="Раздел и метки темы">
    {parent && <><Link className="forum-category-chip" style={categoryStyle(parent.slug,communities.find(row=>row.slug===parent.slug)?.accentColor)} href={`/communities/${parent.slug}`}>{parent.name.replace(/^FORRUM\b/i, '4rrum')}</Link><span className="forum-path-arrow" aria-hidden="true">›</span></>}
    <Link className="forum-category-chip" style={categoryStyle(item.community.slug,category?.accentColor ?? item.community.accentColor)} href={`/communities/${item.community.slug}`}>{item.community.name.replace(/^FORRUM\b/i, '4rrum')}</Link>
    {item.tags?.slice(0,2).map(tag=><Link className="forum-tag" href={`/tags/${tag.slug}`} key={tag.id}>#{tag.label}</Link>)}
    {readState==='updated' && <Link className="forum-new-replies" href={`/p/${item.slug}#new-replies`}>Новые ответы</Link>}
   </div>
  </div>
  <div className="forum-topic-meta"><Link className="forum-reply-count" href={`/p/${item.slug}#discussion`} aria-label={`Сообщения: ${item.commentCount}`} title="Сообщения"><Icon name="comment"/>{formatCount(item.commentCount)}</Link><span className="forum-view-count" title="Просмотры" aria-label={`Просмотры: ${item.viewCount ?? 0}`}><Icon name="eye"/>{formatCount(item.viewCount)}</span><TopicActions item={item} demo={demo}/></div>
 </article>;
}

const tabs = [{ id: 'all', label: 'Все темы', mode: 'all' }, { id: 'popular', label: 'Популярные', mode: 'popular' }, { id: 'new', label: 'Новые', mode: 'new' }, { id: 'unanswered', label: 'Без ответов', mode: 'all' }] as const;
type Tab = typeof tabs[number]['id'];
export function HomeDashboard({ initialData, demo = false }: { initialData: HomeInitialData; demo?: boolean }) {
 const reading = useTopicReading();
 const viewer=demo?'guest':reading.viewer;
 const history=demo?null:reading.history;
 const [communities, setCommunities] = useState(initialData.communities ?? []);
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
 const banners = (overview?.banners ?? []).filter(item=>item.enabled && (bannerClock===null || ((!item.endsAt || Date.parse(item.endsAt)>bannerClock) && (!item.startsAt || Date.parse(item.startsAt)<=bannerClock))));
 useEffect(() => {
  if (demo) return;
  let controller: AbortController | undefined;
  const refresh = async () => {
   if (document.hidden) return;
   controller?.abort(); controller = new AbortController();
   const signal = controller.signal;
   try { const [data, rows] = await Promise.all([api<HomeOverview>('/home/overview', { signal }), api<Community[]>('/communities', { signal })]); if (!signal.aborted) { setOverview(data); setCommunities(rows); setActivityError(false); } }
   catch { if (!signal.aborted) setActivityError(true); }
  };
  const interval = setInterval(() => void refresh(), 60000);
  document.addEventListener('visibilitychange', refresh);
  return () => { clearInterval(interval); controller?.abort(); document.removeEventListener('visibilitychange', refresh); };
 }, [demo]);
 const [tab, setTab] = useState<Tab>('all');
 const [community, setCommunity] = useState('');
 const [ready, setReady] = useState(false);
 const [topics, setTopics] = useState((initialData.feed ?? []).slice(0,20));
 const [hasMore, setHasMore] = useState((initialData.feed?.length ?? 0) > 20);
 const [offset, setOffset] = useState(20);
 const [loading, setLoading] = useState(false);
 const [loadingMore, setLoadingMore] = useState(false);
 const [error, setError] = useState('');
 const [moreError, setMoreError] = useState('');
 const [filters, setFilters] = useState(false);
 const [sidebar, setSidebar] = useState(false);
 const [retry, setRetry] = useState(0);
 const searchInput = useRef<HTMLInputElement>(null);
 const sidebarRef = useRef<HTMLElement>(null);
 const moreRequest = useRef<AbortController | null>(null);
 const [pendingTopics, setPendingTopics] = useState<PublicationCardData[] | null>(null);
 function choose(nextTab: Tab, nextCommunity: string) {
  const params = new URLSearchParams(window.location.search);
  nextTab === 'all' ? params.delete('tab') : params.set('tab', nextTab);
  nextCommunity ? params.set('community', nextCommunity) : params.delete('community');
  window.history.pushState(null, '', `${window.location.pathname}${params.size ? '?' + params : ''}`);
  setTab(nextTab); setCommunity(nextCommunity);
 }
 useEffect(() => {
  const restore = () => { const params = new URLSearchParams(window.location.search); const value = params.get('tab'); setTab(tabs.some(item => item.id === value) ? value as Tab : 'all'); setCommunity(params.get('community') || ''); setReady(true); };
  restore(); window.addEventListener('popstate', restore); return () => window.removeEventListener('popstate', restore);
 }, []);
 const feedUrl = `/feed?browse=1&mode=${tabs.find(item => item.id === tab)?.mode ?? 'all'}&community=${encodeURIComponent(community)}&unanswered=${tab === 'unanswered' ? '1' : '0'}`;
 useEffect(() => {
  const shortcut = (event: KeyboardEvent) => { if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); searchInput.current?.scrollIntoView({block:'center'}); searchInput.current?.focus({preventScroll:true}); } if (event.key === 'Escape') setSidebar(false); };
  document.addEventListener('keydown', shortcut); return () => document.removeEventListener('keydown', shortcut);
 }, []);
 useEffect(() => {
  if (!sidebar) return;
  const previous = document.activeElement as HTMLElement | null;
  const oldOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';
  sidebarRef.current?.querySelector<HTMLElement>('button,a')?.focus();
  const trap = (event: KeyboardEvent) => { if(event.key !== 'Tab') return; const controls = Array.from(sidebarRef.current?.querySelectorAll<HTMLElement>('a[href],button,summary') ?? []).filter(el => el.getClientRects().length); const first=controls[0],last=controls[controls.length-1]; if(event.shiftKey && document.activeElement === first){event.preventDefault();last?.focus();}else if(!event.shiftKey && document.activeElement === last){event.preventDefault();first?.focus();} };
  document.addEventListener('keydown',trap);
  return () => { document.body.style.overflow=oldOverflow;document.removeEventListener('keydown',trap);previous?.focus(); };
 }, [sidebar]);
 useEffect(() => {
  if (demo || !ready) return;
  moreRequest.current?.abort(); setLoadingMore(false);setMoreError('');
  const controller = new AbortController(); setPendingTopics(null);setLoading(true);setError('');
  api<PublicationCardData[]>(feedUrl,{signal:controller.signal}).then(rows => {if(!controller.signal.aborted){setTopics(rows.slice(0,20));setHasMore(rows.length>20);setOffset(20);}}).catch(() => {if(!controller.signal.aborted)setError('Не удалось загрузить обсуждения. Попробуйте ещё раз.');}).finally(()=>{if(!controller.signal.aborted)setLoading(false);});
  return () => {controller.abort();moreRequest.current?.abort();};
 }, [feedUrl,retry,demo,ready]);
 useEffect(() => {
  if(demo || !ready) return;
  const controller=new AbortController();
  const timer=window.setInterval(()=>{if(document.hidden || loading || loadingMore)return;void api<PublicationCardData[]>(feedUrl,{signal:controller.signal}).then(rows=>{const signature=(items:PublicationCardData[])=>items.slice(0,20).map(item=>`${item.id}:${item.commentCount}:${item.lastComment?.id}`).join('|');setPendingTopics(signature(rows)===signature(topics)?null:rows);}).catch(()=>{});},60000);
  return ()=>{window.clearInterval(timer);controller.abort();};
 },[feedUrl,topics,loading,loadingMore,demo,ready]);
 async function loadMore(){
  if(loadingMore)return;
  const controller=new AbortController();moreRequest.current=controller;setLoadingMore(true);setMoreError('');
  try {const rows=await api<PublicationCardData[]>(`${feedUrl}&offset=${offset}`,{signal:controller.signal});if(!controller.signal.aborted){setTopics(previous=>[...previous,...rows.slice(0,20).filter(row=>!previous.some(item=>item.id===row.id))]);setOffset(value=>value+20);setHasMore(rows.length>20);}}
  catch{if(!controller.signal.aborted)setMoreError('Не удалось загрузить следующую страницу. Попробуйте ещё раз.');}
  finally{if(!controller.signal.aborted)setLoadingMore(false);}
 }
 const visible = demo ? topics.filter(item=>item.format==='TOPIC' && (tab!=='unanswered'||!item.commentCount) && (!community||item.community.slug===community)) : topics;
 const news = initialData.announcements?.slice(0, 4) ?? [];
 return <div className={`forum-home ${viewer === 'guest' ? 'is-guest' : ''}`} data-home-reference="v40" onClickCapture={demo ? event=>{const link=(event.target as HTMLElement).closest('a');if(link && link.getAttribute('href')!=='/')event.preventDefault();} : undefined}>
  <aside ref={sidebarRef} className={`forum-sidebar ${sidebar ? 'is-open' : ''}`} aria-label="Навигация форума">
   <Link className="forum-brand" href="/"><span className="forum-brand-mark"><Icon name="comment"/></span><span><strong>4rrum</strong><small>Нейросети. Люди. Проекты.</small></span></Link>

   <button type="button" className="forum-sidebar-close" onClick={()=>setSidebar(false)} aria-label="Закрыть меню"><Icon name="close"/></button>
   <Categories items={communities} selected={community}/>

   <div className="forum-sidebar-bottom"><Link href="/rules">Правила</Link><Link href="/support">Обратная связь</Link></div>
  </aside>
  {sidebar && <button type="button" className="forum-sidebar-backdrop" aria-label="Закрыть навигацию" onClick={() => setSidebar(false)}/>}
  <header className="forum-topbar"><button type="button" className="forum-menu" aria-label={sidebar ? 'Закрыть меню' : 'Открыть меню'} aria-expanded={sidebar} onClick={() => setSidebar(value => !value)}><Icon name="menu"/></button>
   <nav className="forum-primary" aria-label="Основная навигация">{([{ href: '/', label: 'Главная', icon: 'home' }, { href: '/workshop', label: 'Мастерская', icon: 'work' }, { href: '/media', label: 'Медиа', icon: 'media' }, { href: '/services', label: 'Услуги', icon: 'service' }, { href: '/applications', label: 'Приложения', icon: 'game' }] as const).map(item => <Link key={item.href} href={item.href} aria-current={item.href === '/' ? 'page' : undefined}><Icon name={item.icon}/>{item.label}</Link>)}</nav>
   <Link className="forum-button forum-top-create" href="/create"><Icon name="plus"/>Создать тему</Link><ThemeToggle/><Link className="forum-notifications" href="/notifications" aria-label="Уведомления"><Icon name="bell"/></Link><AuthActions/>{viewer === 'guest' && <Link className="forum-header-join" href="/register">Присоединиться</Link>}
  </header>
  <section className="forum-intro" aria-label="Найдите своё сообщество">
   {demo && <span className="forum-demo-label">Демонстрационные данные · <Link href="/">На форум</Link></span>}
   <div className="forum-search-hero">
    <div className="forum-hero-copy"><h1>Найди своих. <span>Создай с AI.</span></h1><p>Код, творчество, идеи — обсуждаем, создаём, запускаем.</p><HeaderSearch inputRef={searchInput}/>
    <div className="forum-hero-stats" aria-label="Статистика форума">{overview && !activityError ? <><span><i aria-hidden="true"/><strong>{formatCount(overview.stats.usersOnline)}</strong> онлайн</span><span><strong>{formatCount(overview.stats.topics)}</strong> тем</span><span><strong>{formatCount(overview.stats.messages)}</strong> сообщений</span></> : <span>Статистика временно недоступна</span>}</div></div>
   </div>

  </section>
  <div className="forum-center">

   <div className="forum-feed-toolbar"><div className="forum-tabs" role="group" aria-label="Выбор ленты">{tabs.map(item => <button type="button" aria-pressed={item.id === tab} key={item.id} title={item.id === 'popular' ? 'Темы с ответами за последние 24 часа' : undefined} onClick={() => choose(item.id, community)}>{item.label}</button>)}</div><button type="button" className="forum-filter-toggle" aria-expanded={filters} onClick={() => setFilters(value => !value)}>Фильтры<Icon name="filter"/></button></div>
   {filters && <div className="forum-filters"><label>Сообщество<select aria-label="Сообщество" value={community} onChange={event => choose(tab,event.target.value)}><option value="">Все сообщества</option>{communities.map(item => <option key={item.slug} value={item.slug}>{item.name}</option>)}</select></label><button type="button" onClick={() => choose(tab,'')}>Сбросить</button></div>}
   {community && <div className="forum-active-filter">{communities.find(item=>item.slug===community)?.name || community}<button type="button" onClick={()=>choose(tab,'')} aria-label="Сбросить выбранное сообщество">×</button></div>}
   {pendingTopics && !loading && <button type="button" className="forum-feed-update" onClick={() => {setTopics(pendingTopics.slice(0,20));setHasMore(pendingTopics.length>20);setOffset(20);setPendingTopics(null);}}>Есть обновления в ленте · Показать</button>}
   <section className="forum-feed" aria-label="Темы форума" aria-busy={loading}>{loading ? <div className="forum-empty" role="status">Загружаем темы…</div> : error ? <div className="forum-empty" role="alert"><p>{error}</p><button type="button" className="forum-button" onClick={() => setRetry(value => value + 1)}>Попробовать снова</button></div> : visible.length ? visible.map(item => <Topic key={`${tab}-${item.id}`} item={item} history={history} communities={communities} demo={demo}/>) : <div className="forum-empty"><strong>{tab==='popular'?'За сутки новых ответов пока нет':tab==='unanswered'?'Вопросов без ответа пока нет':'Здесь пока нет тем'}</strong><p>Выберите другую подборку или начните своё обсуждение.</p><Link className="forum-button" href="/create">Создать тему</Link></div>}</section>
   {!loading && !error && hasMore && !demo && <div className="forum-load-more"><button className="forum-button" type="button" disabled={loadingMore} onClick={()=>void loadMore()}>{loadingMore?'Загружаем…':'Показать ещё обсуждения'}</button></div>}
   {!!banners.length && <div className="forum-secondary-banners" aria-label="Реклама и сообщества">{banners.map(item=><BannerCard key={item.slot} item={item}/>)}</div>}
   {moreError && <p className="forum-action-error" role="alert">{moreError}</p>}
  </div>
  <CommunityPanels overview={overview} unavailable={activityError || !overview} news={news} projects={initialData.projects} events={initialData.events}/>

 </div>;
}
