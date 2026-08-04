export type VoteClassValue = 'ADVISORY' | 'BINDING';
export declare function determineVoteClass(input: {
    privileged: boolean;
    directlySubscribed: boolean;
    accountCreatedAt: Date;
    now?: Date;
    minimumAgeDays?: number;
}): VoteClassValue;
