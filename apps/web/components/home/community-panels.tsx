'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Avatar } from '../avatar';
import { formatCount } from './utils';
import type { HomeInitialData, HomeOverview } from './types';
import type { PublicationCardData } from '@/lib/types';
export function CommunityPanels({overview,unavailable,news,projects,events}:{overview?:HomeOverview;unavailable:boolean;news:PublicationCardData[];projects:HomeInitialData['projects'];events:HomeInitialData['events']}) {
 const [mode,setMode]=useState<'activity'|'likes'>('activity');
 const authors=overview?.weekly?.[mode]?.slice(0,5) ?? [];
 const popular=[...(projects??[])].sort((a,b)=>b.interactionCount-a.interactionCount||Date.parse(b.updatedAt)-Date.parse(a.updatedAt)).slice(0,3);
 const updates=[...(events??[]).filter(event=>event.status!=="CANCELLED").map(event=>({id:`event-${event.id}`,title:event.title,date:event.startsAt,href:`/events/${event.id}`})),...news.map(item=>({id:item.id,title:item.title||'Обновление 4rrum',date:item.createdAt,href:`/p/${item.slug}`}))].sort((a,b)=>Date.parse(b.date)-Date.parse(a.date)).slice(0,3);
 return <aside className="forum-right" aria-label="Обзор сообщества">
  <section className="forum-panel"><header><h2>Рейтинг пользователей</h2><small>За 7 дней</small></header><div className="forum-ranking-tabs" role="group" aria-label="Показатель рейтинга"><button type="button" aria-pressed={mode==='activity'} onClick={()=>setMode('activity')}>Сообщения</button><button type="button" aria-pressed={mode==='likes'} onClick={()=>setMode('likes')}>Симпатии</button></div>
   {unavailable ? <p className="forum-muted">Рейтинг временно недоступен.</p> : authors.length ? <ol className="forum-author-ranking">{authors.map((person,index)=><li key={person.username}><span className="forum-rank">{index+1}</span><Link href={`/u/${person.username}`}><Avatar name={person.displayName} url={person.avatarUrl} size={30}/><strong>{person.displayName}</strong></Link><small title={mode==='likes'?'Симпатии к темам':'Темы и ответы'}>{formatCount(mode==='likes'?person.reactionCount:person.topicCount+person.commentCount)}</small></li>)}</ol> : <p className="forum-muted">За неделю ещё нет {mode==='likes'?'симпатий':'сообщений'}. Начните обсуждение или поддержите автора.</p>}
  </section>
  <section className="forum-panel"><header><h2>Популярные проекты</h2><Link href="/projects">Все →</Link></header><p className="forum-panel-note">По подтверждённым взаимодействиям</p>{popular.length?popular.map(item=><Link className="forum-project-mini" href={`/portfolio/${item.id}`} key={item.id}>{item.coverUrl?<img src={item.coverUrl} alt="" width={48} height={48} loading="lazy"/>:<span className="forum-project-fallback" aria-hidden="true">◇</span>}<span><strong>{item.title}</strong><small>{item.summary}</small></span></Link>):<p className="forum-muted">{projects===undefined?'Проекты временно недоступны.':'Проекты появятся здесь после публикации в каталоге.'}</p>}</section>
  <section className="forum-panel forum-updates"><header><h2>События и обновления</h2><Link href="/events">Все →</Link></header>{updates.length?updates.map(item=><Link key={item.id} href={item.href}><i aria-hidden="true"/><span><strong>{item.title}</strong><time dateTime={item.date}>{new Date(item.date).toLocaleDateString('ru-RU',{day:'numeric',month:'long',timeZone:'UTC'})}</time></span></Link>):<p className="forum-muted">{events===undefined?'События временно недоступны.':'Новых событий пока нет.'}</p>}</section>
 </aside>;
}
