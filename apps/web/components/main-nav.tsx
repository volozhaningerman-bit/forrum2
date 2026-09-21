 'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
export const mainLinks = [
 ['/', 'Главная'], ['/communities', 'Сообщества'], ['/applications', 'Приложения'],
 ['/digital-services', 'Сервисы'], ['/services', 'Услуги'],
] as const;
export function MainNav() {
 const pathname = usePathname();
 return <nav className="main-links" aria-label="Основная навигация">{mainLinks.map(([href,label]) =>
  <Link key={href} href={href} title={href === '/digital-services' ? 'Цифровые инструменты и сервисы' : href === '/services' ? 'Услуги специалистов' : undefined} aria-current={(href==='/' ? pathname===href : pathname.startsWith(href)) ? 'page' : undefined}>{label}</Link>
 )}</nav>;
}
