# Known limitations — FORRUM v0.20.2-rc4

This archive is prepared for full local testing, not public production.

## Not confirmed in the current environment

- Docker image build and startup;
- official `prisma validate` and generated Prisma Client;
- API and web semantic typecheck with installed workspace dependencies;
- production Next.js/NestJS build;
- browser, mobile-device and accessibility testing;
- live PostgreSQL transactions and advisory locks;
- actual email and Telegram delivery;
- backup restore against a running database.

The contracts package TypeScript check passed. API/web typecheck was attempted but stopped because NestJS, React/Next typings, Node typings and generated Prisma Client are not installed in this environment.

## Database upgrades

The local test installer still uses schema synchronization suitable for a clean alpha installation. A public server must use reviewed, versioned migrations and tested rollback/restore procedures.

## Promotion and economy

- internal points have no real-money value;
- no card/bank/crypto top-up;
- no withdrawal or transfer between users;
- no automatic curator salary, treasury split or payout;
- dynamic pricing needs live-behavior review before public use;
- administrative refund is an internal balance correction, not a payment-provider refund.

## Governance

- anti-raid and multi-account protection is a baseline, not a final election-security system;
- eligibility and quorum rules require testing with real community behavior;
- large public elections require independent security review and stronger fraud analysis.

## Storage and operations

- local Docker volumes are not sufficient for public production;
- off-site encrypted backups, S3-compatible storage, CDN, monitoring and alerting are still required;
- rate limiting is process-local until a shared distributed limiter is deployed.

## Deferred by product decision

- FORRUM Games;
- real payment rail;
- automatic payouts and revenue distribution;
- public developer API;
- native mobile applications;
- all AI features.
