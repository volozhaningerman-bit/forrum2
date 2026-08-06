import { requireUser } from '@/lib/server-api';

// FORRUM_PROTECTED_ROUTE_V6
export default async function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireUser('/settings');
  return children;
}
