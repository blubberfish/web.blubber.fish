import { Suspense } from "react";
import Details from "./_details";
import Skeleton from "./_skeleton";

export default function Page() {
  return (
    <Suspense fallback={<Skeleton />}>
      <Details />
    </Suspense>
  );
}
