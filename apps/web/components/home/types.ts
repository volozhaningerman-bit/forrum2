import type { PublicationCardData } from '@/lib/types';

export type Community = {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription?: string | null;
  avatarUrl?: string | null;
  subscriberCount: number;
  publicationCount: number;
  recentPublicationCount?: number;
  lastActivityAt?: string | null;
  isSubscribed?: boolean;
  parent: { slug: string; name: string } | null;
};

export type WeeklyUser = {
  username: string;
  displayName: string;
  avatarUrl?: string | null;
  score: number;
  reactionCount: number;
  topicCount: number;
  commentCount: number;
  presenceCount?: number;
};

export type HomeDiscussedTopic = {
  id: string;
  slug: string;
  type: string;
  title: string | null;
  excerpt: string;
  viewCount: number;
  createdAt: string;
  lastActivityAt?: string;
  commentCount: number;
  reactionCount: number;
  viewerReaction?: string | null;
  author: {
    username: string;
    displayName: string;
    avatarUrl?: string | null;
  };
  community: {
    slug: string;
    name: string;
    accentColor?: string;
    avatarUrl?: string | null;
  };
  lastComment?: {
    createdAt: string;
    author: { username: string; displayName: string };
  } | null;
};

export type HomeOverview = {
  pulse?: {
    recentReplies: { id: string; excerpt?: string; createdAt: string; author: { username: string; displayName: string; avatarUrl?: string | null }; publication: { slug: string; title: string | null; community: { slug: string; name: string } } }[];
    activeTopics: { slug: string; title: string | null; replyCount: number }[];
  };
  discussed?: HomeDiscussedTopic[];
  stats: {
    communities: number;
    topics: number;
    messages: number;
    usersOnline: number;
    recordOnline: number;
    recordOnlineAt?: string | null;
  };
  weekly: {
    likes: WeeklyUser[];
    activity: WeeklyUser[];
  };
};

export type HomeInitialData = {
  communities?: Community[];
  announcements?: PublicationCardData[];
  feed?: PublicationCardData[];
  overview?: HomeOverview;
};
