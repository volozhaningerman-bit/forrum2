'use client';

import { useLayoutEffect, useState } from 'react';

type ForumTheme = 'paper' | 'graphite';

function applyTheme(theme: ForumTheme) {
  const root = document.documentElement;
  const dark = theme === 'graphite';

  root.dataset.forrumTheme = theme;
  root.classList.toggle('dark', dark);
  root.style.colorScheme = dark ? 'dark' : 'light';
  window.localStorage.setItem('forrum-theme', theme);
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 15.2A8.5 8.5 0 0 1 8.8 4a7.5 7.5 0 1 0 11.2 11.2Z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 2v2.2M12 19.8V22M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M2 12h2.2M19.8 12H22M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6" />
    </svg>
  );
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<ForumTheme>('paper');

  useLayoutEffect(() => {
    const root = document.documentElement;
    const saved = window.localStorage.getItem('forrum-theme');
    const initial: ForumTheme =
      saved === 'graphite' ||
      root.dataset.forrumTheme === 'graphite' ||
      root.classList.contains('dark')
        ? 'graphite'
        : 'paper';

    setTheme(initial);
    applyTheme(initial);
  }, []);

  const dark = theme === 'graphite';
  const label = dark
    ? 'Включить светлую тему'
    : 'Включить тёмную тему';

  return (
    <button
      type="button"
      className="theme-toggle-v2"
      aria-label={label}
      title={label}
      onClick={() => {
        const next: ForumTheme = dark ? 'paper' : 'graphite';
        setTheme(next);
        applyTheme(next);
      }}
    >
      {dark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
