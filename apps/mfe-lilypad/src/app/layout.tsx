import { auth } from '@/lib/auth-client'
import type { Metadata } from "next";
import "./globals.css";
import { headers } from 'next/headers';

export const metadata: Metadata = {
  title: "Lilypad",
  description: "By Blubberfish",
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.getSession({ fetchOptions: {
    headers: await headers(),
  } });
  console.log(session);
  return (
    <html lang="en">
      <head>
        <script async src={process.env.WEB_SYNC_URL}></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
