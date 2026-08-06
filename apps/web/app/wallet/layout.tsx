import { requireUser } from '@/lib/server-api';

// FORRUM_PROTECTED_ROUTE_V6
export default async function WalletLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireUser('/wallet');
  return children;
}
