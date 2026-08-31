'use client';

import { useEffect, useState } from 'react';
import { SearchIcon } from './icons';

const frames = [
  'П',
  'По',
  'Пои',
  'Поис',
  'Поиск',
  'Поиск.',
  'Поиск..',
  'Поиск...',
  'Поиск.',
  'Поиск..',
  'Поиск...',
  'Поиск.',
  'Поиск..',
  'Поиск...',
  'Поиск.',
  'Поиск..',
  'Поиск...',
  'Поиск.',
  'Поиск..',
  'Поиск...',
  '',
] as const;

export function HeaderSearch() {
  const [placeholder, setPlaceholder] = useState('Поиск');

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) {
      setPlaceholder('Поиск по 4RRUM');
      return;
    }

    let index = 0;
    const timer = window.setInterval(() => {
      setPlaceholder(frames[index] ?? 'Поиск');
      index = (index + 1) % frames.length;
    }, 330);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <form className="header-search" action="/search" role="search">
      <input
        name="q"
        aria-label="Поиск по 4RRUM"
        placeholder={placeholder}
        autoComplete="off"
      />
      <button type="submit" aria-label="Найти">
        <SearchIcon />
      </button>
    </form>
  );
}
