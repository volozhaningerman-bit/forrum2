export function canAttendEvent(input: {
  published: boolean;
  startsAt: Date;
  now?: Date;
  goingCount: number;
  capacity: number | null;
  alreadyGoing: boolean;
}) {
  const now = input.now ?? new Date();
  if (!input.published || input.startsAt <= now) return { allowed: false, reason: 'closed' as const };
  if (input.capacity !== null && input.goingCount >= input.capacity && !input.alreadyGoing) return { allowed: false, reason: 'full' as const };
  return { allowed: true, reason: null };
}
