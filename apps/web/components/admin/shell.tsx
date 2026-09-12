'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, type ReactNode } from 'react';
const groups = [
 ['Обзор','/admin',[]],
 ['Контент','/admin/categories',[['/admin/categories','Категории'],['/admin/publications','Публикации'],['/admin/governance','Предложения категорий']]],
 ['Пользователи','/admin/users',[['/admin/users','Все пользователи'],['/admin/roles','Команда и права']]],
 ['Модерация','/admin/reports',[['/admin/reports','Жалобы'],['/admin/moderation','Апелляции'],['/admin/reviews','Отзывы'],['/admin/workshop','Работы мастерской'],['/admin/media','Заявки партнёров']]],
 ['Оформление','/admin/home-banners',[['/admin/home-banners','Баннеры главной'],['/admin/images','Изображения']]],
 ['Продвижение','/admin/promotion',[['/admin/promotion','Тарифы и заказы'],['/admin/balance','Баллы и операции']]],
 ['Аналитика','/admin/analytics',[]],
 ['Настройки','/admin/settings',[['/admin/settings','Подключения'],['/admin/system','Резервные копии'],['/admin/activity','Журнал действий']]],
] as const;
const paths=['M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z','M4 4h16v16H4z M8 9h8 M8 14h6','M16 21v-3a4 4 0 0 0-8 0v3 M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8','M12 3l8 3v6c0 5-8 9-8 9s-8-4-8-9V6z','M3 4h18v16H3z M3 17l6-7 5 5 3-3 4 5','M3 17l6-6 4 3 8-10 M15 4h6v6','M4 20V10 M12 20V4 M20 20v-8','M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8 M12 2v3 M12 19v3 M2 12h3 M19 12h3 M5 5l2 2 M17 17l2 2 M5 19l2-2 M17 7l2-2'];
export function AdminShell({children}:{children:ReactNode}){
 const path=usePathname(),[query,setQuery]=useState(''),[open,setOpen]=useState(false);
 const match=(href:string)=>path===href || (href==='/admin/categories' && (path.startsWith('/admin/categories/')||path==='/admin/ai-taxonomy')) || (href==='/admin/users' && path.startsWith('/admin/users/'));
 const current=groups.find(([,href,items])=>match(href)||items.some(([h])=>match(h)));
 return <div className="adm-shell"><aside className="adm-sidebar"><div className="adm-brand"><Link href="/admin">F<span>FORRUM<small>Панель управления</small></span></Link><button className="adm-menu-toggle" aria-expanded={open} aria-controls="admin-navigation" onClick={()=>setOpen(!open)}>Меню</button></div><nav id="admin-navigation" className={open?'is-open':''} aria-label="Управление форумом"><label className="adm-nav-search"><span className="sr-only">Найти раздел</span><input placeholder="Найти раздел…" value={query} onChange={e=>setQuery(e.target.value)}/></label>{groups.map(([title,href,items],i)=>{const found=title.toLowerCase().includes(query.toLowerCase()),filtered=items.filter(([,t])=>t.toLowerCase().includes(query.toLowerCase()));if(query&&!found&&!filtered.length)return null;const expanded=current?.[0]===title||!!query;return <div className="adm-nav-group" key={title}><Link href={href} onClick={()=>setOpen(false)} aria-current={match(href)?'page':undefined}><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d={paths[i]}/></svg>{title}</Link>{expanded&&<div className="adm-subnav">{(query&&!found?filtered:items).map(([h,t])=><Link key={h} href={h} onClick={()=>setOpen(false)} aria-current={match(h)?'page':undefined}>{t}</Link>)}</div>}</div>;})}{query&&!groups.some(([t,,items])=>t.toLowerCase().includes(query.toLowerCase())||items.some(([,t])=>t.toLowerCase().includes(query.toLowerCase())))&&<p>Раздел не найден.</p>}<Link className="adm-back" href="/">Открыть форум ↗</Link></nav></aside><div className="adm-content"><div className="adm-breadcrumb">Панель управления / {current?.[0]??'Раздел'}</div>{children}<footer className="adm-footer">FORRUM · Панель управления<span>Подсказки — по кнопке «?»</span></footer></div></div>;
}
