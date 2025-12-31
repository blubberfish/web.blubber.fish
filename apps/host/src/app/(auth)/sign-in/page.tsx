import { Blubberfish } from "@blubberfish/lib-nebula/icon";
import { SignInProvider } from "./_components/provider";
import { SignInWithGithub } from "./_components/with-github";
import { SignInWithGoogle } from "./_components/with-google";

export default function Page() {
  return (
    <div className="min-h-svh grdi grid-cols-1 auto-rows-min content-center-safe justify-items-center-safe">
      <Blubberfish className="size-32 fill-current mb-6" />
      <nav className="w-full sm:max-w-sm mx-auto p-6 sm:p-9 flex flex-col gap-6">
        <SignInProvider>
          <SignInWithGithub />
          <SignInWithGoogle />
        </SignInProvider>
      </nav>
    </div>
  );
}
