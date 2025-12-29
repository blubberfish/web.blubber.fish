import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Blubberfish",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script async src={process.env.WEB_SYNC_URL}></script>
      </head>
      <body className="min-h-dvh bg-gray-700 text-neutral-100">
        <header className="h-16">
          <Link href="/app">Apps</Link>
        </header>
        {children}
      </body>
    </html>
  );
}
