# PROMITLY — DEVOPS MASTER MANUAL
### A Real Production Engineering + Professional English Program
### دليل بروميتلي الشامل لهندسة الإنتاج والـ DevOps

| Field | Value |
|---|---|
| **Manual version** | `v0.2.0` |
| **Created** | 2026-08-31 |
| **Last updated** | 2026-09-04 |
| **Laboratory system** | Promitly — `~/Documents/promitly` — live at `https://promitly.com` |
| **Repository** | `github.com/Tariq555/promitly` |
| **Baseline audit** | Phase 0 discovery, completed 2026-08-31 (read-only) |
| **Status** | Phase 1 near complete — 10 / 12 `VERIFIED`. **R-01 RESOLVED 2026-09-04: production auth rebuilt on Supabase `nlfkhfqvfmrjhcirywqk` and verified live.** P1-06 `IMPLEMENTING`, P1-12 `BLOCKED`. |

> **This manual is a living document.**
> It is not written once and archived. Every time you implement, break, debug, or recover
> something in Promitly, you come back here and update it. In three months this file should be
> the honest engineering history of how a hobby Next.js site became a production-grade system —
> and the record of how you learned to do it.

> **هذا الدليل وثيقة حية.**
> لا يُكتب مرة واحدة ثم يُنسى. في كل مرة تُنفّذ أو تكسر أو تُصلح أو تسترجع شيئًا في بروميتلي،
> تعود إلى هنا وتُحدّثه. بعد ثلاثة أشهر يجب أن يكون هذا الملف هو السجل الهندسي الصادق
> لكيفية تحوّل موقع بسيط إلى نظام إنتاجي حقيقي، وسجلّ كيف تعلمت أنت ذلك.

---

## TABLE OF CONTENTS

| Part | Title | Laboratory | Status |
|---|---|---|---|
| **0** | How To Use This Manual | — | 📖 Ready |
| **1** | Promitly Baseline — The Truth About Our System | Promitly | 📖 Ready |
| **2** | DevOps Foundations | Promitly + Linux Lab | 🔒 Locked |
| **3** | Git and GitHub | Promitly | 🔒 Locked |
| **4** | Software Quality and Testing | Promitly | 🔒 Locked |
| **5** | Continuous Integration | Promitly | 🔒 Locked |
| **6** | Continuous Delivery and Deployment | Promitly | 🔒 Locked |
| **7** | Environments | Promitly | 🔒 Locked |
| **8** | Docker and Containers | Promitly + Lab | 🔒 Locked |
| **9** | Linux Server Lab | Separate Lab | 🔒 Locked |
| **10** | Networking | Promitly (real domain) | 🔒 Locked |
| **11** | Cloud (AWS) | Separate Lab | 🔒 Locked |
| **12** | Infrastructure as Code (Terraform) | Promitly + Lab | 🔒 Locked |
| **13** | Configuration Management (Ansible) | Separate Lab | 🔒 Locked |
| **14** | Orchestration — Why It Exists | Conceptual | 🔒 Locked |
| **15** | Kubernetes | Separate Lab | 🔒 Locked |
| **16** | Observability | Promitly | 🔒 Locked |
| **17** | Security / DevSecOps | Promitly | 🔒 Locked |
| **18** | Database Reliability | Promitly (Supabase) | 🔒 Locked |
| **19** | Reliability Engineering / SRE | Promitly | 🔒 Locked |
| **20** | Advanced Deployments | Promitly + Lab | 🔒 Locked |
| **21** | Performance and Scaling | Promitly | 🔒 Locked |
| **22** | Incident Response | Promitly + Lab | 🔒 Locked |
| **23** | Senior DevOps Thinking | Everywhere | 🔒 Locked |
| **A** | Master Checklist | — | 📖 Ready |
| **B** | Change Log | — | 📖 Ready |
| **C** | Architecture Evolution | — | 📖 Ready |
| **D** | English Vocabulary Index | — | 📖 Ready |

**Locked (🔒)** does not mean forbidden. It means the chapter is not yet written in full detail,
because writing it before you have done the earlier work would produce a tutorial you skim
instead of a manual you use. Each Part is expanded when the previous Phase reaches `VERIFIED`.

---

# PART 0 — HOW TO USE THIS MANUAL

## 0.1 The problem this manual solves

Most people "learn DevOps" like this:

```
Watch a course  →  Follow the commands  →  It works  →  Feel confident
      →  Real job  →  Something breaks  →  No idea what to do
```

This fails because the course removed the two things that actually teach you: **ownership** and
**failure**. You never chose the architecture, so you never understood the trade-offs. Nothing
ever broke in a way you had to fix, so you never built diagnostic instinct.

This manual works differently:

```
READ  →  UNDERSTAND  →  IMPLEMENT  →  VERIFY  →  BREAK  →  DEBUG  →  DOCUMENT
```

Seven steps. **A chapter is not complete until all seven are done and evidence exists.**

> **بالعربية:**
> معظم الناس يتعلمون DevOps بمشاهدة دورة ونسخ الأوامر. المشكلة أن هذه الطريقة تحذف أهم عنصرين
> في التعلّم: **المسؤولية** و**الفشل**. أنت لم تختر البنية، فلم تفهم المقايضات (trade-offs)،
> ولم ينكسر شيء فعليًا، فلم تبنِ حدسًا تشخيصيًا. في هذا الدليل، الفصل لا يكتمل إلا بعد أن
> تقرأ، وتفهم، وتُنفّذ، وتتحقق، وتكسر، وتُشخّص، وتوثّق — مع وجود دليل ملموس على كل خطوة.

## 0.2 The seven steps explained

| Step | English | Arabic | What it actually means here |
|---|---|---|---|
| 1 | **READ** | اقرأ | Read the chapter. Do not type anything yet. |
| 2 | **UNDERSTAND** | افهم | Answer the chapter's *Check Your Understanding* questions **in your own words, in English**. If you cannot explain it, you did not understand it. |
| 3 | **IMPLEMENT** | نفّذ | Perform the hands-on task on Promitly (or the designated lab). |
| 4 | **VERIFY** | تحقّق | Prove it worked with an observable signal — command output, a green CI run, an HTTP header, a dashboard. **"It looks fine" is not verification.** |
| 5 | **BREAK** | اكسر | Deliberately break what you just built, in a safe environment. |
| 6 | **DEBUG** | شخّص | Diagnose the breakage from evidence, not memory. Write down the evidence chain. |
| 7 | **DOCUMENT** | وثّق | Record it in the Change Log (Part B) and update the checklist. |

**Why step 5 exists — this is the single most important idea in the manual.**

An engineer who has only ever seen a system work does not understand the system. They understand
the *happy path*. Production does not run on the happy path. Every senior engineer you will ever
work with earned their seniority by watching things fail and being forced to explain why.

> **لماذا خطوة "اكسر"؟**
> المهندس الذي رأى النظام يعمل فقط لا يفهم النظام، بل يفهم "المسار السعيد" (happy path).
> والإنتاج لا يعمل على المسار السعيد. كل مهندس كبير اكتسب خبرته من مشاهدة الأشياء تفشل
> واضطراره لتفسير السبب. لذلك نكسر الأشياء عمدًا — لكن في بيئة آمنة، وليس في الإنتاج.

## 0.3 Risk classification — read this before touching anything

Promitly is **live**. Real people use it. Every task in this manual carries one of these labels,
and you must never skip the label.

| Label | Meaning | Rule |
|---|---|---|
| 🟩 `LOCAL ONLY` | Affects only your machine. Nothing reaches GitHub or Vercel. | Just do it. |
| 🟦 `SAFE IN DEVELOPMENT` | Committed to a branch, but does not touch production. | Do it on a branch, never directly on `main`. |
| 🟨 `STAGING` | Runs in a production-like environment that is not production. | Requires a staging environment to exist first (Phase 5). |
| 🟧 `PRODUCTION CHANGE` | Real users are affected. | Requires the **five-step production protocol** below. |
| 🟥 `HIGH RISK` | Could cause data loss, outage, or an irreversible change. | Requires a written plan, a tested rollback, and a deliberate decision to proceed. Never do this while tired or rushed. |

### The five-step production protocol
### بروتوكول التغيير في الإنتاج — خمس خطوات

Every 🟧 and 🟥 task in this manual is written in this exact shape. If a task is not written
in this shape, it is not ready to be executed.

```
1. PRE-CHECK      What is the current state? Record it. (فحص الحالة الحالية وتسجيلها)
2. SAFETY         What is the backup / escape hatch? (نسخة احتياطية أو مخرج آمن)
3. IMPLEMENT      The actual change. Smallest possible. (التغيير نفسه، بأصغر حجم ممكن)
4. VERIFY         How do I prove it worked? (كيف أُثبت أنه نجح؟)
5. ROLLBACK       Exact steps to undo it, written BEFORE step 3. (خطوات التراجع، مكتوبة مسبقًا)
```

> **Senior lesson:** You write the rollback **before** you make the change, not after it fails.
> Writing it afterwards means writing it in a panic, at the worst possible moment, with users
> watching. This is not paranoia — it is the difference between a professional and an amateur.
>
> **درس احترافي:** تكتب خطة التراجع **قبل** التغيير لا بعد فشله. كتابتها بعد الفشل تعني كتابتها
> تحت الضغط وفي أسوأ لحظة ممكنة. هذا ليس خوفًا زائدًا، بل هو الفرق بين المحترف والهاوي.

## 0.4 What counts as evidence

You may not mark a task `VERIFIED` without evidence. Acceptable evidence:

- 📋 Command output pasted into the Change Log (with the command that produced it)
- 🟢 A passing CI run (link to the GitHub Actions run)
- 🚀 A successful deployment (Vercel deployment URL + commit SHA)
- 🔗 A Git commit SHA
- 📊 A monitoring dashboard screenshot or an alert that fired
- 📄 A `terraform plan` output
- ☸️ `kubectl` output
- 📕 A written incident report

**Not acceptable as evidence:** "I did it", "it worked", "the site loads fine".

> **ما الذي يُعتبر دليلًا؟**
> لا يحق لك وضع علامة `VERIFIED` بدون دليل ملموس: مخرجات أمر، أو تشغيل ناجح لـ CI، أو نشر ناجح،
> أو رقم commit، أو لقطة من لوحة المراقبة. عبارات مثل "لقد فعلتها" أو "يبدو أنه يعمل"
> **ليست دليلًا**.

## 0.5 Task status values

```
NOT STARTED   لم يبدأ        You have not read the chapter yet.
LEARNING      قيد التعلّم     Reading and understanding. No implementation yet.
IMPLEMENTING  قيد التنفيذ     Actively doing the hands-on work.
BLOCKED       متوقف          Cannot proceed. The reason MUST be written down.
VERIFIED      تم التحقق       Implemented AND proven with evidence.
MASTERED      متقن           Verified, AND you broke it, debugged it, and can teach it.
```

The gap between `VERIFIED` and `MASTERED` is the gap between "I configured it" and
"I can operate it at 3am during an outage." Most engineers never cross it. This manual is
designed to push you across.

## 0.6 Progress dashboard

> **These are real starting values, not examples.** Nothing has been implemented yet.
> Update these numbers only when a task moves to `VERIFIED` or `MASTERED` in the Master Checklist.

```text
PROMITLY DEVOPS PROGRESS — as of 2026-09-04

Overall Progress
██░░░░░░░░░░░░░░░░░░  10%    (10 / 96 tasks verified)

DevOps Knowledge        ██░░░░░░░░░░░░░░░░░░   8%
Hands-on Implementation ██░░░░░░░░░░░░░░░░░░  10%
Professional English    ██░░░░░░░░░░░░░░░░░░   8%   ← README + SYSTEM.md written in English
Production Readiness    ████░░░░░░░░░░░░░░░░  20%   ← 11% still borrowed from Vercel
Interview Readiness     ██░░░░░░░░░░░░░░░░░░   8%

Phase 1: 10 / 12 VERIFIED · P1-06 IMPLEMENTING · P1-12 BLOCKED (sandbox denial)
```

**Why is Production Readiness already 11% when nothing has been done?**

Because Vercel donates a genuine amount of production engineering: TLS certificates, a global
CDN, atomic immutable deployments, instant rollback capability, and DDoS absorption. That is
real production infrastructure that you did not build and currently do not understand.

That 11% is honest — but it is also **borrowed, not earned**. One of the goals of this manual is
to convert borrowed capability into understood capability, so that if you ever leave Vercel you
do not lose the knowledge with it.

> **لماذا "جاهزية الإنتاج" 11% ولم نفعل شيئًا بعد؟**
> لأن Vercel تمنحك مجانًا: شهادات TLS، وشبكة توزيع محتوى عالمية (CDN)، ونشرًا ذريًا غير قابل
> للتغيير، وإمكانية تراجع فوري، وحماية من هجمات الحرمان من الخدمة. هذه بنية إنتاجية حقيقية
> لم تبنِها أنت ولا تفهمها حاليًا. النسبة صادقة، لكنها **مُعارة وليست مكتسبة**. أحد أهداف
> هذا الدليل هو تحويل القدرة المُعارة إلى قدرة مفهومة.

## 0.7 Recommended rhythm

| Frequency | Activity |
|---|---|
| Per session (60–90 min) | One chapter section, or one checklist task through all seven steps |
| Per week | Close at least one task to `VERIFIED` with evidence |
| Per phase | Update the Progress Dashboard, the Architecture Evolution (Part C), and write a short retrospective in English |
| Per month | Re-read your own Change Log. If you cannot explain an entry you wrote, that topic is not `MASTERED` — demote it |

**Do not rush the phases.** Phase 1 looks boring — `.env.example`, Node version pinning,
documentation. It is the most important phase in the manual, because every later phase assumes
the system is reproducible. Building CI on top of a non-reproducible project produces a pipeline
that fails randomly and teaches you nothing except frustration.

---

# PART 1 — PROMITLY BASELINE
## The Honest Truth About Our System
## الحقيقة الكاملة عن نظامنا الحالي

> Everything in this Part is **evidence-based**. Every claim has a command or a file behind it.
> Where something could not be verified, it says so explicitly. A baseline that contains guesses
> is worse than no baseline, because you will build on top of the guess.

## 1.1 Executive overview

**Promitly is a well-built Next.js application riding on a managed platform that hides the
absence of every DevOps practice.**

That sentence is the whole audit compressed into one line. Let us unpack it, because both halves
matter.

**"Well-built Next.js application"** — this is genuine. The code is TypeScript in `strict` mode.
Secrets are correctly gitignored and have never been committed. Row-Level Security is enabled on
most tables. SEO metadata is thorough. The site is fast and it is up. This is not a bad project.

**"Riding on a managed platform that hides the absence of every DevOps practice"** — this is the
problem. Vercel is doing so much for you that the system *appears* production-grade from the
outside while having no tests, no CI, no staging, no monitoring, no alerting, no infrastructure
as code, and no rehearsed rollback. The platform is carrying the system. You are not.

> **الخلاصة التنفيذية:**
> بروميتلي تطبيق Next.js مبني بشكل جيد، لكنه يعتمد على منصة مُدارة (Vercel) تُخفي غياب كل
> ممارسات الـ DevOps. النصف الأول صحيح: الكود مكتوب بـ TypeScript في الوضع الصارم، والأسرار
> غير مرفوعة إلى Git، وأمان الصفوف (RLS) مُفعّل على معظم الجداول. لكن النصف الثاني هو المشكلة:
> لا توجد اختبارات، ولا CI، ولا بيئة staging، ولا مراقبة، ولا تنبيهات، ولا بنية تحتية ككود،
> ولا خطة تراجع مُجرّبة. المنصة هي التي تحمل النظام — وليس أنت.

### The one question that defines our starting point

> **If promitly.com broke right now, how would you find out?**

**Today's honest answer: you would have to visit the website yourself and notice.**

There is no uptime check, no error tracker, no alert, no dashboard, no log aggregation. If the
site returned HTTP 500 to every visitor at 2am on a Saturday, it would stay broken until you
personally opened a browser. That could be hours. It could be days.

Everything else in this manual — every test, every pipeline, every container — is downstream of
that gap. A system you cannot observe is a system you cannot operate.

> **السؤال الذي يحدد نقطة انطلاقنا:**
> لو تعطّل الموقع الآن، كيف ستعرف؟ الإجابة الصادقة اليوم: **بأن تزور الموقع بنفسك وتلاحظ.**
> لا يوجد فحص توفّر، ولا تتبّع أخطاء، ولا تنبيهات، ولا لوحات مراقبة. لو أعاد الموقع خطأ 500
> لكل الزوار في الثانية صباحًا يوم السبت، لبقي معطّلًا حتى تفتح المتصفح بنفسك. النظام الذي
> لا تستطيع مراقبته هو نظام لا تستطيع تشغيله.

## 1.2 Repository state

| Item | Value | Evidence command |
|---|---|---|
| Path | `/Users/mr.tariqdevops/Documents/promitly` | `find ~ -iname "*promitly*"` |
| Remote | `https://github.com/Tariq555/promitly.git` (HTTPS) | `git remote -v` |
| Branches | `main` **only** — local and remote | `git branch -a` |
| HEAD | `bdfba0a` — "Add Google Search Console verification meta tag" | `git log -1` |
| Sync | local `main` == `origin/main`, tree clean | `git rev-parse HEAD origin/main` |
| Commits | 11, all between 2026-04-16 and 2026-04-20 | `git rev-list --count HEAD` |
| Tags / releases | **0** | `git tag` |
| Pull requests ever opened | **0** — every commit went straight to `main` | commit graph is linear |
| Tracked files | 42 | `git ls-files \| wc -l` |
| `.env` ever committed? | **No** ✅ | `git ls-files \| grep -i env` → empty |

**What this tells a senior engineer, immediately:**

A single branch with zero tags, zero PRs, and eleven commits pushed directly to `main` means
there is **no release concept**. You cannot say "we are running version 1.4.2 in production."
You can only say "production is whatever `main` was, the last time it built." When something
breaks, "roll back to the last good version" is not a defined operation, because "version" is
not a thing that exists in this repository.

> **ماذا يعني هذا لمهندس محترف؟**
> فرع واحد، بلا وسوم (tags)، وبلا طلبات دمج (PRs)، و11 commit دُفعت مباشرة إلى `main` تعني
> أنه **لا يوجد مفهوم للإصدار (release)**. لا تستطيع القول "الإنتاج يشغّل النسخة 1.4.2"،
> بل فقط "الإنتاج هو آخر حالة لفرع main". وعندما ينكسر شيء، فإن "ارجع إلى آخر نسخة سليمة"
> ليست عملية معرّفة، لأن "النسخة" غير موجودة أصلًا في هذا المستودع.

## 1.3 Application architecture

```
Next.js 16.2.3 (App Router)  ·  React 19.2.4  ·  TypeScript 5 (strict)
Tailwind CSS 4  ·  npm (lockfileVersion 3)  ·  Node v22.13.0 (local machine only)
```

**Routes — 13 pages, 1 API route:**

