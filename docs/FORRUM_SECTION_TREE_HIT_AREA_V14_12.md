# FORRUM Section Tree Hit Area V14.12

V14.11 failed only in its checker and did not reach commit/push.

Root cause of the V14.11 failure:
- the global stylesheet contains older `.section-tree-name-link` rules;
- V14.11 checker used `css.match(...)`, which inspected the first exact match;
- it therefore reported `title anchor still stretches horizontally` even though
  the final V14.11 override already contained `width: fit-content`.

V14.12 fixes both verification robustness and the final CSS cascade.

Approved interaction:
1. Click category icon -> navigate to category.
2. Click category title text itself -> navigate to category.
3. Click chevron -> expand/collapse.
4. Click any remaining blank row area -> expand/collapse.
5. Blank area has normal cursor.
6. Icon, text, and chevron have pointer cursor.

Technical guarantee:
- title anchor is `inline-flex`;
- title anchor width is `fit-content`;
- final rule uses `max-width: max-content`;
- icon and chevron are intrinsic width;
- final V14.12 rules are appended after prior global rules;
- checker searches all selector occurrences rather than trusting the first one.

V14.10 functionality retained:
- column `Дата` uses publication `createdAt`;
- 20 topics per page;
- pagination with previous/page numbers/next;
- tab/sort changes reset to page 1.

Protected:
global header/footer, homepage, Communities catalogue, API and Prisma.
