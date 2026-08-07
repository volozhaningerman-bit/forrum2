# FORRUM Home Redesign — Stage E

Stage E adds the second and only other center block from the approved master reference: **Новые темы**.

## Implemented

- The center now contains exactly two topic tables: `Обсуждаемые темы` and `Новые темы`.
- New topics are loaded independently from `/feed?mode=new`.
- The existing 24-hour discussed ranking remains untouched.
- The second table reuses the approved compact Stage D row language: topic visual, title/path, author/avatar, replies and views.
- Five rows are shown on the homepage, followed by the thin `Показать больше тем →` row when there are results.
- Loading, error and empty states are retained.

## Not changed

Header, category tree, right rail, footer and the discussed-topic backend ranking are not redesigned in Stage E.
