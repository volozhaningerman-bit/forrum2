# FORRUM Category Page — Stage 1 V14

Stage 1 establishes the approved universal category route/component boundary.

- Reuses `/communities/[slug]`.
- Renames the detail client boundary to `CategoryPage`.
- Preserves existing loading, subscription and topic-creation behaviour.
- Does not create separate pages for individual categories.
- Does not change API, Prisma schema, shared header, homepage, Communities catalogue or visual styling.
- Visual redesign begins in Stage 2.

The existing `Community` Prisma model already supports recursive parent/children relationships.
