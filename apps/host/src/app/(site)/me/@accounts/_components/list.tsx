import { type PropsWithChildren } from "react";

export function List({ children }: PropsWithChildren) {
  return (
    <ul className="grid grid-cols-[1fr_min-content] auto-rows-min items-center-safe border border-gray-400 rounded">
      {children}
    </ul>
  );
}

export function ListEntry({ children }: PropsWithChildren) {
  return (
    <li className="col-span-full grid grid-cols-subgrid items-center not-first:border-t border-gray-400">
      {children}
    </li>
  );
}
