import type { ReactNode } from "react";

export async function Render<T>({
  children,
  data,
}: {
  children: { (data: T): ReactNode };
  data: Promise<T>;
}) {
  return children(await data);
}
