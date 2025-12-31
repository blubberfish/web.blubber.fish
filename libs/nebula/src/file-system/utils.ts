export function join(...path: string[]) {
  return path.join("/").replace(/\/+/g, "/");
}
