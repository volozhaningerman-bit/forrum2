import {
  HomeDashboard,
  type HomeInitialData,
} from '@/components/reference-home';
import { cookies } from 'next/headers';
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
          Cookie: (await cookies()).toString(),
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
  const [communities, announcements, feed, overview] = await Promise.all([
    publicApi<HomeInitialData['communities']>('/communities'),
    publicApi<HomeInitialData['announcements']>('/announcements'),
    publicApi<HomeInitialData['feed']>('/feed?mode=all'),
    publicApi<HomeInitialData['overview']>('/home/overview'),
  ]);
  return <HomeDashboard initialData={{ communities, announcements, feed, overview }}/>;
}
