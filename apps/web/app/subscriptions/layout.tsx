import { requireUser } from '@/lib/server-api';

// FORRUM_PROTECTED_ROUTE_V6
export default async function SubscriptionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireUser('/subscriptions');
  return children;
}
