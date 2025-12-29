import { useMemo } from "react";

export function Avatar({ fullName }: { fullName: string }) {
  const initials = useMemo(() => {
    const parts = fullName.split(/\s+/g);
    return [parts.shift()?.charAt(0) || "", parts.pop()?.charAt(0) || ""].join(
      ""
    );
  }, [fullName]);
  return (
    <div className="overflow-hidden size-8 rounded-full from-purple-300 to-blue-300 bg-linear-to-br text-gray-800 flex flex-row flex-nowrap items-center justify-center font-semibold">
      <p>{initials}</p>
    </div>
  );
}

export function AvatarSkeleton() {
  return <div className="size-8 rounded-full bg-stone-400 animate-pulse" />;
}
