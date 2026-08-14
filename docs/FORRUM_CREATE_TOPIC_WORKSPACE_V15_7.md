# FORRUM Create Topic Workspace V15.7.2

## Goal

Complete the V15.7 Create Topic migration after V15.7.1 rejected an installed
CSS tail whose hash was not one of its two hard-coded values.

## Migration strategy

- requires the installed V15.7 form and CSS markers exactly once;
- writes the final Create Topic form with a V15.7.2 marker;
- preserves the complete existing `globals.css` byte-for-byte;
- appends a bounded V15.7.2 override layer instead of deleting an unknown CSS
  tail;
- never relies on a hash of everything after the V15.7 marker;
- validates one start marker and one end marker for the override layer;
- treats a validated repeat run as a successful no-op.

## Final behavior

- approved category tree and compact section picker;
- title, up to five normalized hashtags, and the shared V15.6 editor;
- arbitrary 10–48 px text size and HEX colors;
- Ctrl+V and paperclip image insertion at the cursor;
- FORRUM preview, local draft recovery, and existing publication API;
- Telegram compatibility preview collapsed by default;
- existing POST creation path remains functional.

## Protected scope

No changes to Topic Page V15.6, CategoryPage, TopicCategoryTree, the shared
BbcodeEditor V15.6, BBCode parser/rendering, global header/footer, homepage,
Communities catalogue, API, or Prisma.
