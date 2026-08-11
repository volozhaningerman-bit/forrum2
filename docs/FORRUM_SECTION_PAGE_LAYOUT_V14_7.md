# FORRUM Section Page — Layout V14.7

Large visible implementation stage based on the approved “Запуски и команды”
reference.

Implemented:
- canonical dark surface on /communities/[slug];
- left category tree matching the interaction model used on the homepage:
  icon/name navigate, empty expandable row area toggles, chevron toggles;
- Workshop first, separator, then root communities and recursive children;
- current category highlighted and its ancestor chain expanded;
- preserved recursive breadcrumbs and compact V14.3 identity header;
- removed the legacy large child strip;
- removed the legacy publication-card feed;
- removed popular hashtags / poll / team right rail;
- dense Topics block with columns Topic / Author / Replies / Views;
- tabs: Все / Новые / Обсуждаемые / Без ответа;
- sorting: last activity / newest / discussed;
- topic thumbnail, system state, title, short description, inherited child source,
  clickable author, replies and views;
- empty state + existing create-topic flow;
- current subscribe flow preserved;
- global header component is untouched; this page receives the same approved
  dark visual treatment through scoped CSS.

Protected:
- /communities catalogue;
- homepage;
- main-nav component and header logic;
- API source and Prisma schema;
- footer component.

V14.7 correction:
- keeps the exact Stage 1 / V14.3 canonical create-topic source marker;
- the V14.4 visual redesign and interactions are unchanged.

V14.7 correction:
- accepts the dynamic `section-topic-row ${...}` source form;
- fixes the changed-file whitelist to the V14.7 checker/document;
- preserves the full V14.5 visual redesign.

V14.7 correction:
- PublicationCardData remains allowed as the publication data type.
- Only the retired rendered PublicationCard component and its component import are forbidden.
- Changed-file scope uses literal exact paths, not a regex whitelist.
