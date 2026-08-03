'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import type { Me } from '@/lib/types';
import { Avatar } from './avatar';

export function AuthActions() {
  const router = useRouter();
  const [me, setMe] = useState<Me | null>(null);
  useEffect(() => {
    const load = () => { void api<Me>('/auth/me').then(setMe).catch(() => setMe(null)); };
    load();
    window.addEventListener('forrum-auth-changed', load);
    window.addEventListener('focus', load);
    return () => { window.removeEventListener('forrum-auth-changed', load); window.removeEventListener('focus', load); };
  }, []);
  async function logout() { await api('/auth/logout', { method: 'POST' }); setMe(null); router.push('/'); router.refresh(); }
  if (!me) return <div className="auth-actions"><Link href="/login">Войти</Link><Link className="button small" href="/register">Регистрация</Link></div>;
  const needsVerification = !me.user.emailVerified;
  const needsOnboarding = me.user.emailVerified && !me.user.onboardingCompleted;
  const profileHref = needsVerification ? '/verify-email' : needsOnboarding ? '/welcome' : `/u/${me.user.username}`;
  const title = needsVerification ? 'Подтвердить почту' : needsOnboarding ? 'Завершить настройку' : 'Профиль';
  return <div className="profile-menu">
    <Link className="profile-trigger" href={profileHref} title={title}>
      <Avatar name={me.user.displayName} url={me.user.avatarUrl}/><span className="desktop-only">{me.user.displayName}</span>{(needsVerification || needsOnboarding) && <span className="warning-dot"/>}
    </Link>
    <button type="button" className="text-button" title="Выйти" onClick={logout}><span className="desktop-only">Выйти</span><span className="mobile-only">↪</span></button>
  </div>;
}
