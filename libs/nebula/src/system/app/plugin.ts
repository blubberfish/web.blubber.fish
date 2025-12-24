import { Component } from "../core";

export abstract class Plugin extends Component {
  #app?: Plugin;

  get app(): Plugin | undefined {
    return this.#app;
  }

  set app(app: Plugin) {
    this.#app = app;
  }
}
