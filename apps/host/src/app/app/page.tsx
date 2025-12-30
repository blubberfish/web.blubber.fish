import { api } from "@blubberfish/lib-auth";
import { AppWindowMac } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { Section } from "./_components";

export default async function Page() {
  const session = await api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return (
      <div>
        <p>Please sign in to continue.</p>
        <Link
          className="px-6 py-2 bg-white text-gray-800 rounded-full hover:ring-2 hover:ring-blue-300"
          href="/sign-in"
          prefetch={false}
        >
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <>
      <Section>
        <header className="my-6 sm:my-9 px-6 sm:px-9">
          <h1 className="text-lg sm:text-xl font-light">Free to use</h1>
          <p className="text-sm text-gray-400">
            These applications are free to use, and are provided as it. They may
            be subjected to change from time-to-time.
          </p>
        </header>
        <ul className="px-6 sm:px-9 gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          <li>
            <Link
              className="relative block p-3 gap-3 rounded bg-white text-gray-800 hover:ring-2 hover:ring-blue-300"
              href="/app/lilypad"
              prefetch={false}
            >
              <AppWindowMac className="absolute left-3 inset-y-3" />
              <center>Lilypad</center>
            </Link>
          </li>
          <li>
            <Link
              className="relative block p-3 gap-3 rounded bg-white text-gray-800 hover:ring-2 hover:ring-blue-300"
              href="https://bus.sg.app.blubber.fish/"
              prefetch={false}
            >
              <AppWindowMac className="absolute left-3 inset-y-3" />
              <center>Bus@SG</center>
            </Link>
          </li>
        </ul>
      </Section>
    </>
  );
}