```
/                          /categories             /categories/[slug]
/account                   /saved                  /contact
/auth/login                /auth/signup            /auth/verify         /auth/callback
/privacy                   /terms
/sitemap.xml               /robots.txt             (generated at build time)
POST /api/generate-prompt  ← the ONLY server-side code in the entire system
```

| Concern | Reality |
|---|---|
| **Frontend** | Next.js App Router, mostly `"use client"` components |
| **Backend** | One Route Handler. It is a **pure function** — it does string templating and returns. No database, no network, no external API |
| **Database** | Supabase Postgres. Schema in `supabase-schema.sql` |
| **Auth** | Supabase Auth — email + password, 8-digit email OTP |
| **Data access** | **Browser talks directly to Supabase** using the anon key (`src/lib/supabase.ts`). There is no server-side data layer |
| **Email** | Supabase Auth transactional email (OTP) only |
| **Contact form** | Web3Forms — a third-party form-to-email SaaS, called from the browser |
| **Analytics** | Home-grown — an insert into `prompt_analytics` on copy |
| **AI provider** | **None at runtime.** `@anthropic-ai/sdk` is installed but has **zero imports** |
| **Payments / queues / cache / background jobs / file storage** | None |
| **Content** | 130+ prompts hardcoded in `src/data/prompts.ts` — 2,996 lines, no CMS |

### The most important architectural fact

Most of Promitly is **statically pre-rendered at build time**. Proof:

```
$ curl -I https://promitly.com/
x-nextjs-prerender: 1
x-vercel-cache: HIT
age: 340486          ← ~4 days. This response has not been regenerated in four days.
```

This means: for most visitors, **no code runs at request time**. Vercel's edge cache returns a
file. That is why the site is fast, and it is also why the site is unusually resilient — a
statically cached page cannot crash, cannot run out of memory, and does not care if the database
is down.

**But it also means the risk profile is inverted from a normal web application.** Your outages
will not come from the server being overloaded. They will come from:
1. A **bad build** being deployed (the static files become wrong for everyone at once)
2. **Supabase** being unavailable (auth and saved prompts break, but pages still load)
3. A **missing or wrong environment variable** at build time (baked into the static output)

Remember this. It shapes every monitoring and testing decision we will make later.

> **أهم حقيقة معمارية:**
> معظم صفحات بروميتلي **تُبنى مسبقًا وقت البناء** (statically pre-rendered)، والدليل هو ترويسة
> `x-nextjs-prerender: 1` و`x-vercel-cache: HIT` مع عمر تخزين مؤقت يقارب أربعة أيام. هذا يعني
> أن معظم الزوار لا يُشغّلون أي كود على الخادم — بل يستقبلون ملفًا جاهزًا من الحافة (edge).
> ولهذا الموقع سريع ومقاوم للأعطال. لكنه يعني أيضًا أن مصادر الأعطال مقلوبة: لن تأتي من ضغط
> على الخادم، بل من **بناء خاطئ يُنشر للجميع دفعة واحدة**، أو من **تعطّل Supabase**، أو من
> **متغير بيئة ناقص وقت البناء** يُخبز داخل الملفات الثابتة.

## 1.4 Hosting and infrastructure — determined from evidence

**Hosting: Vercel.** Confirmed three independent ways:

```
$ dig +short promitly.com NS       →  ns1.vercel-dns.com.  ns2.vercel-dns.com.
$ dig +short promitly.com A        →  64.29.17.1  216.198.79.1   (Vercel anycast)
$ curl -I https://promitly.com/    →  server: Vercel
                                      x-vercel-cache: HIT
                                      x-vercel-id: arn1::...     (Stockholm edge)
```

**How to read those three signals — a teaching moment:**

1. **Nameservers (`NS`)** tell you *who controls DNS*. `vercel-dns.com` means the domain's DNS is
   fully delegated to Vercel — not merely pointed at it. Practical consequence: a DNS change is a
   click in the Vercel dashboard, and Vercel is a single point of failure for your domain.
2. **Response headers** are the server introducing itself. `x-vercel-cache: HIT` means the
   response came from the edge cache and never reached compute.
3. **`age: 340486`** is how many seconds that cached response has existed. Four days. Nothing has
   been deployed in four days, and nothing has invalidated the cache.

**TLS:** Let's Encrypt wildcard `*.promitly.com`, valid 2026-08-19 → 2026-11-17, auto-renewed by
Vercel. HSTS present (`strict-transport-security: max-age=63072000` — two years).

### What does NOT exist (verified by search, not assumed)

| Missing | Verified by |
|---|---|
| ❌ No `Dockerfile`, no `docker-compose.yml` | `find . -name "Dockerfile*"` → empty |
| ❌ No `.github/` directory — **no CI, no workflows at all** | `ls -la` → no `.github` |
| ❌ No `vercel.json` — **zero hosting config in the repo** | `find . -name vercel.json` → empty |
| ❌ No Terraform / Pulumi / CloudFormation / Ansible | no `.tf`, `.yml` infra files |
| ❌ No `.vercel/` — project linked via GitHub integration, not CLI | `ls -la .vercel` → not found |
| ❌ No tests of any kind, no test runner, no coverage | no test files, no `test` script |
| ❌ No `.env.example` | `ls .env*` → only `.env.local` |
| ❌ No `engines` field in `package.json` | `grep engines package.json` → empty |
| ❌ No monitoring, alerting, error tracking, or log aggregation | no config, no dependencies |

**The `vercel.json` absence deserves special attention.** One hundred percent of your hosting
configuration — domains, environment variables, build settings, redirects, regions — lives
inside the Vercel dashboard UI. None of it is in Git. None of it is reviewable. None of it is
recoverable if the account is lost. This is called **configuration drift risk**, and it is the
core argument for Infrastructure as Code (Part 12).

> **غياب ملف `vercel.json` يستحق انتباهًا خاصًا.**
> 100% من إعدادات الاستضافة — النطاقات، ومتغيرات البيئة، وإعدادات البناء، والتحويلات، والمناطق —
> موجودة داخل واجهة Vercel فقط. لا شيء منها في Git، ولا يمكن مراجعته، ولا يمكن استرجاعه إذا
> فُقد الحساب. هذا يُسمى **انحراف الإعدادات (configuration drift)**، وهو الحجة الأساسية
> لمفهوم "البنية التحتية ككود" (Part 12).

## 1.5 The deployment pipeline as it exists today

**There is no CI. There is CD, but it is implicit and invisible to the repository.**

```
Developer (you)
     │
     │  git push origin main          ← no review, no tests, no approval
     ▼
GitHub  (github.com/Tariq555/promitly)
     │
     │  webhook → Vercel GitHub integration
     ▼
Vercel build container
     │  npm install  (from package-lock.json)
     │  next build   ← the ONLY quality gate: does TypeScript compile?
     ▼
Static pages pre-rendered  +  API route packaged as a serverless function
     │
     │  atomic swap to a new immutable deployment
     ▼
promitly.com  (global edge network, Stockholm and elsewhere)
     │
     ├──▶ Supabase Postgres      (browser talks to it directly)
     └──▶ Web3Forms API          (browser talks to it directly)
```

| Question | Answer |
|---|---|
| What triggers deployment? | Any push to `main` |
| What gets linted? | **Nothing.** Next.js 16 no longer runs ESLint during `next build` |
| What gets type-checked? | The build does fail on TypeScript errors — **this is your entire quality gate** |
| What gets tested? | **Nothing.** No tests exist |
| Is there an approval step? | **No.** Push is deploy |
| Where are deploy credentials? | Not in the repo — Vercel↔GitHub OAuth handles it ✅ |
| Can you roll back? | Yes — but only as a manual click in the Vercel dashboard ("Promote to Production" on an older deployment). **Not documented, never practiced** |

### The user request path

```
User's browser
     │
     ▼
DNS  (ns1/ns2.vercel-dns.com)  →  64.29.17.1 (anycast)
     │
     ▼
Vercel Edge Network / CDN
     │
     ├── cache HIT  →  return the pre-rendered HTML immediately  ← most requests end here
     │
     └── cache MISS →  Serverless Function  →  /api/generate-prompt (pure CPU, no I/O)
     │
     ▼
Browser then makes its OWN direct calls:
     ├──▶ https://<project>.supabase.co   (auth, saved prompts, analytics)
     └──▶ https://api.web3forms.com       (contact form)
```

**Notice something important:** Supabase and Web3Forms are called **by the browser**, not by your
server. This means those credentials are public by design, and their security depends entirely on
**Row-Level Security** and vendor-side rate limiting — not on your code. We will return to this
in Part 17.

> **لاحظ أمرًا مهمًا:** المتصفح هو من يتصل بـ Supabase و Web3Forms مباشرة، وليس خادمك. هذا يعني
> أن تلك المفاتيح عامة بحكم التصميم، وأن أمانها يعتمد كليًا على **أمان الصفوف (RLS)** وعلى
> حدود المعدل من جهة المزوّد — لا على الكود الذي تكتبه.

## 1.6 Environments

| Environment | Exists? | Notes |
|---|---|---|
| **Local** | ⚠️ Partially broken | Code runs, but the Supabase project referenced in `.env.local` does not exist (see Risk R-01) |
| **Development** | ❌ No | No dedicated dev environment |
| **Preview** | ⚠️ Available but unused | Vercel creates a preview URL per PR — but zero PRs have ever been opened |
| **Staging** | ❌ **No** | There is no production-like environment to test in |
| **Production** | ✅ Yes | `promitly.com` |

**There is exactly one real environment: production.** Every change you have ever made went from
your laptop straight to real users. Preview deployments exist as a capability and have never been
used, because you have never opened a pull request.

> **توجد بيئة حقيقية واحدة فقط: الإنتاج.** كل تغيير أجريته انتقل من حاسوبك مباشرة إلى المستخدمين
> الحقيقيين. بيئات المعاينة (preview) متاحة في Vercel لكنها لم تُستخدم قط، لأنك لم تفتح
> أي طلب دمج (pull request) من قبل.

## 1.7 Secrets and configuration

`.env.local` is **untracked and correctly gitignored** (`.env*` in `.gitignore`). No `.env` file
has ever been committed — verified with `git ls-files | grep -i env` (empty). **This is genuinely
good practice and you should keep doing it.**

| Secret name | Referenced at | Environment | Managed safely? |
|---|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `src/lib/supabase.ts:3` | local + prod (Vercel dashboard) | ✅ `NEXT_PUBLIC_` = intentionally public, baked into the browser bundle |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `src/lib/supabase.ts:4` | local + prod | ✅ anon key is *designed* to be public — safety depends **entirely** on RLS |
| `WEB3FORMS_KEY` | `src/app/contact/page.tsx:7` | hardcoded in source | ⚠️ **committed to Git**. Web3Forms keys are meant to be client-side, so this is not a breach — but it is a public spam target with no rotation path |

**No secret values appear anywhere in this manual, and none ever will.** Only names, locations,
and whether they are handled correctly.

**The `NEXT_PUBLIC_` prefix — understand this properly.** In Next.js, any environment variable
starting with `NEXT_PUBLIC_` is **inlined into the JavaScript sent to the browser at build time**.
It is not a secret. Anyone can read it with View Source. This is correct and intentional for the
Supabase anon key — but it means two things:
1. If you ever put a real secret behind a `NEXT_PUBLIC_` prefix, you have published it globally.
2. Because it is baked in **at build time**, changing it in the Vercel dashboard does nothing
   until you **redeploy**. This causes a classic confusing incident, and we will simulate it in
   Part 22.

## 1.8 Risk register

Findings from the Phase 0 audit, ranked. These are **not fixed** — each becomes a learning task.

| ID | Severity | Finding | Evidence |
|---|---|---|---|
| **R-01** | 🔴 Critical **CONFIRMED — ACTIVE INCIDENT** | **The Supabase project no longer exists, and production uses that same dead project.** `NXDOMAIN` from two independent resolvers (`8.8.8.8`, `1.1.1.1`); control lookup resolved, so the method is sound. Resolved on 2026-08-31 (P1-01): the production JavaScript bundle inlines the identical project ref, confirmed twice — once as the `NEXT_PUBLIC_SUPABASE_URL` string constant and once as the `ref` claim inside the anon key's JWT payload. **Auth, signup, login, saved prompts, and analytics are broken for real users right now.** **Time-to-detection: 105–133 days** (bounded 2026-05-18 ← → 2026-04-20, see the impact assessment in Part B). Recovery is **impossible** — Supabase deletion is permanent and destroys all backups (R-02, R-17) | `dig` → NXDOMAIN; `grep` on production chunk `11p65mygjoeo~.js` → `https://bgynafpbomoynbtinpze.supabase.co` |
| **R-02** | 🔴 Critical | **No monitoring, alerting, or error tracking.** If the site breaks, nobody is told | no config, no deps |
| **R-03** | 🟠 High | **`savePrompt()` cannot succeed against the committed schema.** The table requires `category`, `title`, `content` as `NOT NULL`, but the insert supplies only `user_id` and `prompt_id`. Either the deployed schema has drifted from the file, or the save feature has never worked | `supabase-schema.sql:59-64` vs `src/lib/supabase.ts:79` |
| **R-04** | 🟠 High | **No automated tests.** Zero. The only quality gate is the TypeScript compiler | no test files |
| **R-05** | 🟠 High | **No CI.** No `.github/` directory exists | `ls -la` |
| **R-06** | 🟠 High | **RLS not enabled on `site_stats`.** A policy was created for it, but `alter table ... enable row level security` was never run. A policy on a table without RLS enabled is inert — the table is fully open | `supabase-schema.sql` |
| **R-07** | 🟠 High | **No security headers in production.** No CSP, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, or `Permissions-Policy`. HSTS is present (added by Vercel) | `curl -I https://promitly.com/` |
| **R-08** | 🟠 High | **No staging environment.** Production is the only place to test | Section 1.6 |
| **R-09** | 🟡 Medium | **No rehearsed rollback.** Vercel can roll back in one click, but it is undocumented and has never been practiced. An untested recovery procedure is not a recovery procedure | no runbook |
| **R-10** | 🟡 Medium | **No `.env.example`.** A new machine cannot be set up without reading source code | `ls .env*` |
| **R-11** | 🟡 Medium | **No Node version pinned.** No `engines` field, no `.nvmrc`. Vercel chooses the Node version, you do not. Builds are not reproducible across time | `package.json` |
| **R-12** | 🟡 Medium | **No rate limiting on `/api/generate-prompt`.** Public, unauthenticated POST. Blast radius is small today (pure CPU, no paid API) — **but the site advertises "AI Coming Soon"**. The moment a real model sits behind that route, an unrated endpoint becomes a direct billing attack | `src/app/api/generate-prompt/route.ts` |
| **R-13** | 🟡 Medium | **No Infrastructure as Code.** All hosting config lives in a dashboard UI, unreviewable and unrecoverable | no `vercel.json`, no `.tf` |
| **R-14** | 🟡 Medium | **No branch protection, no PRs, no code review.** 11 commits pushed directly to `main` | commit graph |
| **R-15** | 🟢 Low | **Dead dependency:** `@anthropic-ai/sdk` installed, zero imports. Unused supply-chain surface | `grep -rn anthropic src` → empty |
| **R-16** | 🟢 Low | **Repo hygiene:** `npm-debug.log` (1.6 MB) sitting in the working tree since April; `package.json` still named `"promti"` (pre-rebrand) | `ls -la`, `package.json:2` |
| **R-17** | 🟢 Low | **No backup or restore procedure documented or tested** for Supabase data | no runbook |
| **R-18** | 🟠 High | **The "backend not configured" guard tests the wrong thing.** `src/lib/supabase.ts:5` decides the backend is `live` from `url.startsWith("http") && key.length > 10` — it validates the *shape* of the config, never its *reachability*. With a well-formed URL pointing at a deleted project, `supabase` is non-null, so every graceful `"Backend not configured."` fallback is dead code and users get raw network errors instead. **A health check that cannot fail is not a health check** | `src/lib/supabase.ts:3-9` vs the R-01 outage |
| **R-19** | 🟡 Medium | **The displayed user count is synthetic.** `getLiveUserCount()` returns a hardcoded `BASE = 6086` plus a deterministic ±8 daily wobble. It has never read the database. Operationally this means there is **no real user metric anywhere in the system**, so "how many users were affected?" is unanswerable by design, not just because the database is gone | `src/lib/supabase.ts:123-131` |

## 1.9 DevOps maturity score

Scored honestly against what a production engineering team is expected to own.

| Capability | Score | Reasoning |
|---|---|---|
| Source control | 4 / 10 | Git is used correctly and secrets are clean, but: one branch, no PRs, no tags, no protection, no release concept |
| Build reproducibility | 3 / 10 | `package-lock.json` exists ✅, but no Node version pinned, no `.env.example`, no containerisation |
| Testing | 0 / 10 | Nothing exists |
| CI | 0 / 10 | Nothing exists |
| CD | 6 / 10 | Genuinely automatic, atomic, immutable — but entirely donated by Vercel, ungated and unowned |
| Environments | 2 / 10 | Production only. Preview available but unused. No staging |
| Infrastructure | 5 / 10 | Solid infrastructure — but none of it is yours, understood, or reproducible |
| Infrastructure as Code | 0 / 10 | Nothing exists |
| Containers | 0 / 10 | Nothing exists (**and that is currently the correct decision** — see Part 8) |
| Observability | 0 / 10 | Nothing exists. **This is the most dangerous zero on this list** |
| Security | 4 / 10 | Secrets hygiene good, RLS mostly on; but no headers, no scanning, one RLS gap, no rate limiting |
| Database reliability | 2 / 10 | Schema is version-controlled ✅ but applied manually by copy-paste. No migrations, no tested backups |
| Reliability / SRE | 1 / 10 | Resilience is accidental (static pre-rendering), not engineered |
| Disaster recovery | 1 / 10 | Vercel keeps old deployments. Nothing else. Never tested |
| Cost management | 5 / 10 | Almost certainly free-tier across the board. Low risk today, unmanaged in principle |

```
OVERALL DEVOPS MATURITY:  2.2 / 10   —   "Working, but unowned"
النضج العام لممارسات DevOps: 2.2 من 10 — "يعمل، لكنه غير مملوك هندسيًا"
```

**How to interpret this score without feeling bad about it.** 2.2/10 is completely normal for a
solo-built product that is genuinely live and serving users. Most side projects never reach
production at all. The score is not a judgement of your ability — it is a **map of what you are
about to learn**, and each of those zeros is a chapter with your name on it.

> **كيف تقرأ هذه الدرجة دون إحباط:**
> 2.2 من 10 نتيجة طبيعية تمامًا لمشروع بناه شخص واحد ووصل فعليًا إلى الإنتاج ويخدم مستخدمين
> حقيقيين. معظم المشاريع الجانبية لا تصل إلى الإنتاج أصلًا. هذه الدرجة ليست حكمًا على قدرتك،
> بل **خريطة لما ستتعلمه**، وكل صفر في القائمة هو فصل يحمل اسمك.

## 1.10 Part 1 — English vocabulary

