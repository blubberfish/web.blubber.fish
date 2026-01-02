import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lilypad",
  description: "By Blubberfish",
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head></head>
      <body>{children}</body>
    </html>
  );
}
