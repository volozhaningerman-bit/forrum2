'use client';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import type { Me } from '@/lib/types';

type Community = {
  slug: string;
  name: string;
  shortDescription: string;
  accentColor: string;
  parent: { slug: string; name: string } | null;
  subscriberCount: number;
  isSubscribed: boolean;
};

type FullMe = Me & { user: Me['user'] & { bio?: string | null; location?: string | null } };

export default function WelcomePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [me, setMe] = useState<FullMe | null>(null);
  const [communities, setCommunities] = useState<Community[]>([]);
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([api<FullMe>('/auth/me'), api<Community[]>('/communities')])
      .then(([meData, communityData]) => {
        if (meData.user.onboardingCompleted) { router.replace('/'); return; }
        if (!meData.user.emailVerified) {
          sessionStorage.setItem('forrum_pending_email', meData.user.email); router.replace('/verify-email');
          return;
        }
        setMe(meData);
        setDisplayName(meData.user.displayName);
        setBio(meData.user.bio ?? '');
        setLocation(meData.user.location ?? '');
        const rootCommunities = communityData.filter((community) => !community.parent);
        setCommunities(rootCommunities);
        setSelected(rootCommunities.filter((community) => community.isSubscribed).map((community) => community.slug).slice(0, 5));
      })
      .catch(() => router.replace('/login?next=/welcome'))
      .finally(() => setLoading(false));
  }, [router]);

  const selectedCommunities = useMemo(() => communities.filter((community) => selected.includes(community.slug)), [communities, selected]);

  function toggleCommunity(slug: string) {
    setSelected((current) => current.includes(slug) ? current.filter((item) => item !== slug) : current.length < 5 ? [...current, slug] : current);
  }

  async function saveProfile() {
    setSaving(true); setError('');
    try {
      await api('/auth/me', { method: 'PATCH', body: JSON.stringify({ displayName, bio, location }) });
      setStep(2);
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Не удалось сохранить профиль'); }
    finally { setSaving(false); }
  }

  async function finish() {
    setSaving(true); setError('');
    try {
      for (const community of communities) {
        const shouldSubscribe = selected.includes(community.slug);
        if (shouldSubscribe && !community.isSubscribed) await api(`/communities/${community.slug}/subscribe`, { method: 'POST' });
        if (!shouldSubscribe && community.isSubscribed) await api(`/communities/${community.slug}/subscribe`, { method: 'DELETE' });
        if (shouldSubscribe) await api(`/communities/${community.slug}/subscription`, { method: 'PATCH', body: JSON.stringify({ notifyLevel: 'IMPORTANT' }) });
      }
      await api('/auth/onboarding/complete', { method: 'POST' });
      window.dispatchEvent(new Event('forrum-auth-changed'));
      router.push('/?welcome=1'); router.refresh();
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Не удалось завершить настройку'); }
    finally { setSaving(false); }
  }

  async function skip() {
    setSaving(true); setError('');
    try {
      await api('/auth/onboarding/complete', { method: 'POST' });
      window.dispatchEvent(new Event('forrum-auth-changed'));
      router.push('/'); router.refresh();
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Не удалось завершить настройку'); }
    finally { setSaving(false); }
  }

  if (loading) return <div className="onboarding-shell"><div className="card skeleton tall">Загрузка</div></div>;
  if (!me) return null;

  return <div className="onboarding-shell">
    <header className="onboarding-header">
      <div><span className="auth-eyebrow">Первый вход</span><h1>Настроим FORRUM под вас</h1><p className="muted">Три коротких шага. Всё можно изменить позже в настройках.</p></div>
      <button className="text-button" type="button" disabled={saving} onClick={skip}>Пропустить</button>
    </header>
    <div className="onboarding-progress" aria-label={`Шаг ${step} из 3`}>
      {[1, 2, 3].map((item) => <span key={item} className={item <= step ? 'active' : ''}>{item}</span>)}
    </div>
    {error && <div className="error-box">{error}</div>}

    {step === 1 && <section className="card onboarding-card">
      <div className="onboarding-copy"><span className="auth-eyebrow">Шаг 1</span><h2>Как вас будут видеть</h2><p>Имя и короткое описание помогают людям понять, кто вы и о чём с вами можно поговорить.</p></div>
      <div className="onboarding-form">
        <label>Отображаемое имя<input value={displayName} minLength={2} maxLength={60} onChange={(event) => setDisplayName(event.target.value)}/><span className="field-help">Можно использовать настоящее имя, псевдоним или название проекта.</span></label>
        <label>О себе <span className="optional-label">необязательно</span><textarea value={bio} maxLength={500} placeholder="Чем занимаетесь, что создаёте или в каких темах разбираетесь" onChange={(event) => setBio(event.target.value)}/><span className="field-help">{bio.length}/500</span></label>
        <label>Город или страна <span className="optional-label">необязательно</span><input value={location} maxLength={100} onChange={(event) => setLocation(event.target.value)}/></label>
        <button className="button" type="button" disabled={saving || displayName.trim().length < 2} onClick={saveProfile}>{saving ? 'Сохраняем…' : 'Продолжить'}</button>
      </div>
    </section>}

    {step === 2 && <section className="card onboarding-card">
      <div className="onboarding-copy"><span className="auth-eyebrow">Шаг 2</span><h2>Выберите интересы</h2><p>Главная лента начнёт с выбранных сообществ. Позже подписки можно свободно менять.</p></div>
      <div>
        <div className="interest-grid">
          {communities.map((community) => {
            const active = selected.includes(community.slug);
            return <button type="button" key={community.slug} className={`interest-card ${active ? 'active' : ''}`} style={{ '--interest-accent': community.accentColor } as CSSProperties} onClick={() => toggleCommunity(community.slug)}>
              <span className="interest-check">{active ? '✓' : '+'}</span><strong>{community.name}</strong><small>{community.shortDescription}</small><span>{community.subscriberCount} подписчиков</span>
            </button>;
          })}
        </div>
        <div className="onboarding-actions"><button className="button ghost" type="button" onClick={() => setStep(1)}>Назад</button><button className="button" type="button" onClick={() => setStep(3)}>Продолжить{selected.length ? ` · ${selected.length}` : ''}</button></div>
        {selected.length >= 5 && <p className="warning-text small-text">Для первого запуска достаточно пяти сообществ. Остальные можно добавить позже.</p>}
      </div>
    </section>}

    {step === 3 && <section className="card onboarding-card onboarding-finish">
      <div className="onboarding-copy"><span className="auth-eyebrow">Шаг 3</span><h2>Всё готово</h2><p>Мы включим только важные уведомления выбранных сообществ. Обычные публикации останутся в ленте без лишних оповещений.</p></div>
      <div className="onboarding-summary">
        <div><span>Профиль</span><strong>{displayName}</strong><small>@{me.user.username} · FORRUM ID {me.user.forrumId}</small></div>
        <div><span>В ленте</span><strong>{selectedCommunities.length ? selectedCommunities.map((community) => community.name).join(', ') : 'Общая лента FORRUM'}</strong><small>{selectedCommunities.length ? 'Подписки можно изменить в любой момент' : 'Можно начать без подписок и выбрать их позже'}</small></div>
        <div><span>Уведомления</span><strong>Только важное</strong><small>Голосования, объявления и ключевые новости выбранных сообществ</small></div>
        <div className="onboarding-actions"><button className="button ghost" type="button" onClick={() => setStep(2)}>Назад</button><button className="button" type="button" disabled={saving} onClick={finish}>{saving ? 'Настраиваем ленту…' : 'Перейти на FORRUM'}</button></div>
      </div>
    </section>}
    <p className="onboarding-help">Возникла проблема? <Link href="/settings">Настройки аккаунта</Link> будут доступны после завершения.</p>
  </div>;
}
