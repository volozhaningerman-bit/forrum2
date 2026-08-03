'use client';

import Link from 'next/link';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { api } from '@/lib/api';
import { formatDateTime, formatRelativeTime } from '@/lib/format';
import { StatePanel } from '@/components/state-panel';

type Access = 'ADMIN' | 'CURATOR' | 'ASSISTANT' | 'MODERATOR';
type Dashboard = {
  access: Access;
  community: { id: string; slug: string; name: string; accentColor: string };
  health: { publications7: number; publications30: number; comments7: number; comments30: number; openReports: number; unansweredCount: number; averageFirstResponseHours: number | null; subscriberChange30: number };
  unanswered: Array<{ slug: string; excerpt: string; createdAt: string; author: { username: string; displayName: string } }>;
  publications: Array<{ slug: string; title: string; createdAt: string; lastActivityAt: string; pinnedUntil: string | null; isOfficial: boolean; isSolved: boolean; closedAt: string | null; author: { username: string; displayName: string }; commentCount: number; reactionCount: number; bookmarkCount: number }>;
  team: Array<{ id: string; role: string; user: { username: string; displayName: string; avatarUrl: string | null } }>;
  reports: Array<{ id: string; periodStart: string; periodEnd: string; summary: string; author: { username: string; displayName: string }; publication: { slug: string } | null }>;
  proposals: Array<{ id: string; type: string; status: string; title: string; description: string; proposedName: string | null; createdAt: string; createdBy: { username: string; displayName: string }; targetCommunity: { slug: string; name: string } | null }>;
  invites: Array<{ id: string; role: string; status: string; note: string; expiresAt: string; invitedUser: { username: string; displayName: string }; invitedBy: { username: string; displayName: string } }>;
  actions: Array<{ id: string; action: string; note: string; createdAt: string; actor: { username: string; displayName: string }; publication: { slug: string; title: string | null } }>;
};

type Tab = 'overview' | 'content' | 'team' | 'reports' | 'structure';
const tabLabels: Record<Tab, string> = { overview: 'Обзор', content: 'Материалы', team: 'Команда', reports: 'Отчёты', structure: 'Структура' };
const roleNames: Record<string, string> = { CURATOR: 'Куратор', ASSISTANT: 'Помощник', MODERATOR: 'Модератор' };
const actionNames: Record<string, string> = { PIN: 'Закрепил', UNPIN: 'Снял закрепление', MOVE: 'Перенёс', CLOSE: 'Закрыл', REOPEN: 'Открыл', MARK_OFFICIAL: 'Отметил официальной', UNMARK_OFFICIAL: 'Снял официальную метку', MARK_SOLVED: 'Отметил решённой', UNMARK_SOLVED: 'Снял отметку решения' };
const structureNames: Record<string, string> = { CREATE_SUBCOMMUNITY: 'Новый подраздел', RENAME: 'Переименование', MERGE: 'Объединение', ARCHIVE: 'Архивирование' };

