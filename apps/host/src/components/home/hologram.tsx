import { AppWindow, ChartArea, Database } from "lucide-react";
import { type PropsWithChildren, useMemo } from "react";

function Plane({
  anchor,
  children,
  className: classNameProp,
}: PropsWithChildren<{ anchor?: string; className?: string }>) {
  const className = useMemo(
    () =>
      [
        anchor || "orgin-center",
        "transform-3d perspective-midrange",
        classNameProp || "",
      ]
        .join(" ")
        .trim(),
    [anchor, classNameProp]
  );
  return <div className={className}>{children}</div>;
}

export function Hologram() {
  return (
    <Plane className="size-full grid grid-cols-1 grid-rows-1 items-center justify-items-center-safe">
      <Plane className="aspect-2/3 w-3xs bg-zinc-900 text-zinc-700 border rounded p-3 rotate-x-34 -rotate-y-54">
        <Plane className="size-full bg-linear-[45deg,var(--color-neutral-900)_0%,var(--color-neutral-900)_75%,var(--color-neutral-700)_75%,var(--color-neutral-700)_100%] text-neutral-700 border rounded p-3 gap-2 grid grid-cols-5 auto-rows-min translate-z-5">
          <Plane className="aspect-square p-1 from-sky-900 bg-linear-to-br text-blue-300 rounded translate-z-3">
            <ChartArea className="size-full" />
          </Plane>
          <Plane className="aspect-square p-1 from-sky-900 bg-linear-to-br text-blue-300 rounded translate-z-5">
            <Database className="size-full" />
          </Plane>
          <Plane className="aspect-square p-1 from-sky-900 bg-linear-to-br text-blue-300 rounded translate-z-8">
            <AppWindow className="size-full" />
          </Plane>
          <Plane className="aspect-square col-span-full from-zinc-900 to-zinc-950 bg-linear-to-br border rounded p-3 gap-1 grid grid-cols-8 auto-rows-min translate-z-3">
            <Plane className="h-1 rounded bg-white" />
            <Plane className="h-1 col-span-3 rounded bg-white" />
            <Plane className="h-1 col-span-3 rounded bg-white" />
            <Plane className="h-1 rounded bg-white" />
            <Plane className="h-1 col-span-5 rounded bg-white" />
            <Plane className="h-1 col-span-2 rounded bg-white" />
            <Plane className="h-1 col-span-3 rounded bg-white" />
            <Plane className="h-1 rounded bg-white" />
            <Plane className="size-1 bg-white animate-pulse" />
          </Plane>
        </Plane>
      </Plane>
    </Plane>
  );
}
