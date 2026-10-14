# Bookstore API — MongoDB + Node.js + Mongoose (beginner → advanced)

A crash course built chapter by chapter. Each chapter ends in a working state and a
`chN:` commit — `git log --oneline` then `git checkout <hash>` to revisit any chapter.

## Setup

| Piece | Where |
|---|---|
| Database | MongoDB Atlas (`cluster0`), database `bookstore` |
| Secret connection string | `atlas-credentials.env` → `MONGODB_URI` (git-ignored, never commit) |
| Non-secret settings | `.env` → `MONGODB_DB=bookstore` (git-ignored; template in `.env.example`) |
| GUI | MongoDB Compass / Atlas web → Data Explorer → `bookstore` |
| Offline fallback | `docker compose up -d` + `MONGODB_URI=mongodb://localhost:27017/?replicaSet=rs0` |

Run any chapter: `npm run ch1` (scripts load `.env` then `atlas-credentials.env`).

Atlas checklist: your IP must be in **Network Access**; the DB user needs `readWrite`
on `bookstore`. Atlas is a 3-node replica set, so transactions (ch10) work out of the box.

## Chapters

| # | Chapter | Concepts | Time | Status |
|---|---|---|---|---|
| 1 | Hello Mongo: first documents | documents, collections, `_id`/ObjectId | ~15m | done |
| 2 | Schemas & models: the Book model, CRUD | schema-on-write in a schemaless DB | ~20m | built — your turn pending |
| 3 | Validation & errors + an Express API | validators vs unique index, E11000 | ~20m | built — your turn pending |
| 4 | Querying: filters, projection, sort, pagination, `lean()` | skip/limit cost vs cursor paging | ~20m | |
| 5 | Relationships: authors, reviews — embed or reference? | data locality, `populate`, N+1 | ~25m | |
| 6 | Break it: two buyers, one book → oversell | document-level atomicity, `$inc` | ~20m | |
| 7 | Hooks, virtuals, methods — the hook-bypass trap | where logic lives | ~20m | |
| 8 | Break it: 100k books, slow search → indexes | COLLSCAN vs IXSCAN, ESR rule | ~25m | |
| 9 | Aggregation: avg ratings, top sellers, `$lookup` | push work to the data | ~25m | |
| 10 | Transactions + production | multi-doc atomicity, pool, timeouts, shutdown | ~30m | |

## Each chapter's loop

1. Why we need it → 2. predict (one question) → 3. build in small chunks →
4. run it → 5. break it on purpose (ch6+) → 6. diagram → 7. commit →
8. **your turn** (you write a small extension) → 9. checkpoint question.

Controls any time: `pause`, `explain that line`, `simpler`, `another way`, `deeper`,
`rewind`, `skip`, `your turn`, `just build it`.
