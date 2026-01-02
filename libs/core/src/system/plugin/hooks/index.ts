export class Hook {
  static typeOf(target: unknown): string {
    if (target == null) {
      throw new Error();
    }
    if (target instanceof Hook) {
      return this.typeOf(target.constructor);
    }
    if (target !== Hook) {
      return this.typeOf(Object.getPrototypeOf(target));
    }
    const property = Symbol.for("__bfhook");
    if (!Object.hasOwn(target, property)) {
      const value = [
        Date.now().toString(36),
        Math.random().toString(36).slice(2),
      ].join("-");
      Object.defineProperty(target, property, {
        enumerable: false,
        configurable: false,
        writable: false,
        value,
      });
      return value;
    }
    return (target as Record<symbol, string>)[property];
  }
}
