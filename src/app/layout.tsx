import "./globals.css";
import { buildSiteMetadata } from "@/lib/seo";

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
