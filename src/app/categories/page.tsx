"use client";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { CATEGORIES } from "@/data/prompts";
import { BookOpen, Code2, Server, PenLine, Share2, Briefcase, Sparkles, FileText, Palette, Search, ArrowRight, Cpu, Layers } from "lucide-react";

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>> = {
  BookOpen, Code2, Server, PenLine, Share2, Briefcase, Sparkles, FileText, Palette, Search, Cpu, Layers,
};

export default function CategoriesPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", paddingTop: 80 }}>
        <section style={{ padding: "60px 0 80px" }}>
          <div className="page">
            {/* Header */}
            <div style={{ marginBottom: 48 }}>
              <div className="chip" style={{ marginBottom: 16 }}>All Categories</div>
              <h1 style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(28px,5vw,48px)", fontWeight: 700, color: "var(--text-1)", letterSpacing: "-0.03em", marginBottom: 14 }}>
                Browse by category
              </h1>
              <p style={{ fontSize: 15, color: "var(--text-2)", maxWidth: 480, lineHeight: 1.7 }}>
                {CATEGORIES.reduce((a, c) => a + c.prompts.length, 0)} expert-crafted prompts across {CATEGORIES.length} categories. Free to browse, sign up to unlock all.
              </p>
            </div>

            {/* Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
              {CATEGORIES.map((cat) => {
                const Icon = ICON_MAP[cat.icon];
                const freeCount = cat.prompts.filter(p => !p.isPremium).length;
                const totalCount = cat.prompts.length;

                return (
                  <Link key={cat.slug} href={`/categories/${cat.slug}`} style={{ textDecoration: "none" }}>
                    <div
                      className="card"
                      style={{ padding: "22px", cursor: "pointer", transition: "all 0.2s", height: "100%" }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                        (e.currentTarget as HTMLElement).style.borderColor = `${cat.color}35`;
                        (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 40px rgba(0,0,0,0.5), 0 0 20px ${cat.color}10`;
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.transform = "none";
                        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                        (e.currentTarget as HTMLElement).style.boxShadow = "";
                      }}
                    >
                      {/* Icon */}
                      <div style={{ width: 44, height: 44, borderRadius: 12, background: `${cat.color}15`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, border: `1px solid ${cat.color}20` }}>
                        {Icon && <Icon size={20} color={cat.color} strokeWidth={1.75} />}
                      </div>

                      {/* Name & description */}
                      <div style={{ fontWeight: 700, color: "var(--text-1)", fontSize: 16, marginBottom: 6 }}>{cat.name}</div>
                      <div style={{ fontSize: 12, color: "var(--text-3)", lineHeight: 1.6, marginBottom: 18 }}>{cat.description}</div>

                      {/* Footer */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ display: "flex", gap: 10 }}>
                          <span style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--emerald)" }}>{freeCount} free</span>
                          <span style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--text-4)" }}>·</span>
                          <span style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--text-3)" }}>{totalCount} total</span>
                        </div>
                        <ArrowRight size={14} color="var(--text-4)" />
                      </div>
                    </div>
                  </Link>
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
