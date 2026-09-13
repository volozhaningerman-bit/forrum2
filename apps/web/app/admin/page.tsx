'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Heading, Help, ErrorBox } from '@/components/admin/ui';
import Attention from '@/components/admin/attention';
type Dashboard = { users: number; verifiedUsers: number; communities: number; publications: number; comments: number; openReports: number };
export default function AdminPage() {
  const [data, setData] = useState<Dashboard | null>(null), [error, setError] = useState('');
  const [backup, setBackup] = useState<{ state: string; lastBackup: string | null } | null>(null);
  const [backupError, setBackupError] = useState(false);
  const load = () => { setError('');setBackupError(false); api<Dashboard>('/admin/dashboard').then(setData).catch(e => setError(e.message)); api<{ state: string; lastBackup: string | null }>('/admin/backups/status').then(setBackup).catch(() => setBackupError(true)); };
  useEffect(load, []);
  return <><Heading title="Обзор форума" description="Главное о сообществе и быстрый доступ к вашим задачам."><Link className="adm-primary" href="/admin/categories">Управлять категориями →</Link></Heading>
    <div className="adm-quick-grid">{[['/admin/home-banners', 'Баннеры главной', 'Изображения, ссылки и сроки показа'], ['/admin/users', 'Найти пользователя', 'Почта, подтверждение и роль'], ['/admin/analytics', 'Посмотреть рост', 'Регистрации и активность по дням']].map(([href, title, desc]) => <Link className="adm-panel adm-quick" href={href} key={href}><span>{title}<b aria-hidden="true">↗</b></span><small>{desc}</small></Link>)}</div>
    <ErrorBox error={error} retry={load}/>{!data && !error && <p role="status">Загружаем обзор…</p>}{data && <div className="adm-overview-stats">{[['Пользователи', data.users, '/admin/users'], ['Категории', data.communities, '/admin/categories'], ['Публикации', data.publications, '/admin/publications'], ['Ответы', data.comments, '/admin/analytics']].map(([label, value, href]) => <Link href={String(href)} className="adm-panel" key={label}><span>{label}</span><strong>{Number(value).toLocaleString('ru-RU')}</strong><small>Всего на форуме</small></Link>)}</div>}
    <div className="adm-panel adm-attention"><div><span className="adm-status-dot"/><strong>Состояние сервисов</strong><Help label="Состояние сервисов">Здесь показана доступность сведений о резервных копиях. Это не проверка всей инфраструктуры.</Help></div><Link href="/admin/settings">Проверить почту и Telegram →</Link><Link href="/admin/system">{backupError ? 'Не удалось получить статус копий' : backup?.state === 'ok' ? 'Резервирование: статус «работает»' : 'Проверить резервные копии'} →</Link></div>
    <Attention/><Link className="adm-secondary" href="/admin/analytics">Открыть графики роста и активности →</Link>
  </>;
}
