import { api } from "@blubberfish/lib-auth";
import { Avatar } from "@blubberfish/lib-nebula/avatar";
import { Blubberfish } from "@blubberfish/lib-nebula/icon";
import { headers } from "next/headers";
import Link from "next/link";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await api.getSession({
    headers: await headers(),
  });
  return (
    <>
      <header className="sticky top-0 flex flex-row flex-nowrap items-center-safe justify-between">
        <div className="pl-6 py-4 sm:pl-9 sm:py-6">
          <Link
            className="block px-3 py-2 -mx-3 -my-2 rounded hover:bg-black/13"
            href="/me"
            title="Home page"
            prefetch={false}
          >
            <Blubberfish className="align-middle inline-block size-8 fill-white" />
            <h1 className="align-middle ml-3 hidden md:inline-block">
              blubber.fish
            </h1>
          </Link>
        </div>
        <nav className="flex flex-row flex-nowrap items-center-safe pr-6 py-4 sm:pr-9 sm:py-6">
          {session ? (
            <Link className="block rounded-full hover:ring-2 hover:ring-blue-300" href="/me">
              <Avatar fullName={session.user.name} />
            </Link>
          ) : (
            <Link
              className="block p-3 -m-3 hover:ring-2 hover:ring-blue-300"
              href="/sign-in"
              prefetch={false}
            >
              Sign in
            </Link>
          )}
        </nav>
      </header>
      {children}
    </>
  );
}
