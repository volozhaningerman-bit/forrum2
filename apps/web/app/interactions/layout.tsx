import { requireUser } from '@/lib/server-api';

// FORRUM_PROTECTED_ROUTE_V6
export default async function InteractionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireUser('/interactions');
  return children;
}
