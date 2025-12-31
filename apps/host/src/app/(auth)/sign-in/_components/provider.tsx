"use client";
import { auth } from "@blubberfish/lib-auth/client";
import { useEffect, useState } from "react";
import { SignInContext } from "../_contexts/sign-in";

export function SignInProvider({ children }: React.PropsWithChildren) {
  const [pending, setPending] = useState<Promise<unknown>>();
  useEffect(() => {
    if (!pending) {
      return;
    }
    let cancel = false;
    pending.finally(() => {
      if (cancel) {
        return;
      }
      setPending(() => undefined);
    });
    return () => {
      cancel = true;
    };
  }, [pending]);
  return (
    <SignInContext.Provider
      value={{
        getDisabled() {
          return !!pending;
        },
        signIn(params) {
          setPending(
            auth.signIn.social({
              provider: params.provider,
              callbackURL: params.redirectTo,
            })
          );
        },
      }}
    >
      {children}
    </SignInContext.Provider>
  );
}
