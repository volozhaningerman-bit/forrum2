export const achievementDefinitions = [
  { code: 'VERIFIED_ACCOUNT', title: 'Подтверждённый аккаунт', description: 'Почта подтверждена, а аккаунт получил полный доступ к участию.', icon: '✓', category: 'ACCOUNT', sortOrder: 10, automatic: true },
  { code: 'FIRST_PUBLICATION', title: 'Первый материал', description: 'Опубликован первый пост или постоянная тема.', icon: '✦', category: 'CONTRIBUTION', sortOrder: 20, automatic: true },
  { code: 'DISCUSSION_PARTICIPANT', title: 'Участник обсуждений', description: 'Оставлено не меньше десяти видимых ответов.', icon: '●', category: 'CONTRIBUTION', sortOrder: 30, automatic: true },
  { code: 'HELPFUL_AUTHOR', title: 'Полезный автор', description: 'Материалы и ответы получили реакции «Полезно» или «Спасибо».', icon: '◆', category: 'CONTRIBUTION', sortOrder: 40, automatic: true },
  { code: 'COMMUNITY_TEAM', title: 'Команда сообщества', description: 'Пользователь получил подтверждённую роль в команде сообщества.', icon: '◈', category: 'COMMUNITY', sortOrder: 50, automatic: true },
  { code: 'EARLY_TESTER', title: 'Первый участник', description: 'Помогал тестировать FORRUM до публичного запуска.', icon: '★', category: 'SPECIAL', sortOrder: 100, automatic: false },
] as const;

export type AchievementFacts = {
  emailVerified: boolean;
  publicationCount: number;
  commentCount: number;
  helpfulReactionCount: number;
  activeRoles: Array<{ communityId: string; communityName: string; role: string }>;
};

export type AchievementCandidate = {
  code: string;
  scopeKey: string;
  communityId?: string;
  sourceType: string;
  sourceId?: string;
  metadata?: Record<string, string | number | boolean | null>;
};

export function automaticAchievementCandidates(facts: AchievementFacts): AchievementCandidate[] {
  const result: AchievementCandidate[] = [];
  if (facts.emailVerified) result.push({ code: 'VERIFIED_ACCOUNT', scopeKey: 'global', sourceType: 'account' });
  if (facts.publicationCount >= 1) result.push({ code: 'FIRST_PUBLICATION', scopeKey: 'global', sourceType: 'publication' });
  if (facts.commentCount >= 10) result.push({ code: 'DISCUSSION_PARTICIPANT', scopeKey: 'global', sourceType: 'comments', metadata: { count: facts.commentCount } });
  if (facts.helpfulReactionCount >= 3) result.push({ code: 'HELPFUL_AUTHOR', scopeKey: 'global', sourceType: 'reactions', metadata: { count: facts.helpfulReactionCount } });
  for (const role of facts.activeRoles) result.push({
    code: 'COMMUNITY_TEAM', scopeKey: `community:${role.communityId}`, communityId: role.communityId,
    sourceType: 'community-role', sourceId: role.communityId,
    metadata: { communityName: role.communityName, role: role.role },
  });
  return result;
}
