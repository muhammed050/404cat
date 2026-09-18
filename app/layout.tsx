import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://404cat.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "404 CAT — Dip Not Found",
    template: "%s | 404 CAT",
  },
  description:
    "404 CAT is the internet's most confused cat. Memes, chaos, good vibes, and one dip that still cannot be found.",
  keywords: ["404 CAT", "$404", "meme coin", "Solana", "memes", "internet culture"],
  openGraph: {
    type: "website",
    title: "404 CAT — Dip Not Found",
    description: "Memes. Chaos. Good vibes. Same cat. Different internet.",
    siteName: "404 CAT",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "404 CAT — Dip Not Found",
    description: "Memes. Chaos. Good vibes. Same cat. Different internet.",
    creator: "@404CatCoin",
  },
  alternates: { canonical: siteUrl },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#02070c",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
