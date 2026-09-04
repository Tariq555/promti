-- ═══════════════════════════════════════════════════════════════
-- PROMITLY — baseline schema
--
-- Rebuilds the database surface that src/lib/supabase.ts actually
-- uses. Idempotent: safe to re-run.
--
-- Scope is deliberately limited to what the app calls today:
--   profiles          — auto-created on signup
--   saved_prompts     — savePrompt / getSavedPrompts / unsavePrompt
--   prompt_analytics  — trackCopy
--   delete_user()     — deleteAccount RPC
--
-- Intentionally NOT recreated (dead surface in the old schema file):
--   site_stats + live_user_count — getLiveUserCount() is now computed
--     client-side from a hardcoded base, so the table was unread. The
--     view was also SECURITY DEFINER and the table had a policy while
--     RLS was left disabled.
--   waitlist — /contact posts to web3forms, never to Postgres.
-- ═══════════════════════════════════════════════════════════════

-- ─── 1. Profiles ─────────────────────────────────────────────────
-- Mirrors auth.users. The app reads full_name from user_metadata, so
-- this exists for server-side joins and cascade-on-delete hygiene.
create table if not exists public.profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  full_name  text,
  avatar_url text,
  created_at timestamptz not null default now()
);

-- Auto-create a profile row on signup.
-- Runs as definer so it can write past RLS. Wrapped so that a failure
-- here can never break the signup transaction itself.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', ''))
  on conflict (id) do nothing;
  return new;
exception
  when others then
    raise warning 'handle_new_user failed for %: %', new.id, sqlerrm;
    return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ─── 2. Saved prompts ────────────────────────────────────────────
-- prompt_id is a slug into the static catalogue in src/data/prompts.ts.
create table if not exists public.saved_prompts (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users(id) on delete cascade,
  prompt_id  text not null,
  category   text,
  title      text,
  content    text,
  created_at timestamptz not null default now(),
  unique (user_id, prompt_id)
);

-- The original schema had these three NOT NULL, but savePrompt() only
-- ever sends user_id + prompt_id. Relax them if an old copy is present.
alter table public.saved_prompts alter column category drop not null;
alter table public.saved_prompts alter column title    drop not null;
alter table public.saved_prompts alter column content  drop not null;

-- getSavedPrompts filters on user_id and orders by created_at desc.
create index if not exists saved_prompts_user_created_idx
  on public.saved_prompts (user_id, created_at desc);

-- ─── 3. Copy analytics ───────────────────────────────────────────
create table if not exists public.prompt_analytics (
  id         uuid primary key default gen_random_uuid(),
  prompt_id  text not null,
  category   text not null,
  platform   text not null default 'unknown',
  user_id    uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists prompt_analytics_prompt_idx
  on public.prompt_analytics (prompt_id);
create index if not exists prompt_analytics_created_idx
  on public.prompt_analytics (created_at desc);

-- ═══════════════════════════════════════════════════════════════
-- Row Level Security
--
-- Every table below is RLS-enabled with an explicit policy per verb.
-- Anything without a policy is denied — there is no blanket USING(true)
-- read anywhere, and no client-side write path to another user's rows.
-- ═══════════════════════════════════════════════════════════════

alter table public.profiles         enable row level security;
alter table public.saved_prompts    enable row level security;
alter table public.prompt_analytics enable row level security;

-- Profiles — owner reads and updates its own row. No client INSERT
-- policy: rows come only from the definer trigger. No DELETE policy:
-- removal cascades from auth.users.
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles for select
  to authenticated
  using ((select auth.uid()) = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles for update
  to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

-- Saved prompts — full ownership, scoped to the caller.
drop policy if exists "saved_prompts_select_own" on public.saved_prompts;
create policy "saved_prompts_select_own"
  on public.saved_prompts for select
  to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "saved_prompts_insert_own" on public.saved_prompts;
create policy "saved_prompts_insert_own"
  on public.saved_prompts for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "saved_prompts_delete_own" on public.saved_prompts;
create policy "saved_prompts_delete_own"
  on public.saved_prompts for delete
  to authenticated
  using ((select auth.uid()) = user_id);

-- Analytics — append-only from the browser, including signed-out
-- visitors. The check stops a caller attributing a copy event to
-- somebody else's account: either anonymous, or your own uid.
drop policy if exists "prompt_analytics_insert" on public.prompt_analytics;
create policy "prompt_analytics_insert"
  on public.prompt_analytics for insert
  to anon, authenticated
  with check (user_id is null or user_id = (select auth.uid()));

-- No SELECT / UPDATE / DELETE policy on prompt_analytics: it is
-- write-only for clients and readable only via the service role.

-- ═══════════════════════════════════════════════════════════════
-- Account deletion RPC
--
-- src/lib/supabase.ts calls supabase.rpc("delete_user"). Deleting from
-- auth.users needs privileges the anon/authenticated roles do not have,
-- so this is SECURITY DEFINER and hard-scoped to the caller's own uid.
-- saved_prompts and profiles disappear via ON DELETE CASCADE.
-- ═══════════════════════════════════════════════════════════════

create or replace function public.delete_user()
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  uid uuid := auth.uid();
begin
  if uid is null then
    raise exception 'Not authenticated' using errcode = '28000';
  end if;
  delete from auth.users where id = uid;
end;
$$;

-- Signed-out callers have no account to delete.
revoke all on function public.delete_user() from public, anon;
grant execute on function public.delete_user() to authenticated;
