"use client";

import { auth } from "@blubberfish/lib-auth/client";
import type { ButtonHTMLAttributes } from "react";

export function Button({
  authProvider,
  onClick,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { authProvider: string }) {
  return (
    <button
      onClick={(event) => {
        auth.signIn.social({
          provider: authProvider,
          callbackURL: new URL("/app", window.location.href).href,
          newUserCallbackURL: new URL("/me", window.location.href).href,
        });
        onClick?.(event);
      }}
      {...props}
    />
  );
}
