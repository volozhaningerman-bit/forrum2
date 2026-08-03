# ADR 0002: Internal API boundary

## Status
Accepted.

## Decision
All writes and protected reads go through the NestJS API. The web client never connects directly to PostgreSQL.

## Consequences
- One source of truth for verification, permissions and validation.
- Telegram, admin tools and games can reuse the same contracts later.
- A public third-party API is not implied and remains disabled.
