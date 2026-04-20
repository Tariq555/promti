"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Counter from "@/components/Counter";
import ElectricBorder from "@/components/ElectricBorder";
import LiquidEther from "@/components/LiquidEther";
import PromptGenerator from "@/components/PromptGenerator";
import ASCIIText from "@/components/ASCIIText";
import { getLiveUserCount } from "@/lib/supabase";
import { CATEGORIES } from "@/data/prompts";
import { BookOpen, Code2, Server, PenLine, Share2, Briefcase, Sparkles, FileText, Palette, Search, ArrowRight, Lock, Cpu, Layers, Zap as ZapIcon, TrendingDown, CheckCircle2, BookmarkCheck, ChevronDown } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>> = {
  BookOpen, Code2, Server, PenLine, Share2, Briefcase, Sparkles, FileText, Palette, Search, Cpu, Layers,
};

export default function Home() {
  const { user, loading: authLoading } = useAuth();
  const [count, setCount] = useState(6086);

  useEffect(() => {
    const t = setTimeout(() => setCount(getLiveUserCount()), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Navbar />
      <main style={{ position: "relative", zIndex: 2 }}>

        {/* ═══ HERO ══════════════════════════════════════ */}
        <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>

          {/* LiquidEther background */}
          <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
            <LiquidEther
              colors={["#00e5c8", "#00a8ff", "#00ff88", "#ff6b35"]}
              mouseForce={22}
              cursorSize={110}
              resolution={0.5}
              autoDemo={true}
              autoSpeed={0.35}
              autoIntensity={2.2}
              autoResumeDelay={2000}
              autoRampDuration={0.8}
            />
          </div>

          {/* Radial vignette */}
          <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(2,2,9,0.2) 0%, rgba(2,2,9,0.65) 55%, rgba(2,2,9,0.95) 100%)" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 200, zIndex: 1, background: "linear-gradient(to bottom, transparent, var(--bg))" }} />

          {/* Hero content */}
          <div className="page" style={{ position: "relative", zIndex: 2, width: "100%", paddingTop: 140, paddingBottom: 80 }}>

            {/* Status badge */}
            <div className="anim-up d1" style={{ marginBottom: 20, display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em", color: "var(--primary)", background: "rgba(0,229,200,0.06)", border: "1px solid rgba(0,229,200,0.2)", padding: "4px 12px", borderRadius: 2, display: "inline-flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--primary)", boxShadow: "0 0 8px var(--primary)", animation: "pulse 2s ease-in-out infinite", display: "inline-block" }} />
                SYSTEM ONLINE · PROMPT ENGINE
              </span>
            </div>

            {/* ASCII Logo */}
            <div className="anim-up d2" style={{ position: "relative", height: "clamp(120px, 18vw, 200px)", width: "100%", maxWidth: 860, marginBottom: 28 }}>
              <ASCIIText text="PROMITLY" asciiFontSize={7} textFontSize={180} planeBaseHeight={7} textColor="#00e5c8" enableWaves={true} />
            </div>

            {/* Headline */}
            <h1 className="anim-up d2" style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(18px,2.5vw,28px)", fontWeight: 400, lineHeight: 1.5, color: "var(--text-2)", marginBottom: 32, maxWidth: 520 }}>
              Describe your idea. Pick your AI.{" "}
              <span style={{ color: "var(--text-1)", fontWeight: 600 }}>
                Get a production-ready prompt in seconds.
              </span>
            </h1>

            {/* Sub */}
            <p className="anim-up d3" style={{ fontSize: 17, lineHeight: 1.75, color: "var(--text-2)", maxWidth: 500, marginBottom: 40, fontFamily: "var(--font-sans)" }}>
              Describe your idea. Choose your AI. Get a production-ready prompt engineered for that model — in seconds. Plus 130+ expert prompts ready to copy.
            </p>

            {/* CTAs */}
            <div className="anim-up d4" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 56, alignItems: "center" }}>
              <a href="#generator" className="btn btn-accent" style={{ fontSize: 11, padding: "14px 32px" }}>
                <Sparkles size={14} /> Try the Generator <ArrowRight size={14} />
              </a>
              <Link href="/categories" className="btn btn-ghost" style={{ fontSize: 11, padding: "13px 28px" }}>
                Browse Prompts
              </Link>
            </div>

            {/* Counter */}
            <div className="anim-up d5">
              <ElectricBorder color="#00e5c8" speed={0.7} chaos={0.09} borderRadius={4} style={{ display: "inline-flex" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap", padding: "16px 26px", background: "rgba(2,2,9,0.65)", backdropFilter: "blur(20px)", borderRadius: 4 }}>
                  <Counter value={count} places={[1000,100,10,1]} fontSize={38} padding={4} gap={2} textColor="var(--text-1)" fontWeight={700} gradientFrom="rgba(2,2,9,0.65)" counterStyle={{ fontFamily: "var(--font-display)" }} />
                  <div>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: 11, fontWeight: 600, color: "var(--text-2)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Users on Promitly</div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-3)", marginTop: 2 }}>the community is growing ↑</div>
                  </div>
                </div>
              </ElectricBorder>
            </div>
          </div>

          {/* Scroll hint */}
          <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, animation: "float 2.5s ease-in-out infinite" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em", color: "var(--text-3)" }}>SCROLL</span>
            <ChevronDown size={14} color="var(--text-3)" />
          </div>
        </section>

        {/* ═══ PROMPT GENERATOR SECTION ══════════════════ */}
        <section id="generator" style={{ padding: "100px 0", background: "var(--bg)", position: "relative" }}>
          {/* Background glow */}
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 400, background: "radial-gradient(ellipse, rgba(0,229,200,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />

          <div className="page" style={{ position: "relative" }}>
            {/* Section header */}
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em", color: "var(--primary)", marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                <div style={{ height: 1, width: 40, background: "var(--primary)", opacity: 0.4 }} />
                // CORE FEATURE
                <div style={{ height: 1, width: 40, background: "var(--primary)", opacity: 0.4 }} />
              </div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px,4vw,48px)", fontWeight: 800, color: "var(--text-1)", letterSpacing: "0.02em", textTransform: "uppercase", marginBottom: 14, lineHeight: 1.1 }}>
                AI Prompt{" "}
                <span style={{ color: "var(--primary)" }}>Generator</span>
              </h2>
              <p style={{ fontSize: 15, color: "var(--text-2)", maxWidth: 500, margin: "0 auto", lineHeight: 1.7 }}>
                Describe any idea. We engineer the optimal prompt for your chosen AI — tuned to its specific strengths, capabilities, and response patterns.
              </p>
            </div>

            {/* Generator — max width centered */}
            <div style={{ maxWidth: 720, margin: "0 auto" }}>
              <PromptGenerator />
            </div>

            {/* Below generator note */}
            <div style={{ textAlign: "center", marginTop: 24 }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-3)" }}>
                Free to use · Sign up required · No AI cost
              </span>
            </div>
          </div>
        </section>

        {/* ═══ CATEGORIES GRID ═══════════════════════════ */}
        <section style={{ padding: "80px 0", background: "var(--surface)", borderTop: "1px solid var(--border)" }}>
          <div className="page">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em", color: "var(--primary)", marginBottom: 12 }}>// PROMPT LIBRARY</div>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(22px,3.5vw,34px)", fontWeight: 700, color: "var(--text-1)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                  130+ Expert Prompts
                </h2>
              </div>
              <Link href="/categories" style={{ fontSize: 12, color: "var(--primary)", textDecoration: "none", fontFamily: "var(--font-mono)", letterSpacing: "0.1em", display: "flex", alignItems: "center", gap: 5 }}>
                VIEW ALL <ArrowRight size={13} />
              </Link>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
              {CATEGORIES.map((cat) => {
                const Icon = ICON_MAP[cat.icon];
                return (
                  <Link key={cat.slug} href={`/categories/${cat.slug}`} style={{ textDecoration: "none" }}>
                    <div className="card" style={{ padding: "20px", cursor: "pointer" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLElement).style.borderColor = `${cat.color}40`; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "none"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}>
                      <div style={{ width: 36, height: 36, borderRadius: 2, background: `${cat.color}10`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14, border: `1px solid ${cat.color}20` }}>
                        {Icon && <Icon size={17} color={cat.color} strokeWidth={1.75} />}
                      </div>
                      <div style={{ fontWeight: 600, color: "var(--text-1)", fontSize: 14, marginBottom: 4, fontFamily: "var(--font-sans)" }}>{cat.name}</div>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-3)", letterSpacing: "0.08em" }}>{cat.prompts.length} prompts</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══ BUILD FROM SCRATCH ════════════════════════ */}
        <section style={{ padding: "60px 0", borderTop: "1px solid var(--border)" }}>
          <div className="page">
            <div className="card" style={{ padding: "32px 36px", background: "linear-gradient(135deg, rgba(255,184,48,0.05) 0%, transparent 60%)", borderColor: "rgba(255,184,48,0.2)", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, background: "radial-gradient(circle, rgba(255,184,48,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 24, alignItems: "center" }} className="lg-2col">
                <div>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,184,48,0.1)", border: "1px solid rgba(255,184,48,0.25)", borderRadius: 2, padding: "4px 12px", marginBottom: 16 }}>
                    <Layers size={10} color="var(--amber)" />
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.16em", color: "var(--amber)" }}>NEW CATEGORY</span>
                  </div>
                  <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(18px,2.5vw,28px)", fontWeight: 700, color: "var(--text-1)", letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 10, lineHeight: 1.2 }}>
                    Build any app from A to Z.
                  </h2>
                  <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.75, maxWidth: 560, marginBottom: 20 }}>
                    10 sequential prompts covering stack selection, architecture, auth, database, API, security, hosting, CI/CD, and launch roadmap.
                  </p>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {["Stack","Auth","Database","CI/CD","Launch"].map(tag => (
                      <span key={tag} style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--amber)", background: "rgba(255,184,48,0.06)", border: "1px solid rgba(255,184,48,0.18)", borderRadius: 2, padding: "3px 8px", letterSpacing: "0.1em" }}>{tag}</span>
                    ))}
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, minWidth: 160 }}>
                  <Link href="/categories/build-from-scratch" style={{
                    background: "linear-gradient(135deg, #d97706, var(--amber))",
                    color: "#020209", padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                    fontFamily: "var(--font-display)", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em",
                    textTransform: "uppercase", textDecoration: "none",
                    clipPath: "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
                    boxShadow: "0 0 24px rgba(255,184,48,0.3)",
                    transition: "all 0.2s",
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(255,184,48,0.5)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px rgba(255,184,48,0.3)"; (e.currentTarget as HTMLElement).style.transform = "none"; }}
                  >
                    <Layers size={12} /> Explore <ArrowRight size={12} />
                  </Link>
                  <div style={{ textAlign: "center", fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-3)", letterSpacing: "0.1em" }}>3 FREE · 7 PREMIUM</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ STATS ══════════════════════════════════════ */}
        <section style={{ padding: "80px 0" }}>
          <div className="page">
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em", color: "var(--primary)", marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                <div style={{ height: 1, width: 40, background: "var(--primary)", opacity: 0.4 }} />
                // TOKEN EFFICIENCY
                <div style={{ height: 1, width: 40, background: "var(--primary)", opacity: 0.4 }} />
              </div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(22px,4vw,40px)", fontWeight: 800, color: "var(--text-1)", letterSpacing: "0.02em", textTransform: "uppercase", marginBottom: 14, lineHeight: 1.1 }}>
                Stop burning tokens<br />
                <span style={{ color: "var(--primary)" }}>on bad prompts.</span>
              </h2>
              <p style={{ fontSize: 15, color: "var(--text-2)", maxWidth: 460, margin: "0 auto", lineHeight: 1.7 }}>
                A vague prompt triggers 6–8 back-and-forths. A PROMITLY prompt gets the answer in one shot.
              </p>
            </div>

            {/* Comparison */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 48 }} className="lg-2col">
              <div className="card" style={{ padding: "24px", borderColor: "rgba(255,64,96,0.2)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--rose)" }} />
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.16em", color: "var(--rose)" }}>WHAT MOST PEOPLE DO</span>
                </div>
                <div style={{ background: "rgba(2,2,9,0.8)", borderRadius: 2, padding: "12px 14px", marginBottom: 14, fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-3)", lineHeight: 1.7, border: "1px solid var(--border)" }}>
                  {`"write me a login function"`}
                </div>
                {["→ AI asks: what language?","→ AI asks: what output format?","→ AI asks: error handling needed?","→ You get wrong result anyway","→ 6 replies to get what you wanted"].map(l => (
                  <div key={l} style={{ fontSize: 11, color: "var(--text-3)", fontFamily: "var(--font-mono)", marginBottom: 6 }}>{l}</div>
                ))}
                <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid var(--border)", display: "flex", gap: 20 }}>
                  <div><div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, color: "var(--rose)" }}>~$0.24</div><div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-4)", letterSpacing: "0.1em" }}>API COST / TASK</div></div>
                  <div><div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, color: "var(--rose)" }}>12 min</div><div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-4)", letterSpacing: "0.1em" }}>TIME WASTED</div></div>
                </div>
              </div>

              <div className="card" style={{ padding: "24px", borderColor: "rgba(0,229,200,0.2)", boxShadow: "0 0 30px rgba(0,229,200,0.04)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--primary)" }} />
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.16em", color: "var(--primary)" }}>PROMITLY PROMPT</span>
                </div>
                <div style={{ background: "rgba(2,2,9,0.8)", borderRadius: 2, padding: "12px 14px", marginBottom: 14, fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-2)", lineHeight: 1.8, border: "1px solid rgba(0,229,200,0.1)" }}>
                  {`You are a Node.js expert. Write JWT auth middleware for Express. Input: Bearer token header. Output: { user, role } or throw 401 with reason. TypeScript. No comments.`}
                </div>
                {["✓ Role defined — AI knows exactly who it is","✓ Input/output specified — no guessing","✓ Constraints set — TypeScript, no padding","✓ Works on the first reply"].map(l => (
                  <div key={l} style={{ fontSize: 11, color: "var(--text-2)", fontFamily: "var(--font-mono)", marginBottom: 6 }}>{l}</div>
                ))}
                <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid rgba(0,229,200,0.1)", display: "flex", gap: 20 }}>
                  <div><div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, color: "var(--primary)" }}>~$0.02</div><div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-4)", letterSpacing: "0.1em" }}>API COST / TASK</div></div>
                  <div><div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, color: "var(--primary)" }}>45 sec</div><div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-4)", letterSpacing: "0.1em" }}>TOTAL TIME</div></div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 40 }}>
              {[
                { icon: <TrendingDown size={18} color="var(--primary)" />, stat: "80%", label: "Fewer tokens used", sub: "vs unstructured prompts" },
                { icon: <ZapIcon size={18} color="var(--primary)" />, stat: "1 shot", label: "Avg to final output", sub: "with a PROMITLY prompt" },
                { icon: <CheckCircle2 size={18} color="var(--primary)" />, stat: "130+", label: "Prompts available", sub: "across 12 categories" },
              ].map(({ icon, stat, label, sub }) => (
                <div key={label} className="card" style={{ padding: "22px", textAlign: "center" }}>
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>{icon}</div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 800, color: "var(--text-1)", letterSpacing: "0.02em" }}>{stat}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-2)", marginBottom: 2, fontFamily: "var(--font-sans)" }}>{label}</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-3)", letterSpacing: "0.1em" }}>{sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ FEATURE UNLOCK ════════════════════════════ */}
        <section style={{ padding: "80px 0", background: "var(--surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
          <div className="page">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }} className="lg-2col">
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em", color: "var(--primary)", marginBottom: 16 }}>{user ? "// STATUS: UNLOCKED" : "// STATUS: FREE TIER"}</div>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(20px,3vw,34px)", fontWeight: 700, color: "var(--text-1)", letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 20, lineHeight: 1.2 }}>
                  {user ? <>All prompts<br /><span style={{ color: "var(--primary)" }}>unlocked.</span></> : <>Free to browse.<br /><span style={{ color: "var(--primary)" }}>Sign up to unlock.</span></>}
                </h2>
                <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--text-2)", marginBottom: 28, fontFamily: "var(--font-sans)" }}>
                  {user ? "Full access to all 130+ prompts. Copy any prompt, save favourites, and use the AI generator." : "Browse for free. Sign up (no credit card) to copy prompts, save favourites, and unlock the generator."}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {(user ? [
                    ["Copy in one click", "Paste into ChatGPT, Claude, Gemini, Grok, Mistral, Llama, DeepSeek, Perplexity"],
                    ["All 130+ prompts", "Every premium prompt fully visible — no paywalls"],
                    ["Save favourites", "Your personal prompt library, accessible anywhere"],
                    ["AI Generator", "Generate custom prompts for any AI model"],
                  ] : [
                    ["Copy in one click", "Paste into any AI — ChatGPT, Claude, Gemini, Grok, Mistral and more"],
                    ["Unlock premium", "110+ premium prompts including token-efficient templates"],
                    ["Save favourites", "Build your personal prompt library"],
                    ["It&apos;s free", "No credit card. No trial. Just sign up and go."],
                  ]).map(([title, desc]) => (
                    <div key={title} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <div style={{ width: 16, height: 16, borderRadius: 2, background: "rgba(0,229,200,0.1)", border: "1px solid rgba(0,229,200,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                        <CheckCircle2 size={10} color="var(--primary)" />
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 13, color: "var(--text-1)", marginBottom: 2, fontFamily: "var(--font-sans)" }}>{title}</div>
                        <div style={{ color: "var(--text-3)", fontFamily: "var(--font-mono)", fontSize: 10 } as React.CSSProperties}>{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preview card */}
              <div style={{ position: "relative" }}>
                <div className="card" style={{ padding: "22px", position: "relative", paddingBottom: !authLoading && user ? 22 : 80 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.16em", color: "var(--text-3)" }}>PREMIUM PROMPT</span>
                    {!authLoading && user ? (
                      <div style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(0,229,200,0.08)", border: "1px solid rgba(0,229,200,0.2)", borderRadius: 2, padding: "3px 10px" }}>
                        <CheckCircle2 size={9} color="var(--primary)" />
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--primary)", letterSpacing: "0.1em" }}>UNLOCKED</span>
                      </div>
                    ) : (
                      <div style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(255,64,96,0.08)", border: "1px solid rgba(255,64,96,0.2)", borderRadius: 2, padding: "3px 10px" }}>
                        <Lock size={9} color="var(--rose)" />
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--rose)", letterSpacing: "0.1em" }}>LOCKED</span>
                      </div>
                    )}
                  </div>
                  <div style={{ fontWeight: 600, color: "var(--text-1)", fontSize: 14, marginBottom: 4, fontFamily: "var(--font-sans)" }}>Audit & Slash Your Prompt Tokens</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-3)", marginBottom: 14, letterSpacing: "0.05em" }}>Cut any prompt by 50%+ without losing output quality</div>
                  <div style={{ background: "rgba(2,2,9,0.9)", borderRadius: 2, padding: "12px 14px", filter: (!authLoading && user) ? "none" : "blur(4px)", userSelect: (!authLoading && user) ? "auto" : "none", transition: "filter 0.3s", border: "1px solid var(--border)" }}>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-2)", lineHeight: 1.75 }}>
                      Audit this prompt and rewrite it to use the fewest tokens possible. Analyse each section: what does the model already know? Where are 20 words replacing 4? Remove all filler. Output only the rewritten prompt.
                    </div>
                  </div>
                  {!authLoading && user ? (
                    <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                      <Link href="/categories/ai-tools" className="btn btn-primary" style={{ flex: 1, justifyContent: "center", fontSize: 10 }}>
                        Browse all <ArrowRight size={12} />
                      </Link>
                      <Link href="/saved" className="btn btn-ghost btn-sm" style={{ padding: "7px 12px" }}>
                        <BookmarkCheck size={13} color="var(--primary)" />
                      </Link>
                    </div>
                  ) : (
                    <div style={{ position: "absolute", bottom: 20, left: 22, right: 22 }}>
                      <Link href="/auth/signup" className="btn btn-accent" style={{ width: "100%", justifyContent: "center", fontSize: 10 }}>
                        Sign up free to unlock <Lock size={12} />
                      </Link>
                    </div>
                  )}
                </div>
                <div style={{ position: "absolute", inset: -20, background: "radial-gradient(circle at 50% 50%, rgba(0,229,200,0.04), transparent 70%)", borderRadius: 20, zIndex: -1 }} />
              </div>
            </div>
          </div>
        </section>

        {/* ═══ CTA BAR ════════════════════════════════════ */}
        <section style={{ padding: "80px 0" }}>
          <div className="page" style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em", color: "var(--primary)", marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
              <div style={{ height: 1, width: 40, background: "var(--primary)", opacity: 0.4 }} />
              // LAUNCH SEQUENCE
              <div style={{ height: 1, width: 40, background: "var(--primary)", opacity: 0.4 }} />
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(22px,4vw,40px)", fontWeight: 800, color: "var(--text-1)", letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 14 }}>
              {user ? "Keep exploring." : "Start writing better prompts."}
            </h2>
            <p style={{ fontSize: 14, color: "var(--text-2)", marginBottom: 36, maxWidth: 380, margin: "0 auto 36px", fontFamily: "var(--font-sans)" }}>
              {user ? "All 130+ prompts are unlocked. Browse every category." : "Free to browse. Sign up to generate, copy, and save."}
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="#generator" className="btn btn-accent" style={{ fontSize: 11, padding: "13px 30px" }}>
                <Sparkles size={13} /> Try Generator <ArrowRight size={13} />
              </a>
              <Link href="/categories" className="btn btn-ghost" style={{ fontSize: 11, padding: "12px 28px" }}>
                Browse Prompts
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* ═══ FOOTER ════════════════════════════════════════ */}
      <footer style={{ background: "var(--surface)", borderTop: "1px solid var(--border)", padding: "32px 0" }}>
        <div className="page" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 800, letterSpacing: "0.12em", background: "linear-gradient(90deg, var(--primary), var(--secondary))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>PROMITLY</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-4)", letterSpacing: "0.14em" }}>© 2026 PROMITLY · ALL RIGHTS RESERVED</span>
          <div style={{ display: "flex", gap: 20 }}>
            {[["Privacy","/privacy"],["Terms","/terms"],["Contact","/contact"]].map(([l,h]) => (
              <Link key={l} href={h} style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-3)", textDecoration: "none", letterSpacing: "0.12em", transition: "color 0.15s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--primary)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--text-3)")}>
                {l.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