| Word | Simple English definition | Arabic | Example sentence | How it is used in DevOps |
|---|---|---|---|---|
| **baseline** | The measured starting state, before any change | خط الأساس / الحالة المرجعية | "We recorded a baseline before optimising." | You always capture a baseline first, so you can prove an improvement later |
| **audit** | A careful, systematic examination of a system | تدقيق / مراجعة | "The security audit found three issues." | Security audits, cost audits, dependency audits |
| **evidence** | Facts that prove a claim is true | دليل / إثبات | "Show me the evidence that the fix worked." | No claim is accepted in engineering without evidence |
| **deployment** | Putting a new version of software into an environment | نشر / إطلاق نسخة | "The deployment finished in 40 seconds." | "Deploy to staging", "the deployment failed" |
| **rollback** | Returning to a previous working version | التراجع إلى نسخة سابقة | "We rolled back after the error rate spiked." | The first thing you do in an incident, before debugging |
| **pipeline** | An automated sequence of steps for building and shipping code | خط أنابيب / سلسلة عمليات آلية | "The pipeline runs tests on every pull request." | CI/CD pipeline |
| **environment** | An isolated place where the app runs (local, staging, production) | بيئة تشغيل | "Never test in the production environment." | The most-used word in DevOps |
| **reproducible** | Produces the same result every time, on any machine | قابل لإعادة الإنتاج بنفس النتيجة | "The build is not reproducible without a pinned Node version." | The foundation of everything: containers, lockfiles, IaC |
| **immutable** | Cannot be changed after it is created | غير قابل للتغيير | "Each deployment is immutable." | Immutable deployments and immutable infrastructure |
| **outage** | A period when a service is unavailable to users | انقطاع الخدمة | "The outage lasted 12 minutes." | Measured, reported, and analysed in a postmortem |
| **blast radius** | How much is damaged when one thing fails | نطاق الضرر | "Rate limiting reduces the blast radius of abuse." | A core senior-level design consideration |
| **drift** | When reality slowly stops matching the written configuration | انحراف الإعدادات عن المُوثّق | "The dashboard settings drifted from the repo." | Configuration drift, infrastructure drift, schema drift |
| **gate** | An automatic check that blocks progress if it fails | بوابة تحقق / شرط مانع | "Tests are a quality gate before merge." | Quality gates in CI |
| **observability** | Your ability to understand what a system is doing from the outside | القابلية للملاحظة والفهم | "Without observability we are debugging blind." | Logs + metrics + traces |
| **provision** | To create and set up infrastructure | تجهيز / إنشاء بنية تحتية | "Terraform provisions the database." | "Provision a server", "provisioning failed" |

## 1.11 Part 1 — Interview questions

### 🟢 Beginner
> **Q: What is the difference between development and production?**
>
> **Model answer (English):** Development is the environment where engineers write and test code
> on their own machines. It is safe to break, and no real users are affected. Production is the
> live environment that real users access. A mistake in development costs a few minutes; a
> mistake in production costs real users, and possibly real money and trust.
>
> **بالعربية:** بيئة التطوير هي المكان الذي يكتب فيه المهندس الكود ويختبره على جهازه، ومن
> الآمن أن ينكسر فيها كل شيء لأن المستخدمين الحقيقيين غير متأثرين. أما الإنتاج فهي البيئة
> الحيّة التي يستخدمها الناس فعلًا. الخطأ في التطوير يكلّف دقائق، والخطأ في الإنتاج يكلّف
> مستخدمين حقيقيين، وربما مالًا وثقة.

### 🔵 Junior DevOps
> **Q: Our application is deployed automatically on every push to `main`. Is that continuous
> deployment? Is anything missing?**
>
> **Model answer:** It is continuous deployment in the mechanical sense — every push reaches
> production without human intervention. But continuous deployment without continuous
> integration is dangerous. There is no automated verification before the code ships: no linting,
> no tests, no security scanning. The only gate is whether the code compiles. Real continuous
> deployment means the pipeline has earned enough confidence, through automated checks, to ship
> without a human. Here we are shipping without a human *and* without the confidence.
>
> **بالعربية:** ميكانيكيًا نعم، فكل دفعة تصل إلى الإنتاج بلا تدخل بشري. لكن النشر المستمر بدون
> تكامل مستمر أمر خطر: لا يوجد تحقق آلي قبل الإطلاق — لا فحص أسلوب، ولا اختبارات، ولا فحص
> أمني. البوابة الوحيدة هي "هل يُترجم الكود؟". النشر المستمر الحقيقي يعني أن خط الأنابيب
> اكتسب ثقة كافية عبر فحوص آلية تسمح بالإطلاق بلا إنسان. نحن هنا نطلق بلا إنسان **وبلا ثقة**.

### 🟠 Mid-level
> **Q: A user reports that promitly.com shows old content. The homepage is statically
> pre-rendered on Vercel. Walk me through your investigation.**
>
> **Model answer:** First I confirm the symptom and scope it — is it one user or everyone? I
> would `curl -I https://promitly.com/` and read `x-vercel-cache` and `age`. A `HIT` with a large
> `age` means the edge is serving a cached response that has not been regenerated. Then I check
> whether a newer deployment exists in Vercel and whether it actually succeeded — a failed build
> means the old deployment is still live, which looks exactly like "stale content". If the
> deployment succeeded but content is still old, I check whether the data is baked in at build
> time rather than fetched at request time, because in that case content only changes when you
> rebuild. Finally I check the user's own browser cache to rule out a client-side cause.
>
> **بالعربية:** أبدأ بتحديد النطاق: مستخدم واحد أم الجميع؟ ثم أفحص الترويسات بـ `curl -I`
> وأقرأ `x-vercel-cache` و`age`. قيمة `HIT` مع `age` كبير تعني أن الحافة تخدم نسخة مخزّنة لم
> يُعَد توليدها. بعدها أتحقق من وجود نشر أحدث وهل **نجح فعلًا** — فالبناء الفاشل يُبقي النسخة
> القديمة حيّة، وهو ما يبدو تمامًا مثل "محتوى قديم". وإن نجح النشر وبقي المحتوى قديمًا،
> أتحقق مما إذا كانت البيانات تُخبز وقت البناء لا وقت الطلب. وأخيرًا أستبعد ذاكرة متصفح المستخدم.

### 🔴 Senior
> **Q: This system has 2.2/10 DevOps maturity but 100% uptime and zero incidents. Justify
> spending three months on DevOps work instead of features.**
>
> **Model answer:** The uptime is real but it is not earned — it is a property of the
> architecture and the platform, not of our engineering. Most pages are statically pre-rendered
> and served from a CDN, so there is almost no runtime surface to fail. That resilience is
> accidental, and it disappears the moment the product does anything dynamic — and the roadmap
> already advertises "AI Coming Soon", which means server-side calls, cost per request, and a
> real failure surface.
>
> The second argument is detection, not prevention. We have had zero *known* incidents. We have
> no monitoring, so "zero known incidents" and "zero incidents" are indistinguishable from where
> we stand. We cannot claim reliability we cannot measure.
>
> The third argument is speed. Right now every change is high-risk because there is no test
> suite, no staging, and no rehearsed rollback — so a rational engineer ships less often and more
> nervously. DevOps investment is not a tax on feature work; it is what makes future feature work
> fast and safe. I would sequence it by risk-reduction per hour: monitoring first (we are blind),
> then CI (we are ungated), then staging (we test in production), and defer containers,
> Terraform, and Kubernetes until there is a concrete need.
>
> **بالعربية:** التوفّر حقيقي لكنه غير مكتسب — فهو خاصية للمعمارية والمنصة لا لهندستنا. معظم
> الصفحات ثابتة وتُخدَّم من CDN، فلا يوجد تقريبًا سطح تشغيلي ليفشل. هذه المتانة **عرضية**،
> وتختفي فور أن يصبح المنتج ديناميكيًا — وخارطة الطريق تعلن بالفعل عن ميزة ذكاء اصطناعي قادمة،
> أي طلبات على الخادم وتكلفة لكل طلب وسطح فشل حقيقي.
> الحجة الثانية هي **الكشف** لا المنع: لدينا صفر حوادث **معروفة**، وبلا مراقبة لا نستطيع التمييز
> بين "صفر حوادث معروفة" و"صفر حوادث". لا يمكننا ادعاء موثوقية لا نقيسها.
> الحجة الثالثة هي **السرعة**: كل تغيير اليوم عالي المخاطر لغياب الاختبارات وبيئة staging وخطة
> تراجع مُجرّبة، فيصبح المهندس العاقل أبطأ وأكثر توترًا. الاستثمار في DevOps ليس ضريبة على
> تطوير الميزات، بل هو ما يجعل تطوير الميزات سريعًا وآمنًا لاحقًا.

---

# THE COMPLETE LEARNING MAP
## خريطة التعلّم الكاملة

## The journey

```text
            CURRENT PROMITLY
       (working, but unowned — 2.2/10)
                    │
   Phase 1 ─────────▼──────────  REPRODUCIBLE
                    │            Anyone can run it. Builds are deterministic.
   Phase 2 ─────────▼──────────  TESTED
                    │            Automated checks prove behaviour.
   Phase 3 ─────────▼──────────  CONTINUOUSLY INTEGRATED
                    │            Nothing merges without passing checks.
   Phase 4 ─────────▼──────────  OBSERVABLE
                    │            We know when it breaks, and why.
   Phase 5 ─────────▼──────────  SAFE TO CHANGE
                    │            Staging + reviewed PRs + rehearsed rollback.
   Phase 6 ─────────▼──────────  SECURE
                    │            Headers, scanning, RLS, rate limits, supply chain.
   Phase 7 ─────────▼──────────  DATA-RELIABLE
                    │            Migrations, backups, tested restores.
   Phase 8 ─────────▼──────────  CONTAINERISED (where justified)
                    │            Runtime is portable and reproducible.
   Phase 9 ─────────▼──────────  INFRASTRUCTURE AS CODE
                    │            Config is reviewable and recoverable.
   Phase 10 ────────▼──────────  RELIABLE (SRE)
                    │            SLOs, error budgets, incident practice.
   Phase 11 ────────▼──────────  SCALABLE
                    │            Load-tested, cost-aware, capacity-planned.
   Phase 12 ────────▼──────────  RECOVERABLE
                    │            Disaster recovery, tested. RTO/RPO defined.
                    ▼
            PRODUCTION-GRADE PROMITLY
```

## Phase table — what happens where, and why

| Phase | Name | Primary lab | Parts | Why this order |
|---|---|---|---|---|
| **1** | Reproducibility & Truth | Promitly 🟩🟦 | 1, 2, 3 | You cannot automate what you cannot reliably run. Also resolves R-01, the one unknown that could invalidate later work |
| **2** | Testing | Promitly 🟦 | 4 | CI with no tests is a pipeline that checks nothing |
| **3** | Continuous Integration | Promitly 🟦 | 3, 5 | Automate the checks that now exist |
| **4** | Observability | Promitly 🟧 | 16 | **Highest real-world value.** Today we are blind. Deliberately placed before advanced work |
| **5** | Environments & Safe Delivery | Promitly 🟨🟧 | 6, 7 | Staging, PR previews, documented + rehearsed rollback |
| **6** | Security / DevSecOps | Promitly 🟧 | 17 | Headers, scanning, RLS fix, rate limiting, SBOM |
| **7** | Database Reliability | Promitly 🟧🟥 | 18 | Migrations and tested restores. Placed late because it is the highest-risk area |
| **8** | Containers | Promitly + Lab 🟩 | 8, 14 | Docker for local reproducibility and to *understand* what Vercel hides |
| **9** | Infrastructure as Code | Lab + Promitly 🟦 | 11, 12, 13 | AWS lab for concepts; Terraform applied where it genuinely helps |
| **10** | Reliability Engineering | Promitly 🟨 | 19, 22 | SLOs, error budgets, deliberate failure injection, postmortems |
| **11** | Scaling & Performance | Promitly + Lab 🟨 | 20, 21 | Load testing, canary/blue-green, cost |
| **12** | Disaster Recovery | Promitly 🟥 | 18, 19 | Full recovery rehearsal. Last, because it needs everything above |
| **Lab** | Linux Server | Separate 🟩 | 9, 10 | Runs in parallel throughout — Promitly has no server to administer |
| **Lab** | Kubernetes | Separate 🟩 | 14, 15 | Promitly does **not** justify Kubernetes. Learn it properly, elsewhere |

## Honest technology decisions — made now, revisited later

This is the section that separates this manual from a tutorial. For each major technology, the
decision is recorded **with reasoning**, and with the condition that would change the decision.

| Technology | Verdict for Promitly | Reasoning | What would change this |
|---|---|---|---|
| **GitHub Actions (CI)** | ✅ **Adopt — Phase 3** | Zero automated verification today. Free for public repos. Directly solves R-04/R-05 | Nothing. This is unambiguous |
| **Uptime + error monitoring** | ✅ **Adopt — Phase 4** | We are completely blind (R-02). Highest value per hour of work in the entire manual | Nothing |
| **Staging environment** | ✅ **Adopt — Phase 5** | Production is the only environment (R-08). Vercel preview deployments give us 80% of this almost free | Nothing |
| **Security headers** | ✅ **Adopt — Phase 6** | Absent (R-07). ~15 lines in `next.config.ts`. Cheap and real | Nothing |
| **Rate limiting** | ✅ **Adopt — Phase 6** | Low urgency *today* (pure CPU route), **high urgency the moment AI ships** (R-12) | Already decided; timing tied to the AI feature |
| **Database migrations** | ✅ **Adopt — Phase 7** | Schema applied by copy-pasting SQL into a dashboard. R-03 is likely a direct consequence of exactly this | Nothing |
| **Docker** | ⚠️ **Adopt for local dev only — Phase 8** | Vercel does not run your container in production, so Docker will **not** deploy Promitly. But it makes local dev reproducible and it teaches you what the platform is hiding. Adopting it for the wrong reason would be worse than not adopting it | If we ever leave Vercel, Docker becomes the deployment unit |
| **Terraform** | ⚠️ **Partial — Phase 9** | Vercel has a real Terraform provider, so managing the project, domains, and env vars as code is genuine and useful. But the value is modest for a single project. Full value comes in the AWS lab | A second environment or a second project makes this compelling |
| **AWS** | 🧪 **Separate lab — Phase 9** | Promitly does not need AWS and migrating it would be a downgrade in reliability and an upgrade in operational burden. But AWS is the industry vocabulary — IAM, VPC, EC2, ALB, S3, RDS — and you must know it. Learn it on disposable infrastructure | Real need: background jobs, private networking, or leaving Vercel |
| **Ansible** | 🧪 **Separate lab — Phase 9** | There is no server to configure. Meaningless on Vercel. Real on a VPS in the Linux lab | Owning long-lived servers |
| **Kubernetes** | 🧪 **Separate lab — never on Promitly (currently)** | Promitly is one stateless frontend with one pure-function API route. Kubernetes solves multi-service orchestration, scheduling, and service discovery — **none of which Promitly has**. Adding it would multiply operational burden for zero benefit. But it is the dominant platform in the industry, so you learn it on a dedicated cluster | Multiple services, self-hosting, or a team large enough to need a platform layer |
| **Kafka / message queues** | ❌ **Do not add. Optional lab later** | Promitly has no asynchronous workload, no event stream, and no service-to-service communication. Adding Kafka would be pure decoration | A real async workload: background AI generation, webhooks, email queues |
| **Microservices** | ❌ **Do not add** | One person, one product, one deployable. Microservices trade simplicity for team independence you do not need. This would be actively harmful | A team large enough that a single codebase becomes a coordination bottleneck |
| **Prometheus + Grafana** | 🧪 **Lab primarily — Phase 4/10** | Serverless functions on Vercel do not expose a scrape endpoint the way a long-running server does, so classic Prometheus pull-based scraping does not fit Promitly cleanly. Learn it properly in the Linux/Kubernetes lab; use hosted monitoring for Promitly itself | Self-hosting Promitly on servers |
| **OpenTelemetry** | ⚠️ **Later — Phase 10** | Tracing pays off when a request crosses several services. Promitly has one hop. Introduce it when the AI feature adds a real external call worth tracing | The AI feature shipping |

> **This table is the single most senior thing in this manual.** Anyone can install Kubernetes.
> Very few engineers can write down, in advance and in public, *why they chose not to* — and
> what evidence would change their mind. Saying "no, and here is the condition under which I
> would say yes" is what technical judgement actually looks like.
>
> **هذا الجدول هو أكثر ما في هذا الدليل نضجًا هندسيًا.** أي شخص يستطيع تنصيب Kubernetes، لكن
> قلة من المهندسين يستطيعون أن يكتبوا مسبقًا وبوضوح **لماذا اختاروا عدم استخدامه**، وما الدليل
> الذي سيُغيّر رأيهم. أن تقول "لا، وهذا هو الشرط الذي يجعلني أقول نعم" — هذا هو الحكم الهندسي
> الحقيقي.

## Vocabulary — decision-making

| Word | Simple English definition | Arabic | Example sentence | DevOps usage |
|---|---|---|---|---|
| **trade-off** | Accepting a loss in one area to gain in another | مقايضة / موازنة | "Caching is a trade-off between freshness and speed." | Every architectural decision is a trade-off |
| **justify** | To give good reasons for a decision | يُبرّر | "Can you justify adding Kubernetes here?" | You must justify every new technology |
| **operational burden** | The ongoing work required to keep something running | العبء التشغيلي | "Self-hosting adds operational burden." | The hidden cost of every tool you adopt |
| **overhead** | Extra cost or effort that is not the main work | تكلفة إضافية / أعباء جانبية | "The overhead of maintaining a cluster is high." | Performance overhead, maintenance overhead |
| **premature** | Done too early, before it is needed | سابق لأوانه | "That is premature optimisation." | "Premature abstraction", "premature scaling" |
| **stateless** | Keeps no memory between requests | عديم الحالة | "The API route is stateless." | Stateless services are far easier to scale |
| **adopt** | To start using something officially | يتبنّى / يعتمد | "We adopted GitHub Actions for CI." | "Adopt", "deprecate", "sunset" |
| **defer** | To delay something until later, on purpose | يؤجّل عمدًا | "We deferred Terraform until Phase 9." | Deferring is a decision, not avoidance |

---

# PART A — MASTER CHECKLIST
## قائمة المهام الرئيسية

**Total tasks: 96.  Verified: 2.  Mastered: 0.**

**Rules:**
1. Never mark `VERIFIED` without evidence recorded in the Change Log (Part B).
2. Never mark `MASTERED` until you have broken it, debugged it, and can explain it in English.
3. If a task is `BLOCKED`, the reason must be written in the Notes column. A blocked task with
   no reason is an abandoned task.

**Difficulty:** ⭐ beginner · ⭐⭐ junior · ⭐⭐⭐ intermediate · ⭐⭐⭐⭐ advanced · ⭐⭐⭐⭐⭐ senior

---

## PHASE 1 — Reproducibility & Truth  (12 tasks) — 🔓 UNLOCKED, START HERE

