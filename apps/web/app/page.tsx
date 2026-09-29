import './home-v51.css';
import './home-alpha.css';
import {
  HomeDashboard,
  type HomeInitialData,
} from '@/components/reference-home';
import { cookies } from 'next/headers';
import { resolveApiBase } from '@/lib/api-base';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

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

const homeStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: '4rrum',
  alternateName: '4RRUM',
  url: 'https://4rrum.ru/',
  inLanguage: 'ru',
  description: 'Форум о технологиях, проектах, сообществах и практическом опыте.',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://4rrum.ru/search?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

export default async function Home() {
  const [communities, announcements, feed, overview, events] = await Promise.all([
    publicApi<HomeInitialData['communities']>('/communities'),
    publicApi<HomeInitialData['announcements']>('/announcements'),
    publicApi<HomeInitialData['feed']>('/feed?mode=new&browse=1'),
    publicApi<HomeInitialData['overview']>('/home/overview'),
    publicApi<HomeInitialData['events']>('/events'),
  ]);
  return <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(homeStructuredData).replace(/</g, '\\u003c') }}
    />
    <HomeDashboard initialData={{ communities, announcements, feed, overview, events }}/>
  </>;
}
