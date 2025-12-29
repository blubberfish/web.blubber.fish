import { PropsWithChildren } from "react";

export function SiteHeader({ children }: PropsWithChildren) {
  return (
    <header className="h-16 sticky top-0 inset-x-0 px-9 py-3 bg-gray-700 text-white flex flex-row flex-nowrap items-center">
    </header>
  );
}
