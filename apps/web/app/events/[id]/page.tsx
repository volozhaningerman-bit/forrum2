import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  EventDetailClient,
  type EventDetail,
} from './event-detail-client';
import { serverApi } from '@/lib/server-api';
import { canonicalPath, metadataText } from '@/lib/public-metadata';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const data = await serverApi<EventDetail>(`/events/${encodeURIComponent(id)}`);
  if (!data) return { title: 'Событие не найдено', robots: { index: false, follow: false } };

  const title = metadataText(data.title, 'Событие на 4rrum', 80);
  const description = metadataText(data.description, `Событие сообщества ${data.community.name} на 4rrum.`, 180);
  const url = canonicalPath('events', id);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: 'website', url, title, description },
    twitter: { card: 'summary', title, description },
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await serverApi<EventDetail>(
    `/events/${encodeURIComponent(id)}`,
  );

  if (!data) notFound();

  return (
    <EventDetailClient
      id={id}
      initialData={data}
    />
  );
}
