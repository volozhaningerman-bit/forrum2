export type DailyMetric = { date: string; users: number; publications: number; comments: number; contributors: number };
export function analyticsWindow(days: number, now = new Date()) {
  if (![7, 30, 90].includes(days)) throw new Error('Выберите 7, 30 или 90 дней');
  const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  return { end, start: new Date(+end - days * 86400000), previousStart: new Date(+end - days * 2 * 86400000) };
}
export function analyticsSummary(rows: DailyMetric[], days: number, now = new Date(), custom = false) {
  const { start, end } = custom ? {start:new Date(+now-days*86400000),end:now} : analyticsWindow(days, now);
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

export function customWindow(from:string,to:string,now=new Date()){
 const parse=(v:string)=>{if(!/^\d{4}-\d{2}-\d{2}$/.test(v)||!Number.isFinite(Date.parse(v))||new Date(v).toISOString().slice(0,10)!==v)throw new Error('Укажите корректные даты');return new Date(v);};
 const start=parse(from),end=new Date(+parse(to)+86400000),today=new Date(Date.UTC(now.getUTCFullYear(),now.getUTCMonth(),now.getUTCDate()));
 const days=(+end-+start)/86400000;if(days<1||days>366||end>today)throw new Error('Выберите от 1 до 366 завершённых дней');
 return {start,end,previousStart:new Date(+start-days*86400000),days};
}
