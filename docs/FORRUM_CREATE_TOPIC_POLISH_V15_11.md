# FORRUM Create Topic Polish V15.11

V15.11 is a visual-density pass for the existing create-topic workspace. It does not change publishing, autosave, BBCode storage, image uploads, hashtag persistence, or API routes.

## Changes

- The create-topic interface uses 13 px control text without changing global site typography.
- Empty editor height is reduced to 210 px and the contenteditable surface grows naturally up to 640 px.
- Topic body text defaults to 14 px with safer 1.25 leading for user-selected 48–72 px spans.
- Primary and secondary toolbar actions use larger hit areas, 13 px labels, and 20 px SVG icons.
- The FORRUM preview uses ordinary `Название` and `Описание` labels without uppercase tracking.
- Preview padding and minimum description height are reduced while title and body remain visually separated.
- Mobile editor minimum height is 180 px.

## Protected scope

- Existing V15.7–V15.10 markers and checks remain valid.
- `bbcode-editor.tsx`, BBCode parsing, API controllers/services, Prisma, authentication, publishing, drafts, and Telegram export are untouched.
- The workflow accepts the exact installed V15.10 form and either confirmed valid V15.10 CSS build.
- V15.11 appends only its isolated CSS layer and never replaces the existing stylesheet.
