'use client';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { api } from '@/lib/api';
import type { WeeklyUser } from './types';
import { Avatar } from '../avatar';
import { formatCount } from './utils';
import type { HomeInitialData, HomeOverview } from './types';
import type { PublicationCardData } from '@/lib/types';

function PanelIcon({kind}:{kind:'flame'|'trophy'}) {
  const path=kind==='flame'
    ? 'M12 2c2 5 8 7 8 13a8 8 0 0 1-16 0c0-3 2-5 4-7 0 4 2 5 3 5 2-3 2-7 1-11Z'
    : 'M7 4h10v4c0 4-2 7-5 7s-5-3-5-7V4Zm-3 2h3v3c0 2-1 3-3 3V6Zm13 0h3v6c-2 0-3-1-3-3V6ZM12 15v4M8 21h8';
  return <svg className={`forum-panel-icon forum-panel-icon-${kind}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={path}/></svg>;
}

export function CommunityPanels({
  overview,
  unavailable,
  news,
  events,
  feed,
}: {
  overview?: HomeOverview;
  unavailable: boolean;
  news: PublicationCardData[];
  events: HomeInitialData['events'];
  feed: PublicationCardData[];
}) {
  void news;
  void events;
  const [mode,setMode]=useState<'activity'|'likes'>('activity');
  const [period,setPeriod]=useState<'week'|'month'|'all'>('week');
  const [ranking,setRanking]=useState<WeeklyUser[]|null>(null);
  const [fallbackRanking,setFallbackRanking]=useState<WeeklyUser[]>([]);
  const [rankingError,setRankingError]=useState(false);
  const [rankingLoading,setRankingLoading]=useState(false);
  const [retry,setRetry]=useState(0);

  useEffect(()=>{
    const controller=new AbortController();
    setRankingLoading(true);
    setRankingError(false);
    setRanking(null);
    setFallbackRanking([]);
    api<WeeklyUser[]>(`/home/ranking?period=${period}&mode=${mode}`,{signal:controller.signal})
      .then(async rows=>{
        if(controller.signal.aborted) return;
        setRanking(rows);
        if(rows.length===0 && period!=='all'){
          try {
            const fallback=await api<WeeklyUser[]>(`/home/ranking?period=all&mode=${mode}`,{signal:controller.signal});
            if(!controller.signal.aborted)setFallbackRanking(fallback.slice(0,10));
          } catch {}
        }
      })
      .catch(()=>{if(!controller.signal.aborted)setRankingError(true);})
      .finally(()=>{if(!controller.signal.aborted)setRankingLoading(false);});
    return()=>controller.abort();
  },[period,mode,retry]);

  const weeklyCached=period==='week' ? overview?.weekly?.[mode]?.slice(0,10) ?? [] : [];
  const authors=ranking?.length ? ranking : fallbackRanking.length ? fallbackRanking : ranking===null ? weeklyCached : [];
  const rankingUsesFallback=Boolean(ranking && ranking.length===0 && fallbackRanking.length);
  const periodLabel=period==='week'?'За неделю':period==='month'?'За месяц':'За всё время';
  const popularToday=useMemo(()=>{
    const discussedRows=(overview?.discussed??[]).slice().sort((a,b)=>Date.parse(b.lastActivityAt||b.createdAt)-Date.parse(a.lastActivityAt||a.createdAt));
    const discussed=new Map(discussedRows.map(item=>[item.slug,item]));
    const active=(overview?.pulse?.activeTopics??[]).slice(0,5).map(item=>({
      slug:item.slug,
      title:item.title||'Обсуждение',
      replies:item.replyCount,
      views:discussed.get(item.slug)?.viewCount,
    }));
    const seen=new Set(active.map(item=>item.slug));
    const discussedFallback=discussedRows
      .filter(item=>!seen.has(item.slug))
      .map(item=>({slug:item.slug,title:item.title||'Обсуждение',replies:item.commentCount,views:item.viewCount}));
    const todayItems=[...active,...discussedFallback].slice(0,5);
    if(todayItems.length) return {items:todayItems,isFallback:false};
    const feedFallback=feed
      .filter(item=>item.format==='TOPIC')
      .slice()
      .sort((a,b)=>(b.viewCount??0)-(a.viewCount??0) || b.commentCount-a.commentCount)
      .slice(0,5)
      .map(item=>({slug:item.slug,title:item.title||'Обсуждение',replies:item.commentCount,views:item.viewCount}));
    return {items:feedFallback,isFallback:true};
  },[overview,feed]);

  return <aside className="forum-right" aria-label="Обзор сообщества">
    <section className="forum-panel forum-ranking-panel">
      <header>
        <h2><PanelIcon kind="trophy"/>Рейтинг пользователей</h2>
        <div className="forum-ranking-period" role="group" aria-label="Период рейтинга">
          <button type="button" aria-pressed={period==='week'} onClick={()=>setPeriod('week')}>За неделю</button>
          <button type="button" aria-pressed={period==='month'} onClick={()=>setPeriod('month')}>За месяц</button>
          <button type="button" aria-pressed={period==='all'} onClick={()=>setPeriod('all')}>За всё время</button>
        </div>
      </header>
      <div className="forum-ranking-tabs" role="group" aria-label="Показатель рейтинга">
        <button type="button" aria-pressed={mode==='activity'} onClick={()=>setMode('activity')}>Сообщения</button>
        <button type="button" aria-pressed={mode==='likes'} onClick={()=>setMode('likes')}>Симпатии</button>
      </div>
      {rankingLoading
        ? <p className="forum-muted" role="status">Загружаем рейтинг…</p>
        : rankingError || (unavailable && !ranking)
          ? <p className="forum-muted">Рейтинг временно недоступен. <button type="button" onClick={()=>setRetry(value=>value+1)}>Повторить</button></p>
          : authors.length
            ? <>{rankingUsesFallback && <p className="forum-ranking-note">{periodLabel}: активности пока нет · показан общий рейтинг</p>}<ol className="forum-author-ranking">{authors.map((person,index)=><li key={person.username}>
                <span className={"forum-rank"+(index<3?` is-medal is-medal-${index+1}`:'')}>{index<3?'♛':index+1}</span>
                <Link href={`/u/${person.username}`}><Avatar name={person.displayName} url={person.avatarUrl} size={28}/><strong>{person.displayName}</strong></Link>
                <small title={mode==='likes'?'Симпатии к темам':'Темы и ответы'}>{formatCount(mode==='likes'?person.reactionCount:person.topicCount+person.commentCount)}</small>
              </li>)}</ol></>
            : <div className="forum-ranking-empty">
                <strong>{mode==='likes'?'Поддержите полезную тему':'Первое слово — за вами'}</strong>
                <p className="forum-muted">{periodLabel} {mode==='likes'?'пока нет симпатий к темам.':'ещё нет новых тем и ответов.'}</p>
                {period==='week' && <button className="forum-ranking-all" type="button" onClick={()=>setPeriod('all')}>Участники за всё время →</button>}
                <Link href={mode==='likes'?'/':'/create'}>{mode==='likes'?'Посмотреть обсуждения →':'Начать обсуждение →'}</Link>
              </div>}
      <Link className="forum-panel-footer" href="/communities">Весь рейтинг →</Link>
    </section>

    <section className="forum-panel forum-popular-today">
      <header><h2><PanelIcon kind="flame"/>Популярное сегодня</h2><Link href="/?tab=popular">Все →</Link></header>
      {popularToday.items.length
        ? <>
            {popularToday.isFallback && <p className="forum-popular-note">Сегодня без новых всплесков · темы из текущей ленты</p>}
            <ol>{popularToday.items.map((item,index)=><li key={item.slug}>
              <span className="forum-popular-rank">{index+1}</span>
              <Link href={`/p/${item.slug}`}>
                <strong>{item.title}</strong>
                <small>{popularToday.isFallback
                  ? `${formatCount(item.replies)} ответов${typeof item.views==='number'? ` · ${formatCount(item.views)} просмотров` : ''}`
                  : `${formatCount(item.replies)} ответов сегодня${typeof item.views==='number'? ` · ${formatCount(item.views)} просмотров` : ''}`}</small>
              </Link>
            </li>)}</ol>
          </>
        : <div className="forum-activity-empty"><p>Сегодня пока тихо. Начните обсуждение — оно появится здесь, когда соберёт ответы.</p><Link href="/create">Создать тему →</Link></div>}
    </section>
  </aside>;
}
