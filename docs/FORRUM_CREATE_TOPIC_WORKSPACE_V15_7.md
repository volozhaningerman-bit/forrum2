# FORRUM Create Topic Workspace V15.7.4

## Goal

Complete the live **/create** visual polish after reviewing the V15.7.3 desktop screenshots.

## Changes

- hides the editor's duplicate generic `Предпросмотр` control in `topic-create` mode;
- keeps `Предпросмотр FORRUM` as the only preview entry point;
- restyles quote, code, list, spoiler, links, images, and invalid media inside the FORRUM preview for the dark route;
- removes the white quote and spoiler surfaces inherited from the global light component rules;
- increases contrast and size for the page title, section line, labels, inputs, counters, toolbar, autosave, and Telegram state;
- reduces the editor minimum height from 258px to 232px on desktop and 210px on mobile;
- changes the FORRUM preview button from white to graphite;
- strengthens the publish action while retaining a clear disabled state;
- keeps the expanded preview dense and readable for long BBCode documents.

## Preserved behavior

- the shared V15.6 editor and its generic preview remain unchanged on other routes;
- separate section selector, title, five normalized hashtags, arbitrary text size and HEX color;
- Ctrl+V/paperclip cursor-position image insertion;
- local draft recovery, Telegram compatibility panel, POST creation path, and publication API.

## Migration safety

- requires installed and valid V15.7.3 markers;
- appends one bounded V15.7.4 CSS layer without replacing existing CSS;
- rejects partial CSS/check/document marker states;
- validated repeat runs are successful no-ops;
- only globals.css, the V15.7 checker, and this document may change;
- Topic Page V15.6, Category Page, TopicCategoryTree, shared editor/parser, global component source, API, and Prisma remain protected.
