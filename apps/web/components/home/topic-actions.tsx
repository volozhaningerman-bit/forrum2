'use client';
import { useEffect, useId, useRef, useState } from 'react';
import { api } from '@/lib/api';
import type { PublicationCardData } from '@/lib/types';

function postedAt(value:string,now:number|null){
 const date=new Date(value);
 if(!Number.isFinite(date.getTime()))return 'Дата неизвестна';
 if(now===null)return date.toLocaleDateString('ru-RU',{day:'numeric',month:'short',timeZone:'UTC'});
 const minutes=Math.max(0,Math.floor((now-date.getTime())/60000));
 if(minutes<1)return 'только что';
 if(minutes<60)return `${minutes} мин назад`;
 if(minutes<1440)return `${Math.floor(minutes/60)} ч назад`;
 if(minutes<10080)return new Intl.RelativeTimeFormat('ru',{numeric:'auto'}).format(-Math.floor(minutes/1440),'day');
 return date.toLocaleDateString('ru-RU',{day:'numeric',month:'short',year:date.getUTCFullYear()!==new Date(now).getUTCFullYear()?'numeric':undefined,timeZone:'UTC'});
}
export function TopicActions({item,demo}:{item:PublicationCardData;demo:boolean}){
 const [open,setOpen]=useState(false),[saved,setSaved]=useState(item.isBookmarked??false),[busy,setBusy]=useState(false),[notice,setNotice]=useState(''),[reason,setReason]=useState(''),[reportError,setReportError]=useState(''),[now,setNow]=useState<number|null>(null);
 const root=useRef<HTMLDivElement>(null),trigger=useRef<HTMLButtonElement>(null),dialog=useRef<HTMLDialogElement>(null);const id=useId();
 useEffect(()=>{setNow(Date.now());const timer=setInterval(()=>setNow(Date.now()),60000);return()=>clearInterval(timer);},[]);
 useEffect(()=>{if(!open)return;const outside=(event:PointerEvent)=>{if(!root.current?.contains(event.target as Node))setOpen(false);};const escape=(event:KeyboardEvent)=>{if(event.key==='Escape'){setOpen(false);trigger.current?.focus();}};document.addEventListener('pointerdown',outside);document.addEventListener('keydown',escape);return()=>{document.removeEventListener('pointerdown',outside);document.removeEventListener('keydown',escape);};},[open]);
 async function share(){setOpen(false);try{const url=new URL(`/p/${item.slug}`,location.origin).href;if(navigator.share)await navigator.share({title:item.title||'Тема 4rrum',url});else{await navigator.clipboard.writeText(url);setNotice('Ссылка скопирована');}}catch(error){if(!(error instanceof Error && error.name==='AbortError'))setNotice('Не удалось поделиться ссылкой. Откройте тему и скопируйте её адрес.');}}
 async function bookmark(){setBusy(true);setNotice('');try{const result=await api<{bookmarked:boolean}>(`/publications/${item.slug}/bookmark`,{method:'POST'});setSaved(result.bookmarked);setNotice(result.bookmarked?'Добавлено в избранное':'Убрано из избранного');setOpen(false);}catch(error){setNotice(error instanceof Error?error.message:'Не удалось сохранить');}finally{setBusy(false);}}
 async function report(event:React.FormEvent){event.preventDefault();if(reason.trim().length<5)return;setBusy(true);setReportError('');try{await api(`/publications/${item.slug}/report`,{method:'POST',body:JSON.stringify({reason:reason.trim()})});dialog.current?.close();setReason('');setNotice('Жалоба отправлена модераторам');trigger.current?.focus();}catch(error){setReportError(error instanceof Error?error.message:'Не удалось отправить жалобу');}finally{setBusy(false);}}
 return <><time className="forum-posted" dateTime={item.createdAt} title={new Date(item.createdAt).toLocaleString('ru-RU',{timeZone:'UTC'})+' UTC'}>{postedAt(item.createdAt,now)}</time><div className="forum-topic-actions" ref={root} onBlur={event=>{if(!event.currentTarget.contains(event.relatedTarget as Node))setOpen(false);}}>
  <button ref={trigger} type="button" className="forum-more-trigger" aria-label={`Действия с темой: ${item.title || 'Без заголовка'}`} aria-expanded={open} aria-controls={id} onClick={()=>{setNotice('');setOpen(!open);}}>⋮</button>
  {open && <div className="forum-actions-popover" id={id}><button type="button" onClick={()=>void share()}><span aria-hidden="true">↗</span><span>Поделиться</span></button><button type="button" disabled={busy||demo} onClick={()=>void bookmark()}><span aria-hidden="true">☆</span><span>{saved?'Убрать из избранного':'В избранное'}</span></button><button type="button" className="forum-report-action" disabled={demo} onClick={()=>{setOpen(false);setReportError('');dialog.current?.showModal();}}><span aria-hidden="true">⚑</span><span>Пожаловаться</span></button>{demo && <small>Действия с аккаунтом доступны на форуме.</small>}</div>}
  {notice && <div className="forum-action-notice" role="status"><span>{notice}</span><button type="button" aria-label="Закрыть сообщение" onClick={()=>setNotice('')}>×</button></div>}
  <dialog ref={dialog} className="forum-report-dialog" aria-labelledby={`${id}-title`} onClose={()=>trigger.current?.focus()}><form onSubmit={report}><h2 id={`${id}-title`}>Пожаловаться на тему</h2><p>{item.title}</p><label>Что нарушено?<textarea autoFocus required minLength={5} maxLength={1000} value={reason} onChange={e=>setReason(e.target.value)} placeholder="Опишите причину, чтобы модератор мог разобраться"/></label>{reportError && <p role="alert">{reportError}</p>}<div><button type="button" onClick={()=>dialog.current?.close()}>Отмена</button><button type="submit" disabled={busy||reason.trim().length<5}>{busy?'Отправляем…':'Отправить жалобу'}</button></div></form></dialog>
 </div></>;
}