| ID | Status | Task | Diff | Lab | Risk | Resolves | Evidence required |
|---|---|---|---|---|---|---|---|
| P1-01 | `VERIFIED` | Verify which Supabase project production actually uses | ⭐⭐ | Promitly | 🟩 read-only | R-01 | Screenshot of Vercel env var names + Supabase project status |
| P1-02 | `VERIFIED` | Determine whether production auth/signup currently works for real users | ⭐⭐ | Promitly | 🟩 read-only | R-01 | A real signup attempt on the live site + result |
| P1-03 | `VERIFIED` | Write `SYSTEM.md` — the system-of-record document | ⭐⭐ | Promitly | 🟦 | R-10 | Committed file |
| P1-04 | `VERIFIED` | Create `.env.example` with every required variable, no values | ⭐ | Promitly | 🟦 | R-10 | Committed file + clean-clone test |
| P1-05 | `VERIFIED` | Rewrite `README.md` — replace the create-next-app boilerplate | ⭐ | Promitly | 🟦 | R-10 | Committed file |
| P1-06 | `IMPLEMENTING` | Pin the Node version (`.nvmrc` + `engines`) | ⭐⭐ | Promitly | 🟦→🟧 | R-11 | Pinned to 24.20.0; `node -v` matches locally and clean clone built on it. **Outstanding:** Vercel build-log screenshot naming the Node version — not retrievable via CLI |
| P1-07 | `VERIFIED` | Prove the build is reproducible from a clean clone | ⭐⭐ | Promitly | 🟩 | R-11 | Full terminal transcript of clean clone → install → build |
| P1-08 | `VERIFIED` | Repo hygiene: remove `npm-debug.log`, fix the `promti` package name | ⭐ | Promitly | 🟦 | R-16 | Commit SHA |
| P1-09 | `VERIFIED` | Remove the dead `@anthropic-ai/sdk` dependency | ⭐⭐ | Promitly | 🟦 | R-15 | Commit + successful build |
| P1-10 | `VERIFIED` | Learn and practise Git branching — first ever feature branch | ⭐⭐ | Promitly | 🟦 | R-14 | Branch pushed |
| P1-11 | `VERIFIED` | Open the first ever pull request; observe the Vercel preview deployment | ⭐⭐ | Promitly | 🟦 | R-14 | PR link + preview URL |
| P1-12 | `BLOCKED` | Enable branch protection on `main` | ⭐⭐⭐ | Promitly | 🟧 | R-14 | **BLOCKED:** writing GitHub repo settings was denied by the local agent sandbox. Ruleset is written and ready to apply — needs the owner to run it or grant permission |

## PHASE 2 — Testing  (8 tasks) 🔒

`P2-01` Test strategy document (what we test and what we deliberately do not) ·
`P2-02` Install and configure Vitest ·
`P2-03` First unit test: `buildOptimizedPrompt()` ·
`P2-04` Unit tests for the pure logic in `src/lib` ·
`P2-05` API route integration test ·
`P2-06` Playwright setup ·
`P2-07` First E2E smoke test (homepage loads, nav works) ·
`P2-08` Coverage reporting + agree an honest threshold

## PHASE 3 — Continuous Integration  (8 tasks) 🔒

`P3-01` Understand GitHub Actions: workflows, jobs, steps, runners ·
`P3-02` First workflow — install + build only ·
`P3-03` Add lint and typecheck jobs ·
`P3-04` Add the unit test job ·
`P3-05` Dependency caching ·
`P3-06` Job parallelisation ·
`P3-07` Require CI checks to pass before merge (branch protection rule) ·
`P3-08` **Break CI on purpose** and read the failure log properly

## PHASE 4 — Observability  (8 tasks) 🔒 ← highest real-world value

`P4-01` Concepts: logs vs metrics vs traces ·
`P4-02` Add a `/api/health` endpoint ·
`P4-03` External uptime monitoring with alerting ·
`P4-04` Error tracking (Sentry or equivalent) ·
`P4-05` Read and interpret Vercel runtime logs ·
`P4-06` Define the first SLI (availability) ·
`P4-07` Define the first SLO + error budget ·
`P4-08` **Trigger a real alert on purpose** and confirm it reaches you

## PHASE 5 — Environments & Safe Delivery  (8 tasks) 🔒

`P5-01` Environment strategy document · `P5-02` Separate Supabase project for staging ·
`P5-03` Vercel preview environment variables · `P5-04` Staging branch + deployment ·
`P5-05` Write the rollback runbook · `P5-06` **Rehearse a rollback in production** ·
`P5-07` Post-deployment smoke test · `P5-08` Deployment checklist

## PHASE 6 — Security / DevSecOps  (9 tasks) 🔒

`P6-01` Security headers in `next.config.ts` (R-07) · `P6-02` Content Security Policy ·
`P6-03` Enable RLS on `site_stats` (R-06) · `P6-04` Audit every RLS policy ·
`P6-05` Dependabot / dependency scanning · `P6-06` Secret scanning ·
`P6-07` Rate limiting on `/api/generate-prompt` (R-12) · `P6-08` SBOM generation ·
`P6-09` Threat model for Promitly

## PHASE 7 — Database Reliability  (7 tasks) 🔒

`P7-01` Diagnose R-03 (`savePrompt` schema mismatch) properly, with evidence ·
`P7-02` Supabase CLI + a real migration workflow · `P7-03` Convert the existing schema to migrations ·
`P7-04` Migration safety rules (expand/contract) · `P7-05` Backup strategy ·
`P7-06` **Perform a real restore into a scratch project** · `P7-07` Define RPO and RTO

## PHASE 8 — Containers  (7 tasks) 🔒

`P8-01` Concepts: image, container, layer, registry · `P8-02` First Dockerfile for Promitly ·
`P8-03` Multi-stage build · `P8-04` Non-root user + healthcheck ·
`P8-05` Image size optimisation · `P8-06` Image vulnerability scanning ·
`P8-07` Compare: what does the container give us that Vercel hid?

## PHASE 9 — Cloud & Infrastructure as Code  (10 tasks) 🔒

`P9-01` AWS account + IAM fundamentals (lab) · `P9-02` VPC, subnets, security groups (lab) ·
`P9-03` Launch EC2, deploy something by hand (lab) · `P9-04` Load balancer (lab) ·
`P9-05` Terraform fundamentals · `P9-06` Terraform state and locking ·
`P9-07` Terraform the AWS lab · `P9-08` Terraform the Vercel project (real) ·
`P9-09` Detect and resolve drift · `P9-10` Ansible basics on the Linux lab

## PHASE 10 — Reliability Engineering  (8 tasks) 🔒

`P10-01` Failure domains and blast radius · `P10-02` Timeouts, retries, idempotency ·
`P10-03` Graceful degradation when Supabase is down · `P10-04` Incident response process ·
`P10-05` Run incident drill #1 (bad deployment) · `P10-06` Run incident drill #2 (missing env var) ·
`P10-07` Write a real postmortem · `P10-08` Error budget policy

## PHASE 11 — Scaling & Performance  (6 tasks) 🔒

`P11-01` Latency vs throughput vs concurrency · `P11-02` Load test the API route ·
`P11-03` Caching strategy and cache headers · `P11-04` Performance budget ·
`P11-05` Canary / blue-green concepts + lab · `P11-06` Cost review

## PHASE 12 — Disaster Recovery  (5 tasks) 🔒

`P12-01` Identify every single point of failure · `P12-02` Write the DR plan ·
`P12-03` **Full recovery rehearsal from zero** · `P12-04` Measure actual RTO/RPO against target ·
`P12-05` DR runbook, reviewed and dated

## PARALLEL LABS (run alongside, not counted in the 96)

**Linux Server Lab** — a cheap VPS or a local VM. SSH, users, permissions, systemd, journalctl,
cron, disks, memory, networking, firewall, package management. Includes deliberately broken
scenarios to debug.

**Kubernetes Lab** — kind or k3s locally. Pods, deployments, services, ingress, ConfigMaps,
Secrets, probes, resources, RBAC, network policies, rolling updates, rollbacks, Helm.

> **Neither lab touches Promitly.** They exist because the skills are required for a DevOps
> career, while the technologies are not required by this product. Keeping that distinction
> honest is the point.
>
> **لا يمس أي من المختبرين بروميتلي.** هما موجودان لأن هذه المهارات مطلوبة لمسيرة مهنية في
> DevOps، بينما هذه التقنيات ليست مطلوبة لهذا المنتج. الحفاظ على هذا التمييز بصدق هو جوهر الفكرة.

---

# PHASE 1 — REPRODUCIBILITY & TRUTH
## المرحلة الأولى — قابلية إعادة الإنتاج والحقيقة

> **Phase goal:** By the end of this phase, any competent engineer — including you in six months
> — can clone this repository onto a fresh machine and get a working development environment
> and an identical build, using only what is in the repository. And you will know, with evidence,
> whether production is actually healthy.
>
> **هدف المرحلة:** في نهاية هذه المرحلة، يستطيع أي مهندس كفء — بما فيهم أنت بعد ستة أشهر —
> أن ينسخ هذا المستودع على جهاز جديد ويحصل على بيئة تطوير عاملة وبناء مطابق، معتمدًا فقط على
> ما هو موجود داخل المستودع. وستعرف، بالدليل، هل الإنتاج سليم فعلًا أم لا.

**Why this phase is first, and why it looks boring**

Phase 1 contains no exciting technology. No Docker, no Kubernetes, no pipelines. It is
documentation, a version file, and some Git practice. Many people skip it.

Skipping it is the single most common reason DevOps learning projects collapse in week three.
Here is the causal chain:

```
No reproducibility
   → CI runs on a different Node version than your laptop
   → CI fails for reasons you cannot reproduce locally
   → You spend three evenings debugging the pipeline instead of learning CI
   → You conclude "CI is painful" and quit
```

Every automation layer you build later assumes the layer below is stable. Phase 1 **is** that
layer.

> **لماذا هذه المرحلة أولًا، ولماذا تبدو مملة؟**
> لا تحتوي المرحلة الأولى على تقنيات مثيرة — فقط توثيق وملف نسخة وبعض التدريب على Git، ولذلك
> يتخطاها كثيرون. وهذا التخطي هو السبب الأول لانهيار مشاريع تعلّم DevOps في الأسبوع الثالث:
> غياب قابلية إعادة الإنتاج ← يعمل الـ CI على نسخة Node مختلفة عن حاسوبك ← يفشل لأسباب لا
> تستطيع إعادة إنتاجها محليًا ← تضيع ثلاث ليالٍ في تصحيح خط الأنابيب بدل تعلّم CI ← تستنتج
> أن "CI مؤلم" وتتوقف. كل طبقة أتمتة تبنيها لاحقًا تفترض استقرار الطبقة تحتها. والمرحلة الأولى
> **هي** تلك الطبقة.

---

## CHAPTER 1.1 — TRUTH BEFORE CHANGE
### الحقيقة قبل التغيير
**Tasks: P1-01, P1-02 · Risk: 🟩 read-only · Difficulty: ⭐⭐**

### Concept

Before you change a system, you must know its actual current state — not its documented state,
not its remembered state, but its **observed** state.

### Why it exists

Engineers routinely operate on a mental model of a system that has quietly diverged from reality.
Someone changed a dashboard setting eight months ago. A service was deleted. A DNS record was
edited during a late-night fix. The repository still describes the old world.

This gap has a name: **configuration drift** (انحراف الإعدادات). It is the reason the first
action in any serious incident is not "fix it" but "establish the facts".

### Real-world analogy

A doctor does not prescribe medicine based on what the patient's file said last year. They take
the patient's pulse *now*. The file is a hypothesis; the pulse is evidence.

> الطبيب لا يصف الدواء بناءً على ما كان في الملف قبل عام، بل يقيس النبض **الآن**. الملف فرضية،
> والنبض دليل.

### Promitly connection

Risk **R-01** is exactly this problem, and it is currently blocking honest planning:

```
$ dig @8.8.8.8 <project-ref>.supabase.co   →  NXDOMAIN
$ dig @1.1.1.1 <project-ref>.supabase.co   →  NXDOMAIN
$ dig @1.1.1.1 <known-good-ref>.supabase.co →  172.64.149.246   (control: the method works)
```

`NXDOMAIN` means "this name does not exist in DNS". Two independent public resolvers agree, and
the control lookup proves the technique is sound. **The Supabase project referenced by your local
`.env.local` has been deleted.**

But `.env.local` is a *local* file. Production reads its environment variables from the **Vercel
dashboard**, which is a completely separate store that Git has never seen. Production may point
at a different, healthy project — or it may point at the same dead one, in which case **signup
and login are silently broken for real users right now**, and nobody has told you, because R-02
means nothing is watching.

**RESOLVED 2026-08-31 — and the answer is the bad one.** The first attempt at this, using only
the homepage HTML, was inconclusive, because the Supabase client lives in a lazily-loaded chunk
that the homepage never references. The technique that worked was to fetch the HTML of the pages
that *do* use auth — `/auth/signup`, `/auth/login`, `/account`, `/saved` — collect every
`/_next/static/**.js` they reference, download all of them, and grep the set. The ref appears in
exactly one chunk, and it is the **same dead ref as `.env.local`**.

**Production auth is broken for real users.** Do not continue the curriculum past this point;
go to Chapter 1.1b.

> **حُسم في 2026-08-31، والإجابة هي السيئة.** المحاولة الأولى كانت غير حاسمة لأنها اعتمدت على
> صفحة البداية وحدها، وعميل Supabase موجود في حزمة تُحمّل عند الطلب لا تشير إليها الصفحة الرئيسية.
> الأسلوب الذي نجح: جلب صفحات المصادقة نفسها (`/auth/signup`, `/auth/login`, `/account`, `/saved`)،
> واستخراج كل ملفات `/_next/static/**.js` التي تشير إليها، وتنزيلها جميعًا، ثم البحث فيها.
> المُعرّف موجود في حزمة واحدة، وهو **نفس المُعرّف الميت الموجود في `.env.local`**.
> **المصادقة معطّلة لمستخدمين حقيقيين الآن.**

> **لكن `.env.local` ملف محلي.** الإنتاج يقرأ متغيرات البيئة من **لوحة Vercel**، وهي مخزن منفصل
> تمامًا لم يره Git قط. قد يشير الإنتاج إلى مشروع آخر سليم، وقد يشير إلى المشروع الميت نفسه —
> وعندها يكون التسجيل والدخول **معطّلين بصمت لمستخدمين حقيقيين الآن**، ولا أحد أخبرك، لأن
> المخاطرة R-02 تعني أن لا شيء يراقب.

### Hands-on task

**P1-01 — Establish the truth about production's database.** 🟩 read-only

1. Open the Vercel dashboard → the Promitly project → **Settings → Environment Variables**.
2. Record the **name** of every variable and which environments it applies to
   (Production / Preview / Development). **Do not paste values into this manual.**
3. Read the value of `NEXT_PUBLIC_SUPABASE_URL` for Production and extract only the project
   reference — the subdomain part of `https://<ref>.supabase.co`.
4. Compare it with the ref in your local `.env.local`. Same or different?
5. Test whether that production ref resolves:

```bash
dig +short <production-ref>.supabase.co
# Empty output or NXDOMAIN → the project is gone.
# An IP address        → the project exists.
```

6. Log in to Supabase and confirm the project's status: **Active / Paused / Not found**.

**P1-02 — Establish the truth about production's user-facing behaviour.** 🟩 read-only

Go to `https://promitly.com/auth/signup` in a private browsing window and attempt a real signup
with an email address you control. Open your browser's **DevTools → Network** tab *before* you
submit, and watch what happens.

Record: which host does the request go to? What status code comes back? Does a verification
email arrive?

> This is called **synthetic monitoring** — you are behaving like a user, on purpose, to verify
> a critical path. In Phase 4 we will automate exactly this. Today you are the monitor.
>
> يُسمى هذا **المراقبة الاصطناعية** — أن تتصرف مثل المستخدم عمدًا للتحقق من مسار حرج.
> في المرحلة الرابعة سنؤتمت هذا بالضبط. اليوم **أنت** نظام المراقبة.

### Decision gate — this changes the rest of the manual

| Outcome | Meaning | What happens next |
|---|---|---|
| Production ref **differs** and resolves | Only local dev is broken | Fix `.env.local`, continue Phase 1 normally |
| Production ref is the **same dead one** | **Auth is broken for real users right now** | **Stop the curriculum.** This becomes a live incident. Go to Chapter 1.1b below |
| Production ref resolves but signup still fails | A different failure (RLS, email, config) | Investigate before continuing. Do not build on an unknown |

### CHAPTER 1.1b — If production is broken: your first real incident

Do not panic, and do not immediately start changing things. Follow the order.

```
1. SCOPE     What exactly is broken? Signup only, or login too? All users or some?
2. IMPACT    How many users? Since when? (Check when the Supabase project was deleted.)
3. EVIDENCE  Collect before you change anything: HTTP status codes, console errors, timestamps.
4. DECIDE    Restore the old project, or create a new one and repoint? Write the choice down.
5. ACT       Smallest change that restores service.
6. VERIFY    Reproduce the original failing user journey and watch it succeed.
7. DOCUMENT  Write a postmortem: what broke, when, why nobody noticed, how to prevent it.
```

**Step 7 is not optional and it is not paperwork.** The most valuable output of this incident is
not the fix — it is the sentence *"we did not know for N days because we have no monitoring"*,
written down with a date on it. That sentence is what makes Phase 4 real to you instead of
theoretical.

> **الخطوة السابعة ليست اختيارية وليست أعمالًا ورقية.** أثمن ناتج من هذه الحادثة ليس الإصلاح،
> بل الجملة التالية مكتوبة ومؤرخة: "لم نكن نعلم لمدة N يومًا لأننا لا نملك مراقبة". هذه الجملة
> هي ما يجعل المرحلة الرابعة حقيقية بالنسبة لك بدل أن تكون نظرية.

### What can break

| Failure | Symptom | Where the evidence is |
|---|---|---|
| Env var set only for Preview, not Production | Works on preview URLs, fails on the live domain | Vercel → Environment Variables → the environment scope column |
| Env var changed but never redeployed | Dashboard shows the new value, the site behaves like the old one | Compare the env var's edit time with the last deployment time |
| Supabase project paused (free tier inactivity) | Requests time out or return 5xx; the host **still resolves** | Supabase dashboard project status |
| Supabase project deleted | `NXDOMAIN`; requests fail instantly with a DNS error | `dig` output; the browser console shows `ERR_NAME_NOT_RESOLVED` |

**Notice the diagnostic value of that last distinction.** *Paused* and *deleted* produce
different evidence — a slow timeout versus an instant DNS failure. Learning to read failure
*shapes*, not just failure *messages*, is a large part of what senior debugging actually is.

> **لاحظ القيمة التشخيصية لهذا التمييز.** "متوقف مؤقتًا" و"محذوف" يُنتجان دليلين مختلفين:
> مهلة بطيئة مقابل فشل DNS فوري. تعلّم قراءة **شكل** الفشل لا **رسالة** الفشل فقط هو جزء
> كبير مما يعنيه التشخيص على مستوى المهندس الكبير.

### Production lesson

