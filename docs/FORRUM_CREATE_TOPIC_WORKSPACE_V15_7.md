# FORRUM Create Topic Workspace V15.7

## Goal

Build the approved Create Topic screen without rebuilding the already approved
community/section page and without creating another editor engine.

## Baseline reused

- global header remains protected;
- approved category tree remains protected and is reused;
- V15.6 BbcodeEditor is reused through `mode="topic-create"`;
- existing publication API is preserved;
- existing local draft storage is preserved.

## Topic creation screen

The default `/create` TOPIC flow now contains:

- approved left category tree;
- breadcrumbs;
- "Создать тему" heading;
- selected section with compact section change control;
- title field;
- hashtags with maximum five normalized tags;
- V15.6 editor;
- arbitrary 10–48px text size and HEX colors through the editor engine;
- Ctrl+V and paperclip image insertion at cursor through the editor engine;
- body counter and editor status strip;
- autosave with visible saved time;
- draft restore and clear;
- FORRUM preview;
- publish action;
- Telegram preview, collapsed by default.

## Telegram preview

V15.7 performs a local compatibility review only.

The preview is collapsed when the screen first opens. The user expands it
explicitly before reviewing Telegram adaptations, so the primary Create Topic
workspace remains focused and compact.

It detects:
- uploaded image blocks;
- arbitrary pixel-size BBCode;
- arbitrary HEX-color BBCode.

The UI explains when custom size/color will need adaptation to a standard
Telegram representation.

It does not claim to publish to Telegram and does not alter the Telegram API.

## Existing POST creation

The `format=POST` path remains functional and keeps the existing publication API
contract. It can switch into the new TOPIC workspace.

## Protected scope

No changes to:
- CategoryPage;
- topic page;
- TopicCategoryTree;
- BbcodeEditor V15.6;
- BBCode parser/renderer;
- header/footer;
- homepage;
- Communities catalogue;
- API;
- Prisma.
