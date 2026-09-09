import test from 'node:test';
import assert from 'node:assert/strict';
import { parseReadHistory, topicReadState, firstNewReply } from '../apps/web/lib/topic-reading.ts';

test('topic states distinguish unknown storage, unopened topics, visits and new replies', () => {
 const history = { topic:'2026-09-08T10:00:00Z' };
 assert.equal(topicReadState(null,'topic'), 'unknown');
 assert.equal(topicReadState({},'topic'), 'unread');
 assert.equal(topicReadState(history,'topic','2026-09-08T10:00:00Z'), 'read');
 assert.equal(topicReadState(history,'topic','2026-09-08T11:00:00Z'), 'updated');
 assert.equal(topicReadState(history,'topic','2026-09-08T09:00:00Z'), 'read');
 assert.deepEqual(parseReadHistory('{broken'), {});
 assert.deepEqual(parseReadHistory('[1,2]'), {});
 assert.deepEqual(parseReadHistory('{"bad":"not a date","topic":"2026-09-08T10:00:00Z"}'),history);
});
test('first new reply is chronological despite nesting and old comments', () => {
 const comments=[{id:'later',createdAt:'2026-09-08T12:00:00Z'},{id:'first',createdAt:'2026-09-08T11:00:00Z'},{id:'old',createdAt:'2026-09-08T09:00:00Z'}];
 assert.equal(firstNewReply(comments,'2026-09-08T10:00:00Z')?.id,'first');
 assert.equal(firstNewReply(comments,undefined),undefined);
 assert.equal(firstNewReply(comments,'2026-09-08T13:00:00Z'),undefined);
});
