import Link from 'next/link';
import type { ReactNode } from 'react';

export function HomePanel({
  title,
  href,
  linkLabel = 'Смотреть все',
  children,
  className = '',
}: {
  title: string;
  href?: string;
  linkLabel?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`forrum-home-v16__panel ${className}`.trim()}
    >
      <header className="forrum-home-v16__panel-head">
        <h2>{title}</h2>
        {href && (
          <span className="forrum-home-v18__panel-actions">
            <Link href={href}>
              {linkLabel} <span aria-hidden="true">→</span>
            </Link>
          </span>
        )}
      </header>
      {children}
    </section>
  );
}
