# FORRUM Create Topic Workspace V15.8

## Goal

Refine the shared BBCode editor and the Create Topic workspace after the live V15.7.4 review.

## Editor changes

- larger, clearer controls with explicit Link, Photo, Quote and List labels;
- 10–48 px font size dropdown that immediately wraps the selected text;
- project-native dark color popover with a curated palette and arbitrary HEX input;
- palette clicks apply immediately to selected text; custom HEX applies on Enter;
- size and color refuse to insert placeholder text when no text is selected;
- native operating-system color dialog and separate apply buttons are removed;
- the shared behavior is available to both topic creation and topic replies;
- paste and Photo still upload PNG, JPEG and WebP inline at the cursor.

## Create Topic cleanup

- removes the Ctrl+V explanation, the standard-size explanation and the arbitrary-format explanation;
- keeps only the live character counter below the editor;
- removes the redundant bottom autosave/clear row while retaining automatic local drafts and the heading state;
- keeps `Предпросмотр FORRUM` as the only preview entry point;
- renders hashtags as high-contrast FORRUM accent chips in the form and preview;
- increases create-page, editor and preview typography to match the louder content pages;
- forces the route footer into the dark workspace palette.

## Safety

- requires the installed V15.7.4 and V15.6 editor markers;
- applies exact source transformations and aborts on an unknown source shape;
- rejects partial V15.8 marker states;
- validates existing create, topic, category, header, home and interaction contracts;
- permits changes only to the create form, shared editor, global CSS, the V15.8 checker/apply script and this document;
- repeat runs are verified no-ops.
