"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import { getSavedPrompts, unsavePrompt } from "@/lib/supabase";
import { CATEGORIES } from "@/data/prompts";
import type { Prompt } from "@/data/prompts";
import { Copy, Check, Bookmark, BookmarkX, ArrowRight } from "lucide-react";

export default function SavedPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [fetched, setFetched] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    getSavedPrompts().then((ids) => {
      setSavedIds(ids);
      setFetched(true);
    });
  }, [user]);

  const allPrompts: Prompt[] = CATEGORIES.flatMap(c => c.prompts);
  const savedPrompts = allPrompts.filter(p => savedIds.includes(p.id));

  const handleCopy = async (id: string, text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleRemove = async (id: string) => {
    await unsavePrompt(id);
    setSavedIds(prev => prev.filter(x => x !== id));
  };

  if (loading || !user) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ color: "var(--text-3)", fontFamily: "var(--font-mono)", fontSize: 12 }}>Loading…</span>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", paddingTop: 80 }}>
        <section style={{ padding: "60px 0 80px" }}>
          <div className="page">
            <div style={{ marginBottom: 40 }}>
              <div className="chip" style={{ marginBottom: 14 }}>My Library</div>
              <h1 style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(24px,4vw,36px)", fontWeight: 700, color: "var(--text-1)", letterSpacing: "-0.02em", marginBottom: 8 }}>
                Saved prompts
              </h1>
              <p style={{ fontSize: 14, color: "var(--text-3)" }}>
                {fetched ? (savedPrompts.length === 0 ? "You haven't saved any prompts yet." : `${savedPrompts.length} saved prompt${savedPrompts.length !== 1 ? "s" : ""}`) : "Loading your collection…"}
              </p>
            </div>

            {fetched && savedPrompts.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 24px" }}>
                <div style={{ width: 60, height: 60, borderRadius: 16, background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                  <Bookmark size={24} color="var(--primary)" strokeWidth={1.5} />
                </div>
                <h2 style={{ fontSize: 18, fontWeight: 600, color: "var(--text-1)", marginBottom: 8 }}>Nothing saved yet</h2>
                <p style={{ fontSize: 13, color: "var(--text-3)", marginBottom: 24 }}>Browse prompts and bookmark your favourites.</p>
                <Link href="/categories" className="btn btn-primary" style={{ fontSize: 14 }}>
                  Browse prompts <ArrowRight size={14} />
                </Link>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 16 }}>
                {savedPrompts.map((prompt) => (
                  <div key={prompt.id} className="card" style={{ padding: "20px", display: "flex", flexDirection: "column" }}>
                    <div style={{ fontWeight: 600, fontSize: 15, color: "var(--text-1)", marginBottom: 4 }}>{prompt.title}</div>
                    <div style={{ fontSize: 12, color: "var(--text-3)", marginBottom: 14 }}>{prompt.description}</div>
                    <div style={{ background: "#0b0b16", borderRadius: 8, padding: "12px 14px", fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-2)", lineHeight: 1.75, whiteSpace: "pre-wrap", maxHeight: 160, overflow: "hidden", flex: 1 }}>
                      {prompt.prompt}
                    </div>
                    <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                      <button
                        onClick={() => handleCopy(prompt.id, prompt.prompt)}
                        className="btn btn-ghost btn-sm"
                        style={{ flex: 1, justifyContent: "center" }}
                      >
                        {copied === prompt.id
                          ? <><Check size={13} color="var(--emerald)" /><span style={{ color: "var(--emerald)" }}>Copied!</span></>
                          : <><Copy size={13} />Copy</>
                        }
                      </button>
                      <button
                        onClick={() => handleRemove(prompt.id)}
                        className="btn btn-ghost btn-sm"
                        style={{ padding: "7px 12px", color: "var(--rose)" }}
                        title="Remove from saved"
                      >
                        <BookmarkX size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
