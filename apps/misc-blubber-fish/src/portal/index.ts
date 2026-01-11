import { App } from "../core";
import * as api from "./features";
import { jsonRpcBrokerPlugin, JsonRpcRequest } from "./plugins";

class PortalApp extends App {
  static init(): PortalApp {
    const property = Symbol.for("blubberfish");
    if (Object.hasOwn(window.navigator, property)) {
      return window.navigator[property];
    }
    const value = jsonRpcBrokerPlugin(new PortalApp());
    Object.defineProperty(window.navigator, property, {
      value,
      writable: false,
      enumerable: false,
      configurable: false,
    });
    return value;
  }
}

const app = PortalApp.init();
app.on(JsonRpcRequest, ({ detail: context }) => {
  if (!(context.method in api)) {
    context.replyFailure(-32601, "Method not found");
    return;
  }
  Promise.resolve(api[context.method](...context.params))
    .then((result) => {
      context.replySuccess(result);
    })
    .catch(() => {
      context.replyFailure(-32603, "Internal error");
    });
});
