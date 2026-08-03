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
  return <div className="auth-layout">
    <section className="auth-intro" aria-label="О FORRUM ID">
      <Link className="auth-brand" href="/"><span className="brand-mark">F</span><span>FORRUM ID</span></Link>
      <div>
        <span className="auth-eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <ul className="auth-benefits">
        <li><strong>Один аккаунт</strong><span>Профиль, сообщества, сообщения и будущие сервисы FORRUM.</span></li>
        <li><strong>Подтверждённая почта</strong><span>Защищает публикации и голосования от массовых пустых аккаунтов.</span></li>
        <li><strong>Контроль входов</strong><span>Активные устройства можно просмотреть и завершить в настройках.</span></li>
      </ul>
    </section>
    <section className="card auth-panel">
      {children}
      {footer && <div className="auth-footer">{footer}</div>}
    </section>
  </div>;
}
