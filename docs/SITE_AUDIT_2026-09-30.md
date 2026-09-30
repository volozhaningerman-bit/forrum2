# 4rrum site audit — 2026-09-30

Scope: production homepage and repository-wide release guardrails for the web/API stack.

## Standards used
- WCAG 2.2 AA-oriented checks for keyboard access, focus visibility, status announcements, reduced motion and touch ergonomics.
- Core Web Vitals-oriented checks for LCP/CLS/INP risk.
- OWASP secure response-header and same-origin request-hardening practices.
- Technical SEO basics: canonical metadata, robots, sitemap, social previews, structured data and app identity.
- Operational quality: error/loading states, regression gates, production version verification.

## High-priority findings addressed in v67
1. Root metadata was too minimal for a public forum.
   - Added metadataBase, title template, canonical URL, OpenGraph, Twitter, robots directives and WebSite/SearchAction JSON-LD.
2. No robots.txt / sitemap.xml / manifest route existed.
   - Added Next metadata routes plus a scalable app icon.
3. Browser security headers were incomplete.
   - Added CSP, HSTS, COOP, Origin-Agent-Cluster and DNS-prefetch policy while retaining nosniff/frame/referrer/permissions controls.
4. Production API rate limiting could see the reverse proxy IP instead of the real client IP.
   - Added explicit production trust-proxy handling, configurable through TRUST_PROXY_HOPS.
5. Homepage hero/logo images had no intrinsic dimensions.
   - Added width/height and high-priority hints to reduce CLS/LCP risk.
6. Dynamic topic-list changes were not announced to assistive technology.
   - Added a polite live region while preserving aria-busy.
7. Quality checks existed but were not all enforced in the main homepage workflow.
   - CI now gates on static validation, UX truthfulness, accessibility source checks and the new site-audit regression check in addition to tests/build/typecheck/browser regression.
8. Mobile rendering still carried a fixed page background.
   - Disabled fixed background attachment on small screens and strengthened touch/focus/reduced-motion behavior.
9. A stricter accessibility gate exposed action buttons without an explicit non-submit type.
   - Fixed the affected admin and game controls so incidental form submission cannot occur.
10. Existing community-role and promotion administration was functional but poorly surfaced and the UX regression check looked in the wrong file.
   - Added direct admin dashboard entries and pointed the regression check at the real connected implementation.

## Already healthy before v67
- Argon2id password hashing.
- Opaque hashed session tokens.
- HttpOnly + SameSite session cookie and Secure in production.
- DTO validation with whitelist/forbidNonWhitelisted.
- Helmet on API.
- Same-origin protection for unsafe API requests.
- Per-route request throttling and request IDs.
- Swagger disabled in production unless explicitly enabled.
- Keyboard focus trap for mobile navigation.
- Skip link and visible global focus treatment.
- 320/390/760/1024/1280/1600/1648/1920 responsive browser regression coverage.

## Remaining medium-term work
- Move rate-limit counters from process memory to a shared store before horizontal scaling.
- Add field Core Web Vitals/RUM collection (LCP, INP, CLS) and real-user dashboards.
- Add automated Lighthouse budgets in a dedicated job once production test data is stable.
- Expand sitemap generation to public topic/community/profile URLs when a stable public indexing API is available.
- Add automated axe-core runtime checks across authenticated and public journeys.
- Review CSP periodically if third-party integrations are introduced.
- Add backup-restore drills and synthetic uptime/latency alerting if not already provided by infrastructure.


## Follow-up findings addressed in v68
11. The root canonical and OpenGraph URL were inherited by child routes, which could cause public pages to advertise the homepage as their canonical URL.
   - Removed route-specific URL fields from root metadata and added explicit canonical/OpenGraph metadata to the main public routes.
12. Private/authenticated surfaces were blocked in robots.txt but did not send an HTTP noindex directive.
   - Added X-Robots-Tag: noindex, nofollow, noarchive to admin, account, inbox, settings and authentication routes.
13. The sitemap used the current time as lastModified for every entry on every request.
   - Removed synthetic modification timestamps so crawlers are not told unchanged pages were freshly updated.
14. Current-period user ranking could become a large empty panel even when real historical ranking data existed.
   - Empty weekly ranking now falls back to real all-time data; no fabricated users or counts are introduced.
