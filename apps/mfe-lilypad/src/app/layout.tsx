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
      <head>
        {process.env.SCRIPT_BLUBBERFISH && (
          <script async src={process.env.SCRIPT_BLUBBERFISH}></script>
        )}
      </head>
      <body>{children}</body>
    </html>
  );
}
