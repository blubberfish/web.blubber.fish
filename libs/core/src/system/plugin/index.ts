import { Hook } from "./hooks";

export * from "./hooks";

export interface IPluginSetupContext {
  mount<
    TPlugin extends Plugin,
    TPluginClass extends { new (...args: any): TPlugin }
  >(
    PluginClass: TPluginClass,
    ...args: ConstructorParameters<TPluginClass>
  ): IPluginSetupContext;
}

export class Plugin extends EventTarget {
  static idOf(target: unknown): string {
    if (target instanceof Plugin) {
      return this.idOf(target.constructor);
    }
    if (target == null) {
      throw new Error();
    }
    if (target !== Plugin) {
      return this.idOf(Object.getPrototypeOf(target));
    }
    const property = Symbol.for("__bfid");
    if (!Object.hasOwn(target, property)) {
      const id = [
        Date.now().toString(36),
        Math.random().toString(36).slice(2),
      ].join("-");
      Object.defineProperty(target, property, {
        enumerable: false,
        configurable: false,
        writable: false,
        value: id,
      });
      return id;
    }
    return (target as Record<symbol, string>)[property];
  }

  #host?: Plugin;

  set host(plugin: Plugin) {
    if (this.#host) {
      // clean up
    }
    this.#host = plugin;
  }

  #registry = new Map<ReturnType<(typeof Plugin)["idOf"]>, Plugin>();

  async setup(builder: {
    (context: IPluginSetupContext): Promise<void>;
  }): Promise<void> {
    const host = this;
    const registry = this.#registry;
    const context: IPluginSetupContext = {
      mount(PluginClass, ...args) {
        const plugin = new PluginClass(...args);
        registry.set(Plugin.idOf(PluginClass), plugin);
        plugin.host = host;
        return context;
      },
    };
    await builder(context);
  }

  use<
    TPlugin extends Plugin,
    TPluginClass extends { new (...args: any): TPlugin }
  >(PluginClass: TPluginClass): InstanceType<TPluginClass> {
    const plugin = this.#registry.get(Plugin.idOf(PluginClass));
    if (!plugin) {
      throw new Error();
    }
    return plugin as InstanceType<TPluginClass>;
  }

  emit<THook extends Hook, THookClass extends { new (...args: any[]): THook }>(
    HookClass: THookClass,
    ...args: ConstructorParameters<THookClass>
  ): this {
    this.dispatchEvent(
      new CustomEvent(Hook.typeOf(HookClass), {
        detail: new HookClass(...args),
      })
    );
    return this;
  }

  on<THook extends Hook, THookClass extends { new (...args: any[]): THook }>(
    HookClass: THookClass,
    listener: { (event: Event): void }
  ): this {
    this.addEventListener(Hook.typeOf(HookClass), listener, { passive: true });
    return this;
  }

  once<THook extends Hook, THookClass extends { new (...args: any[]): THook }>(
    HookClass: THookClass,
    listener: { (event: Event): void }
  ): this {
    this.addEventListener(Hook.typeOf(HookClass), listener, {
      passive: true,
      once: true,
    });
    return this;
  }

  off<THook extends Hook, THookClass extends { new (...args: any[]): THook }>(
    HookClass: THookClass,
    listener: { (event: Event): void }
  ): this {
    this.removeEventListener(Hook.typeOf(HookClass), listener);
    return this;
  }
}
