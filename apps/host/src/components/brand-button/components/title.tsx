import Link from "next/link";

export function Title() {
  return (
    <Link href="/" prefetch={false}>
      BLUBBERFISH
    </Link>
  );
}
