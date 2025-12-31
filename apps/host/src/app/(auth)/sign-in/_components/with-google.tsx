import { ButtonIcon, ButtonLabel } from "@blubberfish/lib-nebula/button";
import { Google } from "@blubberfish/lib-nebula/icon";
import { Button } from "./button";

export function SignInWithGoogle() {
  return (
    <Button
      authProvider="google"
      className="relative w-full p-3 rounded bg-white text-gray-900 hover:ring-2 hover:ring-blue-300 disabled:opacity-50 disabled:ring-0"
    >
      <ButtonIcon>
        <Google className="h-full" />
      </ButtonIcon>
      <ButtonLabel className="font-semibold">Google</ButtonLabel>
    </Button>
  );
}
