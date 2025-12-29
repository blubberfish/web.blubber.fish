export function read(filter: string) {
  return sessionStorage.getItem(filter);
}

export function write(filter: string, value: string) {
  return sessionStorage.setItem(filter, value);
}
