# ADR 0001: Modular monolith

## Status
Accepted for MVP.

## Decision
Use one NestJS API deployment with domain modules and one PostgreSQL database. Keep web separate as a Next.js application. Background workers and external search remain replaceable interfaces.

## Reason
The first goal is to validate the complete user path, not distributed infrastructure. A modular monolith keeps transactions, permissions and iteration simple while preserving future extraction boundaries.
