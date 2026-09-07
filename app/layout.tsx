import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://sandeshl702.github.io/why-is-my-pf-stuck/";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Why is my PF stuck? | A clear EPFO fix",
  description: "Understand your EPFO blocker, see the next steps and copy a ready HR email or EPFiGMS grievance.",
  keywords: ["EPFO", "PF claim", "EPFiGMS", "provident fund", "PF stuck"],
  openGraph: {
    title: "Why is my PF stuck?",
    description: "A calm, practical starting point for a stuck EPFO claim.",
    url: siteUrl,
    siteName: "Why is my PF stuck?",
    type: "website",
    images: [{ url: "/why-is-my-pf-stuck/og.svg", width: 1200, height: 630, alt: "Why is my PF stuck? A clear EPFO fix" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Why is my PF stuck?",
    description: "A clear next step for an unclear EPFO status.",
    images: ["/why-is-my-pf-stuck/og.svg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
