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
  return (
    <>
      <header data-forrum-shell="header" className="header">
        <div className="shell nav">
          <Link
            className="brand"
            href="/"
            aria-label="4RRUM"
          >
            <svg
              className="brand-symbol"
              viewBox="0 0 32 28"
              aria-hidden="true"
              focusable="false"
            >
              <path
                className="brand-symbol__back"
                d="M2 2.5h18.5v13H11L5.5 20v-4.5H2z"
              />
              <path
                className="brand-symbol__front"
                d="M10.5 8H30v13.5h-4.5V26L20 21.5h-9.5z"
              />
              <path
                className="brand-symbol__joint"
                d="M20.5 8v13.5M10.5 15.5h15"
              />
            </svg>
            <span className="brand-wordmark" aria-hidden="true">
              <strong>4</strong>RRUM
            </span>
          </Link>

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
