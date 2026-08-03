import test from 'node:test';
import assert from 'node:assert/strict';
import { createOpaqueToken, hashToken } from '../src/common/security.js';

test('opaque tokens are random and hashes are deterministic', () => {
  const a = createOpaqueToken();
  const b = createOpaqueToken();
  assert.notEqual(a, b);
  assert.equal(hashToken(a), hashToken(a));
  assert.notEqual(hashToken(a), a);
});