> **The repository is not the system.** The repository is a *description* of part of the system.
> Environment variables, DNS records, dashboard settings, and database state all live outside
> Git. Every one of them can drift. This single insight is the entire justification for
> Infrastructure as Code, which we reach in Phase 9 — and you will appreciate it far more having
> been bitten by it here first.
>
> **المستودع ليس هو النظام.** المستودع **وصف** لجزء من النظام. أما متغيرات البيئة وسجلات DNS
> وإعدادات اللوحات وحالة قاعدة البيانات فتعيش خارج Git، وكلها قابلة للانحراف. هذه البصيرة
> وحدها هي التبرير الكامل لمفهوم "البنية التحتية ككود" في المرحلة التاسعة.

### Interview questions

🟢 **Beginner — Q: What does `NXDOMAIN` mean?**
It means the DNS server has no record for that name at all — the domain does not exist, as
opposed to existing but being unreachable. It tells you the failure is at the naming layer, not
the network or application layer.
*بالعربية: يعني أن خادم DNS لا يملك أي سجل لهذا الاسم — أي أن النطاق غير موجود أصلًا، لا أنه
موجود لكن يتعذّر الوصول إليه. وهذا يخبرك أن الفشل في طبقة التسمية لا الشبكة ولا التطبيق.*

🔵 **Junior — Q: An environment variable was changed in the dashboard but the app still uses the
old value. Why?**
Most likely the variable is inlined at build time rather than read at runtime. In Next.js, any
`NEXT_PUBLIC_*` variable is baked into the client bundle during `next build`, so changing it in
the dashboard has no effect until a new deployment is created. The fix is to redeploy.
*بالعربية: الأرجح أن المتغير يُدمج وقت البناء لا وقت التشغيل. في Next.js يُخبز أي متغير يبدأ
بـ `NEXT_PUBLIC_` داخل حزمة المتصفح أثناء `next build`، فتغييره في اللوحة لا يؤثر حتى يُنشأ نشر
جديد. الحل هو إعادة النشر.*

🟠 **Mid-level — Q: How would you detect that production configuration has drifted from what the
team believes it to be?**
Three complementary approaches. First, make configuration declarative and version-controlled, so
the repository is the source of truth and a diff reveals drift. Second, run automated drift
detection — for example a scheduled `terraform plan` that alerts when the plan is non-empty.
Third, use synthetic monitoring of critical user journeys, which detects drift indirectly by
catching the behavioural symptom even when the cause is unknown.
*بالعربية: ثلاث طرق متكاملة: (1) جعل الإعدادات تصريحية ومحفوظة في Git ليكون المستودع هو مصدر
الحقيقة ويكشف الـ diff الانحراف؛ (2) كشف انحراف آلي مجدول مثل `terraform plan` دوري يُنبّه عند
وجود فروقات؛ (3) مراقبة اصطناعية للمسارات الحرجة تكشف العرض السلوكي حتى لو جُهل السبب.*

🔴 **Senior — Q: A critical dependency was deleted and nobody noticed for an unknown period.
Beyond restoring it, what do you change?**
Restoring service is the least interesting part. I would change three things. First, detection:
this is fundamentally a monitoring failure, not a database failure — the incident is not "the
project was deleted", it is "we could not tell". I would add synthetic monitoring of the signup
and login journeys with alerting, so the time-to-detection is minutes rather than unknown.
Second, blast radius: a single account deletion taking down authentication means auth is a single
point of failure with no isolation between environments — I would separate the staging and
production databases so that experimentation cannot touch production. Third, prevention: deletion
protection where the provider offers it, and access review on who can delete production
resources. Then I would write a postmortem that is explicitly blameless, because the useful
finding here is systemic — the system permitted a silent, unmonitored, irreversible action —
not that a person clicked a button.
*بالعربية: استعادة الخدمة هي الجزء الأقل أهمية. سأغيّر ثلاثة أشياء: (1) **الكشف** — الحادثة
جوهريًا فشل مراقبة لا فشل قاعدة بيانات؛ الحادثة ليست "حُذف المشروع" بل "لم نستطع أن نعرف"، لذا
أضيف مراقبة اصطناعية لمساري التسجيل والدخول مع تنبيهات ليصبح زمن الاكتشاف دقائق لا مجهولًا.
(2) **نطاق الضرر** — أن يؤدي حذف مشروع واحد إلى تعطيل المصادقة يعني أنها نقطة فشل وحيدة بلا عزل
بين البيئات، فأفصل قاعدة staging عن الإنتاج. (3) **المنع** — تفعيل حماية الحذف ومراجعة صلاحيات
من يملك حذف موارد الإنتاج. ثم أكتب تقرير حادثة **بلا إلقاء لوم**، لأن النتيجة المفيدة هنا
نظامية: النظام سمح بفعل صامت وغير مراقَب وغير قابل للتراجع.*

### Vocabulary — Chapter 1.1

| Word | Simple English definition | Arabic | Example sentence | DevOps usage |
|---|---|---|---|---|
| **resolve** (DNS) | To translate a name into an IP address | يُحوّل الاسم إلى عنوان IP | "The hostname does not resolve." | "It resolves to 1.2.3.4" |
| **scope** (a problem) | To determine how far a problem extends | يحدّد نطاق المشكلة | "First, scope the outage." | The first step of every incident |
| **silent failure** | Something broken that produces no visible error or alert | فشل صامت | "Silent failures are the most dangerous." | The core argument for monitoring |
| **source of truth** | The one place that is authoritative when sources disagree | مصدر الحقيقة | "Git is our source of truth for config." | "Single source of truth" |
| **inconclusive** | Not giving a clear answer | غير حاسم | "The bundle search was inconclusive." | Say this instead of guessing |
| **postmortem** | A written analysis after an incident | تقرير ما بعد الحادثة | "We published a blameless postmortem." | Blameless postmortems are an SRE cornerstone |
| **blameless** | Focused on system causes, not on punishing people | بلا إلقاء لوم على الأشخاص | "Postmortems must be blameless." | People are honest only when it is safe to be |
| **time to detection** | How long between a break and someone noticing | زمن الاكتشاف | "Our time to detection is unbounded." | Measured as MTTD |

---

## CHAPTER 1.2 — DOCUMENTATION IS INFRASTRUCTURE
### التوثيق جزء من البنية التحتية
**Tasks: P1-03, P1-04, P1-05 · Risk: 🟦 · Difficulty: ⭐–⭐⭐**

### Concept

Documentation is not a nice-to-have written after the work. In operations, documentation **is
part of the system**, because a system that only one person can run is a system with a single
point of failure — and that point is a human being.

### Why it exists

Ask the practical question: if you lost your laptop today and bought a new one tomorrow, could
you get Promitly running from the GitHub repository alone?

Today the answer is **no**. You would clone the repo, run `npm install`, run `npm run dev`, and
get an application that silently does nothing when you try to log in — because `src/lib/supabase.ts`
falls back to `null` when the environment variables are missing, and every auth function then
returns `"Backend not configured."` Nothing in the repository tells you which variables exist,
what they are called, or where to get them. The `README.md` is still the unmodified
`create-next-app` boilerplate.

> **اسأل السؤال العملي:** لو فقدت حاسوبك اليوم واشتريت آخر غدًا، هل تستطيع تشغيل بروميتلي من
> مستودع GitHub وحده؟ الجواب اليوم **لا**. ستنسخ المستودع وتُنصّب الحزم وتشغّل التطبيق، فتحصل
> على تطبيق لا يفعل شيئًا عند محاولة الدخول، لأن `src/lib/supabase.ts` يرجع `null` عند غياب
> متغيرات البيئة. ولا شيء في المستودع يخبرك بأسماء تلك المتغيرات أو من أين تحصل عليها،
> وملف `README.md` ما زال النص الافتراضي لـ `create-next-app`.

### Real-world analogy

A restaurant kitchen where only the head chef knows the recipes. The food is excellent — until
the chef is ill. Written recipes do not make the chef less skilled; they make the restaurant
survivable. This is called reducing the **bus factor** — the number of people who would have to
disappear for the project to stop.

> مطبخ لا يعرف الوصفات فيه إلا رئيس الطهاة. الطعام ممتاز — حتى يمرض الرجل. الوصفات المكتوبة
> لا تُقلّل من مهارته، بل تجعل المطعم قادرًا على البقاء. يُسمى هذا تقليل **عامل الحافلة**
> (bus factor): عدد الأشخاص الذين لو اختفوا لتوقف المشروع.

### Promitly connection

Three documents are missing, and each solves a different problem:

| Document | Answers the question | Reader |
|---|---|---|
| `.env.example` | *Which variables must exist?* | Anyone setting up the project |
| `README.md` | *How do I run this?* | A new developer, including future-you |
| `SYSTEM.md` | *What is this system, actually?* | Anyone operating or debugging it |

**`SYSTEM.md` is the one most people never write, and it is the most valuable.** A README explains
how to start the app. `SYSTEM.md` explains what happens when the app is running in the real
world: where it is hosted, what it depends on, what breaks it, and who to contact. Part 1 of this
manual is effectively the first draft of it.

### Hands-on task

**P1-04 — `.env.example`** 🟦

Create a file that lists every required variable **with no real values**:

```bash
# .env.example — copy to .env.local and fill in real values
# Never commit .env.local

# Supabase — project URL, e.g. https://xxxxxxxx.supabase.co
# Where to get it: Supabase dashboard → Project Settings → API
NEXT_PUBLIC_SUPABASE_URL=

# Supabase anon/publishable key.
# NOTE: this is intentionally public — it is inlined into the browser bundle.
# Its safety depends entirely on Row-Level Security being correct.
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

**Verification — and this is the important part.** Do not just look at the file. Prove it works:

```bash
cd /tmp
git clone https://github.com/Tariq555/promitly.git promitly-cleantest
cd promitly-cleantest
cp .env.example .env.local
# fill in real values from your password manager
npm ci
npm run dev
# → open http://localhost:3000 and confirm the app actually works
```

If you needed any knowledge that was **not** in the repository to complete those steps, your
documentation is incomplete. Go back and add what was missing. This is the test, not the file.

> **التحقق هو الجزء المهم.** لا تكتفِ بالنظر إلى الملف، بل أثبت أنه يعمل: انسخ المستودع في
> مجلد جديد ونفّذ الخطوات. إن احتجت أي معرفة **غير موجودة** في المستودع لإكمال الخطوات، فتوثيقك
> ناقص. الاختبار هو الاستنساخ النظيف، وليس وجود الملف.

**P1-05 — `README.md`** 🟦 · **P1-03 — `SYSTEM.md`** 🟦

`README.md` must contain: what Promitly is, prerequisites (with the exact Node version),
setup steps, available scripts, and a link to `SYSTEM.md`.

`SYSTEM.md` must contain: the architecture diagram from Part 1, hosting details, every external
dependency and what breaks if it is unavailable, the environment variable inventory (names only),
how deployment works, and how to roll back.

**Write both in English.** This is deliberate — technical writing in English is a core
professional skill, and documentation is the lowest-risk place to practise it. Keep sentences
short. Prefer simple words. Real engineering documentation is written plainly, not elaborately.

> **اكتب كليهما بالإنجليزية.** هذا مقصود: الكتابة التقنية بالإنجليزية مهارة مهنية أساسية،
> والتوثيق هو أقل الأماكن خطورة للتدرب عليها. اجعل الجمل قصيرة والكلمات بسيطة. التوثيق الهندسي
> الحقيقي يُكتب ببساطة لا بتنميق.

### What can break

| Failure | Symptom | Prevention |
|---|---|---|
| A real secret is pasted into `.env.example` | Secret published permanently in Git history | Review the diff before committing. Never copy-paste from `.env.local` |
| Documentation drifts from reality | Someone follows the README and it fails | Re-run the clean-clone test whenever setup changes |
| `.env.example` misses a variable | Confusing partial failure — the app starts but a feature silently does nothing | Derive the list from `grep -rn "process.env" src` |

### How to debug documentation

The debugging technique for docs is the clean-clone test above. There is no other reliable
method, because you cannot detect your own missing knowledge by reading — you already know the
thing you forgot to write down. Only a genuinely clean environment exposes the gap.

### Production lesson

> Documentation is measured by **whether someone else can succeed with it**, not by whether it
> exists. A README nobody has tested is a hypothesis, not documentation.
>
> يُقاس التوثيق بـ **قدرة شخص آخر على النجاح باستخدامه**، لا بمجرد وجوده. ملف README لم يختبره
> أحد هو فرضية، وليس توثيقًا.

### Interview questions

🟢 **Beginner — Q: Why do we commit `.env.example` but not `.env`?**
`.env` contains real secrets, which must never enter version control because Git history is
permanent and often public. `.env.example` contains only the variable names and comments, so it
documents what is required without exposing anything.

🔵 **Junior — Q: What is the "bus factor" and what is Promitly's?**
The bus factor is the number of people who would have to become unavailable for the project to
stop. Promitly's is currently one. Setup knowledge, deployment knowledge, and dashboard access
all live in a single person's head and account. Writing `SYSTEM.md` and `.env.example` is the
cheapest possible mitigation.

🟠 **Mid-level — Q: How do you keep documentation from going stale?**
Make it executable or verifiable wherever possible. Setup instructions should be tested by CI
running the same steps on a clean runner, so drift breaks the build. Architecture documentation
should be reviewed as part of any PR that changes architecture. And documentation should live in
the repository next to the code, so it appears in the same diff and the same review.

🔴 **Senior — Q: A team says "we don't have time to document". How do you respond?**
I would not argue about documentation in the abstract — I would reframe it as incident cost. The
question is not "should we write docs", it is "how long is our recovery when the one person who
knows this is unreachable?" Then I would target the highest-leverage documents only: the runbook
for the top three failure modes, the environment inventory, and the rollback procedure. Those
three pay for themselves in a single incident. I would also make documentation a byproduct of
work rather than a separate task — postmortems, ADRs, and PR descriptions are documentation that
gets written because the work demanded it, not because a policy did.

### Vocabulary — Chapter 1.2

| Word | Simple English definition | Arabic | Example sentence | DevOps usage |
|---|---|---|---|---|
| **onboarding** | The process of getting a new person productive | إلحاق/تأهيل عضو جديد | "Onboarding takes two days." | A key metric for developer experience |
| **bus factor** | How many people must disappear for a project to stop | عامل الحافلة (حجم اعتماد المشروع على أفراد) | "Our bus factor is one." | Used to argue for documentation and knowledge sharing |
| **runbook** | Step-by-step instructions for handling a specific situation | دليل إجراءات تشغيلي | "Follow the rollback runbook." | On-call engineers live inside runbooks |
| **stale** | Old and no longer accurate | قديم/فقد صلاحيته | "The docs are stale." | Stale docs, stale cache, stale branch |
| **boilerplate** | Standard default text or code that was never customised | نص/كود افتراضي جاهز | "The README is still boilerplate." | A signal that something was never reviewed |
| **inventory** | A complete list of what exists | جرد / قائمة حصر | "An inventory of environment variables." | Asset inventory, dependency inventory |
| **mitigation** | An action that reduces a risk | إجراء تخفيف المخاطر | "Documentation is a cheap mitigation." | Risk register language |
| **leverage** | Getting a large result from a small effort | رافعة / أثر كبير بجهد صغير | "The highest-leverage document is the runbook." | Prioritisation language |

---

## CHAPTER 1.3 — REPRODUCIBILITY
### قابلية إعادة الإنتاج
**Tasks: P1-06, P1-07 · Risk: 🟦 → 🟧 · Difficulty: ⭐⭐**

### Concept

A build is **reproducible** when the same source code produces the same result, on any machine,
at any time. Reproducibility is the foundation that every other DevOps practice stands on.

### Why it exists

The oldest joke in software is *"it works on my machine"*. It is a joke because it is a real and
expensive failure mode. It happens when the code is identical but the **environment** is not:
a different language runtime version, a different dependency version, a different operating
system, a different environment variable.

Every core DevOps technology is, at heart, an attack on this problem:

| Technology | The variation it eliminates |
|---|---|
| Lockfiles (`package-lock.json`) | Dependency version drift |
| Version pinning (`.nvmrc`, `engines`) | Runtime version drift |
| Docker | Operating system and system library drift |
| Infrastructure as Code | Infrastructure configuration drift |
| CI on clean runners | "It only works because of something on my laptop" |

> **الطرفة الأقدم في البرمجيات هي "إنه يعمل على جهازي".** وهي طرفة لأنها نمط فشل حقيقي ومكلف،
> يحدث عندما يكون الكود متطابقًا لكن **البيئة** ليست كذلك: نسخة مختلفة من بيئة التشغيل، أو من
> الحزم، أو من نظام التشغيل، أو متغير بيئة مختلف. وكل تقنية أساسية في DevOps هي في جوهرها
> هجوم على هذه المشكلة.

### Real-world analogy

A recipe that says "bake until done" is not reproducible. A recipe that says "bake at 180°C for
25 minutes" is. The ingredients were never the problem — the unstated conditions were.

`package-lock.json` is your ingredient list, with exact quantities. But you have not written
down the oven temperature: **the Node version**.

### Promitly connection

You have **half** of reproducibility already:

✅ `package-lock.json` exists with `lockfileVersion: 3` — dependency versions are locked.
❌ No `engines` field in `package.json`. No `.nvmrc`. **The Node version is not pinned** (R-11).

What this means concretely: your laptop runs Node v22.13.0. Vercel picks whatever Node version
its default is today. Those two are probably compatible right now — but "probably compatible
today" is not an engineering guarantee. When Vercel changes its default (platforms do this
regularly, on their schedule, without asking you), your build could start behaving differently
with **zero changes to your code**, and you would have no idea why.

And you would find out the same way you find out about everything else right now: by noticing.

> ما يعنيه هذا عمليًا: حاسوبك يشغّل Node v22.13.0، بينما تختار Vercel النسخة الافتراضية لديها
> اليوم. الاثنتان متوافقتان **على الأرجح** الآن — لكن "متوافق على الأرجح اليوم" ليس ضمانًا
> هندسيًا. وعندما تُغيّر Vercel نسختها الافتراضية (وهي تفعل ذلك دوريًا وبجدولها الخاص ودون
> أن تستأذنك)، قد يتغيّر سلوك البناء **دون أي تغيير في كودك**، ولن تعرف السبب.

### Hands-on task

**P1-06 — Pin the Node version.** 🟦 → becomes 🟧 when merged, because it changes how the
production build runs.

Step 1 — record the current truth:

```bash
node -v          # → v22.13.0 on your machine
```

Step 2 — create `.nvmrc` (used by `nvm`, `fnm`, and many CI systems):

```bash
echo "22" > .nvmrc
```

Step 3 — add `engines` to `package.json`, which declares intent to npm and to Vercel:

```json
{
  "name": "promitly",
  "engines": {
    "node": ">=22.0.0 <23.0.0"
  }
}
```

**Why a range and not the exact `22.13.0`?** Because patch releases contain security fixes you
want automatically, while major versions contain breaking changes you do not. Pinning the major
version and floating within it is the standard trade-off: safety from breaking changes, without
freezing yourself out of security patches.

> **لماذا نطاق وليس نسخة دقيقة؟** لأن الإصدارات الترقيعية (patch) تحمل إصلاحات أمنية تريدها
> تلقائيًا، بينما الإصدارات الكبرى (major) تحمل تغييرات كاسرة لا تريدها. تثبيت الإصدار الكبير
> مع السماح بالحركة داخله هو المقايضة القياسية: أمان من الكسر دون حرمان من الترقيعات الأمنية.

Step 4 — 🟧 **Production change protocol** (this is your first real one — follow it exactly):

```text
1. PRE-CHECK
   Vercel dashboard → Settings → General → Node.js Version.
   Write down the current value. Take a screenshot.
   Also record the SHA of the currently deployed commit.

