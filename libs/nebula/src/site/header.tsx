import { PropsWithChildren } from "react";

export function SiteHeader({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <header
      className={[
        "sticky top-0 inset-x-0 h-16 bg-gray-700 text-white flex flex-row flex-nowrap items-center",
        className?.trim(),
      ]
        .filter((css) => css)
        .join(" ")}
    >
      {children}
    </header>
  );
}
