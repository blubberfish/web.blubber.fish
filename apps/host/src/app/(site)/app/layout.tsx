export default function Layout({
  authorizedApps,
  children,
}: Readonly<{ authorizedApps: React.ReactNode; children: React.ReactNode }>) {
  return (
    <>
      {children}
      {authorizedApps}
    </>
  );
}
