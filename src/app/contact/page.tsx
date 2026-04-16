"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Mail, MessageSquare, ShieldCheck, Trash2, CheckCircle2 } from "lucide-react";

const SUPPORT_EMAIL = "support@promitly.com";
const PRIVACY_EMAIL = "privacy@promitly.com";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "general", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    // Opens email client with pre-filled content as fallback
    const subject = encodeURIComponent(`[${form.subject.toUpperCase()}] ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nSubject: ${form.subject}\n\n${form.message}`);
    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
    setLoading(false);
    setSent(true);
  };

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", paddingTop: 80 }}>
        <section style={{ padding: "60px 0 100px" }}>
          <div className="page" style={{ maxWidth: 680 }}>

            <div style={{ marginBottom: 48 }}>
              <div className="chip" style={{ marginBottom: 16 }}>Get in touch</div>
              <h1 style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(26px,4vw,40px)", fontWeight: 700, color: "var(--text-1)", letterSpacing: "-0.02em", marginBottom: 12 }}>
                Contact us
              </h1>
              <p style={{ fontSize: 15, color: "var(--text-2)", lineHeight: 1.7 }}>
                We read every message. Typical response time is 1–2 business days.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 36 }}>
              {[
                { icon: <Mail size={16} color="var(--primary)" />, label: "General support", value: SUPPORT_EMAIL, href: `mailto:${SUPPORT_EMAIL}` },
                { icon: <ShieldCheck size={16} color="var(--primary)" />, label: "Privacy & data requests", value: PRIVACY_EMAIL, href: `mailto:${PRIVACY_EMAIL}` },
                { icon: <Trash2 size={16} color="var(--rose)" />, label: "Delete your account", value: "Account → Delete account", href: "/account" },
                { icon: <MessageSquare size={16} color="var(--primary)" />, label: "Response time", value: "1–2 business days", href: null },
              ].map(({ icon, label, value, href }) => (
                <div key={label} className="card" style={{ padding: "16px 18px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    {icon}
                    <span style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--text-4)", letterSpacing: "0.06em" }}>{label.toUpperCase()}</span>
                  </div>
                  {href ? (
                    <Link href={href} style={{ fontSize: 13, color: "var(--primary)", textDecoration: "none", wordBreak: "break-all" }}>{value}</Link>
                  ) : (
                    <span style={{ fontSize: 13, color: "var(--text-2)" }}>{value}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Contact form */}
            <div className="card" style={{ padding: "28px" }}>
              {sent ? (
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                  <CheckCircle2 size={36} color="var(--emerald)" style={{ marginBottom: 14 }} />
                  <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 18, color: "var(--text-1)", marginBottom: 8 }}>Opening your email app…</h2>
                  <p style={{ fontSize: 13, color: "var(--text-3)", lineHeight: 1.6 }}>
                    If it didn&apos;t open, email us directly at{" "}
                    <a href={`mailto:${SUPPORT_EMAIL}`} style={{ color: "var(--primary)" }}>{SUPPORT_EMAIL}</a>
                  </p>
                  <button onClick={() => setSent(false)} style={{ marginTop: 20, background: "none", border: "none", cursor: "pointer", color: "var(--text-3)", fontSize: 13 }}>
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 16, color: "var(--text-1)", marginBottom: 4 }}>Send a message</h2>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div>
                      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--text-2)", marginBottom: 6 }}>Your name</label>
                      <input className="input" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--text-2)", marginBottom: 6 }}>Your email</label>
                      <input className="input" type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--text-2)", marginBottom: 6 }}>Subject</label>
                    <select
                      className="input"
                      value={form.subject}
                      onChange={e => setForm({ ...form, subject: e.target.value })}
                      style={{ cursor: "pointer" }}
                    >
                      <option value="general">General question</option>
                      <option value="bug">Bug report</option>
                      <option value="privacy">Privacy / data request</option>
                      <option value="account">Account issue</option>
                      <option value="deletion">Request account deletion</option>
                      <option value="legal">Legal enquiry</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--text-2)", marginBottom: 6 }}>Message</label>
                    <textarea
                      className="input"
                      placeholder="Tell us what's on your mind…"
                      rows={5}
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      style={{ resize: "vertical", minHeight: 120 }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !form.name || !form.email || !form.message}
                    className="btn btn-primary"
                    style={{ justifyContent: "center", opacity: (!form.name || !form.email || !form.message) ? 0.5 : 1 }}
                  >
                    {loading ? "Opening email…" : "Send message"}
                  </button>

                  <p style={{ fontSize: 11, color: "var(--text-4)", textAlign: "center", lineHeight: 1.6 }}>
                    Clicking "Send message" will open your email client with your message pre-filled.
                    Alternatively email us directly at <a href={`mailto:${SUPPORT_EMAIL}`} style={{ color: "var(--text-3)" }}>{SUPPORT_EMAIL}</a>.
                  </p>
                </form>
              )}
            </div>

            {/* GDPR note */}
            <div style={{ marginTop: 24, padding: "16px 20px", background: "rgba(99,102,241,0.05)", border: "1px solid rgba(99,102,241,0.15)", borderRadius: 10 }}>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <ShieldCheck size={15} color="var(--primary)" style={{ flexShrink: 0, marginTop: 2 }} />
                <p style={{ fontSize: 12, color: "var(--text-3)", lineHeight: 1.7 }}>
                  <strong style={{ color: "var(--text-2)" }}>Your data rights:</strong> Under GDPR, you can request access to, correction of, or deletion of your personal data at any time. To delete your account instantly, go to{" "}
                  <Link href="/account" style={{ color: "var(--primary)" }}>Account → Delete account</Link>.
                  For all other data requests, email <a href={`mailto:${PRIVACY_EMAIL}`} style={{ color: "var(--primary)" }}>{PRIVACY_EMAIL}</a>. We respond within 30 days as required by law.
                </p>
              </div>
            </div>

          </div>
        </section>
      </main>

      <footer style={{ background: "var(--bg)", borderTop: "1px solid var(--border)", padding: "32px 0" }}>
        <div className="page" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <Link href="/" style={{ fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 700, color: "var(--text-2)", textDecoration: "none" }}>promitly</Link>
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
