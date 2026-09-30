'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { HeaderSearch } from './header-search';
import { AuthActions } from './auth-actions';
import {
  GridIcon,
  HomeIcon,
  MessageIcon,
  PlusIcon,
  SearchIcon,
} from './icons';
import { NavCounters } from './nav-counters';
import { MainNav } from './main-nav';
export function SiteHeader() {
  const pathname = usePathname();
  if (pathname === '/' || pathname === '/preview/home') return null;
  return (
    <>
      <header data-forrum-shell="header" className="header">
        <div className="shell nav">
          <Link className="reference-site-brand" href="/" aria-label="4rrum — главная"><img src="/forrum-assets/brand-4rrum.svg" alt="" width="160" height="45"/></Link>

          <MainNav />

          <span className="grow" />

          <HeaderSearch />

          <nav
            className="icon-links"
            aria-label="Быстрые действия"
          >
            <NavCounters />
          </nav>

          <AuthActions />
        </div>
      </header>

      <nav
        className="mobile-nav"
        aria-label="Навигация на телефоне"
      >
        <Link href="/" aria-current={pathname === '/' ? 'page' : undefined}>
          <HomeIcon />
          <span>Главная</span>
        </Link>
        <Link href="/communities" aria-current={pathname.startsWith('/communities') ? 'page' : undefined}>
          <GridIcon />
          <span>Сообщества</span>
        </Link>
        <Link className="mobile-create" href="/create" aria-current={pathname === '/create' ? 'page' : undefined}>
          <PlusIcon />
          <span>Создать</span>
        </Link>
        <Link href="/search" aria-current={pathname === '/search' ? 'page' : undefined}>
          <SearchIcon />
          <span>Поиск</span>
        </Link>
        <Link href="/messages" aria-current={pathname.startsWith('/messages') ? 'page' : undefined}>
          <MessageIcon />
          <span>Сообщения</span>
        </Link>
      </nav>
    </>
  );
}
