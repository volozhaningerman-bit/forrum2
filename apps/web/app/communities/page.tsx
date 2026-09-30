import type { Metadata } from 'next';
import {
  CommunitiesClient,
  type Community,
} from './communities-client';
import { serverApi } from '@/lib/server-api';
export const metadata: Metadata = {
  title: 'Сообщества',
  description: 'Каталог сообществ 4rrum: разделы, темы и актуальная активность.',
  alternates: { canonical: '/communities' },
  openGraph: { url: '/communities', title: 'Сообщества', description: 'Каталог сообществ 4rrum: разделы, темы и актуальная активность.' },
};


export const dynamic = 'force-dynamic';

export default async function CommunitiesPage() {
  const items =
    (await serverApi<Community[]>(
      '/communities',
    )) ?? [];

  return (
    <CommunitiesClient initialItems={items} />
  );
}
