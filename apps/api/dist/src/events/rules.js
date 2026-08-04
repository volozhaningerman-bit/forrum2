export function canAttendEvent(input) {
    const now = input.now ?? new Date();
    if (!input.published || input.startsAt <= now)
        return { allowed: false, reason: 'closed' };
    if (input.capacity !== null && input.goingCount >= input.capacity && !input.alreadyGoing)
        return { allowed: false, reason: 'full' };
    return { allowed: true, reason: null };
}
//# sourceMappingURL=rules.js.map