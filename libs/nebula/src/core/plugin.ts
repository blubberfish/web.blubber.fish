export class Plugin extends EventTarget {
  static #idProperty = "__nebulapluginid";

  static *heritageOf(target: unknown): Generator<unknown> {
    if (!target) {
      return;
    }
    let prototype = target;
    yield prototype;
    yield* this.heritageOf(Object.getPrototypeOf(prototype));
  }

  static idOf(target: unknown): string {
    if (!target) {
      throw new Error();
    }
    if (target instanceof Plugin) {
      return this.idOf(target.constructor);
    }
    if (!Array.from(this.heritageOf(target)).includes(Plugin)) {
      throw new Error();
    }
    if (Object.hasOwn(target, this.#idProperty)) {
      return (target as unknown as Record<string, string>)[this.#idProperty];
    }
    const id = [
      "nebula",
      Date.now().toString(36),
      Math.random().toString(36).slice(2),
    ].join("-");
    Object.defineProperty(target, this.#idProperty, {
      enumerable: true,
      configurable: false,
      value: id,
      writable: false,
    });
    return id;
  }

  #host?: Plugin;

  get host(): Plugin {
    if (!this.#host) {
      throw new Error();
    }
    return this.#host;
  }

  children = new Map<string, Plugin>();

  use<
    TPlugin extends Plugin,
    TPluginClass extends { new (...args: any[]): TPlugin }
  >(PluginClass: TPluginClass, ...args: ConstructorParameters<TPluginClass>) {
    const plugin = new PluginClass(...args);
    plugin.#host = this;
    this.children.set(Plugin.idOf(PluginClass), plugin);
    return this;
  }

  find<
    TPlugin extends Plugin,
    TPluginClass extends { new (...args: any[]): TPlugin }
  >(PluginClass: TPluginClass): InstanceType<TPluginClass> {
    const plugin = this.children.get(Plugin.idOf(PluginClass));
    if (!plugin) {
      throw new Error();
    }
    return plugin as InstanceType<TPluginClass>;
  }
}
