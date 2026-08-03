import type { SVGProps } from 'react';

function IconBase(props: SVGProps<SVGSVGElement>) {
  return <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}/>;
}
export function SearchIcon() { return <IconBase><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></IconBase>; }
export function BellIcon() { return <IconBase><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></IconBase>; }
export function MessageIcon() { return <IconBase><path d="M4 5h16v12H7l-3 3V5Z"/></IconBase>; }
export function HomeIcon() { return <IconBase><path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10"/></IconBase>; }
export function GridIcon() { return <IconBase><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></IconBase>; }
export function PlusIcon() { return <IconBase><path d="M12 5v14M5 12h14"/></IconBase>; }
export function FilterIcon() { return <IconBase><path d="M4 6h16M7 12h10M10 18h4"/></IconBase>; }
export function UsersIcon() { return <IconBase><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></IconBase>; }
export function FlameIcon() { return <IconBase><path d="M12 22c4 0 7-3 7-7 0-5-4-8-7-13 0 4-3 6-5 9-2 4 0 11 5 11Z"/><path d="M12 22c-2 0-3.5-1.5-3.5-3.5 0-2 1.5-3.5 3.5-5.5 0 2 2 3 2 5.5 0 2-1 3.5-2 3.5Z"/></IconBase>; }
export function EyeIcon() { return <IconBase><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/></IconBase>; }
export function HeartIcon() { return <IconBase><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/></IconBase>; }
export function BookmarkIcon() { return <IconBase><path d="M6 3h12v18l-6-4-6 4V3Z"/></IconBase>; }
export function CommentIcon() { return <IconBase><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z"/></IconBase>; }

export function ShieldIcon() { return <IconBase><path d="M12 3 5 6v5c0 4.5 2.7 8.3 7 10 4.3-1.7 7-5.5 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-4"/></IconBase>; }
