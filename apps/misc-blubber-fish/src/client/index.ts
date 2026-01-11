import { generateId } from "../core/utils";
import { PortalClient } from "./core";

function bootstrap() {
  const property = Symbol.for("blubberfish");
  if (Object.hasOwn(window, property)) {
    return;
  }
  Object.defineProperty(window, property, {
    enumerable: false,
    configurable: false,
    writable: false,
    value: PortalClient,
  });
  window.postMessage(
    {
      blubberfish: "1.0.0",
      id: generateId(),
    },
    window.origin
  );
}

bootstrap();
