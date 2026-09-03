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

export type TreeNode = Community & { children: TreeNode[] };

export type PollOption = {
  id: string;
  label: string;
  position?: number;
  bindingVotes: number;
  advisoryVotes: number;
};

export type PollItem = {
  id: string;
  title: string;
  description?: string;
  kind?: string;
  closesAt: string;
  status: string;
  createdAt?: string;
  options?: PollOption[];
  community: {
    slug: string;
    name: string;
    accentColor?: string;
    avatarUrl?: string | null;
  };
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

export type DiscussedTopicData =
  | PublicationCardData
  | HomeDiscussedTopic;

export type TopicPulse = 'rising' | 'hot';

export type TopicStatus =
  | 'waiting'
  | 'answered'
  | TopicPulse;

export type TopicSignal = {
  status: TopicStatus;
  label: string;
};

export type HomeMediaPartner = {
  id: string;
  type: string;
  displayName: string;
  platform: string;
  channelUrl: string;
  user: {
    username: string;
    displayName: string;
    avatarUrl: string | null;
  };
};

export type HomeService = {
  id: string;
  kind: 'PROJECT' | 'SERVICE';
  status: string;
  title: string;
  summary: string;
  priceText: string | null;
  updatedAt: string;
  interactionCount: number;
  owner: {
    username: string;
    displayName: string;
    avatarUrl: string | null;
  };
  community: {
    slug: string;
    name: string;
    accentColor: string;
  } | null;
  publication: {
    slug: string;
    title: string | null;
  } | null;
};

export type HomeOverview = {
  discussed?: HomeDiscussedTopic[];
  activePolls?: PollItem[];
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
  polls?: PollItem[];
  announcements?: PublicationCardData[];
  feed?: PublicationCardData[];
  activityFeed?: PublicationCardData[];
  overview?: HomeOverview;
  mediaPartners?: HomeMediaPartner[];
  mediaMaterials?: PublicationCardData[];
  services?: HomeService[];
};
