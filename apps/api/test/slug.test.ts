import test from 'node:test';
import assert from 'node:assert/strict';
import { createSlug, normalizeTag } from '../src/common/slug.js';

test('slug has a readable prefix and random suffix', () => {
  const slug = createSlug('Первая постоянная тема FORRUM');
  assert.match(slug, /^[a-z0-9-]+-[a-f0-9]{6}$/);
});

test('hashtag normalization removes the hash and unsafe characters', () => {
  assert.equal(normalizeTag('#Интернет проекты!'), 'internet-proekty');
});
