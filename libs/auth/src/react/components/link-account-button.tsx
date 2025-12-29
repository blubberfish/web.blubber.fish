"use client";
import { ButtonHTMLAttributes } from "react";
import { auth } from "../../client";
import { Link } from "lucide-react";

export function LinkAccountButton({
  provider,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  provider: "github" | "google";
}) {
  return (
    <button
      onClick={() => {
        auth.linkSocial({ provider });
      }}
      title={`link to ${provider}`}
      type="button"
      {...props}
    >
      <Link className="size-[1em]" />
      <span className="text-inherit">Link</span>
    </button>
  );
}
