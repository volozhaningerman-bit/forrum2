# FORRUM Section Page Polish V14.8

Polish stage after the successful V14.7 internal section-page layout.

Visual changes:
- replaces legacy white-square CommunityMark assets on this page with a consistent inline SVG symbol system;
- applies the same symbol system to the left category tree and current section header;
- increases tree row height, indentation clarity and label size slightly;
- gives the section identity header more vertical breathing room;
- increases topic thumbnails from 40px to 46px;
- increases topic title/body typography while keeping the forum table dense;
- keeps the recent-activity signal calm and makes pinned state distinguishable;
- does not rebuild the page architecture and does not change the global header component.

Demo QA content:
- adds four realistic TOPIC rows to Promotion;
- includes a pinned recently active discussion;
- includes a new unanswered topic;
- includes an older discussion outside the 14-day “Новые” filter;
- uses different existing demo authors, comments and view counts;
- the existing SEO child topic remains visible through parent aggregation.

Protected:
- global header/navigation;
- footer;
- homepage;
- Communities catalogue;
- API source;
- Prisma schema.

The seed change is demo content only; no schema or API contract change is introduced.
