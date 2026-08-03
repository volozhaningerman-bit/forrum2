import Link from 'next/link';
import { AuthActions } from './auth-actions';
import { GridIcon, HomeIcon, MessageIcon, PlusIcon, SearchIcon } from './icons';
import { NavCounters } from './nav-counters';
import { MainNav } from './main-nav';

export function SiteHeader() {
  return <>
    <header className="header"><div className="shell nav">
      <Link className="brand" href="/"><span className="brand-mark">F</span><span>FORRUM</span></Link>
      <MainNav/>
      <span className="grow"/>
      <nav className="icon-links" aria-label="Быстрые действия">
        <Link aria-label="Поиск" title="Поиск" href="/search"><SearchIcon/></Link>
        <NavCounters/>
      </nav>
      <AuthActions/>
    </div></header>
    <nav className="mobile-nav" aria-label="Навигация на телефоне">
      <Link href="/"><HomeIcon/><span>Главная</span></Link><Link href="/communities"><GridIcon/><span>Сообщества</span></Link><Link className="mobile-create" href="/create"><PlusIcon/><span>Создать</span></Link><Link href="/search"><SearchIcon/><span>Поиск</span></Link><Link href="/messages"><MessageIcon/><span>Сообщения</span></Link>
    </nav>
  </>;
}
