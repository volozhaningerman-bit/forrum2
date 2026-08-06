export function calculateFeedScore(input) {
    const recentCommentCount = input.recentCommentCount ?? 0;
    const ageHours = Math.max(0, (input.nowMs - input.createdAtMs) / 3_600_000);
    const activityHours = Math.max(0, (input.nowMs - input.lastActivityAtMs) / 3_600_000);
    const engagementRaw = input.commentCount * 3 +
        input.reactionCount * 2 +
        input.bookmarkCount * 2 +
        input.viewCount / 30;
    const engagement = Math.min(48, Math.log1p(engagementRaw) * 10);
    const freshness = input.format === 'POST'
        ? Math.max(0, 38 - ageHours * 0.65)
        : Math.max(0, 32 - activityHours * 0.22);
    const subscription = input.isCommunitySubscribed ? 55 : 0;
    const authorFollow = input.isAuthorFollowed ? 34 : 0;
    const tagAffinity = Math.min(28, input.matchingTagCount * 14);
    const popularBonus = input.commentCount >= 5 ? 8 : 0;
    const pinBonus = input.isPinned ? 10 : 0;
    const personallyRelevant = Boolean(subscription || authorFollow || tagAffinity);
    const discussed = recentCommentCount >= 2 ||
        engagement >= 20 ||
        input.commentCount >= 3 ||
        input.reactionCount >= 4 ||
        input.bookmarkCount >= 2;
    const reason = recentCommentCount >= 3
        ? 'Активно обсуждается сегодня'
        : subscription
            ? 'Вы подписаны на сообщество'
            : authorFollow
                ? 'Вы подписаны на автора'
                : tagAffinity
                    ? 'Совпадает с вашими хэштегами'
                    : engagement >= 25
                        ? 'Популярно и обсуждается'
                        : 'Новое на FORRUM';
    if (input.mode === 'new') {
        return {
            score: input.createdAtMs,
            reason: 'Новое на FORRUM',
            personallyRelevant,
            discussed,
        };
    }
    if (input.mode === 'popular') {
        const dailyDiscussion = recentCommentCount * 160;
        const ongoingDiscussion = Math.min(input.commentCount, 50) * 7;
        const recentActivity = Math.max(0, 72 - activityHours * 3);
        const supportingSignals = input.reactionCount * 3 +
            input.bookmarkCount * 2 +
            Math.log1p(input.viewCount) * 2;
        return {
            score: dailyDiscussion +
                ongoingDiscussion +
                recentActivity +
                supportingSignals,
            reason,
            personallyRelevant,
            discussed,
        };
    }
    return {
        score: subscription +
            authorFollow +
            tagAffinity +
            engagement +
            freshness +
            popularBonus +
            pinBonus,
        reason,
        personallyRelevant,
        discussed,
    };
}
//# sourceMappingURL=ranking.js.map