"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Counter from "@/components/Counter";
import { getLiveUserCount } from "@/lib/supabase";
import { CATEGORIES } from "@/data/prompts";
import { BookOpen, Code2, Server, PenLine, Share2, Briefcase, Sparkles, FileText, Palette, Search, ArrowRight, Lock, Cpu, Layers, Zap as ZapIcon, TrendingDown, CheckCircle2, BookmarkCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>> = {
  BookOpen, Code2, Server, PenLine, Share2, Briefcase, Sparkles, FileText, Palette, Search, Cpu, Layers,
};

export default function Home() {
  const { user, loading: authLoading } = useAuth();
  const [count, setCount] = useState(3628);

  useEffect(() => {
    // Animate in after mount
    const t = setTimeout(() => setCount(getLiveUserCount()), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Navbar />
      <main style={{ position: "relative", zIndex: 2 }}>
        {/* ─── Hero ──────────────────────── */}
        <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: 80 }}>
          <div className="page" style={{ width: "100%", paddingTop: 60, paddingBottom: 80 }}>

            {/* Chip */}
            <div className="anim-up d1" style={{ marginBottom: 28, display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <span className="chip">AI Prompt Library</span>
              <span style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "4px 12px",
                borderRadius: 999,
                fontSize: 11,
                fontWeight: 700,
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                background: "linear-gradient(135deg, rgba(167,139,250,0.15) 0%, rgba(129,140,248,0.15) 100%)",
                border: "1px solid rgba(167,139,250,0.35)",
                color: "var(--violet)",
              }}>
                <span style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--violet)",
                  boxShadow: "0 0 6px var(--violet)",
                  animation: "pulse 2s ease-in-out infinite",
                  display: "inline-block",
                }} />
                AI · Coming Soon
              </span>
            </div>

            {/* Headline */}
            <h1 className="anim-up d2" style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(42px,7vw,80px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em", color: "var(--text-1)", marginBottom: 20, maxWidth: 800 }}>
              The prompts you need,{" "}
              <span style={{ background: "linear-gradient(135deg, var(--primary) 0%, var(--violet) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                for every task.
              </span>
            </h1>

            {/* Sub */}
            <p className="anim-up d3" style={{ fontSize: 18, lineHeight: 1.7, color: "var(--text-2)", maxWidth: 520, marginBottom: 36 }}>
              130+ structured prompts across 12 categories. Engineered to get results in one shot — not six. Works with ChatGPT, Claude, Gemini, Grok, Mistral, DeepSeek, Llama, Perplexity, and more.
            </p>

            {/* CTAs */}
            <div className="anim-up d4" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 64 }}>
              <Link href="/categories" className="btn btn-primary" style={{ fontSize: 15, padding: "11px 24px" }}>
                Browse Prompts <ArrowRight size={16} />
              </Link>
              {!authLoading && !user && (
                <Link href="/auth/signup" className="btn btn-ghost" style={{ fontSize: 15, padding: "11px 24px" }}>
                  Sign up free
                </Link>
              )}
            </div>

            {/* Counter */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                <Counter
                  value={count}
                  places={[1000, 100, 10, 1]}
                  fontSize={38}
                  padding={4}
                  gap={2}
                  textColor="var(--text-1)"
                  fontWeight={700}
                  gradientFrom="var(--bg)"
                  counterStyle={{ fontFamily: "var(--font-sans)" }}
                />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-2)" }}>people using PROMITLY</div>
                <div style={{ fontSize: 11, color: "var(--text-3)", fontFamily: "var(--font-mono)" }}>the community is growing ↑</div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Categories grid ──────────── */}
        <section style={{ padding: "80px 0", background: "var(--surface)" }}>
          <div className="page">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
              <div>
                <div className="chip" style={{ marginBottom: 14 }}>Categories</div>
                <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(26px,4vw,38px)", fontWeight: 700, color: "var(--text-1)", letterSpacing: "-0.02em" }}>
                  Find your use case
                </h2>
              </div>
              <Link href="/categories" style={{ fontSize: 13, color: "var(--primary)", textDecoration: "none", fontWeight: 500, display: "flex", alignItems: "center", gap: 5 }}>
                View all <ArrowRight size={14} />
              </Link>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 14 }}>
              {CATEGORIES.map((cat) => {
                const Icon = ICON_MAP[cat.icon];
                return (
                  <Link key={cat.slug} href={`/categories/${cat.slug}`} style={{ textDecoration: "none" }}>
                    <div className="card" style={{ padding: "20px", cursor: "pointer", transition: "all 0.2s" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLElement).style.borderColor = `${cat.color}30`; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "none"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}>
                      <div style={{ width: 38, height: 38, borderRadius: 10, background: `${cat.color}15`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14, border: `1px solid ${cat.color}20` }}>
                        {Icon && <Icon size={18} color={cat.color} strokeWidth={1.75} />}
                      </div>
                      <div style={{ fontWeight: 600, color: "var(--text-1)", fontSize: 15, marginBottom: 4 }}>{cat.name}</div>
                      <div style={{ fontSize: 12, color: "var(--text-3)" }}>{cat.prompts.length} prompts</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── Build from scratch spotlight ────────── */}
        <section style={{ padding: "60px 0", borderTop: "1px solid var(--border)" }}>
          <div className="page">
            <div className="card" style={{ padding: "32px 36px", background: "linear-gradient(135deg, rgba(245,158,11,0.06) 0%, rgba(7,7,13,0) 60%)", borderColor: "rgba(245,158,11,0.25)", position: "relative", overflow: "hidden" }}>
              {/* Background glow */}
              <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, background: "radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

              <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 24, alignItems: "center" }} className="lg-2col">
                <div>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.3)", borderRadius: 100, padding: "4px 12px", marginBottom: 16 }}>
                    <Layers size={11} color="#f59e0b" />
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", color: "#f59e0b" }}>NEW CATEGORY</span>
                  </div>
                  <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(20px,3vw,32px)", fontWeight: 700, color: "var(--text-1)", letterSpacing: "-0.02em", marginBottom: 10, lineHeight: 1.2 }}>
                    Build any app from A to Z.
                  </h2>
                  <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.75, maxWidth: 560, marginBottom: 20 }}>
                    10 sequential prompts that walk you through every decision: stack selection, system architecture, authentication, database + where to host it, backend API, security hardening, hosting comparison, CI/CD pipeline, and a week-by-week launch roadmap. Works for SaaS, marketplaces, APIs, and internal tools.
                  </p>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {["Stack selection", "Auth & security", "DB + hosting", "CI/CD", "Launch checklist"].map(tag => (
                      <span key={tag} style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "#f59e0b", background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 4, padding: "3px 8px" }}>{tag}</span>
                    ))}
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, minWidth: 160 }}>
                  <Link href="/categories/build-from-scratch" className="btn btn-primary" style={{ fontSize: 13, padding: "10px 20px", background: "#d97706", boxShadow: "0 0 20px rgba(245,158,11,0.2)", justifyContent: "center" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#f59e0b"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(245,158,11,0.4)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#d97706"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(245,158,11,0.2)"; }}
                  >
                    <Layers size={14} /> Explore category <ArrowRight size={14} />
                  </Link>
                  <div style={{ textAlign: "center", fontSize: 11, color: "var(--text-4)", fontFamily: "var(--font-mono)" }}>3 free · 7 premium prompts</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Token savings section ────────── */}
        <section style={{ padding: "80px 0" }}>
          <div className="page">
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <div className="chip" style={{ marginBottom: 16 }}>
                <TrendingDown size={11} /> Token Efficiency
              </div>
              <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(26px,4vw,44px)", fontWeight: 700, color: "var(--text-1)", letterSpacing: "-0.03em", marginBottom: 14, lineHeight: 1.1 }}>
                Stop burning tokens<br />on bad prompts.
              </h2>
              <p style={{ fontSize: 16, color: "var(--text-2)", maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>
                A vague prompt triggers 6–8 back-and-forths. A PROMITLY prompt gets the answer in one shot. That&apos;s real money and real time saved.
              </p>
            </div>

            {/* Comparison */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 48 }} className="lg-2col">
              {/* Bad */}
              <div className="card" style={{ padding: "22px", borderColor: "rgba(251,113,133,0.25)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--rose)" }} />
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", color: "var(--rose)" }}>WHAT MOST PEOPLE DO</span>
                </div>
                <div style={{ background: "#0b0b16", borderRadius: 8, padding: "12px 14px", marginBottom: 14, fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-3)", lineHeight: 1.7 }}>
                  {`"write me a login function"`}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {[
                    "→ AI asks: what language?",
                    "→ AI asks: what output format?",
                    "→ AI asks: error handling needed?",
                    "→ You get wrong result anyway",
                    "→ 6 replies to get what you wanted",
                  ].map(l => (
                    <div key={l} style={{ fontSize: 12, color: "var(--text-3)", fontFamily: "var(--font-mono)" }}>{l}</div>
                  ))}
                </div>
                <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid var(--border)", display: "flex", gap: 20 }}>
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: "var(--rose)", fontFamily: "var(--font-sans)" }}>~$0.24</div>
                    <div style={{ fontSize: 10, color: "var(--text-4)", fontFamily: "var(--font-mono)" }}>API cost per task</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: "var(--rose)", fontFamily: "var(--font-sans)" }}>12 min</div>
                    <div style={{ fontSize: 10, color: "var(--text-4)", fontFamily: "var(--font-mono)" }}>average time wasted</div>
                  </div>
                </div>
              </div>

              {/* Good */}
              <div className="card" style={{ padding: "22px", borderColor: "rgba(52,211,153,0.3)", boxShadow: "0 0 30px rgba(52,211,153,0.04)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--emerald)" }} />
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", color: "var(--emerald)" }}>PROMITLY PROMPT</span>
                </div>
                <div style={{ background: "#0b0b16", borderRadius: 8, padding: "12px 14px", marginBottom: 14, fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-2)", lineHeight: 1.8 }}>
                  {`You are a Node.js expert. Write JWT auth middleware for Express. Input: Bearer token header. Output: { user, role } or throw 401 with reason. TypeScript. No comments.`}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {[
                    "✓ Role defined — AI knows exactly who it is",
                    "✓ Input/output specified — no guessing",
                    "✓ Constraints set — TypeScript, no padding",
                    "✓ Works on the first reply",
                  ].map(l => (
                    <div key={l} style={{ fontSize: 12, color: "var(--text-2)", fontFamily: "var(--font-mono)" }}>{l}</div>
                  ))}
                </div>
                <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid rgba(52,211,153,0.15)", display: "flex", gap: 20 }}>
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: "var(--emerald)", fontFamily: "var(--font-sans)" }}>~$0.02</div>
                    <div style={{ fontSize: 10, color: "var(--text-4)", fontFamily: "var(--font-mono)" }}>API cost per task</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: "var(--emerald)", fontFamily: "var(--font-sans)" }}>45 sec</div>
                    <div style={{ fontSize: 10, color: "var(--text-4)", fontFamily: "var(--font-mono)" }}>total time taken</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 40 }}>
              {[
                { icon: <TrendingDown size={18} color="var(--primary)" />, stat: "80%", label: "fewer tokens used", sub: "vs unstructured prompts" },
                { icon: <ZapIcon size={18} color="var(--primary)" />, stat: "1 shot", label: "average to final output", sub: "with a PROMITLY prompt" },
                { icon: <CheckCircle2 size={18} color="var(--primary)" />, stat: "130+", label: "prompts available", sub: "across 12 categories" },
              ].map(({ icon, stat, label, sub }) => (
                <div key={label} className="card" style={{ padding: "20px", textAlign: "center" }}>
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>{icon}</div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: "var(--text-1)", fontFamily: "var(--font-sans)", letterSpacing: "-0.03em" }}>{stat}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-2)", marginBottom: 2 }}>{label}</div>
                  <div style={{ fontSize: 11, color: "var(--text-4)", fontFamily: "var(--font-mono)" }}>{sub}</div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: "center" }}>
              <Link href="/categories/ai-tools" className="btn btn-primary" style={{ fontSize: 14, padding: "11px 26px" }}>
                <Cpu size={15} /> Browse Token-Efficient Prompts
              </Link>
            </div>
          </div>
        </section>

        {/* ─── Feature highlight ────────── */}
        <section style={{ padding: "80px 0", background: "var(--surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
          <div className="page">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }} className="lg-2col">
              <div>
                <div className="chip" style={{ marginBottom: 20 }}>{user ? "You're all set" : "Why sign up?"}</div>
                <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(26px,4vw,40px)", fontWeight: 700, color: "var(--text-1)", letterSpacing: "-0.02em", marginBottom: 20, lineHeight: 1.2 }}>
                  {user ? <>All prompts<br />unlocked for you.</> : <>Free to browse.<br />Powerful when you sign up.</>}
                </h2>
                <p style={{ fontSize: 15, lineHeight: 1.75, color: "var(--text-2)", marginBottom: 28 }}>
                  {user
                    ? "You have full access to all 130+ prompts. Copy any prompt, save your favourites, and use them with any AI model."
                    : "Anyone can see what a prompt does. But only signed-up users can copy the full prompt, save their favourites, and unlock the premium library."}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {(user ? [
                    ["Copy in one click", "Paste into any AI — ChatGPT, Claude, Gemini, Grok, Mistral, Llama, DeepSeek, Perplexity, Copilot, and more"],
                    ["All 130+ prompts unlocked", "Every premium prompt is fully visible and copyable — no paywalls"],
                    ["Save your favourites", "Bookmark prompts and access your personal library from anywhere"],
                    ["Token-efficient prompts", "Use our AI & Token Efficiency category to cut your API costs by 80%"],
                  ] : [
                    ["Copy in one click", "Paste into any AI — ChatGPT, Claude, Gemini, Grok, Mistral, Llama, DeepSeek, Perplexity, Copilot, and more"],
                    ["Unlock the premium library", "110+ prompts including the structured, token-efficient ones that actually work"],
                    ["Save your favourites", "Bookmark prompts and access your personal library from anywhere"],
                    ["It's completely free", "No credit card. No trial. No catch — we're growing the user count, not billing you."],
                  ]).map(([title, desc]) => (
                    <div key={title} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <CheckCircle2 size={16} color="var(--emerald)" style={{ flexShrink: 0, marginTop: 2 }} />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 14, color: "var(--text-1)", marginBottom: 2 }}>{title}</div>
                        <div style={{ fontSize: 13, color: "var(--text-3)" }}>{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prompt preview card — unlocked for signed-in users */}
              <div style={{ position: "relative" }}>
                <div className="card" style={{ padding: "22px", position: "relative", paddingBottom: !authLoading && user ? 22 : 80 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", color: "var(--text-3)" }}>PREMIUM PROMPT</span>
                    {!authLoading && user ? (
                      <div style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.2)", borderRadius: 100, padding: "3px 10px" }}>
                        <CheckCircle2 size={10} color="var(--emerald)" />
                        <span style={{ fontSize: 10, color: "var(--emerald)", fontFamily: "var(--font-mono)" }}>UNLOCKED</span>
                      </div>
                    ) : (
                      <div style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(251,113,133,0.1)", border: "1px solid rgba(251,113,133,0.2)", borderRadius: 100, padding: "3px 10px" }}>
                        <Lock size={10} color="var(--rose)" />
                        <span style={{ fontSize: 10, color: "var(--rose)", fontFamily: "var(--font-mono)" }}>LOCKED</span>
                      </div>
                    )}
                  </div>
                  <div style={{ fontWeight: 600, color: "var(--text-1)", fontSize: 15, marginBottom: 4 }}>Audit & Slash Your Prompt Tokens</div>
                  <div style={{ fontSize: 12, color: "var(--text-3)", marginBottom: 14 }}>Cut any prompt by 50%+ without losing output quality</div>
                  <div style={{
                    background: "#0b0b16", borderRadius: 8, padding: "12px 14px",
                    filter: (!authLoading && user) ? "none" : "blur(4px)",
                    userSelect: (!authLoading && user) ? "auto" : "none",
                    transition: "filter 0.3s",
                  }}>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-2)", lineHeight: 1.7 }}>
                      Audit this prompt and rewrite it to use the fewest tokens possible. Analyse each section: what does the model already know? Where are 20 words replacing 4? Remove all filler. Output only the rewritten prompt.
                    </div>
                  </div>
                  {!authLoading && user ? (
                    <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                      <Link href="/categories/ai-tools" className="btn btn-primary" style={{ flex: 1, justifyContent: "center", fontSize: 13 }}>
                        Browse all prompts <ArrowRight size={13} />
                      </Link>
                      <Link href="/saved" className="btn btn-ghost btn-sm" style={{ padding: "7px 12px" }}>
                        <BookmarkCheck size={14} color="var(--primary)" />
                      </Link>
                    </div>
                  ) : (
                    <div style={{ position: "absolute", bottom: 20, left: 22, right: 22 }}>
                      <Link href="/auth/signup" className="btn btn-primary" style={{ width: "100%", justifyContent: "center", fontSize: 13 }}>
                        Sign up free to unlock <Lock size={13} />
                      </Link>
                    </div>
                  )}
                </div>
                <div style={{ position: "absolute", inset: -20, background: "radial-gradient(circle at 50% 50%, rgba(99,102,241,0.06), transparent 70%)", borderRadius: 20, zIndex: -1 }} />
              </div>
            </div>
          </div>
        </section>

        {/* ─── CTA bar ──────────────────── */}
        <section style={{ padding: "80px 0", background: "var(--surface)", borderTop: "1px solid var(--border)" }}>
          <div className="page" style={{ textAlign: "center" }}>
            <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(26px,4vw,42px)", fontWeight: 700, color: "var(--text-1)", letterSpacing: "-0.02em", marginBottom: 14 }}>
              {user ? "Keep exploring." : "Start using better prompts today."}
            </h2>
            <p style={{ fontSize: 15, color: "var(--text-2)", marginBottom: 32, maxWidth: 400, margin: "0 auto 32px" }}>
              {user ? "All 130+ prompts are unlocked. Browse every category and copy what you need." : "Free to browse. Sign up to save, copy, and unlock all prompts."}
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/categories" className="btn btn-primary" style={{ fontSize: 15, padding: "11px 26px" }}>
                Browse Prompts <ArrowRight size={15} />
              </Link>
              {!user && (
                <Link href="/auth/signup" className="btn btn-ghost" style={{ fontSize: 15, padding: "11px 26px" }}>
                  Create free account
                </Link>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer style={{ background: "var(--bg)", borderTop: "1px solid var(--border)", padding: "32px 0" }}>
        <div className="page" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 700, color: "var(--text-2)" }}>promitly</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-4)" }}>© 2026 PROMITLY · All rights reserved</span>
          <div style={{ display: "flex", gap: 16 }}>
            {[["Privacy", "/privacy"], ["Terms", "/terms"], ["Contact", "/contact"]].map(([l, h]) => (
              <Link key={l} href={h} style={{ fontSize: 12, color: "var(--text-3)", textDecoration: "none" }}>{l}</Link>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
