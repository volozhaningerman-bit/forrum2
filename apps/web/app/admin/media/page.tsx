'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

type Partner = { id: string; type: string; status: string; displayName: string; platform: string; channelUrl: string; audienceText: string | null; description: string; resolutionNote: string | null; user: { username: string; displayName: string } };

export default function AdminMediaPage() {
  const [items, setItems] = useState<Partner[]>([]); const [error, setError] = useState(''); const [notes, setNotes] = useState<Record<string,string>>({});
  async function load(){ try{ setItems(await api<Partner[]>('/admin/media-partners')); setError(''); }catch(cause){ setError(cause instanceof Error ? cause.message : 'Не удалось загрузить заявки'); } }
  useEffect(()=>{void load();},[]);
  async function review(id:string,status:'ACTIVE'|'REJECTED'){ try{await api(`/admin/media-partners/${id}/review`,{method:'POST',body:JSON.stringify({status,note:notes[id]||undefined})});await load();}catch(cause){setError(cause instanceof Error?cause.message:'Не удалось обработать заявку');}}
  return <div><div className="section-title"><div><span className="eyebrow">Медиа</span><h1>Заявки медиапартнёров</h1></div><Link className="button ghost" href="/admin">Control Center</Link></div>{error&&<div className="error-box">{error}</div>}<div className="publication-list">{items.map((item)=><article className="card" key={item.id}><div className="publication-topline"><span className="type-label">{item.type}</span><span className="type-label">{item.status}</span></div><h2>{item.displayName}</h2><p>{item.platform} · <a className="text-link" href={item.channelUrl} target="_blank" rel="noreferrer">Открыть канал ↗</a></p><p>{item.description}</p><p className="muted">Автор заявки: @{item.user.username}{item.audienceText?` · ${item.audienceText}`:''}</p><label>Комментарий<textarea value={notes[item.id]??''} onChange={(event)=>setNotes((current)=>({...current,[item.id]:event.target.value}))}/></label>{item.status==='REVIEW'&&<div className="inline-actions"><button type="button" className="button" onClick={()=>review(item.id,'ACTIVE')}>Одобрить</button><button type="button" className="button danger" onClick={()=>review(item.id,'REJECTED')}>Отклонить</button></div>}</article>)}</div></div>;
}
