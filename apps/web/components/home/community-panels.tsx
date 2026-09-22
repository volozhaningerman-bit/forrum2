'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import type { WeeklyUser } from './types';
import { Avatar } from '../avatar';
import { formatCount } from './utils';
import type { HomeInitialData, HomeOverview } from './types';
import type { PublicationCardData } from '@/lib/types';
export function CommunityPanels({overview,unavailable,news,projects,events}:{overview?:HomeOverview;unavailable:boolean;news:PublicationCardData[];projects:HomeInitialData['projects'];events:HomeInitialData['events']}) {
 const [mode,setMode]=useState<'activity'|'likes'>('activity');
 const [period,setPeriod]=useState<'week'|'all'>('week');
 const [ranking,setRanking]=useState<WeeklyUser[]|null>(null);
 const [rankingError,setRankingError]=useState(false);
 const [rankingLoading,setRankingLoading]=useState(false);
 const [retry,setRetry]=useState(0);
 const [now,setNow]=useState<number|null>(null);
 useEffect(()=>{setNow(Date.now());const timer=setInterval(()=>setNow(Date.now()),60000);return()=>clearInterval(timer);},[]);
 useEffect(()=>{
   const controller=new AbortController();setRankingLoading(true);setRankingError(false);setRanking(null);
   api<WeeklyUser[]>(`/home/ranking?period=${period}&mode=${mode}`,{signal:controller.signal})
     .then(rows=>{if(!controller.signal.aborted)setRanking(rows);})
     .catch(()=>{if(!controller.signal.aborted)setRankingError(true);})
     .finally(()=>{if(!controller.signal.aborted)setRankingLoading(false);});
   return()=>controller.abort();
 },[period,mode,retry]);
 const authors=ranking ?? (period==='week' ? overview?.weekly?.[mode]?.slice(0,5) ?? [] : []);
 const popular=[...(projects??[])].sort((a,b)=>b.interactionCount-a.interactionCount||Date.parse(b.updatedAt)-Date.parse(a.updatedAt)).slice(0,3);
 const validEvents=(events??[]).filter(event=>event.status!=="CANCELLED" && Number.isFinite(Date.parse(event.startsAt)));
 const upcoming=now===null?[]:validEvents.filter(event=>Date.parse(event.endsAt||event.startsAt)>=now).sort((a,b)=>Date.parse(a.startsAt)-Date.parse(b.startsAt)).slice(0,2).map(event=>({id:`event-${event.id}`,title:event.title,date:event.startsAt,href:`/events/${event.id}`,kind:'Событие'}));
 const past=now===null?[]:validEvents.filter(event=>Date.parse(event.endsAt||event.startsAt)<now).map(event=>({id:`event-${event.id}`,title:event.title,date:event.startsAt,href:`/events/${event.id}`,kind:'Прошедшее событие'}));
 const recent=[...past,...news.map(item=>({id:item.id,title:item.title||'Обновление 4rrum',date:item.createdAt,href:`/p/${item.slug}`,kind:'Обновление'}))].filter(item=>Number.isFinite(Date.parse(item.date))).sort((a,b)=>Date.parse(b.date)-Date.parse(a.date));
 const updates=[...upcoming,...recent].slice(0,3);
 function interactions(count:number){const mod=count%100;return `${formatCount(count)} ${mod>=11&&mod<=14?'взаимодействий':count%10===1?'взаимодействие':count%10>=2&&count%10<=4?'взаимодействия':'взаимодействий'}`;}

 return <aside className="forum-right" aria-label="Обзор сообщества">
  <section className="forum-panel"><header><h2>Рейтинг пользователей</h2><select className="forum-ranking-period" aria-label="Период рейтинга" value={period} onChange={event=>setPeriod(event.target.value as 'week'|'all')}><option value="week">За 7 дней</option><option value="all">Всё время</option></select></header><div className="forum-ranking-tabs" role="group" aria-label="Показатель рейтинга"><button type="button" aria-pressed={mode==='activity'} onClick={()=>setMode('activity')}>Сообщения</button><button type="button" aria-pressed={mode==='likes'} onClick={()=>setMode('likes')}>Симпатии</button></div>
   {rankingLoading ? <p className="forum-muted" role="status">Загружаем рейтинг…</p> : rankingError || (unavailable && !ranking) ? <p className="forum-muted">Рейтинг временно недоступен. <button type="button" onClick={()=>setRetry(value=>value+1)}>Повторить</button></p> : authors.length ? <ol className="forum-author-ranking">{authors.map((person,index)=><li key={person.username}><span className="forum-rank">{index+1}</span><Link href={`/u/${person.username}`}><Avatar name={person.displayName} url={person.avatarUrl} size={30}/><strong>{person.displayName}</strong></Link><small title={mode==='likes'?'Симпатии к темам':'Темы и ответы'}>{formatCount(mode==='likes'?person.reactionCount:person.topicCount+person.commentCount)}</small></li>)}</ol> : <div className="forum-ranking-empty"><strong>{mode==='likes'?'Поддержите полезную тему':'Первое слово — за вами'}</strong><p className="forum-muted">{period==='week'?'За последние 7 дней':'За всё время'} {mode==='likes'?'пока нет симпатий к темам.':'ещё нет новых тем и ответов.'}</p>{period==='week' && <button className="forum-ranking-all" type="button" onClick={()=>setPeriod('all')}>Участники за всё время →</button>}<Link href={mode==='likes'?'/':'/create'}>{mode==='likes'?'Посмотреть обсуждения →':'Начать обсуждение →'}</Link></div>}
  </section>
  <section className="forum-panel"><header><h2>{popular.length<3 ? 'Проекты сообщества' : 'Популярные проекты'}</h2></header>{popular.length?popular.map(item=><Link className="forum-project-mini" href={`/portfolio/${item.id}`} key={item.id}>{item.coverUrl?<img src={item.coverUrl} alt="" width={48} height={48} loading="lazy"/>:<span className="forum-project-fallback" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m12 3 9 5v8l-9 5-9-5V8zM3 8l9 5 9-5M12 13v8"/></svg></span>}<span><strong>{item.title}</strong><small>{item.summary}</small><span className="forum-project-metric" title="Завершённые взаимодействия, подтверждённые в проекте">{interactions(item.interactionCount)}</span></span></Link>):<p className="forum-muted">{projects===undefined?'Проекты временно недоступны.':'Проекты появятся здесь после публикации в каталоге.'}</p>}<Link className="forum-panel-footer" href="/projects">Открыть каталог проектов →</Link></section>
  <section className="forum-panel forum-updates"><header><h2>События и обновления</h2><Link href="/events">События →</Link></header>{updates.length?updates.map(item=><Link key={item.id} href={item.href}><i aria-hidden="true"/><span><small className="forum-update-kind">{item.kind}</small><strong>{item.title}</strong><time dateTime={item.date}>{new Date(item.date).toLocaleDateString('ru-RU',{day:'numeric',month:'long',timeZone:'UTC'})}</time></span></Link>):<p className="forum-muted">{events===undefined?'События временно недоступны.':'Новых событий пока нет.'}</p>}</section>
 </aside>;
}
