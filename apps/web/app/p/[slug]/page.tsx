import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  PublicationClient,
  type Publication,
} from './publication-client';
import { serverApi } from '@/lib/server-api';
import { canonicalPath, metadataText } from '@/lib/public-metadata';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await serverApi<Publication>(
    `/publications/${encodeURIComponent(slug)}?trackView=0`,
  );
  if (!data) return { title: 'Материал не найден', robots: { index: false, follow: false } };

  const title = metadataText(data.title, 'Обсуждение на 4rrum', 80);
  const description = metadataText(data.body, `Обсуждение в разделе ${data.community.name} на 4rrum.`, 180);
  const url = canonicalPath('p', slug);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title,
      description,
      publishedTime: data.createdAt,
      modifiedTime: data.updatedAt,
      authors: [data.author.displayName],
      section: data.community.name,
    },
    twitter: { card: 'summary', title, description },
  };
}

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
