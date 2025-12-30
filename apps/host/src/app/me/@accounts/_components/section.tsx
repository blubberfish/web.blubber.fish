import { type PropsWithChildren } from "react";

export function Section({ children }: PropsWithChildren) {
  return (
    <section className="container mx-auto p-6 sm:p-9 flex flex-col">
      {children}
    </section>
  );
}
