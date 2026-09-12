import 'reflect-metadata';
import assert from 'node:assert/strict';
import test from 'node:test';
import type { ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AdminGuard } from '../src/auth/admin.guard.js';
import { AdminService } from '../src/admin/admin.service.js';
import type { PrismaService } from '../src/prisma/prisma.service.js';
import type { WalletService } from '../src/wallet/wallet.service.js';
import type { ModerationService } from '../src/moderation/moderation.service.js';
function service(db: unknown = {}, config = {}) { return new AdminService(db as PrismaService, {} as WalletService, new ConfigService(config), {} as ModerationService); }
test('admin guard permits only owner and admin', () => {
  const guard = new AdminGuard();
  for (const role of ['OWNER','ADMIN','MEMBER','USER','MODERATOR']) {
    const ctx = { switchToHttp: () => ({ getRequest: () => ({ user: { role } }) }) } as unknown as ExecutionContext;
    if (['OWNER','ADMIN'].includes(role)) assert.equal(guard.canActivate(ctx),true); else assert.throws(() => guard.canActivate(ctx));
  }
});
test('connection diagnostics return no tokens, passwords or email addresses', () => {
  const result = service({}, { SMTP_HOST:'mailpit.railway.internal',SMTP_PASS:'secret-mail-password',SMTP_FROM:'private@example.test',TELEGRAM_BOT_TOKEN:'secret-bot-token',WEB_URL:'wrong-url' }).connections();
  const json=JSON.stringify(result);
  assert.ok(!json.includes('secret'));assert.ok(!json.includes('private@example.test'));
  assert.equal(result.mail.testInbox,true);assert.equal(result.mail.webUrlConfigured,false);
});
test('category edit changes only copy and records the previous values', async () => {
  let update: unknown, audit: unknown;
  const db={community:{findUnique:async()=>({id:'c',name:'Old',description:'Old description long enough',shortDescription:null}),update:(args:unknown)=>{update=args;return Promise.resolve({});}},auditLog:{create:(args:unknown)=>{audit=args;return Promise.resolve({});}},$transaction:async(p:Promise<unknown>[])=>Promise.all(p)};
  await service(db).editCategory('c',{name:'New name',description:'New description long enough',shortDescription:'Short'},'owner');
  assert.deepEqual(update,{where:{id:'c'},data:{name:'New name',description:'New description long enough',shortDescription:'Short'}});
  assert.ok(JSON.stringify(audit).includes('Old description'));
});
test('category edit rejects whitespace before querying the database', async () => {
  await assert.rejects(service().editCategory('c',{name:'  ',description:' '.repeat(20),shortDescription:''},'owner'));
});
test('directory parameters are bounded before database access', async () => {
  await assert.rejects(service().users('x','-1'));
  await assert.rejects(service().users('x'.repeat(101),'1'));
  await assert.rejects(service().publications('x','1.5'));
});
