'use client';

import Link from 'next/link';
import type { FormEvent } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { api } from '@/lib/api';
import { formatRelativeTime } from '@/lib/format';

type Dashboard = { users: number; verifiedUsers: number; communities: number; publications: number; comments: number; openReports: number; messages: number };
type PromotionSettings = { pinLimit: number; pinBasePricePerDay: number; pinDemandPercentPerOccupied: number; boostLimit: number; boostBasePricePerDay: number; boostDemandPercentPerOccupied: number };
type PromotionOrder = { id: string; type: 'PIN' | 'BOOST'; status: string; price: number; startsAt: string; endsAt: string; cancellationReason: string | null; user: { username: string; displayName: string }; publication: { slug: string; title: string | null }; community: { slug: string; name: string } };
type Report = { id: string; reason: string; details: string | null; status: string; createdAt: string; author: { username: string; displayName: string }; publication: { slug: string; title: string | null; body: string; status: string; author: { username: string; displayName: string } } | null; comment: { id: string; body: string; hiddenAt: string | null; author: { username: string; displayName: string } } | null };
type BackupStatus = { state: string; message: string; updatedAt: string | null; lastBackup: string | null; intervalHours?: number; retentionCount?: number };
type CommunityRole = { id: string; role: string; note: string | null; endedAt: string | null; createdAt: string; user: { username: string; displayName: string; avatarUrl: string | null }; community: { slug: string; name: string }; grantedBy: { username: string; displayName: string } | null };
type CommunityOption = { slug: string; name: string; children?: CommunityOption[] };
type FlatCommunityOption = { slug: string; label: string };
type Tab = 'overview' | 'communities' | 'roles' | 'promotion' | 'moderation' | 'system';

const reportStatus: Record<string, string> = { OPEN: 'Открыта', RESOLVED: 'Решена', REJECTED: 'Отклонена' };
const communityRoleNames: Record<string, string> = { CURATOR: 'Куратор', ASSISTANT: 'Помощник', MODERATOR: 'Модератор' };
const promotionStatusNames: Record<string, string> = { ACTIVE: 'Действует', EXPIRED: 'Завершено', CANCELLED: 'Остановлено', REFUNDED: 'Возвращено' };

function flattenCommunityOptions(items: CommunityOption[], depth = 0): FlatCommunityOption[] {
  return items.flatMap((item) => [
    { slug: item.slug, label: `${depth ? `${'↳ '.repeat(depth)}` : ''}${item.name}` },
    ...flattenCommunityOptions(item.children ?? [], depth + 1),
  ]);
}

