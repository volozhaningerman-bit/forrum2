# 4RRUM Home V23 Floating Islands Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver a verified V23 homepage with natural document scrolling, compact floating-island styling, visible topic engagement, a useful right rail, a finished hierarchy, and a simplified homepage wordmark.

**Architecture:** Add V23 as a final homepage-specific CSS layer over V20–V22, while making small focused component changes for behavior and semantics. Reuse the existing Telegram share and publication reaction APIs, and keep data transformations in pure model functions that can be tested without a browser.

**Tech Stack:** Next.js 16, React 19, TypeScript 5.9, Node test runner, CSS custom properties, existing NestJS publication API.

**Spec:** `docs/superpowers/specs/2026-09-03-home-v23-floating-islands-design.md`

## Global Constraints

- Work only on branch `codex/home-v23-islands-20260903`, forked from current `origin/main`.
- Do not add a duplicate workflow file or reuse an earlier patch filename.
- Do not change database schema or API routes.
- Do not alter non-homepage visual behavior except for backwards-compatible component props.
- Preserve both light and graphite themes, keyboard focus, reduced motion, and responsive layout.
- Run red-green verification for new pure behavior before UI implementation.

---

### Task 1: Pure reaction and community presentation behavior

**Files:**
- Modify: `apps/web/test/home-model.test.ts`
- Modify: `apps/web/components/home/model.ts`

**Interfaces:**
- Produces: `applyTopicReaction(current, requested, result)` returning `{ count, viewerReaction }`.
- Produces: `communityToneIndex(slug)` returning a deterministic integer from 0 through 5.

- [ ] **Step 1: Write failing model tests**

Add literal tests proving: adding the first reaction increments once; replacing a reaction keeps the count; toggling the same reaction off decrements without going below zero; the same community slug always receives the same tone in the 0–5 range.

- [ ] **Step 2: Run the focused tests and verify RED**

Run: `node --experimental-strip-types --experimental-loader ./scripts/local-ts-loader.mjs --test apps/web/test/home-model.test.ts`

Expected: FAIL because `applyTopicReaction` and `communityToneIndex` do not exist.

- [ ] **Step 3: Implement the minimal pure functions**

Use the server response `{ active: boolean; type: string | null }` as the authority. Increment only from no reaction to active, decrement only from a reaction to inactive, and keep the aggregate unchanged when replacing one reaction with another. Hash the trimmed lowercase slug deterministically and modulo six.

- [ ] **Step 4: Run the focused tests and verify GREEN**

Run the Step 2 command and require zero failures.

### Task 2: V23 layout contract and natural document scrolling

**Files:**
- Create: `scripts/home-v23-floating-islands-check.mjs`
- Create: `apps/web/app/home-v23.css`
- Modify: `apps/web/app/layout.tsx`
- Modify: `apps/web/components/home-dashboard.tsx`
- Modify: `apps/web/app/page.tsx`

**Interfaces:**
- Consumes: existing V20–V22 class system.
- Produces: root marker class `forrum-home-v23` and `data-home-reference="v23"`.

- [ ] **Step 1: Create the failing V23 contract check**

The executable check must verify the new stylesheet import and root marker, reject the V22 desktop page-lock selectors from the effective V23 contract, require natural document overflow rules, require the right-rail order, and reject `ActivityPanel` usage from the dashboard.

- [ ] **Step 2: Run the contract check and verify RED**

Run: `node scripts/home-v23-floating-islands-check.mjs`

Expected: FAIL because V23 files and markers are absent.

- [ ] **Step 3: Add the V23 root and remove duplicated live-feed loading**

Import `home-v23.css` after V22, append the V23 root marker, remove `ActivityPanel`, remove the client activity refresh request/state, and remove the server `/feed?mode=all` homepage request.

- [ ] **Step 4: Implement natural scrolling in the V23 CSS layer**

Override desktop document, shell, root grid, tree, center, rail, and topic-list overflow to natural flow. Keep mobile tree expansion but remove desktop internal vertical scrollers. Add the compact 6px island radii and layered perimeter/cast shadows without gradients.

- [ ] **Step 5: Run the V23 contract check and verify GREEN**

Run the Step 2 command and require zero failures.

### Task 3: Topic engagement, larger metrics, and share end cap

**Files:**
- Create: `apps/web/components/home/topic-reactions.tsx`
- Modify: `apps/web/components/home/popular-topics-panel.tsx`
- Modify: `apps/web/components/telegram-share-button.tsx`
- Modify: `apps/web/app/home-v23.css`

