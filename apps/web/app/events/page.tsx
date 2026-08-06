import {
  EventsClient,
  type EventItem,
  type Poll,
} from './events-client';
import { serverApi } from '@/lib/server-api';
import type { PublicationCardData } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default async function EventsPage() {
  const [events, polls, announcements] =
    await Promise.all([
      serverApi<EventItem[]>('/events'),
      serverApi<Poll[]>('/governance/polls'),
      serverApi<PublicationCardData[]>(
        '/announcements',
      ),
    ]);

  return (
    <EventsClient
      initialEvents={events ?? []}
      initialPolls={polls ?? []}
      initialAnnouncements={announcements ?? []}
    />
  );
}
