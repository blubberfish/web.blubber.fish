import { Plugin } from "./plugin";
import { OnPlugin, OnReady } from "./app-hooks";

export class App extends Plugin {
  #plugins = new Map<ReturnType<(typeof Plugin)["idOf"]>, Plugin>();

  use<
    TPlugin extends Plugin,
    TPluginClass extends { new (...args: any[]): TPlugin }
  >(
    PluginClass: TPluginClass,
    ...args: ConstructorParameters<TPluginClass>
  ): this {
    const plugin = new PluginClass(...args);
    this.#plugins.set(Plugin.idOf(Plugin), plugin);
    plugin.app = this;
    this.emit(OnPlugin, plugin);
    return this;
  }

  setup(...args: unknown[]): this {
    this.emit(OnReady);
    return this;
  }
}
