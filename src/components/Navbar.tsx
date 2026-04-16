"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, UserCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { signOut } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  const linkStyle = (href: string): React.CSSProperties => ({
    fontFamily: "var(--font-sans)",
    fontSize: 14,
    fontWeight: 500,
    color: pathname === href ? "var(--primary)" : "var(--text-2)",
    textDecoration: "none",
    padding: "6px 12px",
    borderRadius: 6,
    transition: "color 0.15s, background 0.15s",
  });

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(7,7,13,0.9)" : "transparent",
      borderBottom: scrolled ? "1px solid #1c1c2e" : "1px solid transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      transition: "all 0.3s",
    }}>
      <div className="page" style={{ height: 58, display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <span style={{
            fontFamily: "var(--font-sans)",
            fontSize: 20,
            fontWeight: 900,
            letterSpacing: "-0.04em",
            background: "linear-gradient(135deg, #fff 0%, var(--primary) 60%, var(--violet) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            promitly
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Link href="/categories" style={linkStyle("/categories")}
            onMouseEnter={e => { (e.target as HTMLElement).style.color = "var(--text-1)"; (e.target as HTMLElement).style.background = "rgba(255,255,255,0.05)"; }}
            onMouseLeave={e => { (e.target as HTMLElement).style.color = pathname === "/categories" ? "var(--primary)" : "var(--text-2)"; (e.target as HTMLElement).style.background = "transparent"; }}
          >Browse</Link>
          {user && (
            <Link href="/saved" style={linkStyle("/saved")}
              onMouseEnter={e => { (e.target as HTMLElement).style.color = "var(--text-1)"; (e.target as HTMLElement).style.background = "rgba(255,255,255,0.05)"; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.color = pathname === "/saved" ? "var(--primary)" : "var(--text-2)"; (e.target as HTMLElement).style.background = "transparent"; }}
            >Saved</Link>
          )}
        </div>

        {/* Auth */}
        <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {user ? (
            <>
              <Link href="/account" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--text-3)", textDecoration: "none", maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--text-1)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--text-3)")}
              >
                <UserCircle size={15} />
                <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.email}</span>
              </Link>
              <button onClick={handleSignOut} className="btn btn-ghost btn-sm">Sign out</button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="btn btn-ghost btn-sm">Sign in</Link>
              <Link href="/auth/signup" className="btn btn-primary btn-sm">Sign up free</Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="hide-desktop" onClick={() => setOpen(!open)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-2)", padding: 4 }}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: "rgba(7,7,13,0.98)", borderTop: "1px solid var(--border)", padding: "16px 24px 24px" }}>
          <Link href="/categories" onClick={() => setOpen(false)} style={{ display: "block", padding: "12px 0", color: "var(--text-2)", textDecoration: "none", borderBottom: "1px solid var(--border)", fontSize: 15 }}>Browse Prompts</Link>
          {user ? (
            <>
              <Link href="/saved" onClick={() => setOpen(false)} style={{ display: "block", padding: "12px 0", color: "var(--text-2)", textDecoration: "none", borderBottom: "1px solid var(--border)", fontSize: 15 }}>Saved</Link>
              <Link href="/account" onClick={() => setOpen(false)} style={{ display: "block", padding: "12px 0", color: "var(--text-2)", textDecoration: "none", borderBottom: "1px solid var(--border)", fontSize: 15 }}>Account</Link>
              <button onClick={() => { handleSignOut(); setOpen(false); }} style={{ marginTop: 16, width: "100%" }} className="btn btn-ghost">Sign out</button>
            </>
          ) : (
            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              <Link href="/auth/login" onClick={() => setOpen(false)} className="btn btn-ghost" style={{ flex: 1 }}>Sign in</Link>
              <Link href="/auth/signup" onClick={() => setOpen(false)} className="btn btn-primary" style={{ flex: 1 }}>Sign up</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
