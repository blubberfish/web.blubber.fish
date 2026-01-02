import type { Metadata } from "next";
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
      <head></head>
      <body>{children}</body>
    </html>
  );
}
