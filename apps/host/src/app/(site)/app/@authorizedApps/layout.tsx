export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <section className="container mx-auto bg-gray-800 sm:rounded">{children}</section>;
}
