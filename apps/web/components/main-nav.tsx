'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

type ActivityItem = { id: string; createdAt: string };

// FORRUM_GLOBAL_HEADER_V13_4
const links = [
  ['/', 'Главная'],
  ['/communities', 'Сообщества'],
  ['/services', 'Услуги'],
  ['/media', 'Медиа'],
  ['/news', 'Новости'],
] as const;

const newsSeenKey = 'forrum.news.seen-signature';

function signature(items: ActivityItem[]) {
  return items
    .map((item) => `${item.id}:${item.createdAt}`)
    .sort()
    .join('|');
}

export function MainNav() {
  const pathname = usePathname();
  const [newsUnread, setNewsUnread] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function checkNews() {
      try {
        const items = await api<ActivityItem[]>('/news');
        const nextSignature = signature(items);

        if (cancelled) return;

        if (!nextSignature) {
          setNewsUnread(false);
          return;
        }

        if (pathname.startsWith('/news')) {
          localStorage.setItem(newsSeenKey, nextSignature);
          setNewsUnread(false);
          return;
        }

        setNewsUnread(
          localStorage.getItem(newsSeenKey) !== nextSignature,
        );
      } catch {
        if (!cancelled) setNewsUnread(false);
      }
    }

    void checkNews();

    return () => {
      cancelled = true;
    };
  }, [pathname]);

  return (
    <nav className="main-links" aria-label="Основная навигация">
      {links.map(([href, label]) => {
        const active = href === '/'
          ? pathname === '/'
          : pathname.startsWith(href);
        const showDot = href === '/news' && newsUnread;

        return (
          <Link
            key={href}
            href={href}
            className={active ? 'active' : ''}
            aria-current={active ? 'page' : undefined}
          >
            <span>{label}</span>
            {showDot && (
              <span
                className="main-nav-unread"
                aria-label="Есть новые материалы в Новостях"
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
