import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app";

const domRoot = document.body.appendChild(document.createElement("div"));
const appRoot = createRoot(domRoot);
appRoot.render(<App />);
