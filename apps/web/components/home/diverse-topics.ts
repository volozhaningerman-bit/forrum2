/** Keep category chronology, but avoid identical covers next to each other.
 * Reorder each loaded page separately so loading more never moves existing rows.
 */
export function diverseTopics<T extends { community: { slug: string } }>(items: readonly T[], pageSize = 20): T[] {
  const result: T[] = [];
  for (let offset = 0; offset < items.length; offset += pageSize) {
    const remaining = items.slice(offset, offset + pageSize);
    while (remaining.length) {
      const previous = result.at(-1)?.community.slug;
      const different = remaining.findIndex(item => item.community.slug !== previous);
      const index = different < 0 ? 0 : different;
      result.push(...remaining.splice(index, 1));
    }
  }
  return result;
}
