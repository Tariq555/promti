import { createClient, SupabaseClient } from "@supabase/supabase-js";

const url  = process.env.NEXT_PUBLIC_SUPABASE_URL  ?? "";
const key  = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const live = url.startsWith("http") && key.length > 10;

export const supabase: SupabaseClient | null = live
  ? createClient(url, key)
  : null;

// ─── Auth helpers ─────────────────────────────────────

/** Sign up — Supabase sends a 6-digit OTP code to the user's email */
export async function signUp(email: string, password: string, name: string) {
  if (!supabase) return { user: null, error: { message: "Backend not configured." } };
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: name } },
  });
  return { user: data.user, error: error ?? null };
}

/** Verify 6-digit OTP sent after signup */
export async function verifyOtp(email: string, token: string) {
  if (!supabase) return { error: { message: "Backend not configured." } };
  const { error } = await supabase.auth.verifyOtp({ email, token, type: "signup" });
  return { error: error ?? null };
}

/** Sign in */
export async function signIn(email: string, password: string) {
  if (!supabase) return { user: null, error: { message: "Backend not configured." } };
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  return { user: data.user, error: error ?? null };
}

/** Sign out */
export async function signOut() {
  if (!supabase) return;
  await supabase.auth.signOut();
}

/** Get current session */
export async function getSession() {
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data.session;
}

/** Get current user */
export async function getUser() {
  if (!supabase) return null;
  const { data } = await supabase.auth.getUser();
  return data.user;
}

// ─── Saved prompts ────────────────────────────────────

/** Save a prompt for the currently logged-in user */
export async function savePrompt(promptId: string) {
  if (!supabase) return { success: false };
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false };
  const { error } = await supabase.from("saved_prompts").insert([
    { user_id: user.id, prompt_id: promptId },
  ]);
  return { success: !error, error: error?.message };
}

/** Get saved prompt IDs for the currently logged-in user */
export async function getSavedPrompts(): Promise<string[]> {
  if (!supabase) return [];
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];
  const { data } = await supabase
    .from("saved_prompts")
    .select("prompt_id")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });
  return (data ?? []).map((r: { prompt_id: string }) => r.prompt_id);
}

/** Remove a saved prompt for the currently logged-in user */
export async function unsavePrompt(promptId: string) {
  if (!supabase) return;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;
  await supabase
    .from("saved_prompts")
    .delete()
    .eq("user_id", user.id)
    .eq("prompt_id", promptId);
}

// ─── Account management ───────────────────────────────

/** Permanently delete the current user's account and all their data */
export async function deleteAccount() {
  if (!supabase) return { error: "Backend not configured." };
  const { error } = await supabase.rpc("delete_user");
  if (!error) await supabase.auth.signOut();
  return { error: error?.message ?? null };
}

// ─── Analytics ────────────────────────────────────────

export async function trackCopy(
  promptId: string,
  category: string,
  platform: string,
  userId?: string
) {
  if (!supabase) return;
  await supabase.from("prompt_analytics").insert([
    { prompt_id: promptId, category, platform, user_id: userId ?? null },
  ]);
}

// ─── User count ───────────────────────────────────────

/** Compute live user count from date math (no DB call needed) */
export function getLiveUserCount(): number {
  const LAUNCH   = new Date("2026-01-15").getTime();
  const DAILY    = 2.3;
  const BASE     = 2314;
  const days     = Math.floor((Date.now() - LAUNCH) / 86_400_000);
  return BASE + Math.floor(days * DAILY);
}
