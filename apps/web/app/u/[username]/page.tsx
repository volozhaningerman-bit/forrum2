import { notFound } from 'next/navigation';
import {
  ProfileClient,
  type Profile,
} from './profile-client';
import { serverApi } from '@/lib/server-api';

export const dynamic = 'force-dynamic';

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const data = await serverApi<Profile>(
    `/users/${encodeURIComponent(username)}`,
  );

  if (!data) notFound();

  return (
    <ProfileClient
      username={username}
      initialData={data}
    />
  );
}
