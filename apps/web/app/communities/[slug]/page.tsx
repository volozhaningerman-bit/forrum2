import { notFound } from 'next/navigation';
import {
  CommunityClient,
  type Community,
} from './community-client';
import { serverApi } from '@/lib/server-api';

export const dynamic = 'force-dynamic';

export default async function CommunityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await serverApi<Community>(
    `/communities/${encodeURIComponent(slug)}`,
  );

  if (!data) notFound();

  return (
    <CommunityClient
      slug={slug}
      initialData={data}
    />
  );
}
