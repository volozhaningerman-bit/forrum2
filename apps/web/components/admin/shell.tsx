'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, type ReactNode } from 'react';
const groups = [
  { title: 'Обзор', items: [['/admin', 'Обзор форума', '◫'], ['/admin/analytics', 'Аналитика', '↗']] },
  { title: 'Содержание', items: [['/admin/home-banners', 'Баннеры главной', '▤'], ['/admin/categories', 'Категории', '▦'], ['/admin/publications', 'Публикации', '▧'], ['/admin/media', 'Медиа', '▷'], ['/admin/workshop', 'Мастерская', '◇']] },
  { title: 'Сообщество', items: [['/admin/users', 'Пользователи', '♙'], ['/admin/roles', 'Роли в категориях', '♧'], ['/admin/reports', 'Жалобы', '⚑'], ['/admin/moderation', 'Апелляции', '↩'], ['/admin/reviews', 'Отзывы', '☆'], ['/admin/governance', 'Голосования', '☑']] },
  { title: 'Настройки', items: [['/admin/promotion', 'Продвижение и баллы', '↟'], ['/admin/settings', 'Почта и Telegram', '⚙'], ['/admin/system', 'Резервные копии', '▣']] },
];
export function AdminShell({ children }: { children: ReactNode }) {
  const path = usePathname();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const active = (href: string) => path === href || (href === '/admin/categories' && ['/admin/ai-taxonomy', '/admin/categories/new'].includes(path));
  return <div className="adm-shell"><aside className="adm-sidebar"><div className="adm-brand"><Link href="/admin">F<span>FORRUM<small>Панель управления</small></span></Link><button className="adm-menu-toggle" aria-expanded={open} aria-controls="admin-navigation" onClick={() => setOpen(v => !v)}>Меню</button></div>
    <nav id="admin-navigation" className={open ? 'is-open' : ''} aria-label="Управление форумом"><label className="adm-nav-search"><span className="sr-only">Найти раздел админки</span><input placeholder="Найти раздел…" value={query} onChange={e => setQuery(e.target.value)}/></label>{groups.map(group => { const items = group.items.filter(([, title]) => title.toLocaleLowerCase().includes(query.toLocaleLowerCase())); return items.length ? <div className="adm-nav-group" key={group.title}><p>{group.title}</p>{items.map(([href, title, icon]) => <Link key={href} href={href} aria-current={active(href) ? 'page' : undefined} onClick={() => setOpen(false)}><span aria-hidden="true">{icon}</span>{title}</Link>)}</div> : null; })}{!groups.some(g => g.items.some(([, title]) => title.toLocaleLowerCase().includes(query.toLocaleLowerCase()))) && <p>Раздел не найден.</p>}<Link className="adm-back" href="/">← Открыть форум</Link></nav>
  </aside><div className="adm-content">{children}<footer className="adm-footer">FORRUM · Управление сообществом <span>Подсказки доступны по кнопке «?»</span></footer></div></div>;
}
