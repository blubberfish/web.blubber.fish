export abstract class Hook {
  static isLineageOf(target: unknown): boolean {
    if (target == null) {
      return false;
    }
    if (target === this) {
      return true;
    }
    return this.isLineageOf(Object.getPrototypeOf(target));
  }

  static idOf(target: unknown, property = "___blubberfishhookid"): string {
    if (target instanceof Hook) {
      return this.idOf(target.constructor);
    }
    if (!this.isLineageOf(target)) {
      throw new Error();
    }
    const idKey = Symbol.for(property);
    if (!Object.hasOwn(target as object, idKey)) {
      const id = [
        "hook",
        Date.now().toString(36),
        Math.random().toString(36).slice(2),
      ].join("-");
      Object.defineProperty(target, idKey, {
        enumerable: false,
        configurable: false,
        writable: false,
        value: id,
      });
      return id;
    }
    return (target as Record<symbol, string>)[idKey];
  }
}
