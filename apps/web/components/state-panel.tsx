import type { ReactNode } from 'react';

export function StatePanel({
  kind = 'empty', title, children, action,
}: { kind?: 'loading' | 'empty' | 'error'; title: string; children?: ReactNode; action?: ReactNode }) {
  return <div className={`state-panel state-${kind}`} role={kind === 'error' ? 'alert' : 'status'} aria-live={kind === 'loading' ? 'polite' : undefined}>
    <span className="state-panel-icon" aria-hidden="true">{kind === 'loading' ? '◌' : kind === 'error' ? '!' : '○'}</span>
    <div><strong>{title}</strong>{children && <div className="state-panel-copy">{children}</div>}{action && <div className="state-panel-action">{action}</div>}</div>
  </div>;
}
