export type WeeklyRankingMode = 'likes' | 'activity';

export type WeeklyRankingEntry = {
  username: string;
  displayName: string;
  avatarUrl: string | null;
  reactionCount: number;
  topicCount: number;
  commentCount: number;
  presenceCount?: number;
};

export type WeeklyRankingResult = WeeklyRankingEntry & {
  score: number;
};

export function rankWeekly(
  entries: WeeklyRankingEntry[],
  mode: WeeklyRankingMode,
  limit = 5,
): WeeklyRankingResult[] {
  return entries
    .map((entry) => ({
      ...entry,
      score:
        mode === 'likes'
          ? entry.reactionCount
          : entry.topicCount + entry.commentCount,
    }))
    .filter((entry) => entry.score > 0)
    .sort(
      (left, right) =>
        right.score - left.score ||
        left.username.localeCompare(
          right.username,
          'ru',
        ),
    )
    .slice(0, Math.max(0, limit));
}