2. SAFETY
   The escape hatch is Vercel's deployment history: the previous deployment
   remains live and promotable until the new one succeeds. Confirm you can see
   it in the Deployments list before you push.

3. IMPLEMENT
   Push the branch, open a PR, and let the Vercel PREVIEW deployment build first.
   Do NOT merge to main until the preview build is green.

4. VERIFY
   Open the preview build log and confirm it reports the Node version you pinned.
   Then open the preview URL and confirm the site renders.
   After merging, repeat both checks on the production deployment.

5. ROLLBACK
   If the production build fails: production is unaffected — a failed build does
   not replace the live deployment. Revert the commit and push.
   If the build succeeds but the site misbehaves: Vercel dashboard → Deployments
   → select the previous good deployment → "Promote to Production".
```

**Read step 5 again.** A failed build on Vercel does not take your site down — the previous
deployment simply stays live. That is a genuinely valuable property of immutable atomic
deployments, and you should understand *why* it protects you, because when you build your own
deployment systems later, this property is something you will have to create deliberately rather
than receive for free.

> **اقرأ الخطوة الخامسة مرة أخرى.** فشل البناء في Vercel لا يُسقط موقعك — بل تبقى النسخة السابقة
> حيّة. هذه خاصية ثمينة للنشر الذرّي غير القابل للتغيير (immutable atomic deployment)، ويجب أن
> تفهم **لماذا** تحميك، لأنك حين تبني أنظمة نشر خاصة بك لاحقًا ستضطر لصناعة هذه الخاصية عمدًا
> بدل أن تحصل عليها مجانًا.

**P1-07 — Prove reproducibility.** 🟩

```bash
cd /tmp && rm -rf promitly-repro
git clone https://github.com/Tariq555/promitly.git promitly-repro
cd promitly-repro
node -v                # does it match .nvmrc?
npm ci                 # NOT npm install — see below
npm run build
```

**`npm ci` versus `npm install` — an important distinction.**

| | `npm install` | `npm ci` |
|---|---|---|
| Reads | `package.json` | `package-lock.json` **only** |
| May modify the lockfile | ✅ Yes | ❌ Never |
| Existing `node_modules` | Reuses | Deletes and reinstalls from scratch |
| Deterministic | ❌ No | ✅ Yes |
| Correct for | Local development, adding packages | **CI, and any reproducibility test** |

`ci` stands for "clean install". Using `npm install` in a pipeline is a common beginner mistake:
it can silently update the lockfile, which means your pipeline is testing a slightly different
dependency tree than the one you committed. Always use `npm ci` in automation.

> **الفرق بين `npm ci` و`npm install` مهم.** الأول يقرأ من ملف القفل فقط، ويحذف `node_modules`
> ويعيد التنصيب من الصفر، ولا يعدّل ملف القفل أبدًا — أي أنه حتمي. أما الثاني فقد يُحدّث ملف
> القفل بصمت، ما يعني أن خط الأنابيب يختبر شجرة اعتماديات مختلفة عن التي رفعتها. استخدم دائمًا
> `npm ci` في الأتمتة.

### What can break

| Failure | Symptom | How to diagnose |
|---|---|---|
| Pinned a Node version Vercel does not support | Build fails immediately | Read the build log's first lines — it states the version resolution |
| `engines` too strict (`"node": "22.13.0"`) | Build fails on a machine with 22.14.0 | Loosen to a major-version range |
| `npm ci` fails but `npm install` works | Lockfile is out of sync with `package.json` | Run `npm install` locally, commit the updated lockfile, retry `npm ci` |
| Build works locally, fails in CI | Something on your laptop is not in the repo | This is exactly the failure reproducibility is meant to expose. Read the CI log for the missing piece |

### Production lesson

> Reproducibility is not about elegance — it is about **debuggability**. When a build fails, the
> first question is always "what changed?" If your environment can change without your knowledge,
> that question has no answer, and debugging becomes guesswork. Pinning versions is how you
> guarantee the question always has an answer.
>
> قابلية إعادة الإنتاج ليست مسألة أناقة، بل **قابلية للتشخيص**. عند فشل البناء يكون السؤال
> الأول دائمًا "ما الذي تغيّر؟" — وإن كانت بيئتك تتغير دون علمك فلا إجابة لهذا السؤال، ويتحول
> التشخيص إلى تخمين. تثبيت النسخ هو ما يضمن وجود إجابة دائمًا.

### Interview questions

🟢 **Beginner — Q: What is a lockfile?**
A file that records the exact version of every dependency, including transitive ones, that was
installed. It ensures everyone installing the project gets an identical dependency tree, rather
than whatever satisfied the version ranges on that day.

🔵 **Junior — Q: Why use `npm ci` in CI instead of `npm install`?**
`npm ci` installs strictly from the lockfile, deletes `node_modules` first, and never modifies
the lockfile. It is deterministic and faster. `npm install` may resolve new versions and rewrite
the lockfile, meaning your pipeline could test a different dependency tree than the one in Git.

🟠 **Mid-level — Q: Our build passes locally and fails in CI. How do you approach it?**
I would treat it as an environment difference, not a code problem, and narrow it systematically:
compare the runtime version, compare how dependencies were installed, check for files present
locally but gitignored (`.env.local` is the classic), check for case-sensitivity differences
between macOS and Linux filesystems, and check for anything relying on local global tooling. The
fastest structural fix is to make the local environment match CI rather than reasoning about the
difference — which is exactly the argument for containerising development.

🔴 **Senior — Q: How far should reproducibility go? Is bit-for-bit reproducible builds worth it?**
It depends entirely on the threat model and the cost. For most product teams, pinning runtime and
dependency versions plus building on clean CI runners captures the great majority of the value at
very low cost. Fully deterministic, bit-for-bit reproducible builds — where the same source
always yields a byte-identical artifact — require eliminating timestamps, build paths, and
ordering non-determinism, which is significant ongoing engineering effort. That cost is justified
when you need to *verify* that a published binary corresponds to specific source: security-
critical software, supply-chain attestation, regulated environments. For a Next.js marketing and
prompt-library site, it would be a poor use of engineering time, and I would say so explicitly
rather than pursuing purity. The senior skill here is knowing which level of rigour the context
actually earns.

### Vocabulary — Chapter 1.3

| Word | Simple English definition | Arabic | Example sentence | DevOps usage |
|---|---|---|---|---|
| **deterministic** | Always produces the same result from the same input | حتمي / نتيجته ثابتة | "`npm ci` is deterministic." | Deterministic builds are the goal |
| **pin** | To lock something to an exact version | يُثبّت النسخة | "We pinned Node to major version 22." | Pin versions, pin dependencies, pin images |
| **transitive dependency** | A dependency of your dependency | اعتماد غير مباشر | "The vulnerability was in a transitive dependency." | Most supply-chain risk lives here |
| **artifact** | A file produced by a build | مُخرَج البناء | "The build artifact is uploaded to CI." | "Build artifact", "release artifact" |
| **drift** | Slow divergence from the intended state | انحراف تدريجي | "The environments drifted apart." | Config drift, version drift |
| **clean install** | Installing from scratch with nothing left over | تنصيب نظيف من الصفر | "Always do a clean install in CI." | What `npm ci` performs |
| **breaking change** | A change that makes existing code stop working | تغيير كاسر للتوافق | "Major versions may contain breaking changes." | Semantic versioning |
| **threat model** | A structured view of what you are defending against | نموذج التهديد | "That control is not justified by our threat model." | Used to right-size security effort |

---

## CHAPTER 1.4 — HYGIENE AND THE SUPPLY CHAIN
### النظافة الهندسية وسلسلة التوريد
**Tasks: P1-08, P1-09 · Risk: 🟦 · Difficulty: ⭐–⭐⭐**

### Concept

**Software supply chain** means everything that enters your application that you did not write:
npm packages, their dependencies, base images, GitHub Actions, third-party scripts. You are
responsible for all of it in production, even though you wrote none of it.

### Why it exists

Modern applications are mostly other people's code. Promitly has 312 directories in
`node_modules` from 12 direct dependencies. Each one is code that runs during your build, and
some of it runs in your users' browsers. Attacks on this layer are now a primary vector, because
compromising one popular package reaches thousands of applications at once.

The defensive principle is simple and unglamorous: **reduce what you depend on**.

> **مبدأ الدفاع بسيط وغير برّاق: قلّل ما تعتمد عليه.** التطبيقات الحديثة معظمها كود كتبه آخرون —
> في بروميتلي 312 مجلدًا داخل `node_modules` نتجت عن 12 اعتمادًا مباشرًا فقط. وكل واحد منها كود
> يُنفَّذ أثناء البناء، وبعضه يُنفَّذ في متصفحات مستخدميك.

### Real-world analogy

A restaurant that buys from forty suppliers has forty ways to receive contaminated ingredients.
Reducing to twelve trusted suppliers does not make the food better — it makes the risk knowable.

### Promitly connection

**R-15: `@anthropic-ai/sdk` is installed with zero imports.**

```bash
$ grep -rn "anthropic" src
# (no output)
```

This is a real dependency, downloaded during every build, present in every lockfile resolution,
and included in every vulnerability scan you will ever run — providing **zero value**. It was
presumably added while planning the "AI Coming Soon" feature and then never used.

**R-16: hygiene.** `npm-debug.log` (1.6 MB) has been sitting in the working tree since April, and
`package.json` still declares `"name": "promti"` from before the rebrand.

None of these is dangerous today. All of them are **signals**. A senior engineer reading this
repository would notice them within a minute and form an impression: *nobody is minding this
project.* Hygiene matters because it is how the difference between a maintained system and an
abandoned one becomes visible — to reviewers, to auditors, and to your future self.

> لا شيء من هذا خطر اليوم، لكنها كلها **إشارات**. المهندس المحترف يلاحظها خلال دقيقة ويكوّن
> انطباعًا: *لا أحد يعتني بهذا المشروع.* النظافة الهندسية مهمة لأنها الطريقة التي يظهر بها الفرق
> بين نظام مُصان ونظام مهجور — أمام المراجعين والمدققين وأمام نفسك مستقبلًا.

### Hands-on task

**P1-08 — Hygiene** 🟦
1. Delete `npm-debug.log`. It is untracked, so this only affects your working tree.
2. Add `npm-debug.log*` — already present in `.gitignore`, so verify rather than duplicate.
3. Change `"name": "promti"` → `"name": "promitly"` in `package.json`.

**P1-09 — Remove the dead dependency** 🟦

```bash
git checkout -b chore/remove-dead-dependency
npm uninstall @anthropic-ai/sdk
npm run build           # MUST still succeed
git diff --stat         # expect package.json + package-lock.json only
```

**Before you commit, ask the senior question:** are you sure it is unused? `grep` on `src/` is
good evidence but not proof — a dependency can be referenced by a config file, a script, or by
another dependency. Widen the search:

```bash
grep -rn "anthropic" --include="*.ts" --include="*.tsx" --include="*.json" --include="*.mjs" . \
  | grep -v node_modules | grep -v package-lock.json
```

If that is empty too, the evidence is strong. And if you are wrong, the build fails — which is
exactly why you run the build **before** committing. Cheap, fast verification is what lets you
act decisively on good-but-imperfect evidence.

> **اسأل السؤال الاحترافي قبل الالتزام:** هل أنت واثق أنه غير مستخدم؟ `grep` على `src` دليل جيد
> لكنه ليس برهانًا — فقد يُشار إلى الحزمة من ملف إعدادات أو سكربت. وسّع البحث. وإن كنت مخطئًا،
> فسيفشل البناء — ولهذا نُشغّل البناء **قبل** الالتزام. التحقق السريع الرخيص هو ما يسمح لك
> بالتصرف بحسم اعتمادًا على دليل قوي وإن لم يكن كاملًا.

### What can break

| Failure | Symptom | Recovery |
|---|---|---|
| The package was used somewhere you did not search | Build fails with "cannot find module" | `git revert`, or reinstall the package |
| Removing it changes the lockfile in unexpected ways | Large `package-lock.json` diff | Read the diff. Transitive dependencies leaving with it is normal |
| Renaming the package breaks something | Unlikely for a private app, but verify | The `name` field matters for published packages, not private ones |

### Production lesson

> Every dependency is a permanent liability with a maintenance cost, a security surface, and an
> upgrade burden. The question is never "is this package useful?" — it is "is it useful enough to
> be worth owning forever?" Senior engineers delete more dependencies than they add.
>
> كل اعتماد هو التزام دائم له تكلفة صيانة وسطح أمني وعبء ترقية. السؤال ليس "هل هذه الحزمة
> مفيدة؟" بل "هل هي مفيدة بما يكفي لأمتلكها إلى الأبد؟" المهندسون الكبار يحذفون من الاعتماديات
> أكثر مما يضيفون.

### Interview questions

🟢 **Beginner — Q: What is a software dependency?**
Code written by someone else that your application needs in order to work. You install it rather
than writing it yourself.

🔵 **Junior — Q: Why is an unused dependency a problem, not just clutter?**
It is still downloaded and installed on every build, so it slows builds. It still appears in
vulnerability scans, so it generates alerts you must triage for no benefit. It still executes
install scripts, so it is a live code-execution surface. And it misleads readers about what the
system actually uses.

🟠 **Mid-level — Q: A vulnerability is reported in a transitive dependency four levels deep.
Walk me through your response.**
First I establish exploitability rather than reacting to the severity score: is the vulnerable
code path actually reachable from our application, and does the vulnerability apply to how we
use it? A critical CVE in a code path we never call is a low-priority ticket, not an emergency.
Then I check whether a direct dependency has released an updated version that pulls the fixed
transitive version, which is the clean fix. If not, I can use an override or resolution to force
the patched version, accepting that this is a temporary measure I must track. If nothing is
available, I document the accepted risk with a review date, and consider whether a compensating
control reduces the exposure. The important discipline is triage — teams that treat every scanner
finding as urgent quickly learn to ignore the scanner entirely.

🔴 **Senior — Q: How would you design a supply-chain security posture for a small team?**
I would optimise for controls that work without constant human attention, because a small team
has no capacity for a process that depends on vigilance. Concretely: lockfiles committed and
`npm ci` everywhere so installs are deterministic; automated dependency updates with tests
gating the merge, so upgrades are routine and small rather than rare and terrifying; secret
scanning enabled at the platform level; pinned CI action versions by commit SHA rather than a
mutable tag, because a compromised tag is a direct path into the build; and an SBOM generated at
build time so that when the next widely-exploited CVE appears, answering "are we affected?" takes
minutes rather than a day. I would deliberately *not* add manual review gates or a heavyweight
approval process, because those decay to rubber-stamping the moment the team is busy — and a
control that everyone routes around is worse than no control, since it creates false confidence.

### Vocabulary — Chapter 1.4

| Word | Simple English definition | Arabic | Example sentence | DevOps usage |
|---|---|---|---|---|
| **supply chain** | Everything external that goes into your software | سلسلة التوريد البرمجية | "Supply chain attacks are increasing." | A major security domain |
| **surface** (attack surface) | All the places where a system could be attacked | سطح الهجوم | "Every dependency increases the attack surface." | "Reduce the attack surface" |
| **liability** | Something that creates ongoing risk or cost | التزام / عبء | "Every dependency is a liability." | Contrast with "asset" |
| **triage** | Deciding what to handle first by urgency | فرز الأولويات | "We triage vulnerability reports weekly." | Borrowed from emergency medicine |
| **exploitable** | Can actually be used by an attacker in practice | قابل للاستغلال فعليًا | "The CVE is present but not exploitable here." | Separates real risk from noise |
| **compensating control** | A different safeguard used when the ideal fix is unavailable | ضابط تعويضي | "We added a WAF rule as a compensating control." | Risk management vocabulary |
| **SBOM** | Software Bill of Materials — a list of everything in your build | قائمة مكوّنات البرمجية | "Generate an SBOM on every release." | Increasingly required by regulation |
| **rubber-stamping** | Approving without really reviewing | موافقة شكلية بلا مراجعة | "The review process became rubber-stamping." | A known failure mode of process |

---

## CHAPTER 1.5 — GIT AS AN ENGINEERING CONTROL
### Git كأداة ضبط هندسي
**Tasks: P1-10, P1-11, P1-12 · Risk: 🟦 → 🟧 · Difficulty: ⭐⭐–⭐⭐⭐**

### Concept

Most people learn Git as a *backup tool* — a way to save work and undo mistakes. That is the
smallest part of what it does. In production engineering, Git is a **control system**: it decides
what is allowed to reach production, who approved it, and what state you can return to.

> يتعلم معظم الناس Git كـ **أداة نسخ احتياطي** — طريقة لحفظ العمل والتراجع عن الأخطاء. وهذا
> أصغر أدواره. في هندسة الإنتاج، Git هو **نظام ضبط**: يقرر ما الذي يُسمح له بالوصول إلى الإنتاج،
> ومن وافق عليه، وإلى أي حالة يمكنك العودة.

### Why it exists

Because on Promitly today, `git push` **is** a deployment to real users. There is nothing between
your keyboard and production. That means every Git control you add is directly a production
safety control:

| Git concept | What it actually protects |
|---|---|
| Branch | Isolates unfinished work from production |
| Pull request | Creates a moment where checks can run before code ships |
| Preview deployment | Lets you *see* the change running before users do |
| Required status check | Makes passing tests a precondition for shipping, not a suggestion |
| Branch protection | Removes your ability to bypass your own rules at 1am |
| Tag / release | Creates a nameable version you can roll back *to* |

### Real-world analogy

An airport does not trust pilots to be careful. It builds a sequence of checks that must pass
before a plane is permitted onto the runway — not because pilots are bad, but because humans at
3am are unreliable and the cost of one mistake is enormous. Branch protection is a runway gate.

> المطار لا يعتمد على حرص الطيارين، بل يبني سلسلة فحوص يجب اجتيازها قبل السماح للطائرة بالمدرج —
> ليس لأن الطيارين سيئون، بل لأن البشر في الثالثة صباحًا غير موثوقين وتكلفة الخطأ هائلة.
> حماية الفرع هي بوابة المدرج.

### Promitly connection

The current state (R-14):

```
11 commits · 1 branch · 0 pull requests · 0 tags · 0 reviews · 0 protections
Every commit went directly to main and directly to production.
```

You are about to change all of that — and importantly, you are going to change it **before** you
have CI, so that when CI arrives in Phase 3 the workflow already exists and CI simply plugs into
it. Building the pipeline first and the workflow afterwards is the wrong order and produces a
pipeline nobody uses.

### Hands-on task

**P1-10 — Your first feature branch** 🟦

Use one of the Phase 1 cleanup tasks as the payload — for example P1-09:

```bash
git switch -c chore/remove-dead-dependency     # modern form of: git checkout -b
# ...make the change, run the build...
git add package.json package-lock.json
git commit -m "chore: remove unused @anthropic-ai/sdk dependency"
git push -u origin chore/remove-dead-dependency
```

**Branch naming matters more than it appears.** A convention like
`<type>/<short-description>` (`feat/`, `fix/`, `chore/`, `docs/`) makes the branch list readable
at a glance and lets automation route work by type later. Match your commit message convention
(`feat:`, `fix:`, `chore:`) so the two systems agree.

**P1-11 — Your first pull request** 🟦

Open the PR on GitHub. Write a real description, in English, containing:
- **What** changed
- **Why** it changed
- **How it was verified** (the exact command and its result)
- **Risk** and rollback

Then watch what happens. Vercel will automatically build a **preview deployment** for the PR and
post a unique URL. Open it. **This is a capability you have owned since day one and never used.**

Preview deployments are, in effect, a free per-change staging environment: an isolated, fully
built copy of your application at that exact commit, on a real URL, with real infrastructure.
Understanding this deeply matters, because in Phase 5 we build a proper staging strategy on top
of it rather than inventing something new.

> نشرات المعاينة (preview deployments) هي عمليًا بيئة staging مجانية لكل تغيير: نسخة معزولة
> ومبنية بالكامل من تطبيقك عند ذلك الـ commit بالضبط، على رابط حقيقي وبنية تحتية حقيقية.
> فهم هذا بعمق مهم، لأننا في المرحلة الخامسة سنبني استراتيجية staging فوقه بدل اختراع شيء جديد.

**P1-12 — Branch protection** 🟧 **Production change**

```text
1. PRE-CHECK
   GitHub → Settings → Branches. Record the current rules (there are none).
   Confirm you have no unpushed local commits on main:  git status

