export const API_URL = '/api';

function parseMessage(
  data: Record<string, unknown>,
  fallback: string,
) {
  const value = data.message;

  if (Array.isArray(value)) {
    return value.map(String).join('. ');
  }

  if (typeof value === 'string' && value.trim()) {
    return value;
  }

  return fallback;
}

export async function api<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const headers = new Headers(init.headers);

  if (init.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  if (!headers.has('Accept')) {
    headers.set('Accept', 'application/json');
  }

  const controller = new AbortController();
  const timeout = setTimeout(
    () => controller.abort(),
    20_000,
  );

  const abortFromCaller = () => controller.abort();

  if (init.signal) {
    if (init.signal.aborted) {
      controller.abort();
    } else {
      init.signal.addEventListener(
        'abort',
        abortFromCaller,
        { once: true },
      );
    }
  }

  try {
    const response = await fetch(`${API_URL}${path}`, {
      ...init,
      credentials: 'include',
      headers,
      cache: init.cache ?? 'no-store',
      signal: controller.signal,
    });

    const raw = await response.text();

    let data: Record<string, unknown> = {};

    if (raw) {
      try {
        data = JSON.parse(raw) as Record<
          string,
          unknown
        >;
      } catch {
        if (!response.ok) {
          throw new Error(
            `API вернул ${response.status} вместо JSON`,
          );
        }

        return raw as T;
      }
    }

    if (!response.ok) {
      throw new Error(
        parseMessage(
          data,
          `Ошибка запроса: ${response.status}`,
        ),
      );
    }

    return data as T;
  } catch (cause) {
    if (
      cause instanceof Error &&
      cause.name === 'AbortError'
    ) {
      throw new Error(
        'Сервер не ответил за 20 секунд',
      );
    }

    throw cause;
  } finally {
    clearTimeout(timeout);

    init.signal?.removeEventListener(
      'abort',
      abortFromCaller,
    );
  }
}
