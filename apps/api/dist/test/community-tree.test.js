import assert from 'node:assert/strict';
import test from 'node:test';
import { expandCommunityIds } from '../src/common/community-tree.js';
test('parent subscription includes every descendant but not ancestors or siblings', () => {
    const nodes = [
        { id: 'gta', parentId: null },
        { id: 'majestic', parentId: 'gta' },
        { id: 'guides', parentId: 'majestic' },
        { id: 'telegram', parentId: null },
    ];
    assert.deepEqual([...expandCommunityIds(nodes, ['gta'])].sort(), ['gta', 'guides', 'majestic']);
    assert.deepEqual([...expandCommunityIds(nodes, ['majestic'])].sort(), ['guides', 'majestic']);
});
//# sourceMappingURL=community-tree.test.js.map