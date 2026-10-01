import type { Metadata } from 'next';
import { requireUser, serverApi } from '@/lib/server-api';
import type { Community } from '@/components/home/types';
import { CuratorApplication } from './curator-application';

export const metadata: Metadata = { title: 'Стать куратором', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default async function CuratorsPage() {
  const me = await requireUser('/communities/curators');
  const communities = await serverApi<Community[]>('/communities');
  return <CuratorApplication communities={communities ?? []} verified={Boolean(me.user.emailVerified)}/>;
}
