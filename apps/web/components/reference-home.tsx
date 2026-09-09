'use client';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTopicReading } from './use-topic-reading';
import { topicReadState, type ReadHistory } from '@/lib/topic-reading';
import { api } from '@/lib/api';
import type { PublicationCardData } from '@/lib/types';
import { Avatar } from './avatar';
import { AuthActions } from './auth-actions';
import { HeaderSearch } from './header-search';
import { ThemeToggle } from './theme-toggle';
import { TelegramShareButton } from './telegram-share-button';
import { formatCount, relativeTime } from './home/utils';
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
function replyLabel(count: number) {
 const form = new Intl.PluralRules('ru').select(count);
 return `${count} ${form === 'one' ? 'ответ' : form === 'few' ? 'ответа' : 'ответов'}`;
}
function DialogueArt() {
 return <svg className="forum-dialogue-art" viewBox="0 0 330 180" aria-hidden="true">
  <ellipse className="art-shadow" cx="164" cy="153" rx="120" ry="15"/>
  <g transform="translate(40 22) rotate(-8 100 65)"><path className="art-back" d="M12 0h172a12 12 0 0 1 12 12v91a12 12 0 0 1-12 12H68l-26 22v-22H12a12 12 0 0 1-12-12V12A12 12 0 0 1 12 0Z"/><path className="art-line" d="M24 31h107M24 47h141M24 63h85"/></g>
  <g transform="translate(139 72) rotate(7 70 40)"><path className="art-front" d="M10 0h120a10 10 0 0 1 10 10v62a10 10 0 0 1-10 10h-17v18L88 82H10A10 10 0 0 1 0 72V10A10 10 0 0 1 10 0Z"/><circle className="art-dot" cx="38" cy="40" r="5"/><circle className="art-dot" cx="70" cy="40" r="5"/><circle className="art-dot" cx="102" cy="40" r="5"/></g>
 </svg>;
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
  </div>{open && !!children.length && <div className="forum-category-children">{children.map(child => renderCategory(child, nextTrail))}</div>}</div>;
 }
 return <nav className="forum-categories" aria-label="Категории"><p className="forum-eyebrow">Категории</p>
  {(roots.length ? roots : items).map(root => renderCategory(root))}
  <Link className="forum-all-communities" href="/communities">Все сообщества →</Link>
 </nav>;
}

