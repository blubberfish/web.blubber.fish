export class Component extends EventTarget {
  static *lineageOf(target: unknown): Generator<unknown> {
    if (target == null) {
      return;
    }
    yield target;
    yield* this.lineageOf(Object.getPrototypeOf(target));
  }

  static idOf(target: unknown, property = "___blubberfishid"): string {
    if (target instanceof Component) {
      return this.idOf(target.constructor);
    }
    if (!Array.from(this.lineageOf(target)).includes(Component)) {
      throw new Error();
    }
    const idKey = Symbol.for(property);
    if (!(idKey in (target as Record<symbol, string>))) {
      const id = [
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
