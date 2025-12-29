import { PropsWithChildren } from "react";

export function Title({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={["pl-6 py-2 sm:pl-9 sm:py-3", className?.trim()]
        .filter((css) => css)
        .join(" ")}
    >
      {children}
    </div>
  );
}
