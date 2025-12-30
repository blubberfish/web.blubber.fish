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
      <head>
        <script async src={process.env.WEB_SYNC_URL}></script>
      </head>
      <body className="min-h-dvh bg-gray-700 text-neutral-100">
        <header className="h-16 px-6 py-2 sm:px-9 sm:py-3 flex flex-row flex-nowrap items-center bg-gray-900">
          <Link
            className="px-3 -mx-3 py-2 -my-2 rounded flex flex-row flex-nowrap items-center hover:bg-black/18"
            href="/"
          >
            <Blubberfish className="size-12 sm:size-10 fill-current" />
            <p className="hidden md:block ml-3">blubberfish</p>
          </Link>
          <div className="flex-1 flex flex-row flex-nowrap items-center justify-end">
            <Async
              data={headers().then((headers) => api.getSession({ headers }))}
              render={(session) => {
                if (!session) {
                  return <Link href="sign-in">Sign in</Link>;
                }
                return (
                  <Link className="rounded-full hover:ring-2 hover:ring-neutral-300" href="/me">
                    <Avatar fullName={session.user.name} />
                  </Link>
                );
              }}
            >
              <AvatarSkeleton />
            </Async>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
