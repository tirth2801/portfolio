---
title: Personal Finance Ledger & Analytics Platform
repoUrl: https://github.com/tirth2801/qP_Home
icon: fas fa-chart-line
order: 1
stack: [Next.js, TypeScript, JSONL, Automated Testing]
outcome: "47 automated tests covering parsing, dedup, and analytics"
---

**Problem:** turn raw exported financial-activity CSVs into a reliable,
queryable local ledger — without a database, and without ever double-counting
a re-uploaded file.

**Approach:** a local-first Next.js/TypeScript app with a parse → ingest →
persist → derive pipeline. Every row is normalized and hashed across its raw
fields; re-ingesting an overlapping export replays the same hash/occurrence
pairs and inserts nothing new, while rows that share an identity but differ in
amount are flagged as amendment candidates instead of silently duplicated.

- Custom CSV ingestion pipeline with idempotent, hash-based deduplication.
- Append-only JSONL storage — no database, fully local, inspectable as plain text.
- P&L trends, a GitHub-style activity calendar heatmap, and per-category breakdowns.
- Live market-price integration for open positions, cached to avoid hammering the upstream API.
- 47 automated tests covering parsing, money normalization, dedup, and analytics bucketing.
