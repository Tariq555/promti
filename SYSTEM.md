# SYSTEM.md — Promitly system of record

What this system is, what it depends on, what breaks it, and how to undo a bad change.

`README.md` tells you how to run Promitly. This file tells you how it behaves in production.

**Last verified:** 2026-09-04 · **Owner:** Tariq (sole operator)

---

## 1. What Promitly is

A static prompt library with one dynamic feature (the prompt generator) and one stateful feature
(accounts and saved prompts). Anonymous visitors can use almost all of it.

| Concern | Reality |
|---|---|
| Frontend | Next.js 16.2.3 App Router, React 19.2.4, TypeScript 5 strict, Tailwind 4. Mostly `"use client"` |
| Backend | One route handler, `POST /api/generate-prompt`. It is a **pure function** — string templating, no I/O, no API key |
| Database | Supabase Postgres, project `nlfkhfqvfmrjhcirywqk`, region eu-west-1 (Ireland), free tier |
| Auth | Supabase Auth, email + password. **Email confirmation is off** (`mailer_autoconfirm: true`), so signup returns a live session immediately |
| Data access | The **browser talks directly to Supabase** with the publishable key. There is no server-side data layer. Security is Row Level Security, nothing else |
| Contact form | Web3Forms, a third-party form-to-email service, called from the browser |
| Analytics | Home-grown. One insert into `prompt_analytics` when a prompt is copied |
| Content | 130+ prompts hardcoded in `src/data/prompts.ts`. No CMS |
| AI provider | **None at runtime.** The generator is deterministic templating, not a model call |
| Payments, queues, cache, background jobs, file storage | None |

## 2. Architecture

```
                    ┌──────────────────────────────────────────┐
   Visitor ────────▶│  Vercel edge  (promitly.com)             │
                    │  Static pre-rendered HTML — cache HIT    │
                    │  No code runs for most requests          │
                    └───────────────┬──────────────────────────┘
                                    │
                 ┌──────────────────┴───────────────────┐
                 │                                      │
                 ▼                                      ▼
   ┌───────────────────────────┐          ┌──────────────────────────────┐
   │ POST /api/generate-prompt │          │  Browser JavaScript          │
   │ Vercel function           │          │  (the only stateful client)  │
   │ Pure function, no I/O     │          └───────┬──────────────┬───────┘
   └───────────────────────────┘                  │              │
                                                  ▼              ▼
                              ┌────────────────────────┐  ┌──────────────┐
                              │ Supabase (eu-west-1)   │  │  Web3Forms   │
                              │ Postgres + Auth        │  │ contact form │
                              │ Guarded only by RLS    │  └──────────────┘
                              └────────────────────────┘
```

**The single most important fact:** most pages are statically pre-rendered at build time. For most
visitors no code runs at request time — the edge returns a file.

This inverts the usual risk profile. Outages will not come from server load. They come from:

1. A **bad build** deployed — every visitor gets the wrong files at once.
2. **Supabase** unavailable — accounts break, pages still load fine.
3. A **wrong environment variable at build time** — baked into the static output.

It is also why the site can look perfectly healthy while being badly broken. See section 7.

## 3. Hosting

| Thing | Value |
|---|---|
| Platform | Vercel, org `tariq555s-projects`, project `promitly` |
| Production URL | https://promitly.com |
| DNS | Fully delegated to Vercel (`ns1.vercel-dns.com`, `ns2.vercel-dns.com`) |
| Build | `npm run build`, Node 24.x (from `engines.node`) |
| Region | Edge cached globally; functions in Stockholm (`arn1`) |
| Plan | Hobby |

DNS being delegated to Vercel means a DNS change is a click in their dashboard — and that Vercel
is a single point of failure for the domain itself, not just the hosting.

## 4. External dependencies and what breaks without them

| Dependency | What it serves | If it is unavailable | Severity |
|---|---|---|---|
| **Vercel** | Hosting, DNS, CDN, builds | Whole site down, domain unresolvable | Total |
| **Supabase** | Postgres, Auth | Signup, login, sessions, saved prompts, account deletion, copy analytics all fail. **Every page still loads** and prompt browsing still works | Partial, and easy to miss |
| **Web3Forms** | Contact form delivery | Contact form fails to submit. Nothing else affected | Low |
| **Google Fonts** | Webfonts | Fallback system fonts render. Cosmetic | Very low |
| **npm registry** | Builds | Cannot deploy. Running site unaffected | Deploy-blocking |

Supabase is the dangerous one. Losing it degrades the site **silently** — HTTP 200 everywhere.

## 5. Environment variables

Names only. Values live in the Vercel dashboard and your local `.env.local`. See `.env.example`.

