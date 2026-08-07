import {
  HomeDashboard,
  type HomeInitialData,
} from '@/components/home-dashboard';
import { resolveApiBase } from '@/lib/api-base';

export const dynamic = 'force-dynamic';

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
    events,
    polls,
    announcements,
    workshop,
    feed,
    newFeed,
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
        events,
        polls,
        announcements,
        workshop,
        feed,
        newFeed,
      }}
    />
  );
}
