export type Tag = {
  id: string;
  slug: string;
  label: string;
  styleEnabled: boolean;
  backgroundColor: string;
  textColor: string;
  borderColor: string;
};

export type PublicationCardData = {
  id: string;
  slug: string;
  format: 'POST' | 'TOPIC';
  type: string;
  title: string | null;
  excerpt: string;
  viewCount?: number;
  createdAt: string;
  savedAt?: string;
  lastActivityAt?: string;
  lastComment?: {
    createdAt: string;
    author: {
      username: string;
      displayName: string;
      avatarUrl?: string | null;
    };
  } | null;
  pinnedUntil?: string | null;
  reason?: string | null;
  feedbackEnabled?: boolean;
  recentCommentCount?: number;
  author: {
    username: string;
    displayName: string;
    avatarUrl?: string | null;
    forrumId?: number;
  };
  community: {
    slug: string;
    name: string;
    accentColor?: string;
    avatarUrl?: string | null;
    coverUrl?: string | null;
  };
  commentCount: number;
  reactionCount: number;
  bookmarkCount?: number;
  viewerReaction?: string | null;
  isBookmarked?: boolean;
  tags: Tag[];
  inheritedFromChild?: boolean;
};

export type Me = {
  user: {
    id: string;
    email: string;
    forrumId: number;
    username: string;
    displayName: string;
    avatarUrl?: string | null;
    emailVerified: boolean;
    onboardingCompleted: boolean;
    role: 'USER' | 'ADMIN' | 'OWNER';
  };
};
