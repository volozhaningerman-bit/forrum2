/** Keep category chronology, but avoid identical covers next to each other.
 * Reorder each loaded page separately so loading more never moves existing rows.
 */
export function diverseTopics<T extends { community: { slug: string } }>(items: readonly T[], category = (item: T) => item.community.slug): T[] {
  const pageSize = 20;
  const result: T[] = [];
  for (let offset = 0; offset < items.length; offset += pageSize) {
    const remaining = items.slice(offset, offset + pageSize);
    while (remaining.length) {
      const previous = result.length ? category(result[result.length - 1]) : undefined;
      const different = remaining.findIndex(item => category(item) !== previous);
      const index = different < 0 ? 0 : different;
      result.push(...remaining.splice(index, 1));
    }
  }
  return result;
}
