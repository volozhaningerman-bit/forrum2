export type InteractionStatusValue = 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';

export function completionState(input: { creatorCompleted: boolean; counterpartCompleted: boolean }): InteractionStatusValue {
  return input.creatorCompleted && input.counterpartCompleted ? 'COMPLETED' : 'CONFIRMED';
}

export function reviewAllowed(input: { status: InteractionStatusValue; participant: boolean; alreadyReviewed: boolean }) {
  return input.status === 'COMPLETED' && input.participant && !input.alreadyReviewed;
}
