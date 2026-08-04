export function completionState(input) {
    return input.creatorCompleted && input.counterpartCompleted ? 'COMPLETED' : 'CONFIRMED';
}
export function reviewAllowed(input) {
    return input.status === 'COMPLETED' && input.participant && !input.alreadyReviewed;
}
//# sourceMappingURL=rules.js.map