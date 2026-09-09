export type ReadHistory = Record<string, string>;
export const readingKey = (viewer: string) => `forrum-reading-v1:${viewer}`;

export function parseReadHistory(raw: string | null): ReadHistory {
 try {
  const value: unknown = JSON.parse(raw || '{}');
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  return Object.fromEntries(Object.entries(value).filter(([id, at]) => id.length <= 150 && typeof at === 'string' && Number.isFinite(Date.parse(at))).slice(-500));
 } catch { return {}; }
}
export function topicReadState(history: ReadHistory | null, id: string, latestReply?: string) {
 if (!history) return 'unknown';
 const visited = history[id];
 if (!visited) return 'unread';
 return latestReply && Date.parse(latestReply) > Date.parse(visited) ? 'updated' : 'read';
}
export function firstNewReply<T extends { id: string; createdAt: string }>(comments: T[], seen?: string): T | undefined {
 if (!seen) return undefined;
 return comments.filter(c => Date.parse(c.createdAt) > Date.parse(seen)).sort((a,b) => Date.parse(a.createdAt)-Date.parse(b.createdAt) || a.id.localeCompare(b.id))[0];
}
export function saveTopicVisit(viewer: string, id: string, at: string) {
 try {
  const key = readingKey(viewer);
  const history = parseReadHistory(localStorage.getItem(key));
  // Never move a watermark backwards after a stale response or a visit in another tab.
  const newest = Math.max(Date.parse(history[id] || '') || 0, Date.parse(at));
  if (!Number.isFinite(newest)) return;
  delete history[id];
  history[id] = new Date(newest).toISOString();
  localStorage.setItem(key, JSON.stringify(Object.fromEntries(Object.entries(history).slice(-500))));
  window.dispatchEvent(new Event('forrum-reading-changed'));
 } catch { /* Reading remains available when storage is disabled. */ }
}
