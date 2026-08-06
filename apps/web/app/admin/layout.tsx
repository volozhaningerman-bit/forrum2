import { redirect } from 'next/navigation';
import { requireUser } from '@/lib/server-api';

// FORRUM_ADMIN_ROUTE_V6
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const me = await requireUser('/admin');

  if (!['OWNER', 'ADMIN'].includes(me.user.role)) {
    redirect('/');
  }

  return children;
}
