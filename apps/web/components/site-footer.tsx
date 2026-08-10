"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function SiteFooter() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const hideFooter = pathname === '/communities';
  if (hideFooter) return null;


  return (
    <footer className={`site-footer ${isHome ? 'site-footer-home' : ''}`}>
      <div className="site-footer-inner">
        <span className="site-footer-copy">
          © FORRUM, {new Date().getFullYear()}
        </span>

        <nav className="site-footer-nav" aria-label="Ссылки в подвале">
          <Link href="/rules">Правила</Link>
          <Link href="/#propose-section">Предложить раздел</Link>
          <Link href="/#become-curator">Стать куратором</Link>
          <Link href="/support">Поддержка</Link>
        </nav>
      </div>
    </footer>
  );
}
