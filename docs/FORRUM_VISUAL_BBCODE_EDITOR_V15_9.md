# FORRUM Visual BBCode Editor V15.9

## Goal

Replace raw in-text BBCode editing on topic surfaces with immediate visual formatting while retaining BBCode as the controlled storage and API value.

## Changes

- topic creation and reply editors use a visual contenteditable surface;
- typing and formatting are serialized back to the existing BBCode contract;
- stored BBCode is rendered back into editable visual HTML;
- text size uses a dark FORRUM panel with twelve presets and an instant 10–48 px slider;
- text colour uses thirty project-compatible colours plus live arbitrary HEX input;
- size and colour update the selected text immediately without showing BBCode tags;
- Link, Photo, Quote, Code, List and Spoiler have both an icon and a label;
- image paste and file upload remain inline at the current visual cursor;
- saved drafts resume silently without a restore/delete banner;
- the Telegram preview/check block is removed from Create Topic; future Telegram export remains a separate channel mechanism;
- FORRUM Preview remains the only explicit preview action.

## Safety

- requires the exact installed V15.8 editor and create form before first application;
- keeps the existing BBCode parser, renderer and publication API unchanged;
- validates previous V15.7/V15.6 topic, category, header and editor contracts;
- rejects partial V15.9 marker states;
- repeat runs are verified no-ops;
- tests static UX, accessibility, all workspaces, API and production build before pushing.
