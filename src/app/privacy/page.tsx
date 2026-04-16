import Link from "next/link";
import Navbar from "@/components/Navbar";

const LAST_UPDATED = "15 April 2026";
const CONTACT_EMAIL = "privacy@promitly.com";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", paddingTop: 80 }}>
        <section style={{ padding: "60px 0 100px" }}>
          <div className="page" style={{ maxWidth: 720 }}>

            <div style={{ marginBottom: 40 }}>
              <div className="chip" style={{ marginBottom: 16 }}>Legal</div>
              <h1 style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(26px,4vw,40px)", fontWeight: 700, color: "var(--text-1)", letterSpacing: "-0.02em", marginBottom: 10 }}>
                Privacy Policy
              </h1>
              <p style={{ fontSize: 13, color: "var(--text-4)", fontFamily: "var(--font-mono)" }}>Last updated: {LAST_UPDATED}</p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
              <Section title="1. Who we are">
                <P>PROMITLY ("we", "us", "our") operates the website at promitly.com — an AI prompt library. Our servers are hosted in the European Union (Ireland, AWS eu-west-1) via Supabase.</P>
                <P>For data protection enquiries, contact us at <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "var(--primary)" }}>{CONTACT_EMAIL}</a>.</P>
              </Section>

              <Section title="2. What data we collect">
                <P>When you create an account, we collect:</P>
                <UL items={[
                  "Your email address — used to verify your identity and send account-related emails only.",
                  "Your name — stored as provided during signup (optional display name).",
                  "Your saved prompt IDs — a list of which prompts you have bookmarked.",
                  "Account creation timestamp — used to calculate account age.",
                ]} />
                <P>We do <strong style={{ color: "var(--text-1)" }}>not</strong> collect payment information, location data, browsing history, or device fingerprints. We do not use third-party advertising trackers.</P>
              </Section>

              <Section title="3. How we use your data">
                <P>We process your data for the following purposes:</P>
                <UL items={[
                  "Account authentication — to let you sign in and access your account.",
                  "Service delivery — to save and retrieve your bookmarked prompts.",
                  "Security — to protect against abuse, fraud, and unauthorised access.",
                  "Legal compliance — to meet our obligations under applicable law.",
                ]} />
                <P>Legal basis under GDPR: contract performance (Article 6(1)(b)) for account features, and legitimate interests (Article 6(1)(f)) for security and service integrity.</P>
                <P>We do <strong style={{ color: "var(--text-1)" }}>not</strong> sell, rent, or share your personal data with third parties for marketing purposes.</P>
              </Section>

              <Section title="4. Data storage and security">
                <P>Your data is stored securely in Supabase (PostgreSQL database hosted in the EU). Access is protected by:</P>
                <UL items={[
                  "Row Level Security (RLS) — you can only access your own data, enforced at the database level.",
                  "Encrypted connections — all data is transmitted over HTTPS/TLS.",
                  "Hashed passwords — passwords are never stored in plain text (handled by Supabase Auth).",
                ]} />
                <P>We retain your data for as long as your account is active. If you delete your account, all personal data is permanently deleted within 24 hours.</P>
              </Section>

              <Section title="5. Your rights (GDPR)">
                <P>If you are located in the European Economic Area, you have the following rights:</P>
                <UL items={[
                  "Right of access — request a copy of the data we hold about you.",
                  "Right to rectification — correct inaccurate or incomplete data.",
                  "Right to erasure ('right to be forgotten') — delete your account and all data instantly from the Account page, or by contacting us.",
                  "Right to data portability — receive your data in a machine-readable format.",
                  "Right to restrict processing — ask us to stop processing your data while a dispute is resolved.",
                  "Right to object — object to processing based on legitimate interests.",
                  "Right to lodge a complaint — with your national data protection authority (e.g. ICO in the UK, CNIL in France).",
                ]} />
                <P>To exercise any right, email <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "var(--primary)" }}>{CONTACT_EMAIL}</a>. We will respond within 30 days.</P>
                <P><strong style={{ color: "var(--text-1)" }}>Delete your account instantly:</strong> Go to <Link href="/account" style={{ color: "var(--primary)" }}>Account → Delete account</Link>. Your account and all data are permanently removed immediately.</P>
              </Section>

              <Section title="6. Cookies">
                <P>We use only essential cookies required for authentication (session tokens set by Supabase Auth). These are strictly necessary and cannot be opted out of while using an account.</P>
                <P>We do not use advertising cookies, analytics cookies, or any third-party tracking cookies.</P>
              </Section>

              <Section title="7. Third-party services">
                <P>We use the following sub-processors to operate the service:</P>
                <UL items={[
                  "Supabase (database, authentication) — EU-hosted, GDPR-compliant. Privacy policy: supabase.com/privacy",
                  "Vercel (hosting) — used to serve the website. Privacy policy: vercel.com/legal/privacy-policy",
                ]} />
                <P>All sub-processors are contractually bound to handle data in compliance with GDPR.</P>
              </Section>

              <Section title="8. Data transfers">
                <P>Your data is stored and processed within the European Union. If any data is transferred outside the EU, we ensure adequate safeguards are in place (Standard Contractual Clauses or equivalent).</P>
              </Section>

              <Section title="9. Children">
                <P>PROMITLY is not directed at children under 13 years of age. We do not knowingly collect personal data from children. If you believe a child has provided us personal data, contact us immediately and we will delete it.</P>
              </Section>

              <Section title="10. Changes to this policy">
                <P>We may update this Privacy Policy from time to time. We will notify registered users of significant changes by email. The "Last updated" date at the top of this page reflects the most recent revision. Continued use of the service after changes constitutes acceptance.</P>
              </Section>

              <Section title="11. Contact">
                <P>For any privacy-related questions, data access requests, or deletion requests:</P>
                <P><strong style={{ color: "var(--text-1)" }}>Email:</strong> <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "var(--primary)" }}>{CONTACT_EMAIL}</a></P>
                <P>We aim to respond to all requests within 5 business days and are legally required to respond within 30 days.</P>
              </Section>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 style={{ fontFamily: "var(--font-sans)", fontSize: 18, fontWeight: 700, color: "var(--text-1)", marginBottom: 14, letterSpacing: "-0.01em" }}>{title}</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>{children}</div>
    </div>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.8 }}>{children}</p>;
}

function UL({ items }: { items: string[] }) {
  return (
    <ul style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 8 }}>
      {items.map(item => (
        <li key={item} style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.7 }}>{item}</li>
      ))}
    </ul>
  );
}

function Footer() {
  return (
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
  );
}
