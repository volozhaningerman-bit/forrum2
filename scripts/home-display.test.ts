import assert from 'node:assert/strict';
import test from 'node:test';
import { forumDate } from '../apps/web/lib/forum-display.js';
test('viewer calendar crosses UTC midnight correctly',()=>{
 const now=Date.parse('2026-09-30T20:30:00Z');
 assert.equal(forumDate('2026-09-30T20:00:00Z',now,'Asia/Yekaterinburg'),'сегодня, 01:00');
 assert.equal(forumDate('2026-09-30T18:00:00Z',now,'Asia/Yekaterinburg'),'вчера, 23:00');
});
test('different months and years are not labelled today',()=>{
 assert(!forumDate('2025-09-30T12:00:00Z',Date.parse('2026-09-30T14:00:00Z'),'UTC').startsWith('сегодня'));
 assert(!forumDate('2026-08-30T12:00:00Z',Date.parse('2026-09-30T14:00:00Z'),'UTC').startsWith('сегодня'));
 assert.equal(forumDate('invalid',Date.now(),'UTC'),'—');
});
test('yesterday across year boundary and DST',()=>{
 assert.equal(forumDate('2025-12-31T23:00:00Z',Date.parse('2026-01-01T10:00:00Z'),'UTC'),'вчера, 23:00');
 assert.equal(forumDate('2026-03-28T12:00:00Z',Date.parse('2026-03-29T12:00:00Z'),'Europe/Berlin'),'вчера, 13:00');
});
import { allowedRequestOrigin } from '../apps/web/lib/request-origin.js';
test('proxy rejects hostile Origin before forwarding session cookies',()=>{
 assert.equal(allowedRequestOrigin(new Headers({origin:'https://evil.example'}),'https://4rrum.ru'),false);
 assert.equal(allowedRequestOrigin(new Headers({origin:'https://4rrum.ru'}),'https://4rrum.ru'),true);
 assert.equal(allowedRequestOrigin(new Headers({'sec-fetch-site':'cross-site'}),'https://4rrum.ru'),false);
 assert.equal(allowedRequestOrigin(new Headers({origin:'http://127.0.0.1:3126',host:'127.0.0.1:3126'}),'http://localhost:3126'),true);
 assert.equal(allowedRequestOrigin(new Headers({origin:'null'}),'https://4rrum.ru'),false);
});
