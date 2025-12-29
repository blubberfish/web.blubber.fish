export type Primitive =
  | string
  | number
  | boolean
  | null
  | undefined
  | {
      [key: string | number]: Primitive;
    };

export class WebSync {
  static version = 1;

  static generateId(
    seed = (Math.random() + this.version).toString(36),
    prefix = Date.now().toString(36)
  ) {
    return [prefix, seed].join(".");
  }

  static url = new URL(WEBSYNC_URL);

  static frame: HTMLIFrameElement;

  static ready: Promise<void>;

  static callbacks = new Set<{ (...args: unknown[]): unknown }>();

  constructor() {
    if (!WebSync.frame) {
      const handShakeId = WebSync.generateId("0.7pm3zdw51ef", "mjqpfx6l");
      WebSync.url.searchParams.set("hs", handShakeId);
      // listen then re-emit as a single event
      window.addEventListener("message", (event) => {
        if (!(event instanceof MessageEvent)) return;
        if (event.origin !== WebSync.url.origin) return;
        if (!(event.data && event.data.id && typeof event.data.id === "string"))
          return;
        const { id } = event.data;
        window.dispatchEvent(new CustomEvent(id, { detail: event.data }));
      });
      WebSync.ready = new Promise((resolve) => {
        window.addEventListener(
          handShakeId,
          (event) => {
            resolve();
          },
          { once: true, passive: true }
        );
      });
      WebSync.frame = document.head.appendChild(
        document.createElement("iframe")
      );
      WebSync.frame.src = WebSync.url.href;
    }
  }

  get #ready() {
    return WebSync.ready;
  }

  set onready(callback: { (...args: unknown[]): unknown }) {
    this.#ready.then(() => {
      callback();
    });
  }

  async #invoke(method: string, ...args: Primitive[]) {
    await this.#ready;
    return new Promise((resolve, reject) => {
      const id = WebSync.generateId();
      window.addEventListener(
        id,
        (event: Event) => {
          if (!(event instanceof CustomEvent)) {
            reject(new Error());
            return;
          }
          const { error, result } = event.detail;
          if (error) {
            reject(error);
            return;
          }
          resolve(result);
        },
        {
          once: true,
          passive: true,
        }
      );
      WebSync.frame.contentWindow.postMessage(
        {
          websync: WebSync.version,
          id,
          method,
          parameters: args,
        },
        {
          targetOrigin: WebSync.url.origin,
        }
      );
    });
  }

  async store(
    command:
      | {
          read: { filter: string };
        }
      | { write: { filter: string; value: string } },
    params?: {
      location?: "localstorage" | "sessionstorage";
    }
  ) {
    return this.#invoke("store", command, params);
  }
}
