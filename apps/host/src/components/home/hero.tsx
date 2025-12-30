import { Blubberfish } from "@blubberfish/lib-nebula/icon";
import Link from "next/link";
import { Hologram } from "./hologram";

export function Hero() {
  return (
    <header className="group relative overflow-hidden from-gray-950 to-gray-900 bg-linear-to-b">
      <div className="absolute inset-0">
        <Hologram />
      </div>
      <div className="relative min-h-svh">
        <nav className="px-9 py-6 flex flex-row flex-nowrap items-center justify-between">
          <Link className="block" href="/" prefetch={false}>
            <Blubberfish className="aspect-square size-8 fill-white" />
          </Link>
          <Link className="block" href="/app" prefetch={false}>
            Explore apps
          </Link>
        </nav>
      </div>
    </header>
  );
}
