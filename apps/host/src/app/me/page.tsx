import auth from "@blubberfish/core/auth/service";
import { Blubberfish } from "@blubberfish/lib-nebula/icon";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/sign-in");
  }
  const initials = session.user.name.split(/\s+/).map((s) => s.charAt(0));
  return (
    <>
      <header>
        <header>
          <Link href="/">
            <Blubberfish className="size-8" />
          </Link>
        </header>
        <div>
          <div className="container mx-auto flex flex-col items-center-safe gap-4 sm:gap-6 p-6 sm:p-9">
            <div className="size-24 rounded-full text-gray-100 from-gray-700 to-gray-900 bg-linear-to-br flex flex-col items-center-safe justify-center-safe">
              <span className="text-xl font-semibold">
                {[initials.shift(), initials.pop()].join("").toUpperCase()}
              </span>
            </div>
            <section>
              {session.user.name}
              <div>{session.user.email}</div>
            </section>
          </div>
        </div>
      </header>
    </>
  );
}
