'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { BellIcon, MessageIcon } from './icons';

export function NavCounters() {
  const [notifications, setNotifications] = useState(0);
  const [messages, setMessages] = useState(0);
  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const [notificationData, messageData] = await Promise.all([
          api<{ count: number }>('/notifications/unread-count'),
          api<{ count: number }>('/messages/unread-count'),
        ]);
        if (active) { setNotifications(notificationData.count); setMessages(messageData.count); }
      } catch { if (active) { setNotifications(0); setMessages(0); } }
    }
    void load();
    const timer = window.setInterval(load, 45_000);
    return () => { active = false; window.clearInterval(timer); };
  }, []);
  const badge = (count: number) => count > 99 ? '99+' : String(count);
  return <>
    <Link className="icon-with-badge" aria-label="Уведомления" title="Уведомления" href="/notifications"><BellIcon/>{notifications > 0 && <span className="nav-badge">{badge(notifications)}</span>}</Link>
    <Link className="icon-with-badge" aria-label="Личные сообщения" title="Личные сообщения" href="/messages"><MessageIcon/>{messages > 0 && <span className="nav-badge">{badge(messages)}</span>}</Link>
  </>;
}
