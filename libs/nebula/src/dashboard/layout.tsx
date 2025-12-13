import { PropsWithChildren } from "react";

export function Layout({ children }: PropsWithChildren) {
  return (
    <div className="h-dvh w-dvw">
      <div className="h-svh w-full flex flex-col">
        <div className="h-16"></div>
        <div className="flex-1 flex flex-row flex-nowrap">
          <div className="w-xs"></div>
          {children}
        </div>
      </div>
    </div>
  );
}
