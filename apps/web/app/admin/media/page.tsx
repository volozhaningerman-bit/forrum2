'use client';
import Link from 'next/link';
import {useQueue,QueueFrame} from '@/components/admin/queue';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

type Partner = { id: string; type: string; status: string; displayName: string; platform: string; channelUrl: string; audienceText: string | null; description: string; resolutionNote: string | null; user: { username: string; displayName: string } };

export default function AdminMediaPage() {
  const queue=useQueue<Partner>('partners'); const {items,error,setError,load}=queue; const [notes, setNotes] = useState<Record<string,string>>({});
  async function review(id:string,status:'ACTIVE'|'REJECTED'){ if(status==='REJECTED'&&(notes[id]??'').trim().length<3){setError('Объясните причину отклонения: от 3 символов');return;}try{await api(`/admin/media-partners/${id}/review`,{method:'POST',body:JSON.stringify({status,note:notes[id]||undefined})});await load();}catch(cause){setError(cause instanceof Error?cause.message:'Не удалось обработать заявку');}}
  return <div><div className="section-title"><div><span className="eyebrow">Партнёрство</span><h1>Заявки медиапартнёров</h1></div><Link className="button ghost" href="/admin">Обзор форума</Link></div><QueueFrame queue={queue}><div className="publication-list">{items.map((item)=><article className="card" key={item.id}><div className="publication-topline"><span className="type-label">{({BLOGGER:'Блогер',MEDIA:'Медиа',COMMUNITY:'Сообщество'} as Record<string,string>)[item.type]??'Партнёр'}</span><span className="type-label">{({REVIEW:'На проверке',ACTIVE:'Одобрено',REJECTED:'Отклонено'} as Record<string,string>)[item.status]??item.status}</span></div><h2>{item.displayName}</h2><p>{item.platform} · <a className="text-link" href={item.channelUrl} target="_blank" rel="noreferrer">Открыть канал ↗</a></p><p>{item.description}</p><p className="muted">Автор заявки: @{item.user.username}{item.audienceText?` · ${item.audienceText}`:''}</p>{item.status==='REVIEW'&&<label>Комментарий<textarea maxLength={1000} value={notes[item.id]??''} onChange={(event)=>setNotes((current)=>({...current,[item.id]:event.target.value}))}/></label>}{item.resolutionNote&&<p>{item.resolutionNote}</p>}{item.status==='REVIEW'&&<div className="inline-actions"><button type="button" className="button" onClick={() => void queue.act(() => review(item.id,'ACTIVE'))}>Одобрить</button><button type="button" className="button danger" onClick={() => void queue.act(() => review(item.id,'REJECTED'))}>Отклонить</button></div>}</article>)}</div></QueueFrame></div>;
}
