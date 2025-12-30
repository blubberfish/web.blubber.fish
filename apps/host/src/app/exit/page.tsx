import { api } from "@blubberfish/lib-auth";
import { headers } from "next/headers";
import Link from "next/link";

export default async function Page() {
  await api.signOut({
    headers: await headers(),
  });

  return (
    <div>
      <p>Successfully signed out...</p>
      <Link href="/" prefetch={false}>
        Back
      </Link>
    </div>
  );
}
