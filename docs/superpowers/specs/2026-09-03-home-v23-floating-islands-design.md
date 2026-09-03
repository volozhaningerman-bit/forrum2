# 4RRUM Home V23: Floating Islands Design

## Status

Approved by the product owner on 2026-09-03.

## Goal

Finish the current homepage without replacing its information architecture: restore natural document scrolling, sharpen the neo-forum visual language, make topic engagement visible, and turn the right rail and community hierarchy into complete product surfaces.

## Product constraints

- The homepage remains a dense working forum screen, not a landing page or SaaS dashboard.
- The visual character is “old forum, rebuilt for now”: warm paper or graphite, compact typography, restrained pixel accents, small radii, no gradients and no glass-heavy AI aesthetic.
- The document owns vertical scrolling. Desktop columns must not become independent scroll containers.
- Media and Services keep their current information roles and approximate height.
- “Сейчас на 4RRUM” is removed from the homepage because it duplicates the topic feed.
- The right rail is ordered: weekly ranking, 4RRUM news, forum statistics.
- Beta fallback data remains explicitly labelled as a beta example.
- The V23 homepage brand is a simplified typographic 4RRUM wordmark. Other pages retain their current header treatment until the style is rolled out site-wide.
- Existing Telegram publication sharing remains functional; only its topic-row trigger becomes an icon end cap.
- Topic reactions use the existing publication reaction API and expose LIKE, FIRE, and USEFUL. Counts remain visible even at zero.

## Layout and scrolling

- Remove the V22 desktop height lock and all desktop `overflow: hidden`/column `overflow-y: auto` behavior.
- Keep a natural-height three-column grid at desktop widths and normal responsive stacking below it.
- Do not make the left tree or right rail sticky when their content can exceed the viewport.
- The footer follows all homepage content in the normal document flow.

## Visual system

- Main island radius: 6px maximum.
- Internal row radius: 4px maximum.
- Use a two-stage shadow: a darker perimeter contact shadow plus a longer, softer cast shadow.
- Separate islands with 14–16px gutters and tonal surface differences rather than hard internal frames.
- Preserve accessible focus rings and reduced-motion behavior.

## Topics

- Feed tabs read `🔥 Тренд`, `✨ Новое`, and `Моя лента`.
- Answers, views, and latest activity labels and values are larger and given more horizontal space.
- Each topic shows a reaction trigger and count at all times.
- Reaction choices are ❤️ LIKE, 🔥 FIRE, and 💡 USEFUL.
- Telegram share is a narrow icon-only end cap attached to the far right of the row, with tooltip/accessible name and a restrained hover scale.

## Right rail

- Weekly participants show the top three horizontally with avatar, rank, username, and score; likes/activity tabs remain.
- News shows up to three visible entries.
- Statistics use `overview.stats` and a clearly labelled compact fallback only when real overview data is unavailable.

## Community tree

- Keep the hierarchy, but finish it with solid quiet spines and short branch notches rather than dotted file-manager connectors.
- Use deterministic color families for community marks.
- Parent rows are visually stronger; child rows remain quieter.
- Preserve keyboard-accessible expand/collapse controls and the existing mobile “show full structure” behavior.

## Acceptance criteria

1. At 1920×1080 and 1366×768 the browser document scrolls when content exceeds the viewport, and the footer can be reached.
2. No homepage desktop column owns an independent vertical scrollbar.
3. Weekly ranking, News 4RRUM, and statistics appear in that order; the live activity panel is absent.
4. All topic rows show a reaction count and an icon-only Telegram share end cap.
5. Reaction selection updates through the existing API and maintains a correct local aggregate count.
6. The homepage alone displays the simplified `4RRUM` typographic wordmark.
7. Light and graphite themes retain readable text, clear focus states, and the approved dense neo-forum character.
