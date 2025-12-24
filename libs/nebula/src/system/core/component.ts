import { Hook } from "./hook";

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
    if (!Object.hasOwn(target as object, idKey)) {
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

  off<THook extends Hook, THookClass extends { new (...args: any[]): THook }>(
    PluginHook: THookClass,
    callback: { (event: CustomEvent<InstanceType<THookClass>>): void }
  ) {
    this.removeEventListener(Hook.idOf(PluginHook), callback as EventListener);
  }

  on<THook extends Hook, THookClass extends { new (...args: any[]): THook }>(
    PluginHook: THookClass,
    callback: { (event: CustomEvent<InstanceType<THookClass>>): void }
  ) {
    this.addEventListener(Hook.idOf(PluginHook), callback as EventListener);
  }

  once<THook extends Hook, THookClass extends { new (...args: any[]): THook }>(
    PluginHook: THookClass,
    callback: { (event: CustomEvent<InstanceType<THookClass>>): void }
  ) {
    this.addEventListener(Hook.idOf(PluginHook), callback as EventListener, {
      once: true,
    });
  }

  emit<THook extends Hook, THookClass extends { new (...args: any[]): THook }>(
    HookClass: THookClass,
    ...args: ConstructorParameters<THookClass>
  ) {
    this.dispatchEvent(
      new CustomEvent(Hook.idOf(HookClass), { detail: new HookClass(...args) })
    );
  }
}
