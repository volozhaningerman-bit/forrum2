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
              viewBox="0 0 34 30"
              aria-hidden="true"
              focusable="false"
            >
              <path
                className="brand-symbol__back"
                d="M2.5 3.5h19v14h-11l-5 4.5v-4.5h-3z"
              />
              <path
                className="brand-symbol__front"
                d="M12.5 9.5h19v14h-4v4l-5-4h-10z"
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
