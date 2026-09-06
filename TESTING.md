# TESTING.md — test strategy

What Promitly tests, what it deliberately does not, and why.

The second half matters more than the first. A strategy that claims to test
everything is a strategy nobody follows.

**Last updated:** 2026-09-06 · Phase 2 of the DevOps manual

---

## 1. What we are defending against

Testing is not a virtue exercise. It buys protection against specific failures.
Promitly's real failure modes, from the Phase 0 audit and the R-01 incident:

| Failure mode | Caught by |
|---|---|
| A bad build ships wrong content to everyone at once | Typecheck + unit tests + CI (Phase 3) |
| Supabase unreachable or misconfigured | **Nothing yet.** Needs synthetic monitoring (Phase 4) |
| Wrong env var baked in at build time | **Nothing yet.** A green build proves nothing here |
| Prompt generation returns broken output | Unit tests — `src/lib/prompt-builder.test.ts` |
| API route accepts bad input or leaks errors | Integration test — `route.test.ts` |
| A page fails to render | E2E smoke test (P2-06 / P2-07, not yet written) |

Note rows two and three. **The outage that took production down for four months
would not have been caught by any test in this repository**, and still would not
be. That is a monitoring gap, not a testing gap, and pretending tests solve it
would be the most dangerous thing this document could do.

## 2. The layers

| Layer | Tool | Runs where | Touches the database? |
|---|---|---|---|
| Unit | Vitest | Laptop, then CI | No |
| Integration | Vitest | Laptop, then CI | No |
| E2E | Playwright *(planned)* | Local build, then a preview URL | Only if the test signs in |

Unit and integration tests need **no environment at all**. There is no server,
no deployment, and no network. This is why Phase 2 comes before the environment
work in Phase 5 — most of the logic here is pure and can be tested with nothing
running.

```bash
npm test              # run once
npm run test:watch    # re-run on change
npm run test:coverage # with coverage report
```

## 3. What we test

**`src/lib/prompt-builder.ts`** — the whole point of the product. Pure string
templating, no I/O, high branch count. Cheap to test and easy to break silently,
which is the ideal test target. Covers: domain classification and its
precedence, every model template, the unknown-model fallback, trimming, and
case-insensitive model matching.

**`src/app/api/generate-prompt/route.ts`** — the only server-side code in the
system. Tested through the real handler: valid requests, each validation
branch, malformed JSON, and the guarantee that internal errors never reach the
client.

**`getLiveUserCount()`** in `src/lib/supabase.ts` — the only pure function
there. The tests pin down that it is **synthetic**: a hardcoded base with a
date-seeded wobble that has never queried the database (risk R-19). Pinning
that behaviour means replacing it with a real query becomes a visible,
deliberate change rather than a silent one.

## 4. What we deliberately do not test, and why

| Not tested | Why |
|---|---|
| The Supabase wrappers in `src/lib/supabase.ts` | They are thin pass-throughs. A mocked test would assert that we call the SDK the way we call it — restating the implementation, not verifying behaviour. The real risks are RLS and reachability, which only a live call can prove |
| Row Level Security | Cannot be tested from the client. Verified directly against the API with `curl`, recorded in `SYSTEM.md` §6 |
| React components | Almost all presentational. Component tests here would mostly assert that markup is the markup. Revisit if real client-side logic appears |
| `src/data/prompts.ts` | Static content, not logic. A schema check would be worth more than unit tests if it ever gets large |
| Third parties (Vercel, Supabase, Web3Forms) | Not ours to test. We test our handling of their failures, once we have any |

## 5. Coverage, and why the number is scoped

Thresholds: **90%** lines / functions / statements, **85%** branches — enforced
against `src/lib/prompt-builder.ts` and `src/app/api/**` only.

That scope is deliberate, and it is the honest part of this document. Measuring
the whole of `src/` would report something near 5% — a number driven almost
entirely by untested React components we have *decided* not to test. It would
be technically accurate and completely uninformative, and the usual response is
to write hollow tests until the number improves.

So the rule is: **coverage is measured on the code we have committed to
testing.** Widening the scope is a deliberate decision that comes with writing
the tests to match, not a reporting change.

Current: 100% across the measured files.

## 6. Rules

1. A bug fix starts with a failing test that reproduces it.
2. Test behaviour, not implementation. If a refactor that changes no behaviour
   breaks a test, the test was wrong.
3. Descriptive test names — a failure should be readable without opening the file.
4. Arrange–Act–Assert.
5. No network, no real database, no timing dependence in unit tests. Use
   `vi.setSystemTime` for anything that reads the clock.
6. Build local `Date` objects with the local-time constructor, not UTC string
   literals, wherever the code under test reads local date parts. A UTC literal
   makes the test pass or fail depending on the machine's timezone.

Rule 6 exists because the first run of this suite failed on exactly that.

## 7. Known gaps

- **No E2E tests yet** (P2-06, P2-07).
- **No CI** — these tests only run when someone remembers (Phase 3).
- **No monitoring** — the largest gap in the system, and the one that caused the
  outage (R-02, Phase 4).
- **Preview and Production share one Supabase project.** Unit and integration
  tests never touch it, so this is safe today. It stops being safe the moment an
  E2E test signs up a user, because that user would be created in the production
  database. A separate project for preview is `P5-02`, and it must land before
  any E2E test touches auth or saved prompts.
