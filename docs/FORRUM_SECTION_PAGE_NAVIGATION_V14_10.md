# FORRUM Section Page Navigation V14.10

V14.10 replaces the failed V14.9 attempt. V14.9 stopped during its apply step
and did not reach commit or push.

## Implemented

- Blank space in an expandable category row stays clickable for expand/collapse,
  but uses the normal cursor.
- Pointer cursor is limited to the category icon, name, chevron and child links.
- Topic columns are now:
  `Тема | Автор | Дата | Ответы | Просмотры`.
- `Дата` is the publication date (`createdAt`), not the last-activity timestamp.
- Existing `Последняя активность` sorting remains based on last activity.
- 20 filtered topics are shown per page.
- Pagination is rendered only when more than one page exists.
- Controls: previous, compact page numbers/ellipsis, next.
- Changing a topic tab or sorting returns to page 1.
- Changing page scrolls back to the topic table.

## Protected scope

V14.10 does not change:
- global header/navigation;
- footer;
- homepage;
- Communities catalogue;
- API source;
- Prisma schema or seed data.