| Name | Set in | Notes |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Vercel (Production, Preview, Development) + local | Public |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Vercel (Production, Preview, Development) + local | Public by design. Safe **only** because RLS is correct |

Both are `NEXT_PUBLIC_*`, so they are **inlined at build time**, not read at runtime.

> **Changing a value in the Vercel dashboard has no effect until you redeploy.** This has already
> caused one incident. See section 8.

Neither is a secret. There is no `service_role` key anywhere in this project, and there must never
be one in a `NEXT_PUBLIC_*` variable — that key bypasses RLS completely.

## 6. Database

Schema lives in `supabase/migrations/`. It is the source of truth; apply it with the Supabase SQL
Editor or CLI. The older `supabase-schema.sql` at the repo root is **stale and wrong** — it should
be deleted.

| Table | Purpose | Client access under RLS |
|---|---|---|
| `profiles` | Mirrors `auth.users`, created by an `on_auth_user_created` trigger | Owner reads/updates own row only |
| `saved_prompts` | A user's saved prompt slugs | Owner full access to own rows only |
| `prompt_analytics` | One row per prompt copy | **Insert only.** No client can read it |

Plus `public.delete_user()`, a `SECURITY DEFINER` function scoped to `auth.uid()`, called by the
account deletion button. Execute is revoked from `anon`.

Every table has RLS enabled with one policy per verb. There is no blanket `USING (true)` read
anywhere. Verify from a terminal at any time:

```bash
K="<publishable key>"; H="https://nlfkhfqvfmrjhcirywqk.supabase.co"
curl -s "$H/rest/v1/saved_prompts?select=*" -H "apikey: $K"      # expect []
curl -s -X POST "$H/rest/v1/rpc/delete_user" -H "apikey: $K" -d '{}'  # expect permission denied
```

**No backups are configured.** The free tier has no PITR. Treat all data as expendable — this is an
open risk, not a decision.

## 7. Failure modes

| Failure | Symptom | How you find out today |
|---|---|---|
| Supabase project deleted or paused | Auth and saved prompts dead. **Every page returns HTTP 200** | Nobody. This happened and went unnoticed for ~133 days |
| Wrong env var at build time | Same as above, and baked into static output | Nobody |
| Bad build deployed | Wrong content for all visitors at once | Nobody |
| Vercel outage | Site unreachable | Vercel status page |
| RLS policy mistake | Silent data exposure, no error anywhere | Nobody |

**There is no monitoring.** An uptime check is worthless here — the site returned 200 throughout a
four-month auth outage. Any monitor must exercise the authenticated path (sign in, read a row), not
just fetch the homepage.

## 8. Deployment

Vercel is connected to GitHub `Tariq555/promitly`.

| Trigger | Result |
|---|---|
| Push to `main` | Production build → promitly.com |
| Open a pull request | Preview deployment on its own URL |

`main` is protected: changes go through a pull request.

Build takes roughly 45 seconds.

**Changing an environment variable requires a redeploy.** Setting it alone changes nothing, because
`NEXT_PUBLIC_*` is inlined at build time.

Also: `vercel link` and `vercel env pull` **overwrite your local `.env.local`** with whatever Vercel
currently holds. If Vercel holds stale values, this silently reverts your local setup.

## 9. Rollback

**Fastest — a bad deploy (seconds):**

```bash
vercel ls promitly              # find the last known-good deployment
vercel rollback <deployment-url>
```

Or Vercel dashboard → Deployments → the good one → **Promote to Production**. No rebuild, so it is
near-instant and cannot fail on a build error.

**A bad commit already on `main`:**

```bash
git revert <sha>
git push origin main            # triggers a fresh production deploy
```

Prefer `revert` over `reset --force`. Rewriting published history breaks every other clone.

**A bad environment variable:**

```bash
vercel env rm  NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel redeploy <production-url>   # required — the value is inlined at build time
```

**A bad database migration:** there is no automatic rollback and no backup. Write the reverse SQL
*before* applying anything, and keep it next to the migration. This is the weakest part of the
system.

## 10. Access and contacts

| System | Account |
|---|---|
| Vercel | `tariq555` (`tariq555s-projects`) |
| GitHub | `Tariq555/promitly` |
| Supabase | `tariqhh2@gmail.com`, org `promitly` |
| Domain DNS | Managed inside Vercel |

Every system is owned by one person, with no second operator and no shared recovery path. That is
itself a risk: if that account is lost, Promitly cannot be recovered.

**Note:** a second Supabase account (`devlabmod555's Org`) also exists and holds unrelated
projects. Promitly is **not** in it. Confusing the two has already cost debugging time.
