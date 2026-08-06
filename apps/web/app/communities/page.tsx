import {
  CommunitiesClient,
  type Community,
} from './communities-client';
import { serverApi } from '@/lib/server-api';

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
