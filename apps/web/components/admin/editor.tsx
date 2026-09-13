'use client';
import {useEffect,useRef,type ReactNode} from 'react';
export function Editor({title,dirty,busy=false,onClose,children}:{title:string;dirty:boolean;busy?:boolean;onClose:()=>void;children:ReactNode}){
 const ref=useRef<HTMLDialogElement>(null);const close=()=>{if(!busy&&(!dirty||window.confirm('Есть несохранённые изменения. Закрыть без сохранения?')))onClose();};
 useEffect(()=>{const d=ref.current;const previous=document.activeElement as HTMLElement|null;d?.showModal();return()=>{d?.close();previous?.focus();};},[]);
 useEffect(()=>{const handler=(e:BeforeUnloadEvent)=>{if(dirty){e.preventDefault();e.returnValue='';}};window.addEventListener('beforeunload',handler);return()=>window.removeEventListener('beforeunload',handler);},[dirty]);
 return <dialog ref={ref} className="adm-dialog" aria-label={title} onCancel={e=>{e.preventDefault();close();}}><header><h2>{title}</h2><button type="button" className="adm-secondary" disabled={busy} onClick={close}>Закрыть</button></header>{dirty&&<p className="adm-muted">Есть несохранённые изменения</p>}{children}</dialog>;
}
