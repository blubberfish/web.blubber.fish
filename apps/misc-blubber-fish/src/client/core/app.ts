import { App } from "../../core";
import { generateId } from "../../core/utils";

declare global {
  var __FRAME_URL__: string;
}

export class PortalClient extends App {
  static #frame = document.head.appendChild(document.createElement("iframe"));

  static init(params: { url: string }) {
    const property = Symbol.for("blubberfish_");
    if (Object.hasOwn(window.navigator, property)) {
      return window.navigator[property] as PortalClient;
    }
    PortalClient.#frame.style.display = "none";
    PortalClient.#frame.style.zIndex = "-1";
    PortalClient.#frame.style.position = "fixed";
    PortalClient.#frame.style.top = "-1px";
    PortalClient.#frame.style.left = "-1px";
    PortalClient.#frame.style.width = "0px";
    PortalClient.#frame.style.height = "0px";
    PortalClient.#frame.title = "blubberfish portal";
    PortalClient.#frame.src = params.url;
    const value = new PortalClient();
    Object.defineProperty(window.navigator, property, {
      value,
      configurable: false,
      enumerable: false,
      writable: false,
    });
    return value;
  }

  constructor() {
    super();
    window.addEventListener(
      "message",
      ({ data }) => {
        if (!data) {
          return;
        }
        const { jsonrpc } = data;
        if (jsonrpc !== "2.0") {
          return;
        }
        const { id, result, error } = data;
        window.dispatchEvent(
          new CustomEvent(id, { detail: { result, error } })
        );
      },
      { passive: true }
    );
  }

  async invoke<TResult>(command: {
    (context: {
      method(value: string): void;
      params<TArgs extends unknown[]>(...args: TArgs[]): void;
    }): void;
  }) {
    const id = generateId();
    const request = {
      jsonrpc: "2.0",
      id,
      method: "",
      params: [],
    };
    command({
      method(value: string) {
        request.method = value;
      },
      params<TArgs extends unknown[]>(...args: TArgs[]) {
        request.params = args;
      },
    });
    return new Promise<TResult>((resolve, reject) => {
      window.addEventListener(
        id,
        ({
          detail: { id, result, error },
        }: CustomEvent<{ id: string; result: unknown; error: unknown }>) => {
          if (error) {
            reject(new Error("RPC Error", { cause: error }));
            return;
          }
          resolve(result as TResult);
        },
        {
          passive: true,
          once: true,
        }
      );
      PortalClient.#frame.contentWindow.postMessage(request, "*");
    });
  }
}
