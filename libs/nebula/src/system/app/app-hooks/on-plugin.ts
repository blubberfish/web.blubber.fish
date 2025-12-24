import { Hook } from "../../core";
import { Plugin } from "../plugin";

export class OnPlugin<
  TPlugin extends Plugin,
  TPluginClass extends { new (...args: any[]): TPlugin }
> extends Hook {
  constructor(public readonly plugin: TPlugin) {
    super();
  }
}
