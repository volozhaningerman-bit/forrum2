export function determineVoteClass(input) {
    if (input.privileged)
        return 'BINDING';
    const now = input.now ?? new Date();
    const minimumAgeDays = input.minimumAgeDays ?? 14;
    const oldEnough = input.accountCreatedAt.getTime() <= now.getTime() - minimumAgeDays * 86_400_000;
    return input.directlySubscribed && oldEnough ? 'BINDING' : 'ADVISORY';
}
//# sourceMappingURL=rules.js.map