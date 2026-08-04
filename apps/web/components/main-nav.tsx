'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

type ActivityItem = { id: string; createdAt: string };

const links = [
  ['/', 'Главная'],
  ['/communities', 'Сообщества'],
  ['/media', 'Медиа'],
  ['/workshop', 'Мастерская'],
  ['/events', 'События'],
] as const;

const seenKey = 'forrum.events.seen-signature';

export function MainNav() {
  const pathname = usePathname();
  const [eventsUnread, setEventsUnread] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function checkEvents() {
      try {
        const [events, polls, announcements] = await Promise.all([
          api<ActivityItem[]>('/events'),
          api<ActivityItem[]>('/governance/polls'),
          api<ActivityItem[]>('/announcements'),
        ]);

        const signature = [...events, ...polls, ...announcements]
          .map((item) => `${item.id}:${item.createdAt}`)
          .sort()
          .join('|');

        if (cancelled || !signature) return;

        if (pathname.startsWith('/events')) {
          localStorage.setItem(seenKey, signature);
          setEventsUnread(false);
          return;
        }

        setEventsUnread(localStorage.getItem(seenKey) !== signature);
      } catch {
        if (!cancelled) setEventsUnread(false);
      }
    }

    void checkEvents();
    return () => { cancelled = true; };
  }, [pathname]);

  return <nav className="main-links" aria-label="Основная навигация">
    {links.map(([href, label]) => {
      const active = href === '/' ? pathname === '/' : pathname.startsWith(href);
      const showDot = href === '/events' && eventsUnread;

      return <Link key={href} href={href} className={active ? 'active' : ''} aria-current={active ? 'page' : undefined}>
        <span>{label}</span>
        {showDot && <span className="main-nav-unread" aria-label="Есть новые события и объявления"/>}
      </Link>;
    })}
  </nav>;
}
