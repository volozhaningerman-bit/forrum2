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
          <Link className="reference-site-brand" href="/" aria-label="FORRUM">FORRUM</Link>

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
        <Link href="/">
          <HomeIcon />
          <span>Главная</span>
        </Link>
        <Link href="/communities">
          <GridIcon />
          <span>Сообщества</span>
        </Link>
        <Link className="mobile-create" href="/create">
          <PlusIcon />
          <span>Создать</span>
        </Link>
        <Link href="/search">
          <SearchIcon />
          <span>Поиск</span>
        </Link>
        <Link href="/messages">
          <MessageIcon />
          <span>Сообщения</span>
        </Link>
      </nav>
    </>
  );
}
