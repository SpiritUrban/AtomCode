import "./globals.css";
import { buildSiteMetadata } from "@/lib/seo";

// Root layout: minimal, provides html/body shell.
// lang is set dynamically in the [locale]/layout.tsx (per-segment).
// This ensures correct language for all static pages.
export const metadata = buildSiteMetadata("en");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}