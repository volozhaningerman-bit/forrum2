import assert from 'node:assert/strict';
import test from 'node:test';
import { analyticsSummary, analyticsWindow } from '../src/admin/analytics.js';
const now = new Date('2026-09-12T16:42:00Z');
test('analytics includes only completed UTC days and equal preceding window', () => {
  const { start, end, previousStart } = analyticsWindow(7, now);
  assert.equal(start.toISOString(), '2026-09-05T00:00:00.000Z');
  assert.equal(end.toISOString(), '2026-09-12T00:00:00.000Z');
  assert.equal(previousStart.toISOString(), '2026-08-29T00:00:00.000Z');
  for (const value of [0, 8, NaN, 365, -1]) assert.throws(() => analyticsWindow(value, now));
});
test('analytics fills missing days and does not fabricate percentages from zero', () => {
  const result = analyticsSummary([{ date: '2026-09-05', users: 2, publications: 1, comments: 0, contributors: 1 }], 7, now);
  assert.equal(result.series.length, 7);
  assert.equal(result.series[6].date, '2026-09-11');
  assert.equal(result.series[1].users, 0);
  assert.deepEqual(result.totals.users, { value: 2, previous: 0, delta: 2, percent: null });
});
test('period totals exclude today and count comparison boundaries once', () => {
  const row = (date: string, users: number) => ({ date, users, publications: 0, comments: 0, contributors: 0 });
  const result = analyticsSummary([row('2026-08-29', 2), row('2026-09-04', 2), row('2026-09-05', 1), row('2026-09-11', 1), row('2026-09-12', 100)], 7, now);
  assert.deepEqual(result.totals.users, { value: 2, previous: 4, delta: -2, percent: -50 });
});
