import type { Metadata } from 'next';
import { cache } from 'react';
import { notFound } from 'next/navigation';
import {
  PublicationClient,
  type Publication,
} from './publication-client';
import { serverApi } from '@/lib/server-api';

const loadPublication = cache((slug: string) =>
  serverApi<Publication>(`/publications/${encodeURIComponent(slug)}?trackView=0`),
);

function publicationDescription(data: Publication) {
  const plain = data.body.replace(/\[[^\]]+\]/g, ' ').replace(/\s+/g, ' ').trim();
  return plain.slice(0, 180) || `Обсуждение в разделе «${data.community.name}» на 4rrum.`;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = await loadPublication(slug);
  if (!data) return { title: 'Тема не найдена', robots: { index: false, follow: false } };
  const title = data.title?.trim() || 'Обсуждение';
  const description = publicationDescription(data);
  const canonical = `/p/${encodeURIComponent(slug)}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { url: canonical, type: 'article', title, description },
  };
}

export const dynamic = 'force-dynamic';

export default async function PublicationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await loadPublication(slug);

  if (!data) notFound();

  return (
    <PublicationClient
      slug={slug}
      initialData={data}
    />
  );
}
