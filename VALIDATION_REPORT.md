# FORRUM v0.20.2-rc4 — validation report

## Sequential checkpoints

- v0.17 community workspace: passed static, UX and 32-test checkpoint.
- v0.18 events/governance: passed static, UX and 36-test checkpoint.
- v0.19 projects/services: passed static, UX and 39-test checkpoint.
- v0.20 promotion/points: passed static, UX and 42-test checkpoint.

Detailed checkpoint notes are in `docs/STAGE_17_VALIDATION.md` through `docs/STAGE_20_VALIDATION.md`.

## Final checks performed in this environment

- static parsing and local-import validation: passed;
- TypeScript/TSX files checked: 199;
- JSON files checked: 9;
- Prisma structural duplicate check: passed;
- Prisma schema: 55 models, 40 enums;
- autonomous rule tests: 42/42 passed;
- contracts package semantic TypeScript check: passed;
- UX truthfulness/regression check: passed on 64 interface files;
- CSS brace balance: 1499 opening / 1499 closing;
- literal internal route audit: 0 broken links across 43 page routes;
- native browser prompt/confirm/alert scan: 0 remaining;
- portfolio/project/service global-navigation noise check: passed;
- Docker Compose parse/static review: passed;
- backup shell-script syntax review: passed;
- AI dependency/source scan: passed;
- test-only local passwords identified as fixtures, not production secrets.

## Acceptance path prepared

`scripts/smoke-test.ps1` now contains 47 sequential steps, including:
- account/onboarding/security;
- media, BBCode, publication and comment flows;
- hierarchy, feed, subscriptions and search;
- moderation, appeal, workshop and governance;
- profiles, roles, trust, interactions and reviews;
- community workspace;
- event creation and attendance;
- portfolio creation and public visibility;
- transparent promotion purchase and grace-period refund.

## Attempted but not completed here

- API typecheck: blocked by absent NestJS/Node typings and ungenerated Prisma Client;
- web typecheck: blocked by absent React/Next/Node typings;
- official Prisma validation: Prisma CLI/client not available in this runtime;
- Docker build/run: no Docker daemon;
- production build and live browser testing: dependencies/services unavailable.

These are mandatory checks in `TEST_FORRUM.bat` on the target PC.


## Final audit additions — v0.20.2-rc4

- accessibility source audit: passed on 64 TSX files;
- images have alt text and buttons have accessible names;
- all onClick buttons have explicit type=button;
- skip navigation and visible keyboard focus present;
- 42/42 autonomous tests passed after changes;
- Docker project name and web healthcheck added;
- full dependency install attempted but blocked by this runtime's incomplete internal npm mirror (TypeScript 5.9.3 unavailable); target-PC TEST_FORRUM.bat remains mandatory.

## Windows launcher fix — v0.20.2-rc4

- reproduced the failure from UTF-8/LF BAT parsing in Windows CMD;
- replaced all root BAT launchers with ASCII-only CRLF scripts;
- added UTF-8 BOM and CRLF to PowerShell scripts used by Windows PowerShell 5.1;
- removed fragile inline CMD percent/pipe escaping from readiness loops where possible;
- re-ran static, UX, accessibility and 42 autonomous rule tests after the patch.
