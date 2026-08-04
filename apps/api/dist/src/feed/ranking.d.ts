export interface FeedScoreInput {
    mode: string;
    format: 'POST' | 'TOPIC';
    createdAtMs: number;
    lastActivityAtMs: number;
    nowMs: number;
    commentCount: number;
    reactionCount: number;
    bookmarkCount: number;
    viewCount: number;
    isCommunitySubscribed: boolean;
    isAuthorFollowed: boolean;
    matchingTagCount: number;
    isPinned: boolean;
}
export interface FeedScoreResult {
    score: number;
    reason: string;
    personallyRelevant: boolean;
    discussed: boolean;
}
export declare function calculateFeedScore(input: FeedScoreInput): FeedScoreResult;
