import assert from 'node:assert/strict';
import test from 'node:test';
import { automaticAchievementCandidates } from '../src/users/achievements.js';

test('automatic achievements are based on verifiable facts', () => {
  const result = automaticAchievementCandidates({
    emailVerified: true, publicationCount: 1, commentCount: 10, helpfulReactionCount: 3,
    activeRoles: [{ communityId: 'gta', communityName: 'GTA RP', role: 'CURATOR' }],
  });
  assert.deepEqual(result.map((item) => item.code), ['VERIFIED_ACCOUNT', 'FIRST_PUBLICATION', 'DISCUSSION_PARTICIPANT', 'HELPFUL_AUTHOR', 'COMMUNITY_TEAM']);
  assert.equal(result.at(-1)?.scopeKey, 'community:gta');
});
