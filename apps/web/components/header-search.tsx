'use client';
import { useEffect, useRef, useState, type RefObject } from 'react';
import { SearchIcon } from './icons';

// Examples, not a claim about measured search popularity.
const PHRASES = ['Как запустить свой проект?', 'Кто поможет собрать компьютер?', 'Как найти первых клиентов?', 'Разработка Telegram Mini Apps'];
export function HeaderSearch({ inputRef }: { inputRef?: RefObject<HTMLInputElement | null> }) {
 const animationDone = useRef(false);
 const [placeholder, setPlaceholder] = useState(PHRASES[0]);
 const [focused, setFocused] = useState(false);
 const [value, setValue] = useState('');
 useEffect(() => {
  if (inputRef || focused || value || animationDone.current) return;
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let index = 0, visible = PHRASES[0].length, deleting = true, hold = 32;
  const timer = window.setInterval(() => {
   if (motion.matches) { setPlaceholder(PHRASES[0]); animationDone.current = true; window.clearInterval(timer); return; }
   if (document.hidden) return;
   if (hold > 0) { hold--; return; }
   visible += deleting ? -1 : 1;
   setPlaceholder(PHRASES[index].slice(0, visible));
   if (visible === 0) { index = (index + 1) % PHRASES.length; deleting = false; hold = 5; }
   else if (visible === PHRASES[index].length) {
    if (index === 2) { animationDone.current = true; window.clearInterval(timer); }
    deleting = true; hold = 32;
   }
  }, 80);
  return () => window.clearInterval(timer);
 }, [focused, value, inputRef]);
 return <form className={inputRef ? "forum-header-search" : "header-search"} action="/search" role="search">
  <input ref={inputRef} name="q" aria-label="Поиск тем, людей, проектов" placeholder={inputRef ? 'Найти модель, промпт, тему или человека' : focused ? 'Поиск тем, людей, проектов' : placeholder} autoComplete="off" value={value} onChange={event => setValue(event.target.value)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}/>
  <button type="submit" aria-label="Найти" title="Найти"><SearchIcon/></button>
 </form>;
}
