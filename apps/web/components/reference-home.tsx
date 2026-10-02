'use client';
import Link from 'next/link';
import { CommunityPanels } from './home/community-panels';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useTopicReading } from './use-topic-reading';
import { topicReadState, type ReadHistory } from '@/lib/topic-reading';
import { api } from '@/lib/api';
import type { PublicationCardData } from '@/lib/types';
import { Avatar } from './avatar';
import { topicAvatarUrl } from './home/topic-avatar';
import { AuthActions } from './auth-actions';
import { HeaderSearch } from './header-search';
import { mainLinks } from './main-nav';
import { TopicActions } from './home/topic-actions';
import { diverseTopics } from './home/diverse-topics';
import { categoryStyle } from './home/category-style';
import { formatCount } from './home/utils';
import { ForumTime } from './home/forum-time';
import { HomeWebVitals } from './home/web-vitals';
import type { Community, HomeInitialData, HomeOverview } from './home/types';
export type { HomeInitialData } from './home/types';

type Glyph = 'home' | 'work' | 'media' | 'service' | 'search' | 'plus' | 'bell' | 'comment' | 'eye' | 'bookmark' | 'close' | 'chevron' | 'menu' | 'filter' | 'code' | 'flame' | 'game' | 'growth' | 'community' | 'pin' | 'paperclip' | 'monitor' | 'chip' | 'cube' | 'wifi' | 'image' | 'document' | 'megaphone' | 'calendar' | 'stats' | 'cart' | 'archive';
const paths: Record<Glyph, string> = {
 cart:'M2 3h3l3 13h11l3-9H6M9 21h.01M18 21h.01',
 archive:'M4 7h16v14H4ZM3 3h18v4H3ZM9 11h6',
 monitor:'M3 4h18v12H3ZM8 21h8M12 16v5',
 chip:'M7 7h10v10H7ZM9 2v5M15 2v5M9 17v5M15 17v5M2 9h5M2 15h5M17 9h5M17 15h5',
 cube:'m12 2 9 5v10l-9 5-9-5V7ZM3 7l9 5 9-5M12 12v10',
 wifi:'M2 8a16 16 0 0 1 20 0M5 12a11 11 0 0 1 14 0M8 16a6 6 0 0 1 8 0M12 20h.01',
 image:'M3 3h18v18H3ZM3 17l6-6 4 4 3-3 5 5M16 7h.01',
 document:'M5 2h10l4 4v16H5ZM14 2v5h5M8 11h8M8 15h8M8 19h5',
 megaphone:'M3 10h5l11-6v16L8 14H3ZM8 14l2 7h4l-2-5',
 calendar:'M3 5h18v16H3ZM7 2v6M17 2v6M3 10h18M7 14h.01M12 14h.01M17 14h.01M7 18h.01M12 18h.01',
 stats:'M4 21V12h3v9M10 21V3h3v18M16 21V8h3v13',
 game: 'M7 7h10l4 10-3 2-4-4h-4l-4 4-3-2ZM7 10v4M5 12h4M16 11h.01M18 13h.01',
 pin: 'm16 3 5 5-3 1-3 3v5l-2 2-4-4-5 5-1-1 5-5-4-4 2-2h5l3-3z',
 paperclip: 'm21 11.5-8.8 8.8a6 6 0 0 1-8.5-8.5l9.2-9.2a4 4 0 0 1 5.7 5.7l-9.2 9.2a2 2 0 0 1-2.8-2.8l8.5-8.5',
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
function communityLabel(name: string) { return name.replace(/^FORRUM\b/i, '4rrum'); }
function categoryIcon(name: string): Glyph {
 if (/архив/i.test(name)) return 'archive';
 if (/торгов|магазин/i.test(name)) return 'cart';
 if (/общени/i.test(name)) return 'comment';
 if (/новост|правил/i.test(name)) return 'document';
 if (/желез|компьютер|hardware/i.test(name)) return 'chip';
 if (/интернет|сет|сервер/i.test(name) && !/проект/i.test(name)) return 'wifi';
 if (/софт|linux/i.test(name)) return 'cube';
 if (/технолог|AI|нейро/i.test(name)) return 'monitor';
 if (/GTA|игр|gaming/i.test(name)) return 'game';
 if (/продвиж|маркет|бизнес/i.test(name)) return 'growth';
 if (/мастер|дизайн|медиа/i.test(name)) return 'image';
 if (/telegram|общест|forrum|4rrum/i.test(name)) return 'community';
 return 'code';
}

function topicIcon(title: string | null, categoryName: string): Glyph {
 if (/linux|линукс/i.test(title ?? '')) return 'cube';
 if (/\bии\b|нейросет|ai/i.test(title ?? '')) return 'code';
 return categoryIcon(categoryName);
}

function topicBackdrop(slug: string, name: string) {
 const value = `${slug} ${name}`.toLowerCase();
 if (/gta|rp|игр/.test(value)) return '/forrum-assets/row-gta-v82.webp';
 if (/продвиж|promotion|маркет|seo|бизнес/.test(value)) return '/forrum-assets/row-promotion-v82.webp';
 if (/желез|hardware|компьютер/.test(value)) return '/forrum-assets/row-hardware-v82.webp';
 if (/дизайн|design|медиа/.test(value)) return '/forrum-assets/row-design-v82.webp';
 if (/сет|сервер|telegram/.test(value) && !/проект/.test(value)) return '/forrum-assets/row-network-v82.webp';
 if (/софт|linux|технолог|ai|нейро/.test(value)) return '/forrum-assets/row-tech-v82.webp';
 return '/forrum-assets/row-code-v82.webp';
}

function Categories({ items: sourceItems, selected }: { items: Community[]; selected: string }) {
 // Flatten retired navigation groups only; their publications and URLs stay intact.
 const hidden = new Set(sourceItems.filter(item => /^(мастерская|медиа)$/i.test(item.name.trim())).map(item => item.slug));
 const items = sourceItems.filter(item => !hidden.has(item.slug)).map(item => ({...item, parent:item.parent && hidden.has(item.parent.slug) ? null : item.parent}));
 const [expanded, setExpanded] = useState<Set<string>>(() => new Set());
 function toggle(slug: string) { setExpanded(previous => { const next = new Set(previous); next.has(slug) ? next.delete(slug) : next.add(slug); return next; }); }
 const known = new Set(items.map(item => item.slug));
 const roots = items.filter(item => !item.parent || !known.has(item.parent.slug));
 function renderCategory(root: Community, trail = new Set<string>()): React.ReactNode {
  if (trail.has(root.slug)) return null;
  const nextTrail = new Set([...trail, root.slug]);
  const children = items.filter(item => item.parent?.slug === root.slug && !nextTrail.has(item.slug));
  const open = expanded.has(root.slug);
  return <div className="forum-category" key={root.slug} style={categoryStyle(root.slug, root.accentColor, root.name)}><div className={`forum-category-heading ${selected === root.slug ? 'is-active' : ''}`}>
   <Link href={`/communities/${root.slug}`} title={communityLabel(root.name)} aria-current={selected === root.slug ? 'page' : undefined}><Icon name={categoryIcon(root.name)}/><span>{communityLabel(root.name)}</span></Link>
   <span className="forum-category-counts" title="Темы в разделе" aria-label={`Темы: ${root.publicationCount}`}><span>{formatCount(root.publicationCount)}</span></span>
   {!!children.length && <button className="forum-category-toggle" type="button" aria-label={`${open ? 'Свернуть' : 'Развернуть'}: ${communityLabel(root.name)}`} aria-expanded={open} onClick={() => toggle(root.slug)}><Icon name="chevron"/></button>}
  </div>{open && !!children.length && <div className="forum-category-children">{children.map(child => renderCategory(child, nextTrail))}</div>}</div>;
 }
 return <nav className="forum-categories" aria-label="Категории"><div className="forum-category-title"><p className="forum-eyebrow">Разделы форума</p></div>
  <div className="forum-category forum-home-category"><div className="forum-category-heading is-active"><Link href="/" aria-current={!selected ? 'page' : undefined}><Icon name="home"/><span>Главная</span></Link></div></div>
  {(roots.length ? roots : items).map(root => renderCategory(root))}
  <div className="forum-category forum-app-category"><div className="forum-category-heading"><Link href="/applications"><Icon name="game"/><span>Приложения</span></Link><button className="forum-category-toggle" type="button" aria-label={`${expanded.has('@apps') ? 'Свернуть' : 'Развернуть'}: Приложения`} aria-expanded={expanded.has('@apps')} onClick={()=>toggle('@apps')}><Icon name="chevron"/></button></div>{expanded.has('@apps') && <div className="forum-category-children">{["AI-инструменты","Игры","Эксперименты","Neural Lab"].map((name,i)=><Link key={name} href={`/applications#section-${i}`}>{name}</Link>)}</div>}</div>
  <Link className="forum-all-communities" href="/communities">Все сообщества →</Link>
 </nav>;
}


function Topic({ item, history, communities, demo, guest }: { item: PublicationCardData; history: ReadHistory | null; communities: Community[]; demo: boolean; guest: boolean }) {
 const category=communities.find(row=>row.slug===item.community.slug);
 const categoryTrail: {slug:string;name:string}[] = [{slug:item.community.slug,name:item.community.name}];
 const visited = new Set([item.community.slug]);
 let parent = category?.parent;
 while (parent && !visited.has(parent.slug)) {
  visited.add(parent.slug);
  if (!/^(мастерская|медиа)$/i.test(parent.name.trim())) categoryTrail.unshift(parent);
  parent = communities.find(row=>row.slug===parent!.slug)?.parent;
 }
 const primaryCategory = categoryTrail[0];
 const categoryLabel = categoryTrail.map(row=>communityLabel(row.name)).join(' › ');
 const readState=topicReadState(history,item.id,item.lastComment?.createdAt);
 const important=Boolean(item.isOfficial && item.pinnedUntil && Date.parse(item.pinnedUntil)>Date.now());
 const lastAuthor=item.lastComment?.author ?? item.author;
 const lastAt=item.lastComment?.createdAt ?? item.createdAt;
 const cover=topicBackdrop(item.community.slug,item.community.name);
 const style={
   ...categoryStyle(item.community.slug, category?.accentColor ?? item.community.accentColor, item.community.name),
   '--topic-image':`url("${cover}")`,
   '--topic-image-y':cover.includes('row-gta-') ? '66%' : '50%',
 } as CSSProperties;
 return <article className={`forum-topic is-${readState}`} style={style} data-reading-state={readState}>
  <Link className="forum-topic-avatar" href={`/communities/${item.community.slug}`} title={categoryLabel} aria-label={`Раздел: ${categoryLabel}`}>
   <span className="forum-topic-category-icon"><Icon name={topicIcon(item.title,item.community.name)}/></span>
  </Link>
  <div className="forum-topic-content">
   {categoryTrail.length > 1 && <nav className="forum-topic-path" aria-label="Путь категории" title={categoryLabel}>{categoryTrail.map((row,index)=><span key={row.slug}>{index > 0 && <span className="forum-topic-path-separator" aria-hidden="true">›</span>}<Link href={`/communities/${row.slug}`}>{communityLabel(row.name)}</Link></span>)}</nav>}
   <div className="forum-topic-title-line">
    <h2><Link className="forum-topic-main-link" href={`/p/${item.slug}`}>{item.title?.trim().replace(/FORRUM/g,'4rrum') || 'Запись без заголовка'}</Link></h2>
    {important && <span className="forum-topic-pinned" title="Закреплено форумом"><Icon name="paperclip"/></span>}
    {important && <span className="forum-topic-important">Важно</span>}
   </div>
   <p className="forum-topic-excerpt">{item.excerpt}</p>
  </div>
  <div className="forum-topic-category-cell" aria-label="Раздел темы">
   <Link className={`forum-topic-category-chip${primaryCategory.name.length > 18 ? ' is-long' : ''}`} href={`/communities/${primaryCategory.slug}`} title={communityLabel(primaryCategory.name)}>{communityLabel(primaryCategory.name)}</Link>
  </div>
  <Link className="forum-topic-metric forum-reply-count" href={`/p/${item.slug}#discussion`} aria-label={`Ответы: ${item.commentCount}`} title="Ответы"><Icon name="comment"/><span>{formatCount(item.commentCount)}</span></Link>
  <span className="forum-topic-metric forum-view-count" title="Просмотры" aria-label={`Просмотры: ${item.viewCount ?? 0}`}><Icon name="eye"/><span>{formatCount(item.viewCount)}</span></span>
  <div className="forum-topic-last" aria-label={item.lastComment ? 'Последний ответ' : 'Публикация темы'}>
   <Link className="forum-topic-last-avatar" href={`/u/${lastAuthor.username}`} aria-label={`Профиль: ${lastAuthor.displayName}`}><Avatar name={lastAuthor.displayName} url={topicAvatarUrl(lastAuthor)} size={36}/></Link>
   <Link className="forum-topic-last-copy" href={`/p/${item.slug}${item.lastComment?.id ? '#comment-'+item.lastComment.id : ''}`}><strong className="forum-topic-last-name">{lastAuthor.displayName}</strong><span className="forum-topic-last-time"><ForumTime value={lastAt}/></span></Link>
  </div>
  <div className="forum-topic-menu"><TopicActions item={item} demo={demo} guest={guest}/></div>
 </article>;
}

const tabs = [{ id: 'new', label: 'Обзор', mode: 'new' }, { id: 'popular', label: 'Популярные', mode: 'popular' }, { id: 'unanswered', label: 'Без ответа', mode: 'all' }] as const;
type Tab = typeof tabs[number]['id'];
export function HomeDashboard({ initialData, demo = false }: { initialData: HomeInitialData; demo?: boolean }) {
 const reading = useTopicReading();
 const viewer=demo?'guest':reading.viewer;
 const history=demo?null:reading.history;
 const [communities, setCommunities] = useState(initialData.communities ?? []);
 const [overview, setOverview] = useState(initialData.overview);
 const [activityError, setActivityError] = useState(false);
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
 const [tab, setTab] = useState<Tab>('new');
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
 const filterDetailsRef = useRef<HTMLDetailsElement>(null);
 const moreRequest = useRef<AbortController | null>(null);
 const skipInitialDefaultFeed = useRef(true);
 const [pendingTopics, setPendingTopics] = useState<PublicationCardData[] | null>(null);
 function choose(nextTab: Tab, nextCommunity: string) {
  const params = new URLSearchParams(window.location.search);
  nextTab === 'new' ? params.delete('tab') : params.set('tab', nextTab);
  nextCommunity ? params.set('community', nextCommunity) : params.delete('community');
  window.history.pushState(null, '', `${window.location.pathname}${params.size ? '?' + params : ''}`);
  setTab(nextTab); setCommunity(nextCommunity);
 }
 useEffect(() => {
  const restore = () => { const params = new URLSearchParams(window.location.search); const value = params.get('tab'); setTab(tabs.some(item => item.id === value) ? value as Tab : 'new'); setCommunity(params.get('community') || ''); setReady(true); };
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
  // The server already rendered the default newest feed. Avoid immediately
  // downloading the same list again after hydration; filtered/deep-linked
  // views still fetch as soon as their URL state is restored.
  if (skipInitialDefaultFeed.current && initialData.feed !== undefined && tab === 'new' && !community && retry === 0) {
    skipInitialDefaultFeed.current = false;
    return;
  }
  skipInitialDefaultFeed.current = false;
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
 const matchingTopics = demo ? topics.filter(item=>item.format==='TOPIC' && (tab!=='unanswered'||!item.commentCount) && (!community||item.community.slug===community)) : topics;
 const visible = tab === 'new' && !community ? diverseTopics(matchingTopics, item => topicBackdrop(item.community.slug, item.community.name)) : matchingTopics;
 const news = initialData.announcements?.slice(0, 4) ?? [];
 const important = [...news.slice(0,2), ...topics.filter(item => item.isOfficial && item.pinnedUntil && Date.parse(item.pinnedUntil)>Date.now() && !news.some(row => row.id === item.id))].slice(0,2);
 return <div id="top" className={`forum-home ${viewer === 'guest' ? 'is-guest' : ''}`} data-home-reference="v49" data-home-revision="v85" onClickCapture={demo ? event=>{const link=(event.target as HTMLElement).closest('a');if(link && link.getAttribute('href')!=='/')event.preventDefault();} : undefined}>
  {!demo && <HomeWebVitals/>}
  <aside ref={sidebarRef} className={`forum-sidebar ${sidebar ? 'is-open' : ''}`} aria-label="Навигация форума">
   <button type="button" className="forum-sidebar-close" onClick={()=>setSidebar(false)} aria-label="Закрыть меню"><Icon name="close"/></button>
   <Categories items={communities} selected={community}/>
   {overview && !activityError && <section className="forum-side-stats" aria-label="Статистика форума">
    <h2><Icon name="stats"/>Статистика</h2>
    <dl>
     <div><dt>Пользователей</dt><dd>{formatCount(overview.stats.users ?? 0)}</dd></div>
     <div><dt>Тем</dt><dd>{formatCount(overview.stats.topics)}</dd></div>
     <div><dt>Сообщений</dt><dd>{formatCount(overview.stats.messages)}</dd></div>
     <div className="forum-newest-user"><dt>Новый пользователь</dt><dd>{overview.stats.newestUser ? <Link href={`/u/${overview.stats.newestUser.username}`}>{overview.stats.newestUser.displayName}</Link> : '—'}</dd></div>
    </dl>
   </section>}
   <div className="forum-sidebar-bottom"><Link href="/rules">Правила</Link><Link href="/support">Обратная связь</Link></div>
  </aside>
  {sidebar && <button type="button" className="forum-sidebar-backdrop" aria-label="Закрыть навигацию" onClick={() => setSidebar(false)}/>}
  <header className="forum-topbar">
   <Link className="forum-brand" href="/" aria-label="4rrum — главная"><img src="/forrum-assets/brand-4rrum.svg" alt="" aria-hidden="true" width="320" height="90" decoding="async"/><span className="forum-brand-test-label" aria-hidden="true">4RRUM</span></Link>
   <button type="button" className="forum-menu" aria-label={sidebar ? 'Закрыть меню' : 'Открыть меню'} aria-expanded={sidebar} onClick={() => setSidebar(value => !value)}><Icon name="menu"/></button>
   <nav className="forum-primary" aria-label="Основная навигация">{[['/','Главная'],['/communities','Форум'],['/users','Пользователи'],['/rules','Правила']].map(([href,label])=><Link key={href} href={href} aria-current={href==='/'?'page':undefined}>{label}</Link>)}<details className="forum-header-more"><summary>Больше<Icon name="chevron"/></summary><div className="forum-header-more-links">{mainLinks.slice(1).map(([href,label])=><Link href={href} key={href}>{label}</Link>)}</div></details></nav>
   <HeaderSearch inputRef={searchInput}/>
   <Link className="forum-notifications" href="/notifications" aria-label="Уведомления"><Icon name="bell"/></Link>
   <AuthActions/>
   {viewer === 'guest' && <Link className="forum-header-join" href="/register">Регистрация</Link>}
  </header>

  <section className="forum-intro" aria-label="О 4rrum">
   {demo && <span className="forum-demo-label">Демонстрационные данные · <Link href="/">На форум</Link></span>}
   <div className="forum-search-hero">
    <img className="forum-hero-art" src="/forrum-assets/hero-planet-v72.webp" alt="" aria-hidden="true" width="1600" height="420" fetchPriority="high" decoding="async"/>
    <div className="forum-hero-copy">
     <p className="forum-hero-kicker">4RRUM // БОЛЬШЕ ЧЕМ ФОРУМ</p>
     <h1>ТЕХНОЛОГИИ. ЛЮДИ. ИДЕИ.</h1>
     <p className="forum-hero-subtitle">Обсуждаем. Делимся. Развиваемся вместе.</p>
    </div>
    <div className="forum-hero-pixel-art" aria-hidden="true"><span>IDEAS</span><span>PEOPLE</span><span>TECHNOLOGIES</span></div>
   </div>
  </section>

  <div className="forum-center">
   {!!important.length && <section className="forum-important" aria-labelledby="forum-important-title">
    <header><h2 id="forum-important-title"><Icon name="pin"/>Важное</h2><Link href="/news">Все новости →</Link></header>
    <div className="forum-important-list">{important.map((item,index)=><Link className="forum-important-row" href={`/p/${item.slug}`} key={item.id}>
      <span className="forum-important-icon"><Icon name={index===0?'megaphone':'calendar'}/></span>
      <span className="forum-important-copy"><small>{item.isOfficial?'Официально':'Сообщество'}</small><span className="forum-important-text"><strong>{(item.title||'Обновление 4rrum').replace(/FORRUM/g,'4rrum')}</strong><span>{item.excerpt}</span></span></span>
      <ForumTime value={item.createdAt} absolute/>
      <span className="forum-important-stat"><Icon name="comment"/>{formatCount(item.commentCount)}</span>
      <span className="forum-important-stat"><Icon name="eye"/>{formatCount(item.viewCount)}</span>
      <span className="forum-important-arrow">›</span>
     </Link>)}</div>
   </section>}

   <div className="forum-feed-toolbar">
    <h2 className="forum-feed-title"><Icon name="comment"/>Обсуждения</h2>
    <div className="forum-tabs" role="group" aria-label="Выбор ленты">{tabs.map(item => <button type="button" aria-label={item.id==='new'?'Обзор разных разделов':item.id==='popular'?'Активные темы за 24 часа':'Темы без ответов'} aria-pressed={item.id === tab} key={item.id} title={item.id === 'popular' ? 'Темы с ответами за последние 24 часа' : item.id === 'new' ? 'Новые темы с чередованием разделов' : undefined} onClick={() => choose(item.id, community)}>{item.label}</button>)}</div>
    <details className="forum-feed-options" onKeyDown={event=>{if(event.key==='Escape'){event.currentTarget.open=false;event.currentTarget.querySelector('summary')?.focus();}}}>
     <summary aria-label="Действия ленты"><Icon name="plus"/></summary>
     <div className="forum-feed-options-menu">
      <Link className="forum-feed-create" href="/create"><Icon name="plus"/><span>Создать тему</span></Link>
      <button type="button" className="forum-filter-toggle" aria-expanded={filters} onClick={event=>{setFilters(value => !value);event.currentTarget.closest('details')?.removeAttribute('open');}}><Icon name="filter"/><span>Фильтры</span></button>
     </div>
    </details>
   </div>
   <div className="forum-topic-columns" aria-hidden="true"><span>Тема</span><span>Категория</span><span>Ответы</span><span>Просмотры</span><span>Последнее сообщение</span><span/></div>
   {filters && <div className="forum-filters">
    <span className="forum-filter-label">Сообщество</span>
    <details className="forum-filter-menu" ref={filterDetailsRef} onKeyDown={event=>{
      const details=event.currentTarget;
      const summary=details.querySelector('summary');
      if(event.key==='Escape'){event.preventDefault();details.open=false;summary?.focus();return;}
      if(!['ArrowDown','ArrowUp','Home','End'].includes(event.key))return;
      event.preventDefault();details.open=true;
      const buttons=Array.from(details.querySelectorAll<HTMLButtonElement>('[role="menuitemradio"]'));
      const index=buttons.indexOf(document.activeElement as HTMLButtonElement);
      const next=event.key==='Home'?0:event.key==='End'?buttons.length-1:event.key==='ArrowDown'?(index+1)%buttons.length:(index<=0?buttons.length-1:index-1);
      buttons[next]?.focus();
     }}>
     <summary aria-label="Выбрать сообщество">{communityLabel(communities.find(item=>item.slug===community)?.name || 'Все сообщества')}<span aria-hidden="true">⌄</span></summary>
     <div className="forum-filter-options" role="menu" aria-label="Фильтр по сообществу">
      <button type="button" role="menuitemradio" aria-checked={!community} onClick={()=>{choose(tab,'');filterDetailsRef.current?.removeAttribute('open');filterDetailsRef.current?.querySelector('summary')?.focus();}}>Все сообщества</button>
      {communities.map(item=><button key={item.slug} type="button" role="menuitemradio" aria-checked={community===item.slug} onClick={()=>{choose(tab,item.slug);filterDetailsRef.current?.removeAttribute('open');filterDetailsRef.current?.querySelector('summary')?.focus();}}>{communityLabel(item.name)}</button>)}
     </div>
    </details>
    {community && <button className="forum-filter-reset" type="button" onClick={() => choose(tab,'')}>Сбросить</button>}
   </div>}
   {community && <div className="forum-active-filter">{communityLabel(communities.find(item=>item.slug===community)?.name || community)}<button type="button" onClick={()=>choose(tab,'')} aria-label="Сбросить выбранное сообщество">×</button></div>}
   {pendingTopics && !loading && <button type="button" className="forum-feed-update" onClick={() => {setTopics(pendingTopics.slice(0,20));setHasMore(pendingTopics.length>20);setOffset(20);setPendingTopics(null);}}>Есть обновления в ленте · Показать</button>}
   <section className="forum-feed" aria-label="Темы форума" aria-busy={loading} aria-live="polite">{loading ? <div className="forum-empty" role="status">Загружаем темы…</div> : error ? <div className="forum-empty" role="alert"><p>{error}</p><button type="button" className="forum-button" onClick={() => setRetry(value => value + 1)}>Попробовать снова</button></div> : visible.length ? visible.map(item => <Topic key={`${tab}-${item.id}`} item={item} history={history} communities={communities} demo={demo} guest={viewer === 'guest'}/>) : <div className="forum-empty"><strong>{tab==='popular'?'За сутки новых ответов пока нет':tab==='unanswered'?'Вопросов без ответа пока нет':'Здесь пока нет тем'}</strong><p>Выберите другую подборку или начните своё обсуждение.</p><Link className="forum-button" href="/create">Создать тему</Link></div>}</section>
   {!loading && !error && hasMore && !demo && <div className="forum-load-more"><button className="forum-button" type="button" disabled={loadingMore} onClick={()=>void loadMore()}>{loadingMore?'Загружаем…':'Показать ещё обсуждения'}</button></div>}
   {!loading && !error && !hasMore && visible.length > 0 && <footer className="forum-feed-end"><span>Вы просмотрели все обсуждения в этой подборке</span><a href="#top">Наверх ↑</a></footer>}
   <section className="forum-alpha-help" aria-label="Участие в альфе"><span><strong>Закрытая альфа</strong> · Проверяем форум вместе. Нашли неудобство или ошибку?</span><Link href="/support#alpha">Сообщить о проблеме →</Link></section>
   {moreError && <p className="forum-action-error" role="alert">{moreError}</p>}
  </div>
  <CommunityPanels demo={demo} overview={overview} unavailable={activityError || !overview} news={news} events={initialData.events} feed={topics}/>
 </div>;
}
