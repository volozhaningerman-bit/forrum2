 'use client';
import Link from 'next/link';
import { useRef } from 'react';
import { usePathname } from 'next/navigation';
export const mainLinks = [
 ['/', 'Главная'], ['/communities', 'Сообщества'], ['/applications', 'Приложения'],
 ['/digital-services', 'Сервисы'], ['/services', 'Услуги'],
] as const;
export function MainNav({ forum = false }: { forum?: boolean }) {
 const pathname = usePathname();
 const menu=useRef<HTMLDetailsElement>(null);
 if(forum) return <nav className="main-links forum-route-primary" aria-label="Основная навигация">{[['/','Главная'],['/communities','Форум'],['/users','Пользователи'],['/rules','Правила']].map(([href,label])=><Link key={href} href={href} aria-current={(href==='/'?pathname===href:pathname.startsWith(href))?'page':undefined}>{label}</Link>)}<details ref={menu} className="forum-route-more"><summary>Больше<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></summary><div>{mainLinks.slice(1).map(([href,label])=><Link href={href} key={href} onClick={()=>{if(menu.current)menu.current.open=false;}}>{label}</Link>)}</div></details></nav>;
 return <nav className="main-links" aria-label="Основная навигация">{mainLinks.map(([href,label]) =>
  <Link key={href} href={href} title={href === '/digital-services' ? 'Цифровые инструменты и сервисы' : href === '/services' ? 'Услуги специалистов' : undefined} aria-current={(href==='/' ? pathname===href : pathname.startsWith(href)) ? 'page' : undefined}>{label}</Link>
 )}</nav>;
}
