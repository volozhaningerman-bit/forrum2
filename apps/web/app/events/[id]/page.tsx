import { notFound } from 'next/navigation';
import {
  EventDetailClient,
  type EventDetail,
} from './event-detail-client';
import { serverApi } from '@/lib/server-api';

export const dynamic = 'force-dynamic';

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