export default function CommunityManagePage() {
  const { slug } = useParams<{ slug: string }>();
  const [data, setData] = useState<Dashboard | null>(null);
  const [tab, setTab] = useState<Tab>('overview');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState('');
  const load = () => api<Dashboard>(`/community-management/${slug}`).then((value) => { setData(value); setError(''); }).catch((cause) => setError(cause.message));
  useEffect(() => { void load(); }, [slug]);
  const isLeader = data && ['ADMIN', 'CURATOR', 'ASSISTANT'].includes(data.access);
  const isCurator = data && ['ADMIN', 'CURATOR'].includes(data.access);

  async function contentAction(publicationSlug: string, action: string, note: string, extra: Record<string, unknown> = {}) {
    setBusy(`${publicationSlug}:${action}`); setError(''); setMessage('');
    try {
      await api(`/community-management/${slug}/publications/${publicationSlug}/action`, { method: 'POST', body: JSON.stringify({ action, note, ...extra }) });
      setMessage('Изменение сохранено в журнале сообщества.'); await load();
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Действие не выполнено'); }
    finally { setBusy(''); }
  }

  async function invite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(''); setMessage(''); const form = new FormData(event.currentTarget);
    try {
      await api(`/community-management/${slug}/role-invites`, { method: 'POST', body: JSON.stringify({ username: form.get('username'), role: form.get('role'), note: form.get('note') }) });
      setMessage('Приглашение отправлено на семь дней.'); event.currentTarget.reset(); await load();
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Не удалось отправить приглашение'); }
  }

  async function createReport(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(''); setMessage(''); const form = new FormData(event.currentTarget);
    const body = Object.fromEntries(form.entries());
    try {
      const result = await api<{ publicationSlug: string }>(`/community-management/${slug}/reports`, { method: 'POST', body: JSON.stringify(body) });
      setMessage('Отчёт опубликован как официальная постоянная тема.'); event.currentTarget.reset(); await load();
      window.history.replaceState(null, '', `/communities/${slug}/manage?report=${result.publicationSlug}`);
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Не удалось опубликовать отчёт'); }
  }

  async function createStructure(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(''); setMessage(''); const form = new FormData(event.currentTarget);
    const body = Object.fromEntries(form.entries());
    try {
      await api(`/community-management/${slug}/structure-proposals`, { method: 'POST', body: JSON.stringify(body) });
      setMessage('Предложение передано центральной администрации.'); event.currentTarget.reset(); await load();
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Не удалось отправить предложение'); }
  }

  const recentActions = useMemo(() => data?.actions.slice(0, 8) ?? [], [data]);
  if (!data) return <StatePanel kind={error ? 'error' : 'loading'} title={error ? 'Кабинет недоступен' : 'Загрузка кабинета'}><p>{error || 'Собираем состояние сообщества без выдуманных показателей.'}</p></StatePanel>;

  return <div className="community-workspace" style={{ '--community-accent': data.community.accentColor } as React.CSSProperties}>
    <header className="workspace-header"><div><Link className="muted" href={`/communities/${slug}`}>← {data.community.name}</Link><span className="eyebrow">Рабочее место команды</span><h1>Управление сообществом</h1><p>Порядок, развитие и решения — без лишних виджетов и скрытых действий.</p></div><span className="workspace-access">{data.access === 'ADMIN' ? 'Центральная администрация' : roleNames[data.access] ?? data.access}</span></header>
    <nav className="workspace-tabs" aria-label="Разделы кабинета">{(Object.keys(tabLabels) as Tab[]).map((key) => <button key={key} type="button" className={tab === key ? 'active' : ''} onClick={() => setTab(key)}>{tabLabels[key]}</button>)}</nav>
    <div aria-live="polite">{message && <div className="success-box">{message}</div>}{error && <div className="error-box">{error}</div>}</div>

    {tab === 'overview' && <>
      <section className="workspace-metrics" aria-label="Состояние сообщества">
        <article><span>Новые публикации</span><strong>{data.health.publications7}</strong><small>за 7 дней · {data.health.publications30} за 30</small></article>
        <article><span>Ответы</span><strong>{data.health.comments7}</strong><small>за 7 дней · {data.health.comments30} за 30</small></article>
        <article><span>Без ответа</span><strong>{data.health.unansweredCount}</strong><small>{data.health.averageFirstResponseHours === null ? 'пока нет данных о времени ответа' : `первый ответ в среднем за ${data.health.averageFirstResponseHours} ч`}</small></article>
        <article><span>Требуют внимания</span><strong>{data.health.openReports}</strong><small>открытых жалоб · изменение подписчиков {data.health.subscriberChange30 >= 0 ? '+' : ''}{data.health.subscriberChange30}</small></article>
      </section>
      <div className="two-column workspace-columns"><section className="card"><div className="compact-heading"><h2>Темы без ответа</h2><button type="button" className="text-button" onClick={() => setTab('content')}>Все материалы</button></div>{data.unanswered.length ? <div className="workspace-list">{data.unanswered.map((item) => <Link key={item.slug} href={`/p/${item.slug}`}><strong>{item.excerpt}</strong><span>@{item.author.username} · {formatRelativeTime(item.createdAt)}</span></Link>)}</div> : <StatePanel title="Все темы получили ответ"><p>Сейчас нет свежих публикаций, оставшихся без реакции команды или сообщества.</p></StatePanel>}</section>
      <aside className="card"><h2>Последние действия команды</h2>{recentActions.length ? <div className="workspace-log">{recentActions.map((item) => <div key={item.id}><strong>{actionNames[item.action] ?? item.action}</strong><Link href={`/p/${item.publication.slug}`}>{item.publication.title || 'Публикация'}</Link><span>@{item.actor.username} · {formatRelativeTime(item.createdAt)}</span></div>)}</div> : <StatePanel title="Журнал пока пуст"><p>Здесь появятся только реальные действия команды с объяснениями.</p></StatePanel>}</aside></div>
    </>}

    {tab === 'content' && <section className="workspace-publications">{data.publications.map((item) => <article className="card workspace-publication" key={item.slug}><div><div className="publication-topline"><Link href={`/p/${item.slug}`}>{item.title}</Link><span>{formatRelativeTime(item.lastActivityAt)}</span></div><p>@{item.author.username} · {item.commentCount} ответов · {item.reactionCount} реакций · {item.bookmarkCount} сохранений</p><div className="content-labels">{item.pinnedUntil && new Date(item.pinnedUntil).getTime() > Date.now() && <span>Закреплена</span>}{item.isOfficial && <span>Официально</span>}{item.isSolved && <span>Решено</span>}{item.closedAt && <span>Закрыта</span>}</div></div><div className="workspace-action-grid">
          <button type="button" disabled={Boolean(busy)} onClick={() => { const pinned = Boolean(item.pinnedUntil && new Date(item.pinnedUntil).getTime() > Date.now()); return contentAction(item.slug, pinned ? 'UNPIN' : 'PIN', pinned ? 'Закрепление больше не требуется' : 'Важный материал сообщества', { durationDays: 7 }); }}>{item.pinnedUntil && new Date(item.pinnedUntil).getTime() > Date.now() ? 'Снять закрепление' : 'Закрепить на 7 дней'}</button>
          <button type="button" disabled={Boolean(busy)} onClick={() => contentAction(item.slug, item.isOfficial ? 'UNMARK_OFFICIAL' : 'MARK_OFFICIAL', item.isOfficial ? 'Официальная метка снята после обновления статуса' : 'Материал подтверждён командой')}>{item.isOfficial ? 'Снять «Официально»' : 'Отметить официальной'}</button>
          <button type="button" disabled={Boolean(busy)} onClick={() => contentAction(item.slug, item.isSolved ? 'UNMARK_SOLVED' : 'MARK_SOLVED', item.isSolved ? 'Вопрос снова требует обсуждения' : 'Вопрос получил решение')}>{item.isSolved ? 'Снять «Решено»' : 'Отметить решённой'}</button>
          <button type="button" disabled={Boolean(busy)} onClick={() => contentAction(item.slug, item.closedAt ? 'REOPEN' : 'CLOSE', item.closedAt ? 'Обсуждение снова актуально' : 'Обсуждение завершено командой')}>{item.closedAt ? 'Открыть тему' : 'Закрыть тему'}</button>
        </div></article>)}{!data.publications.length && <StatePanel title="Материалов пока нет"><p>После первой публикации здесь появятся только нужные команде действия.</p></StatePanel>}</section>}

    {tab === 'team' && <div className="two-column workspace-columns"><section className="card"><h2>Действующая команда</h2><div className="workspace-list">{data.team.map((member) => <Link key={member.id} href={`/u/${member.user.username}`}><strong>{member.user.displayName}</strong><span>@{member.user.username} · {roleNames[member.role] ?? member.role}</span></Link>)}</div><h3>Отправленные приглашения</h3>{data.invites.length ? <div className="workspace-log">{data.invites.map((invite) => <div key={invite.id}><strong>{invite.invitedUser.displayName} · {roleNames[invite.role]}</strong><span>{invite.status === 'PENDING' ? `До ${formatDateTime(invite.expiresAt)}` : invite.status}</span></div>)}</div> : <p className="muted">Активных приглашений нет.</p>}</section>{isCurator ? <aside className="card"><h2>Пригласить в команду</h2><p className="muted">Приглашение не назначает роль автоматически. Пользователь должен принять его.</p><form onSubmit={invite}><label>Имя пользователя<input name="username" required placeholder="username"/></label><label>Роль<select name="role" defaultValue="MODERATOR"><option value="MODERATOR">Модератор</option><option value="ASSISTANT">Помощник</option>{data.access === 'ADMIN' && <option value="CURATOR">Куратор</option>}</select></label><label>Зачем нужна роль<textarea name="note" minLength={5} maxLength={500} required/></label><button className="button">Отправить приглашение</button></form></aside> : <aside className="card"><StatePanel title="Управляет куратор"><p>Модератор видит команду, но не может менять её состав.</p></StatePanel></aside>}</div>}

    {tab === 'reports' && <div className="two-column workspace-columns"><section className="card"><h2>История отчётов</h2>{data.reports.length ? <div className="workspace-list">{data.reports.map((report) => <Link key={report.id} href={report.publication ? `/p/${report.publication.slug}` : '#'}><strong>{formatDateTime(report.periodStart)} — {formatDateTime(report.periodEnd)}</strong><span>{report.summary.slice(0, 120)} · @{report.author.username}</span></Link>)}</div> : <StatePanel title="Отчётов ещё нет"><p>Первый отчёт зафиксирует сделанное, проблемы и следующий план без рекламных формулировок.</p></StatePanel>}</section>{isLeader ? <aside className="card"><h2>Новый отчёт</h2><form onSubmit={createReport}><div className="form-grid-two"><label>Начало периода<span className="date-input-wrap"><input type="date" name="periodStart" required/></span></label><label>Конец периода<span className="date-input-wrap"><input type="date" name="periodEnd" required/></span></label></div><label>Краткий итог<textarea name="summary" minLength={20} maxLength={3000} required/></label><label>Что сделано<textarea name="achievements" minLength={5} maxLength={3000} required/></label><label>Проблемы<textarea name="problems" minLength={5} maxLength={3000} required/></label><label>Следующий план<textarea name="plans" minLength={5} maxLength={3000} required/></label><label>Средства сообщества — необязательно<textarea name="treasuryNote" maxLength={2000}/></label><button className="button">Опубликовать отчёт</button></form></aside> : null}</div>}

    {tab === 'structure' && <div className="two-column workspace-columns"><section className="card"><h2>Предложения по структуре</h2>{data.proposals.length ? <div className="workspace-log">{data.proposals.map((proposal) => <div key={proposal.id}><strong>{structureNames[proposal.type] ?? proposal.type}: {proposal.title}</strong><p>{proposal.description}</p><span>{proposal.status === 'OPEN' ? 'Ожидает решения администрации' : proposal.status} · @{proposal.createdBy.username} · {formatRelativeTime(proposal.createdAt)}</span></div>)}</div> : <StatePanel title="Предложений нет"><p>Структура меняется только по понятному основанию, а не ради заполнения каталога.</p></StatePanel>}</section>{isLeader ? <aside className="card"><h2>Предложить изменение</h2><form onSubmit={createStructure}><label>Тип<select name="type"><option value="CREATE_SUBCOMMUNITY">Новый подраздел</option><option value="RENAME">Переименование</option><option value="MERGE">Объединение</option><option value="ARCHIVE">Архивирование</option></select></label><label>Короткое название<input name="title" minLength={5} maxLength={140} required/></label><label>Обоснование<textarea name="description" minLength={20} maxLength={3000} required/></label><label>Предлагаемое название — при необходимости<input name="proposedName" maxLength={80}/></label><label>Адрес второго сообщества — при объединении<input name="targetCommunitySlug" placeholder="majestic-rp"/></label><button className="button">Передать администрации</button></form></aside> : null}</div>}
  </div>;
}
