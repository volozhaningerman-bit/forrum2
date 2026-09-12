export type DailyMetric = { date: string; users: number; publications: number; comments: number; contributors: number };
export function analyticsWindow(days: number, now = new Date()) {
  if (![7, 30, 90].includes(days)) throw new Error('Выберите 7, 30 или 90 дней');
  const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  return { end, start: new Date(+end - days * 86400000), previousStart: new Date(+end - days * 2 * 86400000) };
}
export function analyticsSummary(rows: DailyMetric[], days: number, now = new Date()) {
  const { start, end } = analyticsWindow(days, now);
  const current: DailyMetric[] = [], previous: DailyMetric[] = [];
  const byDate = new Map(rows.map(row => [row.date, row]));
  for (let i = -days; i < days; i++) {
    const date = new Date(+start + i * 86400000).toISOString().slice(0, 10);
    const row = byDate.get(date) ?? { date, users: 0, publications: 0, comments: 0, contributors: 0 };
    (i < 0 ? previous : current).push(row);
  }
  const sum = (items: DailyMetric[], key: 'users' | 'publications' | 'comments') => items.reduce((total, row) => total + row[key], 0);
  const totals = Object.fromEntries((['users', 'publications', 'comments'] as const).map(key => {
    const value = sum(current, key), before = sum(previous, key);
    return [key, { value, previous: before, delta: value - before, percent: before ? Math.round((value - before) / before * 100) : null }];
  }));
  return { days, timezone: 'UTC', start: start.toISOString(), endExclusive: end.toISOString(), generatedAt: now.toISOString(), series: current, totals };
}
