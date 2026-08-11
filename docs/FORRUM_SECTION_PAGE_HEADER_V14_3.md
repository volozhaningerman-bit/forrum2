# FORRUM Section Page — Header V14.3

Corrected implementation of the first visible stage of the approved
universal section/category page.

Implemented:
- recursive breadcrumbs: Главная → Сообщества → all ancestors → current;
- compact section header;
- thematic mark, title and short description;
- curator avatar and clickable @username;
- subscriber count;
- working subscribe/unsubscribe;
- working “Создать тему” TOPIC action;
- retired oversized cover/profile/curator hero removed.

V14.3 correction:
- old hero replacement no longer relies on an exact whitespace/newline
  sequence after </section>;
- the patch finds the first closing </section> belonging to the known
  community-profile root and verifies that the children block follows.

Protected:
- /communities catalogue;
- global header;
- homepage;
- Prisma schema;
- existing category tree;
- topic content area.
