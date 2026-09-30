import type { Metadata } from 'next';
import './expedition-alpha.css';
import { ExpeditionAlphaGame } from './expedition-alpha-game';

export const metadata: Metadata = {
  title: 'Экспедиция — alpha · 4rrum',
  description: 'Скрытый alpha-срез первой социальной игры 4rrum.',
  robots: { index: false, follow: false },
};

export default function ExpeditionAlphaPage() {
  return <ExpeditionAlphaGame />;
}
