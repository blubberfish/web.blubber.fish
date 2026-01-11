import { generateId, lineage } from "./utils";

export class Component {
  static get id(): string {
    const property = Symbol.for("__blubberfish_id__");
    if (!Object.hasOwn(this, property)) {
      const value = generateId();
      Object.defineProperty(this, property, {
        value,
        writable: false,
        enumerable: false,
        configurable: false,
      });
      return value;
    }
    return this[property];
  }

  static idOf(target: unknown): string {
    if (target instanceof Component) {
      return (target.constructor as typeof Component).id;
    }
    if (!Array.from(lineage(target)).includes(Component)) {
      throw new TypeError("Target is not a Component instance.");
    }
    return (target as typeof Component).id;
  }
}
