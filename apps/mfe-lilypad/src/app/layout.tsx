import { auth } from "@blubberfish/lib-auth/client";
import { FileExplorer } from "@blubberfish/lib-nebula/file-system";
import type { Metadata } from "next";
import { headers } from "next/headers";
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
  const session = await auth.getSession({
    fetchOptions: { headers: await headers() },
  });
  console.log(session);
  return (
    <html lang="en">
      <head></head>
      <body>
        <div>
          <header>
            <h1>EXPLORER</h1>
          </header>
          <FileExplorer />
        </div>
        {children}
      </body>
    </html>
  );
}
