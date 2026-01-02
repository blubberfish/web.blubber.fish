import { createWorker, listWorkers } from "./worker";

Object.defineProperty(window.navigator, "__bfcore", {
  configurable: false,
  enumerable: false,
  writable: false,
  value: {
    createWorker,
    listWorkers,
  },
});
