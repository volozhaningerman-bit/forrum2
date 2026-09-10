# FORRUM V34 — AI community reference

Baseline: c76076e8bae4c4839cee411282e53ec6be23f271 (merged V33).

## Changes

- Shared warm light / forest graphite layout. Day and night hero art is local WebP, ~355 KB combined.
- Primary navigation above hero; sidebar reserved for category tree, real counts and decorative boat.
- Search remains a native functional form. AI headline is positioning; the backend search capabilities are unchanged.
- Statistics directly over illustration with local radial shade and soft text glow. No separate strip or animation.
- Compact discussion rows: author avatar, colored community/parent/tag chips, expandable excerpt, latest reply, counts.
- No separate relative-time labels or participant stacks. Latest reply remains readable and links to the comment.
- Telegram posting button sits next to bookmark in every row. Existing permissions, channel selection and confirmation remain intact.
- Read rows subtly change background without disabling or washing out their text.
- Right column: discussed topics, numbered weekly author ranking, announcements. Header registration link for guests; create-topic button remains.
- Existing V33 admin-managed banner slots are retained. With no configured banners the hero uses the full width.

## Demo and production data

`/preview/home` is a read-only, noindex design demo, clearly labelled with demonstration data. It shows AI categories and sample activity. Demo links do not open fictional profiles/topics and save/post controls are disabled. Search remains real. Admin banner page links to the demo.

Production `/` uses actual API data. This update does not create fake users, seed activity, rename categories or change category URLs. The AI tree in the demo is a proposed taxonomy; production category migration needs a separate mapping of existing communities.

## Installation

Upload `forrum-v34-ai-reference-20260909.yml` into `.github/workflows/`, then run the manual V34 workflow in GitHub Actions. It checks baseline file hashes before writing, runs build, type checks, API and browser tests, then pushes a separate review branch. A mismatch aborts without overwriting source files. No automatic merge or deployment.

The workflow includes assets; no external download of illustrations is required. Browser screenshots are attached as an Actions artifact. Preview and production functionality were checked locally against a mock API; real Telegram messages were not sent.
