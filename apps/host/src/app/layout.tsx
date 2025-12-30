import { Async } from "@blubberfish/lib-nebula/async";
import { Avatar, AvatarSkeleton } from "@blubberfish/lib-nebula/avatar";
import { Blubberfish } from "@blubberfish/lib-nebula/icon";
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { headers } from "next/headers";
import { api } from "@blubberfish/lib-auth";

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
      <body className="min-h-dvh bg-gray-700 text-neutral-100">{children}</body>
    </html>
  );
}
