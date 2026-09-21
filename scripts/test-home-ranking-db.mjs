import assert from 'node:assert/strict';
import {HomeService} from '../apps/api/dist/src/home/home.service.js';
// Run after the API build. Use an isolated test database or optional PGlite.
let db;
if(process.env.PGLITE_MODULE){
 const {PGlite}=await import(process.env.PGLITE_MODULE);db=new PGlite();
}else{
 if(!process.env.HOME_RANKING_TEST_DATABASE_URL)throw new Error('Set HOME_RANKING_TEST_DATABASE_URL to a test database');
 const {Client}=await import('pg');const client=new Client({connectionString:process.env.HOME_RANKING_TEST_DATABASE_URL});await client.connect();
 await client.query('BEGIN');await client.query("SET LOCAL search_path TO pg_temp");
 db={exec:sql=>client.query(sql),query:(sql,values)=>client.query(sql,values),close:async()=>{await client.query('ROLLBACK');await client.end();}};
}
try {
await db.exec(`CREATE TEMP TABLE "User" (id text, username text, "displayName" text, "avatarUrl" text);
CREATE TEMP TABLE "Community"(id text,status text);
CREATE TEMP TABLE "Publication"(id text,"authorId" text,"communityId" text,status text,format text,"createdAt" timestamp);
CREATE TEMP TABLE "Comment"(id text,"authorId" text,"publicationId" text,"createdAt" timestamp,"hiddenAt" timestamp);
CREATE TEMP TABLE "PublicationReaction"("userId" text,"publicationId" text,type text,"createdAt" timestamp);
INSERT INTO "User" VALUES ('a','alice','Alice',NULL),('b','bob','Bob',NULL);
INSERT INTO "Community" VALUES ('open','ACTIVE'),('closed','ARCHIVED');
INSERT INTO "Publication" VALUES ('old','a','open','PUBLISHED','TOPIC',now()-interval '30 days'),('new','b','open','PUBLISHED','TOPIC',now()),('hidden','a','open','DRAFT','TOPIC',now()),('closed','a','closed','PUBLISHED','TOPIC',now());
INSERT INTO "Comment" VALUES ('c1','a','new',now(),NULL),('c2','a','new',now(),now()),('c3','a','hidden',now(),NULL),('c4','a','closed',now(),NULL);
INSERT INTO "PublicationReaction" VALUES ('a','old','LIKE',now()),('b','old','LIKE',now()),('a','new','LIKE',now()-interval '30 days'),('b','hidden','LIKE',now()),('b','closed','LIKE',now());`);
const service=new HomeService({$queryRaw:async q=>(await db.query(q.text,q.values)).rows});
assert.deepEqual((await service.ranking('week','activity')).map(x=>[x.username,x.score]),[['alice',1],['bob',1]]);
assert.deepEqual((await service.ranking('all','activity')).map(x=>[x.username,x.score]),[['alice',2],['bob',1]]);
assert.deepEqual((await service.ranking('week','likes')).map(x=>[x.username,x.score]),[['alice',1]]);
assert.deepEqual((await service.ranking('all','likes')).map(x=>[x.username,x.score]),[['alice',1],['bob',1]]);
} finally {await db.close();}
console.log('4 ranking SQL scenarios passed: periods, self-likes, hidden comments, drafts, inactive communities');