2. SAFETY
   Branch protection is fully reversible from the same settings page.
   Risk here is low but real: you are removing your own emergency access to main.
   Decide NOW, in writing, what you will do in an emergency —
   temporarily disable protection, or use an admin override. Write the choice down.

3. IMPLEMENT
   Enable on `main`:
     ✅ Require a pull request before merging
     ✅ Do not allow force pushes
     ✅ Do not allow deletions
     ⬜ Require approvals — set to 0 for now (you are a solo developer;
        requiring an approval you cannot give would block you entirely)
     ⬜ Require status checks — leave OFF until Phase 3, when checks exist

4. VERIFY
   Deliberately attempt a direct push and confirm GitHub rejects it:
     git switch main
     git commit --allow-empty -m "test: verify branch protection"
     git push                      # → MUST be rejected
     git reset --hard origin/main  # clean up the local test commit
   THE REJECTION IS THE EVIDENCE. Save that terminal output.

5. ROLLBACK
   GitHub → Settings → Branches → delete or disable the rule.
```

**Step 4 deserves emphasis.** You are not verifying that the setting is *enabled* — you are
verifying that it *works*, by trying to do the forbidden thing and being stopped. That distinction
— testing the control rather than trusting the configuration — is one of the most transferable
habits in this entire manual. It is exactly how you should verify firewall rules, IAM policies,
RLS policies, and backups.

> **الخطوة الرابعة تستحق التأكيد.** أنت لا تتحقق من أن الإعداد **مُفعّل**، بل من أنه **يعمل**،
> عبر محاولة فعل الممنوع والتأكد من منعك. هذا التمييز — اختبار الضابط بدل الثقة بالإعداد — من
> أكثر العادات قابلية للنقل في هذا الدليل كله، وهو بالضبط كيف يجب أن تتحقق من قواعد الجدار
> الناري وسياسات IAM وسياسات RLS والنسخ الاحتياطية.

### Note on approvals for a solo developer

Requiring one approval when you are the only developer creates a rule you must break every single
time. **A rule that is always bypassed teaches you to bypass rules.** Keep approvals at zero
until there is a second person, and let the automated checks in Phase 3 be your reviewer instead.
This is not a compromise of standards — it is choosing a control that actually functions at your
current team size.

> اشتراط موافقة واحدة وأنت المطوّر الوحيد يخلق قاعدة ستضطر لكسرها في كل مرة. **والقاعدة التي
> تُكسر دائمًا تُعلّمك كسر القواعد.** أبقِ عدد الموافقات صفرًا حتى وجود شخص ثانٍ، ودع الفحوص
> الآلية في المرحلة الثالثة تكون مراجعك. هذا ليس تنازلًا عن المعايير، بل اختيار ضابط يعمل فعلًا
> عند حجم فريقك الحالي.

### Rollback: the three levels you must be able to distinguish

| Level | Mechanism | Speed | When to use |
|---|---|---|---|
| **Platform** | Vercel → promote a previous deployment | **Seconds** | **During an incident. Always do this first** |
| **Git revert** | `git revert <sha>` creates a new commit undoing the change | Minutes (needs a rebuild) | After service is restored, to fix the source |
| **Git reset** | `git reset --hard` rewrites history | ❌ | **Never on a shared branch.** Destroys history others depend on |

**The critical operational lesson:** during an incident, roll back on the **platform** first, then
fix Git afterwards. Beginners try to fix forward with a Git commit while users are suffering,
which means waiting for a full build and hoping the fix is correct. Restore service first,
diagnose second. Those are separate activities and confusing them extends every outage.

> **الدرس التشغيلي الحاسم:** أثناء الحادثة، تراجع على مستوى **المنصة** أولًا ثم أصلح Git لاحقًا.
> المبتدئ يحاول الإصلاح للأمام بـ commit جديد بينما المستخدمون يعانون، فينتظر بناءً كاملًا
> ويأمل أن يكون الإصلاح صحيحًا. **استعد الخدمة أولًا، وشخّص ثانيًا** — نشاطان منفصلان، والخلط
> بينهما يُطيل كل انقطاع.

### What can break

| Failure | Symptom | Recovery |
|---|---|---|
| Branch protection blocks an urgent fix | Push rejected during an incident | Use the escape route you wrote down in step 2. This is why you write it beforehand |
| Force push to a shared branch | Others' history is destroyed | `git reflog` may recover it. Prevention (disallow force push) is far better than cure |
| PR merged with a failing preview | Broken code reaches production | This is exactly what Phase 3's required status checks will prevent |
| Long-lived branch drifts far from `main` | Painful merge conflicts | Keep branches small and short-lived — hours or days, not weeks |

### Production lesson

> The purpose of process is not to slow people down — it is to make the safe path the easy path.
> If your safety controls are inconvenient enough that people route around them, you have not
> added safety; you have added ceremony plus false confidence, which is strictly worse than
> having nothing.
>
> الغرض من الإجراءات ليس إبطاء الناس، بل **جعل المسار الآمن هو المسار السهل**. وإن كانت ضوابط
> السلامة مزعجة لدرجة أن الناس يلتفّون حولها، فأنت لم تُضِف أمانًا بل أضفت طقوسًا مع ثقة زائفة —
> وهذا أسوأ من لا شيء.

### Interview questions

🟢 **Beginner — Q: What is a pull request?**
A proposal to merge changes from one branch into another. It creates a place to review the code,
discuss it, and run automated checks before the change becomes part of the main branch.

🔵 **Junior — Q: What is the difference between `git revert` and `git reset`?**
`git revert` creates a *new* commit that undoes a previous one, leaving history intact — safe on
shared branches. `git reset` moves the branch pointer and can discard commits, rewriting history —
safe only on local branches nobody else has pulled.

🟠 **Mid-level — Q: Trunk-based development or Git Flow for this project?**
Trunk-based, clearly. Git Flow's long-lived `develop` and `release` branches solve a problem
Promitly does not have: coordinating versioned releases across a large team with scheduled
release windows. Promitly is one developer deploying continuously to a web application with no
version numbers and no users pinned to old versions. Trunk-based development — short-lived
branches merged into `main` frequently, with automated checks as the gate — matches the delivery
model. Choosing Git Flow here would import ceremony without importing the problem it solves.

🔴 **Senior — Q: How do you balance deployment safety against deployment speed?**
I reject the premise that they oppose each other, because the data does not support it. Teams
that deploy more frequently generally have *lower* change failure rates, because small changes
are easier to review, easier to reason about, and trivial to roll back. Slow, rare, large releases
are dangerous precisely because they bundle many changes, so when something breaks you cannot
tell which change did it. So my goal is not to slow deployment down — it is to make deployment
boring, through automated verification, small batch sizes, fast rollback, and monitoring good
enough that a bad change is caught in minutes. Where I *do* accept deliberate friction is for
irreversible operations: destructive database migrations, data deletion, DNS changes. There, the
asymmetry justifies a human gate, because rollback is not available and the cost of being wrong
is unbounded. The general principle is to match the weight of the control to the reversibility of
the action.

### Vocabulary — Chapter 1.5

| Word | Simple English definition | Arabic | Example sentence | DevOps usage |
|---|---|---|---|---|
| **merge** | To combine changes from one branch into another | دمج | "Merge the branch into main." | Merge, rebase, squash |
| **conflict** | When two changes edit the same lines and Git cannot choose | تعارض في الدمج | "Resolve the conflict before merging." | Merge conflicts |
| **gate** | A check that must pass before proceeding | بوابة إلزامية | "CI is a gate on merging." | Quality gate, approval gate |
| **bypass** | To go around a rule or control | يلتف حول القاعدة | "Admins can bypass branch protection." | A control that is easily bypassed is not a control |
| **reversible** | Can be undone | قابل للتراجع | "Deployments are reversible; deletions are not." | Drives how much process a change needs |
| **fix forward** | Fixing by deploying a new change instead of rolling back | الإصلاح بالتقدّم لا بالتراجع | "Do not fix forward during an outage." | Contrast with rollback |
| **batch size** | How much change ships at once | حجم الدفعة | "Small batch sizes reduce risk." | Core DORA/DevOps concept |
| **ceremony** | Process that costs effort but adds no real value | طقوس إجرائية بلا قيمة | "That approval step is pure ceremony." | Criticism of ineffective process |
| **trunk-based development** | Everyone merges small changes into one main branch frequently | التطوير على الفرع الرئيسي بدفعات صغيرة | "We use trunk-based development." | The dominant modern branching model |

---

# PHASE 1 — COMPLETION CRITERIA
## معايير إتمام المرحلة الأولى

Phase 1 is complete when **all** of the following are true and evidenced:

```
[ ] You know, with evidence, which Supabase project production uses and whether it is alive
[ ] You have personally tested signup on the live site and recorded the result
[ ] A clean clone + npm ci + npm run build succeeds, with the transcript saved
[ ] .env.example exists and was validated by a clean-clone setup
[ ] README.md and SYSTEM.md exist and are accurate
[ ] Node version is pinned in .nvmrc and package.json engines
[ ] A Vercel build log shows the pinned Node version being used
[ ] The dead dependency is removed and the build still passes
[ ] At least one feature branch and one pull request exist
[ ] You have opened a Vercel preview deployment URL and seen your change running
[ ] Branch protection is enabled AND you have a rejected direct push saved as evidence
[ ] Every task above is recorded in the Change Log (Part B)
```

**Then update the Progress Dashboard in section 0.6 — with real numbers only.**

---

# PART B — CHANGE LOG
## سجل التغييرات

Every change to Promitly gets one entry. No exceptions. Over time this becomes the engineering
history of the system — and the single most valuable artefact in this manual, because it is the
only part that could not have been copied from anywhere else.

**Template — copy this for every entry:**

```markdown
### YYYY-MM-DD — <short title>

| Field | Value |
|---|---|
| Task ID | P1-XX |
| Risk level | 🟩 / 🟦 / 🟨 / 🟧 / 🟥 |
| Why | What problem did this solve? Which risk ID does it address? |
| Files changed | path/to/file |
| Infrastructure changed | e.g. GitHub branch protection, Vercel env var — or "none" |
| Commit / PR | SHA or link |
| Verification | The exact command run and its output |
| Rollback | The exact steps to undo this — written before implementing |
| What I learned | In English. Two or three sentences |
| What broke | If anything did. Be honest — this column is the most valuable one |
```

---

### 2026-09-04 — R-01 resolved: production auth rebuilt on a new Supabase project

| Field | Value |
|---|---|
| Task ID | R-01 incident closure (unblocks P1-03 onward) |
| Risk level | 🟥 production data path |
| Why | Production auth had been dead for 105–133 days. The Supabase project referenced everywhere was permanently deleted. Signup, login, sessions, saved prompts, account deletion and copy analytics all failed while every page still returned HTTP 200 |
| Files changed | `supabase/migrations/0001_promitly_baseline.sql` (new), `src/lib/supabase.ts`, `src/app/auth/signup/page.tsx`, `src/app/auth/verify/page.tsx` (deleted), `.gitignore` |
| Infrastructure changed | New Supabase project `nlfkhfqvfmrjhcirywqk` (eu-west-1). Vercel env vars `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` replaced across Production, Preview and Development |
| Commit / PR | `d244cc2` on `main` |
| Verification | Live bundle contains only `nlfkhfqvfmrjhcirywqk.supabase.co`, zero occurrences of the dead ref. Anon read of all three tables returns `[]`. Anon INSERT rejected `42501`. `delete_user` returns `permission denied` for anon. `/auth/verify` returns 404. `mailer_autoconfirm: true` |
| Rollback | Vercel → promote the previous production deployment. The database cannot be rolled back — there is no backup |
| What I learned | Two defects had been latent in `supabase-schema.sql` the whole time and would have broken the app even on a healthy database: `saved_prompts` declared `category/title/content NOT NULL` while `savePrompt()` only sends `user_id + prompt_id`, and the `delete_user` RPC that `deleteAccount()` calls was never defined at all. Rebuilding the schema from the *calls in the code* rather than from the old schema file is what surfaced both |
| What broke | `vercel link` silently overwrote `.env.local` with the stale values Vercel still held, wiping the new key minutes after it was pasted. Caught by reading the file back. This is exactly how the outage could quietly return |

---

### 2026-09-04 — Phase 1: reproducibility and truth

| Field | Value |
|---|---|
| Task ID | P1-03, P1-04, P1-05, P1-06, P1-07, P1-08, P1-09, P1-10, P1-11 |
| Risk level | 🟦 low — documentation, pinning and dependency removal |
| Why | The repository did not describe itself. No `SYSTEM.md`, no `.env.example`, boilerplate README, no Node pin, a typo'd package name, and a dependency with zero imports. Addresses R-10, R-11, R-14, R-15, R-16 |
| Files changed | `SYSTEM.md` (new), `.env.example` (new), `.nvmrc` (new), `README.md`, `package.json`, `package-lock.json`, `.gitignore`; deleted `npm-debug.log` |
| Infrastructure changed | None yet. Branch protection is P1-12 and remains BLOCKED |
| Commit / PR | `47de78c` — PR [#1](https://github.com/Tariq555/promitly/pull/1) |
| Verification | Clean clone of the branch from GitHub → `npm ci` → `npm run build` succeeded on Node v24.20.0. `package.json` reports `name: promitly`, `engines: {"node":"24.x"}`, `@anthropic-ai/sdk` absent from both the manifest and `node_modules`. Vercel preview deployment `promitly-4lw9cnv1b` built Ready in 29s |
| Rollback | `git revert 47de78c`. Nothing here is load-bearing at runtime except the `package.json` change, and the build is proven green without the removed dependency |
| What I learned | `.gitignore`'s `.env*` pattern was silently swallowing `.env.example`, so the file would have looked fine locally and been missing for everyone who cloned. A `!.env.example` negation fixes it. The general lesson: a documentation file that is not actually committed is worse than no file, because it creates false confidence |
| What broke | Nothing broke, but the clean-clone test exposed something worse than a break — **the build succeeds with a completely unfilled `.env.local`**. It produces a site that loads perfectly and has no working backend. That is the exact shape of the four-month outage, and it means a green build proves nothing about whether production works |

---

### 2026-09-04 — P1-12 blocked: branch protection not applied

| Field | Value |
|---|---|
| Task ID | P1-12 |
| Risk level | 🟧 changes how `main` accepts writes |
| Why | `main` deploys straight to production with nothing standing between a careless push and every visitor. Addresses R-14 |
| Files changed | None |
| Infrastructure changed | **None — this is the blocker.** The intended ruleset: require a pull request, 0 required approvals, `enforce_admins: true`, linear history, no force pushes, no deletions |
| Commit / PR | — |
| Verification | Not performed |
| Rollback | `gh api -X DELETE repos/Tariq555/promitly/branches/main/protection` |
| What I learned | 0 required approvals is deliberate, not laziness. GitHub does not let you approve your own pull request, so a solo maintainer who requires one approval locks themselves out of their own repository permanently. The protection that matters here is *a PR must exist*, which preserves the preview deploy and the diff review, not *someone else must approve* |
| What broke | Nothing. The write to GitHub repository settings was denied by the local agent sandbox, so the task stopped rather than being worked around. Needs the owner to apply it or grant the permission |

---

### 2026-08-31 — Manual created, Phase 0 audit completed

| Field | Value |
|---|---|
| Task ID | — (baseline) |
| Risk level | 🟩 read-only |
| Why | Establish an evidence-based baseline before any change. You cannot improve what you have not measured |
| Files changed | `PROMITLY_DEVOPS_MASTER_MANUAL.md` (new) |
| Infrastructure changed | None |
| Commit / PR | *(not yet committed)* |
| Verification | Audit performed read-only: `git`, `dig`, `curl -I`, filesystem inspection. No application file was modified |
| Rollback | Delete the manual file. No system impact |
| What I learned | Promitly's apparent production quality is largely donated by Vercel, not engineered. Static pre-rendering makes it resilient by accident. The most urgent gap is not a missing technology — it is that nobody would know if the site broke |
| What broke | Nothing. But the audit found that the Supabase project referenced in `.env.local` has been deleted (NXDOMAIN, two resolvers), and whether production is affected is **still unknown** |

---

### 2026-08-31 — P1-01 / P1-02: production Supabase project confirmed DELETED

| Field | Value |
|---|---|
| Task ID | P1-01, P1-02 |
| Risk level | 🟩 read-only (investigation only — no change was made to any system) |
| Why | Resolve R-01, the single unknown that gates every later phase. A curriculum built on top of a broken production system is built on sand |
| Files changed | `PROMITLY_DEVOPS_MASTER_MANUAL.md` only |
| Infrastructure changed | **None.** Nothing was modified, deployed, or deleted |
| Commit / PR | *(not yet committed)* |
| Verification | `dig @8.8.8.8 bgynafpbomoynbtinpze.supabase.co` → `status: NXDOMAIN`<br>`dig @1.1.1.1 …` → `status: NXDOMAIN`<br>control `dig @1.1.1.1 +short supabase.co` → `76.76.21.21` (method sound)<br>Production bundle `chunks/…11p65mygjoeo~.js` contains `let rU="https://bgynafpbomoynbtinpze.supabase.co"`<br>Anon-key JWT payload claims → `ref=bgynafpbomoynbtinpze, role=anon`<br>`curl -X POST https://bgynafpbomoynbtinpze.supabase.co/auth/v1/signup` → `curl: (6) Could not resolve host`<br>`curl -sSI https://promitly.com/` → `HTTP/2 200`, `x-vercel-cache: HIT`, `x-nextjs-prerender: 1`, `age: 354786` |
| Rollback | Not applicable — read-only investigation. Revert the manual file if desired |
| What I learned | The repository is not the system. `.env.local` and the Vercel dashboard are two separate stores, and here they happen to agree — on a dead value. Because `NEXT_PUBLIC_*` is inlined at build time, the dead hostname is *baked into the shipped JavaScript*, so fixing the dashboard alone will change nothing until a redeploy. I also learned to read failure *shape*: `NXDOMAIN` is an instant DNS failure meaning **deleted**, whereas a paused project still resolves and fails slowly with a timeout. Those two produce different evidence, and the difference is the diagnosis |
| What broke | **Production authentication — and it was already broken before this session started.** Signup, login, saved prompts, and the analytics insert all target a host that does not exist. The site itself still returns HTTP 200 because almost every page is statically pre-rendered, which is precisely why nobody noticed: *the failure is invisible from the outside.* **Time-to-detection: unknown, and unknowable, because there is no monitoring (R-02).** That sentence is the entire justification for Phase 4, and it is now a fact with a date on it rather than a theory |

