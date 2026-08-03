'use client';

import Link from 'next/link';
import type { CSSProperties } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { api } from '@/lib/api';
import { StatePanel } from '@/components/state-panel';

type NotifyLevel = 'NONE' | 'IMPORTANT' | 'ALL';
type Community = {
  id: string; slug: string; name: string; description: string; shortDescription?: string | null;
  accentColor: string; parent: { slug: string; name: string } | null; subscriberCount: number;
  publicationCount: number; isSubscribed: boolean; notifyLevel: NotifyLevel | null;
};
type FeedPreferences = {
  recommendationsEnabled: boolean; showReasons: boolean; hiddenPublicationCount: number;
  hiddenCommunities: { slug: string; name: string; accentColor: string }[];
};

const notifyLabels: Record<NotifyLevel, string> = { NONE: 'Без уведомлений', IMPORTANT: 'Только важное', ALL: 'Все новости' };

export default function InterestsSettingsPage() {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [preferences, setPreferences] = useState<FeedPreferences | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function load() {
    setLoading(true); setError('');
    try {
      const [communityData, preferenceData] = await Promise.all([
        api<Community[]>('/communities'), api<FeedPreferences>('/feed/preferences'),
      ]);
      setCommunities(communityData); setPreferences(preferenceData);
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Не удалось загрузить интересы'); }
    finally { setLoading(false); }
  }
  useEffect(() => { void load(); }, []);

  const roots = useMemo(() => communities.filter((community) => !community.parent), [communities]);
  const childrenByParent = useMemo(() => {
    const map = new Map<string, Community[]>();
    communities.filter((community) => community.parent).forEach((community) => {
      const key = community.parent!.slug; map.set(key, [...(map.get(key) ?? []), community]);
    });
    return map;
  }, [communities]);
  const subscribedCount = communities.filter((community) => community.isSubscribed).length;

  async function toggleSubscription(community: Community) {
    setBusy(`subscription:${community.slug}`); setError(''); setMessage('');
    try {
      await api(`/communities/${community.slug}/subscribe`, { method: community.isSubscribed ? 'DELETE' : 'POST' });
      setMessage(community.isSubscribed ? `Вы отписались от «${community.name}»` : `«${community.name}» добавлено в вашу ленту`);
      await load();
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Не удалось изменить подписку'); }
    finally { setBusy(''); }
  }

  async function setNotifyLevel(community: Community, notifyLevel: NotifyLevel) {
    setBusy(`notify:${community.slug}`); setError(''); setMessage('');
    try {
      await api(`/communities/${community.slug}/subscription`, { method: 'PATCH', body: JSON.stringify({ notifyLevel }) });
      setCommunities((current) => current.map((item) => item.slug === community.slug ? { ...item, notifyLevel } : item));
      setMessage(`Уведомления «${community.name}»: ${notifyLabels[notifyLevel].toLowerCase()}`);
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Не удалось изменить уведомления'); }
    finally { setBusy(''); }
  }

  async function updatePreference(key: 'recommendationsEnabled' | 'showReasons', value: boolean) {
    if (!preferences) return;
    const previous = preferences;
    setPreferences({ ...preferences, [key]: value }); setError(''); setMessage('');
    try {
      const updated = await api<FeedPreferences>('/feed/preferences', { method: 'PATCH', body: JSON.stringify({ [key]: value }) });
      setPreferences(updated);
      setMessage('Настройки ленты сохранены');
    } catch (cause) {
      setPreferences(previous); setError(cause instanceof Error ? cause.message : 'Не удалось сохранить настройки');
    }
  }

  async function restoreCommunity(slug: string) {
    setBusy(`restore:${slug}`); setError('');
    try { await api(`/feed/hidden-communities/${slug}`, { method: 'DELETE' }); await load(); setMessage('Сообщество снова может появляться в рекомендациях'); }
    catch (cause) { setError(cause instanceof Error ? cause.message : 'Не удалось вернуть сообщество'); }
    finally { setBusy(''); }
  }

  async function clearHiddenPublications() {
    setBusy('clear-publications'); setError('');
    try {
      const result = await api<{ restored: number }>('/feed/hidden-publications', { method: 'DELETE' });
      await load(); setMessage(`Возвращено публикаций: ${result.restored}`);
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Не удалось вернуть публикации'); }
    finally { setBusy(''); }
  }

  if (loading) return <div className="settings-narrow"><StatePanel kind="loading" title="Загружаем ваши интересы">Собираем подписки и настройки персональной ленты.</StatePanel></div>;
  if (error && !preferences) return <div className="settings-narrow"><StatePanel kind="error" title="Не удалось открыть настройки" action={<button type="button" className="button ghost small" onClick={() => load()}>Повторить</button>}>{error}</StatePanel></div>;

  return <div className="settings-layout interests-settings">
    <main>
      <header className="settings-page-header"><div><span className="auth-eyebrow">Персональная лента</span><h1>Подписки и интересы</h1><p className="muted">Вы решаете, что попадёт в ленту. Рекомендации можно отключить полностью.</p></div><Link className="button ghost small" href="/">Открыть ленту</Link></header>
      {message && <div className="success-box">{message}</div>}{error && <div className="error-box">{error}</div>}

      <section className="card settings-section-card">
        <div className="section-title"><div><h2>Как формируется «Для вас»</h2><p className="muted">Подписки имеют приоритет. Популярные рекомендации лишь дополняют их и всегда ограничены.</p></div></div>
        <div className="settings-checklist">
          <label className="settings-toggle"><input type="checkbox" checked={Boolean(preferences?.recommendationsEnabled)} onChange={(event) => updatePreference('recommendationsEnabled', event.target.checked)}/><span><strong>Добавлять рекомендации</strong><small>Показывать обсуждаемые материалы вне подписок, если они могут быть интересны.</small></span></label>
          <label className="settings-toggle"><input type="checkbox" checked={Boolean(preferences?.showReasons)} onChange={(event) => updatePreference('showReasons', event.target.checked)}/><span><strong>Объяснять рекомендации</strong><small>Показывать подписи «Вы подписаны на сообщество», «Популярно» и другие причины.</small></span></label>
        </div>
      </section>

      <section className="card settings-section-card">
        <div className="section-title"><div><h2>Сообщества</h2><p className="muted">Вы подписаны: {subscribedCount}. Подписка на родительское сообщество включает материалы его подразделов.</p></div><Link href="/communities">Каталог</Link></div>
        <div className="interest-community-list">
          {roots.map((root) => <div className="interest-community-group" key={root.id}>
            <CommunityRow community={root} busy={busy} onToggle={toggleSubscription} onNotify={setNotifyLevel}/>
            {(childrenByParent.get(root.slug) ?? []).length > 0 && <div className="interest-child-list">{(childrenByParent.get(root.slug) ?? []).map((child) => <CommunityRow key={child.id} community={child} busy={busy} onToggle={toggleSubscription} onNotify={setNotifyLevel} child/>)}</div>}
          </div>)}
          {!roots.length && <StatePanel title="Сообществ пока нет">После создания сообществ они появятся здесь.</StatePanel>}
        </div>
      </section>

      <section className="card settings-section-card">
        <h2>Скрытый контент</h2><p className="muted">Скрытие влияет только на вашу ленту и не удаляет материал для других.</p>
        {preferences?.hiddenCommunities.length ? <div className="hidden-interest-list">{preferences.hiddenCommunities.map((community) => <div key={community.slug}><span className="community-dot" style={{ background: community.accentColor }}/><strong>{community.name}</strong><button type="button" className="button ghost small" disabled={busy === `restore:${community.slug}`} onClick={() => restoreCommunity(community.slug)}>{busy === `restore:${community.slug}` ? 'Возвращаем…' : 'Вернуть'}</button></div>)}</div> : <p className="muted small-text">Скрытых сообществ нет.</p>}
        <div className="hidden-publication-summary"><span>Скрытых публикаций: <strong>{preferences?.hiddenPublicationCount ?? 0}</strong></span><button type="button" className="button ghost small" disabled={!preferences?.hiddenPublicationCount || busy === 'clear-publications'} onClick={clearHiddenPublications}>{busy === 'clear-publications' ? 'Возвращаем…' : 'Вернуть все'}</button></div>
      </section>
    </main>
    <aside className="settings-sidebar"><div className="card settings-links"><h3>Мой FORRUM</h3><Link href="/subscriptions">Авторы и хэштеги</Link><Link href="/saved">Сохранённые материалы</Link><Link href="/activity">История действий</Link><Link href="/settings">Профиль и уведомления</Link><Link className="active" href="/settings/interests">Подписки и интересы</Link><Link href="/settings/security">Безопасность</Link><Link href="/settings/telegram">Telegram-бот</Link></div><div className="card settings-sidebar-card"><h3>Без скрытых алгоритмов</h3><p className="muted">FORRUM показывает причину рекомендации и позволяет отключить её одним переключателем.</p></div></aside>
  </div>;
}

function CommunityRow({ community, child = false, busy, onToggle, onNotify }: {
  community: Community; child?: boolean; busy: string;
  onToggle: (community: Community) => void; onNotify: (community: Community, level: NotifyLevel) => void;
}) {
  const subscriptionBusy = busy === `subscription:${community.slug}`;
  const notifyBusy = busy === `notify:${community.slug}`;
  return <div className={`interest-community-row ${child ? 'child' : ''}`} style={{ '--interest-accent': community.accentColor } as CSSProperties}>
    <span className="community-dot"/>
    <div className="interest-community-copy"><Link href={`/communities/${community.slug}`}><strong>{community.name}</strong></Link><small>{community.shortDescription || community.description}</small><span>{community.subscriberCount.toLocaleString('ru-RU')} подписчиков · {community.publicationCount.toLocaleString('ru-RU')} публикаций</span></div>
    <div className="interest-community-controls">
      <button type="button" className={`button small ${community.isSubscribed ? 'secondary' : ''}`} disabled={subscriptionBusy} onClick={() => onToggle(community)}>{subscriptionBusy ? 'Сохраняем…' : community.isSubscribed ? 'Вы подписаны' : 'Подписаться'}</button>
      {community.isSubscribed && <select aria-label={`Уведомления сообщества ${community.name}`} value={community.notifyLevel ?? 'IMPORTANT'} disabled={notifyBusy} onChange={(event) => onNotify(community, event.target.value as NotifyLevel)}>{Object.entries(notifyLabels).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select>}
    </div>
  </div>;
}
