import { api } from "@blubberfish/lib-auth";
import { headers } from "next/headers";
import Link from "next/link";

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
    <div className="grid grid-cols-1 sm:grid-cols-2 auto-rows-min">
      <Link href="/app/lilypad" prefetch={false}>
        Lilypad
      </Link>
    </div>
  );
}
