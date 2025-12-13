import React from "react";
import { GLOBAL_KEY } from "../../config";

export default function bootloader() {
  console.log("Nebula [host] bootloader initialized");
  if (GLOBAL_KEY in window) {
    return;
  }
  Object.defineProperty(window, GLOBAL_KEY, {
    configurable: false,
    enumerable: false,
    get() {
      return {
        React,
      };
    },
  });
}
