# V34 approved AI forum reference

Goal: implement the approved warm light reference and matching dark mode, with main navigation above the banner, compact topic rows, colored community/tag chips, Telegram next to bookmark, vertical author ranking and visible announcements.

User correction: no separate relative-time metadata or participant avatar stacks in topic rows. Retain topic author and latest reply. Banner statistics are directly on the art with static subtle contrast/glow, no separate strip.

Tasks:
- Generate matched light/dark production background assets, with HTML copy and native search above.
- Adapt existing HomeDashboard and theme CSS; retain API/auth and community identities.
- Add explicitly labeled read-only demonstration route, without creating fictional data in the database.
- Check live-data homepage and demo with keyboard, both themes, mobile widths, bookmark and Telegram scenarios.
- Package full checksum-guarded workflow against merged V33 c76076e8bae4c4839cee411282e53ec6be23f271.
