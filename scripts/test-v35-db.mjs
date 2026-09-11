// Disposable CI database only. Does not accept a production connection.
import assert from 'node:assert/strict';
import { PrismaService } from '../apps/api/dist/src/prisma/prisma.service.js';
import { AiTaxonomyService } from '../apps/api/dist/src/admin/ai-taxonomy.service.js';
import { CommunitiesService } from '../apps/api/dist/src/communities/communities.service.js';
import { HomeService } from '../apps/api/dist/src/home/home.service.js';
const url=new URL(process.env.DATABASE_URL);
assert(['127.0.0.1','localhost'].includes(url.hostname)&&url.pathname==='/forrum_v35_ci','Only disposable local forrum_v35_ci is accepted');
const db=new PrismaService({getOrThrow:()=>url.toString()});
try {
 await db.$connect(); assert.equal(await db.user.count(),0,'Database must be empty');
 const user=await db.user.create({data:{email:'owner@example.test',username:'owner',displayName:'Владелец',passwordHash:'test-only',role:'OWNER'}});
 const inactive=await db.user.create({data:{email:'inactive@example.test',username:'inactive',displayName:'Неактивный',passwordHash:'test-only'}});
 const create=(slug,parentId=null)=>db.community.create({data:{slug,name:slug,description:'Existing',parentId,createdById:user.id}});
 const games=await create('gta-rp');const child=await create('majestic-rp',games.id);await create('forrum-start');const custom=await create('custom');
 const topic=await db.publication.create({data:{slug:'existing-topic',title:'Existing',body:'Preserve me',format:'TOPIC',authorId:user.id,communityId:child.id}});
 await db.communitySubscription.createMany({data:[{userId:user.id,communityId:games.id},{userId:inactive.id,communityId:games.id}]});
 const now=Date.now();
 await db.session.createMany({data:[{tokenHash:'active-1',userId:user.id,expiresAt:new Date(now+3600000)},{tokenHash:'active-2',userId:user.id,expiresAt:new Date(now+3600000)},{tokenHash:'expired',userId:inactive.id,expiresAt:new Date(now-1000)},{tokenHash:'revoked',userId:inactive.id,expiresAt:new Date(now+3600000),revokedAt:new Date()},{tokenHash:'idle',userId:inactive.id,expiresAt:new Date(now+3600000),lastSeenAt:new Date(now-600000)}]});
 const communities=new CommunitiesService(db);let rows=await communities.list();const game=rows.find(n=>n.slug==='gta-rp');assert.equal(game.subscriberCount,2);assert.equal(game.onlineCount,1,'Multiple sessions count as one subscriber; revoked/expired/idle sessions excluded');
 const service=new AiTaxonomyService(db);const plan=await service.preview();await service.apply(user.id,plan.version);
 const video=await db.community.findUniqueOrThrow({where:{slug:'video-games'}});assert.equal((await db.community.findUniqueOrThrow({where:{id:games.id}})).parentId,video.id);assert.equal((await db.community.findUniqueOrThrow({where:{id:child.id}})).parentId,games.id);
 assert.equal((await db.publication.findUniqueOrThrow({where:{id:topic.id}})).body,'Preserve me');assert.equal(await db.communitySubscription.count(),2);assert.equal((await db.community.findUniqueOrThrow({where:{id:custom.id}})).parentId,null);
 const audit=await db.auditLog.findFirstOrThrow({where:{action:'communities.ai-taxonomy.v35'}});assert.equal(audit.metadata.before.find(n=>n.id===games.id).parentId,null,'Audit preserves pre-move parent');
 await assert.rejects(service.apply(user.id,plan.version),'Stale preview rejected');const again=await service.preview();assert.equal((await service.apply(user.id,again.version)).created,0,'Repeat does not duplicate categories');
 const home=new HomeService(db);assert.equal((await home.overview()).banners.length,2);await db.platformSetting.upsert({where:{key:'home.banners.v1'},create:{key:'home.banners.v1',value:[]},update:{value:[]}});assert.equal((await home.overview()).banners.length,0,'Saved empty setting overrides defaults');
 console.log('V35 database integration passed: counts, preservation, audit snapshot, stale preview, repeat, banners');
} finally {await db.$disconnect();}
