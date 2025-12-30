import { Github } from "@blubberfish/lib-nebula/icon";
import { Button } from "./button";

export function SignInWithGithub() {
  return (
    <Button authProvider="github" className="relative w-full p-3 rounded bg-white text-gray-900">
      <Github className="absolute inset-y-0 left-0 aspect-square h-full p-3 hover:ring-2 hover:ring-blue-300" />
      <center className="font-semibold">GitHub</center>
    </Button>
  );
}
