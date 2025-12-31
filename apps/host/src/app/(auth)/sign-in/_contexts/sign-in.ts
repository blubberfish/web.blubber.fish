import { createContext } from "react";

export const SignInContext = createContext<{
  getDisabled(): boolean;
  signIn(
    params: { provider: "github" | "google" } & { redirectTo?: string }
  ): void;
}>({
  getDisabled() {
    throw new Error();
  },
  signIn() {
    throw new Error();
  },
});
