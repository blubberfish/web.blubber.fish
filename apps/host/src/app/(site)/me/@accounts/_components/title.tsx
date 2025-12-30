import { type PropsWithChildren } from "react";

export function Title({ children }: PropsWithChildren) {
  return (
    <h1 className="mb-6 text-lg sm:text-xl text-neutral-300">{children}</h1>
  );
}
