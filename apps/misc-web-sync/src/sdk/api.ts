import * as delegate from "./delegates";

export function readStorage<
  TSource extends keyof Pick<typeof delegate, "localstorage" | "sessionstorage">
>(params: { source: TSource; filter: string }) {
  const { filter, source } = params;
  return delegate[source].read(filter);
}

export function writeStorage<
  TSource extends keyof Pick<typeof delegate, "localstorage" | "sessionstorage">
>(params: { source: TSource; filter: string; value: string }) {
  const { source, filter, value } = params;
  return delegate[source].write(filter, value);
}
