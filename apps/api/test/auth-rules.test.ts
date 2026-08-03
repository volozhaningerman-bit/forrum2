import assert from 'node:assert/strict';
import test from 'node:test';
import { normalizeUsername, usernamePolicy } from '../src/common/auth-rules.js';

test('username normalization is stable and lowercase', () => {
  assert.equal(normalizeUsername('  Sebas_Tian  '), 'sebas_tian');
});

test('reserved platform names cannot be registered', () => {
  assert.equal(usernamePolicy('admin').allowed, false);
  assert.equal(usernamePolicy('FORRUM').allowed, false);
});

test('a normal username remains available for database checking', () => {
  assert.deepEqual(usernamePolicy('new_user_24'), { normalized: 'new_user_24', allowed: true, reason: undefined });
});
