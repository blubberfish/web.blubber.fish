import { type ComponentType } from "react";
import { Plugin } from "./plugin";

export class Mfe extends Plugin {
  #registry = new Map<string, ComponentType>();

  register(name: string, component: ComponentType) {
    this.#registry.set(name, component);
  }
}
