import type { Metadata } from 'next';
import './expedition.css';
import { ExpeditionGame } from './expedition-game';

export const metadata: Metadata = {
  title: 'Экспедиция — 4rrum Игры',
  description: 'Альфа социальной RPG 4rrum: экспедиции, редкий лут, совместные боссы и развитие сообществ.',
};

export default function ExpeditionPage() {
  return <ExpeditionGame />;
}
