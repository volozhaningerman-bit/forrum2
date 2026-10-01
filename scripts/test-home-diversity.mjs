import assert from 'node:assert/strict';
import { diverseTopics } from '../apps/web/components/home/diverse-topics.ts';

const rows = categories => categories.map((slug, id) => ({ id, community: { slug } }));
const clustered = rows(['a', 'a', 'a', 'b', 'b', 'c']);
const mixed = diverseTopics(clustered);
assert.deepEqual(mixed.map(row => row.community.slug), ['a', 'b', 'a', 'b', 'a', 'c']);
assert.deepEqual(mixed.map(row => row.id).sort((a,b) => a-b), clustered.map(row => row.id));
for (const slug of ['a', 'b', 'c']) {
  assert.deepEqual(mixed.filter(row => row.community.slug === slug), clustered.filter(row => row.community.slug === slug));
}
assert.deepEqual(diverseTopics([]), []);
assert.deepEqual(diverseTopics(rows(['a', 'a'])), rows(['a', 'a']));
const firstPage = rows(Array(10).fill('a').concat(Array(10).fill('b')));
const nextPage = rows(['b', 'c', 'c']).map(row => ({ ...row, id: row.id + 20 }));
assert.deepEqual(diverseTopics([...firstPage, ...nextPage]).slice(0,20), diverseTopics(firstPage), 'Pagination must not rearrange already visible topics');
assert.equal(clustered[1].community.slug, 'a', 'Input order must not be mutated');
console.log('Homepage category diversity, category chronology and pagination passed');
