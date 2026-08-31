'use client';

// 4RRUM_HEADER_SEARCH_13
import { useEffect, useState } from 'react';
import { SearchIcon } from './icons';

const SEARCH_PHRASES = [
  'Поиск по форуму',
  'Поиск по темам',
  'Поиск по сообщениям',
] as const;

export function HeaderSearch() {
  const [placeholder, setPlaceholder] = useState<string>(
    SEARCH_PHRASES[0],
  );

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    );

    if (reduceMotion.matches) {
      setPlaceholder(SEARCH_PHRASES[0]);
      return;
    }

    let phraseIndex = 0;
    let visible = SEARCH_PHRASES[0].length;
    let deleting = true;
    let holdTicks = 16;

    const timer = window.setInterval(() => {
      if (holdTicks > 0) {
        holdTicks -= 1;
        return;
      }

      const phrase = SEARCH_PHRASES[phraseIndex];

      if (deleting) {
        visible = Math.max(0, visible - 1);
        setPlaceholder(phrase.slice(0, visible));

        if (visible === 0) {
          phraseIndex =
            (phraseIndex + 1) %
            SEARCH_PHRASES.length;
          deleting = false;
          holdTicks = 2;
        }

        return;
      }

      const nextPhrase = SEARCH_PHRASES[phraseIndex];
      visible = Math.min(
        nextPhrase.length,
        visible + 1,
      );
      setPlaceholder(
        nextPhrase.slice(0, visible),
      );

      if (visible === nextPhrase.length) {
        deleting = true;
        holdTicks = 16;
      }
    }, 70);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <form
      className="header-search"
      action="/search"
      role="search"
    >
      <input
        name="q"
        aria-label="Поиск по 4RRUM"
        placeholder={placeholder}
        autoComplete="off"
      />
      <button
        type="submit"
        aria-label="Найти"
      >
        <SearchIcon />
      </button>
    </form>
  );
}
