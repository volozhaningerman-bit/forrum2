import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { resolveApiBase } from '@/lib/api-base';
import type { Me } from '@/lib/types';

type ServerApiOptions = {
  timeoutMs?: number;
};

export async function serverApi<T>(
  path: string,
  options: ServerApiOptions = {},
): Promise<T | null> {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join('; ');

  const controller = new AbortController();
  const timeout = setTimeout(
    () => controller.abort(),
    options.timeoutMs ?? 15_000,
  );

  try {
    const response = await fetch(
      `${resolveApiBase()}${path}`,
      {
        cache: 'no-store',
        headers: {
          Accept: 'application/json',
          ...(cookieHeader
            ? { Cookie: cookieHeader }
            : {}),
        },
        signal: controller.signal,
      },
    );

    if (
      response.status === 401 ||
      response.status === 404
    ) {
      return null;
    }

    if (!response.ok) {
      throw new Error(
        `API ${path} вернул статус ${response.status}`,
      );
    }

    return (await response.json()) as T;
  } catch (cause) {
    if (
      cause instanceof Error &&
      cause.name === 'AbortError'
    ) {
      throw new Error(
        `API ${path} не ответил за ${
          options.timeoutMs ?? 15_000
        } мс`,
      );
    }

    throw cause;
  } finally {
    clearTimeout(timeout);
  }
}

export async function requireUser(nextPath: string) {
  const me = await serverApi<Me>('/auth/me');

  if (!me) {
    redirect(
      `/login?next=${encodeURIComponent(nextPath)}`,
    );
  }

  return me;
}
