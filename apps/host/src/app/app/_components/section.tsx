import { type PropsWithChildren } from "react";

export function Section({ children }: PropsWithChildren) {
  return (
    <section>
      <div className="container mx-auto">{children}</div>
    </section>
  );
}
