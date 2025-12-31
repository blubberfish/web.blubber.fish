"use client";

import { ButtonWithIcon } from "@blubberfish/lib-nebula/button";
import { type ComponentProps, useContext } from "react";
import { SignInContext } from "../_contexts/sign-in";

export function Button({
  authProvider,
  disabled: disabledProp,
  onClick,
  ...props
}: ComponentProps<typeof ButtonWithIcon> & {
  authProvider: "github" | "google";
}) {
  const { getDisabled, signIn } = useContext(SignInContext);
  return (
    <ButtonWithIcon
      disabled={getDisabled() || disabledProp}
      title={`Sign in with ${authProvider}`}
      type="button"
      onClick={(event) => {
        signIn({
          provider: authProvider,
          redirectTo: new URL("/app", window.location.href).href,
        });
        onClick?.(event);
      }}
      {...props}
    />
  );
}
