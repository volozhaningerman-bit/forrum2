import assert from 'node:assert/strict';
import test from 'node:test';
import { safeNext } from '../apps/web/lib/safe-next.ts';
import { api } from '../apps/web/lib/api.ts';

test('authentication return URL stays on site, including browser-normalized backslashes', () => {
  for (const path of ['https://evil.example', '//evil.example', '/\\evil.example', '/\n/evil.example', null]) assert.equal(safeNext(path), '/');
  assert.equal(safeNext('/create?community=forrum-feedback#editor'), '/create?community=forrum-feedback#editor');
});

test('caller cancellation stays AbortError; network failures have an actionable message', async () => {
  const original = globalThis.fetch;
  try {
    const controller = new AbortController(); controller.abort();
    globalThis.fetch = async () => { throw new DOMException('Cancelled', 'AbortError'); };
    await assert.rejects(api('/search', { signal: controller.signal }), { name: 'AbortError' });
    globalThis.fetch = async () => { throw new TypeError('Failed to fetch'); };
    await assert.rejects(api('/search'), /Проверьте подключение/);
  } finally { globalThis.fetch = original; }
});
