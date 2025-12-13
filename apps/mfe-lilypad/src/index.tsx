import { bootloader } from "@blubberfish/nebula/host";
import React, { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";

try {
  bootloader();
  const domRoot = document.body.appendChild(document.createElement("div"));
  const appRoot = createRoot(domRoot);
} catch (e) {
  console.error("Failed to load MFE Lilypad", e);
}
