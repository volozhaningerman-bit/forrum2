export type AccountState = 'UNVERIFIED' | 'VERIFIED' | 'SUSPENDED';
export type PublicationFormat = 'POST' | 'TOPIC';
export type PublicationType = 'DISCUSSION' | 'QUESTION' | 'NEWS' | 'GUIDE' | 'PROJECT' | 'SERVICE' | 'CASE' | 'ANNOUNCEMENT';

export interface PublicUser {
  id: string;
  forrumId: number;
  username: string;
  displayName: string;
  emailVerified: boolean;
  avatarUrl?: string | null;
}

export interface CommunitySummary {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  subscriberCount: number;
  isSubscribed: boolean;
}

export interface PublicationSummary {
  id: string;
  slug: string;
  format: PublicationFormat;
  type: PublicationType;
  title?: string | null;
  excerpt: string;
  commentCount: number;
  reactionCount: number;
  reason?: string;
  author: Pick<PublicUser, 'username' | 'displayName' | 'avatarUrl'>;
  community: Pick<CommunitySummary, 'slug' | 'name'>;
  createdAt: string;
  lastActivityAt: string;
}


export type LocalTrustLevel = 'NEW' | 'BASIC' | 'STABLE' | 'HIGH' | 'EXCEPTIONAL';
export type InteractionType = 'SERVICE' | 'PROJECT' | 'DEAL' | 'HELP';
export type InteractionStatus = 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
export type ReviewVerdict = 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';

export interface LocalTrustSummary {
  level: LocalTrustLevel;
  label: string;
  detail: string;
  evidence: string[];
}

export interface VerifiedReviewSummary {
  positive: number;
  neutral: number;
  negative: number;
  total: number;
}
