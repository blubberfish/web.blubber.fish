import { api } from "@blubberfish/lib-auth";
import { headers } from "next/headers";

export default async function Page() {
  await api.signOut({
    headers: await headers(),
  });

  return (
    <div className="w-xs mx-auto p-6 gap-6 flex flex-col items-center-safe bg-gray-800 rounded">
      <p className="text-sm">You have been successfully signed out.</p>
    </div>
  );
}
