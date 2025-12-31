import { type ButtonHTMLAttributes, type ComponentProps, type ReactNode, useMemo } from "react";

export function Button({
  className: classNameProp,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  const className = useMemo(
    () =>
      [
        "hover:ring-2 hover:ring-blue-300 disabled:opacity-50 disabled:ring-0",
        classNameProp || "",
      ]
        .join(" ")
        .trim(),
    [classNameProp]
  );
  return <button className={className} {...props} />;
}

export function ButtonWithIcon({
  className: classNameProp,
  ...props
}: ComponentProps<typeof Button>) {
  const className = useMemo(
    () => ["isolate relative px-3 py-2", classNameProp || ""].join(" ").trim(),
    [classNameProp]
  );
  return <Button className={className} {...props} />;
}

export function ButtonIcon({ children }: { children: ReactNode }) {
  return (
    <div className="absolute inset-y-0 left-0 p-3 aspect-square overflow-hidden grid grid-cols-1 grid-rows-1 items-center justify-items-center">
      {children}
    </div>
  );
}

export function ButtonLabel({
  className,
  children,
}: {
  className?: string;
  children: string;
}) {
  return <center className={className}>{children}</center>;
}
