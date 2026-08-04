export type LocalTrustLevel = 'NEW' | 'BASIC' | 'STABLE' | 'HIGH' | 'EXCEPTIONAL';
export type LocalTrustInput = {
    emailVerified: boolean;
    publicationCount: number;
    commentCount: number;
    helpfulReactionCount: number;
    bookmarkCount: number;
    activeRole: boolean;
};
export type LocalTrustResult = {
    level: LocalTrustLevel;
    label: string;
    detail: string;
    evidence: string[];
};
export declare function determineLocalTrust(input: LocalTrustInput): LocalTrustResult;
