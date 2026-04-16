"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import { deleteAccount } from "@/lib/supabase";
import { User, Trash2, LogOut, ShieldCheck, AlertTriangle, X } from "lucide-react";
import { signOut } from "@/lib/supabase";

export default function AccountPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    if (!loading && !user) router.replace("/auth/login");
  }, [user, loading, router]);

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  const handleDelete = async () => {
    if (confirmText !== "DELETE") return;
    setDeleting(true);
    setDeleteError("");
    const { error } = await deleteAccount();
    if (error) {
      setDeleteError(error);
      setDeleting(false);
    } else {
      router.push("/");
    }
  };

  if (loading || !user) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ color: "var(--text-3)", fontFamily: "var(--font-mono)", fontSize: 12 }}>Loading…</span>
      </div>
    );
  }

  const joinedDate = new Date(user.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", paddingTop: 80 }}>
        <section style={{ padding: "60px 0 80px" }}>
          <div className="page" style={{ maxWidth: 560 }}>
            <div style={{ marginBottom: 36 }}>
              <div className="chip" style={{ marginBottom: 14 }}>Account</div>
              <h1 style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(22px,4vw,32px)", fontWeight: 700, color: "var(--text-1)", letterSpacing: "-0.02em" }}>
                Your account
              </h1>
            </div>

            {/* Profile card */}
            <div className="card" style={{ padding: "24px", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--primary-dim)", border: "1px solid rgba(99,102,241,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <User size={20} color="var(--primary)" />
                </div>
                <div>
                  <div style={{ fontWeight: 600, color: "var(--text-1)", fontSize: 15 }}>
                    {user.user_metadata?.full_name || "PROMITLY User"}
                  </div>
                  <div style={{ fontSize: 13, color: "var(--text-3)" }}>{user.email}</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 24, paddingTop: 16, borderTop: "1px solid var(--border)" }}>
                <div>
                  <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--text-4)", marginBottom: 3 }}>JOINED</div>
                  <div style={{ fontSize: 13, color: "var(--text-2)" }}>{joinedDate}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--text-4)", marginBottom: 3 }}>PLAN</div>
                  <div style={{ fontSize: 13, color: "var(--emerald)", fontWeight: 600 }}>Free — All prompts unlocked</div>
                </div>
              </div>
            </div>

            {/* Quick links */}
            <div className="card" style={{ padding: "20px", marginBottom: 16 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {[
                  { href: "/saved", label: "My saved prompts", icon: <ShieldCheck size={15} color="var(--primary)" /> },
                  { href: "/privacy", label: "Privacy Policy", icon: <ShieldCheck size={15} color="var(--text-3)" /> },
                  { href: "/terms", label: "Terms of Service", icon: <ShieldCheck size={15} color="var(--text-3)" /> },
                  { href: "/contact", label: "Contact support", icon: <ShieldCheck size={15} color="var(--text-3)" /> },
                ].map(({ href, label, icon }, i, arr) => (
                  <Link key={href} href={href} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none", textDecoration: "none" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      {icon}
                      <span style={{ fontSize: 14, color: "var(--text-2)" }}>{label}</span>
                    </div>
                    <span style={{ fontSize: 12, color: "var(--text-4)" }}>→</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Sign out */}
            <div className="card" style={{ padding: "20px", marginBottom: 16 }}>
              <button onClick={handleSignOut} style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer", padding: 0, width: "100%" }}>
                <LogOut size={15} color="var(--text-3)" />
                <span style={{ fontSize: 14, color: "var(--text-2)" }}>Sign out</span>
              </button>
            </div>

            {/* Danger zone */}
            <div className="card" style={{ padding: "20px", borderColor: "rgba(251,113,133,0.2)" }}>
              <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--rose)", letterSpacing: "0.1em", marginBottom: 12 }}>DANGER ZONE</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: "var(--text-1)", marginBottom: 3 }}>Delete account</div>
                  <div style={{ fontSize: 12, color: "var(--text-3)" }}>Permanently removes your account and all saved prompts. Cannot be undone.</div>
                </div>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="btn btn-ghost btn-sm"
                  style={{ color: "var(--rose)", borderColor: "rgba(251,113,133,0.3)", flexShrink: 0 }}
                >
                  <Trash2 size={13} /> Delete account
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Delete confirmation modal */}
      {showDeleteModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(7,7,13,0.85)", backdropFilter: "blur(8px)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div className="card" style={{ width: "100%", maxWidth: 420, padding: "28px", position: "relative" }}>
            <button onClick={() => { setShowDeleteModal(false); setConfirmText(""); setDeleteError(""); }} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", cursor: "pointer", color: "var(--text-3)" }}>
              <X size={18} />
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <AlertTriangle size={20} color="var(--rose)" />
              <span style={{ fontWeight: 700, fontSize: 16, color: "var(--text-1)" }}>Delete your account?</span>
            </div>

            <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.7, marginBottom: 20 }}>
              This will permanently delete your account and all saved prompts. This action <strong style={{ color: "var(--text-1)" }}>cannot be undone</strong>.
            </p>

            <label style={{ display: "block", fontSize: 12, color: "var(--text-3)", marginBottom: 8 }}>
              Type <span style={{ fontFamily: "var(--font-mono)", color: "var(--rose)" }}>DELETE</span> to confirm
            </label>
            <input
              className="input"
              placeholder="DELETE"
              value={confirmText}
              onChange={e => setConfirmText(e.target.value.toUpperCase())}
              style={{ marginBottom: 16 }}
            />

            {deleteError && (
              <div style={{ fontSize: 12, color: "var(--rose)", marginBottom: 12 }}>{deleteError}</div>
            )}

            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => { setShowDeleteModal(false); setConfirmText(""); }} className="btn btn-ghost" style={{ flex: 1, justifyContent: "center" }}>
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={confirmText !== "DELETE" || deleting}
                className="btn"
                style={{ flex: 1, justifyContent: "center", background: confirmText === "DELETE" ? "var(--rose)" : "rgba(251,113,133,0.2)", color: confirmText === "DELETE" ? "#fff" : "var(--text-4)", cursor: confirmText !== "DELETE" ? "not-allowed" : "pointer" }}
              >
                {deleting ? "Deleting…" : "Delete permanently"}
              </button>
            </div>
          </div>
        </div>
      )}

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
