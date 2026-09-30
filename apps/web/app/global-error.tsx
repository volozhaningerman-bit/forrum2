'use client';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <html lang="ru" className="dark" data-forrum-theme="graphite">
    <body>
      <main className="shell main" id="main-content">
        <section className="route-state route-state-error" role="alert">
          <span className="auth-eyebrow">4RRUM / СБОЙ</span>
          <strong>Не удалось открыть форум</strong>
          <p>Повторите загрузку. Если ошибка сохраняется, вернитесь на главную позже.</p>
          <div className="inline-actions">
            <button type="button" className="button" onClick={reset}>Повторить</button>
            <a className="button ghost" href="/">На главную</a>
          </div>
        </section>
      </main>
    </body>
  </html>;
}
