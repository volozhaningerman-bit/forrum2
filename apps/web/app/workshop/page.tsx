import {
  WorkshopClient,
  type Item,
} from './workshop-client';
import { serverApi } from '@/lib/server-api';

export const dynamic = 'force-dynamic';

export default async function WorkshopPage() {
  const items =
    (await serverApi<Item[]>('/workshop')) ?? [];

  return <WorkshopClient initialItems={items} />;
}
