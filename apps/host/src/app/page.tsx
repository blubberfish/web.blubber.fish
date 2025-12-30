import { Hero } from '@/components/home/hero'
import Link from "next/link";

function Stack() {
  return (
    <div className="place-self-center w-xs aspect-2/3 p-3 border rounded bg-gray-800 transform-3d perspective-midrange origin-center rotate-y-45 -rotate-z-20">
      <div className="size-full p-3 gap-3 grid grid-cols-5 auto-rows-min border border-gray-400 rounded bg-linear-[45deg,var(--color-gray-900)_0%,var(--color-gray-900)_67%,var(--color-gray-300)_67%,var(--color-gray-300)_100%] transform-3d transition-transform group-hover:translate-z-5">
        <div className="size-full aspect-square border rounded bg-gray-700 transition-transform group-hover:translate-z-3" />
        <div className="size-full aspect-square border rounded bg-gray-700 transition-transform group-hover:translate-z-5" />
        <div className="size-full aspect-square border rounded bg-gray-700 transition-transform group-hover:translate-z-8" />
        <div className="size-full aspect-square border rounded bg-gray-500 col-span-2 row-span-2" />
        <div className="size-full aspect-square border border-gray-400 rounded bg-gray-700 transition-transform group-hover:translate-z-13 col-span-3 row-span-3 text-[4pt] p-3 gap-1 grid grid-cols-12 auto-rows-min transform-3d">
          <div className="size-full bg-gray-400 rounded col-span-full">
            &nbsp;
          </div>
          <div className="size-full bg-gray-400 rounded col-span-4">&nbsp;</div>
          <div className="size-full bg-gray-400 rounded col-span-8">&nbsp;</div>
          <div className="size-full bg-gray-400 rounded col-span-8">&nbsp;</div>
          <div className="size-full bg-gray-400 rounded col-span-4">&nbsp;</div>
          <div className="size-full bg-gray-400 rounded col-span-5">&nbsp;</div>
          <div className="size-full bg-gray-400 col-span-1 animate-pulse">
            &nbsp;
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <>
      <Hero />
    </>
  );
}

/*

      <section className="group bg-gray-900 text-white">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-[1fr_2fr] grid-rows-1">
          <div className="size-full overflow-hidden transform-3d">
          </div>
          <div className="p-6 sm:p-9">
            <p className="">
              Explore our suite of tools to help you become more productive.
            </p>
            <Link
              className="inline-block mt-2 sm:mt-3 bg-white text-gray-700 px-3 py-2 rounded font-semibold hover:ring-2 hover:ring-blue-300"
              href="/app"
            >
              See all applications
            </Link>
          </div>
        </div>
      </section>

      */
