"use client";
import { useState, useRef, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { verifyOtp } from "@/lib/supabase";
import { Mail, ArrowRight, RefreshCw } from "lucide-react";

function VerifyForm() {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email") || "";

  const [code, setCode] = useState(["", "", "", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  const handleChange = (i: number, val: string) => {
    const v = val.replace(/\D/g, "").slice(-1);
    const next = [...code];
    next[i] = v;
    setCode(next);
    if (v && i < 5) inputs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[i] && i > 0) {
      inputs.current[i - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 8);
    if (text.length === 8) {
      setCode(text.split(""));
      inputs.current[7]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = code.join("");
    if (token.length < 8) {
      setError("Please enter the full 8-digit code.");
      return;
    }
    setError("");
    setLoading(true);
    const { error: err } = await verifyOtp(email, token);
    setLoading(false);

    if (err) {
      setError(err.message || "Invalid or expired code. Please try again.");
      setCode(["", "", "", "", "", ""]);
      inputs.current[0]?.focus();
    } else {
      router.push("/categories");
    }
  };

  const filled = code.join("").length;

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div style={{ width: "100%", maxWidth: 380 }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <Link href="/" style={{ textDecoration: "none", marginBottom: 24, display: "inline-block" }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 22, fontWeight: 900, letterSpacing: "-0.04em", background: "linear-gradient(135deg, #fff 0%, var(--primary) 60%, var(--violet) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              promitly
            </span>
          </Link>

          <div style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <Mail size={22} color="var(--primary)" />
          </div>
          <h1 style={{ fontFamily: "var(--font-sans)", fontSize: 22, fontWeight: 700, color: "var(--text-1)", marginBottom: 8 }}>Enter your code</h1>
          <p style={{ fontSize: 13, color: "var(--text-3)", lineHeight: 1.6 }}>
            We sent an 8-digit code to<br />
            <span style={{ color: "var(--text-2)", fontWeight: 600 }}>{email || "your email"}</span>
          </p>
        </div>

        {/* Card */}
        <div className="card" style={{ padding: "28px" }}>
          <form onSubmit={handleSubmit}>
            <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "var(--text-3)", marginBottom: 16, letterSpacing: "0.1em", textAlign: "center", textTransform: "uppercase" }}>
              Verification code
            </label>

            {/* 6-digit boxes */}
            <div onPaste={handlePaste} style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 20 }}>
              {code.map((digit, i) => (
                <input
                  key={i}
                  ref={el => { inputs.current[i] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={e => handleChange(i, e.target.value)}
                  onKeyDown={e => handleKeyDown(i, e)}
                  style={{
                    width: 38,
                    height: 50,
                    textAlign: "center",
                    fontSize: 22,
                    fontWeight: 700,
                    fontFamily: "var(--font-mono)",
                    background: "#0b0b16",
                    border: `1.5px solid ${digit ? "var(--primary)" : "var(--border)"}`,
                    borderRadius: 8,
                    color: "var(--text-1)",
                    outline: "none",
                    transition: "border-color 0.15s",
                    caretColor: "transparent",
                  }}
                />
              ))}
            </div>

            {/* Error */}
            {error && (
              <div style={{ background: "rgba(251,113,133,0.1)", border: "1px solid rgba(251,113,133,0.25)", borderRadius: 8, padding: "10px 12px", fontSize: 13, color: "var(--rose)", marginBottom: 16, textAlign: "center" }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || filled < 8}
              className="btn btn-primary"
              style={{ width: "100%", justifyContent: "center", fontSize: 14, padding: "12px", opacity: (loading || filled < 8) ? 0.5 : 1, cursor: filled < 8 ? "not-allowed" : "pointer" }}
            >
              {loading ? "Verifying…" : <><span>Confirm & sign in</span><ArrowRight size={15} /></>}
            </button>
          </form>

          <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid var(--border)", textAlign: "center" }}>
            <p style={{ fontSize: 12, color: "var(--text-3)", marginBottom: 8 }}>Didn&apos;t receive the code? Check spam, or</p>
            <Link href="/auth/signup" style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, color: "var(--primary)", textDecoration: "none", fontWeight: 500 }}>
              <RefreshCw size={11} /> Sign up again with a new code
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ color: "var(--text-3)", fontFamily: "var(--font-mono)", fontSize: 12 }}>Loading…</span>
      </div>
    }>
      <VerifyForm />
    </Suspense>
  );
}
