# FORRUM Create Topic Workspace V15.7.3

## Goal

Synchronize the live **/create** route with the approved Topic Page V15.6 visual language without changing publishing behavior, APIs, Prisma, or shared editor logic.

## Visual result

- route-scoped graphite shell and header matching the Topic Page palette;
- readable title, breadcrumbs, labels, counters, and autosave states;
- approved category tree restyled inside the same dark workspace;
- two-column desktop layout: category tree plus the full-width authoring workspace;
- Telegram compatibility panel integrated below the authoring form and still collapsed by default;
- editor reduced from 380px to 258px minimum height so primary actions remain visible on common desktop screens;
- expanded Telegram content becomes a compact horizontal compatibility summary;
- responsive one-column layout below 900px and mobile toolbar/action treatment;
- reduced-motion accommodation.

## Preserved behavior

- separate section selector;
- topic title and up to five normalized hashtags;
- shared V15.6 BBCode editor with 10–48px sizes, HEX colors, Ctrl+V/paperclip inline images;
- FORRUM preview, local draft recovery, POST creation path, and current publication API;
- collapsed-by-default Telegram preview and compatibility checks.

## Migration safety

- requires installed and valid V15.7.2 markers;
- appends one bounded V15.7.3 CSS layer and preserves the existing globals.css byte-for-byte;
- rejects partial marker states;
- validated repeat runs are successful no-ops;
- only globals.css, the V15.7 checker, and this document may change;
- Topic Page V15.6, Category Page, TopicCategoryTree, shared editor/parser, global component source, API, and Prisma stay protected.
