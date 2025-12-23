import { Component } from "./core/component";
import { Hook } from "./hook";

export class Plugin extends Component {
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
