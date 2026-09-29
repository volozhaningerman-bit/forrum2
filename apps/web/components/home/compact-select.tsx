'use client';
import { useEffect, useId, useRef, useState } from 'react';

export type CompactSelectOption = { value: string; label: string };

export function CompactSelect({
  label,
  value,
  options,
  onChange,
  className = '',
}: {
  label: string;
  value: string;
  options: CompactSelectOption[];
  onChange: (value: string) => void;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const listId = useId();
  const selected = options.find(option => option.value === value) ?? options[0];

  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    document.addEventListener('pointerdown', outside);
    document.addEventListener('keydown', escape);
    return () => {
      document.removeEventListener('pointerdown', outside);
      document.removeEventListener('keydown', escape);
    };
  }, [open]);

  function focusOption(direction: 1 | -1) {
    const items = Array.from(list.current?.querySelectorAll<HTMLElement>('[role="option"]') ?? []);
    if (!items.length) return;
    const index = items.findIndex(item => item === document.activeElement);
    const next = index < 0 ? (direction > 0 ? 0 : items.length - 1) : (index + direction + items.length) % items.length;
    items[next]?.focus();
  }

  function choose(next: string) {
    onChange(next);
    setOpen(false);
    requestAnimationFrame(() => trigger.current?.focus());
  }

  return <div className={`forum-compact-select ${className}`.trim()} ref={root}>
    <button
      ref={trigger}
      type="button"
      className="forum-compact-select-trigger"
      aria-label={`${label}: ${selected?.label ?? ''}`}
      aria-haspopup="listbox"
      aria-expanded={open}
      aria-controls={listId}
      onClick={() => setOpen(previous => !previous)}
      onKeyDown={event => {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
          event.preventDefault();
          setOpen(true);
          requestAnimationFrame(() => focusOption(event.key === 'ArrowDown' ? 1 : -1));
        }
      }}
    >
      <span>{selected?.label ?? '—'}</span>
      <span className="forum-compact-select-chevron" aria-hidden="true">⌄</span>
    </button>
    {open && <div
      ref={list}
      id={listId}
      role="listbox"
      aria-label={label}
      className="forum-compact-select-menu"
      onKeyDown={event => {
        if (event.key === 'ArrowDown') {
          event.preventDefault();
          focusOption(1);
        } else if (event.key === 'ArrowUp') {
          event.preventDefault();
          focusOption(-1);
        } else if (event.key === 'Home') {
          event.preventDefault();
          list.current?.querySelector<HTMLElement>('[role="option"]')?.focus();
        } else if (event.key === 'End') {
          event.preventDefault();
          const items = Array.from(list.current?.querySelectorAll<HTMLElement>('[role="option"]') ?? []);
          items.at(-1)?.focus();
        }
      }}
    >
      {options.map(option => <button
        key={option.value}
        type="button"
        role="option"
        aria-selected={option.value === value}
        className="forum-compact-select-option"
        onClick={() => choose(option.value)}
      >
        {option.label}
      </button>)}
    </div>}
  </div>;
}
