export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh">
      <section className="container mx-auto px-6 sm:px-9">
        <h1 className="my-6 sm:my-9 text-lg sm:text-xl text-gray-300 font-light">
          <center>Terminating your session</center>
        </h1>
        {children}
      </section>
    </div>
  );
}
