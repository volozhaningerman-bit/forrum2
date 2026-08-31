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
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [placeholder, setPlaceholder] = useState('Поиск');

  useEffect(() => {
    if (focused || query) {
      setPlaceholder('Поиск');
      return;
    }

    const media = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    );

    if (media.matches) {
      setPlaceholder('Поиск');
      return;
    }

    let index = 0;
    setPlaceholder(frames[index]);

    const timer = window.setInterval(() => {
      index = (index + 1) % frames.length;
      setPlaceholder(frames[index]);
    }, 330);

    return () => window.clearInterval(timer);
  }, [focused, query]);

  return (
    <form className="header-search" action="/search" role="search">
      <input
        name="q"
        value={query}
        aria-label="Поиск по 4RRUM"
        placeholder={placeholder}
        autoComplete="off"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(event) => setQuery(event.target.value)}
      />
      <button type="submit" aria-label="Найти">
        <SearchIcon />
      </button>
    </form>
  );
}
