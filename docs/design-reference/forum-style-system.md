# Shared forum style (v88)

The approved homepage v87 is the visual baseline. Other routes use
`apps/web/app/forum-system.css`, loaded by the root layout after legacy utility
styles. `forum-fonts.css` supplies the same local Roboto fonts on every route.
Homepage geometry and its visual snapshots remain unchanged.

## Materials

- Page: #0d1012, subtle 24px grid.
- Panel: #24282b, square border #596065, restrained inset highlight and shadow.
- Important section heading: subdued red gradient, border #8d6569.
- Heading: #f1f3f4; supporting text: #b2b9bd.
- Compact item title: 14px / 18px, weight 500; excerpt: 12px / 16px.
- Primary action: off-white, dark text; secondary action: graphite, silver border.
- Red is reserved for section identity and destructive actions. Success,
  warning, category colors, avatar art and user-supplied covers retain meaning.

## Coverage

Shared styles cover directories, category/topic pages, profiles and inventory,
search, authentication, publishing/editor surfaces, messages, saved content,
notifications, subscriptions, account settings, wallet, activity, information
pages and administration. Applications has a CSS module and uses matching
materials explicitly. Protected routes retain their existing access checks.

Do not spread homepage corner marks to every nested row. Apply them to major
containers, preserve visual gaps, and maintain text contrast on dark surfaces.
Do not truncate full discussion content: only list excerpts use one-line ellipsis.

## Validation

The existing browser suite now includes communities, applications, ranking and
events in its 320/390/760/1280px overflow and WCAG checks. Existing homepage
visual checks remain unchanged. Additional read-only review uses public real
data for profiles, topics, category, media, workshop and guest states.
