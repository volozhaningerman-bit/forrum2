'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  ['/portfolio', 'Проекты и услуги'],
  ['/subscriptions', 'Авторы и хэштеги'],
  ['/saved', 'Сохранённые материалы'],
  ['/activity', 'История действий'],
  ['/settings/interests', 'Сообщества и лента'],
  ['/settings', 'Настройки аккаунта'],
] as const;

export function PersonalLinks() {
  const pathname = usePathname();
  return <div className="card settings-links"><h3>Мой FORRUM</h3>{links.map(([href, label]) => {
    const active = pathname === href || (href !== '/settings' && pathname.startsWith(`${href}/`));
    return <Link key={href} className={active ? 'active' : ''} aria-current={active ? 'page' : undefined} href={href}>{label}</Link>;
  })}</div>;
}
