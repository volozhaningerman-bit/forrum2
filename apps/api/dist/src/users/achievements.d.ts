export declare const achievementDefinitions: readonly [{
    readonly code: "VERIFIED_ACCOUNT";
    readonly title: "Подтверждённый аккаунт";
    readonly description: "Почта подтверждена, а аккаунт получил полный доступ к участию.";
    readonly icon: "✓";
    readonly category: "ACCOUNT";
    readonly sortOrder: 10;
    readonly automatic: true;
}, {
    readonly code: "FIRST_PUBLICATION";
    readonly title: "Первый материал";
    readonly description: "Опубликован первый пост или постоянная тема.";
    readonly icon: "✦";
    readonly category: "CONTRIBUTION";
    readonly sortOrder: 20;
    readonly automatic: true;
}, {
    readonly code: "DISCUSSION_PARTICIPANT";
    readonly title: "Участник обсуждений";
    readonly description: "Оставлено не меньше десяти видимых ответов.";
    readonly icon: "●";
    readonly category: "CONTRIBUTION";
    readonly sortOrder: 30;
    readonly automatic: true;
}, {
    readonly code: "HELPFUL_AUTHOR";
    readonly title: "Полезный автор";
    readonly description: "Материалы и ответы получили реакции «Полезно» или «Спасибо».";
    readonly icon: "◆";
    readonly category: "CONTRIBUTION";
    readonly sortOrder: 40;
    readonly automatic: true;
}, {
    readonly code: "COMMUNITY_TEAM";
    readonly title: "Команда сообщества";
    readonly description: "Пользователь получил подтверждённую роль в команде сообщества.";
    readonly icon: "◈";
    readonly category: "COMMUNITY";
    readonly sortOrder: 50;
    readonly automatic: true;
}, {
    readonly code: "EARLY_TESTER";
    readonly title: "Первый участник";
    readonly description: "Помогал тестировать FORRUM до публичного запуска.";
    readonly icon: "★";
    readonly category: "SPECIAL";
    readonly sortOrder: 100;
    readonly automatic: false;
}];
export type AchievementFacts = {
    emailVerified: boolean;
    publicationCount: number;
    commentCount: number;
    helpfulReactionCount: number;
    activeRoles: Array<{
        communityId: string;
        communityName: string;
        role: string;
    }>;
};
export type AchievementCandidate = {
    code: string;
    scopeKey: string;
    communityId?: string;
    sourceType: string;
    sourceId?: string;
    metadata?: Record<string, string | number | boolean | null>;
};
export declare function automaticAchievementCandidates(facts: AchievementFacts): AchievementCandidate[];
