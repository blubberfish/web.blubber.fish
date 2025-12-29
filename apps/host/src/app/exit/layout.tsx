export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh">
      <div className="h-svh flex flex-col">
        <header></header>
        <div className="flex flex-col flex-1">{children}</div>
      </div>
    </div>
  );
}
