# FORRUM Topic Reply Editor V15.6

This stage redesigns the TopicPage reply editor without touching the approved
category page.

Implemented:
- dark compact TopicPage reply editor;
- bold, italic, underline, strike;
- quote, code, list, spoiler and links;
- arbitrary integer text size from 10px to 48px;
- arbitrary six-digit HEX text color;
- image insertion from file picker;
- Ctrl+V image insertion from clipboard;
- image BBCode inserted at the captured text cursor/selection;
- inline preview;
- existing PNG/JPEG/WebP and 8 MB validation.

Rendering safety:
- custom color is accepted only as #RRGGBB;
- custom size is accepted only as 10px through 48px;
- invalid formatting values render as inherited text.

Compatibility:
- the new editor `mode` is optional;
- existing call sites keep default behavior;
- TopicPage reply composer explicitly opts into `topic-reply`.

Protected:
- approved `/communities/[slug]` page;
- category tree;
- API;
- Prisma;
- global header;
- homepage;
- Communities catalogue.

The create-topic page can reuse the same engine in the next stage.
