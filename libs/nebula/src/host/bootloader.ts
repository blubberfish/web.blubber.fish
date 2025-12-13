import React from "react";
import { GLOBAL_KEY } from "../config";
import { App, Mfe } from "../core";

export function bootloader() {
  if (Object.hasOwn(window, GLOBAL_KEY)) {
    return;
  }
  Object.defineProperty(window, GLOBAL_KEY, {
    enumerable: false,
    configurable: false,
    value: Object.assign(new App().use(Mfe), {
      React,
    }),
    writable: false,
  });
}
