export function cssMergeClass(
  ...classes: (string | undefined | null)[]
): string {
  return classes.join(" ").trim().replace(/\s+/g, " ");
}
