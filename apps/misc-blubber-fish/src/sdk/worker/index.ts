import { processor } from "./core/internal";

declare global {
  interface Navigator {
    __bfworkers: Map<string, Worker>;
  }
}

function assignWorker(worker, { id }: { id: string }) {
  const property = "__bfworkers";
  if (!Object.hasOwn(window.navigator, property)) {
    Object.defineProperty(window.navigator, property, {
      configurable: false,
      enumerable: false,
      writable: false,
      value: new Map<string, Worker>(),
    });
  }
  window.navigator.__bfworkers.set(id, worker);
}

export async function createWorker(...args: Parameters<typeof processor>) {
  const [webWorkerId, webWorker] = await new Promise<[string, Worker]>(
    (resolve) => {
      const rdr = new FileReader();
      rdr.onload = () => {
        const dataUrl = rdr.result;
        const name = [
          Date.now().toString(36),
          Math.random().toString(36).slice(2),
        ].join("-");
        const worker = new Worker(dataUrl as string, { name, type: "module" });
        resolve([name, worker]);
      };
      rdr.readAsDataURL(
        new Blob(
          [`(${processor.toString()})`, `(...${JSON.stringify(args)})`],
          {
            type: "application/javascript",
          }
        )
      );
    }
  );
  assignWorker(webWorker, { id: webWorkerId });
}

export function listWorkers() {
  const workerEntries = window.navigator.__bfworkers?.entries();
  if (!workerEntries) {
    return [];
  }
  return Array.from(workerEntries);
}
