import { ButtonIcon, ButtonLabel } from "@blubberfish/lib-nebula/button";
import { Github } from "@blubberfish/lib-nebula/icon";
import { Button } from "./button";

export function SignInWithGithub() {
  return (
    <Button
      authProvider="github"
      className="relative w-full p-3 rounded bg-white text-gray-900 hover:ring-2 hover:ring-blue-300 disabled:opacity-50 disabled:ring-0"
    >
      <ButtonIcon>
        <Github className="h-full" />
      </ButtonIcon>
      <ButtonLabel>GitHub</ButtonLabel>
    </Button>
  );
}
