import { api } from "@blubberfish/lib-auth";
import { LinkAccountButton } from "@blubberfish/lib-auth/react";
import { Github, Google } from "@blubberfish/lib-nebula/icon";
import { Link } from "lucide-react";
import { headers } from "next/headers";
import { PropsWithChildren } from "react";
import { List, ListEntry, Section, Title } from "./_components"

export default async function Component() {
  const accounts = await api.listUserAccounts({ headers: await headers() });
  const accountMap = Object.fromEntries(
    accounts.map((account) => [account.providerId, account])
  );
  return (
    <Section>
      <Title>Accounts</Title>
      <List>
        <Account providerId="github" linked={!!accountMap.github}>
          <header className="flex flex-row items-center gap-3">
            <Github className="size-6" />
            <p>Github</p>
          </header>
        </Account>
        <Account providerId="google" linked={!!accountMap.google}>
          <header className="flex flex-row items-center gap-3">
            <Google className="size-6" />
            <p>Google</p>
          </header>
        </Account>
      </List>
    </Section>
  );
}

function Account({
  providerId,
  children,
  linked,
}: PropsWithChildren<{ providerId: "github" | "google"; linked?: boolean }>) {
  return (
    <ListEntry>
      <div className="flex flex-col gap-1 p-3">{children}</div>
      {linked ? (
        <div className="px-3 py-1 flex flex-row flex-nowrap items-center gap-1">
          <Link className="size-4" />
          <span>Linked</span>
        </div>
      ) : (
        <LinkAccountButton
          className="m-3 px-3 py-1 bg-white hover:ring-2 hover:ring-blue-300 text-gray-800 rounded flex flex-row flex-nowrap items-center-safe gap-x-1"
          provider={providerId}
        />
      )}
    </ListEntry>
  );
}
