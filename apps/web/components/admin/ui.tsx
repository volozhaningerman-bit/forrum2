'use client';
import { useId, useState, type ReactNode } from 'react';
export function Help({ label, children }: { label: string; children: ReactNode }) {
  const id = useId();
  const [open, setOpen] = useState(false);
  return <span className="adm-help" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
    <button type="button" aria-label={`Что означает «${label}»`} aria-expanded={open} aria-describedby={open ? id : undefined} onFocus={() => setOpen(true)} onBlur={() => setOpen(false)} onClick={() => setOpen(true)} onKeyDown={e => { if (e.key === 'Escape') { e.preventDefault(); setOpen(false); } }}>?</button>
    {open && <span id={id} role="tooltip" className="adm-tooltip">{children}</span>}
  </span>;
}
export function Heading({ title, description, children }: { title: string; description: string; children?: ReactNode }) {
  return <header className="adm-heading"><div><span className="adm-eyebrow">Управление FORRUM</span><h1>{title}</h1><p>{description}</p></div>{children}</header>;
}
export function ErrorBox({ error, retry }: { error: string; retry?: () => void }) { return error ? <div className="adm-error" role="alert">{error}{retry && <button type="button" onClick={retry}>Повторить загрузку</button>}</div> : null; }
export function Empty({ children }: { children: ReactNode }) { return <div className="adm-empty">{children}</div>; }
