import { api } from "@blubberfish/lib-auth";
import { headers } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";
import { Grip } from "lucide-react";
import { Title } from './components'

export function Brand() {
  return (
    <Suspense fallback={<Title />}>
      <BrandButton />
    </Suspense>
  );
}

async function BrandButton() {
  const session = await api.getSession({ headers: await headers() });
  if (session) {
    return (
      <Link className="flex flex-row flex-nowrap" href="/apps" prefetch={false}>
        <Grip />
        <p>Apps</p>
      </Link>
    );
  }
  return <Title />;
}