---

### 2026-08-31 — Impact assessment (Chapter 1.1b, steps 1–3: SCOPE · IMPACT · EVIDENCE)

| Field | Value |
|---|---|
| Task ID | P1-01 follow-up — incident triage, **no remediation attempted** |
| Risk level | 🟩 read-only |
| Why | Chapter 1.1b step 4 (DECIDE) cannot be answered honestly without knowing how long the outage has run, what it actually affects, and what is recoverable |
| Files changed | `PROMITLY_DEVOPS_MASTER_MANUAL.md` only |
| Infrastructure changed | **None** |
| Verification | See the three tables below |
| Rollback | Not applicable |

#### 1. SCOPE — what is broken and what is not

| Status | Feature | Why |
|---|---|---|
| 🔴 Broken | Signup, OTP verification, login, session restore, logout | `supabase.auth.*` → host does not resolve |
| 🔴 Broken | Saved prompts (save / list / unsave) | `saved_prompts` table unreachable |
| 🔴 Broken | Account deletion | `rpc("delete_user")` unreachable |
| 🔴 Broken | Copy analytics | `prompt_analytics` insert unreachable |
| 🟢 Working | Every static page, prompt browsing, categories, SEO, TLS | Pre-rendered at build time — **never touches Supabase at request time** |
| 🟢 Working | `POST /api/generate-prompt` | Pure function, no I/O |
| 🟢 Working | Contact form | Web3Forms is an independent vendor |

**This split is the whole lesson.** The static architecture that makes Promitly resilient is the
same property that made the outage invisible: the site returns `HTTP 200` on every page while
its entire authenticated surface is dead. **Uptime was never the right signal.**

> **هذا الانقسام هو الدرس كله.** المعمارية الثابتة التي تجعل بروميتلي متينًا هي نفسها ما جعل
> العطل غير مرئي: الموقع يُعيد `HTTP 200` على كل صفحة بينما سطح المصادقة بأكمله ميت.
> **التوفّر (uptime) لم يكن أبدًا الإشارة الصحيحة.**

#### 2. IMPACT — how long, and how many

| Evidence | Date | Source |
|---|---|---|
| Supabase project created | 2026-04-15 | `iat` claim in the production anon key JWT |
| `.env.local` written | 2026-04-16 | file mtime |
| Last commit → last possible deploy | 2026-04-20 | `git log -1` (133 days ago) |
| `skincaremodel` created | 2026-05-15 | Supabase API |
| `fashionmodel` created | 2026-05-18 | Supabase API |
| Outage discovered | 2026-08-31 | P1-01 |

**Dating the deletion — an inference, clearly labelled as one.** Supabase's Free Plan grants
**two projects, counted across every organisation where you are Owner or Administrator**, and
*paused* projects do not count against it. The account holds exactly one organisation and two
active projects, neither of them Promitly. For `fashionmodel` to be created on 2026-05-18, a
third slot was needed — so the Promitly project must already have been gone by that date.

```
Minimum time broken:  105 days   (deleted on/before 2026-05-18)
Maximum time broken:  133 days   (deleted any time after the last deploy, 2026-04-20)
```

**Confirm the exact date before treating it as fact:** Supabase sends a project-deletion
confirmation email. Search your inbox for it. That converts a well-supported inference into
evidence — and this manual's own standard says the difference matters.

**How many users were affected: unanswerable, and not only because the database is gone.**
`getLiveUserCount()` returns a hardcoded `BASE = 6086` with a deterministic ±8 daily wobble; it
has never queried the database (now logged as R-19). There is no real user metric anywhere in
the system, before or after the outage.

#### 3. EVIDENCE — recoverability

Supabase's own documentation is unambiguous: *"Deleting a Supabase project is a permanent and
irreversible action… We cannot recover deleted projects. All data, backups, and configurations
are permanently removed."* Deletion destroys the database, **all automated backups and PITR
snapshots**, storage objects, and **all authentication users**.

The `restore_project` operation applies to *paused* projects only — and a paused project would
still resolve in DNS, which this one does not.

| Question | Answer |
|---|---|
| Can the project be restored? | **No. Permanently.** |
| Are the backups recoverable? | **No** — they are deleted with the project |
| Are the user accounts recoverable? | **No** |
| Is there an export anywhere? | **None found.** No dump in the repo, no Supabase CLI config, no `supabase/` directory |
| What survives? | `supabase-schema.sql` — the **structure**, not the data |

#### 4. What I learned

The most uncomfortable finding is not the deletion — it is that a **single deletion made to free
a free-tier slot for an unrelated side project silently destroyed production authentication for
another live product, and nothing in the system objected.** No alert, no dependency check, no
environment separation, no deletion protection. The platform asked for a typed confirmation and
that was the entire safety mechanism.

Two follow-on findings came from triage rather than from the audit. **R-18:** the
`"Backend not configured."` fallback throughout `src/lib/supabase.ts` is dead code, because the
guard validates the config's *shape* (`url.startsWith("http")`) and never its *reachability* — a
health check that cannot fail is not a health check. **R-19:** the user counter is synthetic, so
the one number the product displays about its users has never been a measurement.

#### 5. What broke

Production authentication, for **105–133 days**, with a time-to-detection that was not merely
long but *unbounded* — no mechanism existed that would ever have reported it. It was found only
because a curriculum exercise happened to look. **Permanent, unrecoverable data loss** of all
user accounts and saved prompts.

---

# PART C — ARCHITECTURE EVOLUTION
## تطور المعمارية

Update this Part at the end of every phase. Never add a box to a diagram that does not exist in
reality — an aspirational diagram is a lie that future-you will believe.

> حدّث هذا الجزء في نهاية كل مرحلة. لا تُضِف أبدًا صندوقًا إلى المخطط غير موجود في الواقع —
> فالمخطط الطموح كذبة سيصدقها "أنت" في المستقبل.

## STAGE 0 — Current (2026-08-31)

```text
DELIVERY
  You  ──git push──▶  GitHub(main)  ──webhook──▶  Vercel build  ──▶  Production
       no review        no branches      no tests        only gate:
                        no PRs           no CI           does TS compile?

RUNTIME
  Browser ──▶ DNS(vercel-dns) ──▶ Vercel Edge/CDN ──▶ [cache HIT: static HTML]
                                                  └─▶ [MISS: serverless fn → /api/generate-prompt]
  Browser ──────────────────────────────────────────▶ Supabase (auth, saved prompts, analytics)
  Browser ──────────────────────────────────────────▶ Web3Forms (contact form)

OBSERVABILITY
  (none)

Maturity: 2.2/10
```

## STAGE 1 — Target after Phase 1

```text
DELIVERY
  You ──▶ feature branch ──▶ Pull Request ──▶ Vercel PREVIEW deployment (you verify)
                                  │
                                  └── branch protection blocks direct pushes to main
                                                    ↓
                                            merge ──▶ Production

REPRODUCIBILITY
  .nvmrc + engines (Node pinned) · package-lock.json · .env.example · README.md · SYSTEM.md
  → verified by a clean-clone build

RUNTIME:        unchanged (correctly — Phase 1 changes no runtime behaviour)
OBSERVABILITY:  still none  ← the largest remaining gap, addressed in Phase 4

Target maturity: ~3.5/10
```

## STAGE 2 — Target after Phase 4 (planned)

```text
  You ──▶ branch ──▶ PR ──▶ CI (lint · typecheck · unit · build) ──▶ preview
                              │                                        │
                              └── required status checks ──────────────┘
                                             ↓
                                     merge ──▶ Production
                                                  │
                                   ┌──────────────┴──────────────┐
                                   ▼                             ▼
                          Uptime monitor + alerts        Error tracking
                                   │                             │
                                   └────────▶ You are told ◀─────┘
                                              within minutes

Target maturity: ~5.5/10
```

**Nothing beyond Stage 2 is drawn yet, deliberately.** Diagrams for phases you have not designed
are decoration. They will be added as each phase is planned, with real components only.

---

# PART D — ENGLISH VOCABULARY INDEX
## فهرس المفردات الإنجليزية

**How to use this index.** Do not memorise it as a list. Each time you complete a task, take
three words from that chapter's table and **use them in a sentence in your Change Log entry**.
Vocabulary learned in the context of work you actually did is retained; vocabulary learned from
a list is not.

> **كيف تستخدم هذا الفهرس:** لا تحفظه كقائمة. في كل مرة تُنهي مهمة، خذ ثلاث كلمات من جدول ذلك
> الفصل و**استخدمها في جملة داخل سجل التغييرات**. المفردات المتعلَّمة في سياق عمل قمت به فعلًا
> تبقى، والمتعلَّمة من قائمة لا تبقى.

**Words covered so far — 47 terms:**

| Chapter | Terms |
|---|---|
| Part 1 | baseline · audit · evidence · deployment · rollback · pipeline · environment · reproducible · immutable · outage · blast radius · drift · gate · observability · provision |
| Learning Map | trade-off · justify · operational burden · overhead · premature · stateless · adopt · defer |
| Ch 1.1 | resolve · scope · silent failure · source of truth · inconclusive · postmortem · blameless · time to detection |
| Ch 1.2 | onboarding · bus factor · runbook · stale · boilerplate · inventory · mitigation · leverage |
| Ch 1.3 | deterministic · pin · transitive dependency · artifact · clean install · breaking change · threat model |
| Ch 1.4 | supply chain · attack surface · liability · triage · exploitable · compensating control · SBOM · rubber-stamping |
| Ch 1.5 | merge · conflict · bypass · reversible · fix forward · batch size · ceremony · trunk-based development |

**Writing practice — required, once per phase.** At the end of each phase, write a short
retrospective **in English**, roughly 150–200 words, answering:
1. What did I build?
2. What broke, and how did I find out?
3. What would I do differently?

Then translate the *hardest* sentence you wrote into Arabic and back into English. The gap between
your two English versions is exactly where your English is weakest — that gap is the lesson.

> **تمرين كتابة إلزامي مرة واحدة في كل مرحلة.** في نهاية كل مرحلة اكتب مراجعة قصيرة **بالإنجليزية**
> (150–200 كلمة) تجيب: ماذا بنيت؟ ما الذي انكسر وكيف اكتشفته؟ ما الذي سأفعله بشكل مختلف؟
> ثم ترجم أصعب جملة كتبتها إلى العربية ثم أعدها إلى الإنجليزية. الفجوة بين نسختيك الإنجليزيتين
> هي بالضبط موضع ضعف لغتك — وتلك الفجوة هي الدرس.

---

# YOUR FIRST HANDS-ON EXERCISE
## أول تمرين عملي

**Do this now, before anything else. It takes about 20 minutes and it is entirely read-only.**

### Task: P1-01 — Establish the truth about production

```bash
# Step 1 — What does your LOCAL environment point at?
grep NEXT_PUBLIC_SUPABASE_URL .env.local | sed -E 's#.*//([^.]+)\..*#local ref = \1#'

# Step 2 — Does that project still exist?
dig +short $(grep NEXT_PUBLIC_SUPABASE_URL .env.local | sed -E 's#.*//([^.]+)\..*#\1#').supabase.co
# Empty output = the project is gone.

# Step 3 — Is production even reachable, and is it cached?
curl -sSI https://promitly.com/ | grep -iE "^(HTTP|x-vercel-cache|age|server)"
```

Then, in the browser:

4. **Vercel dashboard** → Promitly → Settings → Environment Variables. Record variable **names**
   and their environment scopes. Extract the **Production** Supabase project ref — nothing else.
5. `dig +short <that-ref>.supabase.co` — does production's database exist?
6. **Supabase dashboard** — is that project Active, Paused, or missing?
7. Open a private browser window → `https://promitly.com/auth/signup` → open DevTools → Network →
   attempt a real signup and record exactly what happens.

### Record your findings here

```markdown
DATE: 2026-08-31

Local Supabase ref:        bgynafpbomoynbtinpze   resolves? NO  (NXDOMAIN, 8.8.8.8 + 1.1.1.1)
Production Supabase ref:   bgynafpbomoynbtinpze   resolves? NO  (same host, same result)
Same project?              YES
Supabase project status:   NOT FOUND
                           (NXDOMAIN means DELETED, not paused — a paused project
                            still resolves in DNS. Also absent from the only
                            organisation on the connected Supabase account.)
Live signup attempt:       FAILED — the browser cannot even reach the auth host.
                           error observed: net::ERR_NAME_NOT_RESOLVED
                           Reproduced from the command line against the exact
                           endpoint the client calls:
                             curl -X POST https://bgynafpbomoynbtinpze.supabase.co/auth/v1/signup
                             → curl: (6) Could not resolve host
Verification email:        NOT RECEIVED — no request ever leaves the browser,
                           so Supabase is never asked to send one.

CONCLUSION (one sentence, in English):
Production and local development point at the same Supabase project, that project
has been deleted, and therefore every authenticated feature on promitly.com —
signup, login, saved prompts, and analytics — is broken for real users.

IS PRODUCTION CURRENTLY BROKEN FOR REAL USERS?   YES
```

### How the production ref was proved (the technique matters)

The homepage alone is not enough — the Supabase client sits in a lazily-loaded chunk the
homepage never references, which is why the first attempt was inconclusive. Fetch the pages that
actually use auth, collect every chunk they reference, download the set, and grep it:

```bash
for p in / /auth/signup /auth/login /account /saved; do
  curl -sS "https://promitly.com$p" -o "page$(echo $p | tr '/' '_').html"
done
grep -ohE '/_next/static/[^"'"'"']+\.js' *.html | sort -u > chunk_urls.txt   # → 16 chunks
while read u; do curl -sS "https://promitly.com$u" -o "chunks/$(echo $u | tr '/' '_')"; done < chunk_urls.txt
grep -ohE '[a-z0-9]{15,30}\.supabase\.co' chunks/* | sort -u
# → bgynafpbomoynbtinpze.supabase.co        (exactly one distinct host)
```

**Two independent confirmations inside the same bundle**, which is what makes this conclusive
rather than suggestive:

1. The inlined URL constant: `let rU="https://bgynafpbomoynbtinpze.supabase.co"`
2. The anon key is a JWT, and its payload carries its own project ref. Decoding **only the
   payload's claims** (never printing the key itself) gives
   `ref=bgynafpbomoynbtinpze · role=anon`. A key issued by a *different* project could not carry
   this ref, so the URL is not a leftover string — it is the credential's true owner.

> **الأسلوب هو الدرس هنا.** الصفحة الرئيسية وحدها لا تكفي، لأن عميل Supabase في حزمة تُحمّل
> عند الطلب. اجلب صفحات المصادقة، واجمع كل الحزم التي تشير إليها، ونزّلها، ثم ابحث فيها.
> وحصلنا على تأكيدين مستقلين داخل نفس الحزمة: ثابت الرابط المُدمج، ومطالبة `ref` داخل حمولة
> مفتاح anon (وهو JWT). المفتاح الصادر عن مشروع آخر لا يمكن أن يحمل هذا المُعرّف — أي أن الرابط
> ليس بقايا نص قديم، بل هو المالك الحقيقي للاعتماد.

**Why this is the right first exercise.** It requires no installation, no risk, and no
permission. It teaches DNS, environment variables, HTTP headers, and browser devtools in a single
sitting. And most importantly, it produces **the one fact that determines what we do next** —
because a curriculum built on top of a broken production system would be a curriculum built on
sand.

> **لماذا هذا هو التمرين الأول الصحيح؟** لأنه لا يتطلب أي تنصيب ولا مخاطرة ولا إذن. يُعلّمك DNS
> ومتغيرات البيئة وترويسات HTTP وأدوات المتصفح في جلسة واحدة. والأهم أنه يُنتج **الحقيقة الوحيدة
> التي تُحدّد ما سنفعله تاليًا** — لأن منهجًا يُبنى فوق نظام إنتاج معطوب هو منهج مبني على رمل.

---

# RECOMMENDED NEXT MILESTONE
## المحطة القادمة الموصى بها

**Milestone 1 — "The system is knowable"** · target: 2–3 weeks · tasks P1-01 → P1-12

You will know you have reached it when you can truthfully say all four of these:

1. *"I know exactly what production is running and what it depends on — with evidence, not
   memory."*
2. *"Anyone can clone this repository and get a working, identical build."*
3. *"No change can reach production without going through a pull request I can see and verify
   first."*
4. *"I have written down how this system works, and someone else could operate it from my
   documentation."*

**Then, and only then, Phase 2 begins.**

And one honest warning before you start: the thing most likely to derail this is **skipping
verification** — implementing a task, seeing that it looks right, and marking it done without
producing evidence. That habit feels like speed. It is not. It is how you arrive at Phase 6 with
a system you believe is configured correctly and cannot prove is configured at all.

**Evidence, or it did not happen.**

> **تحذير صادق قبل أن تبدأ:** أكثر ما قد يُفشل هذا المسار هو **تخطّي التحقق** — أن تُنفّذ مهمة
> وتراها تبدو صحيحة فتضع علامة الإنجاز دون إنتاج دليل. هذه العادة تبدو سرعة، وهي ليست كذلك؛
> بل هي الطريق لتصل إلى المرحلة السادسة ومعك نظام **تعتقد** أنه مضبوط ولا تستطيع إثبات ضبطه أصلًا.
>
> **دليل، وإلا فلم يحدث.**

---

*End of PROMITLY_DEVOPS_MASTER_MANUAL.md v0.1.0 — Parts 2–23 are expanded as each phase unlocks.*
