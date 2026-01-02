import { Blubberfish, Github, Google } from "@blubberfish/lib-nebula/icon";
import Link from "next/link";
import { SignInButton } from "./_components/sign-in-button";

export default function Page() {
  return (
    <div className="min-h-svh grid grid-cols-1 auto-rows-min content-center-safe justify-items-center-safe px-6 sm:px-9 gap-6 sm:gap-9">
      <Link href="/">
        <Blubberfish className="aspect-square size-16" />
      </Link>
      <nav className="container mx-auto max-w-sm flex flex-col gap-2 sm:gap-3">
        <SignInButton
          className="isolate relative w-full bg-gray-900 text-gray-100 rounded hover:ring-2 hover:ring-blue-300"
          socialProvider="github"
        >
          <Github className="absolute inset-y-0 left-0 aspect-square h-full p-3" />
          <center className="py-3">Github</center>
        </SignInButton>
        <SignInButton
          className="isolate relative w-full bg-gray-900 text-gray-100 rounded hover:ring-2 hover:ring-blue-300"
          socialProvider="google"
        >
          <Google className="absolute inset-y-0 left-0 aspect-square h-full p-3" />
          <center className="py-3">Google</center>
        </SignInButton>
      </nav>
    </div>
  );
}
