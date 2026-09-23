import type { Metadata } from 'next';
import './office.css';
import { OfficeGame } from './office-game';

export const metadata: Metadata = {
  title: 'В Офисе — 4rrum Игры',
  description: 'Карьерная браузерная игра внутри 4rrum.',
};

export default function OfficeGamePage() {
  return <OfficeGame />;
}
