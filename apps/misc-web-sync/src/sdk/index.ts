import { WebSync } from "./web-sync";

Object.defineProperty(window.navigator, "websync", {
  enumerable: false,
  configurable: false,
  writable: false,
  value: new WebSync(),
});
