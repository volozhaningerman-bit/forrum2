# FORRUM v0.20.2-rc4

A test-ready release candidate of the custom FORRUM social forum platform. No AI, FORRUM Games, real payments or automatic payouts are included.

## What this release completes

- community workspace and curator/team tools;
- events, attendance and configurable governance polls;
- projects/services portfolio linked to profiles and confirmed interactions;
- transparent promotion with configurable limits and internal test points;
- all earlier account, feed, BBCode, media, messaging, moderation, trust, reviews, backup and onboarding work.

## Quick Windows start

1. Install and start Docker Desktop.
2. Extract the archive to a separate folder, for example `C:\FORRUM-0.20-RC`.
3. Run `PRECHECK_PC.bat`.
4. Run `INSTALL_AND_START_FORRUM.bat`.
5. Open `http://localhost:3000`.
6. Run `TEST_FORRUM.bat`.
7. After automated checks pass, follow `FULL_TEST_CHECKLIST.txt`.

## Important documents

- `RELEASE_NOTES_v0.20.0_RC.txt` — completed work;
- `UX_AUDIT_v0.20.0.md` — final logic/noise/navigation audit;
- `VALIDATION_REPORT.md` — checks actually performed;
- `KNOWN_LIMITATIONS.md` — checks and infrastructure still required;
- `PROJECT_DECISIONS_CURRENT.txt` — fixed product rules;
- `SOURCE_MANIFEST_SHA256.txt` — source integrity manifest.

## Honest status

Ready for a clean local installation and full functional/UX testing. Not ready for a public production server until Docker/build/browser testing, migrations, HTTPS, real email, off-site backups, object storage, monitoring, load testing and independent security review are complete.


## Final pre-launch audit

See `FINAL_AUDIT_REPORT_v0.20.1.md`. The final pass added keyboard focus/skip navigation, explicit action-button types, web readiness checks, a Windows preflight script and a 13-stage acceptance test.
