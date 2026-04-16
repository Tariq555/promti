"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import { getCategoryBySlug } from "@/data/prompts";
import { savePrompt, unsavePrompt, getSavedPrompts } from "@/lib/supabase";
import { ArrowLeft, Copy, Check, Lock, Bookmark, BookmarkCheck, Tag } from "lucide-react";

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const category = getCategoryBySlug(slug);

  const [copied, setCopied] = useState<string | null>(null);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [savingId, setSavingId] = useState<string | null>(null);

  useEffect(() => {
    if (!category) {
      router.replace("/categories");
    }
  }, [category, router]);

  useEffect(() => {
    if (!user) return;
    getSavedPrompts().then((ids) => setSavedIds(new Set(ids)));
  }, [user]);

  if (!category) return null;

  const handleCopy = async (promptId: string, text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(promptId);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSave = async (promptId: string) => {
    if (!user) {
      router.push("/auth/signup");
      return;
    }
    setSavingId(promptId);
    if (savedIds.has(promptId)) {
      await unsavePrompt(promptId);
      setSavedIds((prev) => { const s = new Set(prev); s.delete(promptId); return s; });
    } else {
      await savePrompt(promptId);
      setSavedIds((prev) => new Set(prev).add(promptId));
    }
    setSavingId(null);
  };

  const freeCount = category.prompts.filter(p => !p.isPremium).length;
  const lockedCount = category.prompts.filter(p => p.isPremium).length;

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", paddingTop: 80 }}>
        {/* Header */}
        <section style={{ padding: "48px 0 40px", borderBottom: "1px solid var(--border)" }}>
          <div className="page">
            <Link href="/categories" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--text-3)", textDecoration: "none", marginBottom: 20 }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--text-2)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-3)")}
            >
              <ArrowLeft size={14} /> Back to categories
            </Link>

            <div style={{ display: "flex", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: `${category.color}15`, border: `1px solid ${category.color}25`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontSize: 24 }}>
                  {/* Color dot fallback */}
                  <div style={{ width: 20, height: 20, borderRadius: "50%", background: category.color }} />
                </span>
              </div>
              <div>
                <div className="chip" style={{ marginBottom: 10 }}>{category.name}</div>
                <h1 style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(24px,4vw,36px)", fontWeight: 700, color: "var(--text-1)", letterSpacing: "-0.02em", marginBottom: 8 }}>
                  {category.description}
                </h1>
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 13, color: "var(--text-3)" }}>
                    <span style={{ color: "var(--emerald)", fontWeight: 600 }}>{freeCount} free</span> prompts
                  </span>
                  <span style={{ fontSize: 13, color: "var(--text-3)" }}>
                    <span style={{ color: "var(--rose)", fontWeight: 600 }}>{lockedCount} premium</span> prompts
                  </span>
                </div>
              </div>
            </div>

            {/* Sign-up nudge for guests */}
            {!authLoading && !user && lockedCount > 0 && (
              <div style={{ marginTop: 20, background: "rgba(99,102,241,0.07)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 10, padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Lock size={15} color="var(--primary)" />
                  <span style={{ fontSize: 13, color: "var(--text-2)" }}>
                    <strong style={{ color: "var(--text-1)" }}>{lockedCount} prompts</strong> are locked — sign up free to unlock all of them.
                  </span>
                </div>
                <Link href="/auth/signup" className="btn btn-primary btn-sm">Unlock now</Link>
              </div>
            )}
          </div>
        </section>

        {/* Prompts grid */}
        <section style={{ padding: "40px 0 80px" }}>
          <div className="page">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 16 }}>
              {category.prompts.map((prompt) => {
                const isLocked = prompt.isPremium && !user && !authLoading;
                const isSaved = savedIds.has(prompt.id);
                const isCopied = copied === prompt.id;
                const isSaving = savingId === prompt.id;

                return (
                  <div key={prompt.id} className="card" style={{ padding: "20px", position: "relative", display: "flex", flexDirection: "column" }}>
                    {/* Card top */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                      <div style={{ flex: 1, paddingRight: 10 }}>
                        <div style={{ fontWeight: 600, fontSize: 15, color: "var(--text-1)", marginBottom: 4 }}>{prompt.title}</div>
                        <div style={{ fontSize: 12, color: "var(--text-3)", lineHeight: 1.5 }}>{prompt.description}</div>
                      </div>
                      {prompt.isPremium && (
                        <div style={{ display: "flex", alignItems: "center", gap: 4, background: "rgba(251,113,133,0.1)", border: "1px solid rgba(251,113,133,0.2)", borderRadius: 100, padding: "3px 8px", flexShrink: 0 }}>
                          <Lock size={9} color="var(--rose)" />
                          <span style={{ fontSize: 9, color: "var(--rose)", fontFamily: "var(--font-mono)", letterSpacing: "0.1em" }}>PREMIUM</span>
                        </div>
                      )}
                    </div>

                    {/* Tags */}
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
                      {prompt.tags.slice(0, 3).map((tag) => (
                        <span key={tag} style={{ display: "inline-flex", alignItems: "center", gap: 3, fontSize: 10, fontFamily: "var(--font-mono)", color: "var(--text-3)", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)", borderRadius: 4, padding: "2px 7px" }}>
                          <Tag size={8} />
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Prompt text */}
                    <div style={{ position: "relative", flex: 1 }}>
                      <div
                        style={{
                          background: "#0b0b16",
                          borderRadius: 8,
                          padding: "12px 14px",
                          fontFamily: "var(--font-mono)",
                          fontSize: 11,
                          color: "var(--text-2)",
                          lineHeight: 1.75,
                          whiteSpace: "pre-wrap",
                          maxHeight: isLocked ? 90 : 200,
                          overflow: "hidden",
                          filter: isLocked ? "blur(4px)" : "none",
                          userSelect: isLocked ? "none" : "auto",
                          transition: "filter 0.2s",
                        }}
                      >
                        {prompt.prompt}
                      </div>

                      {/* Lock overlay */}
                      {isLocked && (
                        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 10%, rgba(7,7,13,0.97) 60%)", borderRadius: 8, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", padding: 14 }}>
                          <div style={{ textAlign: "center", marginBottom: 10 }}>
                            <Lock size={18} color="var(--primary)" style={{ marginBottom: 6 }} />
                            <div style={{ fontSize: 12, color: "var(--text-2)", marginBottom: 2, fontWeight: 500 }}>Premium prompt</div>
                            <div style={{ fontSize: 11, color: "var(--text-3)" }}>Sign up free to reveal</div>
                          </div>
                          <Link href="/auth/signup" className="btn btn-primary" style={{ fontSize: 12, padding: "8px 18px", width: "100%", justifyContent: "center" }}>
                            Sign up to unlock
                          </Link>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    {!isLocked && (
                      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                        <button
                          onClick={() => handleCopy(prompt.id, prompt.prompt)}
                          className="btn btn-ghost btn-sm"
                          style={{ flex: 1, justifyContent: "center", gap: 6 }}
                        >
                          {isCopied ? (
                            <><Check size={13} color="var(--emerald)" /><span style={{ color: "var(--emerald)" }}>Copied!</span></>
                          ) : (
                            <><Copy size={13} />Copy prompt</>
                          )}
                        </button>
                        <button
                          onClick={() => handleSave(prompt.id)}
                          disabled={isSaving}
                          className="btn btn-ghost btn-sm"
                          style={{ padding: "7px 12px", opacity: isSaving ? 0.6 : 1 }}
                          title={isSaved ? "Remove from saved" : "Save prompt"}
                        >
                          {isSaved
                            ? <BookmarkCheck size={14} color="var(--primary)" />
                            : <Bookmark size={14} />
                          }
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <footer style={{ background: "var(--bg)", borderTop: "1px solid var(--border)", padding: "32px 0" }}>
        <div className="page" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 700, color: "var(--text-2)" }}>promitly</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-4)" }}>© 2026 PROMITLY · All rights reserved</span>
          <div style={{ display: "flex", gap: 16 }}>
            {["Privacy", "Terms", "Contact"].map(l => (
              <a key={l} href="#" style={{ fontSize: 12, color: "var(--text-3)", textDecoration: "none" }}>{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
