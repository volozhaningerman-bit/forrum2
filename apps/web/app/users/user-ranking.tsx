'use client';
import { useEffect,useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Avatar } from '@/components/avatar';
import type { WeeklyUser } from '@/components/home/types';
export function UserRanking(){
 const [period,setPeriod]=useState('week'),[mode,setMode]=useState('activity');
 const [rows,setRows]=useState<WeeklyUser[]>([]),[loading,setLoading]=useState(true),[error,setError]=useState(''),[retry,setRetry]=useState(0);
 useEffect(()=>{const controller=new AbortController();setLoading(true);setError('');api<WeeklyUser[]>(`/home/ranking?period=${period}&mode=${mode}`,{signal:controller.signal}).then(data=>{if(!controller.signal.aborted)setRows(data);}).catch(()=>{if(!controller.signal.aborted)setError('Не удалось загрузить рейтинг.');}).finally(()=>{if(!controller.signal.aborted)setLoading(false);});return()=>controller.abort();},[period,mode,retry]);
 return <div><div className="form-grid" style={{margin:'20px 0'}}><label>Период<select value={period} onChange={e=>setPeriod(e.target.value)}><option value="week">За неделю</option><option value="month">За месяц</option><option value="all">За всё время</option></select></label><label>Показатель<select value={mode} onChange={e=>setMode(e.target.value)}><option value="activity">Сообщения</option><option value="likes">Симпатии</option></select></label></div><div aria-live="polite" aria-busy={loading}>{loading?<p role="status">Загружаем рейтинг…</p>:error?<p role="alert">{error} <button type="button" onClick={()=>setRetry(v=>v+1)}>Повторить</button></p>:rows.length?<ol style={{listStyle:'none',padding:0}}>{rows.map((person,index)=><li key={person.username} style={{display:'flex',gap:14,alignItems:'center',padding:'12px 0',borderBottom:'1px solid #43505a'}}><span style={{width:24}}>{index+1}</span><Link href={`/u/${person.username}`} style={{display:'flex',alignItems:'center',gap:12,flex:1,minWidth:0}}><Avatar name={person.displayName} url={person.avatarUrl}/><span style={{overflowWrap:'anywhere'}}>{person.displayName}</span></Link><strong>{mode==='likes'?person.reactionCount:person.topicCount+person.commentCount}</strong></li>)}</ol>:<p>За выбранный период пока нет активности.</p>}</div></div>;
}
