import { requireUser } from '@/lib/server-api';

// FORRUM_PROTECTED_ROUTE_V6
export default async function SavedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireUser('/saved');
  return children;
}
