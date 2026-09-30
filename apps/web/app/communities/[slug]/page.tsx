import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  CategoryPage,
  type Community,
} from './category-page';
import { serverApi } from '@/lib/server-api';
import { canonicalPath, metadataText } from '@/lib/public-metadata';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await serverApi<Community>(`/communities/${encodeURIComponent(slug)}`);
  if (!data) return { title: 'Сообщество не найдено', robots: { index: false, follow: false } };

  const title = metadataText(data.name, 'Сообщество', 80);
  const description = metadataText(data.description || data.shortDescription, `Сообщество ${data.name} на 4rrum.`, 180);
  const url = canonicalPath('communities', slug);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: 'website', url, title, description },
    twitter: { card: 'summary', title, description },
  };
}

// FORRUM_CATEGORY_ROUTE_STAGE_1_V14
export default async function CategoryRoute({
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
    <CategoryPage
      slug={slug}
      initialData={data}
    />
  );
}
