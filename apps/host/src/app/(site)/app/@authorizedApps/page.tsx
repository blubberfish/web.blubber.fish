import { api } from "@blubberfish/lib-auth";
import { headers } from "next/headers";
import Link from "next/link";

export default async function Page() {
  const session = await api.getSession({ headers: await headers() });

  if (!session) {
    return (
      <>
        <header className="p-6 sm:p-9">
          <h1 className="text-gray-400 text-lg sm:text-xl font-light">
            Looking for more?
          </h1>
          <p>
            <Link className="underline font-semibold" href="/sign-in">Sign in</Link> to unlock access to all our
            applications.
          </p>
        </header>
      </>
    );
  }

  return null;
}