function Topic({ item, history }: { item: PublicationCardData; history: ReadHistory | null }) {
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
  <div className="forum-topic-content">
   <div className="forum-topic-context"><Link href={`/communities/${item.community.slug}`}>{item.community.name}</Link><span>›</span>{item.tags?.slice(0, 2).map(tag => <Link className="forum-tag" href={`/tags/${tag.slug}`} key={tag.id}>#{tag.label}</Link>)}</div>
   <h2>{readState === 'unread' && <span className="forum-unread-dot" role="img" aria-label="Не открывали в этом браузере"/>}<Link href={`/p/${item.slug}`}>{item.title?.trim() || 'Запись без заголовка'}</Link></h2>
   <p className="forum-topic-excerpt">{item.excerpt}</p>
   <div className="forum-topic-service"><div className="forum-topic-bottom"><Link className="forum-author" href={`/u/${item.author.username}`}><Avatar name={item.author.displayName} url={item.author.avatarUrl} size={30}/><strong>{item.author.displayName}</strong></Link><time className="forum-time" dateTime={item.createdAt}>{relativeTime(item.createdAt)}</time>
    {readState === 'updated' && <Link className="forum-new-replies" href={`/p/${item.slug}#new-replies`} title="После прошлого открытия темы в этом браузере">Новые ответы →</Link>}
   </div>
   {item.lastComment ? <div className="forum-last-reply"><span className="forum-reply-label">Последний ответ</span><Link className="forum-reply-person" href={`/u/${item.lastComment.author.username}`}>{item.lastComment.author.displayName}</Link><Link className="forum-reply-preview" href={replyHref}>{item.lastComment.excerpt || 'Открыть ответ'}</Link><Link className="forum-reply-time" href={replyHref}><time dateTime={item.lastComment.createdAt}>{relativeTime(item.lastComment.createdAt)}</time></Link></div> : <div className="forum-last-reply"><span>{item.commentCount === 0 ? 'Пока без ответов' : 'Ответы в теме'}</span></div>}</div>
  </div>
  <div className="forum-topic-meta">
   <Link href={`/p/${item.slug}#discussion`} title="Ответы" aria-label={`Ответы: ${item.commentCount}`}><Icon name="comment"/>{formatCount(item.commentCount)}</Link>
   <span title="Просмотры" aria-label={`Просмотры: ${item.viewCount ?? 0}`}><Icon name="eye"/>{formatCount(item.viewCount)}</span>
   <button type="button" className={saved ? 'is-saved' : ''} disabled={pending} aria-pressed={saved} aria-label={saved ? 'Убрать из сохранённого' : 'Сохранить тему'} onClick={() => void bookmark()}><Icon name="bookmark"/></button>
  </div>
  <div className="forum-topic-share"><TelegramShareButton slug={item.slug} label="В Telegram" variant="inline"/></div>
  {error && <p className="forum-action-error" role="alert">{error}</p>}
 </article>;
}
const tabs = [{ id: 'all', label: 'Все темы', mode: 'all' }, { id: 'popular', label: 'Популярные', mode: 'all' }, { id: 'new', label: 'Новые', mode: 'new' }, { id: 'trend', label: 'Тренд', mode: 'popular' }, { id: 'unanswered', label: 'Без ответов', mode: 'all' }] as const;
type Tab = typeof tabs[number]['id'];
export function HomeDashboard({ initialData }: { initialData: HomeInitialData }) {
 const { history } = useTopicReading();
 const [overview, setOverview] = useState(initialData.overview);
 const [activityError, setActivityError] = useState(false);
 useEffect(() => {
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
 }, []);
 const [tab, setTab] = useState<Tab>('all');
 const [topics, setTopics] = useState(initialData.feed ?? []);
 const [loading, setLoading] = useState(false);
 const [pendingTopics, setPendingTopics] = useState<PublicationCardData[] | null>(null);
 useEffect(() => {
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
 }, [topics, tab, loading]);

 const [error, setError] = useState(initialData.feed === undefined ? 'Не удалось загрузить темы. Попробуйте ещё раз.' : '');
 const [filters, setFilters] = useState(false);
 const [community, setCommunity] = useState('');
 const [sidebar, setSidebar] = useState(false);
 const [retry, setRetry] = useState(0);
 const [welcomeHidden, setWelcomeHidden] = useState(false);
 useEffect(() => {
  try { setWelcomeHidden(localStorage.getItem('forrum-welcome-hidden') === '1'); } catch {}
 }, []);
 function hideWelcome() { setWelcomeHidden(true); try { localStorage.setItem('forrum-welcome-hidden', '1'); } catch {} }
 const firstLoad = useRef(true);
 const searchInput = useRef<HTMLInputElement>(null);
 useEffect(() => {
  const shortcut = (event: KeyboardEvent) => { if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); searchInput.current?.focus(); } if (event.key === 'Escape') setSidebar(false); };
  document.addEventListener('keydown', shortcut); return () => document.removeEventListener('keydown', shortcut);
 }, []);
 useEffect(() => {
  if (firstLoad.current) { firstLoad.current = false; return; }
  const controller = new AbortController(); setPendingTopics(null); setLoading(true); setError('');
  api<PublicationCardData[]>(`/feed?mode=${tabs.find(item => item.id === tab)?.mode ?? 'all'}`, { signal: controller.signal })
   .then(rows => { if (!controller.signal.aborted) setTopics(rows); })
   .catch(cause => { if (!controller.signal.aborted) setError(cause instanceof Error ? cause.message : 'Не удалось загрузить темы'); })
   .finally(() => { if (!controller.signal.aborted) setLoading(false); });
  return () => controller.abort();
 }, [tab, retry]);
 const visible = useMemo(() => {
  const rows = topics.filter(item => item.format === 'TOPIC' && (tab !== 'unanswered' || item.commentCount === 0) && (!community || item.community.slug === community));
  if (tab === 'new') rows.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
  if (tab === 'popular') rows.sort((a, b) => b.commentCount - a.commentCount || b.reactionCount - a.reactionCount);
  return rows;
 }, [topics, tab, community]);
 const news = initialData.announcements?.slice(0, 4) ?? [];
 return <div className={`forum-home ${welcomeHidden ? 'is-welcome-hidden' : ''}`} data-home-reference="v32">
  <aside className={`forum-sidebar ${sidebar ? 'is-open' : ''}`} aria-label="Навигация форума">
   <Link className="forum-brand" href="/"><span className="forum-brand-mark"><Icon name="comment"/></span><span><strong>FORRUM</strong><small>Люди. Знания. Проекты.</small></span></Link>
   <nav className="forum-primary" aria-label="Основная навигация">{([{ href: '/', label: 'Главная', icon: 'home' }, { href: '/workshop', label: 'Мастерская', icon: 'work' }, { href: '/media', label: 'Медиа', icon: 'media' }, { href: '/services', label: 'Услуги', icon: 'service' }] as const).map(item => <Link key={item.href} href={item.href} aria-current={item.href === '/' ? 'page' : undefined}><Icon name={item.icon}/>{item.label}</Link>)}</nav>
   <Categories items={initialData.communities ?? []} selected={community}/>
   <section className="forum-join"><strong>Станьте частью FORRUM</strong><p>Отвечайте людям и следите за продолжением интересных обсуждений.</p><Link className="forum-button" href="/register">Зарегистрироваться</Link><small>Это займёт меньше минуты</small></section>
   <div className="forum-sidebar-bottom"><Link href="/rules">Правила</Link><Link href="/support">Обратная связь</Link></div>
  </aside>
  {sidebar && <button type="button" className="forum-sidebar-backdrop" aria-label="Закрыть навигацию" onClick={() => setSidebar(false)}/>}
  <header className="forum-topbar"><button type="button" className="forum-menu" aria-label={sidebar ? 'Закрыть меню' : 'Открыть меню'} aria-expanded={sidebar} onClick={() => setSidebar(value => !value)}><Icon name="menu"/></button>
   <HeaderSearch inputRef={searchInput}/>
   <Link className="forum-button forum-top-create" href="/create"><Icon name="plus"/>Создать тему</Link><ThemeToggle/><Link className="forum-notifications" href="/notifications" aria-label="Уведомления"><Icon name="bell"/></Link><AuthActions/>
  </header>
  <div className="forum-center">{!welcomeHidden && <section className="forum-welcome"><button type="button" className="forum-welcome-close" aria-label="Скрыть приветствие" onClick={hideWelcome}><Icon name="close"/></button><div className="forum-welcome-copy"><h1>Здесь создают проекты<br/>и находят людей</h1><p>Обсуждайте запуск проектов, ищите специалистов и делитесь опытом.</p><div><Link className="forum-button" href="/create"><Icon name="plus"/>Создать тему</Link><Link className="forum-button forum-button-secondary" href="/communities">Смотреть сообщества</Link></div></div>{!activityError && overview?.pulse?.activeTopics.length ? <div className="forum-welcome-live"><strong>Сейчас обсуждают</strong>{overview.pulse.activeTopics.map(item => <Link key={item.slug} href={`/p/${item.slug}`}><span>{item.title || 'Обсуждение'}</span><small>{replyLabel(item.replyCount)} за 24 часа</small></Link>)}</div> : <DialogueArt/>}</section>}
   <div className="forum-feed-toolbar"><div className="forum-tabs" role="group" aria-label="Выбор ленты">{tabs.map(item => <button type="button" aria-pressed={item.id === tab} key={item.id} onClick={() => setTab(item.id)}>{item.id === 'trend' && <Icon name="flame"/>}{item.label}</button>)}</div><button type="button" className="forum-filter-toggle" aria-expanded={filters} onClick={() => setFilters(value => !value)}>Фильтры<Icon name="filter"/></button></div>
   {filters && <div className="forum-filters"><label>Сообщество<select aria-label="Сообщество" value={community} onChange={event => setCommunity(event.target.value)}><option value="">Все сообщества</option>{initialData.communities?.map(item => <option key={item.slug} value={item.slug}>{item.name}</option>)}</select></label><button type="button" onClick={() => setCommunity('')}>Сбросить</button></div>}
   {pendingTopics && !loading && <button type="button" className="forum-feed-update" onClick={() => {setTopics(pendingTopics);setPendingTopics(null);}}>Есть обновления в ленте · Показать</button>}
   <section className="forum-feed" aria-label="Темы форума" aria-busy={loading}>{loading ? <div className="forum-empty" role="status">Загружаем темы…</div> : error ? <div className="forum-empty" role="alert"><p>{error}</p><button type="button" className="forum-button" onClick={() => setRetry(value => value + 1)}>Попробовать снова</button></div> : visible.length ? visible.map(item => <Topic key={`${tab}-${item.id}`} item={item} history={history}/>) : <div className="forum-empty"><strong>Тем пока нет</strong><p>Измените фильтр или начните новое обсуждение.</p><Link className="forum-button" href="/create">Создать тему</Link></div>}</section>
  </div>
  <aside className="forum-right" aria-label="Обзор сообщества">
   <section className="forum-panel forum-presence"><header><h2>В сообществе</h2></header>
    {activityError || !overview ? <p className="forum-muted">Активность временно недоступна.</p> : <>
     {overview.stats.usersOnline > 0 && <p className="forum-online"><span aria-hidden="true">●</span><strong>{overview.stats.usersOnline}</strong> онлайн <small>за 5 минут</small></p>}
     {!!overview.pulse?.recentReplies.length ? <div className="forum-recent-replies"><h3>Последние разговоры</h3>{overview.pulse.recentReplies.slice(0,3).map(reply => <div key={reply.id}><Avatar name={reply.author.displayName} url={reply.author.avatarUrl} size={30}/><div><Link className="forum-reply-person" href={`/u/${reply.author.username}`}>{reply.author.displayName}</Link><span> ответил</span><Link className="forum-reply-topic" href={`/p/${reply.publication.slug}#comment-${reply.id}`}>{reply.publication.title || 'Обсуждение'}</Link>{reply.excerpt && <p className="forum-community-excerpt">{reply.excerpt}</p>}<time dateTime={reply.createdAt}>{relativeTime(reply.createdAt)}</time></div></div>)}</div> : <p className="forum-muted forum-community-empty">Покажите, над чем работаете, или задайте вопрос сообществу. <Link href="/create">Начать обсуждение →</Link></p>}
    </>}
    {!!news.length && <div className="forum-news"><header><h3>Объявления FORRUM</h3><Link href="/news">Все →</Link></header>{news.slice(0,2).map(item => <Link key={item.id} href={`/p/${item.slug}`}>{item.title || 'Новость FORRUM'}<time dateTime={item.createdAt}>{new Date(item.createdAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}</time></Link>)}</div>}
   </section>

  </aside>
 </div>;
}
