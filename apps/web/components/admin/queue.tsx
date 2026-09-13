'use client';
import {useEffect,useState,useRef,type ReactNode} from 'react';
import {api} from '@/lib/api';
import {ErrorBox} from './ui';
export function useQueue<T>(kind:string){
 const [items,setItems]=useState<T[]>([]),[error,setError]=useState(''),[loadError,setLoadError]=useState(false),[loading,setLoading]=useState(true),[busy,setBusy]=useState(false),[page,setPage]=useState(1),[state,setState]=useState('pending'),[query,setQuery]=useState(''),[q,setQ]=useState(''),[total,setTotal]=useState(0),[ready,setReady]=useState(false);const lock=useRef(false),seq=useRef(0);
 useEffect(()=>{try{const v=JSON.parse(sessionStorage.getItem('admin-queue-'+kind)||'null');if(v){setPage(v.page||1);setState(v.state||'pending');setQ(v.q||'');setQuery(v.q||'');}}catch{}setReady(true);},[kind]);
 async function load(){const id=++seq.current;setLoading(true);setLoadError(false);setError('');try{const d=await api<{items:T[];total:number}>(`/admin/workspace/queue/${kind}?page=${page}&state=${state}&q=${encodeURIComponent(q)}`);if(id===seq.current){setItems(d.items);setTotal(d.total);}}catch(e){if(id===seq.current){setLoadError(true);setError(e instanceof Error?e.message:'Не удалось загрузить очередь');}}finally{if(id===seq.current)setLoading(false);}}
 useEffect(()=>{if(ready){sessionStorage.setItem('admin-queue-'+kind,JSON.stringify({page,state,q}));void load();}return()=>{seq.current++;};},[page,state,q,ready,kind]);
 async function act(fn:()=>Promise<void>){if(lock.current)return;lock.current=true;setBusy(true);try{await fn();}finally{lock.current=false;setBusy(false);}}
 return {items,loadError,error,setError,loading,busy,page,setPage,state,setState,query,setQuery,q,setQ,total,load,act};
}
export function QueueFrame<T>({queue,children}:{queue:ReturnType<typeof useQueue<T>>;children:ReactNode}){
 const v=queue;
 return <><form className="adm-filters" onSubmit={e=>{e.preventDefault();v.setPage(1);v.setQ(v.query.trim());}}><label>Показать<select value={v.state} onChange={e=>{v.setPage(1);v.setState(e.target.value);}}><option value="pending">Ожидают решения</option><option value="done">Обработанные</option><option value="all">Все</option></select></label><label>Поиск<input maxLength={100} value={v.query} onChange={e=>v.setQuery(e.target.value)} placeholder="Текст или название"/></label><button className="adm-primary">Найти</button><button type="button" className="adm-secondary" onClick={()=>void v.load()}>Обновить</button></form><ErrorBox error={v.error} retry={()=>void v.load()}/>{v.loading?<div className="adm-empty" role="status">Загружаем обращения…</div>:!v.loadError&&<><p className="adm-muted">Найдено: {v.total}</p><fieldset disabled={v.busy}>{children}</fieldset>{!v.items.length&&<div className="adm-empty">Обращений по выбранным условиям нет.</div>}<div className="adm-pagination"><button disabled={v.page<=1||v.busy} onClick={()=>v.setPage(v.page-1)}>Назад</button><span>Страница {v.page} из {Math.max(1,Math.ceil(v.total/25))}</span><button disabled={v.page*25>=v.total||v.busy} onClick={()=>v.setPage(v.page+1)}>Далее</button></div></>}{v.busy&&<p role="status">Сохраняем решение…</p>}</>;
}
