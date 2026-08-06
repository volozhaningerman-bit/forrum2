import {
  ProposalsClient,
  type Proposal,
} from './proposals-client';
import { serverApi } from '@/lib/server-api';
import type { Me } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default async function ProposalsPage() {
  const [items, me] = await Promise.all([
    serverApi<Proposal[]>(
      '/governance/proposals',
    ),
    serverApi<Me>('/auth/me'),
  ]);

  return (
    <ProposalsClient
      initialItems={items ?? []}
      initialMe={me}
    />
  );
}
