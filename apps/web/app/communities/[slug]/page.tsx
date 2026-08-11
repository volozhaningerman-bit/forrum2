import { notFound } from 'next/navigation';
import {
  CategoryPage,
  type Community,
} from './category-page';
import { serverApi } from '@/lib/server-api';

export const dynamic = 'force-dynamic';

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
