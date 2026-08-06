import {
  MediaClient,
  type Partner,
} from './media-client';
import { serverApi } from '@/lib/server-api';
import type { PublicationCardData } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default async function MediaPage() {
  const [partners, materials] =
    await Promise.all([
      serverApi<Partner[]>('/media/partners'),
      serverApi<PublicationCardData[]>('/news'),
    ]);

  return (
    <MediaClient
      initialPartners={partners ?? []}
      initialMaterials={materials ?? []}
    />
  );
}
