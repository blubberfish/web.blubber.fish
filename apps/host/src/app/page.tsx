import { Blubberfish } from "@blubberfish/lib-nebula/icon";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <header className="px-6 sm:px-9 py-4 sm:py-6">
        <Link
          href="/"
          className="flex flex-row flex-nowrap items-center-safe gap-2 sm:gap-3"
        >
          <Blubberfish className="h-8" />
          <span className="hidden md:block">blubber.fish</span>
        </Link>
      </header>
    </>
  );
}
