import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AtomCode — Learn programming one atom at a time",
  description:
    "Visual educational platform for atomic programming learning. One small topic = one atom of knowledge = one screen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}