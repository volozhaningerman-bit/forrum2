'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

type ActivityItem = { id: string; createdAt: string };

const legacyLinks = [
  ['/', 'Главная'],
  ['/communities', 'Сообщества'],
  ['/media', 'Медиа'],
  ['/workshop', 'Мастерская'],
  ['/events', 'События'],
] as const;

const homeLinks = [
  ['/', 'Главная'],
  ['/communities', 'Сообщества'],
  ['/news', 'Новости'],
  ['/media', 'Медиа'],
  ['/events', 'События'],
] as const;

const eventsSeenKey = 'forrum.events.seen-signature';
const newsSeenKey = 'forrum.news.seen-signature';

function signature(items: ActivityItem[]) {
  return items
    .map((item) => `${item.id}:${item.createdAt}`)
    .sort()
    .join('|');
}

export function MainNav() {
  const pathname = usePathname();
  const [eventsUnread, setEventsUnread] = useState(false);
  const [newsUnread, setNewsUnread] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function checkEvents() {
      try {
        const [events, polls, announcements] = await Promise.all([
          api<ActivityItem[]>('/events'),
          api<ActivityItem[]>('/governance/polls'),
          api<ActivityItem[]>('/announcements'),
        ]);
        const nextSignature = signature([
          ...events,
          ...polls,
          ...announcements,
        ]);

        if (cancelled || !nextSignature) return;

        if (pathname.startsWith('/events')) {
          localStorage.setItem(eventsSeenKey, nextSignature);
          setEventsUnread(false);
          return;
        }
        setEventsUnread(
          localStorage.getItem(eventsSeenKey) !== nextSignature,
        );
      } catch {
        if (!cancelled) setEventsUnread(false);
      }
    }

    void checkEvents();
    return () => {
      cancelled = true;
    };
  }, [pathname]);

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

  const onHome = pathname === '/';
  const onCommunities = pathname === '/communities';
  const useApprovedNav = onHome || onCommunities;
  const links = useApprovedNav ? homeLinks : legacyLinks;

  return (
    <nav className="main-links" aria-label="Основная навигация">
      {links.map(([href, label]) => {
        const active = href === '/'
          ? pathname === '/'
          : pathname.startsWith(href);
        const showDot = useApprovedNav
          ? href === '/news' && newsUnread
          : href === '/events' && eventsUnread;

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
                aria-label={
                  href === '/news'
                    ? 'Есть новые материалы в Новостях'
                    : 'Есть новые события и объявления'
                }
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
