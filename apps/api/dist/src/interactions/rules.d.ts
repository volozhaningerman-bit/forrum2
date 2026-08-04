export type InteractionStatusValue = 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
export declare function completionState(input: {
    creatorCompleted: boolean;
    counterpartCompleted: boolean;
}): InteractionStatusValue;
export declare function reviewAllowed(input: {
    status: InteractionStatusValue;
    participant: boolean;
    alreadyReviewed: boolean;
}): boolean;
