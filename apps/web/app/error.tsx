'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="route-state route-state-error">
      <strong>Раздел не удалось открыть</strong>
      <p>
        Данные не потеряны. Повторите запрос или
        вернитесь на главную.
      </p>
      <div className="inline-actions">
        <button
          type="button"
          className="button"
          onClick={reset}
        >
          Повторить
        </button>
        <a className="button ghost" href="/">
          На главную
        </a>
      </div>
      {error.digest && (
        <small>Код ошибки: {error.digest}</small>
      )}
    </section>
  );
}
