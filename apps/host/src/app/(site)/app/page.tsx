import { AppWindowMac } from "lucide-react";

export default function Page() {
  return (
    <section className="container mx-auto mb-6 sm:mb-9">
      <header className="my-6 sm:my-9 px-6 sm:px-9">
        <h1 className="text-lg sm:text-xl font-light">Free to use</h1>
        <p className="text-sm text-gray-400">
          These applications are free to use, and are provided as it. They may
          be subjected to change from time-to-time.
        </p>
      </header>
      <ul className="px-6 sm:px-9 gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <li>
          <a
            className="relative block p-3 gap-3 rounded bg-white text-gray-800 hover:ring-2 hover:ring-blue-300"
            href="/app/lilypad"
          >
            <AppWindowMac className="absolute left-3 inset-y-3" />
            <center>Lilypad</center>
          </a>
        </li>
        <li>
          <a
            className="relative block p-3 gap-3 rounded bg-white text-gray-800 hover:ring-2 hover:ring-blue-300"
            href="https://bus.sg.app.blubber.fish/"
          >
            <AppWindowMac className="absolute left-3 inset-y-3" />
            <center>Bus@SG</center>
          </a>
        </li>
      </ul>
    </section>
  );
}
