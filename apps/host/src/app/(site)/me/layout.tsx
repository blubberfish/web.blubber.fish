import { ReactNode } from "react";

export default function Layout({
  children,
  profile,
  accounts,
}: Readonly<{ children: ReactNode; profile: ReactNode; accounts: ReactNode }>) {
  return (
    <div className="grid grid-cols-1 auto-rows-min">
      {profile}
      {accounts}
      {children}
    </div>
  );
}
