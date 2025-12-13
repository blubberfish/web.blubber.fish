import React from "react";

export default function App() {
  return <div>Hello MFE</div>;
}

Object.defineProperty(App, "metadata", {
  enumerable: true,
  configurable: false,
  get() {
    return "lilypad";
  },
  set() {
    throw new Error();
  },
});
