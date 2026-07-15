---
title: Personal Finance Ledger & Analytics Platform
repoUrl: https://github.com/tirth2801/qP_Home
order: 8
featured: false
stack: [Next.js, TypeScript]
summary: Local-first CSV ingestion pipeline with idempotent dedup, P&L analytics, and live market-price integration.
---

- Custom CSV ingestion pipeline with idempotent, hash-based deduplication.
- Append-only JSONL storage — no database, fully local, inspectable as plain text.
- P&L trends, a GitHub-style activity calendar heatmap, and per-category breakdowns.
- Live market-price integration for open positions, cached to avoid hammering the upstream API.
- 47 automated tests covering parsing, money normalization, dedup, and analytics bucketing.
