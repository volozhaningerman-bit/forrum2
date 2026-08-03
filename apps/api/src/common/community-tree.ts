export type CommunityNode = { id: string; parentId: string | null };

export function expandCommunityIds(nodes: CommunityNode[], roots: Iterable<string>): Set<string> {
  const selected = new Set(roots);
  if (!selected.size) return selected;
  const children = new Map<string, string[]>();
  for (const node of nodes) {
    if (!node.parentId) continue;
    const list = children.get(node.parentId) ?? [];
    list.push(node.id);
    children.set(node.parentId, list);
  }
  const queue = [...selected];
  while (queue.length) {
    const current = queue.shift()!;
    for (const child of children.get(current) ?? []) {
      if (selected.has(child)) continue;
      selected.add(child);
      queue.push(child);
    }
  }
  return selected;
}