export default function AdminPage() {
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [promotion, setPromotion] = useState<PromotionSettings | null>(null);
  const [promotionOrders, setPromotionOrders] = useState<PromotionOrder[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [backup, setBackup] = useState<BackupStatus | null>(null);
  const [communityRoles, setCommunityRoles] = useState<CommunityRole[]>([]);
  const [communityOptions, setCommunityOptions] = useState<CommunityOption[]>([]);
  const [tab, setTab] = useState<Tab>('overview');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [hideReasons, setHideReasons] = useState<Record<string, string>>({});
  const [expandedReport, setExpandedReport] = useState<string | null>(null);
  const [endingRoleId, setEndingRoleId] = useState<string | null>(null);
  const [roleEndNotes, setRoleEndNotes] = useState<Record<string, string>>({});
  const [refundNotes, setRefundNotes] = useState<Record<string, string>>({});

  const load = async () => {
    try {
      setError('');
      const [dashboardData, reportsData, promotionData, promotionOrdersData, backupData, rolesData, communitiesData] = await Promise.all([
        api<Dashboard>('/admin/dashboard'), api<Report[]>('/admin/reports'),
        api<PromotionSettings>('/admin/promotion-settings'), api<PromotionOrder[]>('/admin/promotions'), api<BackupStatus>('/admin/backups/status'),
        api<CommunityRole[]>('/admin/community-roles'), api<CommunityOption[]>('/communities'),
      ]);
      setDashboard(dashboardData); setReports(reportsData); setPromotion(promotionData); setPromotionOrders(promotionOrdersData); setBackup(backupData); setCommunityRoles(rolesData); setCommunityOptions(communitiesData);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Не удалось загрузить Control Center');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { void load(); }, []);

  function showMessage(value: string) {
    setMessage(value);
    window.setTimeout(() => setMessage(''), 4500);
  }

  async function grant(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    try {
      setError('');
      await api('/admin/wallet/grant', { method: 'POST', body: JSON.stringify({ ...Object.fromEntries(form), amount: Number(form.get('amount')) }) });
      showMessage('Тестовые баллы начислены'); event.currentTarget.reset();
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Не удалось начислить баллы'); }
  }

  async function savePromotion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      setError('');
      const form = new FormData(event.currentTarget);
      const payload = Object.fromEntries([...form.entries()].map(([key, value]) => [key, Number(value)]));
      setPromotion(await api<PromotionSettings>('/admin/promotion-settings', { method: 'PUT', body: JSON.stringify(payload) }));
      showMessage('Настройки продвижения сохранены');
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Не удалось сохранить настройки'); }
  }

  async function refundPromotion(order: PromotionOrder) {
    const reason = refundNotes[order.id]?.trim();
    if (!reason || reason.length < 5) { setError('Укажите причину административного возврата'); return; }
    try {
      setError('');
      await api(`/admin/promotions/${order.id}/refund`, { method: 'POST', body: JSON.stringify({ reason }) });
      setRefundNotes((current) => ({ ...current, [order.id]: '' }));
      showMessage('Баллы возвращены, решение записано в журнал');
      await load();
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Не удалось выполнить возврат'); }
  }

  async function createCommunity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      setError('');
      await api('/communities', { method: 'POST', body: JSON.stringify(Object.fromEntries(new FormData(event.currentTarget))) });
      showMessage('Сообщество создано'); event.currentTarget.reset(); await load();
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Не удалось создать сообщество'); }
  }

  async function grantCommunityRole(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      setError('');
      await api('/admin/community-roles', { method: 'POST', body: JSON.stringify(Object.fromEntries(new FormData(event.currentTarget))) });
      showMessage('Роль назначена и записана в историю'); event.currentTarget.reset(); await load();
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Не удалось назначить роль'); }
  }

  async function endCommunityRole(role: CommunityRole) {
    const note = roleEndNotes[role.id]?.trim();
    if (!note || note.length < 5) { setError('Укажите понятную причину завершения роли'); return; }
    try {
      setError('');
      await api(`/admin/community-roles/${role.id}/end`, { method: 'POST', body: JSON.stringify({ note }) });
      setEndingRoleId(null);
      setRoleEndNotes((current) => ({ ...current, [role.id]: '' }));
      showMessage('Роль завершена, причина и история сохранены'); await load();
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Не удалось завершить роль'); }
  }

  async function resolve(id: string, status: 'RESOLVED' | 'REJECTED') {
    try {
      setError('');
      await api(`/admin/reports/${id}/resolve`, { method: 'POST', body: JSON.stringify({ status }) });
      showMessage(status === 'RESOLVED' ? 'Жалоба отмечена решённой' : 'Жалоба отклонена'); await load();
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Не удалось обработать жалобу'); }
  }

  async function hideComment(id: string) {
    const reason = hideReasons[id]?.trim();
    if (!reason) { setError('Укажите причину скрытия комментария'); return; }
    try {
      setError('');
      await api(`/admin/comments/${id}/hide`, { method: 'POST', body: JSON.stringify({ reason }) });
      setHideReasons((current) => ({ ...current, [id]: '' })); setExpandedReport(null);
      showMessage('Комментарий скрыт с указанной причиной'); await load();
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Не удалось скрыть комментарий'); }
  }

  const openReports = useMemo(() => reports.filter((report) => report.status === 'OPEN'), [reports]);
  const flatCommunityOptions = useMemo(() => flattenCommunityOptions(communityOptions), [communityOptions]);
  const stats = dashboard ? [
    ['Пользователи', dashboard.users, 'Все созданные аккаунты'],
    ['Подтверждены', dashboard.verifiedUsers, 'Могут публиковать и голосовать'],
    ['Сообщества', dashboard.communities, 'Активные категории и подразделы'],
    ['Публикации', dashboard.publications, 'Посты и постоянные темы'],
    ['Ответы', dashboard.comments, 'Комментарии пользователей'],
    ['Открытые жалобы', dashboard.openReports, 'Требуют внимания модератора'],
    ['Личные сообщения', dashboard.messages, 'Всего отправлено сообщений'],
  ] as const : [];

  const tabs: Array<{ key: Tab; label: string; count?: number }> = [
    { key: 'overview', label: 'Обзор' }, { key: 'communities', label: 'Сообщества' }, { key: 'roles', label: 'Роли' },
    { key: 'promotion', label: 'Продвижение' }, { key: 'moderation', label: 'Жалобы', count: openReports.length },
    { key: 'system', label: 'Система' },
  ];

  return <div className="control-center-page">
    <div className="control-center-hero">
      <div><span className="eyebrow">Управление платформой</span><h1>FORRUM Control Center</h1><p>Основные показатели, сообщества, продвижение, модерация и состояние резервных копий.</p></div>
      <div className="control-center-links"><Link href="/admin/governance">Голосования</Link><Link href="/admin/moderation">Апелляции</Link><Link href="/admin/workshop">Мастерская</Link></div>
    </div>

    {message && <div className="success-box" role="status">{message}</div>}
    {error && <div className="error-box" role="alert">{error}<button type="button" className="button ghost small" onClick={load}>Повторить</button></div>}

    <nav className="control-center-tabs" aria-label="Разделы Control Center">
      {tabs.map((item) => <button type="button" className={tab === item.key ? 'active' : ''} key={item.key} onClick={() => setTab(item.key)}>{item.label}{item.count ? <span>{item.count}</span> : null}</button>)}
    </nav>

    {loading && <div className="admin-loading-grid">{Array.from({ length: 6 }, (_, index) => <div className="skeleton tall" key={index}/>)}</div>}

    {!loading && tab === 'overview' && <>
      <section className="admin-stat-grid">
        {stats.map(([label, value, help]) => <article className="admin-metric-card" key={label}><span>{label}</span><strong>{value}</strong><small>{help}</small></article>)}
      </section>
      <div className="admin-overview-grid">
        <section className="card"><div className="compact-heading"><h2>Что требует внимания</h2><button type="button" className="text-button" onClick={() => setTab('moderation')}>Открыть жалобы</button></div>{openReports.length ? <div className="attention-list"><div><strong>{openReports.length}</strong><span>открытых жалоб</span></div><p>Проверьте причину, связанный материал и историю действий перед решением.</p></div> : <div className="compact-empty"><span>Новых жалоб нет</span><small>Очередь модерации пуста.</small></div>}</section>
        <section className="card"><div className="compact-heading"><h2>Резервные копии</h2><button type="button" className="text-button" onClick={() => setTab('system')}>Подробнее</button></div>{backup ? <><div className={`system-status status-${backup.state}`}><span/>{backup.state === 'ok' ? 'Автобэкап работает' : backup.state === 'running' ? 'Создаётся копия' : backup.state === 'error' ? 'Ошибка автобэкапа' : 'Ожидание первой копии'}</div><p className="muted">{backup.message}</p></> : <p className="muted">Нет данных о сервисе резервирования.</p>}</section>
      </div>
    </>}

    {!loading && tab === 'communities' && <div className="admin-content-grid">
      <section className="card admin-form-card"><span className="eyebrow">Новая категория</span><h2>Создать сообщество</h2><p className="muted">Создавайте только те разделы, для которых уже есть первые авторы и темы.</p><form onSubmit={createCommunity}><label>Название<input name="name" minLength={2} maxLength={60} placeholder="Например, Продвижение" required/></label><label>Описание<textarea name="description" minLength={20} maxLength={2000} placeholder="Для кого сообщество и что здесь обсуждают" required/></label><label>Короткое описание<input name="shortDescription" maxLength={180} placeholder="Одна строка для карточки"/></label><label>Адрес страницы <span className="field-hint">необязательно</span><input name="slug" pattern="[a-z0-9-]+" placeholder="promotion"/></label><label>Акцент сообщества<input name="accentColor" type="color" defaultValue="#3157d5"/></label><button className="button">Создать сообщество</button></form></section>
      <aside className="card admin-guidance"><h3>Перед созданием проверьте</h3><ol><li>Есть минимум несколько будущих тем.</li><li>Существующий раздел уже не подходит.</li><li>Есть человек, готовый следить за порядком.</li><li>Название понятно без дополнительного объяснения.</li></ol><Link className="button secondary" href="/communities/proposals">Предложения пользователей</Link></aside>
    </div>}

    {!loading && tab === 'roles' && <div className="admin-role-grid">
      <section className="card admin-form-card"><span className="eyebrow">Ответственность в сообществах</span><h2>Назначить роль</h2><p className="muted">Назначение фиксируется в истории профиля. Завершённая роль не отображается как действующая, но запись о ней сохраняется.</p><form onSubmit={grantCommunityRole}><label>Пользователь<input name="username" minLength={2} maxLength={40} placeholder="username" required/></label><label>Сообщество<select name="communitySlug" required><option value="">Выберите сообщество</option>{flatCommunityOptions.map((community) => <option value={community.slug} key={community.slug}>{community.label}</option>)}</select></label><label>Роль<select name="role" defaultValue="MODERATOR"><option value="CURATOR">Куратор</option><option value="ASSISTANT">Помощник</option><option value="MODERATOR">Модератор</option></select></label><label>Основание <span className="optional-label">необязательно</span><textarea name="note" maxLength={500} placeholder="За что назначен и какая зона ответственности"/></label><button className="button">Назначить роль</button></form></section>
      <section className="card"><div className="compact-heading"><div><span className="eyebrow">Текущие и прошлые</span><h2>История ролей</h2></div><span className="type-label">{communityRoles.filter((item) => !item.endedAt).length} действующих</span></div><div className="admin-role-list">{communityRoles.map((role) => <article className={`admin-role-card ${role.endedAt ? 'inactive' : ''}`} key={role.id}><div><strong>{communityRoleNames[role.role] ?? role.role} · {role.community.name}</strong><span>@{role.user.username} · {role.user.displayName}</span><small>{role.endedAt ? `Завершена ${new Date(role.endedAt).toLocaleDateString('ru-RU')}` : `Действует с ${new Date(role.createdAt).toLocaleDateString('ru-RU')}`}{role.note ? ` · ${role.note}` : ''}</small></div>{!role.endedAt && <div className="admin-role-actions">{endingRoleId === role.id ? <div className="inline-role-end-form"><label>Причина завершения<textarea value={roleEndNotes[role.id] ?? ''} onChange={(event) => setRoleEndNotes((current) => ({ ...current, [role.id]: event.target.value }))} minLength={5} maxLength={500} placeholder="Например, завершение срока или смена зоны ответственности"/></label><div><button type="button" className="button small danger" onClick={() => endCommunityRole(role)}>Сохранить завершение</button><button type="button" className="button ghost small" onClick={() => setEndingRoleId(null)}>Отмена</button></div></div> : <button type="button" className="button ghost small danger-text" onClick={() => setEndingRoleId(role.id)}>Завершить</button>}</div>}</article>)}{!communityRoles.length && <div className="empty-state"><strong>Ролей пока нет</strong><span>Назначения появятся здесь после сохранения.</span></div>}</div></section>
    </div>}

    {!loading && tab === 'promotion' && promotion && <div className="admin-promotion-layout">
      <section className="card admin-form-card promotion-settings-card">
        <span className="eyebrow">Коммерческие места</span><h2>Лимиты и динамическая цена</h2><p className="muted">Цена увеличивается только по заданной формуле. После заполнения лимита оплата сверх него невозможна.</p>
        <form onSubmit={savePromotion} className="promotion-form-grid">
          <fieldset><legend>Закрепления</legend><label>Доступно мест<input name="pinLimit" type="number" min="1" max="100" defaultValue={promotion.pinLimit}/></label><label>Базовая цена за день<input name="pinBasePricePerDay" type="number" min="1" defaultValue={promotion.pinBasePricePerDay}/></label><label>Рост за занятое место, %<input name="pinDemandPercentPerOccupied" type="number" min="0" max="500" defaultValue={promotion.pinDemandPercentPerOccupied}/></label></fieldset>
          <fieldset><legend>Boost</legend><label>Доступно мест<input name="boostLimit" type="number" min="1" max="1000" defaultValue={promotion.boostLimit}/></label><label>Базовая цена за день<input name="boostBasePricePerDay" type="number" min="1" defaultValue={promotion.boostBasePricePerDay}/></label><label>Рост за занятое место, %<input name="boostDemandPercentPerOccupied" type="number" min="0" max="500" defaultValue={promotion.boostDemandPercentPerOccupied}/></label></fieldset>
          <div className="form-wide-action"><button className="button">Сохранить настройки</button></div>
        </form>
      </section>
      <section className="card admin-promotion-orders"><div className="compact-heading"><div><span className="eyebrow">Контроль заказов</span><h2>Продвижения</h2></div><span className="type-label">{promotionOrders.filter((item) => item.status === 'ACTIVE').length} активных</span></div><p className="muted">Возврат применяется только для исправления ошибки или решения администрации. Причина обязательна и сохраняется в журнале.</p>
        <div className="admin-promotion-list">{promotionOrders.map((order) => <article key={order.id} className={`admin-promotion-order status-${order.status.toLowerCase()}`}><div><span className="type-label">{order.type === 'PIN' ? 'Закрепление' : 'Boost'} · {promotionStatusNames[order.status] ?? order.status}</span><h3><Link href={`/p/${order.publication.slug}`}>{order.publication.title || 'Публикация'}</Link></h3><p>@{order.user.username} · {order.community.name} · {order.price.toLocaleString('ru-RU')} баллов</p><small>{new Date(order.startsAt).toLocaleString('ru-RU')} — {new Date(order.endsAt).toLocaleString('ru-RU')}</small>{order.cancellationReason && <small>Причина: {order.cancellationReason}</small>}</div>{order.status !== 'REFUNDED' && <div className="admin-refund-form"><label>Причина возврата<textarea value={refundNotes[order.id] ?? ''} onChange={(event) => setRefundNotes((current) => ({ ...current, [order.id]: event.target.value }))} minLength={5} maxLength={500} placeholder="Например, ошибочное списание или техническая проблема"/></label><button type="button" className="button ghost small" onClick={() => refundPromotion(order)}>Вернуть баллы</button></div>}</article>)}{!promotionOrders.length && <div className="empty-state"><strong>Заказов пока нет</strong><span>После покупки продвижения оно появится здесь.</span></div>}</div>
      </section>
    </div>}

    {!loading && tab === 'moderation' && <section className="moderation-queue-modern">
      <div className="queue-summary"><div><strong>{openReports.length}</strong><span>ожидают решения</span></div><p>Сначала изучите материал и контекст. Скрытие и отклонение должны иметь понятное основание.</p></div>
      <div className="moderation-report-list">{reports.map((report) => <article className={`moderation-report-card status-${report.status.toLowerCase()}`} key={report.id}>
        <header><div><span className="type-label">{reportStatus[report.status] ?? report.status}</span><span className="muted">от @{report.author.username} · {formatRelativeTime(report.createdAt)}</span></div></header>
        <h3>{report.reason}</h3>{report.details && <p>{report.details}</p>}
        {report.publication && <div className="reported-content"><span>Публикация</span><Link href={`/p/${report.publication.slug}`}>{report.publication.title || report.publication.body.slice(0, 90)}</Link><small>Автор: @{report.publication.author.username}</small></div>}
        {report.comment && <div className="reported-content"><span>Комментарий</span><p>{report.comment.body.slice(0, 300)}</p><small>Автор: @{report.comment.author.username}</small></div>}
        {report.status === 'OPEN' && <div className="report-actions-modern">
          {report.comment && !report.comment.hiddenAt && <><button type="button" className="button ghost small danger-text" onClick={() => setExpandedReport(expandedReport === report.id ? null : report.id)}>Скрыть комментарий</button>{expandedReport === report.id && <div className="inline-moderation-form"><label>Причина скрытия<textarea value={hideReasons[report.comment.id] ?? ''} onChange={(event) => setHideReasons((current) => ({ ...current, [report.comment!.id]: event.target.value }))} minLength={5} maxLength={500} placeholder="Коротко объясните нарушение"/></label><button type="button" className="button small" onClick={() => hideComment(report.comment!.id)}>Подтвердить скрытие</button></div>}</>}
          <button type="button" className="button small" onClick={() => resolve(report.id, 'RESOLVED')}>Отметить решённой</button><button type="button" className="button ghost small" onClick={() => resolve(report.id, 'REJECTED')}>Отклонить жалобу</button>
        </div>}
      </article>)}{!reports.length && <div className="empty-state"><strong>Жалоб нет</strong><span>Очередь модерации пуста.</span></div>}</div>
    </section>}

    {!loading && tab === 'system' && <div className="admin-content-grid">
      <section className="card"><span className="eyebrow">Сохранность данных</span><h2>Автоматические резервные копии</h2>{backup ? <><div className={`system-status status-${backup.state}`}><span/>{backup.state === 'ok' ? 'Работает' : backup.state === 'running' ? 'Создаётся' : backup.state === 'error' ? 'Ошибка' : 'Ожидание'}</div><p><strong>{backup.message}</strong></p><dl className="system-detail-list"><div><dt>Последняя копия</dt><dd>{backup.lastBackup || 'ещё не создана'}</dd></div><div><dt>Обновление статуса</dt><dd>{backup.updatedAt ? formatRelativeTime(backup.updatedAt) : 'нет данных'}</dd></div><div><dt>Интервал</dt><dd>{backup.intervalHours ?? 12} часов</dd></div><div><dt>Хранится</dt><dd>{backup.retentionCount ?? 28} комплектов</dd></div></dl></> : <div className="empty-state"><strong>Нет данных</strong><span>Сервис резервного копирования ещё не сообщил статус.</span></div>}<p className="muted small-text">Расписание меняется через CONFIGURE_AUTO_BACKUP.bat. Восстановление выполняется через RESTORE_FORRUM.bat.</p></section>
      <aside className="card admin-form-card"><span className="eyebrow">Тестовая экономика</span><h2>Начислить баллы</h2><p className="muted">Используется только для проверки Boost, закреплений и будущей кастомизации.</p><form onSubmit={grant}><label>Имя пользователя<input name="username" placeholder="username" required/></label><label>Количество<input name="amount" type="number" min="1" max="10000000" required/></label><label>Причина<input name="description" minLength={3} maxLength={200} placeholder="Например, тестирование продвижения" required/></label><button className="button">Начислить баллы</button></form></aside>
    </div>}
  </div>;
}
