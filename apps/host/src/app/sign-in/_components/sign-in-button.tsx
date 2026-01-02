"use client";

import auth from "@blubberfish/core/auth/client";
import { type ButtonHTMLAttributes } from "react";

export function SignInButton({
  socialProvider,
  title,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  socialProvider: "github" | "google";
}) {
  return (
    <button
      title={title || `Sign in with ${socialProvider}`}
      type="button"
      onClick={() => {
        auth.signIn.social({ provider: socialProvider, callbackURL: "/me" });
      }}
      {...props}
    />
  );
}
