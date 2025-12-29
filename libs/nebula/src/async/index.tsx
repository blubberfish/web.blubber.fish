import { type PropsWithChildren, type ReactNode, Suspense } from "react";
import { Render } from "./render";

export function Async<T>({
  data,
  render,
  children,
}: PropsWithChildren<{
  data: Promise<T>;
  render: { (data: T): ReactNode };
}>) {
  return (
    <Suspense fallback={children}>
      <Render data={data}>{render}</Render>
    </Suspense>
  );
}
