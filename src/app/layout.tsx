import type { Metadata } from "next";
import { Orbitron, Outfit, JetBrains_Mono } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://promitly.com"),
  title: {
    default: "PROMITLY — AI Prompt Generator",
    template: "%s | PROMITLY",
  },
  description:
    "Generate perfect AI prompts for Claude, ChatGPT, Gemini & more. 130+ expert prompts across 12 categories. Free to use.",
  keywords: [
    "AI prompt generator", "ChatGPT prompts", "Claude prompts", "Gemini prompts",
    "prompt engineering", "AI prompts", "best AI prompts", "prompt library",
    "AI tools", "prompt templates",
  ],
  authors: [{ name: "Promitly" }],
  creator: "Promitly",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://promitly.com",
    siteName: "PROMITLY",
    title: "PROMITLY — AI Prompt Generator",
    description:
      "Generate perfect AI prompts for Claude, ChatGPT, Gemini & more. 130+ expert prompts across 12 categories.",
  },
  twitter: {
    card: "summary_large_image",
    title: "PROMITLY — AI Prompt Generator",
    description:
      "Generate perfect AI prompts for Claude, ChatGPT, Gemini & more. Free to use.",
    creator: "@promitly",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1 },
  },
  alternates: {
    canonical: "https://promitly.com",
  },
  verification: {
    google: "atNFTeLM_ZHSDmWlj1I0Qu7vwUKWgITPF23f3zhvG1M",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${orbitron.variable} ${outfit.variable} ${mono.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
