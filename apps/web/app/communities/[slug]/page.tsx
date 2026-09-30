import type { Metadata } from 'next';
import { cache } from 'react';
import { notFound } from 'next/navigation';
import {
  CategoryPage,
  type Community,
} from './category-page';
import { serverApi } from '@/lib/server-api';

const loadCommunity = cache((slug: string) =>
  serverApi<Community>(`/communities/${encodeURIComponent(slug)}`),
);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = await loadCommunity(slug);
  if (!data) return { title: 'Сообщество не найдено', robots: { index: false, follow: false } };
  const description = (data.shortDescription || data.description || `Темы и обсуждения сообщества «${data.name}» на 4rrum.`).slice(0, 180);
  const canonical = `/communities/${encodeURIComponent(slug)}`;
  return {
    title: data.name,
    description,
    alternates: { canonical },
    openGraph: { url: canonical, title: data.name, description },
  };
}

export const dynamic = 'force-dynamic';

// FORRUM_CATEGORY_ROUTE_STAGE_1_V14
export default async function CategoryRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await loadCommunity(slug);

  if (!data) notFound();

  return (
    <CategoryPage
      slug={slug}
      initialData={data}
    />
  );
}
