import { PropsWithChildren } from "react";

export function DashboardLayout({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return <div className={className || "flex-1"}>{children}</div>;
}
