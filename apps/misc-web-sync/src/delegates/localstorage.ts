export function read(filter: string) {
  return localStorage.getItem(filter);
}

export function write(filter: string, value: string) {
  return localStorage.setItem(filter, value);
}
