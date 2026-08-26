import {
  HomeDashboard,
  type HomeInitialData,
} from '@/components/home-dashboard';

export const dynamic = 'force-dynamic';

function normalizeApiBase(value: string) {
  const trimmed = value.trim().replace(/\/+$/, '');
  const withProtocol = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;

  return withProtocol.endsWith('/v1')
    ? withProtocol
    : `${withProtocol}/v1`;
}

function resolveApiBase() {
  const internal = process.env.API_INTERNAL_URL?.trim();

  if (internal) {
    return normalizeApiBase(internal);
  }

  const publicApi =
    process.env.PUBLIC_API_URL?.trim() ||
    process.env.NEXT_PUBLIC_API_URL?.trim();

  if (publicApi) {
    return normalizeApiBase(publicApi);
  }

  return 'http://127.0.0.1:4000/v1';
}

async function publicApi<T>(path: string) {
  const controller = new AbortController();
  const timeout = setTimeout(
    () => controller.abort(),
    12_000,
  );

  try {
    const response = await fetch(
      `${resolveApiBase()}${path}`,
      {
        cache: 'no-store',
        headers: {
          Accept: 'application/json',
        },
        signal: controller.signal,
      },
    );

    if (!response.ok) return undefined;

    return (await response.json()) as T;
  } catch {
    return undefined;
  } finally {
    clearTimeout(timeout);
  }
}

export default async function Home() {
  const [
    communities,
    polls,
    announcements,
    feed,
    newFeed,
  ] = await Promise.all([
    publicApi<HomeInitialData['communities']>(
      '/communities',
    ),
    publicApi<HomeInitialData['polls']>(
      '/governance/polls',
    ),
    publicApi<HomeInitialData['announcements']>(
      '/announcements',
    ),
    publicApi<HomeInitialData['feed']>(
      '/feed?mode=popular',
    ),
    publicApi<HomeInitialData['newFeed']>(
      '/feed?mode=new',
    ),
  ]);

  return (
    <HomeDashboard
      initialData={{
        communities,
        polls,
        announcements,
        feed,
        newFeed,
      }}
    />
  );
}
