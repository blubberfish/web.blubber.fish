import { api } from "@blubberfish/lib-auth";
import { User } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Component() {
  const session = await api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/");
  }
  const { image, name, email } = session.user;
  return (
    <section className="p-6 sm:p-9 bg-gray-800 flex flex-col items-center-safe">
      <div className="size-18 sm:size-24 rounded-full p-2 sm:p-3 overflow-hidden bg-gray-900 text-white/67">
        {image ? (
          <Image
            className="size-full"
            unoptimized
            height={64}
            width={64}
            alt="user profile image"
            src={image}
          />
        ) : (
          <User className="size-full" />
        )}
      </div>
      <h1 className="mt-6 sm:mt-9 font-semibold text-lg sm:text-xl">{name}</h1>
      <p className="rounded-full mt-2 sm:mt-3 text-gray-400 text-xs sm:text-sm">
        {email}
      </p>
    </section>
  );
}
