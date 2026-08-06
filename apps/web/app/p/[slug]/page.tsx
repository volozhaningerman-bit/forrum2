import { notFound } from 'next/navigation';
import {
  PublicationClient,
  type Publication,
} from './publication-client';
import { serverApi } from '@/lib/server-api';

export const dynamic = 'force-dynamic';

export default async function PublicationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await serverApi<Publication>(
    `/publications/${encodeURIComponent(
      slug,
    )}?trackView=0`,
  );

  if (!data) notFound();

  return (
    <PublicationClient
      slug={slug}
      initialData={data}
    />
  );
}