15. Long community names were aggressively forced onto one line in the desktop sidebar.
   - Restored a two-line clamp so labels stay readable without breaking the approved compact grid.
16. Lower topic rows still incurred full rendering cost before entering the viewport.
   - Added content-visibility with an intrinsic size for later rows while preserving the first screen for LCP.
17. Cross-origin response hardening was missing CORP and legacy cross-domain policy protection.
   - Added Cross-Origin-Resource-Policy: same-site and X-Permitted-Cross-Domain-Policies: none.
18. Release checks now explicitly reject a global homepage canonical, missing public-route canonicals, missing private-route noindex headers and synthetic sitemap timestamps.

19. Dynamic topic, community and profile pages inherited generic root metadata.
   - Added request-deduped generateMetadata implementations with page-specific titles, descriptions, canonical URLs and noindex behavior for missing resources.


## v69 — production-grade follow-up audit

### Additional audit layers
- **Information architecture / desktop ergonomics:** checked the supplied 1900px production screenshot for navigation readability, hierarchy, scanability and forum-density consistency.
- **Hydration/network efficiency:** traced the homepage data path from server render through the first client effects to identify duplicate requests and unused origin calls.
- **Social sharing / crawler rendering:** checked whether the OpenGraph/Twitter preview format is broadly consumable by bots instead of relying on an SVG-only preview.
- **Assistive navigation semantics:** checked current-location exposure, unique landmarks/IDs, live feed announcements, keyboard focus and Windows forced-colors behavior.
- **User preference handling:** checked reduced motion, reduced data and high-contrast fallbacks.
- **Release regression coverage:** promoted the findings into CI assertions instead of leaving them as manual checklist items.

### Findings fixed in v69
20. The homepage requested `/events` during SSR even though no homepage component rendered event data.
   - Removed the request and kept the existing data contract with an empty events collection.
21. The server-rendered default topic feed was fetched again immediately after hydration.
   - Added a one-shot hydration guard so the default feed is downloaded once; deep-linked tabs/communities still fetch immediately.
22. Both the logo and the hero were marked high-priority images.
   - Reserved `fetchPriority="high"` for the actual LCP hero and left the small logo as a normal eager document image.
23. Root social previews pointed at the SVG hero artwork.
   - Added generated 1200×630 PNG OpenGraph and Twitter cards using Next ImageResponse.
24. Desktop navigation labels still had too little horizontal budget at the approved wide layout.
   - Rebalanced the desktop grid to 290px / fluid center / 330px and retained two-line community labels with full-name tooltips.
25. Sidebar navigation did not expose the currently selected community via `aria-current`.
   - Added current-page semantics for the home entry and selected community entry.
26. Decorative hero/topic art had no explicit reduced-data fallback.
   - Added `prefers-reduced-data` rules that remove nonessential artwork while preserving all text and controls.
27. High-contrast keyboard users relied on ordinary CSS colors for focus and panel separation.
   - Added `forced-colors` focus and structural border fallbacks.
28. Performance fixes could regress silently.
   - Browser regression now asserts that homepage startup does not call the unused events endpoint or duplicate the default feed request; source audit also enforces one LCP-priority image and generated PNG social cards.

### Remaining infrastructure-level work
The following are intentionally not presented as completed because they need production infrastructure, traffic or a shared service rather than a frontend-only patch:
- shared/distributed rate-limit storage before horizontal API scaling;
- real-user Core Web Vitals telemetry and dashboards;
- scheduled Lighthouse budgets against a stable production data fixture;
- runtime axe-core coverage for authenticated journeys;
- dynamic sitemap expansion beyond stable public routes;
- automated backup-restore drills plus synthetic uptime/latency alerting.


## v70 — CI hygiene follow-up

29. Three historical one-time migration workflows still appeared as failed workflow runs around normal main-branch releases, creating false red CI noise even though the active release checks passed.
   - Archived the two V34 patch workflows and the second v42 Tyuryaga patch workflow as read-only manual stubs.
   - Their complete implementation remains in Git history.
   - The site-audit regression now rejects reintroduction of executable migration payloads into these retired workflow files.

This leaves the active homepage/release checks as the signal for current code rather than mixing them with obsolete migration jobs.
