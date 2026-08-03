'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  ['/', 'Главная'],
  ['/communities', 'Сообщества'],
  ['/news', 'Новости'],
  ['/workshop', 'Мастерская'],
  ['/events', 'События'],
] as const;

export function MainNav() {
  const pathname = usePathname();
  return <nav className="main-links" aria-label="Основная навигация">{links.map(([href, label]) => {
    const active = href === '/' ? pathname === '/' : pathname.startsWith(href);
    return <Link key={href} href={href} className={active ? 'active' : ''} aria-current={active ? 'page' : undefined}>{label}</Link>;
  })}</nav>;
}
