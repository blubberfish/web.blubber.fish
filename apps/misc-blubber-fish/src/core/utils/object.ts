export function* lineage(target: unknown) {
  if (target == null) return;
  yield target;
  yield* lineage(Object.getPrototypeOf(target));
}
