import {
  HomeDashboard,
  type HomeInitialData,
} from '@/components/home-dashboard';

export const dynamic = 'force-dynamic';

function apiBase() {
  const raw =
    process.env.API_INTERNAL_URL ??
    process.env.PUBLIC_API_URL;

  if (!raw) return null;

  const normalized = raw.replace(/\/+$/, '');

  return normalized.endsWith('/v1')
    ? normalized
    : `${normalized}/v1`;
}

async function publicApi<T>(path: string) {
  const base = apiBase();

  if (!base) return undefined;

  try {
    const response = await fetch(`${base}${path}`, {
      cache: 'no-store',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) return undefined;

    return (await response.json()) as T;
  } catch {
    return undefined;
  }
}

export default async function Home() {
  const [
    communities,
    events,
    polls,
    announcements,
    workshop,
    feed,
  ] = await Promise.all([
    publicApi<HomeInitialData['communities']>(
      '/communities',
    ),
    publicApi<HomeInitialData['events']>('/events'),
    publicApi<HomeInitialData['polls']>(
      '/governance/polls',
    ),
    publicApi<HomeInitialData['announcements']>(
      '/announcements',
    ),
    publicApi<HomeInitialData['workshop']>(
      '/workshop',
    ),
    publicApi<HomeInitialData['feed']>(
      '/feed?mode=new',
    ),
  ]);

  return (
    <HomeDashboard
      initialData={{
        communities,
        events,
        polls,
        announcements,
        workshop,
        feed,
      }}
    />
  );
}
