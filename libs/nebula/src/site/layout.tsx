import { HTMLAttributes } from "react";

export function Header(props: HTMLAttributes<HTMLDivElement>) {
  return <header className="h-16 sticky top-0 inset-x-0 z-50" {...props} />;
}
