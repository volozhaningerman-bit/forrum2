import 'reflect-metadata';
import assert from 'node:assert/strict';
import test from 'node:test';
import { FeedService } from '../src/feed/feed.service.js';
import type { PrismaService } from '../src/prisma/prisma.service.js';
function fixture() {
 const calls: any[] = [];
 const db = {
  community: { findMany: async () => [{id:'root',slug:'ai',parentId:null},{id:'child',slug:'prompts',parentId:'root'},{id:'other',slug:'games',parentId:null}] },
  publication: { findMany: async (query: unknown) => {calls.push(query);return [];} },
  user: {findUnique: async () => ({subscriptions:[],following:[],tagSubscriptions:[],hiddenCommunities:[{communityId:'child'}],hiddenPublications:[{publicationId:'hidden'}]})},
 };
 return {service:new FeedService(db as unknown as PrismaService),calls};
}
test('browse filters descendants and unanswered before pagination', async () => {
 const {service,calls}=fixture(); await service.get('all',undefined,{community:'ai',unanswered:true,offset:40});
 assert.equal(calls[0].skip,40);assert.equal(calls[0].take,21);
 assert.deepEqual(calls[0].where.AND[1].communityId.in,['root','child']);
 assert.deepEqual(calls[0].where.AND[1].comments,{none:{hiddenAt:null}});
 assert.equal(calls[0].where.AND[1].format,'TOPIC');
});
test('explicit category never overrides viewer exclusions', async () => {
 const {service,calls}=fixture();await service.get('all','viewer',{community:'ai',offset:0});
 assert.deepEqual(calls[0].where.AND[0].communityId.notIn,['child']);
 assert.deepEqual(calls[0].where.AND[0].id.notIn,['hidden']);
 assert.equal(calls[0].where.AND[0].status,'PUBLISHED');
});
test('unknown category returns no unrelated publications',async()=>{
 const {service,calls}=fixture();assert.deepEqual(await service.get('all',undefined,{community:'missing',offset:0}),[]);assert.equal(calls.length,0);
});
test('discussed browse keeps recent visible reply condition',async()=>{
 const {service,calls}=fixture();await service.get('popular',undefined,{offset:0});
 assert.equal(calls[0].where.AND[0].comments.some.hiddenAt,null);
 assert.ok(calls[0].where.AND[0].comments.some.createdAt.gte instanceof Date);
});
