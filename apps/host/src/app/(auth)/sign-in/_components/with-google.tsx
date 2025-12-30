import { Google } from "@blubberfish/lib-nebula/icon";
import { Button } from "./button";

export function SignInWithGoogle() {
  return (
    <Button authProvider="google" className="relative w-full p-3 rounded bg-white text-gray-900">
      <Google className="absolute inset-y-0 left-0 aspect-square h-full p-3 hover:ring-2 hover:ring-blue-300" />
      <center className="font-semibold">Google</center>
    </Button>
  );
}
