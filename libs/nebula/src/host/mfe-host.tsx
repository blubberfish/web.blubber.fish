"use client";

import { type PropsWithChildren } from "react";
import bootloader from "./side-effects/boot-loader";

bootloader();

export function MfeHost({ children }: PropsWithChildren) {
  return children;
}