**Interfaces:**
- Consumes: `applyTopicReaction`, publication `viewerReaction`, and `/publications/:slug/reaction`.
- Produces: always-visible reaction control and `variant="endcap"` Telegram share trigger.

- [ ] **Step 1: Build the reaction control using the tested state transition**

Render a visible aggregate button for every topic and a keyboard-accessible choice panel for LIKE, FIRE, and USEFUL. Post `{ type }` through the existing API, update from `applyTopicReaction`, prevent row navigation, and announce request errors without inventing a successful state.

- [ ] **Step 2: Convert the Telegram trigger into a compatible end-cap variant**

Add an optional `variant` prop. The end-cap renders an arrow/share glyph with visible tooltip and screen-reader label while preserving the existing dialog and default triggers elsewhere.

- [ ] **Step 3: Integrate topic controls and rename the tab**

Replace `🔥 Горячее` with `🔥 Тренд`, show reaction count at zero, pass `viewerReaction` when available, and place the end cap at the far row edge.

- [ ] **Step 4: Style larger metrics and interaction states**

Increase header and value sizes, widen the metric columns, keep narrow breakpoints readable, and add restrained hover/focus states with reduced-motion coverage.

- [ ] **Step 5: Run focused model tests, V23 contract, typecheck, and accessibility check**

Run the Task 1 test, `node scripts/home-v23-floating-islands-check.mjs`, `npm run typecheck -w @forrum/web`, and `npm run validate:a11y`.

### Task 4: Right rail, hierarchy, and homepage wordmark

**Files:**
- Create: `apps/web/components/home/forum-stats-panel.tsx`
- Modify: `apps/web/components/home/weekly-members-panel.tsx`
- Modify: `apps/web/components/home/community-tree.tsx`
- Modify: `apps/web/components/home-dashboard.tsx`
- Modify: `apps/web/components/site-header.tsx`
- Modify: `apps/web/app/home-v23.css`
- Modify: `scripts/home-v23-floating-islands-check.mjs`

**Interfaces:**
- Consumes: `HomeOverview['stats']`, `communityToneIndex`, and existing weekly user data.
- Produces: right rail ordered weekly/news/stats and a homepage-only `4RRUM` wordmark.

- [ ] **Step 1: Add the compact statistics panel**

Show messages, topics, communities, and online users from `overview.stats`; use explicit `Бета-пример` fallback values only when the overview is absent.

- [ ] **Step 2: Convert weekly ranking to a top-three horizontal podium**

Keep likes/activity tabs and scoring logic, but render only three participants as compact avatar-led cells with rank, username, and score.

- [ ] **Step 3: Finish the community hierarchy**

Apply `communityToneIndex` as a data attribute, restore solid quiet hierarchy spines/notches, strengthen parent rows, and preserve accessible toggles and mobile expansion.

- [ ] **Step 4: Add the homepage-only typographic brand**

Render a dedicated `4RRUM` wordmark variant in the existing brand link, hide legacy/neo symbols only while the V23 homepage is present, and collapse the homepage wordmark to the strong `4` monogram on narrow screens.

- [ ] **Step 5: Expand and run the V23 contract**

Require the final right-rail order, stats panel, top-three structure, deterministic tone usage, and V23 brand hook. Run the contract and require zero failures.

### Task 5: Full verification and visual audit

**Files:**
- Modify only if verification exposes a defect in the V23 files above.

**Interfaces:**
- Produces: a release-ready commit on the V23 branch.

- [ ] **Step 1: Run all repository checks**

Run: focused home tests, V20/V21/V22/V23 checks, static validation, UX validation, accessibility validation, workspace typecheck, and production build.

- [ ] **Step 2: Run browser verification**

Start the built app with available local data/fallbacks. At 1920×1080, 1366×768, 1024×768, and 390×844 verify document scrolling, reachable footer, no desktop column scrollbar, right-rail order, reaction/share focus behavior, and no horizontal overflow.

- [ ] **Step 3: Audit both themes against the approved reference**

Check that the result is dense, calm, minimal-radius, paper/graphite, recognizably forum-like, and free of glass gradients, oversized cards, duplicate blocks, clipped news, or invisible secondary text. Fix at least one weakness found in the first visual pass and repeat the audit.

- [ ] **Step 4: Review the final diff and commit**

Run `git diff --check`, inspect `git diff --stat` and the complete V23 diff, then commit with `feat(home): finish floating islands v23`.
