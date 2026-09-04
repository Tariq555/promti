# Promitly

A free library of ready-made AI prompts, plus a generator that rewrites a plain idea into a
structured prompt for a specific model (Claude, ChatGPT, Gemini, Grok, Mistral, DeepSeek).

Live at **https://promitly.com**

For how the system runs in production — hosting, dependencies, failure modes, rollback — read
**[SYSTEM.md](SYSTEM.md)**. This file only tells you how to run it locally.

## Prerequisites

| Tool | Version | Why |
|---|---|---|
| Node.js | **24.20.0** | Pinned in `.nvmrc` and `package.json` `engines`. Production builds on Node 24.x |
| npm | 11.x | Ships with Node 24 |

If you use [nvm](https://github.com/nvm-sh/nvm):

```bash
nvm install   # reads .nvmrc
nvm use
```

Check it worked:

```bash
node -v   # must print v24.20.0
```

## Setup

```bash
git clone https://github.com/Tariq555/promitly.git
cd promitly
nvm use
npm ci
cp .env.example .env.local
```

Now open `.env.local` and fill in the two values. Both come from the Supabase dashboard under
**Project Settings**. `.env.example` says exactly where to find each one.

You need a Supabase project with the schema applied. See
[supabase/migrations/](supabase/migrations/) and the Database section of
[SYSTEM.md](SYSTEM.md).

```bash
npm run dev
```

Open http://localhost:3000.

The app degrades instead of crashing when the environment is missing: if
`NEXT_PUBLIC_SUPABASE_ANON_KEY` is empty, the Supabase client is `null` and anything requiring an
account reports "Backend not configured." Pages still render. So if login silently does nothing,
check `.env.local` first.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server on port 3000 |
| `npm run build` | Production build. Run this before pushing — it typechecks too |
| `npm start` | Serve the production build locally |
| `npm run lint` | ESLint |

## Environment variables

Both are `NEXT_PUBLIC_*`, which means they are **inlined into the browser bundle at build time**,
not read at runtime. Two consequences that cause real incidents:

1. Changing them in the Vercel dashboard does nothing until you **redeploy**.
2. They are public. Anyone can read them in the shipped JavaScript. Security depends entirely on
   Supabase Row Level Security, not on hiding the key.

Never put a `service_role` key in a `NEXT_PUBLIC_*` variable.

## Project layout

```
src/app/          Routes (Next.js App Router)
  api/generate-prompt/   The only server-side code in the project
src/components/   UI components
src/context/      AuthContext — session state
src/data/         prompts.ts — the whole prompt catalogue, hardcoded
src/lib/          supabase.ts — client + every database call
supabase/migrations/   Database schema
```

## Contributing

`main` is protected and deploys straight to production. Work on a branch and open a pull request:

```bash
git checkout -b my-change
# ...edit...
npm run build          # must pass
git push -u origin my-change
gh pr create
```

Every pull request gets a Vercel preview deployment. Check your change there before merging.
