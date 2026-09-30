import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { notFound } from 'next/navigation';
import {
  ProfileClient,
  type Profile,
} from './profile-client';
import {
  InventoryPanel,
  type PublicInventory,
} from './inventory-panel';
import { serverApi } from '@/lib/server-api';
import type { Me } from '@/lib/types';
import { canonicalPath, metadataText } from '@/lib/public-metadata';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> {
  const { username } = await params;
  const data = await serverApi<Profile>(`/users/${encodeURIComponent(username)}`);
  if (!data) return { title: 'Пользователь не найден', robots: { index: false, follow: false } };

  const title = metadataText(data.displayName, username, 80);
  const description = metadataText(data.bio, `Профиль @${data.username} на 4rrum.`, 180);
  const url = canonicalPath('u', username);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'profile',
      url,
      title,
      description,
      images: data.avatarUrl ? [{ url: data.avatarUrl, alt: data.displayName }] : undefined,
    },
    twitter: { card: data.avatarUrl ? 'summary_large_image' : 'summary', title, description, images: data.avatarUrl ? [data.avatarUrl] : undefined },
  };
}

type InventoryStyle = CSSProperties & {
  '--inventory-nick-color'?: string;
  '--inventory-hashtag-color'?: string;
  '--inventory-hashtag-background'?: string;
  '--inventory-hashtag-border'?: string;
  '--inventory-profile-background'?: string;
  '--inventory-avatar-frame'?: string;
};

function equippedStyle(inventory: PublicInventory): InventoryStyle {
  const equipped = (type: string) =>
    inventory.items.find(
      (item) => item.equipped && item.definition.type === type,
    )?.definition.style ?? {};

  const nick = equipped('NICK_COLOR');
  const hashtag = equipped('HASHTAG_COLOR');
  const profile = equipped('PROFILE_BACKGROUND');
  const frame = equipped('AVATAR_FRAME');

  return {
    '--inventory-nick-color': nick.color ?? 'inherit',
    '--inventory-hashtag-color': hashtag.color ?? 'inherit',
    '--inventory-hashtag-background': hashtag.background ?? 'transparent',
    '--inventory-hashtag-border': hashtag.border ?? 'transparent',
    '--inventory-profile-background': profile.background ?? 'none',
    '--inventory-avatar-frame': frame.boxShadow ?? 'none',
  };
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const [data, inventory, me] = await Promise.all([
    serverApi<Profile>(`/users/${encodeURIComponent(username)}`),
    serverApi<PublicInventory>(
      `/inventory/users/${encodeURIComponent(username)}`,
    ),
    serverApi<Me>('/auth/me'),
  ]);

  if (!data) notFound();

  const safeInventory: PublicInventory =
    inventory ?? {
      owner: {
        username,
        displayName: username,
        avatarUrl: null,
      },
      items: [],
    };

  return (
    <div
      className="profile-inventory-shell"
      data-inventory-profile={username}
      style={equippedStyle(safeInventory)}
    >
      <ProfileClient
        username={username}
        initialData={data}
      />
      <InventoryPanel
        username={username}
        initialData={safeInventory}
        canManage={me?.user.username === username}
      />
    </div>
  );
}
