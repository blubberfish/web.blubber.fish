import { Component } from "./component";
import { Hook } from "./hook";

export abstract class App extends Component {
  #events = new EventTarget();

  hook<THook extends Hook, THookClass extends { new (...args: any[]): THook }>(
    HookType: THookClass,
    ...args: ConstructorParameters<THookClass>
  ) {
    this.#events.dispatchEvent(
      new CustomEvent<THook>(Hook.idOf(HookType), {
        detail: new HookType(...args),
      })
    );
  }

  on<THook extends Hook, THookClass extends { new (...args: any[]): THook }>(
    HookType: THookClass,
    listener: { (event: CustomEvent<InstanceType<THookClass>>): void }
  ) {
    this.#events.addEventListener(Hook.idOf(HookType), listener, {
      passive: true,
    });
  }

  once<THook extends Hook, THookClass extends { new (...args: any[]): THook }>(
    HookType: THookClass,
    listener: { (event: CustomEvent<InstanceType<THookClass>>): void }
  ) {
    this.#events.addEventListener(Hook.idOf(HookType), listener, {
      passive: true,
      once: true,
    });
  }

  off<THook extends Hook, THookClass extends { new (...args: any[]): THook }>(
    HookType: THookClass,
    listener: { (event: CustomEvent<InstanceType<THookClass>>): void }
  ) {
    this.#events.removeEventListener(Hook.idOf(HookType), listener);
  }
}
