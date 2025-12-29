import { api } from "@blubberfish/lib-auth";
import { headers } from "next/headers";
import Link from "next/link";

export default async function Page() {
  await api.signOut({
    headers: await headers(),
  });
  await new Promise(resolve => {
    setTimeout(resolve, 5000);
  })

  return (
    <div>
      <p>Successfully signed out...</p>
      <Link href="/" prefetch={false}>
        Back
      </Link>
    </div>
  );
}
