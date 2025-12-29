import { api } from "@blubberfish/lib-auth";
import { LinkAccountButton } from "@blubberfish/lib-auth/react";
import { Github, Google } from "@blubberfish/lib-nebula/icon";
import { headers } from "next/headers";
import { PropsWithChildren } from "react";

export default async function Component() {
  const accounts = await api.listUserAccounts({ headers: await headers() });
  const accountMap = Object.fromEntries(
    accounts.map((account) => [account.providerId, account])
  );
  return (
    <section className="p-6 sm:p-9 flex flex-col">
      <h1 className="mb-6 text-lg sm:text-xl text-neutral-300">Accounts</h1>
      <List>
        <Entry providerId="github">
          <Github className="size-6" />
          <p>Github</p>
        </Entry>
        <Entry providerId="google">
          <Google className="size-6" />
          <p>Google</p>
        </Entry>
      </List>
    </section>
  );
}

function List({ children }: PropsWithChildren) {
  return (
    <dl className="grid grid-cols-1 auto-rows-min items-center-safe border border-gray-400 rounded">
      {children}
    </dl>
  );
}

function Entry({
  providerId,
  children,
}: PropsWithChildren<{
  providerId: "github" | "google";
}>) {
  return (
    <>
      <dt className="flex flex-row flex-nowrap items-center-safe px-3 py-2 gap-2 not-first:border-t border-gray-400 font-semibold">
        {children}
      </dt>
      <dd className="px-3 py-2">
        <LinkAccountButton
          className="px-3 py-1 bg-white hover:ring-2 hover:ring-blue-300 text-gray-800 rounded flex flex-row flex-nowrap items-center-safe gap-x-1"
          provider={providerId}
        />
      </dd>
    </>
  );
}
