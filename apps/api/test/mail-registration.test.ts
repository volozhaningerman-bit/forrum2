import 'reflect-metadata';
import assert from 'node:assert/strict';
import test from 'node:test';
import { ConfigService } from '@nestjs/config';
import { ServiceUnavailableException } from '@nestjs/common';
import { smtpOptions } from '../src/auth/smtp-options.js';
import { AuthService } from '../src/auth/auth.service.js';
import { MailService } from '../src/auth/mail.service.js';
import type { PrismaService } from '../src/prisma/prisma.service.js';

test('local Mailpit works without credentials', () => {
  const options = smtpOptions(new ConfigService({}));
  assert.equal(options.port, 1025);
  assert.equal(options.secure, false);
  assert.equal(options.requireTLS, false);
  assert.equal(options.auth, undefined);
});

test('production SMTP supports authenticated TLS and STARTTLS', () => {
  const config = { NODE_ENV: 'production', SMTP_HOST: 'smtp.example.test', SMTP_USER: 'user', SMTP_PASS: 'secret' };
  const tls = smtpOptions(new ConfigService({ ...config, SMTP_PORT: '465' }));
  assert.equal(tls.secure, true);
  assert.deepEqual(tls.auth, { user: 'user', pass: 'secret' });
  const starttls = smtpOptions(new ConfigService({ ...config, SMTP_PORT: '587', SMTP_SECURE: 'false' }));
  assert.equal(starttls.secure, false);
  assert.equal(starttls.requireTLS, true);
});

test('invalid production configuration is rejected', () => {
  for (const config of [
    { NODE_ENV: 'production' },
    { SMTP_PORT: 'NaN' },
    { SMTP_USER: 'user' },
    { SMTP_PASS: 'secret' },
    { SMTP_SECURE: 'yes' },
  ]) assert.throws(() => smtpOptions(new ConfigService(config)));
});

test('mail configuration failure gives a safe retryable error', async () => {
  const mail = new MailService(new ConfigService({ NODE_ENV: 'production' }));
  await assert.rejects(mail.sendVerification('nobody@example.test', 'private-token'), (error: unknown) => {
    assert.ok(error instanceof ServiceUnavailableException);
    assert.equal(error.getStatus(), 503);
    assert.ok(!error.message.includes('private-token'));
    return true;
  });
});

for (const failDelivery of [false, true]) {
  test(`registration preserves unverified account when delivery ${failDelivery ? 'fails' : 'succeeds'}`, async () => {
    let created: Record<string, unknown> | undefined;
    let tokenData: Record<string, unknown> | undefined;
    const tx = {
      user: { create: async ({ data }: { data: Record<string, unknown> }) => { created = data; return { id: 'new-user' }; } },
      emailVerificationToken: { create: async ({ data }: { data: Record<string, unknown> }) => { tokenData = data; } },
    };
    const prisma = {
      user: { findFirst: async () => null },
      $transaction: async (run: (client: typeof tx) => Promise<void>) => run(tx),
    } as unknown as PrismaService;
    const mail = { sendVerification: async () => { if (failDelivery) throw new ServiceUnavailableException(); } } as unknown as MailService;
    const auth = new AuthService(prisma, mail, new ConfigService({}));
    const result = await auth.register({ email: 'NEW@example.test', username: 'new_user', displayName: 'New User', password: 'A-test-password-123' });
    assert.equal(result.ok, true);
    assert.equal(result.verificationEmailSent, !failDelivery);
    assert.equal(result.email, 'new@example.test');
    assert.ok(created?.passwordHash);
    assert.equal(created?.emailVerifiedAt, undefined);
    assert.equal(created?.role, undefined);
    assert.equal(tokenData?.userId, 'new-user');
    assert.ok(tokenData?.tokenHash);
    assert.equal('token' in result, false);
  });
}


test('production Mailpit accepts unencrypted SMTP without credentials', () => {
  const options = smtpOptions(new ConfigService({ NODE_ENV: 'production', SMTP_HOST: 'mailpit.railway.internal', SMTP_PORT: '1025' }));
  assert.equal(options.secure, false);
  assert.equal(options.requireTLS, false);
  assert.equal(options.auth, undefined);
});

test('relay TLS can be explicitly required and invalid flags fail', () => {
  assert.equal(smtpOptions(new ConfigService({ SMTP_REQUIRE_TLS: 'true' })).requireTLS, true);
  assert.throws(() => smtpOptions(new ConfigService({ SMTP_REQUIRE_TLS: 'yes' })));
});
