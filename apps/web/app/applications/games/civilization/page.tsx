import type { Metadata } from 'next';
import './civilization.css';
import { CivilizationGame } from './civilization-game';

export const metadata: Metadata = {
  title: 'Цивилизация — 4rrum Игры',
  description: 'Браузерная игра о развитии цивилизации: от пещеры до империи.',
};

export default function CivilizationPage() {
  return <CivilizationGame />;
}
