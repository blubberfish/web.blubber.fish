import { auth } from "@/lib/auth-client";
import type { Metadata } from "next";
import "./globals.css";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Lilypad",
  description: "By Blubberfish",
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });
  return (
    <html lang="en">
      <head></head>
      <body>{children}</body>
    </html>
  );
}
