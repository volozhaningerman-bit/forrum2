import type { Metadata } from 'next';
import './home-alpha.css';
import {
  HomeDashboard,
  type HomeInitialData,
} from '@/components/reference-home';
import { cookies } from 'next/headers';
import { resolveApiBase } from '@/lib/api-base';

export const metadata: Metadata = {
  title: '4rrum — технологии, люди, идеи',
  description: 'Форум о технологиях, сообществах, проектах и практическом опыте. Обсуждения, вопросы, идеи и живое общение.',
  alternates: { canonical: '/' },
  openGraph: {
    url: '/',
    title: '4rrum — технологии, люди, идеи',
    description: 'Форум о технологиях, сообществах, проектах и практическом опыте.',
  },
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

async function publicApi<T>(path: string) {
  const controller = new AbortController();
  const timeout = setTimeout(
    () => controller.abort(),
    4_000,
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
    publicApi<HomeInitialData['feed']>('/feed?mode=new&browse=1'),
    publicApi<HomeInitialData['overview']>('/home/overview'),
  ]);

  // Events are not rendered on the homepage. Keep the contract stable without
  // spending an extra origin round-trip on every request.
  return <HomeDashboard initialData={{ communities, announcements, feed, overview, events: [] }}/>;

}
