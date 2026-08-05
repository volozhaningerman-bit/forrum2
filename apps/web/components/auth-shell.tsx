import type { ReactNode } from 'react';
import Link from 'next/link';

export function AuthShell({
  eyebrow,
  title,
  description,
  children,
  footer,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="compact-auth-page">
      <section className="compact-auth-panel">
        <Link
          className="compact-auth-brand"
          href="/"
          aria-label="FORRUM"
        >
          <span
            className="brand-mark"
            aria-hidden="true"
          >
            F
          </span>
          <strong aria-hidden="true">FORRUM</strong>
        </Link>

        <header>
          <span>{eyebrow}</span>
          <h1>{title}</h1>
          <p>{description}</p>
        </header>

        <div className="compact-auth-content">
          {children}
        </div>

        {footer && (
          <footer className="auth-footer">
            {footer}
          </footer>
        )}
      </section>
    </div>
  );
}
