'use client';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { api } from '@/lib/api';
import type { WeeklyUser } from './types';
import { Avatar } from '../avatar';
import { formatCount } from './utils';
import type { HomeInitialData, HomeOverview } from './types';
import type { PublicationCardData } from '@/lib/types';
import { CompactSelect } from './compact-select';

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
  const [period,setPeriod]=useState<'week'|'all'>('week');
  const [ranking,setRanking]=useState<WeeklyUser[]|null>(null);
  const [rankingError,setRankingError]=useState(false);
  const [rankingLoading,setRankingLoading]=useState(false);
  const [retry,setRetry]=useState(0);

  useEffect(()=>{
    const controller=new AbortController();
    setRankingLoading(true);
    setRankingError(false);
    setRanking(null);
    api<WeeklyUser[]>(`/home/ranking?period=${period}&mode=${mode}`,{signal:controller.signal})
      .then(rows=>{if(!controller.signal.aborted)setRanking(rows);})
      .catch(()=>{if(!controller.signal.aborted)setRankingError(true);})
      .finally(()=>{if(!controller.signal.aborted)setRankingLoading(false);});
    return()=>controller.abort();
  },[period,mode,retry]);

  const authors=ranking ?? (period==='week' ? overview?.weekly?.[mode]?.slice(0,10) ?? [] : []);
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
        <h2>Рейтинг пользователей</h2>
        <CompactSelect
          className="forum-ranking-period"
          label="Период рейтинга"
          value={period}
          options={[{value:'week',label:'За 7 дней'},{value:'all',label:'Всё время'}]}
          onChange={value=>setPeriod(value as 'week'|'all')}
        />
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
            ? <ol className="forum-author-ranking">{authors.map((person,index)=><li key={person.username}>
                <span className="forum-rank">{index+1}</span>
                <Link href={`/u/${person.username}`}><Avatar name={person.displayName} url={person.avatarUrl} size={28}/><strong>{person.displayName}</strong></Link>
                <small title={mode==='likes'?'Симпатии к темам':'Темы и ответы'}>{formatCount(mode==='likes'?person.reactionCount:person.topicCount+person.commentCount)}</small>
              </li>)}</ol>
            : <div className="forum-ranking-empty">
                <strong>{mode==='likes'?'Поддержите полезную тему':'Первое слово — за вами'}</strong>
                <p className="forum-muted">{period==='week'?'За последние 7 дней':'За всё время'} {mode==='likes'?'пока нет симпатий к темам.':'ещё нет новых тем и ответов.'}</p>
                {period==='week' && <button className="forum-ranking-all" type="button" onClick={()=>setPeriod('all')}>Участники за всё время →</button>}
                <Link href={mode==='likes'?'/':'/create'}>{mode==='likes'?'Посмотреть обсуждения →':'Начать обсуждение →'}</Link>
              </div>}
      <Link className="forum-panel-footer" href="/communities">Весь рейтинг →</Link>
    </section>

    <section className="forum-panel forum-popular-today">
      <header><h2>Популярное сегодня</h2><Link href="/?tab=popular">Все →</Link></header>
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
