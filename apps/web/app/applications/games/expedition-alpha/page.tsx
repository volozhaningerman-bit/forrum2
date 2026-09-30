import type { Metadata } from 'next';
import { requireUser, serverApi } from '@/lib/server-api';
import './expedition-alpha.css';
import { ExpeditionAlphaGame, type ExpeditionRaidState, type ExpeditionState } from './expedition-alpha-game';

export const metadata: Metadata = {
  title: 'Экспедиция — alpha · 4rrum',
  description: 'Скрытый alpha-срез первой социальной игры 4rrum.',
  robots: { index: false, follow: false },
};

export default async function ExpeditionAlphaPage() {
  await requireUser('/applications/games/expedition-alpha');
  const [initialState, initialRaid] = await Promise.all([
    serverApi<ExpeditionState>('/expedition/me'),
    serverApi<ExpeditionRaidState>('/expedition/raid'),
  ]);

  if (!initialState || !initialRaid) {
    throw new Error('Не удалось загрузить игровой профиль');
  }

  return <ExpeditionAlphaGame initialState={initialState} initialRaid={initialRaid} />;
}
