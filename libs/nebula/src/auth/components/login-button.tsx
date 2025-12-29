"use client";
import type { ComponentType, PropsWithChildren } from "react";
import { signIn } from "../hooks";

export function LoginButton({
  children,
  social,
}: PropsWithChildren<{ social: string }>) {
  return (
    <button
      className="relative px-3 py-2 bg-white text-gray-800 rounded hover:ring-2 hover:ring-blue-300"
      onClick={() => {
        signIn.social({ provider: social });
      }}
      title={`Login with ${social}`}
      type="button"
    >
      {children}
    </button>
  );
}
