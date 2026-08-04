const labels = {
    NEW: 'Новое',
    BASIC: 'Базовое',
    STABLE: 'Устойчивое',
    HIGH: 'Высокое',
    EXCEPTIONAL: 'Исключительное',
};
export function determineLocalTrust(input) {
    const contributionCount = input.publicationCount + input.commentCount;
    let level = 'NEW';
    if (input.activeRole && contributionCount >= 20 && input.helpfulReactionCount >= 15)
        level = 'EXCEPTIONAL';
    else if ((input.activeRole && contributionCount >= 8) || (input.publicationCount >= 3 && input.helpfulReactionCount >= 10))
        level = 'HIGH';
    else if (contributionCount >= 6 || input.helpfulReactionCount >= 3 || input.bookmarkCount >= 5)
        level = 'STABLE';
    else if (input.emailVerified && contributionCount >= 1)
        level = 'BASIC';
    const evidence = [];
    if (input.publicationCount)
        evidence.push(`${input.publicationCount} публикац${input.publicationCount === 1 ? 'ия' : 'ий'}`);
    if (input.commentCount)
        evidence.push(`${input.commentCount} ответов в обсуждениях`);
    if (input.helpfulReactionCount)
        evidence.push(`${input.helpfulReactionCount} реакций «Полезно» и «Спасибо»`);
    if (input.bookmarkCount)
        evidence.push(`${input.bookmarkCount} сохранений материалов`);
    if (input.activeRole)
        evidence.push('действующая роль в команде');
    const detail = level === 'NEW'
        ? 'В этом сообществе пока недостаточно видимой истории участия.'
        : level === 'BASIC'
            ? 'Есть подтверждённый аккаунт и первый видимый вклад.'
            : level === 'STABLE'
                ? 'Есть повторяющийся вклад, который замечают другие участники.'
                : level === 'HIGH'
                    ? 'Заметный подтверждённый вклад и устойчивая история участия.'
                    : 'Длительный сильный вклад и ответственность внутри сообщества.';
    return { level, label: labels[level], detail, evidence };
}
//# sourceMappingURL=trust.js.map