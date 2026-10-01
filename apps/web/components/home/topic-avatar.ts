const topicAvatarPresets = [
 '/forrum-assets/avatar-friend.svg',
 '/forrum-assets/avatar-nora.svg',
 '/forrum-assets/avatar-pixel.svg',
 '/forrum-assets/avatar-volog.svg',
 '/forrum-assets/avatar-maxstream.svg',
 '/forrum-assets/avatar-workspace.svg',
 '/forrum-assets/avatar-sculpture.svg',
 '/forrum-assets/avatar-owner.svg',
] as const;

export function topicAvatarUrl(author: { username: string; displayName: string; avatarUrl?: string | null }) {
 if (author.avatarUrl) return author.avatarUrl;
 const identity = `${author.username} ${author.displayName}`.toLowerCase();
 if (/maxstream|макс\s+стрим/.test(identity)) return '/forrum-assets/avatar-maxstream.svg';
 if (/nora|нора\s+веб/.test(identity)) return '/forrum-assets/avatar-nora.svg';
 if (/pixel|пиксел/.test(identity)) return '/forrum-assets/avatar-pixel.svg';
 if (/volog/.test(identity)) return '/forrum-assets/avatar-volog.svg';
 let hash = 0;
 for (const char of author.username || author.displayName) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
 return topicAvatarPresets[hash % topicAvatarPresets.length];
}

